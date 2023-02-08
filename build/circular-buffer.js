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
        if (amount <= 0) {
            console.warn("Spread is smaller or equal to 0. Setting spread to 1.");
            amount = 1;
        }
        if (amount > this.elements.length) {
            console.warn("Spread is greater than the number of elements. Setting spread to the number of elements.");
            amount = this.elements.length;
        }
        this.spread = amount;
        return this;
    }
    incrementTail(amount = 1) {
        this.tail = (this.tail + amount) % this.elements.length;
        return this;
    }
    getWindow() {
        if (this.spread === this.elements.length) {
            return this.elements;
        }
        const overflow = this.tail + this.spread - this.elements.length;
        if (overflow > 0) {
            return this.elements.slice(this.tail).concat(this.elements.slice(0, overflow));
        }
        return this.elements.slice(this.tail, this.tail + this.spread);
    }
}
