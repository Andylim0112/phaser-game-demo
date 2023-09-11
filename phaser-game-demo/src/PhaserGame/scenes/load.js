import Phaser from "phaser";

export class Load extends Phaser.Scene {
  constructor() {
    super({
      key: 'Load'
    });

    // Initialize the fallingObjects array at the class level
    this.fallingObjects = [];
  }

  preload() {
    // ... preload code ...
    console.log('PHASER is working ! in the load scene preloading assets');
    this.load.image("red", "./images/1_or_11.png");
    this.load.image("white", "./images/double.png");
    this.load.image("blue", "./images/redraw.png");
    this.load.image("pink", "./images/resurrect.png");
    this.load.image("steal", "./images/steal.png");
    this.load.image("tie_breaker", "./images/tie_breaker.png");
    this.load.image("skull", "./images/back.png");
    this.load.image("bg_overlay", "./images/bg_overlay.png");
    this.load.image("bg_back", "./images/bg_back.png");
  }

  create() {
    // ... other create code ...

  // fade in the scene
  this.cameras.main.fadeIn(500, 0, 0, 0);
  this.cameras.main.setBackgroundColor('#081733');


  let bg = this.add.image(0, 0, 'bg_overlay').setOrigin(0, 0);
  let scaleX = this.cameras.main.width / bg.width;
  let scaleY = this.cameras.main.height / bg.height;
  let scale = Math.max(scaleX, scaleY);

  bg.setScale(scale);
  //const { width, height} = this.scale

  //this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, () => {
  //this.scene.start('Game'); }




    
      // Enable Arcade Physics for the scene
      this.physics.world.setBounds(0, 0, this.game.config.width, this.game.config.height);
    
      const cardSpawnInterval = 1000; // Time interval in milliseconds between card spawns
    
      // Function to spawn a card
      const spawnCard = () => {
        const objectKey = Phaser.Math.RND.pick(['red', 'white', 'blue', 'pink']);
        const object = this.physics.add.image(
          Phaser.Math.Between(0, this.game.config.width),
          Phaser.Math.Between(-200, -50), // Adjust the range for initial position
          objectKey
        );
    
        // Adjust the scale of the object to make it smaller
        object.setScale(0.5); // You can adjust the scale factor as needed
    
        // ... rest of your object setup ...
    
        this.fallingObjects.push(object);
    
        // Schedule the next card spawn
        this.time.addEvent({
          delay: cardSpawnInterval,
          callback: spawnCard,
          callbackScope: this,
        });
      };
    
      // Start spawning cards
      spawnCard();
    
    
  
  }

    update() {
      this.fallingObjects.forEach(object => {
        object.y += 5; // Adjust the value to control the falling speed
      });
    }
  }