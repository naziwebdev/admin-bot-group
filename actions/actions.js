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

const promoteUser = (ctx, userIdReplied) => {
  ctx.promoteChatMember(userIdReplied, {
    can_delete_messages: true,
    can_pin_messages: true,
    can_restrict_members: true,
    can_manage_chat: true,
    can_change_info: true,
  });

  ctx.reply(
    `کاربر ${ctx.message.reply_to_message.from.first_name} با موفقیت ادمین شد`
  );
};

const demoteUser = (ctx, userIdReplied) => {
  ctx.promoteChatMember(userIdReplied, {
    can_delete_messages: false,
    can_pin_messages: false,
    can_restrict_members: false,
    can_manage_chat: false,
    can_change_info: false,
  });

  ctx.reply(
    `کاربر ${ctx.message.reply_to_message.from.first_name} با موفقیت کاربر عادی شد`
  );
};

module.exports = { banUser, unbanUser, promoteUser, demoteUser };
