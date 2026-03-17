/*
Tiffany Caballero
Title: Hope On The Stage Playable Postcard
Time: 25 hours
Phaser Components Used:
Tween Manager (for animations & artist bouncing, postcard flip)
Cameras (shake effect on crowd cheer)
Audio (various sounds: artist, crowd, lightswitch, memory game)
Graphics (stage shapes, light effects)
Text objects (instructions, messages)
Input (keyboard and pointer interaction)
*/
'use strict'

let config = {
    type: Phaser.AUTO,
    width: 800,
    height: 490,
    backgroundColor: '#553E3E',
    scene: [ Play, Postcard, Credits]
}

const game = new Phaser.Game(config)