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
    this.resizeApp();
    this.enableMenu();
    this.enableStartAgainBtn();
    this.enableHintBtn();
    this.enableHintPopup();
  }

  resizeApp() {
    this.resize();
    window.addEventListener("resize", this.resize);
  }

  resize() {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
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

  checkCharInWord(chars) {
    const arr = [];
    chars.forEach((char, index) => {
      const currentElement = document.querySelector(`[data-char="${char}"]`);
      this.ui.setBtntoInactive(currentElement);
      currentElement.dataset.used = true;

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
      arr[index] = ArrOfIndexes;
    });
    chars.forEach((char, index) => {
      arr[index].length ? this.charMatch(char, arr[index]) : this.wrongChar();
    });
  }

  charClicked(e) {
    const currentElement = e.target;
    if (currentElement.dataset.used === "false") {
      //get character
      const clickedChar = currentElement.dataset.char;
      //compare character
      this.checkCharInWord([clickedChar]);
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
    setTimeout(() => {
      this.ui.showPopup(true);
    }, 1500);
  }

  gameLost() {
    this.disableKeyboard();
    //1. Add animatated hangman
    this.ui.addHangmanAnimation();
    setTimeout(() => {
      this.ui.showPopup(false, this.word.wordObj.word);
    }, 1500);
  }

  async generate() {
    try {
      this.ui.toggleSpinner();
      const res = await this.word.fetchWord(this.level);
      const replacedWord = this.word.replaceWord(res.word);
      let replacedDesc;
      if (!res.description) {
        replacedDesc = "Sorry, description not provided!";
      } else {
        replacedDesc = this.word.replaceDescription(res.description, res.word);
      }
      this.word.wordObj = { word: replacedWord, description: replacedDesc };
      this.ui.generatePassword(this.word.wordObj.word);

      //generate keyborard

      this.ui.generateKeyboard();
      //Enable keyboard
      this.enableKeyboard();
      this.ui.addHintDescription(this.word.wordObj.description);
      //add text pattern to compare elements
      this.pattern = "-".repeat(res.word.length);
      this.ui.showStats();
    } catch (err) {
      this.ui.showErrorPopup(err);
      this.ui.hideStats();
    } finally {
      this.ui.toggleSpinner();
    }
  }
}
