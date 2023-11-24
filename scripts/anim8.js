import {Scene, SceneObject, List, Rect, Text} from "./scene.js";
import {Frame, FrameOp, Add, Remove, SetVisibility, MoveAbs, MoveRel} from "./frame.js";

export {Scene, SceneObject, List, Rect, Text};
export {Frame, FrameOp, Add, Remove, SetVisibility, MoveAbs, MoveRel};
export {add, remove, show, hide, moveAbs, moveRel, list, rect, text};

/**
 * @param {string} name
 * @param {SceneObject} object
 * @returns {Add}
 */
function add(name, object) {
    return new Add(name, object)
}

/**
 * @param {string} name
 * @returns {Remove}
 */
function remove(name) {
    return new Remove(name);
}

/**
 * @param {string} name
 * @returns {SetVisibility}
 */
function show(name) {
    return new SetVisibility(name, true);
}

/**
 * @param {string} name
 * @returns {SetVisibility}
 */
function hide(name) {
    return new SetVisibility(name, false);
}

/**
 * @param {string} name
 * @param {number} x
 * @param {number} y
 * @returns {MoveAbs}
 */
function moveAbs(name, x, y) {
    return new MoveAbs(name, x, y);
}

/**
 * @param {string} name
 * @param {number} xOffset
 * @param {number} yOffset
 * @returns {MoveRel}
 */
function moveRel(name, xOffset, yOffset) {
    return new MoveRel(name, xOffset, yOffset);
}

/**
 * @param {SceneObject} objects
 * @returns {List}
 */
function list(...objects) {
    return new List(0, 0, objects);
}

/**
 * @param {number} x
 * @param {number} y
 * @param {number} width
 * @param {number} height
 * @param {string} color
 * @returns {Rect}
 */
function rect(x, y, width, height, color) {
    return new Rect(x, y, width, height, color);
}

/**
 * @param {number} x
 * @param {number} y
 * @param {string} text
 * @param {string} color
 * @param {string} font
 * @returns {Text}
 */
function text(x, y, text, color, font) {
    return new Text(x, y, text, color, font);
}
