class Scene {
    /**
     * @param {Frame[]} frames 
     */
    constructor(frames) {
        /** @type {FrameObject[]} */
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
        scene.index += 1;
    }

    /**
     * @param {CanvasRenderingContext2D} context
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

class FrameOp { }

class FrameObject { }

const ops = {
    Add(name, object) {
        return {
            type: "add",
            name: name,
            object: object,
        };
    },

    Remove(name) {
        return {
            type: "remove",
            name: name,
        };
    },
};

const object = {
    /**
     * ```
     * [options]: {
     *   width: number,
     *   height: number,
     *   x: number,
     *   y: number,
     *   color: string,
     * }
     * ```
     * 
     * @returns a new rectangle object.
     */
    Rect(options) {
        return {
            type: "rectangle",
            ...options,
        };
    },

    /**
     * ´´´
     * [options]: {
     *   x: number,
     *   y: number,
     *   text: string,
     *   color: string,
     *   font: string,
     * }
     * ´´´
     * 
     * @returns a new text object.
     */
    Text(options) {
        return {
            type: "text",
            ...options,
        };
    },
};
