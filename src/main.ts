import {SlidingWindowSubCircularBuffer} from "./sliding-window-sub-circular-buffer.js";

const buffer = new SlidingWindowSubCircularBuffer<number>(0, 1, 2, 3, 4, 5);
buffer.windowSpread = 3;

console.log(buffer.window, buffer.currentElement);

buffer.incrementCurrentElement(2);
console.log(buffer.window, buffer.currentElement);

buffer.incrementCurrentElement();
console.log(buffer.window, buffer.currentElement);

buffer.windowSpread = 4;
console.log(buffer.window, buffer.currentElement);

buffer.nextWindow();
console.log(buffer.window, buffer.currentElement);

buffer.windowSpread = 2;
console.log(buffer.window, buffer.currentElement);

buffer.incrementCurrentElement();
console.log(buffer.window, buffer.currentElement);

buffer.nextWindow();
buffer.windowSpread = 3;
console.log(buffer.window, buffer.currentElement);