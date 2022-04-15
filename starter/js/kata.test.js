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
