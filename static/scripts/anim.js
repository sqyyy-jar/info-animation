const frame = document.getElementById('frame');
const width = frame.viewBox.baseVal.width;
const height = frame.viewBox.baseVal.height;

function initFrame() {
    new List(frame, height * 0.5, [1, 2, 3, 2, 1]);
}

class List {
    /**
     * @param {HTMLElement} frame
     * @param {number} y
     * @param {number[]} contents
     */
    constructor(frame, y, contents) {
        let x = width / 2 - (contents.length * 30 - 5) / 2 + 15;
        this.contents = contents;
        this.boxes = [];
        for (const element of contents) {
            const box = new Box(frame, x, y, element.toString());
            this.boxes.push(box);
            x += 30;
        }
    }
}

class Box {
    /**
     * @param {HTMLElement} frame
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
        this.rect.setAttribute('fill', 'aqua');
        this.rect.setAttribute('class', 'box');
        this.text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        this.text.setAttribute('x', x.toString());
        this.text.setAttribute('y', y.toString());
        this.text.setAttribute('class', 'box-text');
        this.text.appendChild(document.createTextNode(text));
        frame.appendChild(this.rect);
        frame.appendChild(this.text);
    }

    mark() {
        this.rect.setAttribute('class', 'box box-marked');
    }

    unmark() {
        this.rect.setAttribute('class', 'box');
    }
}

initFrame();
