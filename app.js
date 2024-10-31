const { Telegraf } = require("telegraf");
require("dotenv").config();

const token = process.env.TELEGRAM_TOKEN;

const bot = new Telegraf(token);


//join member to group
bot.on("new_chat_members", (ctx) => {
  const newMebmer = ctx.message.new_chat_member.first_name;

  ctx.reply(`${newMebmer}  عزیز به گروه خوش آمدید 😍`);
});



//left member the group
bot.on("left_chat_member", (ctx) => {
  const leftMember = ctx.message.left_chat_member.first_name;

  ctx.reply(`${leftMember} از گروه لفت داد`);
});


bot.launch()