class Play extends Phaser.Scene {
    constructor() {
        super("playScene")
    }

    preload(){
        this.load.image("jhope", "./assets/Jhope.png")
        this.load.image("crowd", "./assets/Crowd.png")
        this.load.image("lightstick", "./assets/Lightstick.png")

        this.load.audio("artist", "./assets/Jhope_audio.mp3")
        this.load.audio("cheer", "./assets/Cheering.mp3")
        this.load.audio("music", "./assets/Music.mp3")
        this.load.audio("lightswitch", "./assets/Lightswitch.mp3")
    }

    create() {

        let graphics = this.add.graphics()

        //Stage
        graphics.fillStyle(0x606060, 1)
        graphics.fillRect(200, 240, 400, 180)

        //Stage Screen
        graphics.fillStyle(0x4444ff, 1)
        graphics.fillRect(220, 40, 380, 150)

        //Sounds
        this.artistSound = this.sound.add("artist")
        this.cheerSound = this.sound.add("cheer")
        this.musicSound = this.sound.add("music")

        //Stage Light
        this.stageLight = this.add.triangle(485, 150, 0, 0, 80, 500, -80, 500, 0xff0000)
        this.stageLight.setAlpha(0.6) //Opacity of light
        this.stageLight.setInteractive(
            new Phaser.Geom.Triangle(0, 0, 80, 500, -80, 500),
            Phaser.Geom.Triangle.Contains)
        this.stageLight.input.cursor = "pointer"
        this.lightOn = true

        this.stageLight.on("pointerdown", () => {
            this.sound.play("lightswitch")
            if(this.lightOn){
                this.stageLight.setFillStyle(0x000000)
            } else {
                this.stageLight.setFillStyle(0xff0000)
            }
            this.lightOn = !this.lightOn
        })

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
            this.blinkLightsticks(0xffffff)
        })

        //Crowd Lightsticks
        this.lightsticks = []
        let positions = [
            {x:122, y:265},
            {x:212, y:270},
            {x:350, y:285},
            {x:450, y:310},
            {x:450, y:280},
            {x:500, y:270},
            {x:550, y:285},
            {x:600, y:275}
        ]

        positions.forEach(pos => {
            let stick = this.add.image(pos.x, pos.y,"lightstick")
            stick.setScale(0.04)
            stick.setTint(0xffffff)
            this.lightsticks.push(stick)
        })

        //Postcard scene
        this.keyP = this.input.keyboard.addKey('P')

        //Memory game
        this.keyM = this.input.keyboard.addKey('M')
        this.keyR = this.input.keyboard.addKey('R')
        this.keyG = this.input.keyboard.addKey('G')
        this.keyB = this.input.keyboard.addKey('B')
        this.keyO = this.input.keyboard.addKey('O')
        this.keyY = this.input.keyboard.addKey('Y')
        this.keyW = this.input.keyboard.addKey('W')
        this.keyV = this.input.keyboard.addKey('V')

        this.pattern = []
        this.playerPattern = []
        this.memoryActive = false

        this.colors = {
            R:0xff0000,
            O:0xff7f00,
            Y:0xffff00,
            G:0x00ff00,
            B:0x0000ff,
            W:0xffffff,
            V:0x9400d3
        }

        //Instructions
        this.add.text(260, 60,
            "Click to interact\nPress M to start memory game\nRepeat with R O Y G B W V",
            { font: "18px Helvetica", color: "#ffffff", align: "center" }
        )

    }

    update() {
        if(Phaser.Input.Keyboard.JustDown(this.keyP)){
            this.scene.start("postcardScene")
        }

        if(Phaser.Input.Keyboard.JustDown(this.keyM)) {
            this.startMemoryGame()
        }

        //Player input
        if(this.memoryActive){

            if(Phaser.Input.Keyboard.JustDown(this.keyR)){ 
                this.checkPattern("R")
            }
            if(Phaser.Input.Keyboard.JustDown(this.keyO)){
                this.checkPattern("O")
            }
            if(Phaser.Input.Keyboard.JustDown(this.keyY)){
                this.checkPattern("Y")
            }
            if(Phaser.Input.Keyboard.JustDown(this.keyG)){
                this.checkPattern("G")
            }
            if(Phaser.Input.Keyboard.JustDown(this.keyB)){
                this.checkPattern("B")
            }
            if(Phaser.Input.Keyboard.JustDown(this.keyW)){
                this.checkPattern("W")
            }
            if(Phaser.Input.Keyboard.JustDown(this.keyV)){
                this.checkPattern("V")
            }

        }
    }

    blinkLightsticks(color){
        this.lightsticks.forEach(stick=>{
            stick.setTint(color)
            this.tweens.add({
                targets:stick,
                alpha:{
                    from:1,
                    to:0.2
                },
                yoyo:true,
                repeat:2,
                duration:150
            })
        })
    }

    generatePattern(){
        let keys = Object.keys(this.colors)
        this.pattern = []
        for(let i=0; i<5; i++){
            let random = Phaser.Utils.Array.GetRandom(keys)
            this.pattern.push(random)
        }
    }

    startMemoryGame() {
        this.generatePattern()
        this.memoryActive = false
        this.playerPattern = []

        let i = 0

        this.time.addEvent({
            delay: 700,
            repeat: this.pattern.length - 1,
            callback: () => {
                let key = this.pattern[i]
                let color = this.colors[key]

                //Crowd lights sync
                this.stageLight.setFillStyle(color)
                this.blinkLightsticks(color)

                this.time.delayedCall(300, ()=>{
                    this.stageLight.setFillStyle(0x000000)
                })

                i++

                if(i == this.pattern.length){
                    this.memoryActive = true
                }
            }
        })
    }

    checkPattern(key){
        this.playerPattern.push(key) 

        let index = this.playerPattern.length - 1
        if(this.playerPattern[index] != this.pattern[index]) {
            console.log("Wrong pattern")
            this.playerPattern =[]
            return
        }

        if(this.playerPattern.length == this.pattern.length){
            console.log("Correct!")
            this.musicSound.play()
            this.time.addEvent({
                delay:200,
                repeat:20,
                callback:()=>{
                    let randomColor = Phaser.Display.Color.RandomRGB().color
                    this.stageLight.setFillStyle(randomColor)
                    this.blinkLightsticks(randomColor)
                }
            })
            this.time.delayedCall(2000, ()=>{
                this.scene.start("postcardScene")
            })
        }
    }
}