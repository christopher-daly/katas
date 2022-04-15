import {clearDB} from "./db";
import {publish, timeline} from "./kata.js";

const user = "Alice";

test("timeline is empty before messages published", () => {
    expect(timeline(user)).toEqual("");
});

test("publish saves message to timeline", () => {
    const message = "I love the weather today.";

    publish(user, message);

    expect(timeline(user)).toEqual(message);
});

test("timeline shows most recent messages first", () => {
    clearDB();
    const oldMessage = "I love the weather on Mondays.",
        newMessage = "I love the weather on Wednesdays.",
        expectedMessage = `${newMessage}\n${oldMessage}`;

    publish(user, oldMessage);
    publish(user, newMessage);

    expect(timeline(user)).toEqual(expectedMessage);
});
