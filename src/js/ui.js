export default class UI {
  constructor() {
    this.startWindow = document.querySelector(".start");
    this.popupHint = document.querySelector(".popup--hint");
    this.hintDesc = document.querySelector("[data-desc='hint'");
    this.popupGameOver = document.querySelector(".popup--game-over");
    this.gameOverDesc = document.querySelector("[data-desc='game-over'");
    this.wordContainer = document.querySelector(".word");
    this.hangmanParts = document.querySelectorAll("[data-parts]");
    this.hangmanAnimationParts = document.querySelectorAll("[data-animation]");
    this.livesContainer = document.querySelector(".lives__value");
    this.characters = "a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,w,v,x,y,z";
    this.keyboardContainer = document.querySelector(".alphabet");
  }

  removeKeyboard() {
    while (this.keyboardContainer.firstChild) {
      this.keyboardContainer.removeChild(this.keyboardContainer.firstChild);
    }
  }

  addHintDescription(desc) {
    this.hintDesc.innerHTML = desc;
  }

  displayChars(char, indexes) {
    const password = document.querySelectorAll("[data-password=true]");
    indexes.forEach((val) => {
      password[val].textContent = char;
    });
  }

  generateKeyboard() {
    //create array of letters
    const charsArr = this.characters.split(",");
    charsArr.forEach((char) => {
      const button = document.createElement("button");
      button.dataset.used = false;
      button.dataset.char = char;
      button.classList.add("alphabet__char");
      button.textContent = char;
      this.keyboardContainer.appendChild(button);
    });
  }

  toggleStartWindow() {
    this.startWindow.classList.toggle("hidden");
  }

  setBtntoInactive(element) {
    element.classList.add("alphabet__char--used");
  }

  generatePassword(word) {
    let template = `<span class="letter" data-password=true>&nbsp;</span>`;
    for (let i = 0; i < word.length; i++) {
      this.wordContainer.insertAdjacentHTML("beforeend", template);
    }
  }

  removePassword() {
    this.wordContainer.textContent = "";
  }

  hideHangman() {
    Array.from(this.hangmanParts).forEach((part) =>
      part.classList.add("hidden")
    );
  }

  showHangmanEl(el) {
    if (el <= this.hangmanParts.length)
      this.hangmanParts[el - 1].classList.remove("hidden");
    else return;
  }
  set displayLives(value) {
    this.livesContainer.textContent = value;
  }
  toggleHintPopup() {
    this.popupHint.classList.toggle("hidden");
  }

  toggleGameOverPopup() {
    this.popupGameOver.classList.toggle("hidden");
  }

  showPopup(flag, word) {
    this.toggleGameOverPopup();
    let text;
    if (flag) {
      text = "Congratulations You won! Click button below to start over!";
    } else {
      text = `Sorry, You lost.... correct answer was <span class='password'>${word}</span>. Click button below to start over!`;
    }

    this.gameOverDesc.innerHTML = text;
  }

  addHangmanAnimation() {
    this.hangmanAnimationParts.forEach((part) => {
      const animationClass = part.dataset.animation;
      part.classList.add(animationClass);
    });
  }

  removeHangmanAnimation() {
    this.hangmanAnimationParts.forEach((part) => {
      const animationClass = part.dataset.animation;
      part.classList.remove(animationClass);
    });
  }
}
