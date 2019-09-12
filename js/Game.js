/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Game.js */

class Game {
  //initialize 3 properties.
  constructor() {
    this.missed = 0,
      this.phrases = ["How are you", "Good morning", "Good night", "Have a nice weekend", "Happy coding"],
      this.activePhrase = null
  };
  startGame() {
    const overlay = document.getElementById('overlay');
    //hide start overlay.
    overlay.style.visibility = 'hidden';
    /*Call the getRandomPhrase() method and set activePhrase a new instance
     of the Phrase class.*/
    this.activePhrase = new Phrase(this.getRandomPhrase());
    //add activePhrase to display.
    this.activePhrase.addPhraseToDisplay();
  };
  /*generate a random number that is smaller than 5 and use it as index to
  get a phrase from the phrase property.*/
  getRandomPhrase() {
    const idx = Math.floor(Math.random() * this.phrases.length);
    return this.phrases[idx];
  };
  handleInteraction(key) {
    /*Check if countDown is over. If so, call the gameOver method.*/
    const timer = document.getElementsByClassName('timer');
    if (timer[0].textContent === 'GAME OVER') {
      this.gameOver();
    }
    /*call the checkLetter() method. If the phrase does include the guessed
    letter, add chosen CSS class to the selected letter's keyboard button,
    call the showMatchedLetter() method on the phrase*/
    else if (this.activePhrase.checkLetter(this.activePhrase.phrase, key.textContent)) {
      //disable the selected letter's onscreen keyboard button.
      key.disabled = true;
      key.setAttribute('class', 'chosen');
      this.activePhrase.showMatchedLetter(key.textContent);
    }
    /*If the phrase does not include the guessed letter, add wrong CSS class
    to the selected letter's keyboard button, call the removeLife method.*/
    else {
      //disable the selected letter's onscreen keyboard button.
      key.disabled = true;
      key.setAttribute('class', 'wrong');
      this.removeLife();
    }
    //End game if checkForWin() method returns true.
    if (this.checkForWin() === true) {
      this.gameOver();
    }
  };
  removeLife() {
    //Replace one liveHeart with a lostHeart and increment the missed property by 1.
    const hearts = document.querySelectorAll('img[src="images/liveHeart.png"]');
    for (let i = 0; i < hearts.length; i++) {
      hearts[i].src = 'images/lostHeart.png';
      this.missed += 1;
      break;
    };
    //if the player has 5 missed guesses, call the gameOver() method.
    if (this.missed === 5) {
      this.gameOver();
    }
  };
  checkForWin() {
    const chosen = document.getElementsByClassName('chosen');
    /*convert the phrase string to an array. each letter or space in the phrase
    is an element in the new array and remove duplicates. */
    const arr = Array.from(new Set(this.activePhrase.phrase.split('')));
    //count the elements in the array except the spaces.
    const phraseCharacter = arr.reduce((count, letter) => {
      if (letter !== ' ') {
        count += 1;
      }
      return count;
    }, 0);
    /*If number of elements in the array is same as length of the HTML collection
    with "chosen" CSS class, player has revealed all of the letters in the active
    phrase.*/
    if (phraseCharacter === chosen.length) {
      return true;
    }
  };
  reset() {
    //remove all li elements from the phrase ul element.
    const lis = phrase.children[0].children;
    while (lis.length !== 0) {
      let i = 0;
      phrase.children[0].removeChild(lis[i]);
      i++;
    }
    //reset the heart images to display the liveHeart.png image.
    const hearts = document.querySelectorAll('img');
    for (let i = 0; i < hearts.length; i++) {
      hearts[i].src = 'images/liveHeart.png';
    }
    //remove the countdown.
    const banner = document.getElementById('banner');
    while (banner.children.length > 1) {
      banner.removeChild(banner.lastChild);
    }
    //remove background music player.
    document.body.removeChild(document.body.lastChild);
    //Enable onscreen keyboard
    const button = document.querySelectorAll('BUTTON:not(.key):not(#btn__reset):not(.musicBtn)')
    for (let i = 0; i < button.length; i++) {
      button[i].disabled = false;
      button[i].setAttribute('class', 'key');
    }
  };
  gameOver() {
    //display start screen overlay.
    overlay.style.visibility = 'visible';
    /*show "win" or "lose" message and corresponding overlay background images,
    reset the game board.*/
    const msg = document.getElementById('game-over-message');
    if (this.checkForWin() === true) {
      msg.textContent = 'You win!';
      overlay.setAttribute('class', 'win');
    } else {
      msg.textContent = 'Play one more time!';
      overlay.setAttribute('class', 'lose');
    }
    //reset gameboard
    this.reset();
  };
  setUpCountDown() {
    //setup the initial display of countdown.
    const timer = document.createElement('p');
    timer.setAttribute('class', 'timer');
    banner.appendChild(timer);
    let countDown = document.createTextNode('GO!');
    timer.appendChild(countDown);
  };
  countDown() {
    let start = Date.now();
    let interval = setInterval(function() {
      /*player has 2 minutes to win this game. Display will show remaining
      minutes and seconds.*/
      let countDownInSeconds = (10 - Math.floor((Date.now() - start) / 1000));
      let minutes = Math.floor(countDownInSeconds / 60);
      let seconds = Math.floor(countDownInSeconds % 60);
      const timer = document.getElementsByClassName('timer');
      /*Each time this function runs, remove the counting down minutes
      and seconds.*/
      if (timer.length) {
        timer[0].removeChild(timer[0].firstChild);
      };
      /*if times is up, stop the countdown, "GAME OVER"
      and instructions to exit the game will appear.*/
      if (minutes === 0 && seconds === 0) {
        clearInterval(interval);
        const exp = document.createTextNode('GAME OVER');
        timer[0].appendChild(exp);
        const exit = document.createElement('p');
        exit.textContent = 'Press any key on the on-screen keyboard to exit the game.';
        exit.setAttribute('class', 'exit');
        if (exp.length) {
          banner.insertBefore(exit, timer[0]);
        }
        //if player wins or loses the game, stop countdown
      } else if (overlay.style.visibility === 'visible') {
        clearInterval(interval);
      } else {
        //if game is on going, add remain minutes and seconds to the display.
        const countDown = document.createTextNode(minutes + 'm ' + seconds + 's ');
        timer[0].appendChild(countDown);
      }
      //this function runs every second.
    }, 1000)
  };
  bgm() {
    //Add background music to the game.
    let audio = new Audio('images/bgm.MP4');
    audio.play();
    document.body.appendChild(audio);
    audio.style.display = 'none';
    audio.setAttribute('loop', true);
    //setup music button
    const musicBtn = document.createElement('button');
    musicBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
    musicBtn.setAttribute('class', 'musicBtn');
    banner.appendChild(musicBtn);
    //toggle music on and off.
    let isPlaying = true;
    musicBtn.addEventListener('click', function(e) {
      if (isPlaying) {
        audio.pause();
        isPlaying = false;
        musicBtn.innerHTML = '<i class="fas fa-music"></i>'
      } else {
        audio.play();
        isPlaying = true;
        musicBtn.innerHTML = '<i class="fas fa-volume-mute"></i>'
      }
    })
  };
};
