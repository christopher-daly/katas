import {helloWorld} from "./kata.js";

test("the tests run", () => {
    expect(helloWorld()).toBe("hello world!");
});
