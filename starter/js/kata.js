import {db} from "./db";
// Strange import because luxon does not yet support ESM in node
import luxon from 'luxon';

const {DateTime} = luxon;

export const timeline = (requestingUser, timelineOwner = requestingUser) => {
    const entries = db[timelineOwner];

    if (entries) {
        if (requestingUser === timelineOwner) {
            return entries.map((entry) => entry.message).join("\n");
        } else {
            return entries.map((entry) => `${entry.message} (${entry.date.toRelative()})`).join("\n");
        }
    }
    return "";
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
