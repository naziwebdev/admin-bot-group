const { Telegraf } = require("telegraf");
const redis = require("./redis");
require("dotenv").config();

const {
  banUser,
  unbanUser,
  promoteUser,
  demoteUser,
} = require("./actions/actions");

const token = process.env.TELEGRAM_TOKEN;

const bot = new Telegraf(token);

//join member to group
bot.on("new_chat_members", async (ctx) => {
  const newMebmer = ctx.message.new_chat_member.first_name;

  //for check invite count
  const newMembers = ctx.message.new_chat_members;
  const inviter = ctx.message.from.id;

  for (const member of newMembers) {
    await redis.incr(`user:${inviter}:invited`);
  }

  ctx.reply(`${newMebmer}  عزیز به گروه خوش آمدید 😍`);
});

//left member the group
bot.on("left_chat_member", async (ctx) => {
  const leftMember = ctx.message.left_chat_member.first_name;
  const inviter = ctx.message.from.id;

  await redis.del(`user:${inviter}:invited`);

  ctx.reply(`${leftMember} از گروه لفت داد`);
});

bot.on("message", async (ctx) => {
  const message = ctx.message.text;
  const userId = ctx.message.from.id;
  const groupId = ctx.message.chat.id;

  const invitedCount = await redis.get(`user:${userId}:invited`);

  // get role user
  const chatMemberRole = await ctx.telegram.getChatMember(groupId, userId);

  if (
    (invitedCount > 1 && chatMemberRole.status !== "creator") ||
    chatMemberRole.status !== "administrator"
  ) {
    if (ctx.message.reply_to_message) {
      if (message.startsWith("/")) {
        if (
          chatMemberRole.status === "creator" ||
          chatMemberRole.status === "administrator"
        ) {
          const userIdReplied = ctx.message.reply_to_message.from.id;
          if (message === "/ban") {
            banUser(ctx, userIdReplied);
          } else if (message === "/unban") {
            unbanUser(ctx, userIdReplied);
          } else if (message === "/promote") {
            promoteUser(ctx, userIdReplied);
          } else if (message === "/demote") {
            demoteUser(ctx, userIdReplied);
          } else if (message === "/del") {
            await ctx.deleteMessage(ctx.message.reply_to_message.message_id);
            ctx.reply("پیام با موفقیت حذف شد");
          }
        }
      }
    }
  } else {
    ctx.deleteMessage();
    ctx.reply(
      `${ctx.message.from.first_name} برای ارسال پیام در گروه ابندا یک نفر را به گروه دعوت کنید`
    );
  }
});

bot.launch();
