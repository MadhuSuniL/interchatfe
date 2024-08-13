export const categorizeMessage = (data, currentChat) => {
  if (Array.isArray(data)) {
    return data.map((message) => {
      const referenceMessage = message.refference_message;
      const isReferenceMessageExist =
        referenceMessage && referenceMessage !== "None";

      message.is_self_message = message.user !== currentChat?.chat_user_email;

      if (isReferenceMessageExist) {
        referenceMessage.is_self_message =
          referenceMessage.user !== currentChat?.chat_user_email;
      }

      return message;
    });
  } else {
    const message = data;

    const referenceMessage = message.refference_message;
    const isReferenceMessageExist =
      referenceMessage && referenceMessage !== "None";

    message.is_self_message = message.user !== currentChat?.chat_user_email;
    if (isReferenceMessageExist) {
      referenceMessage.is_self_message =
        referenceMessage.user !== currentChat?.chat_user_email;
    }
    return message;
  }
};
