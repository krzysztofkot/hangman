// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

/// <reference types="cypress" />

const word = "actions";
const desc = "description for actions";

//CUSTOM COMMANDS

Cypress.Commands.add("clickChars", (...chars) => {
  chars.forEach((char) => {
    cy.get(`[data-char=${char}]`).click();
  });
});

Cypress.Commands.add("chooseLevel", (level) => {
  cy.get(`[data-level="${level}"]`).click();
});

Cypress.Commands.add("hintText", () => {
  cy.get("[data-btn='hint']").click();
  return cy.get('[data-desc="hint"]');
});

Cypress.Commands.add("setRespHard", () => {
  cy.visit("/");
  cy.intercept(/\b(\w*randomWord\w*)\b/, (req) => {
    req.reply({ fixture: "difficultWord.json" });
  }).as("getWord");
  cy.intercept(/\b(\w*definition\w*)\b/, (req) => {
    req.reply({ fixture: "difficultDesc.json" });
  }).as("getDesc");
  cy.chooseLevel("hard");
  cy.wait("@getWord");
  cy.wait("@getDesc");
});

Cypress.Commands.add("assertLivesLost", (numOfIncorrectChars, ...chars) => {
  cy.get(".lives__value")
    .as("lives")
    .then(($val) => {
      const lives = parseInt($val.text());
      cy.clickChars(...chars);
      cy.get("@lives").then(($newVal) => {
        const newLivesVal = parseInt($newVal.text());
        expect(newLivesVal).to.be.equal(lives - numOfIncorrectChars);
      });
    });
});

Cypress.Commands.add("assertLivesLeft", (value) => {
  cy.get(".lives__value")
    .as(".lives")
    .then(($lives) => {
      const lives = parseInt($lives.text());
      expect(lives).to.equal(value);
    });
});

Cypress.Commands.add("assertEndGamePopupHaveText", (text) => {
  cy.get("[data-desc='game-over']")
    .should("be.visible")
    .and("contain.text", text);
});

Cypress.Commands.add("CheckPassword", (flag, password) => {
  cy.get(".word")
    .children()
    .then(($letters) => {
      const childElements = Array.from($letters);
      let word = "";
      childElements.forEach((letter) => {
        word += letter.textContent;
      });
      word = word.trim();
      if (flag) expect(word).to.equal(password);
      else expect(word).not.to.equal(password);
    });
});

Cypress.Commands.add("assertVisibleHangmanElements", (val) => {
  cy.get("[data-parts]").then(($parts) => {
    const parts = Array.from($parts);
    const visibleParts = parts.filter((el) => {
      return el.classList.contains("hidden") === false;
    });
    expect(visibleParts).to.have.lengthOf(val);
    visibleParts.forEach((el) => {
      expect(el).to.be.visible;
    });
  });
});
