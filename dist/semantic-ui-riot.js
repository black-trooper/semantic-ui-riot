(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("date-fns/add_days/index"), require("date-fns/add_months/index"), require("date-fns/format/index"), require("date-fns/is_same_day/index"), require("date-fns/is_today/index"), require("date-fns/parse/index"), require("date-fns/start_of_month/index"));
	else if(typeof define === 'function' && define.amd)
		define(["date-fns/add_days/index", "date-fns/add_months/index", "date-fns/format/index", "date-fns/is_same_day/index", "date-fns/is_today/index", "date-fns/parse/index", "date-fns/start_of_month/index"], factory);
	else if(typeof exports === 'object')
		exports["SemanticUiRiot"] = factory(require("date-fns/add_days/index"), require("date-fns/add_months/index"), require("date-fns/format/index"), require("date-fns/is_same_day/index"), require("date-fns/is_today/index"), require("date-fns/parse/index"), require("date-fns/start_of_month/index"));
	else
		root["SemanticUiRiot"] = factory(root["dateFns"]["addDays"], root["dateFns"]["addMonths"], root["dateFns"]["format"], root["dateFns"]["isSameDay"], root["dateFns"]["isToday"], root["dateFns"]["parse"], root["dateFns"]["startOfMonth"]);
})(window, function(__WEBPACK_EXTERNAL_MODULE_date_fns_add_days__, __WEBPACK_EXTERNAL_MODULE_date_fns_add_months__, __WEBPACK_EXTERNAL_MODULE_date_fns_format__, __WEBPACK_EXTERNAL_MODULE_date_fns_is_same_day__, __WEBPACK_EXTERNAL_MODULE_date_fns_is_today__, __WEBPACK_EXTERNAL_MODULE_date_fns_parse__, __WEBPACK_EXTERNAL_MODULE_date_fns_start_of_month__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/node-libs-browser/node_modules/timers-browserify/main.js":
/*!*******************************************************************************!*\
  !*** ./node_modules/node-libs-browser/node_modules/timers-browserify/main.js ***!
  \*******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {var scope = (typeof global !== "undefined" && global) ||
            (typeof self !== "undefined" && self) ||
            window;
var apply = Function.prototype.apply;

// DOM APIs, for completeness

exports.setTimeout = function() {
  return new Timeout(apply.call(setTimeout, scope, arguments), clearTimeout);
};
exports.setInterval = function() {
  return new Timeout(apply.call(setInterval, scope, arguments), clearInterval);
};
exports.clearTimeout =
exports.clearInterval = function(timeout) {
  if (timeout) {
    timeout.close();
  }
};

function Timeout(id, clearFn) {
  this._id = id;
  this._clearFn = clearFn;
}
Timeout.prototype.unref = Timeout.prototype.ref = function() {};
Timeout.prototype.close = function() {
  this._clearFn.call(scope, this._id);
};

// Does not start the time, just sets up the members needed.
exports.enroll = function(item, msecs) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = msecs;
};

exports.unenroll = function(item) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = -1;
};

exports._unrefActive = exports.active = function(item) {
  clearTimeout(item._idleTimeoutId);

  var msecs = item._idleTimeout;
  if (msecs >= 0) {
    item._idleTimeoutId = setTimeout(function onTimeout() {
      if (item._onTimeout)
        item._onTimeout();
    }, msecs);
  }
};

// setimmediate attaches itself to the global object
__webpack_require__(/*! setimmediate */ "./node_modules/setimmediate/setImmediate.js");
// On some exotic environments, it's not clear which object `setimmediate` was
// able to install onto.  Search each possibility in the same order as the
// `setimmediate` library.
exports.setImmediate = (typeof self !== "undefined" && self.setImmediate) ||
                       (typeof global !== "undefined" && global.setImmediate) ||
                       (this && this.setImmediate);
exports.clearImmediate = (typeof self !== "undefined" && self.clearImmediate) ||
                         (typeof global !== "undefined" && global.clearImmediate) ||
                         (this && this.clearImmediate);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./node_modules/process/browser.js":
/*!*****************************************!*\
  !*** ./node_modules/process/browser.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),

/***/ "./node_modules/q/q.js":
/*!*****************************!*\
  !*** ./node_modules/q/q.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(process, setImmediate) {// vim:ts=4:sts=4:sw=4:
/*!
 *
 * Copyright 2009-2017 Kris Kowal under the terms of the MIT
 * license found at https://github.com/kriskowal/q/blob/v1/LICENSE
 *
 * With parts by Tyler Close
 * Copyright 2007-2009 Tyler Close under the terms of the MIT X license found
 * at http://www.opensource.org/licenses/mit-license.html
 * Forked at ref_send.js version: 2009-05-11
 *
 * With parts by Mark Miller
 * Copyright (C) 2011 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */

(function (definition) {
    "use strict";

    // This file will function properly as a <script> tag, or a module
    // using CommonJS and NodeJS or RequireJS module formats.  In
    // Common/Node/RequireJS, the module exports the Q API and when
    // executed as a simple <script>, it creates a Q global instead.

    // Montage Require
    if (typeof bootstrap === "function") {
        bootstrap("promise", definition);

    // CommonJS
    } else if (true) {
        module.exports = definition();

    // RequireJS
    } else { var previousQ, global; }

})(function () {
"use strict";

var hasStacks = false;
try {
    throw new Error();
} catch (e) {
    hasStacks = !!e.stack;
}

// All code after this point will be filtered from stack traces reported
// by Q.
var qStartingLine = captureLine();
var qFileName;

// shims

// used for fallback in "allResolved"
var noop = function () {};

// Use the fastest possible means to execute a task in a future turn
// of the event loop.
var nextTick =(function () {
    // linked list of tasks (single, with head node)
    var head = {task: void 0, next: null};
    var tail = head;
    var flushing = false;
    var requestTick = void 0;
    var isNodeJS = false;
    // queue for late tasks, used by unhandled rejection tracking
    var laterQueue = [];

    function flush() {
        /* jshint loopfunc: true */
        var task, domain;

        while (head.next) {
            head = head.next;
            task = head.task;
            head.task = void 0;
            domain = head.domain;

            if (domain) {
                head.domain = void 0;
                domain.enter();
            }
            runSingle(task, domain);

        }
        while (laterQueue.length) {
            task = laterQueue.pop();
            runSingle(task);
        }
        flushing = false;
    }
    // runs a single function in the async queue
    function runSingle(task, domain) {
        try {
            task();

        } catch (e) {
            if (isNodeJS) {
                // In node, uncaught exceptions are considered fatal errors.
                // Re-throw them synchronously to interrupt flushing!

                // Ensure continuation if the uncaught exception is suppressed
                // listening "uncaughtException" events (as domains does).
                // Continue in next event to avoid tick recursion.
                if (domain) {
                    domain.exit();
                }
                setTimeout(flush, 0);
                if (domain) {
                    domain.enter();
                }

                throw e;

            } else {
                // In browsers, uncaught exceptions are not fatal.
                // Re-throw them asynchronously to avoid slow-downs.
                setTimeout(function () {
                    throw e;
                }, 0);
            }
        }

        if (domain) {
            domain.exit();
        }
    }

    nextTick = function (task) {
        tail = tail.next = {
            task: task,
            domain: isNodeJS && process.domain,
            next: null
        };

        if (!flushing) {
            flushing = true;
            requestTick();
        }
    };

    if (typeof process === "object" &&
        process.toString() === "[object process]" && process.nextTick) {
        // Ensure Q is in a real Node environment, with a `process.nextTick`.
        // To see through fake Node environments:
        // * Mocha test runner - exposes a `process` global without a `nextTick`
        // * Browserify - exposes a `process.nexTick` function that uses
        //   `setTimeout`. In this case `setImmediate` is preferred because
        //    it is faster. Browserify's `process.toString()` yields
        //   "[object Object]", while in a real Node environment
        //   `process.toString()` yields "[object process]".
        isNodeJS = true;

        requestTick = function () {
            process.nextTick(flush);
        };

    } else if (typeof setImmediate === "function") {
        // In IE10, Node.js 0.9+, or https://github.com/NobleJS/setImmediate
        if (typeof window !== "undefined") {
            requestTick = setImmediate.bind(window, flush);
        } else {
            requestTick = function () {
                setImmediate(flush);
            };
        }

    } else if (typeof MessageChannel !== "undefined") {
        // modern browsers
        // http://www.nonblocking.io/2011/06/windownexttick.html
        var channel = new MessageChannel();
        // At least Safari Version 6.0.5 (8536.30.1) intermittently cannot create
        // working message ports the first time a page loads.
        channel.port1.onmessage = function () {
            requestTick = requestPortTick;
            channel.port1.onmessage = flush;
            flush();
        };
        var requestPortTick = function () {
            // Opera requires us to provide a message payload, regardless of
            // whether we use it.
            channel.port2.postMessage(0);
        };
        requestTick = function () {
            setTimeout(flush, 0);
            requestPortTick();
        };

    } else {
        // old browsers
        requestTick = function () {
            setTimeout(flush, 0);
        };
    }
    // runs a task after all other tasks have been run
    // this is useful for unhandled rejection tracking that needs to happen
    // after all `then`d tasks have been run.
    nextTick.runAfter = function (task) {
        laterQueue.push(task);
        if (!flushing) {
            flushing = true;
            requestTick();
        }
    };
    return nextTick;
})();

// Attempt to make generics safe in the face of downstream
// modifications.
// There is no situation where this is necessary.
// If you need a security guarantee, these primordials need to be
// deeply frozen anyway, and if you don’t need a security guarantee,
// this is just plain paranoid.
// However, this **might** have the nice side-effect of reducing the size of
// the minified code by reducing x.call() to merely x()
// See Mark Miller’s explanation of what this does.
// http://wiki.ecmascript.org/doku.php?id=conventions:safe_meta_programming
var call = Function.call;
function uncurryThis(f) {
    return function () {
        return call.apply(f, arguments);
    };
}
// This is equivalent, but slower:
// uncurryThis = Function_bind.bind(Function_bind.call);
// http://jsperf.com/uncurrythis

var array_slice = uncurryThis(Array.prototype.slice);

var array_reduce = uncurryThis(
    Array.prototype.reduce || function (callback, basis) {
        var index = 0,
            length = this.length;
        // concerning the initial value, if one is not provided
        if (arguments.length === 1) {
            // seek to the first value in the array, accounting
            // for the possibility that is is a sparse array
            do {
                if (index in this) {
                    basis = this[index++];
                    break;
                }
                if (++index >= length) {
                    throw new TypeError();
                }
            } while (1);
        }
        // reduce
        for (; index < length; index++) {
            // account for the possibility that the array is sparse
            if (index in this) {
                basis = callback(basis, this[index], index);
            }
        }
        return basis;
    }
);

var array_indexOf = uncurryThis(
    Array.prototype.indexOf || function (value) {
        // not a very good shim, but good enough for our one use of it
        for (var i = 0; i < this.length; i++) {
            if (this[i] === value) {
                return i;
            }
        }
        return -1;
    }
);

var array_map = uncurryThis(
    Array.prototype.map || function (callback, thisp) {
        var self = this;
        var collect = [];
        array_reduce(self, function (undefined, value, index) {
            collect.push(callback.call(thisp, value, index, self));
        }, void 0);
        return collect;
    }
);

var object_create = Object.create || function (prototype) {
    function Type() { }
    Type.prototype = prototype;
    return new Type();
};

var object_defineProperty = Object.defineProperty || function (obj, prop, descriptor) {
    obj[prop] = descriptor.value;
    return obj;
};

var object_hasOwnProperty = uncurryThis(Object.prototype.hasOwnProperty);

var object_keys = Object.keys || function (object) {
    var keys = [];
    for (var key in object) {
        if (object_hasOwnProperty(object, key)) {
            keys.push(key);
        }
    }
    return keys;
};

var object_toString = uncurryThis(Object.prototype.toString);

function isObject(value) {
    return value === Object(value);
}

// generator related shims

// FIXME: Remove this function once ES6 generators are in SpiderMonkey.
function isStopIteration(exception) {
    return (
        object_toString(exception) === "[object StopIteration]" ||
        exception instanceof QReturnValue
    );
}

// FIXME: Remove this helper and Q.return once ES6 generators are in
// SpiderMonkey.
var QReturnValue;
if (typeof ReturnValue !== "undefined") {
    QReturnValue = ReturnValue;
} else {
    QReturnValue = function (value) {
        this.value = value;
    };
}

// long stack traces

var STACK_JUMP_SEPARATOR = "From previous event:";

function makeStackTraceLong(error, promise) {
    // If possible, transform the error stack trace by removing Node and Q
    // cruft, then concatenating with the stack trace of `promise`. See #57.
    if (hasStacks &&
        promise.stack &&
        typeof error === "object" &&
        error !== null &&
        error.stack
    ) {
        var stacks = [];
        for (var p = promise; !!p; p = p.source) {
            if (p.stack && (!error.__minimumStackCounter__ || error.__minimumStackCounter__ > p.stackCounter)) {
                object_defineProperty(error, "__minimumStackCounter__", {value: p.stackCounter, configurable: true});
                stacks.unshift(p.stack);
            }
        }
        stacks.unshift(error.stack);

        var concatedStacks = stacks.join("\n" + STACK_JUMP_SEPARATOR + "\n");
        var stack = filterStackString(concatedStacks);
        object_defineProperty(error, "stack", {value: stack, configurable: true});
    }
}

function filterStackString(stackString) {
    var lines = stackString.split("\n");
    var desiredLines = [];
    for (var i = 0; i < lines.length; ++i) {
        var line = lines[i];

        if (!isInternalFrame(line) && !isNodeFrame(line) && line) {
            desiredLines.push(line);
        }
    }
    return desiredLines.join("\n");
}

function isNodeFrame(stackLine) {
    return stackLine.indexOf("(module.js:") !== -1 ||
           stackLine.indexOf("(node.js:") !== -1;
}

function getFileNameAndLineNumber(stackLine) {
    // Named functions: "at functionName (filename:lineNumber:columnNumber)"
    // In IE10 function name can have spaces ("Anonymous function") O_o
    var attempt1 = /at .+ \((.+):(\d+):(?:\d+)\)$/.exec(stackLine);
    if (attempt1) {
        return [attempt1[1], Number(attempt1[2])];
    }

    // Anonymous functions: "at filename:lineNumber:columnNumber"
    var attempt2 = /at ([^ ]+):(\d+):(?:\d+)$/.exec(stackLine);
    if (attempt2) {
        return [attempt2[1], Number(attempt2[2])];
    }

    // Firefox style: "function@filename:lineNumber or @filename:lineNumber"
    var attempt3 = /.*@(.+):(\d+)$/.exec(stackLine);
    if (attempt3) {
        return [attempt3[1], Number(attempt3[2])];
    }
}

function isInternalFrame(stackLine) {
    var fileNameAndLineNumber = getFileNameAndLineNumber(stackLine);

    if (!fileNameAndLineNumber) {
        return false;
    }

    var fileName = fileNameAndLineNumber[0];
    var lineNumber = fileNameAndLineNumber[1];

    return fileName === qFileName &&
        lineNumber >= qStartingLine &&
        lineNumber <= qEndingLine;
}

// discover own file name and line number range for filtering stack
// traces
function captureLine() {
    if (!hasStacks) {
        return;
    }

    try {
        throw new Error();
    } catch (e) {
        var lines = e.stack.split("\n");
        var firstLine = lines[0].indexOf("@") > 0 ? lines[1] : lines[2];
        var fileNameAndLineNumber = getFileNameAndLineNumber(firstLine);
        if (!fileNameAndLineNumber) {
            return;
        }

        qFileName = fileNameAndLineNumber[0];
        return fileNameAndLineNumber[1];
    }
}

function deprecate(callback, name, alternative) {
    return function () {
        if (typeof console !== "undefined" &&
            typeof console.warn === "function") {
            console.warn(name + " is deprecated, use " + alternative +
                         " instead.", new Error("").stack);
        }
        return callback.apply(callback, arguments);
    };
}

// end of shims
// beginning of real work

/**
 * Constructs a promise for an immediate reference, passes promises through, or
 * coerces promises from different systems.
 * @param value immediate reference or promise
 */
function Q(value) {
    // If the object is already a Promise, return it directly.  This enables
    // the resolve function to both be used to created references from objects,
    // but to tolerably coerce non-promises to promises.
    if (value instanceof Promise) {
        return value;
    }

    // assimilate thenables
    if (isPromiseAlike(value)) {
        return coerce(value);
    } else {
        return fulfill(value);
    }
}
Q.resolve = Q;

/**
 * Performs a task in a future turn of the event loop.
 * @param {Function} task
 */
Q.nextTick = nextTick;

/**
 * Controls whether or not long stack traces will be on
 */
Q.longStackSupport = false;

/**
 * The counter is used to determine the stopping point for building
 * long stack traces. In makeStackTraceLong we walk backwards through
 * the linked list of promises, only stacks which were created before
 * the rejection are concatenated.
 */
var longStackCounter = 1;

// enable long stacks if Q_DEBUG is set
if (typeof process === "object" && process && process.env && process.env.Q_DEBUG) {
    Q.longStackSupport = true;
}

/**
 * Constructs a {promise, resolve, reject} object.
 *
 * `resolve` is a callback to invoke with a more resolved value for the
 * promise. To fulfill the promise, invoke `resolve` with any value that is
 * not a thenable. To reject the promise, invoke `resolve` with a rejected
 * thenable, or invoke `reject` with the reason directly. To resolve the
 * promise to another thenable, thus putting it in the same state, invoke
 * `resolve` with that other thenable.
 */
Q.defer = defer;
function defer() {
    // if "messages" is an "Array", that indicates that the promise has not yet
    // been resolved.  If it is "undefined", it has been resolved.  Each
    // element of the messages array is itself an array of complete arguments to
    // forward to the resolved promise.  We coerce the resolution value to a
    // promise using the `resolve` function because it handles both fully
    // non-thenable values and other thenables gracefully.
    var messages = [], progressListeners = [], resolvedPromise;

    var deferred = object_create(defer.prototype);
    var promise = object_create(Promise.prototype);

    promise.promiseDispatch = function (resolve, op, operands) {
        var args = array_slice(arguments);
        if (messages) {
            messages.push(args);
            if (op === "when" && operands[1]) { // progress operand
                progressListeners.push(operands[1]);
            }
        } else {
            Q.nextTick(function () {
                resolvedPromise.promiseDispatch.apply(resolvedPromise, args);
            });
        }
    };

    // XXX deprecated
    promise.valueOf = function () {
        if (messages) {
            return promise;
        }
        var nearerValue = nearer(resolvedPromise);
        if (isPromise(nearerValue)) {
            resolvedPromise = nearerValue; // shorten chain
        }
        return nearerValue;
    };

    promise.inspect = function () {
        if (!resolvedPromise) {
            return { state: "pending" };
        }
        return resolvedPromise.inspect();
    };

    if (Q.longStackSupport && hasStacks) {
        try {
            throw new Error();
        } catch (e) {
            // NOTE: don't try to use `Error.captureStackTrace` or transfer the
            // accessor around; that causes memory leaks as per GH-111. Just
            // reify the stack trace as a string ASAP.
            //
            // At the same time, cut off the first line; it's always just
            // "[object Promise]\n", as per the `toString`.
            promise.stack = e.stack.substring(e.stack.indexOf("\n") + 1);
            promise.stackCounter = longStackCounter++;
        }
    }

    // NOTE: we do the checks for `resolvedPromise` in each method, instead of
    // consolidating them into `become`, since otherwise we'd create new
    // promises with the lines `become(whatever(value))`. See e.g. GH-252.

    function become(newPromise) {
        resolvedPromise = newPromise;

        if (Q.longStackSupport && hasStacks) {
            // Only hold a reference to the new promise if long stacks
            // are enabled to reduce memory usage
            promise.source = newPromise;
        }

        array_reduce(messages, function (undefined, message) {
            Q.nextTick(function () {
                newPromise.promiseDispatch.apply(newPromise, message);
            });
        }, void 0);

        messages = void 0;
        progressListeners = void 0;
    }

    deferred.promise = promise;
    deferred.resolve = function (value) {
        if (resolvedPromise) {
            return;
        }

        become(Q(value));
    };

    deferred.fulfill = function (value) {
        if (resolvedPromise) {
            return;
        }

        become(fulfill(value));
    };
    deferred.reject = function (reason) {
        if (resolvedPromise) {
            return;
        }

        become(reject(reason));
    };
    deferred.notify = function (progress) {
        if (resolvedPromise) {
            return;
        }

        array_reduce(progressListeners, function (undefined, progressListener) {
            Q.nextTick(function () {
                progressListener(progress);
            });
        }, void 0);
    };

    return deferred;
}

/**
 * Creates a Node-style callback that will resolve or reject the deferred
 * promise.
 * @returns a nodeback
 */
defer.prototype.makeNodeResolver = function () {
    var self = this;
    return function (error, value) {
        if (error) {
            self.reject(error);
        } else if (arguments.length > 2) {
            self.resolve(array_slice(arguments, 1));
        } else {
            self.resolve(value);
        }
    };
};

/**
 * @param resolver {Function} a function that returns nothing and accepts
 * the resolve, reject, and notify functions for a deferred.
 * @returns a promise that may be resolved with the given resolve and reject
 * functions, or rejected by a thrown exception in resolver
 */
Q.Promise = promise; // ES6
Q.promise = promise;
function promise(resolver) {
    if (typeof resolver !== "function") {
        throw new TypeError("resolver must be a function.");
    }
    var deferred = defer();
    try {
        resolver(deferred.resolve, deferred.reject, deferred.notify);
    } catch (reason) {
        deferred.reject(reason);
    }
    return deferred.promise;
}

promise.race = race; // ES6
promise.all = all; // ES6
promise.reject = reject; // ES6
promise.resolve = Q; // ES6

// XXX experimental.  This method is a way to denote that a local value is
// serializable and should be immediately dispatched to a remote upon request,
// instead of passing a reference.
Q.passByCopy = function (object) {
    //freeze(object);
    //passByCopies.set(object, true);
    return object;
};

Promise.prototype.passByCopy = function () {
    //freeze(object);
    //passByCopies.set(object, true);
    return this;
};

/**
 * If two promises eventually fulfill to the same value, promises that value,
 * but otherwise rejects.
 * @param x {Any*}
 * @param y {Any*}
 * @returns {Any*} a promise for x and y if they are the same, but a rejection
 * otherwise.
 *
 */
Q.join = function (x, y) {
    return Q(x).join(y);
};

Promise.prototype.join = function (that) {
    return Q([this, that]).spread(function (x, y) {
        if (x === y) {
            // TODO: "===" should be Object.is or equiv
            return x;
        } else {
            throw new Error("Q can't join: not the same: " + x + " " + y);
        }
    });
};

/**
 * Returns a promise for the first of an array of promises to become settled.
 * @param answers {Array[Any*]} promises to race
 * @returns {Any*} the first promise to be settled
 */
Q.race = race;
function race(answerPs) {
    return promise(function (resolve, reject) {
        // Switch to this once we can assume at least ES5
        // answerPs.forEach(function (answerP) {
        //     Q(answerP).then(resolve, reject);
        // });
        // Use this in the meantime
        for (var i = 0, len = answerPs.length; i < len; i++) {
            Q(answerPs[i]).then(resolve, reject);
        }
    });
}

Promise.prototype.race = function () {
    return this.then(Q.race);
};

/**
 * Constructs a Promise with a promise descriptor object and optional fallback
 * function.  The descriptor contains methods like when(rejected), get(name),
 * set(name, value), post(name, args), and delete(name), which all
 * return either a value, a promise for a value, or a rejection.  The fallback
 * accepts the operation name, a resolver, and any further arguments that would
 * have been forwarded to the appropriate method above had a method been
 * provided with the proper name.  The API makes no guarantees about the nature
 * of the returned object, apart from that it is usable whereever promises are
 * bought and sold.
 */
Q.makePromise = Promise;
function Promise(descriptor, fallback, inspect) {
    if (fallback === void 0) {
        fallback = function (op) {
            return reject(new Error(
                "Promise does not support operation: " + op
            ));
        };
    }
    if (inspect === void 0) {
        inspect = function () {
            return {state: "unknown"};
        };
    }

    var promise = object_create(Promise.prototype);

    promise.promiseDispatch = function (resolve, op, args) {
        var result;
        try {
            if (descriptor[op]) {
                result = descriptor[op].apply(promise, args);
            } else {
                result = fallback.call(promise, op, args);
            }
        } catch (exception) {
            result = reject(exception);
        }
        if (resolve) {
            resolve(result);
        }
    };

    promise.inspect = inspect;

    // XXX deprecated `valueOf` and `exception` support
    if (inspect) {
        var inspected = inspect();
        if (inspected.state === "rejected") {
            promise.exception = inspected.reason;
        }

        promise.valueOf = function () {
            var inspected = inspect();
            if (inspected.state === "pending" ||
                inspected.state === "rejected") {
                return promise;
            }
            return inspected.value;
        };
    }

    return promise;
}

Promise.prototype.toString = function () {
    return "[object Promise]";
};

Promise.prototype.then = function (fulfilled, rejected, progressed) {
    var self = this;
    var deferred = defer();
    var done = false;   // ensure the untrusted promise makes at most a
                        // single call to one of the callbacks

    function _fulfilled(value) {
        try {
            return typeof fulfilled === "function" ? fulfilled(value) : value;
        } catch (exception) {
            return reject(exception);
        }
    }

    function _rejected(exception) {
        if (typeof rejected === "function") {
            makeStackTraceLong(exception, self);
            try {
                return rejected(exception);
            } catch (newException) {
                return reject(newException);
            }
        }
        return reject(exception);
    }

    function _progressed(value) {
        return typeof progressed === "function" ? progressed(value) : value;
    }

    Q.nextTick(function () {
        self.promiseDispatch(function (value) {
            if (done) {
                return;
            }
            done = true;

            deferred.resolve(_fulfilled(value));
        }, "when", [function (exception) {
            if (done) {
                return;
            }
            done = true;

            deferred.resolve(_rejected(exception));
        }]);
    });

    // Progress propagator need to be attached in the current tick.
    self.promiseDispatch(void 0, "when", [void 0, function (value) {
        var newValue;
        var threw = false;
        try {
            newValue = _progressed(value);
        } catch (e) {
            threw = true;
            if (Q.onerror) {
                Q.onerror(e);
            } else {
                throw e;
            }
        }

        if (!threw) {
            deferred.notify(newValue);
        }
    }]);

    return deferred.promise;
};

Q.tap = function (promise, callback) {
    return Q(promise).tap(callback);
};

/**
 * Works almost like "finally", but not called for rejections.
 * Original resolution value is passed through callback unaffected.
 * Callback may return a promise that will be awaited for.
 * @param {Function} callback
 * @returns {Q.Promise}
 * @example
 * doSomething()
 *   .then(...)
 *   .tap(console.log)
 *   .then(...);
 */
Promise.prototype.tap = function (callback) {
    callback = Q(callback);

    return this.then(function (value) {
        return callback.fcall(value).thenResolve(value);
    });
};

/**
 * Registers an observer on a promise.
 *
 * Guarantees:
 *
 * 1. that fulfilled and rejected will be called only once.
 * 2. that either the fulfilled callback or the rejected callback will be
 *    called, but not both.
 * 3. that fulfilled and rejected will not be called in this turn.
 *
 * @param value      promise or immediate reference to observe
 * @param fulfilled  function to be called with the fulfilled value
 * @param rejected   function to be called with the rejection exception
 * @param progressed function to be called on any progress notifications
 * @return promise for the return value from the invoked callback
 */
Q.when = when;
function when(value, fulfilled, rejected, progressed) {
    return Q(value).then(fulfilled, rejected, progressed);
}

Promise.prototype.thenResolve = function (value) {
    return this.then(function () { return value; });
};

Q.thenResolve = function (promise, value) {
    return Q(promise).thenResolve(value);
};

Promise.prototype.thenReject = function (reason) {
    return this.then(function () { throw reason; });
};

Q.thenReject = function (promise, reason) {
    return Q(promise).thenReject(reason);
};

/**
 * If an object is not a promise, it is as "near" as possible.
 * If a promise is rejected, it is as "near" as possible too.
 * If it’s a fulfilled promise, the fulfillment value is nearer.
 * If it’s a deferred promise and the deferred has been resolved, the
 * resolution is "nearer".
 * @param object
 * @returns most resolved (nearest) form of the object
 */

// XXX should we re-do this?
Q.nearer = nearer;
function nearer(value) {
    if (isPromise(value)) {
        var inspected = value.inspect();
        if (inspected.state === "fulfilled") {
            return inspected.value;
        }
    }
    return value;
}

/**
 * @returns whether the given object is a promise.
 * Otherwise it is a fulfilled value.
 */
Q.isPromise = isPromise;
function isPromise(object) {
    return object instanceof Promise;
}

Q.isPromiseAlike = isPromiseAlike;
function isPromiseAlike(object) {
    return isObject(object) && typeof object.then === "function";
}

/**
 * @returns whether the given object is a pending promise, meaning not
 * fulfilled or rejected.
 */
Q.isPending = isPending;
function isPending(object) {
    return isPromise(object) && object.inspect().state === "pending";
}

Promise.prototype.isPending = function () {
    return this.inspect().state === "pending";
};

/**
 * @returns whether the given object is a value or fulfilled
 * promise.
 */
Q.isFulfilled = isFulfilled;
function isFulfilled(object) {
    return !isPromise(object) || object.inspect().state === "fulfilled";
}

Promise.prototype.isFulfilled = function () {
    return this.inspect().state === "fulfilled";
};

/**
 * @returns whether the given object is a rejected promise.
 */
Q.isRejected = isRejected;
function isRejected(object) {
    return isPromise(object) && object.inspect().state === "rejected";
}

Promise.prototype.isRejected = function () {
    return this.inspect().state === "rejected";
};

//// BEGIN UNHANDLED REJECTION TRACKING

// This promise library consumes exceptions thrown in handlers so they can be
// handled by a subsequent promise.  The exceptions get added to this array when
// they are created, and removed when they are handled.  Note that in ES6 or
// shimmed environments, this would naturally be a `Set`.
var unhandledReasons = [];
var unhandledRejections = [];
var reportedUnhandledRejections = [];
var trackUnhandledRejections = true;

function resetUnhandledRejections() {
    unhandledReasons.length = 0;
    unhandledRejections.length = 0;

    if (!trackUnhandledRejections) {
        trackUnhandledRejections = true;
    }
}

function trackRejection(promise, reason) {
    if (!trackUnhandledRejections) {
        return;
    }
    if (typeof process === "object" && typeof process.emit === "function") {
        Q.nextTick.runAfter(function () {
            if (array_indexOf(unhandledRejections, promise) !== -1) {
                process.emit("unhandledRejection", reason, promise);
                reportedUnhandledRejections.push(promise);
            }
        });
    }

    unhandledRejections.push(promise);
    if (reason && typeof reason.stack !== "undefined") {
        unhandledReasons.push(reason.stack);
    } else {
        unhandledReasons.push("(no stack) " + reason);
    }
}

function untrackRejection(promise) {
    if (!trackUnhandledRejections) {
        return;
    }

    var at = array_indexOf(unhandledRejections, promise);
    if (at !== -1) {
        if (typeof process === "object" && typeof process.emit === "function") {
            Q.nextTick.runAfter(function () {
                var atReport = array_indexOf(reportedUnhandledRejections, promise);
                if (atReport !== -1) {
                    process.emit("rejectionHandled", unhandledReasons[at], promise);
                    reportedUnhandledRejections.splice(atReport, 1);
                }
            });
        }
        unhandledRejections.splice(at, 1);
        unhandledReasons.splice(at, 1);
    }
}

Q.resetUnhandledRejections = resetUnhandledRejections;

Q.getUnhandledReasons = function () {
    // Make a copy so that consumers can't interfere with our internal state.
    return unhandledReasons.slice();
};

Q.stopUnhandledRejectionTracking = function () {
    resetUnhandledRejections();
    trackUnhandledRejections = false;
};

resetUnhandledRejections();

//// END UNHANDLED REJECTION TRACKING

/**
 * Constructs a rejected promise.
 * @param reason value describing the failure
 */
Q.reject = reject;
function reject(reason) {
    var rejection = Promise({
        "when": function (rejected) {
            // note that the error has been handled
            if (rejected) {
                untrackRejection(this);
            }
            return rejected ? rejected(reason) : this;
        }
    }, function fallback() {
        return this;
    }, function inspect() {
        return { state: "rejected", reason: reason };
    });

    // Note that the reason has not been handled.
    trackRejection(rejection, reason);

    return rejection;
}

/**
 * Constructs a fulfilled promise for an immediate reference.
 * @param value immediate reference
 */
Q.fulfill = fulfill;
function fulfill(value) {
    return Promise({
        "when": function () {
            return value;
        },
        "get": function (name) {
            return value[name];
        },
        "set": function (name, rhs) {
            value[name] = rhs;
        },
        "delete": function (name) {
            delete value[name];
        },
        "post": function (name, args) {
            // Mark Miller proposes that post with no name should apply a
            // promised function.
            if (name === null || name === void 0) {
                return value.apply(void 0, args);
            } else {
                return value[name].apply(value, args);
            }
        },
        "apply": function (thisp, args) {
            return value.apply(thisp, args);
        },
        "keys": function () {
            return object_keys(value);
        }
    }, void 0, function inspect() {
        return { state: "fulfilled", value: value };
    });
}

/**
 * Converts thenables to Q promises.
 * @param promise thenable promise
 * @returns a Q promise
 */
function coerce(promise) {
    var deferred = defer();
    Q.nextTick(function () {
        try {
            promise.then(deferred.resolve, deferred.reject, deferred.notify);
        } catch (exception) {
            deferred.reject(exception);
        }
    });
    return deferred.promise;
}

/**
 * Annotates an object such that it will never be
 * transferred away from this process over any promise
 * communication channel.
 * @param object
 * @returns promise a wrapping of that object that
 * additionally responds to the "isDef" message
 * without a rejection.
 */
Q.master = master;
function master(object) {
    return Promise({
        "isDef": function () {}
    }, function fallback(op, args) {
        return dispatch(object, op, args);
    }, function () {
        return Q(object).inspect();
    });
}

/**
 * Spreads the values of a promised array of arguments into the
 * fulfillment callback.
 * @param fulfilled callback that receives variadic arguments from the
 * promised array
 * @param rejected callback that receives the exception if the promise
 * is rejected.
 * @returns a promise for the return value or thrown exception of
 * either callback.
 */
Q.spread = spread;
function spread(value, fulfilled, rejected) {
    return Q(value).spread(fulfilled, rejected);
}

Promise.prototype.spread = function (fulfilled, rejected) {
    return this.all().then(function (array) {
        return fulfilled.apply(void 0, array);
    }, rejected);
};

/**
 * The async function is a decorator for generator functions, turning
 * them into asynchronous generators.  Although generators are only part
 * of the newest ECMAScript 6 drafts, this code does not cause syntax
 * errors in older engines.  This code should continue to work and will
 * in fact improve over time as the language improves.
 *
 * ES6 generators are currently part of V8 version 3.19 with the
 * --harmony-generators runtime flag enabled.  SpiderMonkey has had them
 * for longer, but under an older Python-inspired form.  This function
 * works on both kinds of generators.
 *
 * Decorates a generator function such that:
 *  - it may yield promises
 *  - execution will continue when that promise is fulfilled
 *  - the value of the yield expression will be the fulfilled value
 *  - it returns a promise for the return value (when the generator
 *    stops iterating)
 *  - the decorated function returns a promise for the return value
 *    of the generator or the first rejected promise among those
 *    yielded.
 *  - if an error is thrown in the generator, it propagates through
 *    every following yield until it is caught, or until it escapes
 *    the generator function altogether, and is translated into a
 *    rejection for the promise returned by the decorated generator.
 */
Q.async = async;
function async(makeGenerator) {
    return function () {
        // when verb is "send", arg is a value
        // when verb is "throw", arg is an exception
        function continuer(verb, arg) {
            var result;

            // Until V8 3.19 / Chromium 29 is released, SpiderMonkey is the only
            // engine that has a deployed base of browsers that support generators.
            // However, SM's generators use the Python-inspired semantics of
            // outdated ES6 drafts.  We would like to support ES6, but we'd also
            // like to make it possible to use generators in deployed browsers, so
            // we also support Python-style generators.  At some point we can remove
            // this block.

            if (typeof StopIteration === "undefined") {
                // ES6 Generators
                try {
                    result = generator[verb](arg);
                } catch (exception) {
                    return reject(exception);
                }
                if (result.done) {
                    return Q(result.value);
                } else {
                    return when(result.value, callback, errback);
                }
            } else {
                // SpiderMonkey Generators
                // FIXME: Remove this case when SM does ES6 generators.
                try {
                    result = generator[verb](arg);
                } catch (exception) {
                    if (isStopIteration(exception)) {
                        return Q(exception.value);
                    } else {
                        return reject(exception);
                    }
                }
                return when(result, callback, errback);
            }
        }
        var generator = makeGenerator.apply(this, arguments);
        var callback = continuer.bind(continuer, "next");
        var errback = continuer.bind(continuer, "throw");
        return callback();
    };
}

/**
 * The spawn function is a small wrapper around async that immediately
 * calls the generator and also ends the promise chain, so that any
 * unhandled errors are thrown instead of forwarded to the error
 * handler. This is useful because it's extremely common to run
 * generators at the top-level to work with libraries.
 */
Q.spawn = spawn;
function spawn(makeGenerator) {
    Q.done(Q.async(makeGenerator)());
}

// FIXME: Remove this interface once ES6 generators are in SpiderMonkey.
/**
 * Throws a ReturnValue exception to stop an asynchronous generator.
 *
 * This interface is a stop-gap measure to support generator return
 * values in older Firefox/SpiderMonkey.  In browsers that support ES6
 * generators like Chromium 29, just use "return" in your generator
 * functions.
 *
 * @param value the return value for the surrounding generator
 * @throws ReturnValue exception with the value.
 * @example
 * // ES6 style
 * Q.async(function* () {
 *      var foo = yield getFooPromise();
 *      var bar = yield getBarPromise();
 *      return foo + bar;
 * })
 * // Older SpiderMonkey style
 * Q.async(function () {
 *      var foo = yield getFooPromise();
 *      var bar = yield getBarPromise();
 *      Q.return(foo + bar);
 * })
 */
Q["return"] = _return;
function _return(value) {
    throw new QReturnValue(value);
}

/**
 * The promised function decorator ensures that any promise arguments
 * are settled and passed as values (`this` is also settled and passed
 * as a value).  It will also ensure that the result of a function is
 * always a promise.
 *
 * @example
 * var add = Q.promised(function (a, b) {
 *     return a + b;
 * });
 * add(Q(a), Q(B));
 *
 * @param {function} callback The function to decorate
 * @returns {function} a function that has been decorated.
 */
Q.promised = promised;
function promised(callback) {
    return function () {
        return spread([this, all(arguments)], function (self, args) {
            return callback.apply(self, args);
        });
    };
}

/**
 * sends a message to a value in a future turn
 * @param object* the recipient
 * @param op the name of the message operation, e.g., "when",
 * @param args further arguments to be forwarded to the operation
 * @returns result {Promise} a promise for the result of the operation
 */
Q.dispatch = dispatch;
function dispatch(object, op, args) {
    return Q(object).dispatch(op, args);
}

Promise.prototype.dispatch = function (op, args) {
    var self = this;
    var deferred = defer();
    Q.nextTick(function () {
        self.promiseDispatch(deferred.resolve, op, args);
    });
    return deferred.promise;
};

/**
 * Gets the value of a property in a future turn.
 * @param object    promise or immediate reference for target object
 * @param name      name of property to get
 * @return promise for the property value
 */
Q.get = function (object, key) {
    return Q(object).dispatch("get", [key]);
};

Promise.prototype.get = function (key) {
    return this.dispatch("get", [key]);
};

/**
 * Sets the value of a property in a future turn.
 * @param object    promise or immediate reference for object object
 * @param name      name of property to set
 * @param value     new value of property
 * @return promise for the return value
 */
Q.set = function (object, key, value) {
    return Q(object).dispatch("set", [key, value]);
};

Promise.prototype.set = function (key, value) {
    return this.dispatch("set", [key, value]);
};

/**
 * Deletes a property in a future turn.
 * @param object    promise or immediate reference for target object
 * @param name      name of property to delete
 * @return promise for the return value
 */
Q.del = // XXX legacy
Q["delete"] = function (object, key) {
    return Q(object).dispatch("delete", [key]);
};

Promise.prototype.del = // XXX legacy
Promise.prototype["delete"] = function (key) {
    return this.dispatch("delete", [key]);
};

/**
 * Invokes a method in a future turn.
 * @param object    promise or immediate reference for target object
 * @param name      name of method to invoke
 * @param value     a value to post, typically an array of
 *                  invocation arguments for promises that
 *                  are ultimately backed with `resolve` values,
 *                  as opposed to those backed with URLs
 *                  wherein the posted value can be any
 *                  JSON serializable object.
 * @return promise for the return value
 */
// bound locally because it is used by other methods
Q.mapply = // XXX As proposed by "Redsandro"
Q.post = function (object, name, args) {
    return Q(object).dispatch("post", [name, args]);
};

Promise.prototype.mapply = // XXX As proposed by "Redsandro"
Promise.prototype.post = function (name, args) {
    return this.dispatch("post", [name, args]);
};

/**
 * Invokes a method in a future turn.
 * @param object    promise or immediate reference for target object
 * @param name      name of method to invoke
 * @param ...args   array of invocation arguments
 * @return promise for the return value
 */
Q.send = // XXX Mark Miller's proposed parlance
Q.mcall = // XXX As proposed by "Redsandro"
Q.invoke = function (object, name /*...args*/) {
    return Q(object).dispatch("post", [name, array_slice(arguments, 2)]);
};

Promise.prototype.send = // XXX Mark Miller's proposed parlance
Promise.prototype.mcall = // XXX As proposed by "Redsandro"
Promise.prototype.invoke = function (name /*...args*/) {
    return this.dispatch("post", [name, array_slice(arguments, 1)]);
};

/**
 * Applies the promised function in a future turn.
 * @param object    promise or immediate reference for target function
 * @param args      array of application arguments
 */
Q.fapply = function (object, args) {
    return Q(object).dispatch("apply", [void 0, args]);
};

Promise.prototype.fapply = function (args) {
    return this.dispatch("apply", [void 0, args]);
};

/**
 * Calls the promised function in a future turn.
 * @param object    promise or immediate reference for target function
 * @param ...args   array of application arguments
 */
Q["try"] =
Q.fcall = function (object /* ...args*/) {
    return Q(object).dispatch("apply", [void 0, array_slice(arguments, 1)]);
};

Promise.prototype.fcall = function (/*...args*/) {
    return this.dispatch("apply", [void 0, array_slice(arguments)]);
};

/**
 * Binds the promised function, transforming return values into a fulfilled
 * promise and thrown errors into a rejected one.
 * @param object    promise or immediate reference for target function
 * @param ...args   array of application arguments
 */
Q.fbind = function (object /*...args*/) {
    var promise = Q(object);
    var args = array_slice(arguments, 1);
    return function fbound() {
        return promise.dispatch("apply", [
            this,
            args.concat(array_slice(arguments))
        ]);
    };
};
Promise.prototype.fbind = function (/*...args*/) {
    var promise = this;
    var args = array_slice(arguments);
    return function fbound() {
        return promise.dispatch("apply", [
            this,
            args.concat(array_slice(arguments))
        ]);
    };
};

/**
 * Requests the names of the owned properties of a promised
 * object in a future turn.
 * @param object    promise or immediate reference for target object
 * @return promise for the keys of the eventually settled object
 */
Q.keys = function (object) {
    return Q(object).dispatch("keys", []);
};

Promise.prototype.keys = function () {
    return this.dispatch("keys", []);
};

/**
 * Turns an array of promises into a promise for an array.  If any of
 * the promises gets rejected, the whole array is rejected immediately.
 * @param {Array*} an array (or promise for an array) of values (or
 * promises for values)
 * @returns a promise for an array of the corresponding values
 */
// By Mark Miller
// http://wiki.ecmascript.org/doku.php?id=strawman:concurrency&rev=1308776521#allfulfilled
Q.all = all;
function all(promises) {
    return when(promises, function (promises) {
        var pendingCount = 0;
        var deferred = defer();
        array_reduce(promises, function (undefined, promise, index) {
            var snapshot;
            if (
                isPromise(promise) &&
                (snapshot = promise.inspect()).state === "fulfilled"
            ) {
                promises[index] = snapshot.value;
            } else {
                ++pendingCount;
                when(
                    promise,
                    function (value) {
                        promises[index] = value;
                        if (--pendingCount === 0) {
                            deferred.resolve(promises);
                        }
                    },
                    deferred.reject,
                    function (progress) {
                        deferred.notify({ index: index, value: progress });
                    }
                );
            }
        }, void 0);
        if (pendingCount === 0) {
            deferred.resolve(promises);
        }
        return deferred.promise;
    });
}

Promise.prototype.all = function () {
    return all(this);
};

/**
 * Returns the first resolved promise of an array. Prior rejected promises are
 * ignored.  Rejects only if all promises are rejected.
 * @param {Array*} an array containing values or promises for values
 * @returns a promise fulfilled with the value of the first resolved promise,
 * or a rejected promise if all promises are rejected.
 */
Q.any = any;

function any(promises) {
    if (promises.length === 0) {
        return Q.resolve();
    }

    var deferred = Q.defer();
    var pendingCount = 0;
    array_reduce(promises, function (prev, current, index) {
        var promise = promises[index];

        pendingCount++;

        when(promise, onFulfilled, onRejected, onProgress);
        function onFulfilled(result) {
            deferred.resolve(result);
        }
        function onRejected(err) {
            pendingCount--;
            if (pendingCount === 0) {
                var rejection = err || new Error("" + err);

                rejection.message = ("Q can't get fulfillment value from any promise, all " +
                    "promises were rejected. Last error message: " + rejection.message);

                deferred.reject(rejection);
            }
        }
        function onProgress(progress) {
            deferred.notify({
                index: index,
                value: progress
            });
        }
    }, undefined);

    return deferred.promise;
}

Promise.prototype.any = function () {
    return any(this);
};

/**
 * Waits for all promises to be settled, either fulfilled or
 * rejected.  This is distinct from `all` since that would stop
 * waiting at the first rejection.  The promise returned by
 * `allResolved` will never be rejected.
 * @param promises a promise for an array (or an array) of promises
 * (or values)
 * @return a promise for an array of promises
 */
Q.allResolved = deprecate(allResolved, "allResolved", "allSettled");
function allResolved(promises) {
    return when(promises, function (promises) {
        promises = array_map(promises, Q);
        return when(all(array_map(promises, function (promise) {
            return when(promise, noop, noop);
        })), function () {
            return promises;
        });
    });
}

Promise.prototype.allResolved = function () {
    return allResolved(this);
};

/**
 * @see Promise#allSettled
 */
Q.allSettled = allSettled;
function allSettled(promises) {
    return Q(promises).allSettled();
}

/**
 * Turns an array of promises into a promise for an array of their states (as
 * returned by `inspect`) when they have all settled.
 * @param {Array[Any*]} values an array (or promise for an array) of values (or
 * promises for values)
 * @returns {Array[State]} an array of states for the respective values.
 */
Promise.prototype.allSettled = function () {
    return this.then(function (promises) {
        return all(array_map(promises, function (promise) {
            promise = Q(promise);
            function regardless() {
                return promise.inspect();
            }
            return promise.then(regardless, regardless);
        }));
    });
};

/**
 * Captures the failure of a promise, giving an oportunity to recover
 * with a callback.  If the given promise is fulfilled, the returned
 * promise is fulfilled.
 * @param {Any*} promise for something
 * @param {Function} callback to fulfill the returned promise if the
 * given promise is rejected
 * @returns a promise for the return value of the callback
 */
Q.fail = // XXX legacy
Q["catch"] = function (object, rejected) {
    return Q(object).then(void 0, rejected);
};

Promise.prototype.fail = // XXX legacy
Promise.prototype["catch"] = function (rejected) {
    return this.then(void 0, rejected);
};

/**
 * Attaches a listener that can respond to progress notifications from a
 * promise's originating deferred. This listener receives the exact arguments
 * passed to ``deferred.notify``.
 * @param {Any*} promise for something
 * @param {Function} callback to receive any progress notifications
 * @returns the given promise, unchanged
 */
Q.progress = progress;
function progress(object, progressed) {
    return Q(object).then(void 0, void 0, progressed);
}

Promise.prototype.progress = function (progressed) {
    return this.then(void 0, void 0, progressed);
};

/**
 * Provides an opportunity to observe the settling of a promise,
 * regardless of whether the promise is fulfilled or rejected.  Forwards
 * the resolution to the returned promise when the callback is done.
 * The callback can return a promise to defer completion.
 * @param {Any*} promise
 * @param {Function} callback to observe the resolution of the given
 * promise, takes no arguments.
 * @returns a promise for the resolution of the given promise when
 * ``fin`` is done.
 */
Q.fin = // XXX legacy
Q["finally"] = function (object, callback) {
    return Q(object)["finally"](callback);
};

Promise.prototype.fin = // XXX legacy
Promise.prototype["finally"] = function (callback) {
    if (!callback || typeof callback.apply !== "function") {
        throw new Error("Q can't apply finally callback");
    }
    callback = Q(callback);
    return this.then(function (value) {
        return callback.fcall().then(function () {
            return value;
        });
    }, function (reason) {
        // TODO attempt to recycle the rejection with "this".
        return callback.fcall().then(function () {
            throw reason;
        });
    });
};

/**
 * Terminates a chain of promises, forcing rejections to be
 * thrown as exceptions.
 * @param {Any*} promise at the end of a chain of promises
 * @returns nothing
 */
Q.done = function (object, fulfilled, rejected, progress) {
    return Q(object).done(fulfilled, rejected, progress);
};

Promise.prototype.done = function (fulfilled, rejected, progress) {
    var onUnhandledError = function (error) {
        // forward to a future turn so that ``when``
        // does not catch it and turn it into a rejection.
        Q.nextTick(function () {
            makeStackTraceLong(error, promise);
            if (Q.onerror) {
                Q.onerror(error);
            } else {
                throw error;
            }
        });
    };

    // Avoid unnecessary `nextTick`ing via an unnecessary `when`.
    var promise = fulfilled || rejected || progress ?
        this.then(fulfilled, rejected, progress) :
        this;

    if (typeof process === "object" && process && process.domain) {
        onUnhandledError = process.domain.bind(onUnhandledError);
    }

    promise.then(void 0, onUnhandledError);
};

/**
 * Causes a promise to be rejected if it does not get fulfilled before
 * some milliseconds time out.
 * @param {Any*} promise
 * @param {Number} milliseconds timeout
 * @param {Any*} custom error message or Error object (optional)
 * @returns a promise for the resolution of the given promise if it is
 * fulfilled before the timeout, otherwise rejected.
 */
Q.timeout = function (object, ms, error) {
    return Q(object).timeout(ms, error);
};

Promise.prototype.timeout = function (ms, error) {
    var deferred = defer();
    var timeoutId = setTimeout(function () {
        if (!error || "string" === typeof error) {
            error = new Error(error || "Timed out after " + ms + " ms");
            error.code = "ETIMEDOUT";
        }
        deferred.reject(error);
    }, ms);

    this.then(function (value) {
        clearTimeout(timeoutId);
        deferred.resolve(value);
    }, function (exception) {
        clearTimeout(timeoutId);
        deferred.reject(exception);
    }, deferred.notify);

    return deferred.promise;
};

/**
 * Returns a promise for the given value (or promised value), some
 * milliseconds after it resolved. Passes rejections immediately.
 * @param {Any*} promise
 * @param {Number} milliseconds
 * @returns a promise for the resolution of the given promise after milliseconds
 * time has elapsed since the resolution of the given promise.
 * If the given promise rejects, that is passed immediately.
 */
Q.delay = function (object, timeout) {
    if (timeout === void 0) {
        timeout = object;
        object = void 0;
    }
    return Q(object).delay(timeout);
};

Promise.prototype.delay = function (timeout) {
    return this.then(function (value) {
        var deferred = defer();
        setTimeout(function () {
            deferred.resolve(value);
        }, timeout);
        return deferred.promise;
    });
};

/**
 * Passes a continuation to a Node function, which is called with the given
 * arguments provided as an array, and returns a promise.
 *
 *      Q.nfapply(FS.readFile, [__filename])
 *      .then(function (content) {
 *      })
 *
 */
Q.nfapply = function (callback, args) {
    return Q(callback).nfapply(args);
};

Promise.prototype.nfapply = function (args) {
    var deferred = defer();
    var nodeArgs = array_slice(args);
    nodeArgs.push(deferred.makeNodeResolver());
    this.fapply(nodeArgs).fail(deferred.reject);
    return deferred.promise;
};

/**
 * Passes a continuation to a Node function, which is called with the given
 * arguments provided individually, and returns a promise.
 * @example
 * Q.nfcall(FS.readFile, __filename)
 * .then(function (content) {
 * })
 *
 */
Q.nfcall = function (callback /*...args*/) {
    var args = array_slice(arguments, 1);
    return Q(callback).nfapply(args);
};

Promise.prototype.nfcall = function (/*...args*/) {
    var nodeArgs = array_slice(arguments);
    var deferred = defer();
    nodeArgs.push(deferred.makeNodeResolver());
    this.fapply(nodeArgs).fail(deferred.reject);
    return deferred.promise;
};

/**
 * Wraps a NodeJS continuation passing function and returns an equivalent
 * version that returns a promise.
 * @example
 * Q.nfbind(FS.readFile, __filename)("utf-8")
 * .then(console.log)
 * .done()
 */
Q.nfbind =
Q.denodeify = function (callback /*...args*/) {
    if (callback === undefined) {
        throw new Error("Q can't wrap an undefined function");
    }
    var baseArgs = array_slice(arguments, 1);
    return function () {
        var nodeArgs = baseArgs.concat(array_slice(arguments));
        var deferred = defer();
        nodeArgs.push(deferred.makeNodeResolver());
        Q(callback).fapply(nodeArgs).fail(deferred.reject);
        return deferred.promise;
    };
};

Promise.prototype.nfbind =
Promise.prototype.denodeify = function (/*...args*/) {
    var args = array_slice(arguments);
    args.unshift(this);
    return Q.denodeify.apply(void 0, args);
};

Q.nbind = function (callback, thisp /*...args*/) {
    var baseArgs = array_slice(arguments, 2);
    return function () {
        var nodeArgs = baseArgs.concat(array_slice(arguments));
        var deferred = defer();
        nodeArgs.push(deferred.makeNodeResolver());
        function bound() {
            return callback.apply(thisp, arguments);
        }
        Q(bound).fapply(nodeArgs).fail(deferred.reject);
        return deferred.promise;
    };
};

Promise.prototype.nbind = function (/*thisp, ...args*/) {
    var args = array_slice(arguments, 0);
    args.unshift(this);
    return Q.nbind.apply(void 0, args);
};

/**
 * Calls a method of a Node-style object that accepts a Node-style
 * callback with a given array of arguments, plus a provided callback.
 * @param object an object that has the named method
 * @param {String} name name of the method of object
 * @param {Array} args arguments to pass to the method; the callback
 * will be provided by Q and appended to these arguments.
 * @returns a promise for the value or error
 */
Q.nmapply = // XXX As proposed by "Redsandro"
Q.npost = function (object, name, args) {
    return Q(object).npost(name, args);
};

Promise.prototype.nmapply = // XXX As proposed by "Redsandro"
Promise.prototype.npost = function (name, args) {
    var nodeArgs = array_slice(args || []);
    var deferred = defer();
    nodeArgs.push(deferred.makeNodeResolver());
    this.dispatch("post", [name, nodeArgs]).fail(deferred.reject);
    return deferred.promise;
};

/**
 * Calls a method of a Node-style object that accepts a Node-style
 * callback, forwarding the given variadic arguments, plus a provided
 * callback argument.
 * @param object an object that has the named method
 * @param {String} name name of the method of object
 * @param ...args arguments to pass to the method; the callback will
 * be provided by Q and appended to these arguments.
 * @returns a promise for the value or error
 */
Q.nsend = // XXX Based on Mark Miller's proposed "send"
Q.nmcall = // XXX Based on "Redsandro's" proposal
Q.ninvoke = function (object, name /*...args*/) {
    var nodeArgs = array_slice(arguments, 2);
    var deferred = defer();
    nodeArgs.push(deferred.makeNodeResolver());
    Q(object).dispatch("post", [name, nodeArgs]).fail(deferred.reject);
    return deferred.promise;
};

Promise.prototype.nsend = // XXX Based on Mark Miller's proposed "send"
Promise.prototype.nmcall = // XXX Based on "Redsandro's" proposal
Promise.prototype.ninvoke = function (name /*...args*/) {
    var nodeArgs = array_slice(arguments, 1);
    var deferred = defer();
    nodeArgs.push(deferred.makeNodeResolver());
    this.dispatch("post", [name, nodeArgs]).fail(deferred.reject);
    return deferred.promise;
};

/**
 * If a function would like to support both Node continuation-passing-style and
 * promise-returning-style, it can end its internal promise chain with
 * `nodeify(nodeback)`, forwarding the optional nodeback argument.  If the user
 * elects to use a nodeback, the result will be sent there.  If they do not
 * pass a nodeback, they will receive the result promise.
 * @param object a result (or a promise for a result)
 * @param {Function} nodeback a Node.js-style callback
 * @returns either the promise or nothing
 */
Q.nodeify = nodeify;
function nodeify(object, nodeback) {
    return Q(object).nodeify(nodeback);
}

Promise.prototype.nodeify = function (nodeback) {
    if (nodeback) {
        this.then(function (value) {
            Q.nextTick(function () {
                nodeback(null, value);
            });
        }, function (error) {
            Q.nextTick(function () {
                nodeback(error);
            });
        });
    } else {
        return this;
    }
};

Q.noConflict = function() {
    throw new Error("Q.noConflict only works when Q is used as a global");
};

// All code before this point will be filtered from stack traces.
var qEndingLine = captureLine();

return Q;

});

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../process/browser.js */ "./node_modules/process/browser.js"), __webpack_require__(/*! ./../node-libs-browser/node_modules/timers-browserify/main.js */ "./node_modules/node-libs-browser/node_modules/timers-browserify/main.js").setImmediate))

/***/ }),

/***/ "./node_modules/setimmediate/setImmediate.js":
/*!***************************************************!*\
  !*** ./node_modules/setimmediate/setImmediate.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global, process) {(function (global, undefined) {
    "use strict";

    if (global.setImmediate) {
        return;
    }

    var nextHandle = 1; // Spec says greater than zero
    var tasksByHandle = {};
    var currentlyRunningATask = false;
    var doc = global.document;
    var registerImmediate;

    function setImmediate(callback) {
      // Callback can either be a function or a string
      if (typeof callback !== "function") {
        callback = new Function("" + callback);
      }
      // Copy function arguments
      var args = new Array(arguments.length - 1);
      for (var i = 0; i < args.length; i++) {
          args[i] = arguments[i + 1];
      }
      // Store and register the task
      var task = { callback: callback, args: args };
      tasksByHandle[nextHandle] = task;
      registerImmediate(nextHandle);
      return nextHandle++;
    }

    function clearImmediate(handle) {
        delete tasksByHandle[handle];
    }

    function run(task) {
        var callback = task.callback;
        var args = task.args;
        switch (args.length) {
        case 0:
            callback();
            break;
        case 1:
            callback(args[0]);
            break;
        case 2:
            callback(args[0], args[1]);
            break;
        case 3:
            callback(args[0], args[1], args[2]);
            break;
        default:
            callback.apply(undefined, args);
            break;
        }
    }

    function runIfPresent(handle) {
        // From the spec: "Wait until any invocations of this algorithm started before this one have completed."
        // So if we're currently running a task, we'll need to delay this invocation.
        if (currentlyRunningATask) {
            // Delay by doing a setTimeout. setImmediate was tried instead, but in Firefox 7 it generated a
            // "too much recursion" error.
            setTimeout(runIfPresent, 0, handle);
        } else {
            var task = tasksByHandle[handle];
            if (task) {
                currentlyRunningATask = true;
                try {
                    run(task);
                } finally {
                    clearImmediate(handle);
                    currentlyRunningATask = false;
                }
            }
        }
    }

    function installNextTickImplementation() {
        registerImmediate = function(handle) {
            process.nextTick(function () { runIfPresent(handle); });
        };
    }

    function canUsePostMessage() {
        // The test against `importScripts` prevents this implementation from being installed inside a web worker,
        // where `global.postMessage` means something completely different and can't be used for this purpose.
        if (global.postMessage && !global.importScripts) {
            var postMessageIsAsynchronous = true;
            var oldOnMessage = global.onmessage;
            global.onmessage = function() {
                postMessageIsAsynchronous = false;
            };
            global.postMessage("", "*");
            global.onmessage = oldOnMessage;
            return postMessageIsAsynchronous;
        }
    }

    function installPostMessageImplementation() {
        // Installs an event handler on `global` for the `message` event: see
        // * https://developer.mozilla.org/en/DOM/window.postMessage
        // * http://www.whatwg.org/specs/web-apps/current-work/multipage/comms.html#crossDocumentMessages

        var messagePrefix = "setImmediate$" + Math.random() + "$";
        var onGlobalMessage = function(event) {
            if (event.source === global &&
                typeof event.data === "string" &&
                event.data.indexOf(messagePrefix) === 0) {
                runIfPresent(+event.data.slice(messagePrefix.length));
            }
        };

        if (global.addEventListener) {
            global.addEventListener("message", onGlobalMessage, false);
        } else {
            global.attachEvent("onmessage", onGlobalMessage);
        }

        registerImmediate = function(handle) {
            global.postMessage(messagePrefix + handle, "*");
        };
    }

    function installMessageChannelImplementation() {
        var channel = new MessageChannel();
        channel.port1.onmessage = function(event) {
            var handle = event.data;
            runIfPresent(handle);
        };

        registerImmediate = function(handle) {
            channel.port2.postMessage(handle);
        };
    }

    function installReadyStateChangeImplementation() {
        var html = doc.documentElement;
        registerImmediate = function(handle) {
            // Create a <script> element; its readystatechange event will be fired asynchronously once it is inserted
            // into the document. Do so, thus queuing up the task. Remember to clean up once it's been called.
            var script = doc.createElement("script");
            script.onreadystatechange = function () {
                runIfPresent(handle);
                script.onreadystatechange = null;
                html.removeChild(script);
                script = null;
            };
            html.appendChild(script);
        };
    }

    function installSetTimeoutImplementation() {
        registerImmediate = function(handle) {
            setTimeout(runIfPresent, 0, handle);
        };
    }

    // If supported, we should attach to the prototype of global, since that is where setTimeout et al. live.
    var attachTo = Object.getPrototypeOf && Object.getPrototypeOf(global);
    attachTo = attachTo && attachTo.setTimeout ? attachTo : global;

    // Don't get fooled by e.g. browserify environments.
    if ({}.toString.call(global.process) === "[object process]") {
        // For Node.js before 0.9
        installNextTickImplementation();

    } else if (canUsePostMessage()) {
        // For non-IE10 modern browsers
        installPostMessageImplementation();

    } else if (global.MessageChannel) {
        // For web workers, where supported
        installMessageChannelImplementation();

    } else if (doc && "onreadystatechange" in doc.createElement("script")) {
        // For IE 6–8
        installReadyStateChangeImplementation();

    } else {
        // For older browsers
        installSetTimeoutImplementation();
    }

    attachTo.setImmediate = setImmediate;
    attachTo.clearImmediate = clearImmediate;
}(typeof self === "undefined" ? typeof global === "undefined" ? this : global : self));

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js"), __webpack_require__(/*! ./../process/browser.js */ "./node_modules/process/browser.js")))

/***/ }),

/***/ "./node_modules/webpack/buildin/global.js":
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1, eval)("this");
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (_options) {
  options.locale = _options.locale;
  options.pattern = _options.pattern;
  options.alert = _options.alert;
  options.confirm = _options.confirm;
};

__webpack_require__(/*! ../tags/accordion/su-accordion.tag */ "./tags/accordion/su-accordion.tag");

__webpack_require__(/*! ../tags/accordion/su-accordionset.tag */ "./tags/accordion/su-accordionset.tag");

__webpack_require__(/*! ../tags/alert/su-alert.tag */ "./tags/alert/su-alert.tag");

__webpack_require__(/*! ../tags/checkbox/su-checkbox.tag */ "./tags/checkbox/su-checkbox.tag");

__webpack_require__(/*! ../tags/checkbox/su-checkbox-group.tag */ "./tags/checkbox/su-checkbox-group.tag");

__webpack_require__(/*! ../tags/confirm/su-confirm.tag */ "./tags/confirm/su-confirm.tag");

__webpack_require__(/*! ../tags/datepicker/su-datepicker.tag */ "./tags/datepicker/su-datepicker.tag");

__webpack_require__(/*! ../tags/dropdown/su-dropdown.tag */ "./tags/dropdown/su-dropdown.tag");

__webpack_require__(/*! ../tags/dropdown/su-select.tag */ "./tags/dropdown/su-select.tag");

__webpack_require__(/*! ../tags/modal/su-modal.tag */ "./tags/modal/su-modal.tag");

__webpack_require__(/*! ../tags/pagination/su-pagination.tag */ "./tags/pagination/su-pagination.tag");

__webpack_require__(/*! ../tags/popup/su-popup.tag */ "./tags/popup/su-popup.tag");

__webpack_require__(/*! ../tags/progress/su-progress.tag */ "./tags/progress/su-progress.tag");

__webpack_require__(/*! ../tags/radio/su-radio-group.tag */ "./tags/radio/su-radio-group.tag");

__webpack_require__(/*! ../tags/radio/su-radio.tag */ "./tags/radio/su-radio.tag");

__webpack_require__(/*! ../tags/rating/su-rating.tag */ "./tags/rating/su-rating.tag");

__webpack_require__(/*! ../tags/tab/su-tab-header.tag */ "./tags/tab/su-tab-header.tag");

__webpack_require__(/*! ../tags/tab/su-tab-title.tag */ "./tags/tab/su-tab-title.tag");

__webpack_require__(/*! ../tags/tab/su-tab.tag */ "./tags/tab/su-tab.tag");

__webpack_require__(/*! ../tags/tab/su-tabset.tag */ "./tags/tab/su-tabset.tag");

__webpack_require__(/*! ../tags/table/su-table.tag */ "./tags/table/su-table.tag");

__webpack_require__(/*! ../tags/table/su-th.tag */ "./tags/table/su-th.tag");

__webpack_require__(/*! ../tags/toast/su-toast.tag */ "./tags/toast/su-toast.tag");

__webpack_require__(/*! ../tags/toast/su-toast-item.tag */ "./tags/toast/su-toast-item.tag");

__webpack_require__(/*! ../tags/validation-error/su-validation-error.tag */ "./tags/validation-error/su-validation-error.tag");

var _q = __webpack_require__(/*! q */ "./node_modules/q/q.js");

var _q2 = _interopRequireDefault(_q);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var options = {};
var obs = riot.observable();

riot.mixin('semantic-ui', {
  defaultOptions: options,
  observable: obs,
  Q: {
    Promise: _q2.default.Promise
  }
});

/***/ }),

/***/ "./tags/accordion/su-accordion.tag":
/*!*****************************************!*\
  !*** ./tags/accordion/su-accordion.tag ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

riot.tag2('su-accordion', '<div class="title {active: active}" onclick="{click}"> <i class="dropdown icon"></i> {opts.title} </div> <div class="content active {open : active} {close : !active}"> <yield></yield> </div>', '', '', function(opts) {
'use strict';

var tag = this;
// ===================================================================================
//                                                                      Tag Properties
//                                                                      ==============
tag.active = false;

// ===================================================================================
//                                                                         Tag Methods
//                                                                         ===========
tag.click = click;

// ===================================================================================
//                                                                          Properties
//                                                                          ==========

// ===================================================================================
//                                                                             Methods
//                                                                             =======
function click() {
  tag.trigger('click', tag);
}
});

/***/ }),

/***/ "./tags/accordion/su-accordionset.tag":
/*!********************************************!*\
  !*** ./tags/accordion/su-accordionset.tag ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

riot.tag2('su-accordionset', '<yield></yield>', 'su-accordionset,[data-is="su-accordionset"]{ display: block; } su-accordionset.ui.accordion .title~.content:not(.ui).close,[data-is="su-accordionset"].ui.accordion .title~.content:not(.ui).close{ padding-top: 0; padding-bottom: 0; } su-accordionset .content.close *,[data-is="su-accordionset"] .content.close *{ line-height: 0 !important; opacity: 0 !important; visibility: hidden !important; padding-top: 0 !important; padding-bottom: 0 !important; margin-top: 0 !important; margin-bottom: 0 !important; min-height: 0 !important; transition: all 300ms 0s linear !important; } su-accordionset .content.close .dropdown.icon,[data-is="su-accordionset"] .content.close .dropdown.icon{ height: 0 !important; transition: height 300ms 0s linear !important; } su-accordionset .content.open *,[data-is="su-accordionset"] .content.open *{ line-height: 1.4285; opacity: 1; visibility: visible; transition: all 300ms 0s linear !important; } su-accordionset .content.open .dropdown.icon,[data-is="su-accordionset"] .content.open .dropdown.icon{ height: 1.4285 !important; transition: height 300ms 0s linear !important; }', 'class="ui accordion {opts.class}"', function(opts) {
'use strict';

var tag = this;
// ===================================================================================
//                                                                      Tag Properties
//                                                                      ==============
tag.accordions = [];

// ===================================================================================
//                                                                         Tag Methods
//                                                                         ===========
tag.on('mount', onMount);

// ===================================================================================
//                                                                          Properties
//                                                                          ==========

// ===================================================================================
//                                                                             Methods
//                                                                             =======
function onMount() {
  tag.accordions = tag.tags['su-accordion'];

  if (!Array.isArray(tag.accordions)) {
    tag.accordions = [tag.accordions];
  }
  var defaultActive = false;
  tag.accordions.forEach(function (accordion) {

    initializeChild(accordion);
    if (accordion.opts.active) {
      defaultActive = true;
      accordion.active = true;
    }
  });
  if (!defaultActive) {
    tag.accordions[0].active = true;
  }

  tag.update();
}

function initializeChild(child) {
  child.on('click', function (target) {
    var active = target.active;
    tag.accordions.forEach(function (accordion) {
      if (accordion.active) {
        accordion.active = false;
      }
    });
    target.active = !active;
    tag.update();
    tag.trigger('click', target);
  });
}
});

/***/ }),

/***/ "./tags/alert/su-alert.tag":
/*!*********************************!*\
  !*** ./tags/alert/su-alert.tag ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

riot.tag2('su-alert', '<su-modal class="tiny" ref="modal" modal="{modal}" title="{title}" messages="{messages}"> <div class="ui icon message"> <i class="info circle icon"></i> <div class="scrolling content"> <div class="header" if="{opts.title}"> {opts.title} </div> <p each="{message in opts.messages}">{message}</p> </div> </div> </su-modal>', 'su-alert .ui.dimmer,[data-is="su-alert"] .ui.dimmer{ z-index: 1020; } su-alert .ui.modal,[data-is="su-alert"] .ui.modal{ z-index: 1021; } su-alert .ui.message,[data-is="su-alert"] .ui.message{ background: none; box-shadow: none; } su-alert .ui.message .header+p,[data-is="su-alert"] .ui.message .header+p{ margin-top: 1em; }', '', function(opts) {
'use strict';

var tag = this;
// ===================================================================================
//                                                                      Tag Properties
//                                                                      ==============
tag.modal = {
  closable: false,
  buttons: []

  // ===================================================================================
  //                                                                         Tag Methods
  //                                                                         ===========
};tag.mixin('semantic-ui');
tag.observable.on('showAlert', showAlert);
tag.on('mount', onMount);

// ===================================================================================
//                                                                          Properties
//                                                                          ==========
var button = {};
riot.mixin({
  suAlert: suAlert
});

// ===================================================================================
//                                                                             Methods
//                                                                             =======
function onMount() {
  var defaultButton = {};
  if (tag.defaultOptions && tag.defaultOptions.alert && tag.defaultOptions.alert.button) {
    defaultButton = tag.defaultOptions.alert.button;
  }
  if (defaultButton.default) {
    button.default = true;
  }
  button.text = defaultButton.text || 'Close';
  button.type = defaultButton.type || '';
  button.icon = defaultButton.icon || '';

  tag.refs.modal.on('closeAction', function () {
    tag.observable.trigger('callbackConfirm');
  });
}

function setButton(option) {
  var btn = {
    text: option.button.text || button.text,
    type: option.button.type || button.type,
    icon: option.button.icon || button.icon,
    action: 'closeAction',
    closable: false
  };
  if (option.button.default) {
    btn.default = true;
  } else if (option.button.default === null) {
    btn.default = button.default;
  }

  tag.modal.buttons.length = 0;
  tag.modal.buttons.push(btn);
}

function showAlert(option) {
  tag.title = option.title;
  tag.messages = Array.isArray(option.message) ? option.message : [option.message];
  setButton(option);
  tag.update();
  tag.refs.modal.show();
}

function suAlert(param) {
  var option = {
    title: null,
    message: null,
    button: {
      text: null,
      default: null,
      type: null,
      icon: null
    }
  };

  if (typeof param === 'string') {
    option.message = param;
  } else if (param) {
    if (param.title) {
      option.title = param.title;
    }
    if (param.message) {
      option.message = param.message;
    }
    if (param.button) {
      option.button = param.button;
    }
  }

  return tag.Q.Promise(function (resolve) {
    tag.observable.trigger('showAlert', option);
    tag.observable.on('callbackConfirm', function () {
      tag.refs.modal.hide();
      return resolve();
    });
  });
}
});

/***/ }),

/***/ "./tags/checkbox/su-checkbox-group.tag":
/*!*********************************************!*\
  !*** ./tags/checkbox/su-checkbox-group.tag ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

riot.tag2('su-checkbox-group', '<yield></yield>', '', '', function(opts) {
'use strict';

var tag = this;
// ===================================================================================
//                                                                      Tag Properties
//                                                                      ==============
tag.label = '';
tag.value = '';
tag.defaultValue = '';

// ===================================================================================
//                                                                         Tag Methods
//                                                                         ===========
tag.changed = changed;
tag.on('mount', onMount);
tag.on('update', onUpdate);
tag.reset = reset;

// ===================================================================================
//                                                                          Properties
//                                                                          ==========
var lastValue = void 0;
var lastOptsValue = void 0;

// ===================================================================================
//                                                                             Methods
//                                                                             =======
function onMount() {
  if (typeof opts.riotValue === 'undefined' && typeof opts.value !== 'undefined') {
    opts.riotValue = opts.value;
  }
  if (tag.value) {
    opts.riotValue = tag.value;
  } else {
    tag.value = opts.riotValue;
  }
  if (typeof tag.value !== 'undefined' && !Array.isArray(tag.value)) {
    tag.value = tag.value.toString().split(/\s+/).join('').split(',');
  }
  lastValue = tag.value;
  lastOptsValue = tag.value;

  var checkboxes = tag.tags['su-checkbox'];
  if (!Array.isArray(checkboxes)) {
    checkboxes = [checkboxes];
  }
  checkboxes.forEach(function (checkbox) {
    initializeChild(checkbox);
    updateState(checkbox);
  });

  tag.defaultValue = tag.value;
  parentUpdate();
}

function onUpdate() {
  var changed = false;
  if (normalizeValue(lastValue) != normalizeValue(tag.value)) {
    opts.riotValue = tag.value;
    lastOptsValue = tag.value;
    lastValue = tag.value;
    changed = true;
  } else if (normalizeValue(lastOptsValue) != normalizeValue(opts.riotValue)) {
    tag.value = opts.riotValue;
    lastOptsValue = opts.riotValue;
    lastValue = opts.riotValue;
    changed = true;
  }
  if (typeof tag.value !== 'undefined' && !Array.isArray(tag.value)) {
    tag.value = tag.value.toString().split(/\s+/).join('').split(',');
  }

  if (changed) {
    var checkboxes = tag.tags['su-checkbox'];
    if (!Array.isArray(checkboxes)) {
      checkboxes = [checkboxes];
    }
    checkboxes.forEach(function (checkbox) {
      updateState(checkbox);
    });
    tag.trigger('change', tag.value);
  }
}

function reset() {
  tag.value = tag.defaultValue;
}

function changed() {
  return tag.value !== tag.defaultValue;
}

function updateState(checkbox) {
  if (typeof checkbox.opts.value === 'undefined' || typeof tag.value === 'undefined') {
    return;
  }
  checkbox.checked = tag.value.some(function (v) {
    return v == checkbox.opts.value;
  });
  if (checkbox.checked) {
    tag.label = checkbox.root.getElementsByTagName('label')[0].innerText;
  }
}

function initializeChild(checkbox) {
  checkbox.opts.name = getCheckboxName();
  checkbox.on('click', function () {
    var checkboxes = tag.tags['su-checkbox'];
    if (!Array.isArray(checkboxes)) {
      checkboxes = [checkboxes];
    }
    tag.value = checkboxes.filter(function (_checkbox) {
      return _checkbox.checked;
    }).map(function (_checkbox) {
      return _checkbox.opts.value;
    });
    tag.update();
  });
}

function parentUpdate() {
  if (tag.parent) {
    tag.parent.update();
  } else {
    tag.update();
  }
}

function normalizeValue(value) {
  if (typeof value === 'undefined') {
    return value;
  }
  if (!Array.isArray(value)) {
    return [value].toString();
  }
  return value.toString();
}

function getCheckboxName() {
  return 'su-checkbox-name-' + tag._riot_id;
}
});

/***/ }),

/***/ "./tags/checkbox/su-checkbox.tag":
/*!***************************************!*\
  !*** ./tags/checkbox/su-checkbox.tag ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

riot.tag2('su-checkbox', '<input type="checkbox" checked="{checked}" onclick="{click}" ref="target" disabled="{isDisabled()}" id="{getId()}"> <label if="{!opts.label}" for="{getId()}"><yield></yield></label> <label if="{opts.label}" for="{getId()}">{opts.label}</label>', 'su-checkbox.ui.checkbox label,[data-is="su-checkbox"].ui.checkbox label{ cursor: pointer; } su-checkbox.ui.read-only input[type="checkbox"],[data-is="su-checkbox"].ui.read-only input[type="checkbox"],su-checkbox.ui.disabled input[type="checkbox"],[data-is="su-checkbox"].ui.disabled input[type="checkbox"]{ cursor: default !important; }', 'class="ui checkbox {opts.class}"', function(opts) {
'use strict';

var tag = this;
// ===================================================================================
//                                                                      Tag Properties
//                                                                      ==============
tag.checked = false;
tag.defaultChecked = false;

// ===================================================================================
//                                                                         Tag Methods
//                                                                         ===========
tag.changed = changed;
tag.click = click;
tag.getId = getId;
tag.isDisabled = isDisabled;
tag.on('mount', onMount);
tag.on('update', onUpdate);
tag.reset = reset;

// ===================================================================================
//                                                                          Properties
//                                                                          ==========
var lastChecked = void 0;
var lastOptsChecked = void 0;
var shownMessage = false;

// ===================================================================================
//                                                                             Methods
//                                                                             =======
function onMount() {
  supportTraditionalOptions();
  if (tag.checked) {
    opts.checked = tag.checked;
  } else {
    tag.checked = normalizeOptChecked();
  }
  lastChecked = tag.checked;
  lastOptsChecked = tag.checked;
  tag.defaultChecked = tag.checked;
  tag.update();
}

function onUpdate() {
  supportTraditionalOptions();
  if (lastChecked != tag.checked) {
    opts.checked = tag.checked;
    lastChecked = tag.checked;
    lastOptsChecked = tag.checked;
    parentUpdate();
  } else if (lastOptsChecked != normalizeOptChecked()) {
    tag.checked = normalizeOptChecked();
    lastChecked = tag.checked;
    lastOptsChecked = tag.checked;
    parentUpdate();
  }
}

function reset() {
  tag.checked = tag.defaultChecked;
}

function changed() {
  return tag.checked !== tag.defaultChecked;
}

function click() {
  if (isReadOnly() || tag.isDisabled()) {
    event.preventDefault();
    return;
  }
  tag.checked = !tag.checked;
  parentUpdate();
  tag.trigger('click', tag.checked);
}

function getId() {
  return 'su-checkbox-' + tag._riot_id;
}

function isDisabled() {
  return tag.root.classList.contains('disabled');
}

function isReadOnly() {
  return tag.root.classList.contains('read-only');
}

function parentUpdate() {
  if (tag.parent) {
    tag.parent.update();
  }
}

function supportTraditionalOptions() {
  if (typeof opts.check !== 'undefined') {
    if (!shownMessage) {
      console.warn('\'check\' attribute is deprecated. Please use \'checked\'.');
    }
    shownMessage = true;
    opts.checked = opts.check;
    opts.check = undefined;
  }
}

function normalizeOptChecked() {
  return opts.checked === true || opts.checked === 'checked' || opts.checked === 'true';
}
});

/***/ }),

/***/ "./tags/confirm/su-confirm.tag":
/*!*************************************!*\
  !*** ./tags/confirm/su-confirm.tag ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports) {

riot.tag2('su-confirm', '<su-modal class="tiny" ref="modal" modal="{modal}" title="{title}" messages="{messages}"> <div class="ui icon message"> <i class="question circle outline icon"></i> <div class="scrolling content"> <div class="header" if="{opts.title}"> {opts.title} </div> <p each="{messsage in opts.messages}">{messsage}</p> </div> </div> </su-modal>', 'su-confirm .ui.dimmer,[data-is="su-confirm"] .ui.dimmer{ z-index: 1010; } su-confirm .ui.modal,[data-is="su-confirm"] .ui.modal{ z-index: 1011; } su-confirm .ui.message,[data-is="su-confirm"] .ui.message{ background: none; box-shadow: none; }', '', function(opts) {
'use strict';

var tag = this;
// ===================================================================================
//                                                                      Tag Properties
//                                                                      ==============
tag.modal = {
  closable: false,
  buttons: []

  // ===================================================================================
  //                                                                         Tag Methods
  //                                                                         ===========
};tag.mixin('semantic-ui');
tag.observable.on('showConfirm', showConfirm);
tag.on('mount', onMount);

// ===================================================================================
//                                                                          Properties
//                                                                          ==========
var reverse = false;
var cancelButton = {
  action: 'negativeAction'
};
var okButton = {
  action: 'positiveAction'
};
riot.mixin({
  suConfirm: suConfirm
});

// ===================================================================================
//                                                                             Methods
//                                                                             =======
function onMount() {
  var defaultOkButton = {};
  var defaultCancelButton = {};
  reverse = false;
  if (tag.defaultOptions && tag.defaultOptions.confirm) {
    if (tag.defaultOptions.confirm.reverse) {
      reverse = tag.defaultOptions.confirm.reverse;
    }
    if (tag.defaultOptions.confirm.buttons) {
      if (tag.defaultOptions.confirm.buttons.ok) {
        defaultOkButton = tag.defaultOptions.confirm.buttons.ok;
      }
      if (tag.defaultOptions.confirm.buttons.cancel) {
        defaultCancelButton = tag.defaultOptions.confirm.buttons.cancel;
      }
    }
  }

  okButton.text = defaultOkButton.text || 'OK';
  okButton.type = typeof defaultOkButton.type !== 'undefined' ? defaultOkButton.type : 'primary';
  okButton.icon = typeof defaultOkButton.icon !== 'undefined' ? defaultOkButton.icon : 'check';
  cancelButton.text = defaultCancelButton.text || 'Cancel';
  cancelButton.type = defaultCancelButton.type || '';
  cancelButton.icon = defaultCancelButton.icon || '';

  if (defaultOkButton.default) {
    okButton.default = true;
  } else if (defaultCancelButton.default) {
    cancelButton.default = true;
  } else if (typeof defaultOkButton.default === 'undefined' && typeof defaultOkButton.default === 'undefined') {
    okButton.default = true;
  }

  tag.refs.modal.on('positiveAction', function () {
    tag.observable.trigger('callbackConfirm', true);
  });
  tag.refs.modal.on('negativeAction', function () {
    tag.observable.trigger('callbackConfirm', false);
  });
}

function setButtons(option) {
  var cancel = {
    text: option.buttons.cancel.text || cancelButton.text,
    type: option.buttons.cancel.type !== null ? option.buttons.cancel.type : cancelButton.type,
    icon: option.buttons.cancel.icon !== null ? option.buttons.cancel.icon : cancelButton.icon,
    action: cancelButton.action
  };
  var ok = {
    text: option.buttons.ok.text || okButton.text,
    type: option.buttons.ok.type !== null ? option.buttons.ok.type : okButton.type,
    icon: option.buttons.ok.icon !== null ? option.buttons.ok.icon : okButton.icon,
    action: okButton.action
  };

  if (option.buttons.ok.default) {
    ok.default = true;
  } else if (option.buttons.cancel.default) {
    cancel.default = true;
  } else if (option.buttons.ok.default === null && option.buttons.cancel.default === null) {
    ok.default = okButton.default;
    cancel.default = cancelButton.default;
  }

  tag.modal.buttons.length = 0;
  tag.modal.buttons.push(option.reverse || reverse ? ok : cancel);
  tag.modal.buttons.push(option.reverse || reverse ? cancel : ok);
}

function showConfirm(option) {
  tag.title = option.title;
  tag.messages = Array.isArray(option.message) ? option.message : [option.message];
  setButtons(option);
  tag.update();
  tag.refs.modal.show();
}

function suConfirm(param) {
  var option = {
    title: null,
    message: null,
    reverse: null,
    buttons: {
      ok: {
        text: null,
        default: null,
        type: null,
        icon: null
      },
      cancel: {
        text: null,
        default: null,
        type: null,
        icon: null
      }
    }
  };
  if (typeof param === 'string') {
    option.message = param;
  } else if (param) {
    if (param.title) {
      option.title = param.title;
    }
    if (param.message) {
      option.message = param.message;
    }
    if (param.reverse) {
      option.reverse = param.reverse;
    }
    if (param.buttons) {
      if (param.buttons.ok) {
        option.buttons.ok = param.buttons.ok;
      }
      if (param.buttons.cancel) {
        option.buttons.cancel = param.buttons.cancel;
      }
    }
  }

  return tag.Q.Promise(function (resolve, reject) {
    tag.observable.trigger('showConfirm', option);
    tag.observable.on('callbackConfirm', function (result) {
      return result ? resolve() : reject();
    });
  });
}
});

/***/ }),

/***/ "./tags/datepicker/su-datepicker.tag":
/*!*******************************************!*\
  !*** ./tags/datepicker/su-datepicker.tag ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

riot.tag2('su-datepicker', '<div class="ui {dropdown:opts.popup} {upward: upward}"> <div class="ui action input {disabled: isDisabled()}" if="{opts.popup}"> <input type="text" placeholder="{opts.placeholder}" ref="input" tabindex="{getTabindex()}" readonly="{isReadOnly()}"> <button class="ui icon button {disabled: isDisabled()}" onclick="{toggle}" onblur="{blur}" type="button"> <i class="calendar icon"></i> </button> </div> <div class="menu transition {transitionStatus}" onmousedown="{mousedown}" onmouseup="{mouseup}" onblur="{blur}" tabindex="{getTabindex()}"> <div class="ui compact segments"> <div class="ui center aligned secondary segment"> <div class="ui buttons dp-navigation"> <button class="icon tiny ui button {disabled: isDisabled()} prev" onclick="{clickPrevious}" type="button"> <i class="chevron left icon"></i> </button> <button class="ui button {disabled: isDisabled()} month" onclick="{selectMonth}" type="button">{getCurrentMonthView()}</button> <button class="ui button {disabled: isDisabled()} year" onclick="{selectYear}" type="button">{getCurrentYear()}</button> <button class="icon tiny ui button {disabled: isDisabled()} next" onclick="{clickNext}" type="button"> <i class="chevron right icon"></i> </button> </div> <div class="dp-wrapper"> <div each="{week in getWeekNames()}" class="dp-weekday">{week}</div> </div> </div> <div class="ui center aligned segment" if="{!yearSelecting && !monthSelecting}"> <div each="{week in weeks}" class="dp-wrapper"> <div each="{day in week.days}" class="dp-day"> <button class="ui button {today: isToday(day)} {primary: isActive(day)} {non-active: !isActive(day)} {disabled: day.getMonth() != getCurrentMonth() || isDisabled()}" onclick="{clickDay}" type="button">{day.getDate()}</button> </div> </div> </div> <div class="ui center aligned segment" if="{!yearSelecting && !monthSelecting}"> <div class="ui two column grid"> <div class="column dp-clear"> <button class="ui icon fluid button {disabled : isDisabled()}" onclick="{clickClear}" type="button"><i class="times icon"></i></button> </div> <div class="column dp-today"> <button class="ui icon fluid button {disabled : isDisabled()}" onclick="{clickToday}" type="button"><i class="calendar check icon"></i></button> </div> </div> </div> <div class="ui center aligned segment" if="{monthSelecting}"> <div each="{element in months}" class="dp-wrapper"> <div each="{month in element}" class="dp-month"> <button class="ui button {disabled : isDisabled()}" onclick="{clickMonth}" type="button">{month.label}</button> </div> </div> </div> <div class="ui center aligned segment" if="{yearSelecting}"> <div each="{element in years}" class="dp-wrapper"> <div each="{year in element}" class="dp-month"> <button class="ui button {disabled : isDisabled()}" onclick="{clickYear}" type="button">{year}</button> </div> </div> </div> </div> </div> </div>', 'su-datepicker .ui.segment,[data-is="su-datepicker"] .ui.segment{ padding-top: 0.5rem; padding-bottom: 0.5rem; } su-datepicker .ui.dropdown .menu,[data-is="su-datepicker"] .ui.dropdown .menu{ display: block; } su-datepicker .ui.buttons.dp-navigation,[data-is="su-datepicker"] .ui.buttons.dp-navigation{ margin-bottom: 0.4rem; } su-datepicker .ui.dropdown,[data-is="su-datepicker"] .ui.dropdown{ display: block; } su-datepicker .dp-wrapper,[data-is="su-datepicker"] .dp-wrapper{ display: flex; } su-datepicker .dp-day,[data-is="su-datepicker"] .dp-day,su-datepicker .dp-month,[data-is="su-datepicker"] .dp-month{ cursor: pointer; } su-datepicker .dp-weekday,[data-is="su-datepicker"] .dp-weekday,su-datepicker .dp-day,[data-is="su-datepicker"] .dp-day,su-datepicker .dp-day .ui.button,[data-is="su-datepicker"] .dp-day .ui.button{ width: 2.5rem; } su-datepicker .dp-month,[data-is="su-datepicker"] .dp-month,su-datepicker .dp-month .ui.button,[data-is="su-datepicker"] .dp-month .ui.button{ width: 4.375rem; } su-datepicker .dp-day .ui.button,[data-is="su-datepicker"] .dp-day .ui.button,su-datepicker .dp-month .ui.button,[data-is="su-datepicker"] .dp-month .ui.button{ padding: 0; height: 2.5rem; font-weight: normal } su-datepicker .dp-day .ui.button.today,[data-is="su-datepicker"] .dp-day .ui.button.today{ font-weight: 700; } su-datepicker .dp-today .ui.button,[data-is="su-datepicker"] .dp-today .ui.button,su-datepicker .dp-clear .ui.button,[data-is="su-datepicker"] .dp-clear .ui.button,su-datepicker .dp-navigation .ui.button,[data-is="su-datepicker"] .dp-navigation .ui.button,su-datepicker .dp-month .ui.button,[data-is="su-datepicker"] .dp-month .ui.button,su-datepicker .dp-day .ui.button.non-active,[data-is="su-datepicker"] .dp-day .ui.button.non-active{ background-color: transparent; } su-datepicker .dp-today .ui.button:hover,[data-is="su-datepicker"] .dp-today .ui.button:hover,su-datepicker .dp-clear .ui.button:hover,[data-is="su-datepicker"] .dp-clear .ui.button:hover,su-datepicker .dp-navigation .ui.button:hover,[data-is="su-datepicker"] .dp-navigation .ui.button:hover,su-datepicker .dp-month .ui.button:hover,[data-is="su-datepicker"] .dp-month .ui.button:hover,su-datepicker .dp-day .ui.button.non-active:hover,[data-is="su-datepicker"] .dp-day .ui.button.non-active:hover{ background-color: #e0e1e2; } su-datepicker .dp-day .ui.button.disabled,[data-is="su-datepicker"] .dp-day .ui.button.disabled{ pointer-events: all !important; } su-datepicker .dp-navigation,[data-is="su-datepicker"] .dp-navigation{ width: 100%; } su-datepicker .dp-navigation .ui.button,[data-is="su-datepicker"] .dp-navigation .ui.button{ width: 20%; } su-datepicker .dp-navigation .ui.button.year,[data-is="su-datepicker"] .dp-navigation .ui.button.year,su-datepicker .dp-navigation .ui.button.month,[data-is="su-datepicker"] .dp-navigation .ui.button.month{ width: 30%; }', '', function(opts) {
'use strict';

var _add_days = __webpack_require__(/*! date-fns/add_days */ "date-fns/add_days");

var _add_days2 = _interopRequireDefault(_add_days);

var _add_months = __webpack_require__(/*! date-fns/add_months */ "date-fns/add_months");

var _add_months2 = _interopRequireDefault(_add_months);

var _format = __webpack_require__(/*! date-fns/format */ "date-fns/format");

var _format2 = _interopRequireDefault(_format);

var _is_same_day = __webpack_require__(/*! date-fns/is_same_day */ "date-fns/is_same_day");

var _is_same_day2 = _interopRequireDefault(_is_same_day);

var _is_today = __webpack_require__(/*! date-fns/is_today */ "date-fns/is_today");

var _is_today2 = _interopRequireDefault(_is_today);

var _parse = __webpack_require__(/*! date-fns/parse */ "date-fns/parse");

var _parse2 = _interopRequireDefault(_parse);

var _start_of_month = __webpack_require__(/*! date-fns/start_of_month */ "date-fns/start_of_month");

var _start_of_month2 = _interopRequireDefault(_start_of_month);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var tag = this;
// ===================================================================================
//                                                                      Tag Properties
//                                                                      ==============
tag.currentDate = null;
tag.defaultValue = null;
tag.transitionStatus = opts.popup ? 'hidden' : 'visible';
tag.value = null;
tag.valueAsDate = null;
tag.weeks = [];

// ===================================================================================
//                                                                         Tag Methods
//                                                                         ===========
tag.mixin('semantic-ui');
tag.on('mount', onMount);
tag.on('update', onUpdate);
tag.reset = reset;
tag.changed = changed;
tag.selectMonth = selectMonth;
tag.selectYear = selectYear;
tag.clickDay = clickDay;
tag.clickMonth = clickMonth;
tag.clickYear = clickYear;
tag.clickPrevious = clickPrevious;
tag.clickNext = clickNext;
tag.clickClear = clickClear;
tag.clickToday = clickToday;
tag.toggle = toggle;
tag.mousedown = mousedown;
tag.mouseup = mouseup;
tag.blur = blur;
tag.getCurrentYear = getCurrentYear;
tag.getCurrentMonthView = getCurrentMonthView;
tag.getCurrentMonth = getCurrentMonth;
tag.getWeekNames = getWeekNames;
tag.isActive = isActive;
tag.isToday = _is_today2.default;
tag.getTabindex = getTabindex;
tag.isReadOnly = isReadOnly;
tag.isDisabled = isDisabled;

// ===================================================================================
//                                                                          Properties
//                                                                          ==========
var visibleFlg = false;
var itemActivated = false;
var lastValue = null;
var lastOptsValue = null;
var lastCurrentDate = null;
var lastOptsCurrentDate = null;
var yearRange = 20;

// ===================================================================================
//                                                                             Methods
//                                                                             =======
function onMount() {
  if (typeof opts.riotValue === 'undefined' && typeof opts.value !== 'undefined') {
    opts.riotValue = opts.value;
  }
  if (!tag.valueAsDate) {
    tag.valueAsDate = copyDate(tag.value || opts.riotValue);
  }
  setValueFromValueAsDate();
  if (tag.refs.input) {
    tag.refs.input.value = tag.value;
  }
  lastValue = copyDate(tag.valueAsDate);
  lastOptsValue = copyDate(opts.riotValue);

  tag.currentDate = copyDate(opts.currentDate);
  if (tag.valueAsDate) {
    tag.currentDate = copyDate(tag.valueAsDate);
  }
  if (!tag.currentDate) {
    tag.currentDate = new Date();
  }
  tag.months = getMonthes();
  if (opts.yearRange && !isNaN(opts.yearRange) && opts.yearRange > 20) {
    yearRange = opts.yearRange;
  }
  if (opts.startMode === 'year') {
    tag.selectYear();
  }
  tag.update();
  tag.defaultValue = tag.valueAsDate;
}

function onUpdate() {
  var changed = false;
  if (!isEqualDay(lastValue, tag.value)) {
    tag.valueAsDate = copyDate(tag.value);
    lastValue = copyDate(tag.value);
    changed = true;
  } else if (!isEqualDay(lastValue, tag.valueAsDate)) {
    lastValue = copyDate(tag.valueAsDate);
    changed = true;
  } else if (!isEqualDay(lastOptsValue, opts.riotValue)) {
    tag.valueAsDate = copyDate(opts.riotValue);
    lastOptsValue = copyDate(opts.riotValue);
    lastValue = copyDate(opts.riotValue);
    changed = true;
  }
  setValueFromValueAsDate();
  if (changed && tag.refs.input) {
    tag.refs.input.value = tag.value;
  }

  if (changed && tag.valueAsDate) {
    tag.currentDate = copyDate(tag.valueAsDate);
  }
  if (!isEqualDay(lastOptsCurrentDate, opts.currentDate)) {
    tag.currentDate = copyDate(opts.currentDate);
    lastOptsCurrentDate = copyDate(opts.currentDate);
  }
  if (!isEqualDay(lastCurrentDate, tag.currentDate)) {
    lastCurrentDate = copyDate(tag.currentDate);
    generate();
  }
}

function reset() {
  tag.valueAsDate = tag.defaultValue;
  setValueFromValueAsDate();
}

function changed() {
  return !isEqualDay(tag.valueAsDate, tag.defaultValue);
}

function selectMonth() {
  tag.yearSelecting = false;
  tag.monthSelecting = !tag.monthSelecting;
}

function selectYear() {
  tag.years = getYears();
  tag.monthSelecting = false;
  tag.yearSelecting = !tag.yearSelecting;
}

function clickDay(event) {
  if (tag.isReadOnly() || tag.isDisabled()) {
    return;
  }
  setDate(event.item.day);
  tag.trigger('click', tag.valueAsDate);
}

function clickMonth(event) {
  tag.currentDate.setMonth(event.item.month.value);
  tag.monthSelecting = false;
}

function clickYear(event) {
  tag.currentDate.setYear(event.item.year);
  tag.selectMonth();
}

function clickPrevious() {
  if (tag.yearSelecting) {
    addYear(-yearRange);
  } else {
    tag.monthSelecting = false;
    tag.currentDate = (0, _add_months2.default)(tag.currentDate, -1);
  }
}

function clickNext() {
  if (tag.yearSelecting) {
    addYear(yearRange);
  } else {
    tag.monthSelecting = false;
    tag.currentDate = (0, _add_months2.default)(tag.currentDate, 1);
  }
}

function clickClear() {
  setDate(null);
  tag.trigger('clear', tag.valueAsDate);
}

function clickToday() {
  setDate(new Date());
  tag.trigger('today', tag.valueAsDate);
}

// -----------------------------------------------------
//                                          popup option
//                                          ------------
function toggle() {
  if (tag.isReadOnly() || tag.isDisabled()) {
    return;
  }
  if (!visibleFlg) {
    if (opts.startMode === 'year') {
      tag.selectYear();
      tag.yearSelecting = true;
    }
    open();
  } else {
    close();
  }
}

function mousedown() {
  itemActivated = true;
}

function mouseup() {
  itemActivated = false;
}

function blur() {
  if (opts.popup && !itemActivated) {
    close();
  }
}

function generate() {
  var startDate = (0, _start_of_month2.default)(tag.currentDate);
  var baseDate = (0, _add_days2.default)(startDate, -startDate.getDay());
  var i = 0;
  tag.weeks = [];

  for (var r = 0; r < 6; r++) {
    var days = [];
    for (var c = 0; c < 7; c++) {
      days.push((0, _add_days2.default)(baseDate, i++));
    }
    tag.weeks.push({ days: days });
  }
}

function addYear(year) {
  tag.years = tag.years.map(function (values) {
    values = values.map(function (value) {
      return value + parseInt(year);
    });
    return values;
  });
}

function getYears() {
  var rowSize = (yearRange - yearRange % 4) / 4 + (yearRange % 4 != 0 ? 1 : 0);
  var years = new Array();
  for (var index = 0; index < rowSize; index++) {
    years.push([]);
  }
  for (var _index = 0; _index < yearRange; _index++) {
    years[(_index - _index % 4) / 4][_index % 4] = tag.currentDate.getFullYear() + _index - ((yearRange - yearRange % 2) / 2 - 1);
  }
  return years;
}

function getMonthes() {
  var months = [[], [], []];
  var monthNames = range(12).map(function (month) {
    return (0, _format2.default)(new Date(2018, month, 1), 'MMM', { locale: getLocale() });
  });
  monthNames.forEach(function (month, index) {
    months[(index - index % 4) / 4][index % 4] = {
      label: month,
      value: index
    };
  });
  return months;
}

function open() {
  tag.upward = isUpward();
  tag.transitionStatus = 'visible';
  visibleFlg = true;
  tag.currentDate = copyDate(opts.currentDate);
  if (tag.valueAsDate) {
    tag.currentDate = copyDate(tag.valueAsDate);
  }
  if (!tag.currentDate) {
    tag.currentDate = new Date();
  }
  tag.trigger('open', tag.valueAsDate);
}

function close() {
  tag.transitionStatus = 'hidden';
  visibleFlg = false;
  tag.trigger('close', tag.valueAsDate);
}

function setDate(date) {
  tag.valueAsDate = date;
  setValueFromValueAsDate();
  if (tag.refs.input) {
    tag.refs.input.value = tag.value;
    close();
  }
  tag.trigger('change', tag.valueAsDate);
}

function setValueFromValueAsDate() {
  tag.value = tag.valueAsDate ? (0, _format2.default)(tag.valueAsDate, getPattern(), { locale: getLocale() }) : null;
}

function isEqualDay(d1, d2) {
  if (d1 == d2) {
    return true;
  }
  if (typeof d1 === 'undefined' || typeof d2 === 'undefined' || d1 === null || d2 === null) {
    return false;
  }
  return (0, _is_same_day2.default)(d1, d2);
}

function copyDate(date) {
  if (!date) {
    return date;
  }
  return (0, _parse2.default)(date);
}

function isUpward() {
  if (opts.direction == 'upward') {
    return true;
  }
  if (opts.direction == 'downward') {
    return false;
  }
  var inputField = tag.root.getBoundingClientRect();
  var windowHeight = document.documentElement.offsetHeight || document.body.offsetHeight;
  var menuHeight = tag.root.querySelector('.menu').getBoundingClientRect().height;
  var above = menuHeight <= inputField.top;
  var below = windowHeight >= inputField.top + inputField.height + menuHeight;

  if (below) {
    return false;
  }
  if (!below && !above) {
    return false;
  }
  return true;
}

function getCurrentYear() {
  if (tag.currentDate) {
    return tag.currentDate.getFullYear();
  }
}

function getCurrentMonthView() {
  if (tag.currentDate) {
    return (0, _format2.default)(tag.currentDate, 'MMM', { locale: getLocale() });
  }
}

function getCurrentMonth() {
  return tag.currentDate.getMonth();
}

function getWeekNames() {
  return range(7, 1).map(function (day) {
    return (0, _format2.default)(new Date(2018, 6, day), 'dd', { locale: getLocale() });
  });
}

function isActive(date) {
  return isEqualDay(tag.valueAsDate, date);
}

function getTabindex() {
  if (!opts.popup) {
    return false;
  }
  if (opts.tabindex) {
    return opts.tabindex;
  }
  return 0;
}

function isReadOnly() {
  return tag.root.classList.contains('read-only');
}
function isDisabled() {
  return tag.root.classList.contains('disabled');
}

function getPattern() {
  if (opts.pattern) {
    return opts.pattern;
  }
  if (tag.defaultOptions && tag.defaultOptions.pattern) {
    return tag.defaultOptions.pattern;
  }
  return 'YYYY-MM-DD';
}

function getLocale() {
  if (opts.locale) {
    return opts.locale;
  }
  if (tag.defaultOptions && tag.defaultOptions.locale) {
    return tag.defaultOptions.locale;
  }
}

function range(size) {
  var startAt = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

  return Array.from(Array(size).keys()).map(function (i) {
    return i + startAt;
  });
}
});

/***/ }),

/***/ "./tags/dropdown/su-dropdown.tag":
/*!***************************************!*\
  !*** ./tags/dropdown/su-dropdown.tag ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

riot.tag2('su-dropdown', '<i class="dropdown icon"></i> <input class="search" autocomplete="off" tabindex="{getTabindex()}" ref="condition" if="{opts.search}" oninput="{input}" onclick="{stopPropagation}" onfocus="{focus}" onblur="{blur}" readonly="{isReadOnly()}"> <a each="{item in opts.items}" class="ui label transition visible" style="display: inline-block !important;" if="{item.selected}" onclick="{stopPropagation}"> {item.label} <i class="delete icon" onclick="{unselect}"></i> </a> <div class="{default: default} text {filtered: filtered}" if="{!opts.multiple || !selectedFlg}"> {label} </div> <div class="menu transition {transitionStatus}" onmousedown="{mousedown}" onmouseup="{mouseup}" onblur="{blur}" tabindex="-1"> <div each="{item in opts.items}" riot-value="{item.value}" default="{item.default}" onmousedown="{mousedown}" onmouseup="{mouseup}" class="{item: isItem(item)} {header: item.header && !filtered} {divider: item.divider && !filtered} {default: item.default} {hover: item.active} {active: item.value == value} {selected: item.value == value}" onclick="{itemClick}" if="{isVisible(item)}"> <i class="{item.icon} icon" if="{item.icon}"></i> <img class="ui avatar image" riot-src="{item.image}" if="{item.image}"> <span class="description" if="{item.description}">{item.description}</span> <span class="text">{item.label}</span> </div> <div class="message" if="{filtered && filteredItems.length == 0}">No results found.</div> </div>', 'su-dropdown.ui.dropdown .menu>.item.default,[data-is="su-dropdown"].ui.dropdown .menu>.item.default{ color: rgba(0, 0, 0, 0.4) } su-dropdown.ui.dropdown .menu>.item.hover,[data-is="su-dropdown"].ui.dropdown .menu>.item.hover{ background: rgba(0, 0, 0, .05); color: rgba(0, 0, 0, .95); } su-dropdown.ui.dropdown .menu,[data-is="su-dropdown"].ui.dropdown .menu{ display: block; }', 'class="ui selection {opts.class} {search: opts.search} {multiple: opts.multiple} dropdown {active: isActive()} {visible: isActive()} {upward: upward}" onclick="{toggle}" onfocus="{focus}" onmousedown="{mousedown}" onmouseup="{mouseup}" onblur="{blur}" onkeydown="{keydown}" onkeyup="{keyup}" tabindex="{opts.search ? -1 : getTabindex()}"', function(opts) {
'use strict';

var tag = this;
// ===================================================================================
//                                                                      Tag Properties
//                                                                      ==============
tag.defaultValue = '';
tag.filtered = false;
tag.label = '';
tag.selectedFlg = false;
tag.transitionStatus = 'hidden';
tag.value = '';

// ===================================================================================
//                                                                         Tag Methods
//                                                                         ===========
tag.blur = blur;
tag.changed = changed;
tag.focus = focus;
tag.getTabindex = getTabindex;
tag.isActive = isActive;
tag.isDisabled = isDisabled;
tag.input = input;
tag.isItem = isItem;
tag.isReadOnly = isReadOnly;
tag.isVisible = isVisible;
tag.itemClick = itemClick;
tag.keydown = keydown;
tag.keyup = keyup;
tag.mousedown = mousedown;
tag.mouseup = mouseup;
tag.on('before-mount', onBeforeMount);
tag.on('mount', onMount);
tag.on('update', onUpdate);
tag.reset = reset;
tag.stopPropagation = stopPropagation;
tag.toggle = toggle;
tag.unselect = unselect;

// ===================================================================================
//                                                                          Properties
//                                                                          ==========
var visibleFlg = false;
var keys = {
  enter: 13,
  escape: 27,
  upArrow: 38,
  downArrow: 40

  // ===================================================================================
  //                                                                             Methods
  //                                                                             =======
};function onBeforeMount() {
  if (opts.items && opts.items.length > 0) {
    tag.label = opts.items[0].label;
    tag.value = opts.items[0].value;
    tag.default = opts.items[0].default;
  }
}

function onMount() {
  if (typeof opts.riotValue === 'undefined' && typeof opts.value !== 'undefined') {
    opts.riotValue = opts.value;
  }
  if (typeof opts.riotValue !== 'undefined') {
    tag.value = opts.riotValue;
    tag.defaultValue = tag.value;
    tag.update();
    parentUpdate();
  } else {
    tag.defaultValue = tag.value;
  }
}

function onUpdate() {
  if (opts.multiple) {
    opts.items.forEach(function (item) {
      return item.selected = false;
    });
    opts.items.filter(function (item) {
      return tag.value && tag.value.indexOf(item.value) >= 0;
    }).forEach(function (item) {
      return item.selected = true;
    });
    selectMultiTarget(true);
  } else if (opts.items) {
    var selected = opts.items.filter(function (item) {
      return item.value === tag.value;
    });
    if (selected && selected.length > 0) {
      var target = selected[0];
      if (tag.label !== target.label) {
        selectTarget(target, true);
      }
    } else if (opts.items && opts.items.length > 0) {
      if (tag.value != opts.items[0].value) {
        tag.value = opts.items[0].value;
      }
      if (tag.label != opts.items[0].label) {
        tag.label = opts.items[0].label;
        tag.default = opts.items[0].default;
      }
    }
  }
}

function reset() {
  tag.value = tag.defaultValue;
}

function changed() {
  if (opts.multiple) {
    var value = tag.value ? tag.value : [];
    var defaultValue = tag.defaultValue ? tag.defaultValue : [];
    return value.toString() !== defaultValue.toString();
  }
  return tag.value !== tag.defaultValue;
}

function toggle() {
  if (!visibleFlg) {
    open();
  } else {
    close();
  }
}

function focus() {
  open();
}

function mousedown() {
  tag.itemActivated = true;
}

function mouseup() {
  tag.itemActivated = false;
}

function blur() {
  if (!tag.itemActivated) {
    if (!tag.closing && visibleFlg) {
      var target = opts.multiple ? opts.items.filter(function (item) {
        return item.selected;
      }) : { value: tag.value, label: tag.label, default: tag.default };
      tag.trigger('blur', target);
    }
    close();
  }
}

function itemClick(event) {
  event.stopPropagation();
  if (!tag.isItem(event.item.item)) {
    return;
  }
  if (opts.multiple) {
    if (!event.item.item.default) {
      event.item.item.selected = true;
    }
    selectMultiTarget();
    return;
  }
  selectTarget(event.item.item);
  close();
}

function keydown(event) {
  var keyCode = event.keyCode;
  if (keyCode == keys.escape) {
    close();
  }
  if (keyCode == keys.downArrow) {
    open();
  }
  if (keyCode != keys.upArrow && keyCode != keys.downArrow) {
    return true;
  }

  event.preventDefault();
  var searchedItems = opts.items.filter(function (item) {
    if (opts.search && !item.searched) {
      return false;
    }
    if (opts.multiple && (item.default || item.selected)) {
      return false;
    }
    return true;
  });
  if (searchedItems.length == 0) {
    return true;
  }
  if (searchedItems.every(function (item) {
    return !item.active;
  })) {
    searchedItems[0].active = true;
    return true;
  }

  var activeIndex = parseInt(searchedItems.map(function (item, index) {
    return item.active ? index : -1;
  }).filter(function (index) {
    return index >= 0;
  }));
  if (keyCode == keys.upArrow) {
    var nextActiveItem = searchedItems.filter(function (item, index) {
      return index < activeIndex && !item.header && !item.divider;
    });
    if (nextActiveItem.length > 0) {
      searchedItems[activeIndex].active = false;
      nextActiveItem[nextActiveItem.length - 1].active = true;
    }
  } else if (keyCode == keys.downArrow) {
    var _nextActiveItem = searchedItems.filter(function (item, index) {
      return index > activeIndex && !item.header && !item.divider;
    });

    if (_nextActiveItem.length > 0) {
      searchedItems[activeIndex].active = false;
      _nextActiveItem[0].active = true;
    }
  }
  tag.update();
  scrollPosition();
}

function keyup(event) {
  var keyCode = event.keyCode;
  if (keyCode != keys.enter) {
    return;
  }
  var searchedItems = opts.items.filter(function (item) {
    return item.searched && !item.selected;
  });
  var index = parseInt(searchedItems.map(function (item, index) {
    return item.active ? index : -1;
  }).filter(function (index) {
    return index >= 0;
  }));
  var activeItem = searchedItems[index];
  if (!activeItem) {
    return;
  }

  if (opts.multiple) {
    activeItem.selected = true;
    activeItem.active = false;
    if (index < searchedItems.length - 1) {
      searchedItems[index + 1].active = true;
    } else if (index > 0) {
      searchedItems[index - 1].active = true;
    }
    selectMultiTarget();
  } else {
    activeItem.active = false;
    selectTarget(activeItem);
    close();
  }
}

function stopPropagation(event) {
  event.stopPropagation();
}

// -----------------------------------------------------
//                                         search option
//                                         -------------
function input(event) {
  var value = event.target.value.toLowerCase();
  tag.filtered = value.length > 0;
  search(value);
}

// -----------------------------------------------------
//                                       multiple option
//                                       ---------------
function unselect(event) {
  event.stopPropagation();
  event.item.item.selected = false;
  tag.value = opts.items.filter(function (item) {
    return item.selected;
  }).map(function (item) {
    return item.value;
  });
  tag.selectedFlg = opts.items.some(function (item) {
    return item.selected;
  });
  parentUpdate();
}

function open() {
  if (tag.openning || tag.closing || visibleFlg || tag.isReadOnly() || tag.isDisabled()) {
    return;
  }
  tag.openning = true;
  search('');
  tag.upward = isUpward();
  tag.transitionStatus = 'visible animating in slide ' + (tag.upward ? 'up' : 'down');
  opts.items.forEach(function (item) {
    return item.active = false;
  });
  setTimeout(function () {
    tag.openning = false;
    visibleFlg = true;
    tag.transitionStatus = 'visible';
    tag.update();
  }, 300);

  if (opts.search) {
    tag.refs.condition.focus();
  }
  tag.update();
  scrollPosition();
  tag.trigger('open');
}

function close() {
  if (tag.closing || !visibleFlg) {
    return;
  }
  tag.closing = true;
  tag.transitionStatus = 'visible animating out slide ' + (tag.upward ? 'up' : 'down');
  setTimeout(function () {
    tag.closing = false;
    visibleFlg = false;
    tag.transitionStatus = 'hidden';
    tag.update();
  }, 300);

  if (opts.search) {
    tag.refs.condition.blur();
    if (tag.filtered && tag.filteredItems.length > 0) {
      selectTarget(tag.filteredItems[0]);
    } else {
      tag.refs.condition.value = '';
      tag.filtered = false;
    }
  }
  tag.update();
  tag.trigger('close');
}

function selectTarget(target, updating) {
  if (tag.value === target.value && tag.label === target.label && tag.default === target.default) {
    if (!updating) {
      tag.trigger('select', target);
    }
    return;
  }
  tag.value = target.value;
  tag.label = target.label;
  tag.default = target.default;
  if (opts.search) {
    tag.refs.condition.value = '';
    tag.filtered = false;
  }
  if (!updating) {
    tag.update();
    parentUpdate();
    tag.trigger('select', target);
    tag.trigger('change', target);
  }
}

function selectMultiTarget(updating) {
  if (JSON.stringify(tag.value) == JSON.stringify(opts.items.filter(function (item) {
    return item.selected;
  }).map(function (item) {
    return item.value;
  })) && tag.selectedFlg == opts.items.some(function (item) {
    return item.selected;
  })) {
    if (!updating) {
      tag.trigger('select', opts.items.filter(function (item) {
        return item.selected;
      }));
    }
    return;
  }
  tag.value = opts.items.filter(function (item) {
    return item.selected;
  }).map(function (item) {
    return item.value;
  });
  tag.selectedFlg = opts.items.some(function (item) {
    return item.selected;
  });
  if (!updating) {
    tag.update();
    parentUpdate();
    tag.trigger('select', opts.items.filter(function (item) {
      return item.selected;
    }));
    tag.trigger('change', opts.items.filter(function (item) {
      return item.selected;
    }));
  }
}

function search(target) {
  opts.items.forEach(function (item) {
    item.searched = item.label && item.label.toLowerCase().indexOf(target) >= 0;
  });
  tag.filteredItems = opts.items.filter(function (item) {
    return item.searched;
  });
  tag.update();
  tag.trigger('search');
}

function scrollPosition() {
  var menu = tag.root.querySelector('.menu');
  var item = tag.root.querySelector('.item.hover');

  if (menu && item) {
    var menuScroll = menu.scrollTop;
    var itemOffset = item.offsetTop;
    var itemHeight = parseInt(document.defaultView.getComputedStyle(item, null).height.replace('px', ''));
    var menuHeight = parseInt(document.defaultView.getComputedStyle(menu, null).height.replace('px', ''));
    var belowPage = menuScroll + menuHeight < itemOffset + itemHeight;
    var abovePage = itemOffset < menuScroll;
    if (abovePage || belowPage) {
      menu.scrollTop = itemOffset;
    }
  }
}

function parentUpdate() {
  if (tag.parent) {
    tag.parent.update();
  }
}

function isUpward() {
  if (opts.direction == 'upward') {
    return true;
  }
  if (opts.direction == 'downward') {
    return false;
  }
  var dropdown = tag.root.getBoundingClientRect();
  var windowHeight = document.documentElement.offsetHeight || document.body.offsetHeight;
  var menuHeight = tag.root.querySelector('.menu').getBoundingClientRect().height;
  var above = menuHeight <= dropdown.top;
  var below = windowHeight >= dropdown.top + dropdown.height + menuHeight;

  if (below) {
    return false;
  }
  if (!below && !above) {
    return false;
  }
  return true;
}

function isItem(item) {
  return item.searched && !item.header && !item.divider;
}

function isActive() {
  if (tag.closing) {
    return false;
  }
  return tag.openning || visibleFlg;
}

function getTabindex() {
  if (opts.tabindex) {
    return opts.tabindex;
  }
  return 0;
}

function isReadOnly() {
  return tag.root.classList.contains('read-only');
}

function isDisabled() {
  return tag.root.classList.contains('disabled');
}

function isVisible(item) {
  if (opts.multiple && item.default) {
    return false;
  }
  if (item.selected) {
    return false;
  }
  return item.searched || item.divider || item.header;
}
});

/***/ }),

/***/ "./tags/dropdown/su-select.tag":
/*!*************************************!*\
  !*** ./tags/dropdown/su-select.tag ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports) {

riot.tag2('su-select', '<select onchange="{change}" onblur="{blur}" class="{default: default} text"> <option each="{item in opts.items}" riot-value="{item.value}" if="{!item.items}"> {item.label} </option> <optgroup label="{item.label}" each="{item in opts.items}" if="{item.items}"> <option each="{child in item.items}" riot-value="{child.value}"> {child.label} </option> </optgroup> </select> <i class="dropdown icon"></i>', 'su-select.ui.selection.dropdown,[data-is="su-select"].ui.selection.dropdown{ padding: 0; } su-select.ui.selection.dropdown>select:focus,[data-is="su-select"].ui.selection.dropdown>select:focus{ outline: 0; border-color: #96c8da; } su-select.ui.selection.dropdown>select,[data-is="su-select"].ui.selection.dropdown>select{ display: block !important; padding: .78571429em 2.1em .78571429em 1em; background: 0 0 !important; position: relative; overflow: hidden; white-space: nowrap; text-overflow: ellipsis; -webkit-appearance: none; -moz-appearance: none; -webkit-box-sizing: border-box; box-sizing: border-box; border: none; width: 100%; z-index: 2; font-family: Lato, \'Helvetica Neue\', Arial, Helvetica, sans-serif; } su-select.ui.selection.dropdown>.dropdown.icon,[data-is="su-select"].ui.selection.dropdown>.dropdown.icon{ z-index: 1; }', 'class="ui selection dropdown"', function(opts) {
'use strict';

var tag = this;
// ===================================================================================
//                                                                      Tag Properties
//                                                                      ==============
tag.defaultValue = '';
tag.value = '';
tag.label = '';

// ===================================================================================
//                                                                         Tag Methods
//                                                                         ===========
tag.blur = blur;
tag.change = change;
tag.changed = changed;
tag.changeValues = changeValues;
tag.reset = reset;
tag.on('before-mount', onBeforeMount);
tag.on('mount', onMount);
tag.on('update', onUpdate);

// ===================================================================================
//                                                                          Properties
//                                                                          ==========

// ===================================================================================
//                                                                             Methods
//                                                                             =======
function onBeforeMount() {
  if (opts.items && opts.items.length > 0) {
    tag.label = opts.items[0].label;
    tag.value = opts.items[0].value;
    tag.default = opts.items[0].default;
  }
}

function onMount() {
  if (typeof opts.riotValue === 'undefined' && typeof opts.value !== 'undefined') {
    opts.riotValue = opts.value;
  }
  if (typeof opts.riotValue !== 'undefined') {
    tag.value = opts.riotValue;
    tag.defaultValue = tag.value;
    tag.update();
  } else {
    tag.defaultValue = tag.value;
  }
}

function onUpdate() {
  if (opts.items) {
    var selected = opts.items.filter(function (item) {
      return item.value === tag.value;
    });
    if (!selected || selected.length == 0) {
      var childItems = flatMap(opts.items.filter(function (item) {
        return item.items;
      }), function (item) {
        return item.items;
      });
      selected = childItems.filter(function (item) {
        return item.value == tag.value;
      });
    }

    if (selected && selected.length > 0) {
      var target = selected[0];
      if (tag.label !== target.label) {
        tag.changeValues(tag.value, true);
      }
    } else if (opts.items && opts.items.length > 0) {
      if (tag.value != opts.items[0].value) {
        tag.value = opts.items[0].value;
      }
      if (tag.label != opts.items[0].label) {
        tag.label = opts.items[0].label;
        tag.default = opts.items[0].default;
      }
    }
  }
}

// ===================================================================================
//                                                                               State
//                                                                               =====
function reset() {
  tag.value = tag.defaultValue;
}

function changed() {
  return tag.value !== tag.defaultValue;
}

// ===================================================================================
//                                                                               Event
//                                                                               =====
function blur() {
  tag.trigger('blur');
}

function change(target) {
  tag.changeValues(target.target.value);
}

function changeValues(value, updating) {
  var item = void 0;
  if (opts.items.some(function (item) {
    return item.value == value || item.label == value;
  })) {
    item = opts.items.filter(function (item) {
      return item.value == value || item.label == value;
    })[0];
    tag.label = item.label;
    tag.value = item.value;
    tag.default = item.default;
  } else {
    var childItems = flatMap(opts.items.filter(function (item) {
      return item.items;
    }), function (item) {
      return item.items;
    });
    if (childItems.some(function (item) {
      return item.value == value || item.label == value;
    })) {
      item = childItems.filter(function (item) {
        return item.value == value || item.label == value;
      })[0];
      tag.label = item.label;
      tag.value = item.value;
      tag.default = item.default;
    }
  }

  if (!updating) {
    tag.update();
    tag.trigger('change', item);
  }
}

// ===================================================================================
//                                                                               Logic
//                                                                               =====
function flatMap(xs, f) {
  return xs.reduce(function (ys, x) {
    return ys.concat(f(x));
  }, []);
}
});

/***/ }),

/***/ "./tags/modal/su-modal.tag":
/*!*********************************!*\
  !*** ./tags/modal/su-modal.tag ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

riot.tag2('su-modal', '<div class="ui dimmer modals page transition {transitionStatus}"> <div class="ui modal transition visible active {opts.class}" onclick="{clickModal}" id="{getId()}"> <i class="close icon" if="{opts.modal.closable && !isBasic()}" onclick="{hide}"></i> <div class="ui header {icon: opts.modal.header.icon}" if="{opts.modal.header}"> <i class="icon {opts.modal.header.icon}" if="{opts.modal.header.icon}"></i> {getTitle()} </div> <div class="content {image: isImageContent()}" ref="content"> <yield></yield> </div> <div class="actions"> <button each="{button in opts.modal.buttons}" onclick="{click}" ref="button_{button.text}" type="button" class="ui button {button.type} {labeled: button.icon && button.text} {icon: button.icon} {inverted: isBasic()} {disabled: button.disabled}"> {button.text} <i class="icon {button.icon}" if="{button.icon}"></i> </button> </div> </div> </div>', 'su-modal .ui.dimmer.visible.transition,[data-is="su-modal"] .ui.dimmer.visible.transition{ display: flex !important; align-items: center; justify-content: center; } su-modal .ui.modal,[data-is="su-modal"] .ui.modal{ top: auto; left: auto; position: relative; margin: 0 !important; } su-modal .ui.fullscreen.modal,[data-is="su-modal"] .ui.fullscreen.modal{ left: 0 !important; } @media only screen and (min-width: 768px) { su-modal .ui.modal>.close,[data-is="su-modal"] .ui.modal>.close{ display: none; } su-modal .ui.fullscreen.modal>.close,[data-is="su-modal"] .ui.fullscreen.modal>.close{ display: inline; } }', 'onclick="{dimmerClose}"', function(opts) {
'use strict';

var tag = this;
// ===================================================================================
//                                                                      Tag Properties
//                                                                      ==============

// ===================================================================================
//                                                                         Tag Methods
//                                                                         ===========
tag.click = click;
tag.clickModal = clickModal;
tag.dimmerClose = dimmerClose;
tag.getId = getId;
tag.getTitle = getTitle;
tag.hide = hide;
tag.isBasic = isBasic;
tag.isImageContent = isImageContent;
tag.show = show;
tag.on('before-mount', onBeforeMount);
tag.on('mount', onMount);
tag.on('update', onUpdate);

// ===================================================================================
//                                                                          Properties
//                                                                          ==========
var image_content = false;
var openning = void 0,
    closing = void 0,
    visible = void 0;

// ===================================================================================
//                                                                             Methods
//                                                                             =======
function onBeforeMount() {
  if (!opts.modal) {
    opts.modal = {};
  }
}

function onMount() {
  if (typeof opts.modal.closable === 'undefined') {
    opts.modal.closable = true;
  }
}

function onUpdate() {
  if (tag.refs.content.getElementsByTagName('img').length > 0) {
    image_content = true;
  }
}

function show() {
  if (openning || closing || visible) {
    return;
  }
  openning = true;
  tag.transitionStatus = 'animating fade in visible';
  tag.update();
  setDefaultFocus();
  tag.trigger('show');

  setTimeout(function () {
    openning = false;
    visible = true;
    tag.transitionStatus = 'visible active';
    tag.update();
  }, 500);
}

function click(event) {
  tag.trigger(event.item.action || event.item.text);
  if (typeof event.item.closable === 'undefined' || event.item.closable) {
    tag.hide();
  }
}

function dimmerClose() {
  if (opts.modal.closable && !tag.isBasic()) {
    tag.hide();
  }
}

function clickModal(event) {
  event.stopPropagation();
}

function hide() {
  if (openning || closing || !visible) {
    return;
  }
  closing = true;
  tag.transitionStatus = 'animating fade out visible active';
  tag.update();
  tag.trigger('hide');

  setTimeout(function () {
    closing = false;
    visible = false;
    tag.transitionStatus = '';
    tag.update();
  }, 300);
}

function isContainsClassName(className) {
  var modalElement = document.getElementById(tag.getId());
  if (!modalElement) {
    return false;
  }
  return modalElement.classList.contains(className);
}

function setDefaultFocus() {
  if (!opts.modal || !opts.modal.buttons || opts.modal.buttons.length == 0) {
    return;
  }
  if (opts.modal.buttons.some(function (button) {
    return button.default;
  })) {
    var text = opts.modal.buttons.filter(function (button) {
      return button.default;
    })[0].text;
    tag.refs['button_' + text].focus();
  }
}

function getTitle() {
  if (opts.modal.header.text) {
    return opts.modal.header.text;
  }
  return opts.modal.header;
}

function getId() {
  return 'su-modal-' + tag._riot_id;
}

function isBasic() {
  return isContainsClassName('basic');
}

function isImageContent() {
  return image_content;
}
});

/***/ }),

/***/ "./tags/pagination/su-pagination.tag":
/*!*******************************************!*\
  !*** ./tags/pagination/su-pagination.tag ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

riot.tag2('su-pagination', '<div class="ui pagination menu {opts.class}"> <a class="icon item {disabled: activePage <= 1}" onclick="{clickPage.bind(this,1)}"> <i aria-hidden="true" class="angle double left icon"></i> </a> <a class="icon item {disabled: activePage <= 1}" onclick="{clickPage.bind(this,activePage - 1)}"> <i class="angle left icon"></i> </a> <virtual each="{page in pages}"> <a class="item" onclick="{clickPage.bind(this,page.number)}" if="{!page.active && !page.disabled}"> {page.number} </a> <a class="active item" if="{page.active}">{page.number}</a> <div class="disabled icon item" if="{page.disabled}"> <i class="ellipsis horizontal icon"></i> </div> </virtual> <a class="icon item {disabled: activePage >= totalPages}" onclick="{clickPage.bind(this,activePage + 1)}"> <i class="angle right icon"></i> </a> <a class="icon item {disabled: activePage >= totalPages}" onclick="{clickPage.bind(this,totalPages )}"> <i aria-hidden="true" class="angle double right icon"></i> </a> </div>', '', '', function(opts) {
'use strict';

var tag = this;
// ===================================================================================
//                                                                      Tag Properties
//                                                                      ==============
tag.activePage = 1;
tag.pages = [];
tag.totalPages = 1;

// ===================================================================================
//                                                                         Tag Methods
//                                                                         ===========
tag.clickPage = clickPage;
tag.on('mount', onMount);
tag.on('update', onUpdate);

// ===================================================================================
//                                                                          Properties
//                                                                          ==========
var lastActivePage = null;
var lastOptsTotalPages = null;
var lastOptsActivePage = null;
var lastTotalPages = null;

// ===================================================================================
//                                                                             Methods
//                                                                             =======
function onMount() {
  tag.update();
}

function onUpdate() {
  var needsRegenerate = false;
  if (opts.activePage != lastOptsActivePage) {
    lastOptsActivePage = opts.activePage;
    tag.activePage = opts.activePage;
    lastActivePage = tag.activePage;
    needsRegenerate = true;
  } else if (tag.activePage != lastActivePage) {
    lastActivePage = tag.activePage;
    needsRegenerate = true;
  }
  if (opts.totalPages != lastOptsTotalPages) {
    lastOptsTotalPages = opts.totalPages;
    tag.totalPages = opts.totalPages;
    lastTotalPages = tag.totalPages;
    needsRegenerate = true;
  } else if (tag.totalPages != lastTotalPages) {
    lastTotalPages = tag.totalPages;
    opts.totalPages = tag.totalPages;
    lastOptsTotalPages = opts.totalPages;
    needsRegenerate = true;
  }

  if (needsRegenerate) {
    generatePagination();
  }
}

function clickPage(pageNum, e) {
  e.preventDefault();
  if (pageNum < 1 || pageNum > tag.totalPages) {
    return;
  }
  tag.activePage = pageNum;
  tag.update();
  tag.trigger('change', pageNum);
}

function generatePagination() {
  tag.pages = [];
  var activePage = parseInt(tag.activePage || 1);
  var totalPages = parseInt(tag.totalPages || 1);
  var pageSize = calcPageSize();
  var index = calcIndex(pageSize);

  if (pageSize < 1) {
    tag.update();
    return;
  }

  for (var i = 0; i < pageSize; i++) {
    tag.pages.push({
      number: i + index,
      active: i + index == activePage
    });
  }
  tag.pages[0].number = 1;
  tag.pages[pageSize - 1].number = totalPages;
  if (pageSize > 1) {
    tag.pages[1].disabled = index != 1;
  }
  if (pageSize > 2) {
    tag.pages[pageSize - 2].disabled = index != totalPages - pageSize + 1;
  }

  tag.update();
}

function calcPageSize() {
  var pageSize = parseInt(opts.pageSize || 7);
  return pageSize < tag.totalPages ? pageSize : tag.totalPages;
}

function calcIndex(pageSize) {
  var activePage = parseInt(tag.activePage || 1);
  var totalPages = parseInt(tag.totalPages || 1);
  var prevPageSize = (pageSize - pageSize % 2) / 2;
  if (activePage + prevPageSize > totalPages) {
    return totalPages - pageSize + 1;
  }
  if (activePage > prevPageSize) {
    return activePage - prevPageSize;
  }
  return 1;
}
});

/***/ }),

/***/ "./tags/popup/su-popup.tag":
/*!*********************************!*\
  !*** ./tags/popup/su-popup.tag ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

riot.tag2('su-popup', '<div id="{getId()}" onmouseover="{stopPropagation}" onmouseout="{stopPropagation}" class="ui popup {position} {dataVariation} transition {transitionStatus} {nowrap: isNowrap()}"> </div> <yield></yield>', 'su-popup,[data-is="su-popup"]{ position: relative; } su-popup .ui.popup,[data-is="su-popup"] .ui.popup{ position: absolute; } su-popup .ui.popup.nowrap,[data-is="su-popup"] .ui.popup.nowrap{ white-space: nowrap; } su-popup .ui.popup.wide,[data-is="su-popup"] .ui.popup.wide{ width: 350px; } su-popup .ui.popup.very.wide,[data-is="su-popup"] .ui.popup.very.wide{ width: 550px; } su-popup .ui.popup.top.left,[data-is="su-popup"] .ui.popup.top.left{ top: auto; bottom: 100%; left: 1em; right: auto; margin-left: -1rem; } su-popup .ui.popup.bottom.left,[data-is="su-popup"] .ui.popup.bottom.left{ top: 100%; bottom: auto; left: 1em; right: auto; margin-left: -1rem; } su-popup .ui.popup.top.center,[data-is="su-popup"] .ui.popup.top.center{ top: auto; bottom: 100%; left: 50%; right: auto; -webkit-transform: translateX(-50%); transform: translateX(-50%); } su-popup .ui.popup.bottom.center,[data-is="su-popup"] .ui.popup.bottom.center{ top: 100%; bottom: auto; left: 50%; right: auto; -webkit-transform: translateX(-50%); transform: translateX(-50%); } su-popup .ui.popup.top.center.scale.transition.in,[data-is="su-popup"] .ui.popup.top.center.scale.transition.in,su-popup .ui.popup.bottom.center.scale.transition.in,[data-is="su-popup"] .ui.popup.bottom.center.scale.transition.in{ animation-name: xScaleIn } su-popup .ui.popup.top.right,[data-is="su-popup"] .ui.popup.top.right{ top: auto; bottom: 100%; left: auto; right: 1em; margin-right: -1rem; } su-popup .ui.popup.bottom.right,[data-is="su-popup"] .ui.popup.bottom.right{ top: 100%; bottom: auto; left: auto; right: 1em; margin-right: -1rem; } su-popup .ui.popup.left.center,[data-is="su-popup"] .ui.popup.left.center{ left: auto; right: 100%; top: 50%; -webkit-transform: translateY(-50%); transform: translateY(-50%); } su-popup .ui.popup.right.center,[data-is="su-popup"] .ui.popup.right.center{ left: 100%; right: auto; top: 50%; -webkit-transform: translateY(-50%); transform: translateY(-50%); } su-popup .ui.popup.left.center.scale.transition.in,[data-is="su-popup"] .ui.popup.left.center.scale.transition.in,su-popup .ui.popup.right.center.scale.transition.in,[data-is="su-popup"] .ui.popup.right.center.scale.transition.in{ animation-name: yScaleIn } @-webkit-keyframes xScaleIn { 0% { opacity: 0; -webkit-transform: scale(0.8) translateX(-50%); transform: scale(0.8) translateX(-50%); } 100% { opacity: 1; -webkit-transform: scale(1) translateX(-50%); transform: scale(1) translateX(-50%); } } @keyframes xScaleIn { 0% { opacity: 0; -webkit-transform: scale(0.8) translateX(-50%); transform: scale(0.8) translateX(-50%); } 100% { opacity: 1; -webkit-transform: scale(1) translateX(-50%); transform: scale(1) translateX(-50%); } } @-webkit-keyframes yScaleIn { 0% { opacity: 0; -webkit-transform: scale(0.8) translateY(-50%); transform: scale(0.8) translateY(-50%); } 100% { opacity: 1; -webkit-transform: scale(1) translateY(-50%); transform: scale(1) translateY(-50%); } } @keyframes yScaleIn { 0% { opacity: 0; -webkit-transform: scale(0.8) translateY(-50%); transform: scale(0.8) translateY(-50%); } 100% { opacity: 1; -webkit-transform: scale(1) translateY(-50%); transform: scale(1) translateY(-50%); } }', 'onmouseover="{mouseover}" onmouseout="{mouseout}"', function(opts) {
'use strict';

var tag = this;
// ===================================================================================
//                                                                      Tag Properties
//                                                                      ==============
tag.content = '';
tag.dataVariation = opts.dataVariation || '';

// ===================================================================================
//                                                                         Tag Methods
//                                                                         ===========
tag.getId = getId;
tag.isNowrap = isNowrap;
tag.mouseover = mouseover;
tag.mouseout = mouseout;
tag.on('mount', onMount);
tag.on('update', onUpdate);
tag.stopPropagation = stopPropagation;

// ===================================================================================
//                                                                          Properties
//                                                                          ==========

// ===================================================================================
//                                                                             Methods
//                                                                             =======
function onMount() {
  if (opts.tooltip) {
    if (opts.dataTitle) {
      tag.content = '<div class="header">' + opts.dataTitle + '</div><div class="content">' + opts.tooltip + '</div>';
    } else {
      tag.content = opts.tooltip;
    }
  } else if (tag.tags['su-popup-content']) {
    tag.content = tag.tags['su-popup-content'].root.innerHTML;
    tag.tags['su-popup-content'].unmount();
  }
  document.getElementById(tag.getId()).innerHTML = tag.content;
  tag.update();
}

function onUpdate() {
  tag.position = opts.position || 'top left';
}

function mouseover() {
  tag.transitionStatus = 'scale in visible';
  tag.trigger('mouseover');
}

function mouseout() {
  tag.transitionStatus = 'hidden';
  tag.trigger('mouseout');
}

function stopPropagation(event) {
  event.stopPropagation();
}

function isNowrap() {
  if (tag.dataVariation.indexOf('wide') >= 0) {
    return false;
  }
  return true;
}

function getId() {
  return 'su-popup-' + tag._riot_id;
}
});

riot.tag2('su-popup-content', '', '', '', function(opts) {
});

/***/ }),

/***/ "./tags/progress/su-progress.tag":
/*!***************************************!*\
  !*** ./tags/progress/su-progress.tag ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

riot.tag2('su-progress', '<div class="ui progress {getClass()} {getStates()}" data-percent="{percent}"> <div class="bar" riot-style="transition-duration: 300ms; width: {percent}%;"> <div if="{isProgress()}" class="progress">{percent}%</div> </div> <div class="label"> <yield></yield> </div> </div>', 'su-progress .ui.progress:last-child,[data-is="su-progress"] .ui.progress:last-child{ margin: 0 0 2.5em; } su-progress.attached,[data-is="su-progress"].attached{ display: block; height: 0.2rem; padding: 0px; overflow: hidden; border-radius: 0em 0em 0.28571429rem 0.28571429rem; position: absolute; left: 0; width: 100%; } su-progress.top.attached,[data-is="su-progress"].top.attached{ top: 0px; bottom: 100%; border-radius: 0.28571429rem 0.28571429rem 0em 0em; } su-progress.bottom.attached,[data-is="su-progress"].bottom.attached{ top: 100%; bottom: auto; }', 'class="{opts.class}"', function(opts) {
'use strict';

var tag = this;
// ===================================================================================
//                                                                      Tag Properties
//                                                                      ==============
tag.defaultValue = null;
tag.value = null;

// ===================================================================================
//                                                                         Tag Methods
//                                                                         ===========
tag.getClass = getClass;
tag.getStates = getStates;
tag.isProgress = isProgress;
tag.on('mount', onMount);
tag.on('update', onUpdate);

// ===================================================================================
//                                                                          Properties
//                                                                          ==========
var lastOptsValue = null;
var lastValue = null;
var total = 100;

// ===================================================================================
//                                                                             Methods
//                                                                             =======
function onMount() {
  if (typeof opts.riotValue === 'undefined' && typeof opts.value !== 'undefined') {
    opts.riotValue = opts.value;
  }
  init(opts.riotValue, opts.total);

  tag.update();
  tag.defaultValue = tag.value;
}

function onUpdate() {
  var changed = false;
  if (tag.value >= total) {
    tag.value = total;
  }
  if (tag.value <= 0) {
    tag.value = 0;
  }
  if (lastValue != tag.value) {
    lastValue = tag.value;
    changed = true;
  } else if (lastOptsValue != opts.riotValue) {
    tag.value = opts.riotValue;
    lastOptsValue = opts.riotValue;
    lastValue = opts.riotValue;
    changed = true;
  }

  if (changed) {
    tag.percent = getPercent();
  }
}

function getClass() {
  var excludeClasses = ['progress', 'active'];
  return Array.apply(null, tag.root.classList).filter(function (clazz) {
    return !excludeClasses.some(function (excludeClass) {
      return excludeClass == clazz;
    });
  }).join(' ');
}

function getStates() {
  if (isSuccess()) {
    return 'success';
  }
  if (isActive()) {
    return 'active';
  }
}

function isProgress() {
  return hasClass('progress');
}

function init(optsValue, optsTotal) {
  if (tag.value == null) {
    tag.value = optsValue || 0;
  }
  if (optsTotal > 0) {
    total = optsTotal;
  }
  tag.percent = getPercent();
  lastValue = tag.value;
  lastOptsValue = optsValue;
}

function getPercent() {
  return parseInt(tag.value / total * 100);
}

function isActive() {
  return hasClass('active') && tag.percent > 0 && tag.percent < 100;
}

function isSuccess() {
  return tag.percent == 100;
}

function hasClass(className) {
  return tag.root.classList.contains(className);
}
});

/***/ }),

/***/ "./tags/radio/su-radio-group.tag":
/*!***************************************!*\
  !*** ./tags/radio/su-radio-group.tag ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

riot.tag2('su-radio-group', '<yield></yield>', '', '', function(opts) {
'use strict';

var tag = this;
// ===================================================================================
//                                                                      Tag Properties
//                                                                      ==============
tag.defaultValue = '';
tag.label = '';
tag.value = '';

// ===================================================================================
//                                                                         Tag Methods
//                                                                         ===========
tag.changed = changed;
tag.on('mount', onMount);
tag.on('update', onUpdate);
tag.reset = reset;

// ===================================================================================
//                                                                          Properties
//                                                                          ==========
var lastOptsValue = void 0;
var lastValue = void 0;

// ===================================================================================
//                                                                             Methods
//                                                                             =======
function onMount() {
  if (typeof opts.riotValue === 'undefined' && typeof opts.value !== 'undefined') {
    opts.riotValue = opts.value;
  }
  if (tag.value) {
    opts.riotValue = tag.value;
  } else {
    tag.value = opts.riotValue;
  }
  lastValue = tag.value;
  lastOptsValue = tag.value;

  var radios = tag.tags['su-radio'];
  if (!Array.isArray(radios)) {
    radios = [radios];
  }
  radios.forEach(function (radio) {
    initializeChild(radio);
  });

  tag.defaultValue = tag.value;
  tag.update();
}

function onUpdate() {
  var changed = false;
  if (lastValue != tag.value) {
    opts.riotValue = tag.value;
    lastOptsValue = tag.value;
    lastValue = tag.value;
    changed = true;
  } else if (lastOptsValue != opts.riotValue) {
    tag.value = opts.riotValue;
    lastOptsValue = opts.riotValue;
    lastValue = opts.riotValue;
    changed = true;
  }

  var radios = tag.tags['su-radio'];

  if (!Array.isArray(radios)) {
    radios = [radios];
  }
  radios.forEach(function (radio) {
    updateState(radio);
  });

  if (changed) {
    tag.trigger('change', tag.value);
  }
}

function reset() {
  tag.value = tag.defaultValue;
}

function changed() {
  return tag.value !== tag.defaultValue;
}

function updateState(radio) {
  if (typeof radio.opts.value === 'undefined') {
    return;
  }
  radio.checked = tag.value == radio.opts.value;
  if (radio.checked) {
    tag.label = radio.root.getElementsByTagName('label')[0].innerText;
  }
}

function initializeChild(radio) {
  radio.opts.name = getRadioName();
  radio.on('click', function (value) {
    tag.value = value;
    tag.update();
  });
}

function getRadioName() {
  return 'su-radio-name-' + tag._riot_id;
}
});

/***/ }),

/***/ "./tags/radio/su-radio.tag":
/*!*********************************!*\
  !*** ./tags/radio/su-radio.tag ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

riot.tag2('su-radio', '<input type="radio" name="{name}" riot-value="{value}" checked="{checked}" onclick="{click}" ref="target" id="{getId()}"> <label if="{!opts.label}" for="{getId()}"><yield></yield></label> <label if="{opts.label}" for="{getId()}">{opts.label}</label>', 'su-radio.ui.checkbox label,[data-is="su-radio"].ui.checkbox label{ cursor: pointer; } su-radio.ui.read-only input[type="radio"],[data-is="su-radio"].ui.read-only input[type="radio"],su-radio.ui.disabled input[type="radio"],[data-is="su-radio"].ui.disabled input[type="radio"]{ cursor: default !important; }', 'class="ui {radio: isRadio()} checkbox {opts.class}"', function(opts) {
'use strict';

var tag = this;
// ===================================================================================
//                                                                      Tag Properties
//                                                                      ==============
tag.checked = false;
tag.name = '';

// ===================================================================================
//                                                                         Tag Methods
//                                                                         ===========
tag.click = click;
tag.getId = getId;
tag.isDisabled = isDisabled;
tag.isRadio = isRadio;
tag.on('mount', onMount);
tag.on('update', onUpdate);

// ===================================================================================
//                                                                          Properties
//                                                                          ==========
var lastChecked = void 0;
var lastOptsCheck = void 0;

// ===================================================================================
//                                                                             Methods
//                                                                             =======
function onMount() {
  if (tag.checked) {
    opts.checked = tag.checked;
  } else {
    tag.checked = opts.checked === true || opts.checked === 'checked' || opts.checked === 'true';
  }
  lastChecked = tag.checked;
  lastOptsCheck = opts.checked;
  tag.update();
}

function onUpdate() {
  tag.name = opts.name;
  tag.value = opts.value;
  if (lastChecked != tag.checked) {
    opts.checked = tag.checked;
    lastChecked = tag.checked;
  } else if (lastOptsCheck != opts.checked) {
    tag.checked = opts.checked;
    lastOptsCheck = opts.checked;
  }
}

function click(event) {
  if (isReadOnly() || tag.isDisabled()) {
    event.preventDefault();
    return;
  }
  tag.checked = event.target.checked;
  tag.trigger('click', event.target.value);
}

function isReadOnly() {
  return tag.root.classList.contains('read-only');
}

function getId() {
  return 'su-radio-' + tag._riot_id;
}

function isDisabled() {
  return tag.root.classList.contains('disabled');
}

function isRadio() {
  return !tag.root.classList.contains('slider');
}
});

/***/ }),

/***/ "./tags/rating/su-rating.tag":
/*!***********************************!*\
  !*** ./tags/rating/su-rating.tag ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

riot.tag2('su-rating', '<i class="icon {active: item.active} {selected: item.selected}" each="{item in items}" onclick="{click.bind(this, item)}" onmouseover="{mouseover.bind(this, item)}" onmouseout="{mouseout}"></i>', '', 'class="ui rating {opts.class}"', function(opts) {
'use strict';

var tag = this;
// ===================================================================================
//                                                                      Tag Properties
//                                                                      ==============
tag.items = [];

// ===================================================================================
//                                                                         Tag Methods
//                                                                         ===========
tag.reset = reset;
tag.changed = changed;
tag.click = click;
tag.mouseout = mouseout;
tag.mouseover = mouseover;
tag.on('mount', onMount);
tag.on('update', onUpdate);

// ===================================================================================
//                                                                          Properties
//                                                                          ==========

// ===================================================================================
//                                                                             Methods
//                                                                             =======
function onMount() {
  init(opts.max, opts.value);
}

function onUpdate() {
  updateView();
}

function reset() {
  tag.value = tag.defaultValue;
}

function changed() {
  return tag.value != tag.defaultValue;
}

function click(target) {
  if (isReadOnly()) {
    return;
  }
  var valueChanged = false;
  var beforeValue = void 0;
  if (tag.value != target.value) {
    beforeValue = tag.value;
    valueChanged = true;
  }
  tag.value = target.value;
  updateView();
  parentUpdate();
  tag.trigger('click', target.value);
  if (valueChanged) {
    tag.trigger('change', { value: tag.value, beforeValue: beforeValue });
  }
}

function mouseover(target) {
  if (isReadOnly()) {
    return;
  }
  tag.items.forEach(function (item) {
    item.selected = item.value <= target.value;
  });
}

function mouseout() {
  tag.items.forEach(function (item) {
    item.selected = false;
  });
}

function isReadOnly() {
  return tag.root.classList.contains('read-only');
}

function init() {
  var max = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 5;
  var value = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

  tag.value = value;
  tag.defaultValue = value;
  tag.items.length = 0;
  for (var i = 0; i < max; i++) {
    tag.items[i] = { value: i + 1, active: false, selected: false };
  }
  updateView();
  parentUpdate();
}

function updateView() {
  tag.items.forEach(function (item) {
    item.active = item.value <= tag.value;
  });
}

function parentUpdate() {
  if (tag.parent) {
    tag.parent.update();
  } else {
    tag.update();
  }
}
});

/***/ }),

/***/ "./tags/tab/su-tab-header.tag":
/*!************************************!*\
  !*** ./tags/tab/su-tab-header.tag ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

riot.tag2('su-tab-header', '<yield></yield>', '', 'class="ui {opts.class} menu"', function(opts) {
});

/***/ }),

/***/ "./tags/tab/su-tab-title.tag":
/*!***********************************!*\
  !*** ./tags/tab/su-tab-title.tag ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

riot.tag2('su-tab-title', '<a class="{opts.class} {active: active} item" onclick="{click}" ref="item"> <yield></yield> </a>', '', '', function(opts) {
"use strict";

var tag = this;
// ===================================================================================
//                                                                      Tag Properties
//                                                                      ==============
tag.active = false;

// ===================================================================================
//                                                                         Tag Methods
//                                                                         ===========
tag.click = click;

// ===================================================================================
//                                                                          Properties
//                                                                          ==========

// ===================================================================================
//                                                                             Methods
//                                                                             =======
function click() {
  tag.parent.parent.clickForTitle(tag.refs.item.innerText);
}
});

/***/ }),

/***/ "./tags/tab/su-tab.tag":
/*!*****************************!*\
  !*** ./tags/tab/su-tab.tag ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

riot.tag2('su-tab', '<virtual if="{mounted}"><yield></yield></virtual>', 'su-tab.ui.segment,[data-is="su-tab"].ui.segment{ margin-top: 0; margin-bottom: 0; } su-tab.ui.segment.top.attached,[data-is="su-tab"].ui.segment.top.attached{ margin-top: 0 } su-tab.ui.segment.bottom.attached,[data-is="su-tab"].ui.segment.bottom.attached{ margin-bottom: 0 }', 'class="ui {opts.class} {active: active} tab"', function(opts) {
'use strict';

var tag = this;
// ===================================================================================
//                                                                      Tag Properties
//                                                                      ==============
tag.active = false;
tag.mounted = false;

// ===================================================================================
//                                                                         Tag Methods
//                                                                         ===========
tag.on('mount', onMount);
tag.on('update', onUpdate);

// ===================================================================================
//                                                                          Properties
//                                                                          ==========

// ===================================================================================
//                                                                             Methods
//                                                                             =======
function onMount() {
  tag.update();
}
function onUpdate() {
  if (tag.active && !tag.mounted) {
    tag.mounted = true;
  }
}
});

/***/ }),

/***/ "./tags/tab/su-tabset.tag":
/*!********************************!*\
  !*** ./tags/tab/su-tabset.tag ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

riot.tag2('su-tabset', '<div class="ui {opts.class} {getClass()} menu" if="{!isBottom() && !hasTitle()}"> <a each="{tab, i in tabs}" class="{tab.opts.titleClass} {active: tab.active} item" onclick="{click}">{tab.opts.label}</a> </div> <yield></yield> <div class="ui {opts.class} {getClass()} menu" if="{isBottom() && !hasTitle()}"> <a each="{tab, i in tabs}" class="{tab.opts.titleClass} {active: tab.active} item" onclick="{click}">{tab.opts.label}</a> </div>', '', '', function(opts) {
'use strict';

var tag = this;
// ===================================================================================
//                                                                      Tag Properties
//                                                                      ==============
tag.tabs = [];

// ===================================================================================
//                                                                         Tag Methods
//                                                                         ===========
tag.click = click;
tag.clickForTitle = clickForTitle;
tag.getClass = getClass;
tag.hasTitle = hasTitle;
tag.isBottom = isBottom;
tag.on('mount', onMount);
tag.on('update', onUpdate);

// ===================================================================================
//                                                                          Properties
//                                                                          ==========
var lastOptsActive = void 0,
    lastActive = void 0,
    active = void 0;
var shownMessage = false;

// ===================================================================================
//                                                                             Methods
//                                                                             =======
function onMount() {
  if (tag.tags['su-tab-header']) {
    tag.tags['su-tab-header'].opts.class = getTitleClass();
  }

  tag.tabs = tag.tags['su-tab'];
  if (typeof tag.tabs === 'undefined') {
    return;
  }
  if (!Array.isArray(tag.tabs)) {
    tag.tabs = [tag.tabs];
  }
  supportTraditionalOptions();

  if (typeof opts.active === 'undefined') {
    var titles = tag.hasTitle();
    if (titles) {
      opts.active = titles[0].root.innerText.trim();
    } else {
      opts.active = tag.tabs[0].opts.label;
    }
  }

  tag.tabs.forEach(function (tab) {
    initializeChild(tab);
  });

  tag.update();
}

function onUpdate() {
  supportTraditionalOptions();
  var changed = false;
  if (lastOptsActive != opts.active) {
    lastOptsActive = opts.active;
    active = opts.active;
    changed = true;
  }
  if (lastActive != active) {
    lastActive = active;
    changed = true;
  }

  if (changed) {
    var titles = tag.hasTitle();
    if (titles) {
      var index = void 0;
      titles.forEach(function (title, i) {
        title.active = false;
        if (title.root.innerText.trim() === active.trim()) {
          title.active = true;
          index = i;
        }
      });
      if (!titles.some(function (title) {
        return title.active;
      })) {
        titles[0].active = true;
        index = 0;
      }
      tag.tabs.forEach(function (tab, i) {
        tab.active = index == i;
      });
    } else {
      tag.tabs.forEach(function (tab) {
        tab.active = tab.opts.label == active;
      });
      if (!tag.tabs.some(function (tab) {
        return tab.active;
      })) {
        tag.tabs[0].active = true;
      }
    }
  }
}

function click(event) {
  active = event.item.tab.opts.label;
  tag.update();
  tag.trigger('click', active);
}

function clickForTitle(title) {
  active = title;
  tag.update();
  tag.trigger('click', active);
}

function isBottom() {
  return hasClass('bottom');
}

function hasTitle() {
  if (!tag.tags['su-tab-header']) {
    return false;
  }
  var titles = tag.tags['su-tab-header'].tags['su-tab-title'];
  if (!titles) {
    return false;
  }

  if (!Array.isArray(titles)) {
    return [titles];
  }
  return titles;
}

function getClass() {
  if (hasClass('tabular') && !hasClass('attached')) {
    return 'attached';
  }
}

function initializeChild(tab) {
  tab.mounted = !opts.lazyMount;
  if (tab.opts.class) {
    return;
  }
  var classList = hasClass('no-segment') ? [] : ['segment'];
  if (hasClass('tabular')) {
    classList.push('tabular');
  }
  if ((hasClass('attached') || hasClass('tabular')) && !hasClass('left') && !hasClass('right')) {
    if (hasClass('bottom')) {
      classList.push('top');
    } else {
      classList.push('bottom');
    }
    classList.push('attached');
  }
  tab.opts.class = classList.join(' ');
}

function getTitleClass() {
  var classList = [];
  if (hasClass('left') || hasClass('right')) {
    classList.push('vertical');
    classList.push('fluid');
  }
  if (hasClass('left')) {
    classList.push('left');
  }
  if (hasClass('right')) {
    classList.push('right');
  }
  if (hasClass('tabular')) {
    classList.push('tabular');
  }
  return classList.join(' ');
}

function hasClass(className) {

  return tag.root.classList.contains(className);
}

function supportTraditionalOptions() {
  tag.tabs.forEach(function (tab) {
    if (typeof tab.opts.title !== 'undefined') {
      if (!shownMessage) {
        console.warn('\'title\' attribute is deprecated. Please use \'label\'.');
      }
      shownMessage = true;
      tab.opts.label = tab.opts.title;
      tab.opts.title = undefined;
    }
  });
}
});

/***/ }),

/***/ "./tags/table/su-table.tag":
/*!*********************************!*\
  !*** ./tags/table/su-table.tag ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

riot.tag2('su-table', '', '', '', function(opts) {
'use strict';

var tag = this;
// ===================================================================================
//                                                                      Tag Properties
//                                                                      ==============

// ===================================================================================
//                                                                         Tag Methods
//                                                                         ===========
tag.on('mount', onMount);
tag.on('update', onUpdate);

// ===================================================================================
//                                                                          Properties
//                                                                          ==========
var lastData = void 0;
var lastCondition = {};
var headers = void 0;
var suTableIndex = 'su-table-index';

// ===================================================================================
//                                                                             Methods
//                                                                             =======
function onMount() {
  headers = tag.tags['su-th'];
  if (!Array.isArray(headers)) {
    headers = headers ? [headers] : [];
  }

  headers.forEach(function (th) {
    th.on('click', function (field) {
      sort(field);

      headers.forEach(function (th) {
        th.sorted = th.opts.field == lastCondition.field;
        th.reverse = lastCondition.reverse;
      });
      tag.update();
    });
  });
  tag.update();
}

function onUpdate() {
  if (JSON.stringify(lastData) != JSON.stringify(opts.data)) {
    lastData = opts.data;
    lastCondition = {
      field: suTableIndex,
      reverse: false
    };

    if (opts.defaultSortField) {
      if (opts.defaultSortReverse) {
        lastCondition.field = opts.defaultSortField;
        lastCondition.reverse = false;
      }
      sort(opts.defaultSortField);

      headers.forEach(function (th) {
        th.sorted = th.opts.field == lastCondition.field;
        th.reverse = lastCondition.reverse;
      });
      tag.update();
    }
  }
}

function sort(field) {
  addIndexField(opts.data);
  var condition = generateCondition(field, lastCondition);
  opts.data.sort(sortBy(condition));
  lastCondition = condition;
}

function generateCondition(field, condition) {
  if (condition.field === field) {
    if (!condition.reverse) {
      condition.reverse = true;
    } else {
      condition.reverse = false;
      condition.field = suTableIndex;
    }
  } else {
    condition.reverse = false;
    condition.field = field;
  }

  return condition;
}

function sortBy(condition) {
  var field = condition.field;
  var reverse = condition.reverse ? -1 : 1;
  var nullsFirst = opts.nullsFirst ? -1 : 1;
  return function (ason, bson) {
    var a = ason[field];
    var b = bson[field];

    if (a == null) {
      return reverse * nullsFirst;
    }
    if (b == null) {
      return reverse * nullsFirst * -1;
    }
    if (a < b) {
      return reverse * -1;
    }
    if (a > b) {
      return reverse;
    }

    return ason[suTableIndex] - bson[suTableIndex];
  };
}

function addIndexField(json) {
  json.forEach(function (data, index) {
    if (data[suTableIndex] === undefined) {
      data[suTableIndex] = index;
    }
  });
}
});

/***/ }),

/***/ "./tags/table/su-th.tag":
/*!******************************!*\
  !*** ./tags/table/su-th.tag ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

riot.tag2('su-th', '', '', 'onclick="{click}" class="{sorted: sorted} {ascending: sorted && !reverse} {descending: sorted && reverse}"', function(opts) {
'use strict';

var tag = this;
// ===================================================================================
//                                                                      Tag Properties
//                                                                      ==============

// ===================================================================================
//                                                                         Tag Methods
//                                                                         ===========
tag.click = click;

// ===================================================================================
//                                                                          Properties
//                                                                          ==========

// ===================================================================================
//                                                                             Methods
//                                                                             =======
function click() {
  tag.trigger('click', opts.field);
}
});

/***/ }),

/***/ "./tags/toast/su-toast-item.tag":
/*!**************************************!*\
  !*** ./tags/toast/su-toast-item.tag ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports) {

riot.tag2('su-toast-item', '<div class=" {position} floated" if="{!hide}"> <div class="ui attached active progress {className} top" if="{progress == \'top\'}"> <div class="bar"></div> </div> <div class="ui {icon: icon} {className} floating compact message"> <i class="close icon" onclick="{close}"></i> <i class="{icon} icon" if="{icon}"></i> <div class="content"> <div class="header" if="{title}"> {title} </div> <p each="{message in messages}">{message}</p> </div> </div> <div class="ui attached active progress {className} bottom" if="{progress == \'bottom\'}"> <div class="bar"></div> </div> </div>', 'su-toast-item .ui.message,[data-is="su-toast-item"] .ui.message{ margin: 0 } @-webkit-keyframes progress-active { 0% { -webkit-transform: scale(0, 1); transform: scale(0, 1); } 100% { -webkit-transform: scale(1); transform: scale(1); } } @keyframes progress-active { 0% { -webkit-transform: scale(0, 1); transform: scale(0, 1); } 100% { -webkit-transform: scale(1); transform: scale(1); } } su-toast-item .attached.progress,[data-is="su-toast-item"] .attached.progress{ z-index: 1; } su-toast-item .attached.progress .bar,[data-is="su-toast-item"] .attached.progress .bar{ min-width: 0%; width: 100%; } su-toast-item .active.progress .bar:after,[data-is="su-toast-item"] .active.progress .bar:after,su-toast-item .ui.progress.success .bar:after,[data-is="su-toast-item"] .ui.progress.success .bar:after,su-toast-item .ui.progress.warning .bar:after,[data-is="su-toast-item"] .ui.progress.warning .bar:after,su-toast-item .ui.progress.error .bar:after,[data-is="su-toast-item"] .ui.progress.error .bar:after{ animation: progress-active 3.5s infinite !important; -webkit-transform-origin: left; transform-origin: left; opacity: 0.3 !important; } su-toast-item .bottom.attached.progress,[data-is="su-toast-item"] .bottom.attached.progress{ margin: -3px 0 6px; } su-toast-item .top.attached.progress,[data-is="su-toast-item"] .top.attached.progress{ margin: 6px 0 -3px; }', 'class="item {transition}"', function(opts) {
'use strict';

var tag = this;
// ===================================================================================
//                                                                      Tag Properties
//                                                                      ==============
tag.position = isRight() ? 'right' : 'left';
tag.direction = isRight() ? 'left' : 'right';
tag.icon = opts.icon;
tag.progress = opts.progress;
tag.className = opts.className;
tag.transition = 'transition animating in fade ' + tag.direction;
tag.title = opts.title;
tag.messages = opts.messages;

// ===================================================================================
//                                                                         Tag Methods
//                                                                         ===========
tag.close = close;
tag.on('mount', onMount);

// ===================================================================================
//                                                                          Properties
//                                                                          ==========

// ===================================================================================
//                                                                             Methods
//                                                                             =======
function close() {
  tag.hide = true;
  tag.update();
}

function onMount() {
  setTimeout(function () {
    tag.transition = '';
    tag.update();
  }, 300);

  setTimeout(function () {
    tag.transition = 'transition animating out fade ' + tag.direction;
    tag.update();
  }, 3000);

  setTimeout(function () {
    tag.transition = 'transition hidden';
    tag.hide = true;
    tag.update();
  }, 3500);
}

function isRight() {
  var position = opts.position || '';
  return position.indexOf('right') >= 0;
}
});

/***/ }),

/***/ "./tags/toast/su-toast.tag":
/*!*********************************!*\
  !*** ./tags/toast/su-toast.tag ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

riot.tag2('su-toast', '<div class="ui list"> <su-toast-item each="{item in items}" icon="{item.icon}" progress="{item.progress}" class-name="{item.class}" title="{item.title}" messages="{item.messages}" position="{position}"></su-toast-item> </div>', 'su-toast,[data-is="su-toast"]{ position: fixed; padding: 1rem; z-index: 3000; } su-toast.right,[data-is="su-toast"].right{ right: 0; } su-toast.left,[data-is="su-toast"].left{ left: 0; } su-toast.top,[data-is="su-toast"].top{ top: 0; } su-toast.bottom,[data-is="su-toast"].bottom{ bottom: 0; } su-toast.middle,[data-is="su-toast"].middle{ top: 50%; margin-top: -35px; } su-toast.center,[data-is="su-toast"].center{ left: 50%; margin-left: 150px; } su-toast .ui.message,[data-is="su-toast"] .ui.message{ min-width: 20rem; position: relative; padding-right: 2.5rem; } su-toast .ui.icon.message,[data-is="su-toast"] .ui.icon.message{ width: auto !important; }', 'class="{position}"', function(opts) {
'use strict';

var tag = this;
// ===================================================================================
//                                                                      Tag Properties
//                                                                      ==============
tag.items = [];

// ===================================================================================
//                                                                         Tag Methods
//                                                                         ===========
tag.mixin('semantic-ui');
tag.observable.on('showToast', showToast);
tag.on('mount', onMount);
tag.on('update', onUpdate);

// ===================================================================================
//                                                                          Properties
//                                                                          ==========
riot.mixin({
  suToast: suToast
});

// ===================================================================================
//                                                                             Methods
//                                                                             =======
function onMount() {
  tag.update();
}

function onUpdate() {
  tag.position = opts.position || 'bottom right';
}

function showToast(option) {
  var item = {
    title: option.title,
    messages: Array.isArray(option.message) ? option.message : [option.message],
    icon: option.icon,
    progress: option.progress,
    class: option.class
  };
  tag.items.push(item);
  tag.update();

  setTimeout(function () {
    tag.items.shift();
    tag.update();
  }, 5000);
}

function suToast(param) {
  var option = {
    title: null,
    message: null,
    icon: null,
    progress: null,
    class: null
  };

  if (typeof param === 'string') {
    option.message = param;
  } else if (param) {
    if (param.title) {
      option.title = param.title;
    }
    if (param.message) {
      option.message = param.message;
    }
    if (param.icon) {
      option.icon = param.icon;
    }
    if (param.progress) {
      option.progress = param.progress;
    }
    if (param.class) {
      option.class = param.class;
    }
  }
  tag.observable.trigger('showToast', option);
}
});

/***/ }),

/***/ "./tags/validation-error/su-validation-error.tag":
/*!*******************************************************!*\
  !*** ./tags/validation-error/su-validation-error.tag ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

riot.tag2('su-validation-error', '<div if="{opts.errors && opts.errors[opts.name]}" class="ui basic pointing prompt label transition visible"> <div each="{message in opts.errors[opts.name]}">{message}</div> </div> <ul if="{!isEmptyErrors() && !opts.name}" class="list"> <virtual each="{errors in opts.errors}"> <li each="{message in errors}">{message}</li> </virtual> </ul>', 'su-validation-error.ui.error.message,[data-is="su-validation-error"].ui.error.message{ display: block !important; }', 'class="{getClass()}"', function(opts) {
'use strict';

var tag = this;
// ===================================================================================
//                                                                      Tag Properties
//                                                                      ==============

// ===================================================================================
//                                                                         Tag Methods
//                                                                         ===========
tag.getClass = getClass;
tag.isEmptyErrors = isEmptyErrors;

// ===================================================================================
//                                                                          Properties
//                                                                          ==========

// ===================================================================================
//                                                                             Methods
//                                                                             =======
function getClass() {
  if (opts.name || tag.isEmptyErrors()) {
    return '';
  }
  return 'ui error message';
}

function isEmptyErrors() {
  return !opts.errors || Object.keys(opts.errors).length == 0;
}
});

/***/ }),

/***/ "date-fns/add_days":
/*!**********************************************************************************************************************************************************!*\
  !*** external {"root":["dateFns","addDays"],"commonjs":"date-fns/add_days/index","commonjs2":"date-fns/add_days/index","amd":"date-fns/add_days/index"} ***!
  \**********************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_date_fns_add_days__;

/***/ }),

/***/ "date-fns/add_months":
/*!******************************************************************************************************************************************************************!*\
  !*** external {"root":["dateFns","addMonths"],"commonjs":"date-fns/add_months/index","commonjs2":"date-fns/add_months/index","amd":"date-fns/add_months/index"} ***!
  \******************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_date_fns_add_months__;

/***/ }),

/***/ "date-fns/format":
/*!***************************************************************************************************************************************************!*\
  !*** external {"root":["dateFns","format"],"commonjs":"date-fns/format/index","commonjs2":"date-fns/format/index","amd":"date-fns/format/index"} ***!
  \***************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_date_fns_format__;

/***/ }),

/***/ "date-fns/is_same_day":
/*!*********************************************************************************************************************************************************************!*\
  !*** external {"root":["dateFns","isSameDay"],"commonjs":"date-fns/is_same_day/index","commonjs2":"date-fns/is_same_day/index","amd":"date-fns/is_same_day/index"} ***!
  \*********************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_date_fns_is_same_day__;

/***/ }),

/***/ "date-fns/is_today":
/*!**********************************************************************************************************************************************************!*\
  !*** external {"root":["dateFns","isToday"],"commonjs":"date-fns/is_today/index","commonjs2":"date-fns/is_today/index","amd":"date-fns/is_today/index"} ***!
  \**********************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_date_fns_is_today__;

/***/ }),

/***/ "date-fns/parse":
/*!***********************************************************************************************************************************************!*\
  !*** external {"root":["dateFns","parse"],"commonjs":"date-fns/parse/index","commonjs2":"date-fns/parse/index","amd":"date-fns/parse/index"} ***!
  \***********************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_date_fns_parse__;

/***/ }),

/***/ "date-fns/start_of_month":
/*!*********************************************************************************************************************************************************************************!*\
  !*** external {"root":["dateFns","startOfMonth"],"commonjs":"date-fns/start_of_month/index","commonjs2":"date-fns/start_of_month/index","amd":"date-fns/start_of_month/index"} ***!
  \*********************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_date_fns_start_of_month__;

/***/ })

/******/ });
});