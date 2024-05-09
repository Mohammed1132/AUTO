const moment = require('moment');

const axios = require('axios');

module.exports.config = {

  name: "اوامر",

  version: "1.0.0",

  hasPermission: 0,

  credits: "Blue",

  description: "الحصول على مساعدة حول الأوامر المتاحة.",

  usePrefix: true,

  commandCategory: "معلومات",

  usages: "[الأمر]",

  cooldowns: 5,

};

module.exports.run = async function ({ api, event, args }) {

  const { commands } = global.client;

  const { threadID, messageID } = event;

  const prefix = global.config.PREFIX;

  const owner = config.DESIGN.Admin;

  const botname = global.config.BOTNAME;

  let msg = `
 قائمة الأوامر المتاحة لـ ${botname}\n❍──────────❍\nالمطور: ${owner}\nالبادئة: ${prefix}\n❍──────────❍\n`;

  if (!args[0]) {

    const commandList = Array.from(commands.values());

    const itemsPerPage = 40;

    const totalPages = Math.ceil(commandList.length / itemsPerPage);

    let currentPage = 1;

    if (args[0]) {

      const parsedPage = parseInt(args[0]);

      if (!isNaN(parsedPage) && parsedPage >= 1 && parsedPage <= totalPages) {

        currentPage = parsedPage;

      } else {

        return api.sendMessage(

          `◖رقم الصفحة غير صالح. يرجى اختيار صفحة بين 1 و${totalPages}◗`,

          threadID,

          messageID

        );

      }

    }

    const startIdx = (currentPage - 1) * itemsPerPage;

    const endIdx = startIdx + itemsPerPage;

    const visibleCommands = commandList.slice(startIdx, endIdx);

    for (let i = 0; i < visibleCommands.length; i++) {

      const cmd = visibleCommands[i].config;

      msg += `「 ${i + 1} 」 ⟩ ${prefix}${cmd.name} ⟩ ${cmd.description}\n`;

    }

    msg += `❍──────────❍\n»الصفحة (${currentPage}/${totalPages})«\nاكتب: "${prefix}اوامر <اسم الأمر>" للحصول على معلومات إضافية حول هذا الأمر💞\n›عدد الأوامر المتاحة حاليًا ${commandList.length} على هذا البوت‹\n📄استخدم ${prefix}اوامر <رقم الصفحة> لرؤية باقي الاوامر\n`;

    const header = `❍──────────❍`;

    const footer = `❍──────────❍`;

    const fullMsg = header + msg + footer;

    api.sendMessage(fullMsg, threadID, messageID);

  } else {

    // معالجة تفاصيل الأمر المحدد إذا كان args[0] مقدمًا //

    const commandName = args[0].toLowerCase();

    if (commands.has(commandName)) {

      const cmd = commands.get(commandName).config;

      msg = `الاسم: ${prefix}${cmd.name}\nالوصف: ${cmd.description}\nالاستخدام: ${prefix}${cmd.name} ${cmd.usages}\nالفئة: ${cmd.commandCategory}\nلزمن: ${cmd.cooldowns} ثانية(ثانيتين)\nالإذن: ${

        cmd.hasPermission === 0

          ? "اي شخص"

          : cmd.hasPermission === 1

          ? "ادمن المجموعة"

          : "مشرف البوت"

      }\nالاعتمادات: ${cmd.credits}`;

      api.sendMessage(msg, threadID, messageID);

    } else {

      api.sendMessage(`◖اسم الأمر غير صالح. اكتب "${prefix}اوامر" لرؤية قائمة الأوامر المتاحة.◗`, threadID, messageID);

    }

  }

};