import {AnimScene} from './anim.mjs';

const frame = document.getElementById('frame');
const infoText = document.getElementById('info-text');
const numberInput = document.getElementById('number-input');
const width = frame.viewBox.baseVal.width;
const height = frame.viewBox.baseVal.height;
window.scene = new AnimScene(frame, infoText, width, height, generateArray());

/**
 * @param {HTMLElement} element
 */
function flash(element) {
    const klass = 'ui-element-flash';
    if (element.classList.contains(klass)) {
        return;
    }
    element.classList.add(klass);
    setTimeout(() => numberInput.classList.remove(klass), 750);
}

window.runtimeRestart = () => {
    const input = numberInput.value;
    let arr;
    if (input) {
        const parts = input.trim().split(/\s+/g);
        /** @type {number[]} */
        const resultArr = [];
        for (const part of parts) {
            const num = Number.parseInt(part);
            if (!Number.isSafeInteger(num)) {
                flash(numberInput);
                return;
            }
            resultArr.push(num);
        }
        if (resultArr.length > 10 || resultArr.length < 2) {
            infoText.innerText = 'Es müssen zwischen 2 und 10 Zahlen angegeben werden.';
            flash(numberInput);
            return;
        }
        arr = resultArr;
    } else {
        arr = generateArray();
    }
    window.scene.remove();
    window.scene = new AnimScene(frame, infoText, width, height, arr);
};

window.runtimeStep = () => {
    window.scene.runtime.run();
};

/**
 * @returns {number[]}
 */
function generateArray() {
    const length = 7 + Math.round(Math.random() * 3); // 7..=10
    /** @type {number[]} */
    const arr = [];
    for (let i = 0; i < length; i++) {
        arr.push(1 + Math.round(Math.random() * 50));
    }
    return arr;
}