'use strict'

let config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scene: [ Play, Postcard]
}

const game = new Phaser.Game(config)