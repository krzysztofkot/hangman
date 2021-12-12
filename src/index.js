"use strict";

import "./scss/main.scss";
import App from "./js/app";
import Word from "./js/word";
import UI from "./js/ui";

const app = new App(Word, UI);

if (window.Cypress) {
  window.app = app;
}
