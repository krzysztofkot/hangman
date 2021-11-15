export default class App {
  constructor(Word, UI) {
    this.navElements = document.querySelector(".nav__list");
    this.keyboardContainer = document.querySelector(".alphabet");
    this.startAgainBtn = document.querySelector("[data-btn='start again']");
    this.hintBtn = document.querySelector("[data-btn='hint']");
    this.hintPopup = document.querySelector("[data-action='close']");
    this.binedKeyboard = this.charClicked.bind(this);
    this.word = new Word();
    this.ui = new UI();
    this.enableMenu();
    this.enableStartAgainBtn();
    this.enableHintBtn();
    this.enableHintPopup();
  }

  init() {
    //remove old words
    this.ui.removeHangmanAnimation();
    this.ui.removePassword();
    this.ui.hideHangman();
    this.lives = 11;
    this.ui.displayLives = this.lives;
    this.ui.removeKeyboard();
    this.wrongGuesses = 0;
    //hide hints popup
  }

  startGame(e) {
    if (e.target.closest(".nav__item")) {
      this.init();
      const btn = e.target.closest(".nav__item");
      this.level = btn.dataset.level;
      this.ui.toggleStartWindow();
      this.generate();
    }
  }

  startAgainGame() {
    this.ui.toggleStartWindow();
    this.ui.toggleGameOverPopup();
    this.ui.hideStats();
  }

  enableMenu() {
    this.navElements.addEventListener("click", this.startGame.bind(this));
  }

  enableHintBtn() {
    this.hintBtn.addEventListener("click", this.hintBtnAction.bind(this));
  }

  enableHintPopup() {
    this.hintPopup.addEventListener("click", this.hintBtnAction.bind(this));
  }

  hintBtnAction() {
    this.ui.toggleHintPopup();
  }

  enableKeyboard() {
    this.keyboardContainer.addEventListener("click", this.binedKeyboard);
  }

  disableKeyboard() {
    this.keyboardContainer.removeEventListener("click", this.binedKeyboard);
  }

  enableStartAgainBtn() {
    this.startAgainBtn.addEventListener(
      "click",
      this.startAgainGame.bind(this)
    );
  }

  checkCharInWord(char) {
    const { word } = this.word.wordObj;
    const ArrOfIndexes = [];
    for (let i = 0; i < word.length; ) {
      const charIndex = word.indexOf(char, i);
      if (charIndex === -1) {
        break;
      }
      ArrOfIndexes.push(charIndex);
      i = charIndex + 1;
    }
    return ArrOfIndexes;
  }

  charClicked(e) {
    const currentElement = e.target;
    if (currentElement.dataset.used === "false") {
      //get character
      const clickedChar = currentElement.dataset.char;
      //compare character
      const indexes = this.checkCharInWord(clickedChar);
      currentElement.dataset.used = true;
      this.ui.setBtntoInactive(currentElement);
      indexes.length ? this.charMatch(clickedChar, indexes) : this.wrongChar();
    }
  }

  charMatch(char, indexes) {
    this.ui.displayChars(char, indexes);
    indexes.forEach((el) => {
      this.pattern =
        this.pattern.substr(0, el) + char + this.pattern.substr(el + 1);
    });
    if (this.pattern === this.word.wordObj.word) {
      this.gameWon();
    }
  }

  wrongChar() {
    this.wrongGuesses++;
    this.lives -= 1;
    this.ui.displayLives = this.lives;
    this.ui.showHangmanEl(this.wrongGuesses);
    if (!this.lives) {
      this.gameLost();
    }
  }

  gameWon() {
    this.disableKeyboard();
    this.ui.showPopup(true);
  }

  gameLost() {
    this.disableKeyboard();
    //1. Add animatated hangman
    this.ui.addHangmanAnimation();
    setTimeout(() => {
      this.ui.showPopup(false, this.word.wordObj.word);
    }, 3000);
  }

  async generate() {
    try {
      const res = await this.word.fetchWord(this.level);
      this.ui.generatePassword(res.word);
      this.word.wordObj = res;

      //generate keyborard

      this.ui.generateKeyboard();
      //Enable keyboard
      this.enableKeyboard();
      this.ui.addHintDescription(this.word.wordObj.description);
      //add text pattern to compare elements
      this.pattern = "-".repeat(res.word.length);
      this.ui.showStats();
    } catch (err) {
      console.log("here");
      this.ui.showErrorPopup(err);
      this.ui.hideStats();
    }
  }
}
