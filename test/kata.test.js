import {jest} from '@jest/globals';
import {clearDB} from "../src/db";
import {publish, timeline} from "../src/kata.js";
import luxon from 'luxon';

const {DateTime} = luxon;
import {resetNow} from "../src/luxon";

const user = "Alice";

describe("Timeline", () => {
    beforeEach(() => {
        clearDB();
        resetNow();
    });
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
        resetNow();

        expect(timeline(user, otherUser)).toEqual("Darn! We lost! (2 minutes ago)");
    });

    test("shows multiple elapsed time since post on other user's timelines", () => {
        const otherUser = "Bob",
            message = "Darn! We lost!";

        jest.useFakeTimers('modern');
        jest.setSystemTime(DateTime.now().minus({minutes: 1}).toMillis());
        publish(otherUser, message);

        jest.useRealTimers();
        resetNow();

        expect(timeline(user, otherUser)).toEqual("Darn! We lost! (1 minute ago)");
    });

    test("shows multiple elapsed time since post on other user's timelines part 2", () => {
        const otherUser = "Bob",
            message = "Darn! We lost!";

        jest.useFakeTimers('modern');
        jest.setSystemTime(DateTime.now().minus({minutes: 33}).toMillis());
        publish(otherUser, message);

        jest.useRealTimers();
        resetNow();

        expect(timeline(user, otherUser)).toEqual("Darn! We lost! (33 minutes ago)");
    });

    test("shows multiple elapsed time since post on other user's timelines seconds", () => {
        const otherUser = "Bob",
            message = "Darn! We lost!";

        jest.useFakeTimers('modern');
        jest.setSystemTime(DateTime.now().minus({seconds: 1}).toMillis());
        publish(otherUser, message);

        jest.useRealTimers();
        resetNow();

        expect(timeline(user, otherUser)).toEqual("Darn! We lost! (1 second ago)");
    });

    test("shows multiple elapsed time since post on other user's timelines 2 seconds", () => {
        const otherUser = "Bob",
            message = "Darn! We lost!";

        jest.useFakeTimers('modern');
        jest.setSystemTime(DateTime.now().minus({seconds: 2}).toMillis());
        publish(otherUser, message);

        jest.useRealTimers();
        resetNow();

        expect(timeline(user, otherUser)).toEqual("Darn! We lost! (2 seconds ago)");
    });

    test("shows multiple elapsed time since post on other user's timelines 61 minutes", () => {
        const otherUser = "Bob",
            message = "Darn! We lost!";

        jest.useFakeTimers('modern');
        jest.setSystemTime(DateTime.now().minus({minutes: 61}).toMillis());
        publish(otherUser, message);

        jest.useRealTimers();
        resetNow();

        expect(timeline(user, otherUser)).toEqual("Darn! We lost! (1 hour ago)");
    });

    test("shows multiple elapsed time since post on other user's timelines 2 hours", () => {
        const otherUser = "Bob",
            message = "Darn! We lost!";

        jest.useFakeTimers('modern');
        jest.setSystemTime(DateTime.now().minus({hours: 2}).toMillis());
        publish(otherUser, message);

        jest.useRealTimers();
        resetNow();

        expect(timeline(user, otherUser)).toEqual("Darn! We lost! (2 hours ago)");
    });


});
