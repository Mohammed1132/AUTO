module.exports.config = {
  name: 'اوامر',
  version: '1.0.0',
  role: 0,
  hasPrefix: true,
  aliases: ['info'],
  description: "Beginner's guide",
  usage: "Help [page] or [command]",
  credits: 'Develeoper',
};
module.exports.run = async function({
  api,
  event,
  enableCommands,
  args,
  Utils,
  prefix
}) {
  const input = args.join(' ');
  try {
    const eventCommands = enableCommands[1].handleEvent;
    const commands = enableCommands[0].commands;
    if (!input) {
      const pages = 20;
      let page = 1;
      let start = (page - 1) * pages;
      let end = start + pages;
      let helpMessage = `قائمة الامر:\n\n`;
      for (let i = start; i < Math.min(end, commands.length); i++) {
        helpMessage += `\t${i + 1}. 「 ${prefix}${commands[i]} 」\n`;
      }
      helpMessage += '\nالاوامر الالية:\n\n';
      eventCommands.forEach((eventCommand, index) => {
        helpMessage += `\t${index + 1}. 「 ${prefix}${eventCommand} 」\n`;
      });
      helpMessage += `\nالصفحة ${page}/${Math.ceil(commands.length / pages)}. لرؤية الصفحة التالية اكتب '${prefix}اوامر رقم الصفحة'. لرؤية تفاصيل الامر,  اكتب '${prefix}اوامر اسم الامر'.`;
      api.sendMessage(helpMessage, event.threadID, event.messageID);
    } else if (!isNaN(input)) {
      const page = parseInt(input);
      const pages = 20;
      let start = (page - 1) * pages;
      let end = start + pages;
      let helpMessage = `قائمة الاوامر:\n\n`;
      for (let i = start; i < Math.min(end, commands.length); i++) {
        helpMessage += `\t${i + 1}. 「 ${prefix}${commands[i]} 」\n`;
      }
      helpMessage += '\nالاوامر الالية:\n\n';
      eventCommands.forEach((eventCommand, index) => {
        helpMessage += `\t${index + 1}. 「 ${prefix}${eventCommand} 」\n`;
      });
      helpMessage += `\nالصفحة ${page} من ${Math.ceil(commands.length / pages)}`;
      api.sendMessage(helpMessage, event.threadID, event.messageID);
    } else {
      const command = [...Utils.handleEvent, ...Utils.commands].find(([key]) => key.includes(input?.toLowerCase()))?.[1];
      if (command) {
        const {
          name,
          version,
          role,
          aliases = [],
          description,
          usage,
          credits,
          cooldown,
          hasPrefix
        } = command;
        const roleMessage = role !== undefined ? (role === 0 ? '➛ إذن: المستخدم' : (role === 1 ? '➛ اذن: الادمن' : (role === 2 ? '➛ اذن: مشرف الموضوع' : (role === 3 ? '➛ اذن: super ادمن' : '')))) : '';
        const aliasesMessage = aliases.length ? `➛ اسماء مستعارة: ${aliases.join(', ')}\n` : '';
        const descriptionMessage = description ? `اسماء مستعارة: ${description}\n` : '';
        const usageMessage = usage ? `➛ الاستخدام: ${usage}\n` : '';
        const creditsMessage = credits ? `➛ المطور: ${credits}\n` : '';
        const versionMessage = version ? `➛ النسخة: ${version}\n` : '';
        const cooldownMessage = cooldown ? `➛ الزمن: ${cooldown} ثانية(s)\n` : '';
        const message = ` 「 الامر 」\n\n➛ الاسم: ${name}\n${versionMessage}${roleMessage}\n${aliasesMessage}${descriptionMessage}${usageMessage}${creditsMessage}${cooldownMessage}`;
        api.sendMessage(message, event.threadID, event.messageID);
      } else {
        api.sendMessage('لم يتم ايجاد الامر.', event.threadID, event.messageID);
      }
    }
  } catch (error) {
    console.log(error);
  }
};
module.exports.handleEvent = async function({
  api,
  event,
  prefix
}) {
  const {
    threadID,
    messageID,
    body
  } = event;
  const message = prefix ? 'هذه بادئة البوت: ' + prefix : "البوت ليس له بادئة";
  if (body?.toLowerCase().startsWith('prefix')) {
    api.sendMessage(message, threadID, messageID);
  }
}
