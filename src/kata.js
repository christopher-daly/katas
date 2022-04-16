import {db} from "./db";
// Strange import because luxon does not yet support ESM in node
import luxon from 'luxon';

const {DateTime} = luxon;

const messagesWithoutTimestamp = (entries) => entries.map((entry) => entry.message);
const messagesWithTimestamp = (entries) => entries.map((entry) => `${entry.message} (${entry.date.toRelative()})`);

export const timeline = (requestingUser, timelineOwner = requestingUser) => {
    const entries = db[timelineOwner] || [];

    const messages = requestingUser === timelineOwner ? messagesWithoutTimestamp(entries) : messagesWithTimestamp(entries);
    return messages.join("\n");
};

export const publish = (user, message) => {
    const entry = {
        date: DateTime.now(),
        message
    };
    if (Object.keys(db).includes(user)) {
        db[user].unshift(entry);
    } else {
        db[user] = [entry];
    }
};
