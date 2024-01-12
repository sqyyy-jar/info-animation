import {AnimScene} from "./anim.mjs";

export {Runtime};

class Runtime {
    /**
     * @param {AnimScene} scene
     */
    constructor(scene) {
        this.scene = scene;
        this.arr = this.scene.arr;
        this.result = 0;
        this.generator = quicksort(this, 0, this.arr.length - 1);
        this.done = false;
    }

    /**
     * Continue execution until interrupt.
     */
    run() {
        if (this.done) {
            return;
        }
        let next;
        if (!(next = this.generator.next()).done) {
            const value = next.value;
            if (value.message) {
                this.scene.text.innerText = value.message;
            }
        } else {
            this.done = true;
            this.scene.markDone();
            this.scene.text.innerText = 'Die Zahlen wurden erfolgreich sortiert.';
        }
    }
}

class Interrupt {
    /**
     * @param {string?} message
     */
    constructor(message) {
        this.message = message;
    }
}

/**
 * @param {string?} message
 * @returns {Interrupt}
 */
function interrupt(message) {
    return new Interrupt(message);
}

/**
 * @param {Runtime} rt
 * @param {number} low
 * @param {number} high
 * @returns {Generator<Interrupt | void>}
 */
function* quicksort(rt, low, high) {
    if (low >= high) {
        return;
    }
    yield* partition(rt, low, high);
    const partitionIndex = rt.result;
    yield* quicksort(rt, low, partitionIndex - 1);
    yield* quicksort(rt, partitionIndex + 1, high);
}

/**
 * @param {Runtime} rt
 * @param {number} low
 * @param {number} high
 * @returns {Generator<Interrupt | void>}
 */
function* partition(rt, low, high) {
    const pivot = rt.arr[high];
    yield interrupt(`Der Pivot befindet sich nun an dem Index ${this.high} mit dem Wert ${this.pivot}.

Von den markierten Zahlen, werden alle Zahlen kleiner als der Pivot auf die linke Seite und alle Zahlen größer als der Pivot auf die rechte Seite geschoben.

Der Pivot bewegt sich dazwischen.`);
    let i = low - 1;
    for (let j = low; j < high; j++) {
        if (rt.arr[j] <= pivot) {
            i++;
            const temp = rt.arr[i];
            rt.arr[i] = rt.arr[high];
            rt.arr[high] = temp;
        }
        yield interrupt();
    }
    const temp = rt.arr[i + 1];
    rt.arr[i + 1] = rt.arr[high];
    rt.arr[high] = temp;
    yield interrupt();
    rt.result = i + 1;
}