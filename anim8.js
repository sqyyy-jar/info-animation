class Scene {
    /**
     * @param {Frame[]} frames
     */
    constructor(frames) {
        /** @type {SceneObject[]} */
        this.objects = [];
        this.frames = frames;
        this.index = 0;
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
            switch (op.type) {
                case "add": {
                    this.objects.set(op.name, op.object);
                    break;
                }
                case "remove": {
                    this.objects.delete(op.name);
                    break;
                }
            }
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

        }
    }
}

class Frame {
    /**
     * @param {FrameOp[]} ops
     */
    constructor(ops) {
        /** @type {FrameOp[]} */
        this.ops = ops;
    }
}

class FrameOp {
    /**
     * @param {string} type
     */
    constructor(type) {
        this.type = type;
    }
}

class Add extends FrameOp {
    /**
     * @param {string} name
     * @param {SceneObject} object
     */
    constructor(name, object) {
        super("add");
        this.name = name;
        this.object = object;
    }
}

class Remove extends FrameOp {
    /**
     * @param {string} name
     */
    constructor(name) {
        super("remove");
        this.name = name;
    }
}

class SceneObject {
    /**
     * @param {string} type
     */
    constructor(type) {
        this.type = type;
    }

    /**
     * @param {CanvasRenderingContext2D} canvas
     * @param {number} width
     * @param {number} height
     * @returns {void}
     */
    draw(canvas, width, height);
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
        super("rectangle");
        this.options = options;
    }

    /**
     * @param {CanvasRenderingContext2D} canvas
     * @param {number} width
     * @param {number} height
     * @returns {void}
     */
    draw(canvas, width, height) { }
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
        super("text");
        this.options = options;
    }
}