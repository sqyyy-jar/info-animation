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
        this.index = 0;
        /** @type {[{name: string, object: SceneObject}]} */
        this.objects = [];
    }

    currentFrame() {
        return this.frames[this.index];
    }

    next() {
        const frame = this.currentFrame();
        if (!frame) {
            return;
        }
        for (const op of frame.ops) {
            op.apply(this)
        }
        this.index += 1;
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
     * @param {Scene} scene
     * @param {CanvasRenderingContext2D} context
     */
    draw(scene, context) {
    }
}

class List extends SceneObject {
    /**
     * @param {SceneObject[]} objects
     */
    constructor(objects) {
        super();
        this.objects = objects;
    }

    draw(scene, context) {
        for (const object of this.objects) {
            object.draw(scene, context);
        }
    }
}

class Rect extends SceneObject {
    /**
     * @param {{
     *   width: number,
     *   height: number,
     *   x: number,
     *   y: number,
     *   color: string,
     * }} options
     */
    constructor(options) {
        super();
        this.options = options;
    }

    draw(scene, context) {
        context.fillStyle = this.options.color;
        context.fillRect(
            Math.floor((this.options.x - this.options.width / 2) * scene.xRatio),
            Math.floor((this.options.y - this.options.height / 2) * scene.yRatio),
            Math.floor(this.options.width * scene.xRatio),
            Math.floor(this.options.height * scene.yRatio)
        );
    }
}

class Text extends SceneObject {
    /**
     * @param {{
     *   x: number,
     *   y: number,
     *   text: string,
     *   color: string,
     *   font: string,
     * }} options
     */
    constructor(options) {
        super();
        this.options = options;
    }

    draw(scene, context) {
        context.font = this.options.font;
        context.textBaseline = "middle";
        context.fillStyle = this.options.color;
        const textSize = context.measureText(this.options.text);
        context.fillText(
            this.options.text,
            Math.floor(this.options.x * scene.xRatio - textSize.width / 2),
            Math.floor(this.options.y * scene.yRatio)
        );
    }
}