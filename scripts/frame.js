export {Frame, FrameOp, Add, Remove, SetVisibility};

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
     * @param {Scene} scene
     */
    apply(scene) {
    }
}

class Add extends FrameOp {
    /**
     * @param {string} name
     * @param {SceneObject} object
     */
    constructor(name, object) {
        super();
        this.name = name;
        this.object = object;
    }

    apply(scene) {
        scene.objects.push({name: this.name, object: this.object})
    }
}

class Remove extends FrameOp {
    /**
     * @param {string} name
     */
    constructor(name) {
        super();
        this.name = name;
    }

    apply(scene) {
        for (let i = 0; i < scene.objects.length; i++) {
            if (scene.objects[i].name === this.name) {
                scene.objects.splice(i, 1)
                break;
            }
        }
    }
}

class SetVisibility extends FrameOp {
    /**
     * @param {string} name
     * @param {boolean} visible
     */
    constructor(name, visible) {
        super();
        this.name = name;
        this.visible = visible;
    }

    apply(scene) {
        for (const object of scene.objects) {
            if (object.name === this.name) {
                object.object.visible = this.visible;
            }
        }
    }
}