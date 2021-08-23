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
})({"Sorter.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Sorter = void 0;

var Sorter = function () {
  function Sorter(collection) {
    this.collection = collection;
  }

  Sorter.prototype.sort = function () {
    var length = this.collection.length;

    for (var idx = 0; idx < length; idx++) {
      for (var iidx = 0; iidx < length - idx - 1; iidx++) {
        if (this.collection.compare(iidx, iidx + 1)) {
          this.collection.swap(iidx, iidx + 1);
        }
      }
    }
  };

  return Sorter;
}();

exports.Sorter = Sorter;
},{}],"NumbersCollection.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NumbersCollection = void 0;

var NumbersCollection = function () {
  function NumbersCollection(data) {
    this.data = data;
  }

  Object.defineProperty(NumbersCollection.prototype, "length", {
    get: function get() {
      return this.data.length;
    },
    enumerable: false,
    configurable: true
  });
  ;

  NumbersCollection.prototype.compare = function (leftIndex, rightIndex) {
    return this.data[leftIndex] > this.data[rightIndex];
  };

  NumbersCollection.prototype.swap = function (leftIndex, rightIndex) {
    var leftValue = this.data[leftIndex];
    this.data[leftIndex] = this.data[rightIndex];
    this.data[rightIndex] = leftValue;
  };

  return NumbersCollection;
}();

exports.NumbersCollection = NumbersCollection;
},{}],"CharactersCollection.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CharactersCollection = void 0;

var CharactersCollection = function () {
  function CharactersCollection(data) {
    this.data = data;
  }

  Object.defineProperty(CharactersCollection.prototype, "length", {
    get: function get() {
      return this.data.length;
    },
    enumerable: false,
    configurable: true
  });

  CharactersCollection.prototype.compare = function (leftIndex, rightIndex) {
    return this.data[leftIndex].toLowerCase() > this.data[rightIndex].toLowerCase();
  };

  CharactersCollection.prototype.swap = function (leftIndex, rightIndex) {
    var characters = this.data.split('');
    characters[rightIndex] = this.data[leftIndex];
    characters[leftIndex] = this.data[rightIndex];
    this.data = characters.join('');
  };

  return CharactersCollection;
}();

exports.CharactersCollection = CharactersCollection;
},{}],"LinkedList.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LinkedList = void 0;

var Node = function () {
  function Node(data) {
    this.data = data;
    this.next = null;
  }

  return Node;
}();

var LinkedList = function () {
  function LinkedList() {
    this.head = null;
  }

  LinkedList.prototype.add = function (data) {
    var node = new Node(data);

    if (!this.head) {
      this.head = node;
      return;
    }

    var tail = this.head;

    while (tail.next) {
      tail = tail.next;
    }

    tail.next = node;
  };

  Object.defineProperty(LinkedList.prototype, "length", {
    get: function get() {
      if (!this.head) {
        return 0;
      }

      var length = 1;
      var node = this.head;

      while (node.next) {
        length += 1;
        node = node.next;
      }

      return length;
    },
    enumerable: false,
    configurable: true
  });

  LinkedList.prototype.at = function (index) {
    if (!this.head) {
      throw new Error('Index out of bounds');
    }

    var counter = 0;
    var node = this.head;

    while (node) {
      if (counter === index) {
        return node;
      }

      counter += 1;
      node = node.next;
    }

    throw new Error('Index out of bounds');
  };

  LinkedList.prototype.compare = function (leftIndex, rightIndex) {
    if (!this.head) {
      throw new Error('List is empty');
    }

    return this.at(leftIndex) > this.at(rightIndex);
  };

  LinkedList.prototype.swap = function (leftIndex, rightIndex) {
    var leftValue = this.at(leftIndex);
    var rightValue = this.at(rightIndex);
    var leftHand = leftValue.data;
    leftValue.data = rightValue.data;
    rightValue.data = leftHand;
  };

  LinkedList.prototype.print = function () {
    if (!this.head) return;
    var node = this.head;

    while (node) {
      console.log(node.data);
      node = node.next;
    }
  };

  return LinkedList;
}();

exports.LinkedList = LinkedList;
},{}],"index.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var Sorter_1 = require("./Sorter");

var NumbersCollection_1 = require("./NumbersCollection");

var CharactersCollection_1 = require("./CharactersCollection");

var LinkedList_1 = require("./LinkedList");

var numbersCollection = new NumbersCollection_1.NumbersCollection([1, 23333, 22, -3, 0, 5, 1111]);
var numSorter = new Sorter_1.Sorter(numbersCollection);
var charactersCollections = new CharactersCollection_1.CharactersCollection('Xbaya');
var charSorter = new Sorter_1.Sorter(charactersCollections);
var linkedList = new LinkedList_1.LinkedList();
linkedList.add(500);
linkedList.add(-10);
linkedList.add(-3);
linkedList.add(4);
var listSorter = new Sorter_1.Sorter(linkedList);
listSorter.sort();
linkedList.print();
numSorter.sort();
console.log('Sorted Num:', numbersCollection.data);
charSorter.sort();
console.log('Sorted Chars:', charactersCollections.data);
},{"./Sorter":"Sorter.ts","./NumbersCollection":"NumbersCollection.ts","./CharactersCollection":"CharactersCollection.ts","./LinkedList":"LinkedList.ts"}],"../../../Users/raquel.nishimoto/AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "54312" + '/');

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
},{}]},{},["../../../Users/raquel.nishimoto/AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","index.ts"], null)
//# sourceMappingURL=/index.js.map