// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

(function(modules, entry, mainEntry, parcelRequireName, globalName) {
  /* eslint-disable no-undef */
  var globalObject =
    typeof globalThis !== 'undefined'
      ? globalThis
      : typeof self !== 'undefined'
      ? self
      : typeof window !== 'undefined'
      ? window
      : typeof global !== 'undefined'
      ? global
      : {};
  /* eslint-enable no-undef */

  // Save the require from previous bundle to this closure if any
  var previousRequire =
    typeof globalObject[parcelRequireName] === 'function' &&
    globalObject[parcelRequireName];

  var cache = previousRequire.cache || {};
  // Do not use `require` to prevent Webpack from trying to bundle this call
  var nodeRequire =
    typeof module !== 'undefined' &&
    typeof module.require === 'function' &&
    module.require.bind(module);

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire =
          typeof globalObject[parcelRequireName] === 'function' &&
          globalObject[parcelRequireName];
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error("Cannot find module '" + name + "'");
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = (cache[name] = new newRequire.Module(name));

      modules[name][0].call(
        module.exports,
        localRequire,
        module,
        module.exports,
        this
      );
    }

    return cache[name].exports;

    function localRequire(x) {
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x) {
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function(id, exports) {
    modules[id] = [
      function(require, module) {
        module.exports = exports;
      },
      {},
    ];
  };

  Object.defineProperty(newRequire, 'root', {
    get: function() {
      return globalObject[parcelRequireName];
    },
  });

  globalObject[parcelRequireName] = newRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (mainEntry) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(mainEntry);

    // CommonJS
    if (typeof exports === 'object' && typeof module !== 'undefined') {
      module.exports = mainExports;

      // RequireJS
    } else if (typeof define === 'function' && define.amd) {
      define(function() {
        return mainExports;
      });

      // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }
})({"lBB98":[function(require,module,exports) {
var HMR_HOST = null;
var HMR_PORT = null;
var HMR_SECURE = false;
var HMR_ENV_HASH = "4a236f9275d0a351";
module.bundle.HMR_BUNDLE_ID = "c9b2bbcd379dd93c";
"use strict";
function _createForOfIteratorHelper(o, allowArrayLike) {
    var it;
    if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) {
        if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
            if (it) o = it;
            var i = 0;
            var F = function F() {
            };
            return {
                s: F,
                n: function n() {
                    if (i >= o.length) return {
                        done: true
                    };
                    return {
                        done: false,
                        value: o[i++]
                    };
                },
                e: function e(_e) {
                    throw _e;
                },
                f: F
            };
        }
        throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }
    var normalCompletion = true, didErr = false, err;
    return {
        s: function s() {
            it = o[Symbol.iterator]();
        },
        n: function n() {
            var step = it.next();
            normalCompletion = step.done;
            return step;
        },
        e: function e(_e2) {
            didErr = true;
            err = _e2;
        },
        f: function f() {
            try {
                if (!normalCompletion && it.return != null) it.return();
            } finally{
                if (didErr) throw err;
            }
        }
    };
}
function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}
function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for(var i = 0, arr2 = new Array(len); i < len; i++)arr2[i] = arr[i];
    return arr2;
}
/* global HMR_HOST, HMR_PORT, HMR_ENV_HASH, HMR_SECURE */ /*::
import type {
  HMRAsset,
  HMRMessage,
} from '@parcel/reporter-dev-server/src/HMRServer.js';
interface ParcelRequire {
  (string): mixed;
  cache: {|[string]: ParcelModule|};
  hotData: mixed;
  Module: any;
  parent: ?ParcelRequire;
  isParcelRequire: true;
  modules: {|[string]: [Function, {|[string]: string|}]|};
  HMR_BUNDLE_ID: string;
  root: ParcelRequire;
}
interface ParcelModule {
  hot: {|
    data: mixed,
    accept(cb: (Function) => void): void,
    dispose(cb: (mixed) => void): void,
    // accept(deps: Array<string> | string, cb: (Function) => void): void,
    // decline(): void,
    _acceptCallbacks: Array<(Function) => void>,
    _disposeCallbacks: Array<(mixed) => void>,
  |};
}
declare var module: {bundle: ParcelRequire, ...};
declare var HMR_HOST: string;
declare var HMR_PORT: string;
declare var HMR_ENV_HASH: string;
declare var HMR_SECURE: boolean;
*/ var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;
function Module(moduleName) {
    OldModule.call(this, moduleName);
    this.hot = {
        data: module.bundle.hotData,
        _acceptCallbacks: [],
        _disposeCallbacks: [],
        accept: function accept(fn) {
            this._acceptCallbacks.push(fn || function() {
            });
        },
        dispose: function dispose(fn) {
            this._disposeCallbacks.push(fn);
        }
    };
    module.bundle.hotData = undefined;
}
module.bundle.Module = Module;
var checkedAssets, acceptedAssets, assetsToAccept;
function getHostname() {
    return HMR_HOST || (location.protocol.indexOf('http') === 0 ? location.hostname : 'localhost');
}
function getPort() {
    return HMR_PORT || location.port;
} // eslint-disable-next-line no-redeclare
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
    var hostname = getHostname();
    var port = getPort();
    var protocol = HMR_SECURE || location.protocol == 'https:' && !/localhost|127.0.0.1|0.0.0.0/.test(hostname) ? 'wss' : 'ws';
    var ws = new WebSocket(protocol + '://' + hostname + (port ? ':' + port : '') + '/'); // $FlowFixMe
    ws.onmessage = function(event) {
        checkedAssets = {
        };
        acceptedAssets = {
        };
        assetsToAccept = [];
        var data = JSON.parse(event.data);
        if (data.type === 'update') {
            // Remove error overlay if there is one
            if (typeof document !== 'undefined') removeErrorOverlay();
            var assets = data.assets.filter(function(asset) {
                return asset.envHash === HMR_ENV_HASH;
            }); // Handle HMR Update
            var handled = assets.every(function(asset) {
                return asset.type === 'css' || asset.type === 'js' && hmrAcceptCheck(module.bundle.root, asset.id, asset.depsByBundle);
            });
            if (handled) {
                console.clear();
                assets.forEach(function(asset) {
                    hmrApply(module.bundle.root, asset);
                });
                for(var i = 0; i < assetsToAccept.length; i++){
                    var id = assetsToAccept[i][1];
                    if (!acceptedAssets[id]) hmrAcceptRun(assetsToAccept[i][0], id);
                }
            } else window.location.reload();
        }
        if (data.type === 'error') {
            // Log parcel errors to console
            var _iterator = _createForOfIteratorHelper(data.diagnostics.ansi), _step;
            try {
                for(_iterator.s(); !(_step = _iterator.n()).done;){
                    var ansiDiagnostic = _step.value;
                    var stack = ansiDiagnostic.codeframe ? ansiDiagnostic.codeframe : ansiDiagnostic.stack;
                    console.error('🚨 [parcel]: ' + ansiDiagnostic.message + '\n' + stack + '\n\n' + ansiDiagnostic.hints.join('\n'));
                }
            } catch (err) {
                _iterator.e(err);
            } finally{
                _iterator.f();
            }
            if (typeof document !== 'undefined') {
                // Render the fancy html overlay
                removeErrorOverlay();
                var overlay = createErrorOverlay(data.diagnostics.html); // $FlowFixMe
                document.body.appendChild(overlay);
            }
        }
    };
    ws.onerror = function(e) {
        console.error(e.message);
    };
    ws.onclose = function() {
        console.warn('[parcel] 🚨 Connection to the HMR server was lost');
    };
}
function removeErrorOverlay() {
    var overlay = document.getElementById(OVERLAY_ID);
    if (overlay) {
        overlay.remove();
        console.log('[parcel] ✨ Error resolved');
    }
}
function createErrorOverlay(diagnostics) {
    var overlay = document.createElement('div');
    overlay.id = OVERLAY_ID;
    var errorHTML = '<div style="background: black; opacity: 0.85; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; font-family: Menlo, Consolas, monospace; z-index: 9999;">';
    var _iterator2 = _createForOfIteratorHelper(diagnostics), _step2;
    try {
        for(_iterator2.s(); !(_step2 = _iterator2.n()).done;){
            var diagnostic = _step2.value;
            var stack = diagnostic.codeframe ? diagnostic.codeframe : diagnostic.stack;
            errorHTML += "\n      <div>\n        <div style=\"font-size: 18px; font-weight: bold; margin-top: 20px;\">\n          \uD83D\uDEA8 ".concat(diagnostic.message, "\n        </div>\n        <pre>").concat(stack, "</pre>\n        <div>\n          ").concat(diagnostic.hints.map(function(hint) {
                return '<div>💡 ' + hint + '</div>';
            }).join(''), "\n        </div>\n        ").concat(diagnostic.documentation ? "<div>\uD83D\uDCDD <a style=\"color: violet\" href=\"".concat(diagnostic.documentation, "\" target=\"_blank\">Learn more</a></div>") : '', "\n      </div>\n    ");
        }
    } catch (err) {
        _iterator2.e(err);
    } finally{
        _iterator2.f();
    }
    errorHTML += '</div>';
    overlay.innerHTML = errorHTML;
    return overlay;
}
function getParents(bundle, id) /*: Array<[ParcelRequire, string]> */ {
    var modules = bundle.modules;
    if (!modules) return [];
    var parents = [];
    var k, d, dep;
    for(k in modules)for(d in modules[k][1]){
        dep = modules[k][1][d];
        if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) parents.push([
            bundle,
            k
        ]);
    }
    if (bundle.parent) parents = parents.concat(getParents(bundle.parent, id));
    return parents;
}
function updateLink(link) {
    var newLink = link.cloneNode();
    newLink.onload = function() {
        if (link.parentNode !== null) // $FlowFixMe
        link.parentNode.removeChild(link);
    };
    newLink.setAttribute('href', link.getAttribute('href').split('?')[0] + '?' + Date.now()); // $FlowFixMe
    link.parentNode.insertBefore(newLink, link.nextSibling);
}
var cssTimeout = null;
function reloadCSS() {
    if (cssTimeout) return;
    cssTimeout = setTimeout(function() {
        var links = document.querySelectorAll('link[rel="stylesheet"]');
        for(var i = 0; i < links.length; i++){
            // $FlowFixMe[incompatible-type]
            var href = links[i].getAttribute('href');
            var hostname = getHostname();
            var servedFromHMRServer = hostname === 'localhost' ? new RegExp('^(https?:\\/\\/(0.0.0.0|127.0.0.1)|localhost):' + getPort()).test(href) : href.indexOf(hostname + ':' + getPort());
            var absolute = /^https?:\/\//i.test(href) && href.indexOf(window.location.origin) !== 0 && !servedFromHMRServer;
            if (!absolute) updateLink(links[i]);
        }
        cssTimeout = null;
    }, 50);
}
function hmrApply(bundle, asset) {
    var modules = bundle.modules;
    if (!modules) return;
    if (asset.type === 'css') reloadCSS();
    else if (asset.type === 'js') {
        var deps = asset.depsByBundle[bundle.HMR_BUNDLE_ID];
        if (deps) {
            var fn = new Function('require', 'module', 'exports', asset.output);
            modules[asset.id] = [
                fn,
                deps
            ];
        } else if (bundle.parent) hmrApply(bundle.parent, asset);
    }
}
function hmrAcceptCheck(bundle, id, depsByBundle) {
    var modules = bundle.modules;
    if (!modules) return;
    if (depsByBundle && !depsByBundle[bundle.HMR_BUNDLE_ID]) {
        // If we reached the root bundle without finding where the asset should go,
        // there's nothing to do. Mark as "accepted" so we don't reload the page.
        if (!bundle.parent) return true;
        return hmrAcceptCheck(bundle.parent, id, depsByBundle);
    }
    if (checkedAssets[id]) return true;
    checkedAssets[id] = true;
    var cached = bundle.cache[id];
    assetsToAccept.push([
        bundle,
        id
    ]);
    if (cached && cached.hot && cached.hot._acceptCallbacks.length) return true;
    var parents = getParents(module.bundle.root, id); // If no parents, the asset is new. Prevent reloading the page.
    if (!parents.length) return true;
    return parents.some(function(v) {
        return hmrAcceptCheck(v[0], v[1], null);
    });
}
function hmrAcceptRun(bundle, id) {
    var cached = bundle.cache[id];
    bundle.hotData = {
    };
    if (cached && cached.hot) cached.hot.data = bundle.hotData;
    if (cached && cached.hot && cached.hot._disposeCallbacks.length) cached.hot._disposeCallbacks.forEach(function(cb) {
        cb(bundle.hotData);
    });
    delete bundle.cache[id];
    bundle(id);
    cached = bundle.cache[id];
    if (cached && cached.hot && cached.hot._acceptCallbacks.length) cached.hot._acceptCallbacks.forEach(function(cb) {
        var assetsToAlsoAccept = cb(function() {
            return getParents(module.bundle.root, id);
        });
        if (assetsToAlsoAccept && assetsToAccept.length) // $FlowFixMe[method-unbinding]
        assetsToAccept.push.apply(assetsToAccept, assetsToAlsoAccept);
    });
    acceptedAssets[id] = true;
}

},{}],"hD4hw":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
var _mainScss = require("./scss/main.scss");
var _app = require("./js/app");
var _appDefault = parcelHelpers.interopDefault(_app);
var _word = require("./js/word");
var _wordDefault = parcelHelpers.interopDefault(_word);
var _ui = require("./js/ui");
var _uiDefault = parcelHelpers.interopDefault(_ui);
"use strict";
const app = new _appDefault.default(_wordDefault.default, _uiDefault.default);
if (window.Cypress) window.app = app;

},{"./scss/main.scss":"5b6JI","./js/app":"5mvL2","./js/word":"h88LW","./js/ui":"2DR6j","@parcel/transformer-js/src/esmodule-helpers.js":"ciiiV"}],"5b6JI":[function() {},{}],"5mvL2":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
class App {
    constructor(Word, UI){
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
        this.startAgainBtn.addEventListener("click", this.startAgainGame.bind(this));
    }
    checkCharInWord(chars) {
        const arr = [];
        chars.forEach((char, index)=>{
            const currentElement = document.querySelector(`[data-char="${char}"]`);
            this.ui.setBtntoInactive(currentElement);
            currentElement.dataset.used = true;
            const { word  } = this.word.wordObj;
            const ArrOfIndexes = [];
            for(let i = 0; i < word.length;){
                const charIndex = word.indexOf(char, i);
                if (charIndex === -1) break;
                ArrOfIndexes.push(charIndex);
                i = charIndex + 1;
            }
            arr[index] = ArrOfIndexes;
        });
        chars.forEach((char, index)=>{
            arr[index].length ? this.charMatch(char, arr[index]) : this.wrongChar();
        });
    }
    charClicked(e) {
        const currentElement = e.target;
        if (currentElement.dataset.used === "false") {
            //get character
            const clickedChar = currentElement.dataset.char;
            //compare character
            this.checkCharInWord([
                clickedChar
            ]);
        }
    }
    charMatch(char, indexes) {
        this.ui.displayChars(char, indexes);
        indexes.forEach((el)=>{
            this.pattern = this.pattern.substr(0, el) + char + this.pattern.substr(el + 1);
        });
        if (this.pattern === this.word.wordObj.word) this.gameWon();
    }
    wrongChar() {
        this.wrongGuesses++;
        this.lives -= 1;
        this.ui.displayLives = this.lives;
        this.ui.showHangmanEl(this.wrongGuesses);
        if (!this.lives) this.gameLost();
    }
    gameWon() {
        this.disableKeyboard();
        setTimeout(()=>{
            this.ui.showPopup(true);
        }, 1500);
    }
    gameLost() {
        this.disableKeyboard();
        //1. Add animatated hangman
        this.ui.addHangmanAnimation();
        setTimeout(()=>{
            this.ui.showPopup(false, this.word.wordObj.word);
        }, 1500);
    }
    async generate() {
        try {
            this.ui.toggleSpinner();
            const res = await this.word.fetchWord(this.level);
            const replacedWord = this.word.replaceWord(res.word);
            let replacedDesc;
            if (!res.description) replacedDesc = "Sorry, description not provided!";
            else replacedDesc = this.word.replaceDescription(res.description, res.word);
            this.word.wordObj = {
                word: replacedWord,
                description: replacedDesc
            };
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
        } finally{
            this.ui.toggleSpinner();
        }
    }
}
exports.default = App;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"ciiiV"}],"ciiiV":[function(require,module,exports) {
exports.interopDefault = function(a) {
    return a && a.__esModule ? a : {
        default: a
    };
};
exports.defineInteropFlag = function(a) {
    Object.defineProperty(a, '__esModule', {
        value: true
    });
};
exports.exportAll = function(source, dest) {
    Object.keys(source).forEach(function(key) {
        if (key === 'default' || key === '__esModule' || dest.hasOwnProperty(key)) return;
        Object.defineProperty(dest, key, {
            enumerable: true,
            get: function() {
                return source[key];
            }
        });
    });
    return dest;
};
exports.export = function(dest, destName, get) {
    Object.defineProperty(dest, destName, {
        enumerable: true,
        get: get
    });
};

},{}],"h88LW":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
const API_KEY = "jemwxxisvxvt7ln9n363blwz6vx6y3jvx9q3uzngzpybctyvo";
class Word {
    constructor(){
    }
    replaceWord(element) {
        const replace = /[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/;
        const re = new RegExp(replace, "ig");
        return element.replace(re, "");
    }
    replaceDescription(element, removable) {
        const replace = removable;
        const re = new RegExp(replace, "ig");
        return element.replace(re, "XXX");
    }
    async fetchWord(difficult) {
        try {
            let replacedDesc;
            const queryParams = this.getQueryParams(difficult);
            if (!queryParams) throw new Error("Incorrect level set! Try again");
            const res = await fetch(`https://api.wordnik.com/v4/words.json/randomWord?hasDictionaryDef=true&${queryParams}&api_key=${API_KEY}`);
            if (!res.ok) throw new Error(`Error occured, status code: ${res.status} `);
            const data = await res.json();
            const descRes = await fetch(`https://api.wordnik.com/v4/word.json/${data.word}/definitions?limit=1&includeRelated=false&useCanonical=false&includeTags=false&api_key=${API_KEY}`);
            if (!descRes.ok) throw new Error(`Description search failed. CODE: ${descRes.status}`);
            const descData = await descRes.json();
            let desc;
            if (!descData[0].text) desc = descData[0].text;
            else if (Array.isArray(descData[0].text)) desc = descData[0].text[1];
            else desc = descData[0].text;
            return {
                word: data.word.toLowerCase(),
                description: desc
            };
        } catch (err) {
            throw err;
        }
    }
    getQueryParams(difficult) {
        let string;
        switch(difficult){
            case "easy":
                string = "minCorpusCount=100000&maxCorpusCount=-1&minDictionaryCount=6&maxDictionaryCount=-1&minLength=6&maxLength=12";
                break;
            case "medium":
                string = "minCorpusCount=1000&maxCorpusCount=12000&minDictionaryCount=4&maxDictionaryCount=-1&minLength=5&maxLength=10";
                break;
            case "hard":
                string = "minCorpusCount=1&maxCorpusCount=20&minDictionaryCount=1&maxDictionaryCount=2&minLength=5&maxLength=10";
                break;
            default:
                string = -1;
                break;
        }
        return string;
    }
}
exports.default = Word;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"ciiiV"}],"2DR6j":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
class UI {
    constructor(){
        this.startWindow = document.querySelector(".start");
        this.stats = document.querySelector(".playground__top");
        this.spinner = document.querySelector(".spinner");
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
        while(this.keyboardContainer.firstChild)this.keyboardContainer.removeChild(this.keyboardContainer.firstChild);
    }
    toggleSpinner() {
        this.spinner.classList.toggle("hidden");
    }
    showStats() {
        this.stats.classList.remove("hidden");
    }
    hideStats() {
        this.stats.classList.add("hidden");
    }
    addHintDescription(desc) {
        this.hintDesc.innerHTML = desc;
    }
    displayChars(char, indexes) {
        const password = document.querySelectorAll("[data-password=true]");
        indexes.forEach((val)=>{
            password[val].textContent = char;
        });
    }
    generateKeyboard() {
        //create array of letters
        const charsArr = this.characters.split(",");
        charsArr.forEach((char)=>{
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
        for(let i = 0; i < word.length; i++)this.wordContainer.insertAdjacentHTML("beforeend", template);
    }
    removePassword() {
        this.wordContainer.textContent = "";
    }
    hideHangman() {
        Array.from(this.hangmanParts).forEach((part)=>part.classList.add("hidden")
        );
    }
    showHangmanEl(el) {
        if (el <= this.hangmanParts.length) this.hangmanParts[el - 1].classList.remove("hidden");
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
    showErrorPopup(err) {
        this.toggleGameOverPopup();
        this.gameOverDesc.textContent = err.message;
    }
    showPopup(flag, word) {
        this.toggleGameOverPopup();
        let text;
        if (flag) text = "Congratulations You won! Click button below to start over!";
        else text = `Sorry, You lost.... correct answer was <span class='password'>${word}</span>. Click button below to start over!`;
        this.gameOverDesc.innerHTML = text;
    }
    addHangmanAnimation() {
        this.hangmanAnimationParts.forEach((part)=>{
            const animationClass = part.dataset.animation;
            part.classList.add(animationClass);
        });
    }
    removeHangmanAnimation() {
        this.hangmanAnimationParts.forEach((part)=>{
            const animationClass = part.dataset.animation;
            part.classList.remove(animationClass);
        });
    }
}
exports.default = UI;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"ciiiV"}]},["lBB98","hD4hw"], "hD4hw", "parcelRequireec6f")

//# sourceMappingURL=index.379dd93c.js.map
