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
    const idx = Math.floor(Math.random() * 5);
    return this.phrases[idx];
  };
  handleInteraction(key) {
    //disable the selected letter's onscreen keyboard button.
    key.disabled = true;
    /*Check if countDown method generated a "GAME OVER" element and
    player has not selected all match letters in the phrase. If so,
    call the gameOver method.*/
    if (banner.lastChild.textContent === 'GAME OVER') {
      this.gameOver();
    }
    /*call the checkLetter() method. If the phrase does include the guessed
    letter, add chosen CSS class to the selected letter's keyboard button,
    call the showMatchedLetter() method on the phrase, call the checkForWin()
    method and end game if checkForWin() method returns true.*/
    if (this.activePhrase.checkLetter(this.activePhrase.phrase, key.textContent)) {
      key.setAttribute('class', 'chosen');
      this.activePhrase.showMatchedLetter(key.textContent);
      if (this.checkForWin() === true) {
        this.gameOver();
      }
      /*If the phrase does not include the guessed letter, add wrong CSS class
      to the selected letter's keyboard button, call the removeLife method.*/
    } else {
      key.setAttribute('class', 'wrong');
      this.removeLife();
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
  gameOver() {
    //display origin start screen overlay.
    overlay.style.visibility = 'visible';
    //stop background music.
    const audio = document.getElementsByTagName('AUDIO');
    audio[0].setAttribute('loop', false);
    audio[0].pause();
    const msg = document.getElementById('game-over-message');
    //show "win" or "lose" message and corresponding overlay background images.
    if (this.checkForWin() === true && banner.lastChild.textContent !== 'GAME OVER') {
      msg.textContent = 'You win!';
      overlay.setAttribute('class', 'win');
    } else {
      msg.textContent = 'Play one more time!';
      overlay.setAttribute('class', 'lose');
    }
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
      let countDownInSeconds = (120 - Math.floor((Date.now() - start) / 1000));
      let minutes = Math.floor(countDownInSeconds / 60);
      let seconds = Math.floor(countDownInSeconds % 60);
      const timer = document.getElementsByClassName('timer');
      /*Each time this function runs, remove the counting down minutes
      and seconds.*/
      timer[0].removeChild(timer[0].firstChild);
      /*if times is up or player loses the game, stop the countdown, "GAME OVER"
      and instructions to exit the game will appear.*/
      if ((minutes === 0 && seconds === 0) || (overlay.style.visibility === 'visible')) {
        clearInterval(interval);
        const exp = document.createTextNode('GAME OVER');
        timer[0].appendChild(exp);
        const exit = document.createElement('p');
        exit.textContent = 'Press any key on the on-screen keyboard to exit the game.';
        exit.setAttribute('class', 'exit');
        if (exp.length) {
          banner.insertBefore(exit, timer[0]);
        }
      } else {
        //Add remain minutes and seconds to the display.
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
  }
};
