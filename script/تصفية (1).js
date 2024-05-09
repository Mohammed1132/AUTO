module.exports.config = {

    name: "تصفية",

    version: "2.0.0",

    hasPermission: 2,

    credits: "محد مهتم",

    description: "تصفية مستخدمي Facebook",

    usePrefix: true,

    commandCategory: "أدوات الإدارة",

    usages: "",

    cooldowns: 5

};

module.exports.run = async function ({ api, event }) {

    const { userInfo, adminIDs } = await api.getThreadInfo(event.threadID);

    let successCount = 0;

    let failCount = 0;

    const filteredUsers = [];

    for (const user of userInfo) {

        if (user.gender === undefined) {

            filteredUsers.push(user.id);

        }

    }

    const isBotAdmin = adminIDs.map(a => a.id).includes(api.getCurrentUserID());

    if (filteredUsers.length === 0) {

        api.sendMessage("مجموعتك لا يوجد فيها 'مستخدمين Facebook' الذين توقفت حساباتهم.", event.threadID);

    } else {

        api.sendMessage(`جارٍ تصفية المجموعة من  ${filteredUsers.length} 'مستخدم Facebook'.`, event.threadID, () => {

            if (isBotAdmin) {

                api.sendMessage("بدء عملية التصفية...\n\n", event.threadID, async () => {

                    for (const userID of filteredUsers) {

                        try {

                            await new Promise(resolve => setTimeout(resolve, 1000));

                            await api.removeUserFromGroup(parseInt(userID), event.threadID);

                            successCount++;

                        } catch (error) {

                            failCount++;

                        }

                    }

                    api.sendMessage(`✅ تم تصفية بنجاح ${successCount} شخصًا.`, event.threadID, () => {

                        if (failCount !== 0) {

                            api.sendMessage(`❌ فشلت عملية التصفية لـ ${failCount} شخصًا.`, event.threadID);

                        }

                    });

                });

            } else {

                api.sendMessage("البوت ليس مسؤولًا، لذا لا يمكنه التصفية.", event.threadID);

            }

        });

    }

};