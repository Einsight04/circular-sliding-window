export class SlidingWindowSubCircularBuffer<T> {
    private readonly _elements: T[];
    private _currentIndex: number;
    private _windowSpread: number;
    private _tail: number;

    constructor(...elements: T[]) {
        this._elements = elements;
        this._currentIndex = 0;
        this._windowSpread = 1;
        this._tail = 0;
    }

    public get length(): number {
        return this._elements.length;
    }

    public get currentElement(): T {
        return this.window[this._currentIndex];
    }

    public get window(): T[] {
        if (this._windowSpread === this._elements.length) {
            return this._elements;
        }

        const overflow = this._tail + this._windowSpread - this._elements.length;

        if (overflow > 0) {
            return this._elements
                .slice(this._tail)
                .concat(this._elements.slice(0, overflow));
        }

        return this._elements
            .slice(this._tail, this._tail + this._windowSpread);
    }

    public set windowSpread(amount: number) {
        // if spread is smaller or equal to 0 then set spread to 1
        if (amount <= 0) {
            console.warn("Spread is smaller or equal to 0. Setting spread to 1.");
            amount = 1;
        }

        // if spread is greater than the number of elements
        // then set the spread to the number of elements
        if (amount > this._elements.length) {
            console.warn("Spread is greater than the number of _elements. Setting spread to the number of _elements.");
            amount = this._elements.length;
        }

        // if spread is smaller than the current window spread
        // then move the tail up until the last element in the window minus the difference
        if (amount < this._windowSpread) {
            this._tail = (this._tail + this.window.length - (this._windowSpread - amount)) % this._elements.length;
        }

        this._windowSpread = amount;
    }

    public nextWindow(): SlidingWindowSubCircularBuffer<T> {
        // move the tail up until the last element in the window
        this._tail = (this._tail + this.window.length) % this._elements.length;
        return this;
    }

    public incrementTail(amount: number = 1): SlidingWindowSubCircularBuffer<T> {
        this._tail = (this._tail + amount) % this._elements.length;
        return this;
    }

    public incrementCurrentElement(amount: number = 1): SlidingWindowSubCircularBuffer<T> {
        // increment the current index and wrap around window if necessary
        this._currentIndex = (this._currentIndex + amount) % this.window.length;
        return this;
    }
}
