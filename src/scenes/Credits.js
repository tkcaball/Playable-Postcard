class Credits extends Phaser.Scene {
    constructor() {
        super("creditsScene")
    }

    create(){
        // Background
        this.add.rectangle(400, 250, 800, 500, 0x990000)

        // Credits text
        this.add.text(400, 150,
            "Hope On The Stage\nPlayable Postcard", 
            { font: "32px Helvetica", color: "#ffffff" }
        ).setOrigin(0.5)

        this.add.text(400, 250,
            "Created by: Tiffany Caballero\n\nAssets & Music:\n -J-Hope image/audio (own assets)\n- Crowd image & lightsticks (own assets)", 
            { font: "20px Helvetica", color: "#ffffff", align: "center", wordWrap: { width: 600 } }
        ).setOrigin(0.5)

        this.add.text(400, 450, "Press C to return to Start", {
            font: "24px Helvetica",
            color: "#ffffff"
        }).setOrigin(0.5)

        // Input
        this.keyC = this.input.keyboard.addKey('C')
    }

    update(){
        if(Phaser.Input.Keyboard.JustDown(this.keyC)){
            this.scene.start("playScene")
        }
    }
}