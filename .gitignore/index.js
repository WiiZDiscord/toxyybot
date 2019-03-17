const Discord = require('discord.js');

const bot = new Discord.Client();
const client = new Discord.Client();

var prefix = 't/';

const fs = require("fs-extra");

bot.login(process.env.TOKEN)

bot.on('ready', () => {
    console.log("ToxYy Bot Online")
    bot.user.setStatus("Online")
    bot.user.setGame("t/help | ToxYy Bot")
})

// HELP DEBUT
bot.on('message', message => {
    if(message.content === prefix + 'mod'){
      var mod_embed = new Discord.RichEmbed()
      .setColor("#B9121B")
      .setTitle("Page d'aide de Moderation :tools:")
      .setThumbnail(message.author.avatarURL)
      .addField("Modération - Basique :tools:", "t/kick - Permet de kick un utilisateur\nt/mute - Permet de mute un utilisateur\nt/unmute - Permet d'unmute un utilisateur\nt/clear - Permet de supprimer un nombre de message définit\nt/ping - Affiche le temp de latence avec le serveur")
      .addField("Modération - Avancé :tools:", "t/ban - Permet de ban un utilisateur\nt/warn - Permet d'avertir un utilisateur\nt/seewarns - Permet d'afficher les avertissement d'un utilisateur\nt/deletewarns - Permet de supprimer un avertissement d'un utilisateur ")
      message.channel.send(mod_embed);
    }

    if(message.content === prefix + 'sb'){
      var sb_embed = new Discord.RichEmbed()
      .setColor("#046380")
      .setTitle("Page d'aide des Infos :bulb:")
      .setThumbnail(message.author.avatarURL)
      .addField("Commandes:",  "t/statistique - Envoie les statistiques de l'utilisateur en privé\nt/info - Affiche les infos du bot et du serveur")
      message.channel.send(sb_embed);
    }

    if(message.content === "w-i"){
      var help_embed = new Discord.RichEmbed()
      .setColor("RANDOM")
      .setTitle("Page d'aide :wink:")
      .setThumbnail(message.author.avatarURL)
      .addField("Modération :tools:", "Faites `t/mod` pour afficher les commandes de modération")
      .addField("Infos :bulb:", "Faites `t/sb` pour afficher les commandes d'infos")
      .addField(":warning: INFO IMPORTANTE :warning:", "NE PAS FAIRE DE COMMANDE EN PRIVE !!\nSauf `t/mod`, `t/sb`")
      .setFooter("Dev by WiiZ#9939")
      message.channel.send(help_embed);
      console.log("Menu d'aide demandé !")

    }

    if(message.content === "w-p"){
      var help_embed = new Discord.RichEmbed()
      .setColor("RANDOM")
      .setTitle("Page d'aide :wink:")
      .setThumbnail(message.author.avatarURL)
      .addField("Modération :tools:", "Faites `/mod` pour afficher les commandes de modération")
      .addField("Infos :bulb:", "Faites `/sb` pour afficher les commandes d'infos")
      .addField(":warning: INFO IMPORTANTE :warning:", "NE PAS FAIRE DE COMMANDE EN PRIVE !!\nSauf `t/mod`,`t/sb`")
      .setFooter("Dev by WiiZ#9949")
      message.reply("Check Your DM's")
      message.author.send(help_embed);
      console.log("Menu d'aide demandé !")

    }

    if(message.content === prefix + "help"){
        message.channel.send("Où veux tu que la page d'aide apparaisse ? \n```css\nw-i\n[ICI]```\n")
        message.channel.send("```css\nw-p\n[PRIVÉ]```")
    }
// HELP FIN
    if(message.content === prefix + 'info') {
        var info_embed = new Discord.RichEmbed()
        .setColor("#40A497")
        .setTitle("Voici les infos sur moi et sur le serveur")
        .addField(" :robot: Nom du bot :", `${bot.user.username}`, true)
        .addField(":hash: Descriminateur du bot", `#${bot.user.discriminator}`)
        .addField(":id: ID du bot", `${bot.user.id}`)
        .addField(":name_badge: Nom du discord", message.guild.name)
        .addField(":fire: Créateur du discord", message.guild.owner)
        .addField(":id: ID du créateur", message.guild.ownerID)
        .addField(":100: Nombre de membres sur le serveur :", message.guild.members.size)
        .addField(":100: Nombre de catégories et de salons :", message.guild.channels.size)
        .addField(":100: Nombre de roles", message.guild.roles.size)
        .setThumbnail(message.guild.iconURL)
        .setFooter("Dev by WiiZ#9939")
        message.channel.sendMessage(info_embed)
    }

    if(message.content.startsWith(prefix + "kick")) {
        if(!message.guild.member(message.author).hasPermission("KICK_MEMBERS")) return message.channel.send("Vous ne pouvez pas effectuer ceci !");

        if(message.mentions.users.size === 0) {
            return message.channel.send("Veuillez mentionner un utilisateur ! :x:")
        }
        var kick = message.guild.member(message.mentions.users.first());
        if(!kick) {
            return message.channel.send("Utilisateur imposible à expulser ou celui-ci n'existe pas")
        }

        if(!message.guild.member(bot.user).hasPermission("KICK_MEMBERS")) {
            return message.channel.send("Je n'ai pas la permission de kick");
        }

        kick.kick().then(member => {
          var kick_embed = new Discord.RichEmbed()
            .setTitle("Kick")
            .addField("Membre kick", member.user.username)
            .addField("Kick Par", message.author.username)
            message.channel.send(kick_embed);
        });
    }

    if(message.content.startsWith(prefix + 'ban')) {
        if(!message.guild.member(message.author).hasPermission("BAN_MEMBERS")) return message.channel.send("Tu ne peux pas ban d'utilisateur !");

        if(message.mentions.users.size === 0) {
            return message.channel.send("Veuillez mentionner un utilisateur a ban :x:");
        }

        var ban = message.guild.member(message.mentions.users.first());
        if(!ban) {
            return message.channel.send("Je ne peut pas ban cet utilisateur, celui ci n'existe peut être pas ou est plus puissant que moi :thinking:");
        }

        if(!message.guild.member(bot.user).hasPermission("BAN_MEMBERS")) {
            return message.channel.send("Je n'ai pas la permission de ban");
        }
        ban.ban().then(member => {
            message.channel.send(`**${member.user.username}** a été banni par __${message.author.username}__`)
        }

        )
    }

    if(message.content.startsWith(prefix + "clear")) {
        if(!message.guild.member(message.author).hasPermission("MANAGE_MESSAGES")) return message.channel.send("Vous n'avez pas la permission");

        let args = message.content.split(" ").slice(1);

        if(!args[0]) return message.channel.send("Précise un nombre de message a supprimer")
        message.channel.bulkDelete(args[0]).then(() => {
            message.channel.send(`**${args[0]}** messages supprimés !`);
        })
    }

    if(message.content.startsWith(prefix + "mute")) {
        if(!message.guild.member(message.author).hasPermission("ADMINISTRATOR")) return message.channel.send("Vous n'avez pas la permission");

        if(message.mentions.users.size === 0) {
            return message.channel.send("Veuillez mentionner un utilisateur");
        }

        var mute = message.guild.member(message.mentions.users.first());
        if(!mute) {
            return message.channel.send("Utilisateur introuvable ou impossible à mute");
        }

        if(!message.guild.member(bot.user).hasPermission("ADMINISTRATOR")) return message.channel.send("Je n'ai pas la permission de mute");
        message.channel.overwritePermissions(mute, { SEND_MESSAGES: false}).then(member => {
            message.channel.send(`${mute.user.username} a été mute !`);
        })
    }

    if(message.content.startsWith(prefix + "unmute")) {
        if(!message.guild.member(message.author).hasPermission("ADMINISTRATOR")) return message.channel.send("Vous n'avez pas la permission");

        if(message.mentions.users.size === 0) {
            return message.channel.send("Veuillez mentionner un utilisateur");
        }

        var mute = message.guild.member(message.mentions.users.first());
        if(!mute) {
            return message.channel.send("Utilisateur introuvable ou impossible à mute");
        }

        if(!message.guild.member(bot.user).hasPermission("ADMINISTRATOR")) return message.channel.send("Je n'ai pas la permission de mute");
        message.channel.overwritePermissions(mute, { SEND_MESSAGES: true}).then(member => {
            message.channel.send(`${mute.user.username} n est plus mute !`);
        })
    }
});

    //NE PAS OUBLIER LES PREREQUIS DANS LA VIDEO :

let warns = JSON.parse(fs.readFileSync("./warns.json", "utf8"));

bot.on("message", message => {

if (message.content.startsWith(prefix + "warn")){

if (message.channel.type === "dm") return;

var mentionned = message.mentions.users.first();

if(!message.guild.member(message.author).hasPermission("MANAGE_GUILD")) return message.reply("**:x: Vous n'avez pas la permission `Gérer le serveur` dans ce serveur**").catch(console.error);

if(message.mentions.users.size === 0) {

  return message.channel.send("**:x: Vous n'avez mentionnée aucun utilisateur**");

}else{

    const args = message.content.split(' ').slice(1);

    const mentioned = message.mentions.users.first();

    if (message.member.hasPermission('MANAGE_GUILD')){

      if (message.mentions.users.size != 0) {

        if (args[0] === "<@!"+mentioned.id+">"||args[0] === "<@"+mentioned.id+">") {

          if (args.slice(1).length != 0) {

            const date = new Date().toUTCString();

            if (warns[message.guild.id] === undefined)

              warns[message.guild.id] = {};

            if (warns[message.guild.id][mentioned.id] === undefined)

              warns[message.guild.id][mentioned.id] = {};

            const warnumber = Object.keys(warns[message.guild.id][mentioned.id]).length;

            if (warns[message.guild.id][mentioned.id][warnumber] === undefined){

              warns[message.guild.id][mentioned.id]["1"] = {"raison": args.slice(1).join(' '), time: date, user: message.author.id};

            } else {

              warns[message.guild.id][mentioned.id][warnumber+1] = {"raison": args.slice(1).join(' '),

                time: date,

                user: message.author.id};

            }

            fs.writeFile("./warns.json", JSON.stringify(warns), (err) => {if (err) console.error(err);});

message.delete();

            message.channel.send(':warning: | **'+mentionned.tag+' à été averti**');

message.mentions.users.first().send(`:warning: **Warn |** depuis **${message.guild.name}** donné par **${message.author.username}**\n\n**Raison:** ` + args.slice(1).join(' '))

          } else {

            message.channel.send("Erreur mauvais usage: "+prefix+"warn <user> <raison>");

          }

        } else {

          message.channel.send("Erreur mauvais usage: "+prefix+"warn <user> <raison>");

        }

      } else {

        message.channel.send("Erreur mauvais usage: "+prefix+"warn <user> <raison>");

      }

    } else {

      message.channel.send("**:x: Vous n'avez pas la permission `Gérer le serveur` dans ce serveur**");

    }

  }

}



  if (message.content.startsWith(prefix+"seewarns")||message.content===prefix+"seewarns") {

if (message.channel.type === "dm") return;

if(!message.guild.member(message.author).hasPermission("MANAGE_GUILD")) return message.reply("**:x: Vous n'avez pas la permission `Gérer le serveur` dans ce serveur**").catch(console.error);

    const mentioned = message.mentions.users.first();

    const args = message.content.split(' ').slice(1);

    if (message.member.hasPermission('MANAGE_GUILD')){

      if (message.mentions.users.size !== 0) {

        if (args[0] === "<@!"+mentioned.id+">"||args[0] === "<@"+mentioned.id+">") {

          try {

            if (warns[message.guild.id][mentioned.id] === undefined||Object.keys(warns[message.guild.id][mentioned.id]).length === 0) {

              message.channel.send("**"+mentioned.tag+"** n'a aucun warn :eyes:");

              return;

            }

          } catch (err) {

            message.channel.send("**"+mentioned.tag+"** n'a aucun warn :eyes:");

            return;

          }

          let arr = [];

          arr.push(`**${mentioned.tag}** a **`+Object.keys(warns[message.guild.id][mentioned.id]).length+"** warns :eyes:");

          for (var warn in warns[message.guild.id][mentioned.id]) {

            arr.push(`**${warn}** - **"`+warns[message.guild.id][mentioned.id][warn].raison+

            "**\" warn donné par **"+message.guild.members.find("id", warns[message.guild.id][mentioned.id][warn].user).user.tag+"** a/le **"+warns[message.guild.id][mentioned.id][warn].time+"**");

          }

          message.channel.send(arr.join('\n'));

        } else {

          message.channel.send("Erreur mauvais usage: "+prefix+"seewarns <user> <raison>");

          console.log(args);

        }

      } else {

        message.channel.send("Erreur mauvais usage: "+prefix+"seewarns <user> <raison>");

      }

    } else {

      message.channel.send("**:x: Vous n'avez pas la permission `Gérer le serveur` dans ce serveur**");

    }

  }





  if (message.content.startsWith(prefix+"deletewarns")||message.content===prefix+"deletewarns") {

if (message.channel.type === "dm") return;

if(!message.guild.member(message.author).hasPermission("MANAGE_GUILD")) return message.reply("**:x: Vous n'avez pas la permission `Gérer le serveur` dans ce serveur**").catch(console.error);

   const mentioned = message.mentions.users.first();

    const args = message.content.split(' ').slice(1);

    const arg2 = Number(args[1]);

    if (message.member.hasPermission('MANAGE_GUILD')){

      if (message.mentions.users.size != 0) {

        if (args[0] === "<@!"+mentioned.id+">"||args[0] === "<@"+mentioned.id+">"){

          if (!isNaN(arg2)) {

            if (warns[message.guild.id][mentioned.id] === undefined) {

              message.channel.send(mentioned.tag+" n'a aucun warn");

              return;

            } if (warns[message.guild.id][mentioned.id][arg2] === undefined) {

              message.channel.send("**:x: Ce warn n'existe pas**");

              return;

            }

            delete warns[message.guild.id][mentioned.id][arg2];

            var i = 1;

            Object.keys(warns[message.guild.id][mentioned.id]).forEach(function(key){

              var val=warns[message.guild.id][mentioned.id][key];

              delete warns[message.guild.id][mentioned.id][key];

              key = i;

              warns[message.guild.id][mentioned.id][key]=val;

              i++;

            });

            fs.writeFile("./warns.json", JSON.stringify(warns), (err) => {if (err) console.error(err);});

            if (Object.keys(warns[message.guild.id][mentioned.id]).length === 0) {

              delete warns[message.guild.id][mentioned.id];

            }

            message.channel.send(`Le warn de **${mentioned.tag}**\': **${args[1]}** a été enlevé avec succès!`);

            return;

          } if (args[1] === "tout") {

            delete warns[message.guild.id][mentioned.id];

            fs.writeFile("./warns.json", JSON.stringify(warns), (err) => {if (err) console.error(err);});

            message.channel.send(`Les warns de **${mentioned.tag}** a été enlevé avec succès!`);

            return;

          } else {

            message.channel.send("Erreur mauvais usage: "+prefix+"clearwarns <utilisateur> <nombre>");

          }

        } else {

          message.channel.send("Erreur mauvais usage: "+prefix+"clearwarns <utilisateur> <nombre>");

        }

      } else {

       message.channel.send("Erreur mauvais usage: "+prefix+"clearwarns <utilisateur> <nombre>");

      }

    } else {

      message.channel.send("**:x: Vous n'avez pas la permission `Gérer le serveur` dans ce serveur**");

    }

  }

    if(!message.content.startsWith(prefix)) return;

    var args = message.content.substring(prefix.length).split(" ");

    switch (args[0].toLowerCase()) {
        case "statistique":

        var userCreateDate = message.author.createdAt.toString().split(" ");
        var msgauthor = message.author.id;

        var stats_embed = new Discord.RichEmbed()
        .setColor("#FCDC12")
        .setTitle(`Statistiques de l'utilisateur : ${message.author.username}`)
        .addField(`ID de l'utilisateur :id:`, msgauthor, true)
        .addField(`Statut de l'utilisateur`, message.author.status, true)
        .addField(`Plus haut role de l'utilisateur`, `${message.author.top_role}`)
        .addField(`Date de création de l'utilisateur:`, userCreateDate[1] + ' ' + userCreateDate[2] + ' ' + userCreateDate[3])
        .setFooter("Dev by WiiZ#9939")
        .setThumbnail(message.author.avatarURL)
        message.channel.send({embed: stats_embed});
        break;
        case "ping":
        message.channel.sendMessage('Temps de latence avec le serveur: `' + `${message.createdTimestamp - Date.now()}` + ' ms`');
        break;
    }
});

// --------------------------  FUN  ----------------------------------------------------

  bot.on('message', message => {

  if(message.content.startsWith(prefix + "sondage")) {
    if(!message.guild.member(message.author).hasPermission("ADMINISTRATOR")) return message.channel.send("Tu ne peux pas effectuer de sondage");
      let args = message.content.split(" ").slice(1);
      let thingToEcho = args.join(" ")
      var embed = new Discord.RichEmbed()
        .setDescription(":tada: Sondage :tada:")
        .addField(thingToEcho, "Répondre avec :white_check_mark: ou :x:")
        .setColor("0x0000FF")
        .setTimestamp()
      message.delete();
      message.channel.send("@everyone !")
      message.channel.send(embed)
      .then(function (message) {
        message.react("✅")
        message.react("❌")
      }).catch(function() {
      });
      }});


bot.on('guildMemberAdd', member => {
  const channel = member.guild.channels.find(ch => ch.name === '⚡arrivé-départ⚡');
  if(!channel) return;
  channel.send(`**[+]** Bienvenue **${member}** sur le serveur !`)
})

bot.on('guildMemberRemove', member => {
  const channel = member.guild.channels.find(ch => ch.name === '⚡arrivé-départ⚡');
  if(!channel) return;
  channel.send(`**[-]** **${member}** nous a quittés !`)
})

bot.on('message', message => {

  let msg = message.content.toLowerCase();
  let args = message.content.slice(prefix.length).trim().split(' ');
  let command = args.shift().toLowerCase();
  let say = args.join(' ');

  if(command === 'say') {
  if(!args[0]) return message.channel.send("Veuillez Introduire Un Texte ");
    var help_embed = new Discord.RichEmbed()
    .setColor('RANDOM')
    .addField(`Annonce`, `${say}`)
    message.channel.sendEmbed(help_embed)

    message.delete();
  }
})
