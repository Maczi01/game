// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
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

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
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
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"js/index.js":[function(require,module,exports) {
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

addEventListener("DOMContentLoaded", function () {
  var gridDisplay = document.querySelector('.grid');
  var scoreDisplay = document.querySelector("#score");
  var result = document.querySelector("result");
  var refresh = document.querySelector(".btn-menu");
  var width = 4;
  var squares = [];
  var score = 0;

  function createBoard() {
    for (var i = 0; i < width * width; i++) {
      square = document.createElement('div');
      square.innerHTML = 0;
      square.className = generateColor(0);
      gridDisplay.appendChild(square);
      squares.push(square);
    }

    generateRandomNumber();
    generateRandomNumber();
  }

  refresh.addEventListener('click', refreshBoard);

  function refreshBoard() {
    gridDisplay.innerHTML = "";

    for (var i = 0; i < width * width; i++) {
      square = document.createElement('div');
      square.innerHTML = 0;
      square.className = generateColor(0);
      gridDisplay.appendChild(square);
      squares.push(square);
    }

    generateRandomNumber();
    generateRandomNumber();
  }

  createBoard();

  function generateTwoOrFour() {
    var number = Math.floor(Math.random() * 11);

    if (number > 9) {
      return 4;
    } else return 2;
  }

  function generateRandomNumber() {
    var randomSquare = Math.floor(Math.random() * squares.length);

    if (squares[randomSquare].innerHTML == 0) {
      var randomNumber = generateTwoOrFour();
      squares[randomSquare].innerHTML = randomNumber;
      squares[randomSquare].className = generateColor(randomNumber);
      checkForGameOver();
    } else {
      generateRandomNumber();
    }
  }

  function moveRight() {
    for (var i = 0; i < 16; i++) {
      if (i % 4 === 0) {
        var totalOne = squares[i].innerHTML;
        var totalTwo = squares[i + 1].innerHTML;
        var totalThree = squares[i + 2].innerHTML;
        var totalFour = squares[i + 3].innerHTML;
        var row = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour)];
        var filteredRow = row.filter(function (num) {
          return num;
        });
        var missingSquares = 4 - filteredRow.length;
        var zeros = Array(missingSquares).fill(0);
        var newRow = [].concat(_toConsumableArray(zeros), _toConsumableArray(filteredRow));
        squares[i].innerHTML = newRow[0];
        squares[i].className = generateColor(newRow[0]);
        squares[i + 1].innerHTML = newRow[1];
        squares[i + 1].className = generateColor(newRow[1]);
        squares[i + 2].innerHTML = newRow[2];
        squares[i + 2].className = generateColor(newRow[2]);
        squares[i + 3].innerHTML = newRow[3];
        squares[i + 3].className = generateColor(newRow[3]);
      }
    }
  }

  function moveLeft() {
    for (var i = 0; i < 16; i++) {
      if (i % 4 === 0) {
        var totalOne = squares[i].innerHTML;
        var totalTwo = squares[i + 1].innerHTML;
        var totalThree = squares[i + 2].innerHTML;
        var totalFour = squares[i + 3].innerHTML;
        var row = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour)];
        var filteredRow = row.filter(function (num) {
          return num;
        });
        var missingSquares = 4 - filteredRow.length;
        var zeros = Array(missingSquares).fill(0);
        var newRow = [].concat(_toConsumableArray(filteredRow), _toConsumableArray(zeros));
        squares[i].innerHTML = newRow[0];
        squares[i].className = generateColor(newRow[0]);
        squares[i + 1].innerHTML = newRow[1];
        squares[i + 1].className = generateColor(newRow[1]);
        squares[i + 2].innerHTML = newRow[2];
        squares[i + 2].className = generateColor(newRow[2]);
        squares[i + 3].innerHTML = newRow[3];
        squares[i + 3].className = generateColor(newRow[3]);
      }
    }
  }

  function moveDown() {
    for (var i = 0; i < 4; i++) {
      var totalOne = squares[i].innerHTML;
      var totalTwo = squares[i + width].innerHTML;
      var totalThree = squares[i + width * 2].innerHTML;
      var totalFour = squares[i + width * 3].innerHTML;
      var columns = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour)];
      var filteredColumns = columns.filter(function (num) {
        return num;
      });
      var missingSquares = 4 - filteredColumns.length;
      var zeros = Array(missingSquares).fill(0);
      var newColumn = [].concat(_toConsumableArray(zeros), _toConsumableArray(filteredColumns));
      squares[i].innerHTML = newColumn[0];
      squares[i].className = generateColor(newColumn[0]);
      squares[i + width].innerHTML = newColumn[1];
      squares[i + width].className = generateColor(newColumn[1]);
      squares[i + width * 2].innerHTML = newColumn[2];
      squares[i + width * 2].className = generateColor(newColumn[2]);
      squares[i + width * 3].innerHTML = newColumn[3];
      squares[i + width * 3].className = generateColor(newColumn[3]);
    }
  }

  function moveUp() {
    for (var i = 0; i < 4; i++) {
      var totalOne = squares[i].innerHTML;
      var totalTwo = squares[i + width].innerHTML;
      var totalThree = squares[i + width * 2].innerHTML;
      var totalFour = squares[i + width * 3].innerHTML;
      var columns = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour)];
      var filteredColumns = columns.filter(function (num) {
        return num;
      });
      var missingSquares = 4 - filteredColumns.length;
      var zeros = Array(missingSquares).fill(0);
      var newColumn = [].concat(_toConsumableArray(filteredColumns), _toConsumableArray(zeros));
      squares[i].innerHTML = newColumn[0];
      squares[i].className = generateColor(newColumn[0]);
      squares[i + width].innerHTML = newColumn[1];
      squares[i + width].className = generateColor(newColumn[1]);
      squares[i + width * 2].innerHTML = newColumn[2];
      squares[i + width * 2].className = generateColor(newColumn[2]);
      squares[i + width * 3].innerHTML = newColumn[3];
      squares[i + width * 3].className = generateColor(newColumn[3]);
    }
  }

  function combineRow() {
    for (var i = 0; i < 15; i++) {
      if (squares[i].innerHTML === squares[i + 1].innerHTML) {
        var totals = parseInt(squares[i].innerHTML) + parseInt(squares[i + 1].innerHTML);
        squares[i].innerHTML = totals;
        squares[i].className = generateColor(totals);
        squares[i + 1].className = generateColor(totals);
        squares[i + 1].innerHTML = 0;
        score += totals;
        scoreDisplay.innerHTML = score;
      }
    }

    ;
    checkIfWin();
  }

  function generateColor(number) {
    switch (number) {
      case 2:
        return "_2";

      case 4:
        return "_4";

      case 8:
        return "_8";

      case 16:
        return "_16";

      case 32:
        return "_32";

      case 64:
        return "_64";

      case 128:
        return "_128";

      default:
        return "zero";
    }
  }

  function combineColumn() {
    for (var i = 0; i < 12; i++) {
      if (squares[i].innerHTML === squares[i + width].innerHTML) {
        var totals = parseInt(squares[i].innerHTML) + parseInt(squares[i + width].innerHTML);
        squares[i].innerHTML = totals;
        squares[i].className = generateColor(totals);
        squares[i + width].innerHTML = 0;
        squares[i + width].className = generateColor(0);
        score += totals;
        scoreDisplay.innerHTML = score;
      }
    }

    checkIfWin();
  }

  function control(e) {
    if (e.keyCode === 39) {
      keyRight();
    } else if (e.keyCode === 37) {
      keyLeft();
    } else if (e.keyCode === 40) {
      keyDown();
    } else if (e.keyCode === 38) {
      keyUp();
    }
  }

  document.addEventListener('keyup', control);

  function keyRight() {
    moveRight();
    combineRow();
    moveRight();
    generateRandomNumber();
  }

  function keyLeft() {
    moveLeft();
    combineRow();
    moveLeft();
    generateRandomNumber();
  }

  function keyDown() {
    moveDown();
    combineColumn();
    moveDown();
    generateRandomNumber();
  }

  function keyUp() {
    moveUp();
    combineColumn();
    moveUp();
    generateRandomNumber();
  }

  function checkIfWin() {
    for (var i = 0; i < squares.length; i++) {
      if (squares[i].innerHTML == 64) {
        scoreDisplay.innerHTML = "You Win!";
        document.removeEventListener('keyup', control);
      }
    }
  }

  function checkForGameOver() {
    var zeros = 0;

    for (var i = 0; i < squares.length; i++) {
      if (squares[i].innerHTML == 0) {
        zeros++;
      }
    }

    if (zeros === 0) {
      scoreDisplay.innerHTML = " Game over!";
      document.removeEventListener('keyup', control);
    }
  }
});
},{}],"../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "59756" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","js/index.js"], null)
//# sourceMappingURL=/js.00a46daa.js.map