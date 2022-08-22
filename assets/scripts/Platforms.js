const platform = require("platform");

cc.Class({
    extends: cc.Component,

    properties: {
        xOffsetMin: 60,
        xOffsetMax: 200,
        yOffsetMin: -120,
        yOffsetMax: 120,
        tilesCountMin: 2,
        tilesCountMax: 6,
        platform: {
            default: null,
            type: cc.Prefab

        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        // cc.director.getPhysicsManager().debugDrawFlags =
        //     cc.PhysicsManager.DrawBits.e_aabbBit |
        //     cc.PhysicsManager.DrawBits.e_pairBit |
        //     cc.PhysicsManager.DrawBits.e_centerOfMassBit |
        //     cc.PhysicsManager.DrawBits.e_jointBit |
        //     cc.PhysicsManager.DrawBits.e_shapeBit;
    },
    generateRandomData() {
        let data = {
            tilesCount: 0,
            x: 0,
            y: 0
        };
        //logic to generate random values 
        //const randomNumber = min + Math.random() * (max - min);

        const xOffset = this.xOffsetMin + Math.random() * (this.xOffsetMax - this.xOffsetMin);
        const yOffset = this.yOffsetMin + Math.random() * (this.yOffsetMax - this.yOffsetMin);
        data.x = this.current.node.x + this.current.node.width + xOffset;
        let y = this.current.node.y + yOffset;
        const screenTop = cc.winSize.height / 2;
        const screenBottom = -cc.winSize.height / 2;
        y = Math.min(y, screenTop - this.current.node.height * 2);
        y = Math.max(y, screenBottom + this.current.node.height);
        data.y = y;
        data.tilesCount = this.tilesCountMin + Math.floor(Math.random() * (this.tilesCountMax - this.tilesCountMin));
        return data;
        //Math.random returns value from 0 to 1=>[0,1]
        //random number in range 1 to 10
        /**
         * 1 + Math.random()* (10-1)
         * 1 + [0,1)*(10-1)
         * Math.random can generate smallest possible value as 0
         * = 1+ 0*(9)=1+0= 1 samllest possible value is 1 
         * Math.random can generate maximum possible value as 0.9(period of 9)=0.9*(9)
         * 1 + 0.9(9) *(10-1)= 1 + 0.9(9)*9 = 1+ 8.9(9)= 0.9(9)
         */
    },

    start() {
        this.platforms = [];
        this.createPlatform({
            tilesCount: 4,
            x: -200,
            y: -200

        });
        // this.createPlatform({
        //     tilesCount: 2,
        //     x: 0,
        //     y: -100

        // });
        // this.createPlatform({
        //     tilesCount: 5,
        //     x: 200,
        //     y: 0

        // });

    },
    createPlatform(data) {
        if (!data) {
            data = this.generateRandomData();
        }
        const platform = this.platforms.find(platform => !platform.active);
        if (platform) {
            console.log('resue');
            this.current = platform;
        }
        else {
            console.log('create');
            const node = cc.instantiate(this.platform);
            this.node.addChild(node);
            this.current = node.getComponent('Platform');
            this.platforms.push(this.current);
        }
        this.current.init(data.tilesCount, data.x, data.y);
    },
    //update method constanly checke the state of the game
    update(dt) {
        const screenRight = cc.winSize.width / 2;
        const currentPlatformRight = this.current.node.x + this.current.node.width;
        if (currentPlatformRight < screenRight) {
            this.createPlatform();
            console.log('Platforms Length:', this.platforms.length);
        }


    },
});
