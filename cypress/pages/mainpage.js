class Mainpage {
  get spinner() {
    return cy.get(".spinner");
  }

  get keybord() {
    return cy.get(".alphabet");
  }

  getChar(char) {
    return cy.get(`[data-char=${char}]`);
  }

  getLives() {
    return cy.get(".lives__value");
  }

  get popup() {
    return cy.get(".popup__container");
  }
}

export default new Mainpage();
