/// <reference types="cypress" />

Cypress.Commands.add("showPlayground", (word, desc) => {
  // cy.window().its("app").invoke("init");
  // cy.window().its("app").invoke("enableKeyboard");
  // cy.window().its("app").invoke("ui.toggleStartWindow");
  // cy.window().its("app").invoke("ui.generateKeyboard");
  // cy.window().its("app").invoke("ui.addHintDescription", desc);
  // cy.window().its("app").invoke("ui.showStats");
  // cy.window().its("app").invoke("ui.generatePassword", word);
  cy.window().then(({ app }) => {
    app.init();
    app.ui.toggleStartWindow();
    app.ui.generateKeyboard();
    app.enableKeyboard();
    app.ui.showStats();
    const newDesc = app.word.replaceDescription(desc, word);
    app.ui.generatePassword(word);
    app.ui.addHintDescription(newDesc);
    app.pattern = "-".repeat(word.length);
    app.word.wordObj = { word, newDesc };
  });
});

Cypress.Commands.add("addMultipleChars", (...chars) => {
  cy.window().its("app").invoke("checkCharInWord", chars);
});

Cypress.Commands.add("toggleHintPopup", () => {
  cy.window().its("app").invoke("ui.toggleHintPopup");
});
