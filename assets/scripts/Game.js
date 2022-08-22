let Globals = require('Globals');
cc.Class({
    extends: cc.Component,

    properties: {
        hero: {
            default: null,
            type: cc.Node
        },
        score: {
            default: null,
            // type: cc.Node
            type: cc.Label
        },
        music:
        {
            default: null,
            type: cc.AudioClip
        },
        sound:
        {
            default: null,
            type: cc.AudioClip
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        if (!cc.audioEngine.isMusicPlaying()) {
            cc.audioEngine.playMusic(this.music, true);
        }
        this.enablePhysics();
        Globals.score = 0;
        //const scoreLabel = this.score.getComponent(cc.Label);
        this.hero.on('score', () => {
            cc.audioEngine.play(this.sound);
            ++Globals.score;
            //this.score.getComponent(cc.Label).string.Globals.score.toString()
            // scoreLabel.string = Globals.score.toString();
            this.score.string = Globals.score.toString();
        });
        this.hero.once('die', () => {
            cc.director.loadScene('Score');
        });
    },
    enablePhysics() {
        let physicsManager = cc.director.getPhysicsManager();
        physicsManager.enabled = true;
        let collisionManager = cc.director.getCollisionManager();
        collisionManager.enabled = true;
        //debugging the graphics
        // cc.director.getPhysicsManager().debugDrawFlags =
        //     cc.PhysicsManager.DrawBits.e_aabbBit |
        //     cc.PhysicsManager.DrawBits.e_pairBit |
        //     cc.PhysicsManager.DrawBits.e_centerOfMassBit |
        //     cc.PhysicsManager.DrawBits.e_jointBit |
        //     cc.PhysicsManager.DrawBits.e_shapeBit;
    },

    start() {

    },

    // update (dt) {},
});
