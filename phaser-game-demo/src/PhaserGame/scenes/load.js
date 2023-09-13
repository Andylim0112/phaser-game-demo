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
    this.caughtCards = []; // Initialize an empty array for caught cards
    this.lostCards = []; // Initialize an empty array for lost cards
    this.cardsCaughtText = null; // Text object to display cards caught
    this.cardsLostText = null; // Text object to display cards lost
    this.rotationSpeed = 0.02; // Rotation speed for falling cards
  }

  loadFont(name, url) {
    var newFont = new FontFace(name, `url(${url})`);
    newFont.load().then(function (loaded) {
      document.fonts.add(loaded);
    }).catch(function (error) {
      console.error(error);
      return error;
    });
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

    this.load.image("skull_end", "./images/512x512.png");
    this.load.image("blue_button", "./images/blue_button_300.png");
    this.load.image("red_button", "./images/red_button_300.png");
    this.load.image("popup", "./images/game_over_popup.png");

    this.loadFont('Truculenta', '/fonts/Truculenta-Regular.ttf');
    this.loadFont('TruculentaBold', '/fonts/Truculenta-Black.ttf');
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

    // Change font for the scoreText and timerText
    const textStyle = {
      fontFamily: 'TruculentaBold',
      fontSize: '120px',
      fill: 'orange'
    };

    const textStyle1 = {
      fontFamily: 'TruculentaBold',
      fontSize: '120px',
      fill: '#fff'
    };

    this.scoreText = this.add.text(this.cameras.main.width - 2900, 200, 'Score: 0', textStyle);
    this.scoreText.setOrigin(1, 0);

    this.timerText = this.add.text(
      100,
      200,
      `Time: ${this.timer}`,
      {
        fontFamily: 'TruculentaBold',
        fontSize: '120px',
        fill: 'orange',
      }
    ).setDepth(5);
    this.timerText.setOrigin(0, 0);

    this.summary1 = this.add.text(this.cameras.main.width - 3630, 400, 'CATCH AS MANY', textStyle1);
    this.summary2 = this.add.text(this.cameras.main.width - 3600, 600, 'CARDS AS YOU', textStyle1);
    this.summary3 = this.add.text(this.cameras.main.width - 3650, 800, 'CAN BEFORE TIME', textStyle1);
    this.summary4 = this.add.text(this.cameras.main.width - 3550, 1000, 'RUNS OUT!', textStyle1);

    // Text for displaying the number of cards caught
    this.cardsCaughtText = this.add.text(
      this.cameras.main.width - 2900,
      400,
      'Cards Caught: 0',
      {
        fontFamily: 'TruculentaBold',
        fontSize: '50px',
        fill: 'orange',
      }
    );

    // Text for displaying the number of cards lost
    this.cardsLostText = this.add.text(
      this.cameras.main.width - 2900,
      500,
      'Cards Lost: 0',
      {
        fontFamily: 'TruculentaBold',
        fontSize: '50px',
        fill: 'red',
      }
    );

    let fallingSpeed = 5;

    this.startTimer();

    this.physics.world.setBounds(0, 0, this.game.config.width, this.game.config.height);

    const cardSpawnInterval = 500;

    const onCardClick = (card) => {
      if (this.gameOver) return;

      // Find the index of the clicked card in the fallingObjects array
      const cardIndex = this.fallingObjects.indexOf(card);

      if (cardIndex !== -1) {
        // Remove the card from the fallingObjects array
        this.fallingObjects.splice(cardIndex, 1);

        let scoreToAdd = 0;
        let cardKey = '';
        switch (card.texture.key) {
          case 'blue':
            scoreToAdd = 1;
            cardKey = 'Blue Card';
            break;
          case 'white':
            scoreToAdd = 2;
            cardKey = 'White Card';
            break;
          case 'red':
            scoreToAdd = 4;
            cardKey = 'Red Card';
            break;
          case 'purple':
            scoreToAdd = 8;
            cardKey = 'Purple Card';
            break;
          default:
            break;
        }

        this.score += scoreToAdd;
        this.scoreText.setText(`Score: ${this.score}`);

        if (scoreToAdd > 0) {
          this.caughtCards.push(cardKey); // Add the card to caughtCards
        } else {
          this.lostCards.push(cardKey); // Add the card to lostCards
        }

        // Update the text for cards caught and lost
        this.cardsCaughtText.setText(`Cards Caught: ${this.caughtCards.length}`);
        this.cardsLostText.setText(`Cards Lost: ${this.lostCards.length}`);

        // Destroy the card object
        card.destroy();
      }
    };

    const stopGame = () => {
      console.log('Game Over!');
      this.gameOver = true;

      // Create a container for the modal and "skull_end" image
      this.gameOverContainer = this.add.container(this.cameras.main.width / 2, this.cameras.main.height / 2);
      this.gameOverContainer.setDepth(10); // Ensure it's above other elements

      // Add the modal image to the container
      const modalBackground = this.add.image(0, 0, 'popup');
      this.gameOverContainer.add(modalBackground);

      // Add the "skull_end" image to the container
      const skullEndImage = this.add.image(0, -500, 'skull_end');
      this.gameOverContainer.add(skullEndImage);

      // Display the final score
      const gameOver = this.add.text(1950, modalBackground.y + 900, `GAME OVER!`, {
        fontSize: '120px',
        fill: 'skyblue'
      }).setDepth(15); // Adjust the depth to be on top of the popup
      gameOver.setOrigin(0.5, 0);

      // Display the final score
      const scoreText = this.add.text(1950, modalBackground.y + 1100, `Score: ${this.score}`, {
        fontSize: '80px',
        fill: 'green'
      }).setDepth(15); // Adjust the depth to be on top of the popup
      scoreText.setOrigin(0.5, 0);

      // Display caught cards count inside the popup
      const caughtCardsCountText = this.add.text(0, modalBackground.y + 130, `Cards Caught: ${this.caughtCards.length}`, {
        fontFamily: 'Truculenta',
        fontSize: '60px',
        fill: '#fff'
      }).setDepth(15);
      caughtCardsCountText.setOrigin(0.5, 0);
      this.gameOverContainer.add(caughtCardsCountText);

      // Display lost cards count inside the popup
      const lostCardsCountText = this.add.text(0, modalBackground.y + 200, `Cards Lost: ${this.lostCards.length}`, {
        fontFamily: 'Truculenta',
        fontSize: '60px',
        fill: '#fff'
      }).setDepth(15);
      lostCardsCountText.setOrigin(0.5, 0);
      this.gameOverContainer.add(lostCardsCountText);

      // Add the "blue_button" image (restart button) to the container
      const blueButton = this.add.image(modalBackground.x - 350, modalBackground.y + 450, 'blue_button')
        .setInteractive()
        .on('pointerdown', () => {
          console.log('Restart clicked');
          this.gameOverContainer.destroy();
          this.resetGameState();
        });
      this.gameOverContainer.add(blueButton);

      // Add the "red_button" image (go to homepage button) to the container
      const redButton = this.add.image(modalBackground.x + 350, modalBackground.y + 450, 'red_button')
        .setInteractive()
        .on('pointerdown', () => {
          console.log('Go to homepage clicked');
          this.gameOverContainer.destroy();
          window.location.href = '/';
        });
      this.gameOverContainer.add(redButton);

      // Add text labels to buttons
      const restartText = this.add.text(blueButton.x, blueButton.y, 'PLAY AGAIN', {
        fontFamily: 'Truculenta',
        fontSize: '50px',
        fill: '#fff'
      }).setOrigin(0.5, 0.5);
      this.gameOverContainer.add(restartText);

      const homepageText = this.add.text(redButton.x, redButton.y, 'EXIT', {
        fontFamily: 'Truculenta',
        fontSize: '50px',
        fill: '#fff'
      }).setOrigin(0.5, 0.5);
      this.gameOverContainer.add(homepageText);
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
    this.fallingObjects.forEach((object, index) => {
      object.y += 20;

      // Check if the card is out of bounds (below the screen)
      if (object.y > this.game.config.height) {
        // Remove the card from the fallingObjects array
        this.fallingObjects.splice(index, 1);

        // Increment the count of lost cards
        this.lostCards.push(object.texture.key); // Add the card to lostCards

        // Update the text for total cards lost
        this.cardsLostText.setText(`Cards Lost: ${this.lostCards.length}`);

        // Destroy the card object
        object.destroy();
      }

      // Update the card's rotation
      object.rotation += this.rotationSpeed;
    });
  }

  resetGameState() {
    window.location.reload();
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
    }
  }
}
