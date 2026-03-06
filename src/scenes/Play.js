class Play extends Phaser.Scene {
    constructor() {
        super("playScene")
    }

    preload(){
        this.load.image("jhope", "./assets/Jhope.png")
        this.load.image("crowd", "./assets/Crowd.png")
    }

    create() {

        let graphics = this.add.graphics()

        //Stage
        graphics.fillStyle(0x222222, 1)
        graphics.fillRect(200, 240, 400, 180) //(x,y,w,h)

        //Stage Screen
        graphics.fillStyle(0x4444ff, 1)
        graphics.fillRect(220, 40, 380, 150)

        this.jhope = this.add.image(400, 280, "jhope")
        this.jhope.setScale(0.15)

        this.crowd = this.add.image(400, 160, "crowd")
        this.crowd.setScale(0.70)

    }

    update() {

    }
}