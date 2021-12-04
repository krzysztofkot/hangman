/// <reference types="cypress" />

describe("Check app functionality", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("Should choose level and check if all elements were properly displayed", () => {
    //Check if menu has 3 btns
    cy.fixture("mediumWord.json").as("obj");
    cy.intercept(/\b(\w*randomWord\w*)\b/, (req) => {
      req.reply({ fixture: "mediumWord.json" });
    }).as("getWord");
    cy.intercept(/\b(\w*definition\w*)\b/, (req) => {
      req.reply({ fixture: "mediumDesc.json" });
    }).as("desc");
    cy.get(".nav__list").children().should("be.visible").and("have.length", 3);
    cy.chooseLevel("medium");
    cy.wait("@getWord");
    cy.wait("@desc");
    cy.get("[data-btn='hint']").should("be.visible");
    cy.get(".logo+.word")
      .as("password")
      .children()
      .should("be.visible")
      .and("have.length", 7);
    cy.assertLivesLeft(11);
    cy.assertVisibleHangmanElements(0);
    cy.clickChars("x");
    cy.assertVisibleHangmanElements(1);
    cy.assertLivesLeft(10);
    cy.get(".alphabet").children().should("be.visible").and("have.length", 26);
    cy.get("@password")
      .children()
      .first()
      .as("firstLetter")
      .then(($children) => {
        const text = $children.text().trim();
        expect(text).to.be.empty;
        cy.get("[data-char='c']").then(($char) => {
          const char = $char.text();
          expect(char).to.equal("c");
          cy.clickChars(char);
          cy.get("@firstLetter").then(($char) => {
            const newVal = $char.text();
            expect(newVal).to.equal(char);
          });
        });
      });
  });
});

describe("Application actions", () => {
  beforeEach(function () {
    cy.visit("/");
    cy.fixture("difficultWord.json").then((json) => {
      this.word = json.word;
    });
    cy.fixture("difficultDesc.json").then((json) => {
      this.desc = json[0].text;
    });
  });

  it("Should have 1 life left and guess correct password", function () {
    cy.showPlayground(this.word, this.desc);
    cy.addMultipleChars(
      "c",
      "e",
      "n",
      "t",
      "u",
      "r",
      "z",
      "x",
      "b",
      "k",
      "o",
      "y",
      "p",
      "d",
      "f",
      "w"
    );
    cy.assertLivesLeft(1);
    cy.assertVisibleHangmanElements(10);
    cy.CheckPassword(false, this.word);
    cy.clickChars("a");
    cy.assertLivesLeft(1);
    cy.assertEndGamePopupHaveText("won");
  });

  it("Should guess password", function () {
    cy.showPlayground(this.word, this.desc);
    cy.addMultipleChars("a", "c", "e", "n", "t", "u", "r");
    cy.assertVisibleHangmanElements(0);
    cy.assertLivesLeft(11);
    cy.CheckPassword(true, this.word);
    cy.assertEndGamePopupHaveText("won");
  });

  it("Should not guess password", function () {
    cy.showPlayground(this.word, this.desc);
    cy.addMultipleChars("z", "x", "b", "k", "o", "y", "p", "d", "f", "w", "q");
    cy.assertVisibleHangmanElements(11);
    cy.CheckPassword(false, this.word);
    cy.assertEndGamePopupHaveText("lost");
    cy.assertEndGamePopupHaveText(this.word);
  });

  it("Password should be hashed", function () {
    cy.showPlayground(this.word, this.desc);
    cy.toggleHintPopup();
    cy.get("[data-desc='hint']")
      .should("be.visible")
      .and("not.contain", this.word)
      .and("contain", "XXX");
  });
});
