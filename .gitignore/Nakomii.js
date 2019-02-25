const Discord = require('discord.js');
const Bot = new Discord.Client();

Bot.on('ready', function() {
    console.log("Je suis prête ^^");
    Bot.user.setActivity('Le serveur Zaphytopia / Nhelp', { type: 'WATCHING' })
});

Bot.on('guildMemberAdd', member => {
    var Welcome = [
        "Cachez les cookies ! " + member.user + " arrive !",
        member.user + " pile à l'heure pour les pancakes !",
        member.user + " à rejoint votre équipe !",
        member.user + " : Ultime nouvel arrivant !",
    ]
    var randomAnswers = Welcome[Math.floor(Math.random() * Welcome.length)];
    member.guild.channels.find("id", "481576622517125122").sendMessage(randomAnswers + " Vas lire les règles, pick quelques rôles et n'oublie pas de te présenter ! Nous te souhaitons un agréable moment sur le serveur ! :two_hearts:");
    member.addRole(member.guild.roles.find("name", "Membre"));
    member.createDM().then(channel => {
        channel.send({
            file : "Bienvenue.jpg"
        });
        channel.send("Oh, bienvenue à Zaphytopia ! :two_hearts: \nMerci d'avoir rejoint ! Surtout, vas lire les règles pour éviter les mauvaises surprises ! \nPick quelques rôles que tu souhaite. Et n'oublie pas de te présenter ! \nMerci pour ta présence ! :cookie: \n*Nakomii* ~")
    });
});

Bot.on('message', message => {
    if (message.content === 'Nhelp') {
        message.channel.send({embed: {
            color: 3447003,
            title: '**Commandes**',
            description: 'Voici la liste des textes réactions et leurs réponses',
            fields: [
                {
                    name: '**cc twa**',
                    value: 'Coucou lawl'
                },
                {
                    name: '**j\'aime les chats**',
                    value: 'Moi aussi x3'
                },
                {
                    name: '**c\'est gentil / C\'est pajenti / C\'est pas très très gentil**',
                    value: 'Ouaaaah merci Captain Obvious !'
                },
                {
                    name: '**Mange tes morts Nakomii**',
                    value: '__Part se mettre en PLS pour se remettre en question sur son utilité par rapport à l\'univers et à la l\'aplanification de la planète Terre__'
                },
                {
                    name: '**Cute test** + mention',
                    value: 'A quel point tu forme un beau couple ?'
                },
                {
                    name: '**Nmort** + mention (non obligatoire)',
                    value: 'Pour insulter quelqu\'un avec classe.'
                },
                {
                    name: '**Nslap / Nkiss / Nhug / Ndrown** + mention',
                    value: 'des pitis gifs rigolos ^^'
                },
                {
                    name: '**D\'aures commandes sont cachées**',
                    value: 'C\'est surtout des textes qui m\'interpellent'
                },
            ],
            footer: {
                icon_url: Bot.user.avatarURL,
                text: 'Nakomii Bot by KiOm#8746',
            },
        }})
}})

var oui = [
    "0% / Vous avez fait exprès ou c'est que tu t'est trompé de @ ?",
    "10% / Ouh. C'est pas gagné",
    "20% / C'est possible si t'as de la luck",
    "30% / là je sais pas situer tu te débrouille ",
    "40% / Tant qu'elle te menace pas avec un couteau c'est bon !",
    "50% / Tu fais un pile ou face hihi",
    "60% / YAY",
    "70% / Allez ! Un petit effort !",
    "80% / Je vois pas pourquoi ça marcherais pas ^^",
    "90% / C'est pas parfait mais c'est sûr ",
    "100% / On tient le best couple !"
]
Bot.on("message", (message) => {
    if (message.content.startsWith("Cute test")) {
        let member = message.mentions.members.first()
        if (message.content.startsWith("Cute test " + member)) {
            var randomAnswers = oui[Math.floor(Math.random() * oui.length)];
            message.channel.send(member + " :heart: " + message.author + " / " + randomAnswers);
        }
        else
        message.channel.sendMessage("Je crois qu'il manque la seconde personne.")
    }
});

Bot.on("message", (message) => {
    if(message.content.startsWith("Nsupr")) {
        if(!message.member.hasPermission("ADMINISTRATOR")) return message.reply("patwa")
        let args = message.content.split(" ").slice(1)
        if(!args[0]) return message.channel.send("On en supprime combien ?")
        message.channel.bulkDelete(args[0]).then(() => {
            message.channel.send(`${args[0]} messages ont bien été supprimés `)
        })
    }
});

var verbs = [
    "Allume", "Avale", "Amalgame", "Atomise", "Assaisonne",
    "Badigeonne", "Baise", "Bourre", "Baptise", "Bouillonne", "Barbouille", "Bascule", "Balaye", "Bastonne",
    "Climatise", "Catapulte", "Culbute", "Cuisine", "Crucifie",
    "Décalotte", "Défouraille", "Déforeste", "Déracine", "Déterre", "Démarre",
    "Emince", "Eviscere", "Engraisse", "Enterre", "Epluche",
    "Fiscalise", "Fossilise", "Fourre", "Falsifie",
    "Gargarise", "Grignote", "Goupille",
    "Humidifie", "Hydrate", "Hydrogenise",
    "Inhale", "Informatise", "Irrite", "Immortalise", "Irradie", "Immunise",
    "Javellise", "Jalonne", "Jardine",
    "Kidnappe", "Klaxonne",
    "Lessive", "Lobotomise", "Lardonne", "Linéarise", "Localise", "Liquéfie", "Légalise",
    "Momifie", "Météorise", "Massacre", "Mazoute", "Multiplie", "Mensualise", "Minéralise", "Magnétise", "Mange", "Matraque",
    "Nébulise", "Numérise", "Napalmise", "Nettoie", "Nucléarise", "Nitrifie",
    "Occidentalise", "Opprime", "Oxygène", "Octuple", "Obnubile",
    "Pianotte", "Parfume", "Pondère", "Prophétise", "Programme", "Pronostique", "Postiche", "Pasteurise", "Perfore", "Pourchasse", "Pulvérise", "Procrastine",
    "Quadrille", "Quadruple", "Querelle", "Quantifie", "Quintuple",
    "Recèle", "Racommode", "Révolutionne", "Rumine", "Ruisselle", "Réquisitionne", "Rafale",
    "Saupoudre", "Surcharge", "Surchauffe", "SurcÃ´te", "Scannerise", "Surligne", "Ségrégationne", "Sirote", "Standardise", "Sacrifie", "Suce",
    "Tabasse", "Temporalise", "Totémise", "Tronçonne", "Tuberculise", "Transpose", "Tuyaute", "Turlupine", "Tyrannise", "Tamponne", "Tambourine", "Taillade", "Traumatise",
    "Ulcère", "Universalise", "Usurpe", "Urbanise", "Uniformise", "Urine",
    "Vocifère", "Vouvoie",  "Vampirise", "Valdingue", "Vulgarise"
  ];
  
  var nouns = [
    " tes morts", " tes grands morts", " tes ancètres", " tes grands ancètres", " ton oncle", " ton grand-oncle", " ta tante", " ta grande-tante", " tes descendants", " ta généalogie"
  ];
  
 Bot.on("message", (message) => {
        if (message.content.startsWith("Nmort")) {
            var nb_v = verbs[Math.floor(Math.random() * verbs.length)];
            var nb_n = nouns[Math.floor(Math.random() * nouns.length)];
            let member = message.mentions.members.first()
            if (message.content.startsWith("Nmort " + member)) {
            message.channel.send(member + " " + nb_v + nb_n);
            }
            else message.channel.send(nb_v + nb_n);
        }
});

Bot.on('guildMemberRemove', member => {
    member.guild.channels.find("id", "481576622517125122").sendMessage("Oh bah, **" + member.displayName + "** viens de quitter le Serveur ! Han ch'est dommage ! Cha fera plus de pancakes pour nous.");
});

Bot.on('message', message => {
    if(message.content.startsWith('ah')) {
        message.channel.send('Ah ! Un autre Denis Brogniart !');
    }
});

Bot.on('message', message => {
    if(message.content.startsWith('cc twa')) {
        message.channel.send('Coucou lawl');
    }
});

Bot.on('message', message => {
    if(message.content.startsWith('bienvenue')) {
        message.channel.send('Bienvenue ! ^^');
    }
});

Bot.on('message', message => {
    if(message.content.startsWith('j\'aime les chats')) {
        message.channel.send('Moi aussi x3');
    }
});

Bot.on('message', message => {
    if(message.content.startsWith('salut')) {
        message.channel.send('Salut ' + message.member.user);
    }
});

Bot.on('message', message => {
    if(message.content.startsWith('c\'est gentil')) {
        message.channel.send('Ouaaaah merci Captain Obvious !');
    }
});

Bot.on('message', message => {
    if(message.content.startsWith('C\'est pajenti')) {
        message.channel.send('Ouaaaah merci Captain Obvious !');
    }
});

Bot.on('message', message => {
    if(message.content.startsWith('C\'est pas gentil')) {
        message.channel.send('Ouaaaah merci Captain Obvious !');
    }
});

Bot.on('message', message => {
    if(message.content.startsWith('C\'est pas très très gentil')) {
        message.channel.send('Ouaaaah merci Captain Obvious !');
    }
});

Bot.on('message', message => {
    if(message.content.startsWith('témosh')) {
        message.channel.send('Moi peut être mais toi c\'est sûr');
    }
});

Bot.on('message', message => {
    if(message.content.startsWith(':c ')) {
        message.channel.send('Pleure bien mdr ^^');
    }
});

Bot.on('message', message => {
    if(message.content.startsWith('Révolution !')) {
        message.channel.send('Non.');
    }
});

Bot.on('message', message => {
    if(message.content.startsWith('tg')) {
        message.channel.send('TA GUEULE §§§§§§§§ TEMOCH ET T PA BO §§§');
    }
});

Bot.on('message', message => {
    if(message.content.startsWith('ckoi')) {
        message.channel.send('Sinon tonton Google il va t\'aider !');
    }
});

Bot.on('message', message => {
    if(message.content.startsWith('c\'est quoi ?')) {
        message.channel.send('Sinon tonton Google il va t\'aider !');
    }
});

Bot.on('message', message => {
    if(message.content.startsWith('cki')) {
        message.channel.send('Sinon tonton Google il va t\'aider !');
    }
});

Bot.on('message', message => {
    if(message.content.startsWith('c\'est qui ?')) {
        message.channel.send('Sinon tonton Google il va t\'aider !');
    }
});

Bot.on('message', message => {
    if(message.content.startsWith('omg')) {
        message.channel.send('OMG !!!');
    }
});

Bot.on('message', message => {
if(message.content.startsWith('omfg')) {
message.channel.send('O');
}
});

Bot.on('message', message => {
    if(message.content.startsWith('Mange tes morts Nakomii')) {
        message.channel.send('__Part se mettre en PLS pour se remettre en question sur son utilité par rapport à l\'univers et à la l\'aplanification de la planète Terre__');
    }
});

Bot.on('message', message => {
    if(message.content.startsWith('kawaii desu')) {
        message.channel.send("DESU DESU DESU DESU DESU DESU DESU DESU DESU");
    }
});

Bot.on('message', message => {
    if(message.content.startsWith('Ndrown')) {
        let member = message.mentions.members.first()
        if (message.content.startsWith("Ndrown " + member)) {
            var drownrich= new Discord.RichEmbed()
                .setColor('#FF1493')
                .setDescription(member + " meurt noyé par " + message.author + " !")
                .setImage('https://media1.tenor.com/images/2cb87ee9662473bae186436072f91ce6/tenor.gif?itemid=5543161')
            message.channel.send(drownrich)
        }
        else
            message.channel.sendMessage("Ouh j'ai pas localisé la cible. As-tu mentionné ?")
    }
});

Bot.on('message', message => {
    if(message.content.startsWith('Nkiss')) {
        let member = message.mentions.members.first()
            if (message.content.startsWith("Nkiss " + member)) {
                var kiss = [
                    "https://media.giphy.com/media/flmwfIpFVrSKI/giphy.gif",
                    "https://media.giphy.com/media/Y9iiZdUaNRF2U/giphy.gif",
                    "https://media.giphy.com/media/zkppEMFvRX5FC/giphy.gif",
                    "https://media.giphy.com/media/EVODaJHSXZGta/giphy.gif",
                    "https://media.giphy.com/media/j98SQB5Y7WqnC/giphy.gif",
                    "https://media.giphy.com/media/vUrwEOLtBUnJe/giphy.gif",
                    "https://media.giphy.com/media/oHZPerDaubltu/giphy.gif",
                    "https://media.giphy.com/media/RDMV8XCgacl1K/giphy.gif",
                    "https://media.giphy.com/media/KH1CTZtw1iP3W/giphy.gif",
                ]
                var gif = kiss[Math.floor(Math.random() * kiss.length)]
                var kissrich= new Discord.RichEmbed()
                .setColor('#FF1493')
                .setDescription(member + " tu as eu un bisou de " + message.author + " !")
                .setImage(gif)
                message.channel.send(kissrich)
            }
            else{
                message.channel.send("Tu as mal effectué la commande ;--;")
            }}
});

var mdr = [
    "Que dit un congélateur au début d'une course? **One, two, frigo !**",
    "Que dit on d'un informaticien doué? **On dit qu'il Excel.**",
    "Quel est le logiciel qui s'est échappé? **Libre Office.**",
    "Que mérite le père Noël? **Il merryte Christmas.**",
    "Quelle lettre est différente des autres? **Le K particulier.**",
    "Quel logiciel de Microsoft est connu par le monde entier? **Microsoft World.**",
    "Comment appelle t on un fichier qui en fait trop? **Un fichier exessif.**",
    "Comment appelle t on le grand père éloigné d'un égyptien? **Un papyrusse.**",
    "Quelle est la prise préférée d'un musicien? **La clé de sol.**",
    "Quel est le pays préféré des polices de caractère? **L'Italique.**",
    "Quel est le plus gros ordinateur d'Apple? **Le Big Mac.**",
    "Comment appelle t on le point de passage du désert? **Le sheik point.**",
    "Quel est l'entraîneur qui fait de la musique? **DJ Deschamps.**",
    "Quelle est la chanson préférée d'un Linux? **Une vie de Root.**",
    "Que dit un pistolet lorsqu'il trouve quelque chose bizarre? **C'est glock.**",
    "Comment appelle-t-on une erreur grave à la Maison Blanche? **Un pêché Capitole.**",
    "Que dit t-on d'une armoire facilement irritable? **Qu'elle n'est pas commode.**",
    "Quel est le poisson qui sert des boissons? **Le bar.**",
    "Quel est le Jeu préféré d'un historique? **Cache-cache.**",
]
Bot.on("message", (message) => {
    if (message.content.startsWith("Nblague")) {
        var randomAnswers = mdr[Math.floor(Math.random() * mdr.length)];
        message.channel.send(randomAnswers);
    }
});


Bot.on('message', message => {
    if(message.content.startsWith('Nhug')) {
        let member = message.mentions.members.first()
        if (message.content.startsWith("Nhug " + member)) {
            var hug = [
                "https://media.giphy.com/media/BXrwTdoho6hkQ/giphy.gif",
                "https://media.giphy.com/media/IRUb7GTCaPU8E/giphy.gif",
                "https://media.giphy.com/media/WEQJ3ObydsQ36/giphy.gif",
                "https://media.giphy.com/media/DjczAlIcyK1Co/giphy.gif",
                "https://media.giphy.com/media/Io8zphsTlufnO/source.gif",
            ]
            var gif = hug[Math.floor(Math.random() * hug.length)]
            var hugrich= new Discord.RichEmbed()
            .setColor('#FF1493')
            .setDescription(member + " tu as eu un gro cal1 de " + message.author + " !")
            .setImage(gif)
            message.channel.send(hugrich)
        }
        else{
            message.channel.send("Tu as mal effectué la commande ;--;")
        }}
});

Bot.on('message', message => {
    if(message.content.startsWith('Nslap')) {
        let member = message.mentions.members.first()
        if (message.content.startsWith("Nslap " + member)) {
            var slap = [
                "https://media.giphy.com/media/yfrwZqRvJ5WFy/source.gif",
                "https://media.giphy.com/media/Zau0yrl17uzdK/giphy.gif",
                "https://media.giphy.com/media/QNSdi565f9JWU/giphy.gif",
                "https://media.giphy.com/media/fO6UtDy5pWYwM/giphy.gif",
                "https://media.giphy.com/media/tX29X2Dx3sAXS/giphy.gif",
                "https://media.giphy.com/media/l0IyiWcrQzwNerC8g/source.gif",
                "https://media.giphy.com/media/g3pBhLeqTxNJK/source.gif",
            ]
            var gif = slap[Math.floor(Math.random() * slap.length)]
            var slaprich= new Discord.RichEmbed()
            .setColor('#FF1493')
            .setDescription(member + " s'est fait taper par " + message.author + ", bouh le vilain !")
            .setImage(gif)
            message.channel.send(slaprich)
        }
        else{
            message.channel.send("Tu as mal effectué la commande ;--;")
        }}
});

Bot.on('message', message => {
    if (message.author.id == 511953092896620575) {
        if (message.content.startsWith('Nako ')) {
        message.delete(1);
        var str = message.content
        message.channel.sendMessage(str.substring(5))
        }
}   
});

Bot.on('message', message => {
    if(message.content.startsWith('LE FUN')) {
        message.channel.send({
            file : "KiOmSEclate.gif"
         });
    }
});
        
Bot.on('message', message => {
    if(message.content.startsWith('send help')) {
        message.channel.send({
            file : "send help.PNG"
         });
    }
});

Bot.login(process.env.TOKEN) // Token Sécurisé tavu
