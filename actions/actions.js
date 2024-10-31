const banUser = (ctx, userIdReplied) => {
  const untilDateRestrict = Math.floor(Date.now() / 1000) + 1800;
  ctx.restrictChatMember(userIdReplied, {
    until_date: untilDateRestrict,
    permissions: {
      can_send_messages: false,
    },
  });

  ctx.reply(
    `کاربر ${ctx.message.reply_to_message.from.first_name} با موفقیت بن شد `
  );
};

const unbanUser = (ctx, userIdReplied) => {
  ctx.restrictChatMember(userIdReplied, {
    permissions: {
      can_send_messages: true,
    },
  });
  ctx.reply(
    `کاربر ${ctx.message.reply_to_message.from.first_name} با موفقیت از بن خارج شد`
  );
};

module.exports = { banUser, unbanUser };
