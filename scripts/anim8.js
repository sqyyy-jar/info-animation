import {Scene, SceneObject, List, Rect, Text} from "./scene.js";
import {Frame, FrameOp, Add, Remove, SetVisibility} from "./frame.js";

// export {Scene, Frame, FrameOp, Add, Remove, SetVisibility, SceneObject, Array, Rect, Text};
export {Scene, SceneObject, List, Rect, Text};
export {Frame, FrameOp, Add, Remove, SetVisibility};
export {add, remove, show, hide, list, rect, text};

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
 * @param {SceneObject} objects
 * @returns {List}
 */
function list(...objects) {
    return new List(objects);
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
    return new Rect({x: x, y: y, width: width, height: height, color: color});
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
    return new Text({x: x, y: y, text: text, color: color, font: font});
}
