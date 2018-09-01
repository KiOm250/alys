const Discord = require('discord.js');
const Bot = new Discord.Client();

const PREFIX = "!";

var Overraid = ""

Bot.on('ready', function() {
    console.log("Je suis prête ^^");
    Bot.user.setActivity('Help Alys // Version 2.1.1', { type: 'PLAYING' })
});

Bot.on('message', message => {
    if (message.content === 'Help Alys') {
        message.channel.send({embed:  {
            color: 3447003,
            title: '**Commandes**',
            description: 'Voici la liste **non complète** des commandes et textes réactions (à vous de trouver les autres huhuhu)',
            fields: [
                {
                    name: '**Help Alys**',
                    value: 'Bah à ton avis on est où là ?'
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
                    value: '5 Triforce, 1 Despacito. Attention !'
                },
                {
                    name: 'Liste des mots détectables !',
                    value: '`Quoi` `Nice` `GG` `Qui s\'en fout` `HYPE` `Nancy`'
                },
            ],
            footer: {
                icon_url: Bot.user.avatarURL,
                text: 'Alys Bot by ஜ۩KiOm۩ஜ#0503',
            },
    }})
}});

Bot.on('message', message => {
    if (message.content === 'About Alys') {
        message.channel.send('**Alys, à propos** \n \n **Version : 2.1.1** \n Rajouts: Réactions `LE FUN / send help` \n Date de version: 01 Septembre 2018 \n \n **Liste de serveurs** \n' + Bot.guilds.map(guild => guild.name + ' avec ' + guild.memberCount + ' membres !') + '\n \n **Lien d\'invitation** \n https://kiom.neocities.org/alys.html \n \n **Alys Bot by ஜ۩KiOm۩ஜ#0503**')
}});

Bot.on('message', message => {
    if(message.content === 'tg') {
        //message.renply('**Mais comment tu parle** ***NON MAIS OH !***');
        message.channel.send('**Mais comment tu parle** ***NON MAIS OH !***');
    }
});

Bot.on('message', message => {
    if(message.content.startsWith('@everyone')) {
        //message.renply('***PING BORDEL T'EST AUSSI CANCER QUE MIGO (FAUT LE FAIRE QUAND MÊME)***');
        message.channel.send('***P I N G***');
    }
});

Bot.on('message', message => {
    if(message.content.startsWith('OCEAN CRY')) {
        let SpliteMessage = message.content.split(' ')
        if(SpliteMessage.length === 3) {
            message.channel.sendMessage(message.mentions.users.first() + " meurs noyé ! " + 'https://media1.tenor.com/images/2cb87ee9662473bae186436072f91ce6/tenor.gif?itemid=5543161' )
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
            file : "send help.png"
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
        if (message.content.startsWith('RPsayBOT')) {
            var str = message.content
            Bot.channels.get("470215594269212682").send(str.substring(9))
        }
    }
});

Bot.on('message', message => {
    if (message.author.id == 352769640218361867) {
        if (message.content.startsWith('Overraid')) {
            message.delete(1);
            var str = message.content
            Bot.channels.get(Overraid).send(str.substring(8))
        }
    }
});

Bot.on('message', message => {
    if (message.author.id == 352769640218361867) {
        if (message.content.startsWith('Set Overraid')) {
            message.delete(1);
            var str = message.content
            Overraid = str.substring(12)
        }
    }
});


Bot.on('message', message => {
    if (message.author.id == 352769640218361867) {
        if (message.content.startsWith('Alys, matrice !')) {
            message.delete(1);
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
            Bot.user.setActivity('Help Alys // Version 2.1.1', { type: 'PLAYING' })
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

Bot.login(process.env.TOKEN) // Token Sécurisé tavu
