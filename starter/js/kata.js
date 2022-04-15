import {db} from "./db";

export const timeline = (user) => {
  const messages = db[user];

  if(messages) {
    return messages.join("\n");
  }
  return "";
};

export const publish = (user, message) => {
  if(Object.keys(db).includes(user)) {
    db[user].unshift(message);
  } else {
    db[user] = [message];
  }
};

export default {
  publish,
  timeline
};
