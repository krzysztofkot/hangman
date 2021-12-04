/// <reference types="cypress" />

const code = 429;

describe("Mocking API responses", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("Should display error popup when cannot retrieve word from API", () => {
    cy.intercept(/\b(\w*randomWord\w*)\b/, { statusCode: code }).as("response");
    cy.chooseLevel("easy");
    cy.wait("@response");
    cy.get("[data-desc='game-over']").should(
      "have.text",
      `Error occured, status code: ${code} `
    );
  });

  it("Should display error popup when word is retrieved but description is not retrieved from API", () => {
    cy.intercept(/\b(\w*randomWord\w*)\b/, (req) => {
      req.reply({ fixture: "mediumDesc.json" });
    });
    cy.intercept(/\b(\w*definition\w*)\b/, { statusCode: code }).as("getDesc");
    cy.chooseLevel("easy");
    cy.wait("@getDesc");
    cy.get("[data-desc='game-over']").should(
      "have.text",
      `Description search failed. CODE: ${code}`
    );
  });

  it("Should retrieve word from API and check if word is hashed in hint popup", () => {
    cy.fixture("mediumWord.json").as("obj");
    cy.intercept(/\b(\w*randomWord\w*)\b/, (req) => {
      req.reply({ fixture: "mediumWord.json" });
    }).as("getWord");
    cy.intercept(/\b(\w*definition\w*)\b/, (req) => {
      req.reply({ fixture: "mediumDesc.json" });
    }).as("desc");
    cy.chooseLevel("medium");
    cy.wait("@getWord");
    cy.wait("@desc");
    cy.get("[data-btn='hint']").click();
    cy.get("@obj").then(($obj) => {
      const word = $obj.word;
      cy.get('[data-desc="hint"]')
        .should("not.contain", word)
        .and("contain", "XXX");
    });
  });
});
