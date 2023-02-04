import {SlidingWindow} from "./circular-buffer.js";

const buffer = new SlidingWindow(0, 1, 2, 3, 4, 5)
    .setSpread(4);

buffer.incrementTail(3);

console.log(buffer.getWindow())