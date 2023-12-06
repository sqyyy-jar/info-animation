import {Runtime} from './qs.mjs';

export {AnimScene, AnimBox, AnimText};

class AnimScene {
    /**
     * @param {SVGSVGElement} frame
     * @param {HTMLElement} text
     * @param {number} width
     * @param {number} height
     * @param {number[]} arr
     */
    constructor(frame, text, width, height, arr) {
        let x = width / 2 - (arr.length * 30 - 5) / 2 + 15;
        const y = height / 2;
        this.text = text;
        this.arr = arr;
        /** @type {AnimText[]} */
        this.indices = [];
        /** @type {AnimBox[]} */
        this.boxes = [];
        let i = 0;
        for (const element of arr) {
            this.indices.push(new AnimText(frame, x, y - 20, `[${i}]`)); // Index text
            this.boxes.push(new AnimBox(frame, x, y, element.toString()));
            x += 30;
            i += 1;
        }
        this.runtime = new Runtime(this);
    }

    remove() {
        for (const index of this.indices) {
            index.remove();
        }
        for (const box of this.boxes) {
            box.remove();
        }
    }

    /**
     * @param {number} i
     */
    mark(i) {
        this.boxes[i].mark();
    }

    markDone() {
        for (const box of this.boxes) {
            box.markDone();
        }
    }

    /**
     * @param {number} i
     */
    unmark(i) {
        this.boxes[i].unmark();
    }

    /**
     * @param {number} i
     * @param {number} j
     */
    swap(i, j) {
        const a = this.boxes[i];
        const b = this.boxes[j];
        const ax = a.x;
        const bx = b.x;
        a.move(bx);
        b.move(ax);
        this.boxes[i] = b;
        this.boxes[j] = a;
        const temp = this.arr[i];
        this.arr[i] = this.arr[j];
        this.arr[j] = temp;
    }
}

class AnimBox {
    /**
     * @param {SVGSVGElement} frame
     * @param {number} x
     * @param {number} y
     * @param {string} text
     */
    constructor(frame, x, y, text) {
        this.x = x;
        this.y = y;
        this.rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        this.rect.setAttribute('width', '20');
        this.rect.setAttribute('height', '20');
        this.rect.setAttribute('x', (x - 10).toString());
        this.rect.setAttribute('y', (y - 10).toString());
        this.rect.setAttribute('class', 'anim-box');
        this.text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        this.text.setAttribute('x', x.toString());
        this.text.setAttribute('y', y.toString());
        this.text.setAttribute('class', 'anim-box-text');
        this.text.appendChild(document.createTextNode(text));
        frame.appendChild(this.rect);
        frame.appendChild(this.text);
    }

    remove() {
        this.rect.remove();
        this.text.remove();
    }

    mark() {
        this.rect.setAttribute('class', 'anim-box anim-box-marked');
    }

    markDone() {
        this.rect.setAttribute('class', 'anim-box anim-box-done')
    }

    unmark() {
        this.rect.setAttribute('class', 'anim-box');
    }

    /**
     * @param {number} x
     */
    move(x) {
        this.rect.setAttribute('x', (x - 10).toString());
        this.text.setAttribute('x', x.toString());
        this.rect.animate([
            { transform: `translateX(${this.x - x}px)` },
            { transform: `translateX(0px)` },
        ], 750);
        this.text.animate([
            { transform: `translateX(${this.x - x}px)` },
            { transform: `translateX(0px)` },
        ], 750);
        this.x = x;
    }
}

class AnimText {
    /**
     * @param {SVGSVGElement} frame
     * @param {number} x
     * @param {number} y
     * @param {string} text
     */
    constructor(frame, x, y, text) {
        this.x = x;
        this.y = y;
        this.text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        this.text.setAttribute('x', x.toString());
        this.text.setAttribute('y', y.toString());
        this.text.setAttribute('class', 'anim-text');
        this.text.appendChild(document.createTextNode(text));
        frame.appendChild(this.text);
    }

    remove() {
        this.text.remove();
    }

    /**
     * @param {string} text
     */
    setText(text) {
        this.text.textContent = text;
    }
}