import {AnimScene} from "./anim.mjs";

export {Runtime, StackFrame, QuicksortFrame, PartitionFrame};

class Runtime {
    /**
     * @param {AnimScene} scene
     */
    constructor(scene) {
        this.scene = scene;
        this.arr = this.scene.arr;
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
            this.scene.markDone();
            this.scene.text.innerText = 'Die Zahlen wurden erfolgreich sortiert.';
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
                this.markFrame(runtime);
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
                this.unmarkFrame(runtime);
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

    /**
     * @param {Runtime} runtime
     */
    markFrame(runtime) {
        for (let i = this.low; i <= this.high; i++) {
            runtime.scene.mark(i);
        }
    }

    /**
     * @param {Runtime} runtime
     */
    unmarkFrame(runtime) {
        for (let i = this.low; i <= this.high; i++) {
            runtime.scene.unmark(i);
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
                runtime.interrupt(); // New pivot
                runtime.scene.text.innerText = `Der Pivot befindet sich nun an dem Index ${this.high} mit dem Wert ${this.pivot}.

Von den markierten Zahlen, werden alle Zahlen kleiner als der Pivot auf die linke Seite und alle Zahlen größer als der Pivot auf die rechte Seite geschoben.

Der Pivot bewegt sich dazwischen.`;
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
                        runtime.scene.swap(++this.i, this.j);
                        if (this.i !== this.j) {
                            runtime.interrupt();
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
                runtime.scene.swap(this.i + 1, this.high);
                runtime.interrupt();
                runtime.returnValue = this.i + 1;
                runtime.popFrame();
                return;
            }
        }
    }
}