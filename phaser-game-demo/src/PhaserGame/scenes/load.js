

// import Phaser from "phaser";

// export class Load extends Phaser.Scene {
//   constructor() {
//     super({
//       key: 'Load'
//     });

//     this.fallingObjects = [];
//     this.score = 0;
//     this.scoreText = null;
//     this.gameOverModal = null;
//     this.gameOver = false;
//     this.timer = 60; // Initial game duration in seconds
//     this.timerText = null; // Text object to display the timer
//     this.timerEvent = null;
//   }

//   preload() {
//     console.log('PHASER is working! In the load scene preloading assets');
//     this.load.image("red", "./images/1_or_11.png");
//     this.load.image("white", "./images/double.png");
//     this.load.image("blue", "./images/redraw.png");
//     this.load.image("purple", "./images/resurrect.png");
//     this.load.image("steal", "./images/steal.png");
//     this.load.image("tie_breaker", "./images/tie_breaker.png");
//     this.load.image("skull", "./images/back.png");
//     this.load.image("bg_overlay", "./images/bg_overlay.png");
//     this.load.image("bg_back", "./images/bg_back.png");
//   }

//   create() {
//     this.cameras.main.fadeIn(500, 0, 0, 0);

//     let bg = this.add.image(0, 0, 'bg_overlay').setOrigin(0, 0);
//     let scaleX = this.cameras.main.width / bg.width;
//     let scaleY = this.cameras.main.height / bg.height;
//     let scale = Math.max(scaleX, scaleY);
//     bg.setScale(scale);

//     this.bgBack = this.add.image(this.cameras.main.width / 1.7, this.cameras.main.height / 2, 'bg_back');
//     this.bgBack.setScale(2.5);

//     this.bgBack.setDepth(-4);

//     this.scoreText = this.add.text(this.cameras.main.width - 20, 20, 'Score: 0', {
//       fontSize: '60px',
//       fill: '#fff'
//     });
//     this.scoreText.setOrigin(1, 0);

//     this.timerText = this.add.text(
//       20,
//       20,
//       `Time: ${this.timer}`,
//       {
//         fontSize: '60px',
//         fill: '#fff',
//       }
//     ).setDepth(5);
//     this.timerText.setOrigin(0, 0);

//     let fallingSpeed = 5;

//     this.startTimer();

//     this.physics.world.setBounds(0, 0, this.game.config.width, this.game.config.height);

//     const cardSpawnInterval = 500;

//     const onCardClick = (card) => {
//       card.destroy();

//       if (this.gameOver) return;

//       let scoreToAdd = 0;
//       switch (card.texture.key) {
//         case 'blue':
//           scoreToAdd = 1;
//           break;
//         case 'white':
//           scoreToAdd = 2;
//           break;
//         case 'red':
//           scoreToAdd = 4;
//           break;
//         case 'purple':
//           scoreToAdd = 8;
//           break;
//         default:
//           break;
//       }

//       this.score += scoreToAdd;
//       this.scoreText.setText(`Score: ${this.score}`);
//     };

//     const stopGame = () => {
//       console.log('Game Over!');
//       this.gameOver = true;
//       this.gameOverModal = this.add.container(this.cameras.main.width / 2, this.cameras.main.height / 2);
//       const modalBackground = this.add.graphics().fillStyle(0x000000, 0.7).fillRect(-250, -50, 700, 300);
//       this.gameOverModal.add(modalBackground);

//       const scoreText = this.add.text(0, -20, `Score: ${this.score}`, {
//         fontSize: '30px',
//         fill: '#fff'
//       }).setDepth(5);
//       scoreText.setOrigin(0.5, 0);
//       this.gameOverModal.add(scoreText);

//       const goBackButton = this.add.text(-200, 50, 'Go Back to Homepage', {
//         fontSize: '30px',
//         fill: '#fff'
//       }).setInteractive();
//       const playAgainButton = this.add.text(200, 50, 'Play Again', {
//         fontSize: '30px',
//         fill: '#fff'
//       }).setInteractive();

//       goBackButton.on('pointerdown', () => {
//         console.log('Go back to homepage clicked');
//         this.gameOverModal.destroy();
//         window.location.href = '/';
//       });

//       playAgainButton.on('pointerdown', () => {
//         console.log('Play again clicked');
//         this.gameOverModal.destroy();
//         this.resetGameState();
//         this.startTimer();
//       });

//       this.gameOverModal.add(goBackButton);
//       this.gameOverModal.add(playAgainButton);
//     };

//     const spawnCard = () => {
//       if (this.gameOver) return;

//       let objectKey;
//       const rand = Math.random();

//       if (rand <= 0.575) {
//         objectKey = 'blue';
//       } else if (rand <= 0.75) {
//         objectKey = 'white';
//       } else if (rand <= 0.875) {
//         objectKey = 'red';
//       } else if (rand <= 0.9) {
//         objectKey = 'purple';
//       } else {
//         objectKey = 'skull';
//       }

//       const object = this.physics.add.image(
//         Phaser.Math.Between(0, this.game.config.width),
//         Phaser.Math.Between(-200, -50),
//         objectKey
//       );

//       object.setScale(0.5);

//       object.setInteractive();
//       object.on('pointerdown', () => {
//         onCardClick(object);
//       });

//       if (objectKey === 'skull') {
//         object.setScale(1.5);
//         object.on('pointerdown', () => {
//           stopGame();
//         });
//       }

//       this.fallingObjects.push(object);
//       object.y += fallingSpeed;

//       object.setDepth(-3);
//     };

//     this.time.addEvent({
//       delay: 60000,
//       callback: stopGame,
//     });

//     this.time.addEvent({
//       delay: cardSpawnInterval,
//       loop: true,
//       callback: spawnCard,
//     });
//   }

//   update() {
//     this.fallingObjects.forEach(object => {
//       object.y += 20;
//     });
//   }

//   resetGameState() {
//     this.score = 0;
//     this.timer = 60;
//     this.scoreText.setText(`Score: ${this.score}`);
//     this.fallingObjects.forEach(object => object.destroy());
//     this.fallingObjects = [];
//     this.gameOver = false;
//     this.fallingSpeed = 5;
//   }

//   startTimer() {
//     if (!this.timerEvent) {
//       this.timerEvent = this.time.addEvent({
//         delay: 1000,
//         callback: () => {
//           this.timer -= 1;
//           this.timerText.setText(`Time: ${this.timer}`);
//           if (this.timer <= 0) {
//             this.timer = 1;
//             this.stopGame();
//           }
//         },
//         loop: true,
//       });
//     }
//   }

//   stopGame() {
//     console.log('Game Over!');
//     this.gameOver = true;
//     // Display game over modal and handle
//   }
// }

import Phaser from "phaser";

export class Load extends Phaser.Scene {
  constructor() {
    super({
      key: 'Load'
    });

    this.fallingObjects = [];
    this.score = 0;
    this.scoreText = null;
    this.gameOverModal = null;
    this.gameOver = false;
    this.timer = 60; // Initial game duration in seconds
    this.timerText = null; // Text object to display the timer
    this.timerEvent = null;
  }

  preload() {
    console.log('PHASER is working! In the load scene preloading assets');
    this.load.image("red", "./images/1_or_11.png");
    this.load.image("white", "./images/double.png");
    this.load.image("blue", "./images/redraw.png");
    this.load.image("purple", "./images/resurrect.png");
    this.load.image("steal", "./images/steal.png");
    this.load.image("tie_breaker", "./images/tie_breaker.png");
    this.load.image("skull", "./images/back.png");
    this.load.image("bg_overlay", "./images/bg_overlay.png");
    this.load.image("bg_back", "./images/bg_back.png");
  }

  create() {
    this.cameras.main.fadeIn(500, 0, 0, 0);

    let bg = this.add.image(0, 0, 'bg_overlay').setOrigin(0, 0);
    let scaleX = this.cameras.main.width / bg.width;
    let scaleY = this.cameras.main.height / bg.height;
    let scale = Math.max(scaleX, scaleY);

    bg.setScale(scale);

    this.bgBack = this.add.image(this.cameras.main.width / 1.7, this.cameras.main.height / 2, 'bg_back');
    this.bgBack.setScale(2.5);
    this.bgBack.setDepth(-4);

    this.scoreText = this.add.text(this.cameras.main.width - 20, 20, 'Score: 0', {
      fontSize: '60px',
      fill: '#fff'
    });
    this.scoreText.setOrigin(1, 0);

    this.timerText = this.add.text(
      20,
      20,
      `Time: ${this.timer}`,
      {
        fontSize: '60px',
        fill: '#fff',
      }
    ).setDepth(5);
    this.timerText.setOrigin(0, 0);

    let fallingSpeed = 5;

    this.startTimer();

    this.physics.world.setBounds(0, 0, this.game.config.width, this.game.config.height);

    const cardSpawnInterval = 500;

    const onCardClick = (card) => {
      card.destroy();

      if (this.gameOver) return;

      let scoreToAdd = 0;
      switch (card.texture.key) {
        case 'blue':
          scoreToAdd = 1;
          break;
        case 'white':
          scoreToAdd = 2;
          break;
        case 'red':
          scoreToAdd = 4;
          break;
        case 'purple':
          scoreToAdd = 8;
          break;
        default:
          break;
      }

      this.score += scoreToAdd;
      this.scoreText.setText(`Score: ${this.score}`);
    };

    const stopGame = () => {
      console.log('Game Over!');
      this.gameOver = true;

      this.gameOverModal = this.add.container(this.cameras.main.width / 2, this.cameras.main.height / 2);
      const modalBackground = this.add.graphics().fillStyle(0x000000, 0.7).fillRect(-250, -50, 700, 300);
      this.gameOverModal.add(modalBackground);

      const scoreText = this.add.text(0, -20, `Score: ${this.score}`, {
        fontSize: '30px',
        fill: '#fff'
      }).setDepth(5);
      scoreText.setOrigin(0.5, 0);
      this.gameOverModal.add(scoreText);

      const goBackButton = this.add.text(-200, 50, 'Go Back to Homepage', {
        fontSize: '30px',
        fill: '#fff'
      }).setInteractive();
      const playAgainButton = this.add.text(200, 50, 'Play Again', {
        fontSize: '30px',
        fill: '#fff'
      }).setInteractive();

      goBackButton.on('pointerdown', () => {
        console.log('Go back to homepage clicked');
        this.gameOverModal.destroy();
        window.location.href = '/'; 
      });

      playAgainButton.on('pointerdown', () => {
        console.log('Play again clicked');
        this.gameOverModal.destroy();
        this.resetGameState();
      });

      this.gameOverModal.add(goBackButton);
      this.gameOverModal.add(playAgainButton);
    };

    const spawnCard = () => {
      if (this.gameOver) return;

      let objectKey;
      const rand = Math.random();

      if (rand <= 0.575) {
        objectKey = 'blue';
      } else if (rand <= 0.75) {
        objectKey = 'white';
      } else if (rand <= 0.875) {
        objectKey = 'red';
      } else if (rand <= 0.9) {
        objectKey = 'purple';
      } else {
        objectKey = 'skull';
      }

      const object = this.physics.add.image(
        Phaser.Math.Between(0, this.game.config.width),
        Phaser.Math.Between(-200, -50),
        objectKey
      );

      object.setScale(0.5);

      object.setInteractive();
      object.on('pointerdown', () => {
        onCardClick(object);
      });

      if (objectKey === 'skull') {
        object.setScale(1.5);
        object.on('pointerdown', () => {
          stopGame();
        });
      }

      this.fallingObjects.push(object);
      object.y += fallingSpeed;

      object.setDepth(-3);
    };

    this.time.addEvent({
      delay: 60000,
      callback: stopGame,
    });

    this.time.addEvent({
      delay: cardSpawnInterval,
      loop: true,
      callback: spawnCard,
    });
  }

  update() {
    this.fallingObjects.forEach(object => {
      object.y += 20;
    });
  }

  resetGameState() {
    this.score = 0;
    this.timer = 60;
    this.scoreText.setText(`Score: ${this.score}`);
    this.fallingObjects.forEach(object => object.destroy());
    this.fallingObjects = [];
    this.gameOver = false;
    this.fallingSpeed = 5;
    this.timerEvent = null;
    this.startTimer();
  }

  startTimer() {
    if (!this.timerEvent) {
      this.timerEvent = this.time.addEvent({
        delay: 1000,
        callback: this.timerCallback.bind(this), // Bind the callback function
        loop: true,
      });
    }
  }
  
  timerCallback() {
    this.timer -= 1;
    this.timerText.setText(`Time: ${this.timer}`);
    if (this.timer <= 0) {
      this.timer = 0;
      this.stopGame();
    }
  }
  
}

