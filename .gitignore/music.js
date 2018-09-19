const ytdl = require('ytdl-core');
const YoutubeDL = require('youtube-dl');

module.exports = function (client, options) {
	let PREFIX = "Music";
	let GLOBAL = (options && options.global) || false;
	let MAX_QUEUE_SIZE = (options && options.maxQueueSize) || 20;
	let DEFAULT_VOLUME = (options && options.volume) || 50;
	let ALLOW_ALL_SKIP = (options && options.anyoneCanSkip) || false;
	let CLEAR_INVOKER = (options && options.clearInvoker) || false;
	let CHANNEL = (options && options.channel) || false;
	let queues = {};
	Bot.on('message', msg => {
		const message = msg.content.trim();
		if (message.toLowerCase().startsWith(PREFIX.toLowerCase())) {
			const command = message.substring(PREFIX.length).split(/[ \n]/)[0].toLowerCase().trim();
			const suffix = message.substring(PREFIX.length + command.length).trim();
			switch (command) {
				case 'Play':
					return play(msg, suffix);
				case 'Skip':
					return skip(msg, suffix);
				case 'List':
					return queue(msg, suffix);
				case 'Pause':
					return pause(msg, suffix);
				case 'Start':
					return resume(msg, suffix);
				case 'Leave':
					return leave(msg, suffix);
				case 'Clear':
					return clearqueue(msg, suffix);
			}
			if (CLEAR_INVOKER) {
				msg.delete();
			}
		}
	});
	function isAdmin(member) {
		return member.hasPermission("ADMINISTRATOR");
	}
	function canSkip(member, queue) {
		if (ALLOW_ALL_SKIP) return true;
		else if (queue[0].requester === member.id) return true;
		else if (isAdmin(member)) return true;
		else return false;
	}
	function getQueue(server) {
		if (GLOBAL) server = '_';
		if (!queues[server]) queues[server] = [];
		return queues[server];
	}
	function play(msg, suffix) {
		if (!CHANNEL && msg.member.voiceChannel === undefined) return msg.channel.send(wrap('**MAIS** Si t\'est pas dans un vocal je peux pas lançer la musique **BAKA**'));
		if (!suffix) return msg.channel.send(wrap('Euh... Nah ?'));
		const queue = getQueue(msg.guild.id);
		if (queue.length >= MAX_QUEUE_SIZE) {
			return msg.channel.send(wrap('Matrice débordée, je peux plus ajouter de musiques ;----;'));
		}
		msg.channel.send(wrap('Je cherche...')).then(response => {
			var searchstring = suffix
			if (!suffix.toLowerCase().startsWith('http')) {
				searchstring = 'gvsearch1:' + suffix;
			}

			YoutubeDL.getInfo(searchstring, ['-q', '--no-warnings', '--force-ipv4'], (err, info) => {
				if (err || info.format_id === undefined || info.format_id.startsWith('0')) {
					return response.edit(wrap('c pa valid'));
				}
				info.requester = msg.author.id;
				response.edit(wrap('Queued: ' + info.title)).then(() => {
					queue.push(info);
					if (queue.length === 1) executeQueue(msg, queue);
				}).catch(console.log);
			});
		}).catch(console.log);
	}
	function skip(msg, suffix) {
		const voiceConnection = client.voiceConnections.find(val => val.channel.guild.id == msg.guild.id);
		if (voiceConnection === null) return msg.channel.send(wrap('Wait. Y\'a que dalle là !'));
		const queue = getQueue(msg.guild.id);
		if (!canSkip(msg.member, queue)) return msg.channel.send(wrap('Nope.')).then((response) => {
			response.delete(5000);
		});
		let toSkip = 1; // Default 1.
		if (!isNaN(suffix) && parseInt(suffix) > 0) {
			toSkip = parseInt(suffix);
		}
		toSkip = Math.min(toSkip, queue.length);
		queue.splice(0, toSkip - 1);
		const dispatcher = voiceConnection.player.dispatcher;
		if (voiceConnection.paused) dispatcher.resume();
		dispatcher.end();

		msg.channel.send(wrap('On passe ' + toSkip + '!'));
	}
	function queue(msg, suffix) {
		const queue = getQueue(msg.guild.id);
		const text = queue.map((video, index) => (
			(index + 1) + ': ' + video.title
		)).join('\n');
		let queueStatus = 'Stopped';
		const voiceConnection = client.voiceConnections.find(val => val.channel.guild.id == msg.guild.id);
		if (voiceConnection !== null) {
			const dispatcher = voiceConnection.player.dispatcher;
			queueStatus = dispatcher.paused ? 'Paused' : 'Playing';
		}
		msg.channel.send(wrap('Queue : (' + queueStatus + '):\n' + text));
	}
	function pause(msg, suffix) {
		// Get the voice connection.
		const voiceConnection = client.voiceConnections.find(val => val.channel.guild.id == msg.guild.id);
		if (voiceConnection === null) return msg.channel.send(wrap('*Si music ne pas être, alors pause tu ne pourras pas.*'));
		msg.channel.send(wrap('***P A U S E***'));
		const dispatcher = voiceConnection.player.dispatcher;
		if (!dispatcher.paused) dispatcher.pause();
	}
	function leave(msg, suffix) {
			const voiceConnection = client.voiceConnections.find(val => val.channel.guild.id == msg.guild.id);
			if (voiceConnection === null) return msg.channel.send(wrap('Je ne peux pas partit si je ne viens pas :thinking:'));
			const queue = getQueue(msg.guild.id);
			queue.splice(0, queue.length);
			voiceConnection.player.dispatcher.end();
			voiceConnection.disconnect();
	}
	function clearqueue(msg, suffix) {
		if (isAdmin(msg.member)) {
			const queue = getQueue(msg.guild.id);

			queue.splice(0, queue.length);
			msg.channel.send(wrap('MMatrice rebooté'));
		} else {
			msg.channel.send(wrap('T\'as pas le mot de passe.'));
		}
	}
	function resume(msg, suffix) {
		const voiceConnection = client.voiceConnections.find(val => val.channel.guild.id == msg.guild.id);
		if (voiceConnection === null) return msg.channel.send(wrap('**E**'));
		msg.channel.send(wrap('***S T A R T***'));
		const dispatcher = voiceConnection.player.dispatcher;
		if (dispatcher.paused) dispatcher.resume();
	}
	/**
	 * Executes the next song in the queue.
	 *
	 * @param {Message} msg - Original message.
	 * @param {object} queue - The song queue for this server.
	 * @returns {<promise>} - The voice channel.
	 */
	function executeQueue(msg, queue) {
		if (queue.length === 0) {
			msg.channel.send(wrap('*Fin.*'));
			const voiceConnection = client.voiceConnections.find(val => val.channel.guild.id == msg.guild.id);
			if (voiceConnection !== null) return voiceConnection.disconnect();
		}

		new Promise((resolve, reject) => {
			const voiceConnection = client.voiceConnections.find(val => val.channel.guild.id == msg.guild.id);
			if (voiceConnection === null) {
				if (CHANNEL) {
					msg.guild.channels.find('name', CHANNEL).join().then(connection => {
						resolve(connection);
					}).catch((error) => {
						console.log(error);
					});
				} else if (msg.member.voiceChannel) {
					msg.member.voiceChannel.join().then(connection => {
						resolve(connection);
					}).catch((error) => {
						console.log(error);
					});
				} else {
					queue.splice(0, queue.length);
					reject();
				}
			} else {
				resolve(voiceConnection);
			}
		}).then(connection => {
			const video = queue[0];

			console.log(video.webpage_url);

			// Play the video.
			msg.channel.send(wrap('Musique ! ' + video.title)).then(() => {
				let dispatcher = connection.playStream(ytdl(video.webpage_url, {filter: 'audioonly'}), {seek: 0, volume: (DEFAULT_VOLUME/100)});

				connection.on('error', (error) => {
					console.log(error);
					queue.shift();
					executeQueue(msg, queue);
				});

				dispatcher.on('error', (error) => {
					console.log(error);
					queue.shift();
					executeQueue(msg, queue);
				});

				dispatcher.on('end', () => {
					setTimeout(() => {
						if (queue.length > 0) {
							queue.shift();
							executeQueue(msg, queue);
						}
					}, 1000);
				});
			}).catch((error) => {
				console.log(error);
			});
		}).catch((error) => {
			console.log(error);
		});
	}
};
