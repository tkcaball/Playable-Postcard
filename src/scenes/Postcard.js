'use strict'

class Postcard extends Phaser.Scene {
    constructor() {
        super("postcardScene")
    }

    preload(){
        this.load.image("postcard", "./assets/postcard.png")
    }

    create(){
        console.log("Postcard scene loaded")

        // Postcard image
        this.postcard = this.add.image(400, 245, "postcard")
        this.postcard.setScale(0.8)

        // Bottom text
        this.message = this.add.text(400, 430, "Press P to return", {
            font: "28px Helvetica",
            color: "#000",
            align: "center",
            wordWrap: { width: 700 }
        }).setOrigin(0.5)

        // Input key
        this.keyP = this.input.keyboard.addKey('P')
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(this.keyP)) {
            this.scene.start("playScene") // returns to main game
        }
    }
}