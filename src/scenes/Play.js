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
        this.stageTarget = this.add.rectangle(410, 115, 380, 150, 0x4444ff)

        //Stage screen starts at full screen title screen
        this.stageScreen = this.add.rectangle(400, 250, 800, 500, 0x4444ff)
        this.stageScreen.setOrigin(0.5)
        this.stageScreen.setDepth(100)

        this.titleText = this.add.text(400, 200, "Welcome to Hope On The Stage Tour!", {
            font: "40px Helvetica",
            color: "#ffffff"
        }).setOrigin(0.5).setDepth(101)

        this.startText = this.add.text(400, 260, "Click to Start", {
            font: "24px Helvetica",
            color: "#ffffff"
        }).setOrigin(0.5).setDepth(101)
        this.startScreenActive = true

        this.stageScreen.setInteractive()

        this.stageScreen.on("pointerdown", () => {
            this.startScreenActive = false

            this.titleText.destroy()
            this.startText.destroy()

            this.tweens.add({
                targets: this.stageScreen,
                scaleX: 380/800,
                scaleY: 150/500,
                x: 410,
                y: 115,
                duration: 1200,
                ease: "Cubic.easeOut",
                onComplete: () => {
                    this.stageScreen.destroy()
                }
            })

        })

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
            {x:239, y:350},
            {x:342, y:275},
            {x:450, y:310},
            {x:518, y:279},
            {x:620, y:268},
            {x:726, y:255}
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
        this.keyA = this.input.keyboard.addKey('A') //Replay game

        //Variables
        this.pattern = []
        this.playerPattern = []
        this.memoryActive = false
        this.gameStarted = false

        //Replay game limit 3
        this.replayCount = 0
        this.maxReplay = 3

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
            "Click to interact\nPress M to start memory game\nRepeat with R O Y G B W V\nPress A to replay pattern",
            { font: "18px Helvetica", color: "#ffffff", align: "center" }
        )

        //Win/Game Over messages
        this.messageText = this.add.text(400,420,"",{
            font:"28px Helvetica",
            color:"#ffffff"
        }).setOrigin(0.5)

    }

    update() {
        if(this.startScreenActive){
            return
        }

        if(Phaser.Input.Keyboard.JustDown(this.keyP)){
            this.scene.start("postcardScene")
        }

        if(Phaser.Input.Keyboard.JustDown(this.keyM) && !this.gameStarted) {
            this.startMemoryGame()
            this.gameStarted = true
        }

        if(Phaser.Input.Keyboard.JustDown(this.keyA)){
            this.replayPattern()
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
        this.playerPattern = []
        this.memoryActive = false

        //Reset replay counter for each game
        this.replayCount = 0

        this.messageText.setText("Watch the pattern")
        this.playPattern()
    }

    playPattern() {

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
                    this.messageText.setText("Repeat the pattern")
                }
            }
        })
    }

    replayPattern(){
        if(this.replayCount>=this.maxReplay){
            this.messageText.setText("No Replays Left")
            return
        }

        this.replayCount++
        this.memoryActive=false
        this.playerPattern=[]

        this.messageText.setText("Replaying Pattern (" + this.replayCount + "/3)")
        this.playPattern()
    }

    checkPattern(key){
        this.playerPattern.push(key) 

        let index = this.playerPattern.length - 1
        if(this.playerPattern[index] != this.pattern[index]) {
            this.messageText.setText("Wrong pattern")
            this.playerPattern =[]
            this.gameStarted = false
            return
        }

        if(this.playerPattern.length == this.pattern.length){
            this.messageText.setText("Correct!")
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
            this.time.delayedCall(4000, ()=>{
                this.scene.start("postcardScene")
            })
        }
    }
}