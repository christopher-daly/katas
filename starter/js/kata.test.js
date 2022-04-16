import {jest} from '@jest/globals';
import {clearDB} from "./db";
import {publish, timeline} from "./kata.js";
import luxon from 'luxon';

const {DateTime} = luxon;

const user = "Alice";

describe("Timeline", () => {
    beforeEach(clearDB);
    afterEach(jest.useRealTimers);

    test("is empty before messages published", () => {
        expect(timeline(user)).toEqual("");
    });

    test("displays published messages", () => {
        const message = "I love the weather today.";

        publish(user, message);

        expect(timeline(user)).toEqual(message);
    });

    test("shows most recent messages first", () => {
        const oldMessage = "I love the weather on Mondays.",
            newMessage = "I love the weather on Wednesdays.",
            expectedMessage = `${newMessage}\n${oldMessage}`;

        publish(user, oldMessage);
        publish(user, newMessage);

        expect(timeline(user)).toEqual(expectedMessage);
    });

    test("shows elapsed time since post on other user's timelines", () => {
        const otherUser = "Bob",
            message = "Darn! We lost!";

        jest.useFakeTimers('modern');
        jest.setSystemTime(DateTime.now().minus({minutes: 2}).toMillis());
        publish(otherUser, message);
        jest.useRealTimers();

        expect(timeline(user, otherUser)).toEqual("Darn! We lost! (2 minutes ago)");
    });
});
