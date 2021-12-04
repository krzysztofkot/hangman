class Startpage {
  get buttons() {
    return cy.get(".nav__list").children();
  }

  get easyLvBtn() {
    return cy.get("[data-level='easy']");
  }
  get mediumLvBtn() {
    return cy.get("[data-level='medium']");
  }
  get hardLvBtn() {
    return cy.get("[data-level='hard']");
  }

  get easyBtnName() {
    return this.easyLvBtn.children().children();
  }

  get mediumBtnName() {
    return this.mediumLvBtn.children().children();
  }

  get hardBtnName() {
    return this.hardLvBtn.children().children();
  }

  clickEasyBtn() {
    this.easyLvBtn.click();
  }
}

export default new Startpage();
