/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * app.js */
const btn = document.getElementById('btn__reset');
//Add event listener to the start button.
btn.addEventListener('click', function(e) {
  //After a game is completed, click the start button will reset the gameboard.
  if (overlay.classList[0] !== 'start') {
    //remove all li elements from the phrase ul element.
    const lis = phrase.children[0].children;
    while (lis.length !== 0) {
      let i = 0;
      phrase.children[0].removeChild(lis[i]);
      i++;
    }
    /*Enable all onscreen keyboard buttons and update each to use the key
    CSS class.*/
    const button = document.querySelectorAll('BUTTON:not(#btn__reset)');
    for (let i = 0; i < button.length; i++) {
      if (button[i].disabled = true) {
        button[i].disabled = false;
        button[i].setAttribute('class', 'key');
      } else {
        continue;
      }
    };
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
  };
  //start new game, countdown and background music.
  newGame = new Game();
  newGame.startGame();
  newGame.setUpCountDown();
  newGame.countDown();
  newGame.bgm();
});

/*Add "click" event to each of the onscreen keyboard buttons. Each time when one of
the button is clicked, call the handleInteraction() method on the game object.*/
const keys = document.getElementsByClassName('key');
for (let i = 0; i < keys.length; i++) {
  keys[i].addEventListener('click', function(e) {
    newGame.handleInteraction(e.target);
  })
};

/*Add "click" event to each of 26 alphabet letters on user's physical keyboard.
Each time when one of the key is pressed, call the handleInteraction() method on the game object.*/
window.addEventListener('keyup', function(e) {
  for (let i = 0; i < keys.length; i++) {
    if (keys[i].textContent === e.key) {
      newGame.handleInteraction(keys[i]);
    }
  }
});

/*CSS classes for the countdown, win & lose background images, and blink animation
on show letter elements.*/
let style = document.createElement('style');
style.innerHTML = `
.timer {
  width: 152px;
  height: 40px;
  color: green;
  background: black;
  display: inline-block;
  border: 3px solid green;
  padding: 5px 10px;
  font-size: 20px;
}
.exit{
  color: green;
}
.lose{
  background: url(images/lose.gif);
  background-position: center;
  background-size: cover;
}
.win{
  background: url(images/win.gif);
  background-position: center;
  background-size: cover;
}
.show{
  border: 5px solid green;
  border-radius: 5px;
  animation-name: blink;
  animation-duration: 0.8s;
  animation-iteration-count: 2;
}
@keyframes blink {
  0% {border-color: green;}
  50% {border-color: yellow;}
  100% {border-color: green;}
}`;

document.head.appendChild(style);
