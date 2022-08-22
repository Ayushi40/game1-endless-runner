

cc.Class({
    extends: cc.Component,

    properties: {
        speed: 150

    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start() {

    },
    move(node, offset) {
        //find the x cordinate of the right edge of the current sprite
        const spriteRightX = node.x + node.width / 2;
        //find the x cordinate of the left edge of the screen
        const screenLeftX = -cc.winSize.width / 2;
        //if the right x of the sprite is less than left x of the screen
        if (spriteRightX <= screenLeftX) {
            //swap the images
            node.x += node.width * 2 - offset;
        }
        //else shift current node with the specified offset 
        else {
            node.x -= offset;

        }

    },

    update(dt) {
        this.node.children.forEach(node => {
            this.move(node, dt * this.speed);

        });
    },
});
