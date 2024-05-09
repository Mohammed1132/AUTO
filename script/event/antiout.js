module.exports.config = {
  name: "السجن",
  version: "1.0.0"
};
module.exports.handleEvent = async ({
  event,
  api
}) => {
  if (event.logMessageData?.leftParticipantFbId === api.getCurrentUserID()) return;
  if (event.logMessageData?.leftParticipantFbId) {
    const info = await api.getUserInfo(event.logMessageData?.leftParticipantFbId);
    const {
      name
    } = info[event.logMessageData?.leftParticipantFbId];
    api.addUserToGroup(event.logMessageData?.leftParticipantFbId, event.threadID, (error) => {
      if (error) {
        api.sendMessage(`فشل منع العضو ${name} من المغادرة!`, event.threadID);
      } else {
        api.sendMessage(`وضع السجن نشط, ${name} ممنوع من مغادرة المجموعة!`, event.threadID);
      }
    });
  }
};
