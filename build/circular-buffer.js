export class SlidingWindow {
    elements;
    spread;
    tail;
    constructor(...elements) {
        this.elements = elements;
        this.spread = 1;
        this.tail = 0;
    }
    setSpread(amount) {
        // if spread is smaller or equal to 0, set spread to 1 and warn
        if (amount <= 0) {
            console.warn("Spread is smaller or equal to 0. Setting spread to 1.");
            amount = 1;
        }
        // if spread is greater than the number of elements, set spread to the number of elements
        if (amount > this.elements.length) {
            console.warn("Spread is greater than the number of elements. Setting spread to the number of elements.");
            amount = this.elements.length;
        }
        this.spread = amount;
        return this;
    }
    incrementTail(amount) {
        this.tail = (this.tail + amount) % this.elements.length;
        return this;
    }
    getWindow() {
        // if the spread is equal to the number of elements, return all elements
        if (this.spread === this.elements.length) {
            return this.elements;
        }
        // get overflow
        const overflow = this.tail + this.spread - this.elements.length;
        // if overflow is greater than 0, return the elements from the tail to the end of the array and the elements from the beginning of the array to the overflow
        if (overflow > 0) {
            return this.elements.slice(this.tail).concat(this.elements.slice(0, overflow));
        }
        // if overflow is smaller than 0, return the elements from the tail to the tail + spread
        return this.elements.slice(this.tail, this.tail + this.spread);
    }
}
