const Discord = require('discord.js');
const Bot = new Discord.Client();
const ytdl = require('ytdl-core');
const YoutubeDL = require('youtube-dl');

const PREFIX = "Music";

const connections = new Map();
let broadcast;

var Overraid = ""

Bot.on('ready', function() {
    console.log("Je suis prête ^^");
    Bot.user.setActivity('Help Alys // Version 3.0', { type: 'PLAYING' })
});

Bot.on('message', message => {
    if (message.content === 'Help Alys') {
        message.channel.send({embed:  {
            color: 3447003,
            title: 'Commandes',
            description: 'Voici la liste **non complète** des commandes et textes réactions (à vous de trouver les autres huhuhu)',
            fields: [
                {
                    name: '**Help Alys**',
                    value: 'Bah à ton avis on est où là ?'
                },
                {
                    name: '**MusicHelp**',
                    value: 'Le help pour le mode musical ^^'
                },
                {
                    name: '**Alys, photo !**',
                    value: 'Un petit souvenir ? P.S. Je suis pas très douée avec mon appareil ^^\''
                },
                {
                    name: '**!StarLevel**',
                    value: 'Vérifie ton niveau de Starification avec 10 Niveaux de stars !'
                },
                {
                    name: '**Dis Alys,** + texte',
                    value: '*La psychologue Alys vous prends en rendez-vous de...* En gros posez des questions'
                },
                {
                    name: '**OCEAN CRY** + mention',
                    value: '***Prépare ta tombe !***'
                },
                {
                    name: '**FLIP**',
                    value: 'Pile je gagne, face tu perds !'
                },
                {
                    name: '**DROP NEFFEX**',
                    value: 'Car KiOm est un Fanboy'
                },
                {
                    name: '**I prefer** + texte',
                    value: 'J\' aime bien connaître vos goûts et en débattre !'
                },
                {
                    name: '**Roulette Russe**',
                    value: '3 Triforce, 1 Despacito. Attention !'
                },
                {
                    name: '**About Server**',
                    value: '2-3 infos sur votre serveur, C\'est super pratique !'
                },
                {
                    name: 'Liste des mots détectables !',
                    value: '`Quoi` `Nice` `GG` `Qui s\'en fout` `HYPE` `Nancy` `send help` `RIP`'
                },
            ],
            footer: {
                icon_url: Bot.user.avatarURL,
                text: 'Alys Bot by kion#0503 // Note de mise à jour avec "About Alys"',
            },
    }})
}});

Bot.on('message', message => {
    if (message.content === 'MusicHelp') {
        message.channel.send({embed:  {
            color: 3447003,
            title: 'Commandes',
            description: 'Les Musiques c\'est la vie ! Donc je vous en fait écouter ^^ (c beau la vie kan mem)',
            fields: [
		{
                    name: '**Préambule**',
                    value: 'Il se peut que la musique soit déteriorée, cela ne vient pas de moi mais des serveurs et de l\'activité externe du bot. La playlist du bot n\'accueille que 20 musiques pour éviter la surcharge.'
                },
                {
                    name: '**Music Help**',
                    value: 'Bah à ton avis on est où là ?'
                },
                {
                    name: '**Music Leave**',
                    value: 'c fini'
                },
                {
                    name: '**Music Play**',
                    value: 'Pas besoin de te faire un dessin...'
                },
                {
                    name: '**Music Skip**',
                    value: 'Pour ne plus supporter la playlist merdique de Kion'
                },
                {
                    name: '**Music List**',
                    value: 'UNE LISTE'
                },
            ],
            footer: {
                icon_url: Bot.user.avatarURL,
                text: 'Alys Bot by kion#0503 // Note de mise à jour avec "About Alys"',
            },
    }})
}});

module.exports = function (client, options) {
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

Bot.on('message', message => {
    if (message.content === 'About Alys') {
        message.channel.send('**Alys, à propos** \n \n **Version : 3.0** \n Rajouts: Commandes Musicales \n Date de version: 19 Septembre 2018 \n \n **Liste de serveurs** \n' + Bot.guilds.map(guild => guild.name + ' avec ' + guild.memberCount + ' membres !') + '\n \n **Lien d\'invitation** \n https://kiom.neocities.org/alys.html \n \n **Alys Bot by ஜ۩KiOm۩ஜ#0503**')
}});

Bot.on('message', message => {
    if (message.content.startsWith('About Server')) {
        message.channel.send(message.guild.name + ", Infos utiles \n \n **Propriétaire : " + message.guild.owner.user.username  + "** \n \n " + message.guild.memberCount + " membres sue le serveur à ce jour. \n \n Rôles : \n`" + message.guild.roles.map(rôle =>"\n " + rôle.name + " ") + "`")
}});

Bot.on('message', message => {
  if (message.content === 'Alys, photo !') {
    message.reply(message.author.avatarURL);
  }
});

Bot.on('message', message => {
    if(message.content === 'tg') {
        //message.renply('**Mais comment tu parle** ***NON MAIS OH !***');
        message.channel.send('**Mais comment tu parle** ***NON MAIS OH !***');
    }
});

Bot.on('message', message => {
    if(message.content.startsWith('OCEAN CRY')) {
        let member = message.mentions.members.first()
        if (message.content.startsWith("OCEAN CRY " + member)) {
            message.channel.sendMessage(member + " meurs noyé ! " + 'https://media1.tenor.com/images/2cb87ee9662473bae186436072f91ce6/tenor.gif?itemid=5543161' )
        }
        else
            message.channel.sendMessage("Ouh j'ai pas localisé la cible. As-tu mentionné ?")
    }
});

Bot.on('message', message => {
    if(message.content === ';-;') {
        //message.renply('oh no :sob:');
        message.channel.send('oh no :sob:');
    }
});

Bot.on('message', message => {
    if(message.content === 'GG') {
        //message.renply(':clap:');
        message.channel.send(':clap:');
    }
});

Bot.on('message', message => {
    if(message.content === 'Les lapins.') {
        //message.renply(':clap:');
        message.renply('AH NON TU LA FERME ! PAS DE **H** ICI !');
    }
});

var prefer = [
    "**TU VAS MOURIR POUR AVOIR DIS CECI**",
    "Moi aussi ^^",
    "*presque*",
    "EN FAIT NON",
    "Jsp"
  ]
  Bot.on('message', message => {
    if(message.content.startsWith("I prefer")) {
        var randomAnswers = prefer[Math.floor(Math.random() * prefer.length)];
        message.channel.send(randomAnswers);
    }
});

Bot.on('message', message => {
    if(message.content === '33') {
        //message.renply('**KWA MIGO EST MORT ?** Ah non fausse joie *triste*');
        message.channel.send('806');
    }
});

Bot.on('message', message => {
    if(message.content === 'Sors.') {
        //message.renply('**KWA MIGO EST MORT ?** Ah non fausse joie *triste*');
        message.channel.send(':door:');
    }
});

Bot.on('message', message => {
    if(message.content === 'T\'as l\'heure ?') {
        //message.renply('**KWA MIGO EST MORT ?** Ah non fausse joie *triste*');
        message.channel.send('¯\\_(ツ)_/¯');
    }
});

Bot.on('message', message => {
    if(message.content.startsWith('HYPE')) {
        //message.renply('**KWA MIGO EST MORT ?** Ah non fausse joie *triste*');
        message.channel.send('https://www.youtube.com/watch?v=DcfVqJV8-YM');
    }
});

Bot.on('message', message => {
    if(message.content === 'Despacito') {
        //message.renply('**KWA MIGO EST MORT ?** Ah non fausse joie *triste*');
        message.channel.send('die');
    }
});

Bot.on('message', message => {
    if(message.content === 'Despacito 2') {
        //message.renply('**KWA MIGO EST MORT ?** Ah non fausse joie *triste*');
        message.channel.send('https://www.youtube.com/watch?v=W3GrSMYbkBE');
    }
});

Bot.on('message', message => {
    if(message.content.startsWith('Qui s\'en fout ')) {
        //message.renply('**KWA MIGO EST MORT ?** Ah non fausse joie *triste*');
        message.channel.send(':raised_hand:');
    }
});

Bot.on('message', message => {
    if(message.content.startsWith('Nice')) {
        //message.renply('**KWA MIGO EST MORT ?** Ah non fausse joie *triste*');
        message.channel.send('*tousse* Nice — prononcé [nis] (Nissa ou Niça en nissart, Nizza ou Nizza Marittima en italien) — est une commune du Sud-Est de la France, préfecture du département des Alpes-Maritimes et deuxième ville de la région Provence-Alpes-Côte d\'Azur derrière Marseille. Située à l\'extrémité sud-est de la France, à une trentaine de kilomètres de la frontière franco-italienne, elle est établie sur les bords de la mer Méditerranée, le long de la baie des Anges et à l\'embouchure du Paillon. Avec 342 522 habitants au dernier recensement de 2015, elle est la cinquième commune de France en population (après Paris, Marseille, Lyon et Toulouse). Elle est située au cœur de la septième aire urbaine de Fra... *Ok c\'est pas drôle*');
    }
});

Bot.on('message', message => {
    if(message.content.startsWith('Nancy')) {
        //message.renply('**KWA MIGO EST MORT ?** Ah non fausse joie *triste*');
        message.channel.send('https://www.youtube.com/watch?v=exkQZM2VE6I');
    }
});

Bot.on('message', message => {
    if(message.content.startsWith('LE FUN')) {
        //message.renply('**KWA MIGO EST MORT ?** Ah non fausse joie *triste*');
        message.channel.send({
            file : "KiOmSEclate.gif"
         });
    }
});
        
Bot.on('message', message => {
    if(message.content.startsWith('send help')) {
        //message.renply('**KWA MIGO EST MORT ?** Ah non fausse joie *triste*');
        message.channel.send({
            file : "send help.PNG"
         });
    }
});

Bot.on('message', message => {
    if(message.content.startsWith('RIP')) {
        //message.renply('**KWA MIGO EST MORT ?** Ah non fausse joie *triste*');
        message.channel.send({
            file : "tombstone.jpg"
         });
    }
});

var oui = [
    "0 ! Paulok ! ***C A N C E R***",
    "1 ! Maria ! Raté !",
    "2 ! Star Platypus ! Hmm... Moche.",
    "3 ! KiOm ! ^^'",
    "4 ! Kaede ! oui. En 4. C'est moi qui décide de toute façon ! NA !",
    "5 ! Zapdexio ! Sa seule erreur c'est Platypus.",
    "6 ! Kiyu ! Par ce que.",
    "7 ! Moi même ! Rooh ! On est pas parfait !",
    "8 ! J'ai personne en 8 mdr",
    "9 ! Nekomy ! La reine !",
    "10 !!! Suky ! Es-ce que j\'ai vraiment besoin d\'argumenter ?"
  ]
  Bot.on("message", (message) => {
      if (message.content.startsWith("!StarLevel")) {
        var randomAnswers = oui[Math.floor(Math.random() * oui.length)];
        message.channel.send(randomAnswers);
      }
});

var quoi = [
    "Feur",
    "Drilatère",
    "Que",
    "Coin (ok j'ai pas d'inspi ;--;)"
  ]
  Bot.on("message", (message) => {
      if (message.content.startsWith("quoi")) {
        var randomAnswers = quoi[Math.floor(Math.random() * quoi.length)];
        message.channel.send(randomAnswers);
      }
});

var NEFFEX = [
    "https://www.youtube.com/watch?v=Gtdz8WUmyEM",
    "https://www.youtube.com/watch?v=0PgdTddSpsA",
    "https://www.youtube.com/watch?v=TPCaWQQo11A",
    "https://www.youtube.com/watch?v=ec6e20BynJI",
    "https://www.youtube.com/watch?v=6icifNofvXc",
    "https://www.youtube.com/watch?v=Mquzb5OLdd0",
    "https://www.youtube.com/watch?v=t89lMHr844s",
    "https://www.youtube.com/watch?v=O6xFfpkEZio",
    "https://www.youtube.com/watch?v=DcfVqJV8-YM",
    "https://www.youtube.com/watch?v=bttuJLPw1o0",
    "Et puis zut tiens ! https://www.youtube.com/list=PLrxcNWZXdQ2kDOkW-S86MyRJkZiwxhL6c"
  ]
  Bot.on("message", (message) => {
      if (message.content.startsWith("DROP NEFFEX")) {
        var randomAnswers = NEFFEX[Math.floor(Math.random() * NEFFEX.length)];
        message.channel.send(randomAnswers);
      }
});

var choix = [
    "Face !",
    "Pile !",
  ]
  Bot.on("message", (message) => {
      if (message.content.startsWith("FLIP")) {
        var randomAnswers = choix[Math.floor(Math.random() * choix.length)];
        message.channel.send(randomAnswers);
      }
});

var reps = [
    "Aucune idée !",
    "Nah.",
    "Ah peut être !",
    "Oui !!!",
    "Demande à cet abruti de Kion"
  ]
  Bot.on("message", (message) => {
      if (message.content.startsWith("Dis Alys,")) {
        var randomAnswers = reps[Math.floor(Math.random() * reps.length)];
        message.channel.send(randomAnswers);
      }
});

var Despacito = [
    ":gun: https://www.youtube.com/watch?v=AHJzVfRz_kI",
    ":gun: https://www.youtube.com/watch?v=AHJzVfRz_kI",
    ":gun: https://www.youtube.com/watch?v=AHJzVfRz_kI",
    ":gun: https://www.youtube.com/watch?v=kJQP7kiw5Fk"
  ]
  Bot.on("message", (message) => {
      if (message.content.startsWith("Roulette Russe")) {
        var randomAnswers = Despacito[Math.floor(Math.random() * Despacito.length)];
        message.channel.send(randomAnswers);
      }
});

Bot.on('message', message => {
    if (message.author.id == 352769640218361867) {
        if (message.content.startsWith('Alys, matrice !')) {
            message.delete(100);
            var str = message.content
            message.channel.sendMessage(str.substring(15))
        }
    }
});

Bot.on('message', message => {
    if (message.author.id == 352769640218361867) {
        if (message.content.startsWith('Set Game')) {
            message.delete(1);
            var str = message.content
            Bot.user.setActivity(str.substring(8), { type: 'PLAYING' })
        }
    }
});

Bot.on('message', message => {
    if (message.author.id == 352769640218361867) {
        if (message.content.startsWith('Set Music')) {
            message.delete(1);
            var str = message.content
            Bot.user.setActivity(str.substring(9), { type: 'LISTENING' })
        }
    }
});

Bot.on('message', message => {
    if (message.author.id == 352769640218361867) {
        if (message.content.startsWith('Reset Game')) {
            message.delete(1);
            var str = message.content
            Bot.user.setActivity('Help Alys // Version 3.0', { type: 'PLAYING' })
        }
    }
});

Bot.on('message', message => {
    if (message.author.id == 352769640218361867) {
        if (message.content.startsWith('Set Movie')) {
            message.delete(1);
            var str = message.content
            Bot.user.setActivity(str.substring(9), { type: 'WATCHING' })
        }
    }
});

Bot.on('message', message => {
  if (!message.guild) return;
    if (message.author.id == 352769640218361867) {
      if (message.content.startsWith('Race')) {
        const user = message.mentions.users.first();
        if (user) {
          const member = message.guild.member(user);
          if (member) {
            member.ban({
              reason: 'Race.',
            }).then(() => {
              message.reply(`${user.tag} s'est bien fait niquer sa race !`);
            }).catch(err => {
              message.reply('OH NON ! SA RACE EST SUPERIEURE ! SACRILEGE');
            });
          } else {
            message.reply('Race inconnue');
          }
          } else {
            message.reply('Y\'a aucune race là.');
      }
    }
  }      
});

Bot.login(process.env.TOKEN) // Token Sécurisé tavu
