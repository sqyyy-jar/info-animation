import {Frame} from "./frame.js";

export {Scene, SceneObject, List, Rect, Text};

class Scene {
    /**
     * @param {number} vw virtual width
     * @param {number} vh virtual height
     * @param {number} pw physical width
     * @param {number} ph physical height
     * @param {Frame[]} frames
     */
    constructor(vw, vh, pw, ph, frames) {
        this.xRatio = pw / vw;
        this.yRatio = ph / vh;
        this.frames = frames;
        this.index = -1;
        /** @type {[{name: string, object: SceneObject}]} */
        this.objects = [];
    }

    currentFrame() {
        return this.frames[this.index];
    }

    findObject(name) {
        for (const object of this.objects) {
            if (object.name === name) {
                return object.object;
            }
        }
        return null;
    }

    next() {
        this.index += 1;
        const frame = this.currentFrame();
        if (!frame) {
            return;
        }
        for (const op of frame.ops) {
            op.apply(this)
        }
    }

    /**
     * @param {CanvasRenderingContext2D} context
     * @param {number} width
     * @param {number} height
     */
    draw(context, width, height) {
        context.clearRect(0, 0, width, height);
        for (const object of this.objects) {
            if (!object.object.visible) {
                continue;
            }
            object.object.draw(this, context)
        }
    }
}

class SceneObject {
    visible = true;

    /**
     * @param {number} x
     * @param {number} y
     */
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    move(x, y) {
        this.x = x;
        this.y = y;
    }

    /**
     * @param {Scene} scene
     * @param {CanvasRenderingContext2D} context
     */
    draw(scene, context) {
    }
}

class List extends SceneObject {
    /**
     * @param {number} x
     * @param {number} y
     * @param {SceneObject[]} objects
     */
    constructor(x, y, objects) {
        super(x, y);
        this.objects = objects;
    }

    move(x, y) {
        const xOffset = x - this.x;
        const yOffset = y - this.y;
        this.x = x;
        this.y = y;
        for (const object of this.objects) {
            object.move(object.x + xOffset, object.y + yOffset);
        }
    }

    draw(scene, context) {
        for (const object of this.objects) {
            object.draw(scene, context);
        }
    }
}

class Rect extends SceneObject {
    /**
     * @param {number} x
     * @param {number} y
     * @param {number} width
     * @param {number} height
     * @param {string} color
     */
    constructor(x, y, width, height, color) {
        super(x, y);
        this.width = width;
        this.height = height;
        this.color = color;
    }

    draw(scene, context) {
        context.fillStyle = this.color;
        context.fillRect(
            Math.floor((this.x - this.width / 2) * scene.xRatio),
            Math.floor((this.y - this.height / 2) * scene.yRatio),
            Math.floor(this.width * scene.xRatio),
            Math.floor(this.height * scene.yRatio)
        );
    }
}

class Text extends SceneObject {
    /**
     * @param {number} x
     * @param {number} y
     * @param {string} text
     * @param {string} color
     * @param {string} font
     */
    constructor(x, y, text, color, font) {
        super(x, y);
        this.text = text;
        this.color = color;
        this.font = font;
    }

    draw(scene, context) {
        context.font = this.font;
        context.textBaseline = "middle";
        context.fillStyle = this.color;
        const textSize = context.measureText(this.text);
        context.fillText(
            this.text,
            Math.floor(this.x * scene.xRatio - textSize.width / 2),
            Math.floor(this.y * scene.yRatio)
        );
    }
}