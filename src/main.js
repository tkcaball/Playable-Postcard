'use strict'

let config = {
    type: Phaser.AUTO,
    width: 800,
    height: 500,
    backgroundColor: '#E0E0E0',
    scene: [ Play, Postcard]
}

const game = new Phaser.Game(config)