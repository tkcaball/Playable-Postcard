class Play extends Phaser.Scene {
    constructor() {
        super("playScene")
    }

    preload(){
        this.load.image("jhope", "./assets/Jhope.png")
        this.load.image("crowd", "./assets/Crowd.png")
        this.load.audio("artist", "./assets/Jhope_audio.mp3")
        this.load.audio("cheer", "./assets/Cheering.mp3")
        this.load.audio("music", "./assets/Music.mp3")
        this.load.audio("lightswitch", "./assets/Lightswitch.mp3")
    }

    create() {

        let graphics = this.add.graphics()

        //Stage
        graphics.fillStyle(0x222222, 1)
        graphics.fillRect(200, 240, 400, 180) //(x,y,w,h)

        //Stage Screen
        graphics.fillStyle(0x4444ff, 1)
        graphics.fillRect(220, 40, 380, 150)

        //Sounds
        this.artistSound = this.sound.add("artist")
        this.cheerSound = this.sound.add("cheer")

        this.jhope = this.add.image(400, 280, "jhope")
        this.jhope.setScale(0.15)
        this.jhope.setInteractive({ pixelPerfect: true, useHandCursor: true })
        this.jhope.on("pointerdown", () => {
            this.artistSound.play()
        })

        this.crowd = this.add.image(400, 160, "crowd")
        this.crowd.setScale(0.70)
        this.crowd.setInteractive({ pixelPerfect: true, useHandCursor: true })
        this.crowd.on("pointerdown", () => {
            this.cheerSound.play()
        })

    }

    update() {

    }
}