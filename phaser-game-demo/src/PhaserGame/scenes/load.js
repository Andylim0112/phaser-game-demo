import Phaser from "phaser";
export class Load extends Phaser.Scene {
    constructor() {
        super({
            key: 'Load'
        });
    }
    preload() {
        console.log('PHASER is working ! in the load scene preloading assets');
    }
    create() {}
    update() {}
}