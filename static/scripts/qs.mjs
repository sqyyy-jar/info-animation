import {AnimList} from "./anim.mjs";

export {Runtime, StackFrame, QuicksortFrame, PartitionFrame};

class Runtime {
    /**
     * @param {AnimList} list
     */
    constructor(list) {
        this.list = list;
        this.arr = this.list.contents;
        /** @type {StackFrame[]} */
        this.stack = [];
        this.interrupted = false;
        this.returnValue = null;
        this.call(new QuicksortFrame(0, this.arr.length - 1));
    }

    interrupt() {
        this.interrupted = true;
    }

    clearInterrupt() {
        this.interrupted = false;
    }

    popFrame() {
        this.stack.pop();
    }

    /**
     * @param {StackFrame} frame
     */
    call(frame) {
        this.stack.push(frame);
        this.interrupt();
    }

    /**
     * Continue execution until interrupt.
     */
    run() {
        while (!this.interrupted && this.stack.length > 0) {
            this.stack[this.stack.length - 1].run(this);
        }
        this.clearInterrupt();
        if (this.stack.length === 0) {
            this.list.markDone();
        }
    }

    swap(i, j) {
        this.list.swap(i, j);
    }

    /**
     * @param {QuicksortFrame} frame
     */
    markFrame(frame) {
        for (let i = frame.low; i <= frame.high; i++) {
            this.list.mark(i);
        }
    }

    /**
     * @param {QuicksortFrame} frame
     */
    unmarkFrame(frame) {
        for (let i = frame.low; i <= frame.high; i++) {
            this.list.unmark(i);
        }
    }
}

class StackFrame {
    /**
     * @param {Runtime} runtime
     */
    run(runtime) {
    }
}

class QuicksortFrame extends StackFrame {
    /**
     * @param {number} low
     * @param {number} high
     */
    constructor(low, high) {
        super();
        this.f = 0;
        this.low = low;
        this.high = high;
    }

    run(runtime) {
        switch (this.f++) {
            /**
             * - Pop the frame if low >= high
             * - Else call the partition function
             */
            case 0: {
                if (this.low >= this.high) {
                    runtime.popFrame();
                    return;
                }
                runtime.markFrame(this);
                runtime.call(new PartitionFrame(this.low, this.high));
                return;
            }
            /**
             * - Retrieve the return value of the partition
             * - Call quicksort
             */
            case 1: {
                /** @type {number} */
                this.partitionIndex = runtime.returnValue;
                runtime.unmarkFrame(this);
                runtime.call(new QuicksortFrame(this.low, this.partitionIndex - 1));
                return;
            }
            /**
             * - Call quicksort
             */
            case 2: {
                runtime.call(new QuicksortFrame(this.partitionIndex + 1, this.high));
                return;
            }
            /**
             * - Return
             */
            case 3: {
                runtime.popFrame();
                return;
            }
        }
    }
}

class PartitionFrame extends StackFrame {
    /**
     * @param {number} low
     * @param {number} high
     */
    constructor(low, high) {
        super();
        this.f = 0;
        this.low = low;
        this.high = high;
    }

    run(runtime) {
        switch (this.f++) {
            /**
             * - Find the pivot
             * - Set i and j
             */
            case 0: {
                this.pivot = runtime.arr[this.high];
                this.i = this.low - 1;
                this.j = this.low;
                return;
            }
            /**
             * - Loop from low to high
             */
            case 1: {
                if (this.j <= this.high - 1) {
                    if (runtime.arr[this.j] < this.pivot) {
                        runtime.swap(++this.i, this.j);
                        if (this.i !== this.j) {
                            // runtime.interrupt();
                        }
                    }
                    this.j++;
                    this.f--; // Loop
                }
                return;
            }
            /**
             * - Do last swap
             * - Return
             */
            case 2: {
                runtime.swap(this.i + 1, this.high);
                runtime.returnValue = this.i + 1;
                runtime.popFrame();
                return;
            }
        }
    }
}