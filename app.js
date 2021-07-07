const Discord = require('discord.js');
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


////////////////FUN STUFF//////////////////

const CensorWords = ["nigger", "faggot", "tranny"]
const Shoui = ["how old are you"]
//const Sava = ["sava"]
const DontCare = [`Don't care`, `dont care`]
client.on("message", message => {
  if (CensorWords.some(word => message.toString().toLowerCase().includes(word))) { message.lineReply(`Banned word detected. Reported to discord staff.`) };
});
client.on("message", message => {
  if (Shoui.some(word => message.toString().toLowerCase().includes(word))) {message.reply(`You think you fuckers are so funny, huh? "Oh chicken asked me my age, i better say some ridiculous number that is retarded on its face." But in reality, you're the one who's retarded on his face. You dont have the slightest idea how hard i work to make these age jokes. If you niggers got off your ass for one second and gave half a bit of thought towards anything you'd be half as funny as me. Actually I'm fucking tired of you fucks. I hope your next birthday is your last, you stupid puss pouring cunt.`)};
});
//client.on("message", message => {
//  if (message.author.bot) return;
//  if (Sava.some(word => message.toString().toLowerCase().includes(word))) {message.channel.send(`<a:SavaAndAiden:857953498498859038>`)};
///});
client.on("message", message => {
  if (message.author.bot) return;
  if (DontCare.some(word => message.toString().toLowerCase().includes(word))) { message.lineReply(`<a:dontcare:852797960746958858>`) };
});