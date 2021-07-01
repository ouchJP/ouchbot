const Discord = require('discord.js');
const VNDB = require('vndb-api')
require('dotenv').config();
require('discord-reply');
require('discord-starboards');
const client = new Discord.Client({
  partials: ['MESSAGE', 'REACTION', 'CHANNEL'],
});

client.login(process.env.BOT_TOKEN)

client.on("ready", function () {
  console.log(`the client becomes ready to start`);
  console.log(`I am ready! Logged in as ${client.user.tag}!`);
  console.log(`Bot has started, with ${client.users.size} users, in ${client.channels.size} channels of ${client.guilds.size} guilds.`);

  client.user.setActivity("装甲悪鬼村正");
  client.generateInvite(['SEND_MESSAGES', 'MANAGE_GUILD', 'MENTION_EVERYONE'])
    .then(link => {
      console.log(`Generated bot invite link: ${link}`);
      inviteLink = link;
    });
});

///////////////////////   RANK AUTO ROLE /////////////////////

client.on('messageReactionAdd', async (reaction, user) => {
  if (reaction.message.partial) await reaction.message.fetch();
  if (reaction.partial) await reaction.fetch();
  if (user.bot) return;
  if (!reaction.message.guild) return;
  if (reaction.message.channel.id == '840978058587668480') {
    if (reaction.emoji.name === '⭐') {
      await reaction.message.guild.members.cache
        .get(user.id)
        .roles.add('772668705325973515');
    }
  } else return;
});

// Removing reaction roles
client.on('messageReactionRemove', async (reaction, user) => {
  if (reaction.message.partial) await reaction.message.fetch();
  if (reaction.partial) await reaction.fetch();
  if (user.bot) return;
  if (!reaction.message.guild) return;
  if (reaction.message.channel.id == '840978058587668480') {
    if (reaction.emoji.name === '⭐') {
      await reaction.message.guild.members.cache
        .get(user.id)
        .roles.remove('772668705325973515');
    }
  } else return;
});



//////////////// WELCOME MESSAGE //////////////////////////////

client.on("guildMemberAdd", async member => {
  member.guild.channels.cache.get("772665326168702989").send(`ようことへ、 ${member.user}`);
  console.log(member.user.id + ' joined' + member.user.tag);
});

client.on("guildMemberRemove", (member) => {

  const welcomeChannel = member.guild.channels.cache.find(
    channel => channel.name === "generalis"
  );
  welcomeChannel.send(`Cya in the refold server, ${member.user.tag}!`);
  console.log(member.user.id + ' left' + member.user.tag);
});

//////////////// VNDB ROULETTE //////////////////////////////

const vndb = new VNDB("ouchbot");
 
function rand(min, max) {
  let randomNum = Math.random() * (max - min) + min;
  return Math.floor(randomNum);
}
 
client.on('message', message => {
  if (message.content === '!vnrandom') {
    let x = rand(0, 30084)
 
vndb
  .query(`get vn basic (id = ${x})`)
  .then(response => {
    // Use the response
    console.log(response.items[0]['original'])
    message.channel.send("Your random VN is: " + JSON.stringify(response.items[0]['original']) + ' ' + JSON.stringify(response.items[0]['title']) + ` https://vndb.org/v${x}`);
  })
  .catch(err => {
    // Handle errors
    console.log(err)
  })
  .finally(() => {
  })
 
}});

////////////////FUN STUFF//////////////////

const CensorWords = ["nigger", "faggot", "tranny"]
const Ouch = ["ouch"]
const Miss = ["i miss ouch"]
const DontCare = [`Don't care`, `dont care`]
client.on("message", message => {
  if (CensorWords.some(word => message.toString().toLowerCase().includes(word))) { message.lineReply(`Banned word detected. Reported to discord staff.`) };
});
client.on("message", message => {
  if (message.author.bot) return;
  if (Ouch.some(word => message.toString().toLowerCase().includes(word))) {message.channel.send(`https://cf.ltkcdn.net/dying/images/orig/239669-2131x1407-flowers-on-a-grave.jpg`)};
});
client.on("message", message => {
  if (message.author.bot) return;
  if (Miss.some(word => message.toString().toLowerCase().includes(word))) {message.channel.send(`Ouch misses you too.`)};
});
client.on("message", message => {
  if (message.author.bot) return;
  if (DontCare.some(word => message.toString().toLowerCase().includes(word))) { message.lineReply(`<a:dontcare:852797960746958858>`) };
});