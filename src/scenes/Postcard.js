class Postcard extends Phaser.Scene {
    constructor() {
        super("postcardScene")
    }

    create(){
        this.keyP = this.input.keyboard.addKey('P')
        this.add.text(400, 250, "[Message Here]", {
            font: "48px Helvetica",
            color: "#000" 
        }).setOrigin(0.5)
    }

    update() {
        if(Phaser.Input.Keyboard.JustDown(this.keyP)) {
            this.scene.start("playScene")
        }
    }
}