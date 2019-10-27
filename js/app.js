/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * app.js */
const btn = document.getElementById('btn__reset');
//Add event listener to the start button.
btn.addEventListener('click', function(e) {
  //start new game, countdown and background music.
  newGame = new Game();
  newGame.startGame();
  newGame.setUpCountDown();
  newGame.countDown();
  newGame.bgm();
});

/*Add "click" event to each of the onscreen keyboard buttons. Each time when one of
the button is clicked, call the handleInteraction() method on the game object.*/
const keyrows = document.getElementsByClassName('keyrow');

for (let i = 0; i < keyrows.length; i++) {
  let keys = keyrows[i].children;
  for (let j = 0; j < keys.length; j++) {
    keys[j].addEventListener('click', function(e) {
      newGame.handleInteraction(e.target);
    })
  }
};

/*Add "click" event to each of 26 alphabet letters on user's physical keyboard.
Each time when one of the key is pressed, call the handleInteraction() method on the game object.*/

for (let i = 0; i < keyrows.length; i++) {
  let keys = keyrows[i].children;
  for (let j = 0; j < keys.length; j++) {
    window.addEventListener('keydown', function(e) {
      if (keys[j].textContent === e.key) {
        newGame.handleInteraction(keys[j]);
      }
    })
  }
};

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
  background-position: center;
  background-size: cover;
}
.win{
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
}
.musicBtn :active {
    outline: none;
    border: none;
}
.musicBtn:focus {
    outline: none;
    border: none;
}`;

document.head.appendChild(style);
