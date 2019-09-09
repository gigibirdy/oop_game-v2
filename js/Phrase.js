/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Phrase.js */

class Phrase {
  //initialize a property called phrase and set it's value to the parameter.
  constructor(phrase) {
    this.phrase = phrase.toLowerCase();
  };
  //generate letter placeholders to the display when game starts.
  addPhraseToDisplay() {
    const phrase = document.getElementById('phrase');
    const ul = phrase.children;
    for (let i = 0; i < this.phrase.length; i++) {
      let letter = document.createTextNode(this.phrase[i]);
      const li = document.createElement('li');
      li.appendChild(letter);
      if (letter.data === " ") {
        li.setAttribute('class', 'space');
      } else {
        li.setAttribute('class', 'letter');
      }
      ul[0].appendChild(li);
    }
  };
  /*check if selected letter matches a letter in the phrase and return
  boolean value.*/
  checkLetter(phrase, selected) {
    if (phrase.includes(selected)) {
      return true;
    }
    return false;
  };
  //show all match letters in the phrase.
  showMatchedLetter(selected) {
    const letter = document.getElementsByClassName('letter');
    let hasMatch = true;
    while (hasMatch) {
      hasMatch = false;
      for (let i = 0; i < letter.length; i++) {
        if (letter[i].textContent === selected) {
          letter[i].setAttribute('class', 'show');
          hasMatch = true;
          break;
        }
      }
    }
  };
};
