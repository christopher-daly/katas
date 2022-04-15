const db = {};

export const timeline = (user) => {
  return db[user] || "";
};

export const publish = (user, message) => {
  db[user] = message;
};

export default {
  publish,
  timeline
};
