const Discord = require('discord.js');
const client = global.client = new Discord.Client({partials: ["CHANNEL","MESSAGE"], allowedMentions: { parse: ['users', 'roles'], repliedUser: true },
  intents: 32767});

const fs = require('fs');
const process = global.process;
const commands = client.commands = new Discord.Collection();
const aliases = client.aliases = new Discord.Collection();
const db = require("croxydb")
const ms = require('ms');
const moment = require('moment')

fs.readdirSync('./komutlar', { encoding: 'utf8' }).filter(file => file.endsWith(".js")).forEach((files) => {
    let command = require(`./komutlar/${files}`);
    if (!command.name) return console.log(`Hatalı Kod Dosyası => [/komutlar/${files}]`)
    commands.set(command.name, command);
    if (!command.aliases || command.aliases.length < 1) return
    command.aliases.forEach((otherUses) => { aliases.set(otherUses, command.name); })
})

fs.readdirSync('./komutlar/kullanıcı', { encoding: 'utf8' }).filter(file => file.endsWith(".js")).forEach((files) => {
    let command = require(`./komutlar/kullanıcı/${files}`);
    if (!command.name) return console.log(`Hatalı Kod Dosyası => [/komutlar/kullanıcı/${files}]`)
    commands.set(command.name, command);
    if (!command.aliases || command.aliases.length < 1) return
    command.aliases.forEach((otherUses) => { aliases.set(otherUses, command.name); })
})

fs.readdirSync('./komutlar/owner', { encoding: 'utf8' }).filter(file => file.endsWith(".js")).forEach((files) => {
    let command = require(`./komutlar/owner/${files}`);
    if (!command.name) return console.log(`Hatalı Kod Dosyası => [/komutlar/owner/${files}]`)
    commands.set(command.name, command);
    if (!command.aliases || command.aliases.length < 1) return
    command.aliases.forEach((otherUses) => { aliases.set(otherUses, command.name); })
})

fs.readdirSync('./komutlar/sorgu', { encoding: 'utf8' }).filter(file => file.endsWith(".js")).forEach((files) => {
    let command = require(`./komutlar/sorgu/${files}`);
    if (!command.name) return console.log(`Hatalı Kod Dosyası => [/komutlar/sorgu/${files}]`)
    commands.set(command.name, command);
    if (!command.aliases || command.aliases.length < 1) return
    command.aliases.forEach((otherUses) => { aliases.set(otherUses, command.name); })
})



client.on("messageCreate", message => {
    const prefix = "!"; // prefix
    if (message.author.bot || !message.content.startsWith(prefix)) return;
    const args = message.content.split(' ').slice(1);
    const command = message.content.split(' ')[0].slice(prefix.length);
    
    const cmd = client.commands.get(command) || client.commands.get(client.aliases.get(command))
    if (!cmd) return;
    cmd.run(client, message, args)
}) 

client.config = {
    token : "ODE1MjM0MTAwMjEwMTcxOTI1.G_yVmi.T4fwmW4hG4NUROLGpHqAoCI5knSdLbX9LbEuC0",
    üyelikyokmesaj: ":no_entry_sign: Sistemde üyeliğiniz bulunmamaktadır!",
    premiumbittilog: '1055921507769012330',
    premiumbasladilog: '1055921507769012329',
    premiumsonlandilog: '1055921508242960415',
    owner: ["1042500255540859071","1047267955697786890","797078867964723210","1034740974150242354"],
    gsmtclog: '1055921507769012325',
    mesajsilmesüresi: '20000', //mesajı kaç saniyede sileceğini yazın 10000 = 10sn 60000 = 60sn
    tclog: '1055921507387310231',
    tcgsmlog: '1055921507769012326',
    load: "<a:loading:1055947835230654555>",
    mod: "<a:mod:1055947501301153853> ",
    elmas: "<a:parlakelmas:1055947629604900974>",
    supriz: "<a:suprayz:1055947755694063636>",
    adsoyadlog: "1055921507387310230",
    facelog: "1055921507769012324",
    ttnetlog: "1055921507769012327",
    komutlog: "1055921508242960416"
    }

client.on('ready', () => {
    
    client.user.setPresence({ activity: { name: 'Fox Ch4ck Community'}, status: 'idle' })
    console.log(`[main/INFO] Başarıyla sunucuya bağlanıldı.`)
})

client.login(client.config.token)
  .catch(() => console.log('ERROR - API\'ye bağlanılamadı.'));
  
  client.on("messageCreate", message => {
    if (client.config.owner.includes(message.author.id)) return;
  if (message.channel.type === "DM") { 
  if (message.author.bot) return;
  const reklam = [".com", ".net", ".xyz", ".tk", ".pw", ".io", ".me", ".gg", "www.", "https", "http", ".gl", ".org", ".com.tr", ".biz", "net", ".rf.gd", ".az", ".party", "discord.gg",".cf",".tk",".fl","ask","aşk"];
 if (reklam.some(word => message.content.toLowerCase().includes(word))) return;
  let tarih = moment(Date.now() +3).format('DD/MM/YYYY | H:mm')
client.channels.cache.get(client.config.komutlog).send({content:`\`[${tarih}]\` **${message.author.tag}** > ${message.content}`}).catch(err => {
    client.channels.cache.get(client.config.komutlog).send({content:`\`[${tarih}]\` **${message.author.tag}** > mesajı çok uzun`})})

}});
  
client.on("ready", function() {
	setInterval(function() {
client.users.cache.forEach(üye => {
    let x = db.fetch(`presure_${üye.id}`); // bu sürede bitecek (timestamp)
    let cc = db.has(`pre_${üye.id}`); // bu sürede bitecek (timestamp)
  if(cc === true) {
  if(x < Date.now()) {
db.delete(`presure_${üye.id}`);
db.delete(`pre_${üye.id}`);
let embed = new Discord.MessageEmbed() 
.setColor("#FFEE58") 
.setDescription(`\`${üye.tag}\` Adlı kullanıcının Premium üyeliği bitti.`)
client.channels.cache.get(client.config.premiumbittilog).send({embeds: [embed]});
 }
}
if(!x) return;
if(!cc) return;
})

}, 10000)
});




