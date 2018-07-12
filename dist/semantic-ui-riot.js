(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["SemanticUiRiot"] = factory();
	else
		root["SemanticUiRiot"] = factory();
})(window, function() {
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
};

__webpack_require__(/*! ../tags/accordion/su-accordion.tag */ "./tags/accordion/su-accordion.tag");

__webpack_require__(/*! ../tags/accordion/su-accordionset.tag */ "./tags/accordion/su-accordionset.tag");

__webpack_require__(/*! ../tags/checkbox/su-checkbox.tag */ "./tags/checkbox/su-checkbox.tag");

__webpack_require__(/*! ../tags/datepicker/su-datepicker.tag */ "./tags/datepicker/su-datepicker.tag");

__webpack_require__(/*! ../tags/dropdown/su-dropdown.tag */ "./tags/dropdown/su-dropdown.tag");

__webpack_require__(/*! ../tags/dropdown/su-select.tag */ "./tags/dropdown/su-select.tag");

__webpack_require__(/*! ../tags/modal/su-modal.tag */ "./tags/modal/su-modal.tag");

__webpack_require__(/*! ../tags/popup/su-popup.tag */ "./tags/popup/su-popup.tag");

__webpack_require__(/*! ../tags/radio/su-radio-group.tag */ "./tags/radio/su-radio-group.tag");

__webpack_require__(/*! ../tags/radio/su-radio.tag */ "./tags/radio/su-radio.tag");

__webpack_require__(/*! ../tags/tab/su-tab-header.tag */ "./tags/tab/su-tab-header.tag");

__webpack_require__(/*! ../tags/tab/su-tab-title.tag */ "./tags/tab/su-tab-title.tag");

__webpack_require__(/*! ../tags/tab/su-tab.tag */ "./tags/tab/su-tab.tag");

__webpack_require__(/*! ../tags/tab/su-tabset.tag */ "./tags/tab/su-tabset.tag");

var options = {};

riot.mixin({
  defaultOptions: options
});

/***/ }),

/***/ "./tags/accordion/su-accordion.tag":
/*!*****************************************!*\
  !*** ./tags/accordion/su-accordion.tag ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

riot.tag2('su-accordion', '<div class="title {active: active}" click="{click}"> <i class="dropdown icon"></i> {opts.title} </div> <div class="content active {open : active} {close : !active}"> <yield></yield> </div>', '', '', function(opts) {
'use strict';

var _this = this;

this.active = false;

this.click = function () {
  _this.trigger('click', _this);
};
});

/***/ }),

/***/ "./tags/accordion/su-accordionset.tag":
/*!********************************************!*\
  !*** ./tags/accordion/su-accordionset.tag ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

riot.tag2('su-accordionset', '<yield></yield>', 'su-accordionset,[data-is="su-accordionset"]{ display: block; } su-accordionset.ui.accordion .title~.content:not(.ui).close,[data-is="su-accordionset"].ui.accordion .title~.content:not(.ui).close{ padding-top: 0; padding-bottom: 0; } su-accordionset .content.close *,[data-is="su-accordionset"] .content.close *{ line-height: 0 !important; opacity: 0 !important; visibility: hidden !important; padding-top:0 !important; padding-bottom:0 !important; margin-top: 0 !important; margin-bottom: 0 !important; min-height: 0!important; transition: all 300ms 0s linear !important; } su-accordionset .content.close .dropdown.icon,[data-is="su-accordionset"] .content.close .dropdown.icon{ height: 0 !important; transition: height 300ms 0s linear !important; } su-accordionset .content.open *,[data-is="su-accordionset"] .content.open *{ line-height: 1.4285; opacity: 1; visibility: visible; transition: all 300ms 0s linear !important; } su-accordionset .content.open .dropdown.icon,[data-is="su-accordionset"] .content.open .dropdown.icon{ height: 1.4285 !important; transition: height 300ms 0s linear !important; }', 'class="ui accordion {opts.class}"', function(opts) {
'use strict';

var _this = this;

this.accordions = [];

this.on('mount', function () {
  _this.accordions = _this.tags['su-accordion'];

  if (!Array.isArray(_this.accordions)) {
    _this.accordions = [_this.accordions];
  }
  var defaultActive = false;
  _this.accordions.forEach(function (accordion) {

    initializeChild(accordion);
    if (accordion.opts.active) {
      defaultActive = true;
      accordion.active = true;
    }
  });
  if (!defaultActive) {
    _this.accordions[0].active = true;
  }

  _this.update();
});

// ===================================================================================
//                                                                               Logic
//                                                                               =====
var initializeChild = function initializeChild(child) {
  child.on('click', function (target) {
    var active = target.active;
    _this.accordions.forEach(function (accordion) {
      if (accordion.active) {
        accordion.active = false;
      }
    });
    target.active = !active;
    _this.update();
    _this.trigger('click', target);
  });
};
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

var _this = this;

this.checked = false;
this.defaultChecked = false;
var lastChecked = void 0;
var lastOptsChecked = void 0;

this.on('mount', function () {
  supportTraditionalOptions();
  if (_this.checked) {
    opts.checked = _this.checked;
  } else {
    _this.checked = normalizeOptChecked();
  }
  lastChecked = _this.checked;
  lastOptsChecked = _this.checked;
  _this.defaultChecked = _this.checked;
  _this.update();
});

this.on('update', function () {
  supportTraditionalOptions();
  if (lastChecked != _this.checked) {
    opts.checked = _this.checked;
    lastChecked = _this.checked;
    lastOptsChecked = _this.checked;
    parentUpdate();
  } else if (lastOptsChecked != normalizeOptChecked()) {
    _this.checked = normalizeOptChecked();
    lastChecked = _this.checked;
    lastOptsChecked = _this.checked;
    parentUpdate();
  }
});

// ===================================================================================
//                                                                               State
//                                                                               =====
this.reset = function () {
  _this.checked = _this.defaultChecked;
};

this.changed = function () {
  return _this.checked !== _this.defaultChecked;
};

// ===================================================================================
//                                                                               Event
//                                                                               =====
this.click = function () {
  if (isReadOnly() || _this.isDisabled()) {
    event.preventDefault();
    return;
  }
  _this.checked = !_this.checked;
  parentUpdate();
  _this.trigger('click', _this.checked);
};

// ===================================================================================
//                                                                              Helper
//                                                                              ======
this.getId = function () {
  return 'su-checkbox-' + _this._riot_id;
};

this.isDisabled = function () {
  return _this.root.classList.contains('disabled');
};

// ===================================================================================
//                                                                               Logic
//                                                                               =====
var isReadOnly = function isReadOnly() {
  return _this.root.classList.contains('read-only');
};

var parentUpdate = function parentUpdate() {
  if (_this.parent) {
    _this.parent.update();
  }
};

var shownMessage = false;
var supportTraditionalOptions = function supportTraditionalOptions() {
  if (typeof opts.check !== 'undefined') {
    if (!shownMessage) {
      console.warn('\'check\' attribute is deprecated. Please use \'checked\'.');
    }
    shownMessage = true;
    opts.checked = opts.check;
    opts.check = undefined;
  }
};

var normalizeOptChecked = function normalizeOptChecked() {
  return opts.checked === true || opts.checked === 'checked' || opts.checked === 'true';
};
});

/***/ }),

/***/ "./tags/datepicker/su-datepicker.tag":
/*!*******************************************!*\
  !*** ./tags/datepicker/su-datepicker.tag ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

riot.tag2('su-datepicker', '<div class="ui {dropdown:opts.popup}"> <div class="ui action input {disabled: isDisabled()}" if="{opts.popup}"> <input type="text" placeholder="{opts.placeholder}" ref="input" tabindex="{getTabindex()}" readonly="{isReadOnly()}"> <button class="ui icon button {disabled: isDisabled()}" click="{toggle}" onblur="{blur}"> <i class="calendar icon"></i> </button> </div> <div class="menu transition {transitionStatus}" onmousedown="{mousedown}" onmouseup="{mouseup}" onblur="{blur}" tabindex="{getTabindex()}"> <div class="ui compact segments"> <div class="ui center aligned secondary segment"> <div class="ui buttons dp-navigation"> <button class="icon tiny ui button {disabled: isDisabled()} prev" click="{clickPrevious}"> <i class="chevron left icon"></i> </button> <button class="ui button {disabled: isDisabled()} month" click="{selectMonth}">{getCurrentMonthView()}</button> <button class="ui button {disabled: isDisabled()} year" click="{selectYear}">{getCurrentYear()}</button> <button class="icon tiny ui button {disabled: isDisabled()} next" click="{clickNext}"> <i class="chevron right icon"></i> </button> </div> <div class="dp-wrapper"> <div each="{week in getWeekNames()}" class="dp-weekday">{week}</div> </div> </div> <div class="ui center aligned segment" if="{!yearSelecting && !monthSelecting}"> <div each="{week in weeks}" class="dp-wrapper"> <div each="{day in week.days}" class="dp-day"> <button class="ui button {today: isToday(day)} {primary: isActive(day)} {non-active: !isActive(day)} {disabled: day.getMonth() != getCurrentMonth() || isDisabled()}" click="{clickDay}">{day.getDate()}</button> </div> </div> </div> <div class="ui center aligned segment" if="{!yearSelecting && !monthSelecting}"> <div class="ui two column grid"> <div class="column dp-clear"> <button type="button" class="ui icon fluid button {disabled : isDisabled()}" click="{clickClear}"><i class="times icon"></i></button></div> <div class="column dp-today"> <button type="button" class="ui icon fluid button {disabled : isDisabled()}" click="{clickToday}"><i class="calendar check icon"></i></button></div> </div> </div> <div class="ui center aligned segment" if="{monthSelecting}"> <div each="{element in months}" class="dp-wrapper"> <div each="{month in element}" class="dp-month"><button class="ui button {disabled : isDisabled()}" click="{clickMonth}">{month.label}</button></div> </div> </div> <div class="ui center aligned segment" if="{yearSelecting}"> <div each="{element in years}" class="dp-wrapper"> <div each="{year in element}" class="dp-month"><button class="ui button {disabled : isDisabled()}" click="{clickYear}">{year}</button></div> </div> </div> </div> </div> </div>', 'su-datepicker .ui.segment,[data-is="su-datepicker"] .ui.segment{ padding-top: 0.5rem; padding-bottom: 0.5rem; } su-datepicker .ui.buttons.dp-navigation,[data-is="su-datepicker"] .ui.buttons.dp-navigation{ margin-bottom: 0.4rem; } su-datepicker .ui.dropdown,[data-is="su-datepicker"] .ui.dropdown{ display: block; } su-datepicker .dp-wrapper,[data-is="su-datepicker"] .dp-wrapper{ display: flex; } su-datepicker .dp-day,[data-is="su-datepicker"] .dp-day,su-datepicker .dp-month,[data-is="su-datepicker"] .dp-month{ cursor: pointer; } su-datepicker .dp-weekday,[data-is="su-datepicker"] .dp-weekday,su-datepicker .dp-day,[data-is="su-datepicker"] .dp-day,su-datepicker .dp-day .ui.button,[data-is="su-datepicker"] .dp-day .ui.button{ width: 2.5rem; } su-datepicker .dp-month,[data-is="su-datepicker"] .dp-month,su-datepicker .dp-month .ui.button,[data-is="su-datepicker"] .dp-month .ui.button{ width: 4.375rem; } su-datepicker .dp-day .ui.button,[data-is="su-datepicker"] .dp-day .ui.button,su-datepicker .dp-month .ui.button,[data-is="su-datepicker"] .dp-month .ui.button{ padding: 0; height: 2.5rem; font-weight: normal } su-datepicker .dp-day .ui.button.today,[data-is="su-datepicker"] .dp-day .ui.button.today{ font-weight: 700; } su-datepicker .dp-today .ui.button,[data-is="su-datepicker"] .dp-today .ui.button,su-datepicker .dp-clear .ui.button,[data-is="su-datepicker"] .dp-clear .ui.button,su-datepicker .dp-navigation .ui.button,[data-is="su-datepicker"] .dp-navigation .ui.button,su-datepicker .dp-month .ui.button,[data-is="su-datepicker"] .dp-month .ui.button,su-datepicker .dp-day .ui.button.non-active,[data-is="su-datepicker"] .dp-day .ui.button.non-active{ background-color: transparent; } su-datepicker .dp-today .ui.button:hover,[data-is="su-datepicker"] .dp-today .ui.button:hover,su-datepicker .dp-clear .ui.button:hover,[data-is="su-datepicker"] .dp-clear .ui.button:hover,su-datepicker .dp-navigation .ui.button:hover,[data-is="su-datepicker"] .dp-navigation .ui.button:hover,su-datepicker .dp-month .ui.button:hover,[data-is="su-datepicker"] .dp-month .ui.button:hover,su-datepicker .dp-day .ui.button.non-active:hover,[data-is="su-datepicker"] .dp-day .ui.button.non-active:hover{ background-color: #e0e1e2; } su-datepicker .dp-day .ui.button.disabled,[data-is="su-datepicker"] .dp-day .ui.button.disabled{ pointer-events: all !important; } su-datepicker .dp-navigation,[data-is="su-datepicker"] .dp-navigation{ width: 100%; } su-datepicker .dp-navigation .ui.button,[data-is="su-datepicker"] .dp-navigation .ui.button{ width: 20%; } su-datepicker .dp-navigation .ui.button.year,[data-is="su-datepicker"] .dp-navigation .ui.button.year,su-datepicker .dp-navigation .ui.button.month,[data-is="su-datepicker"] .dp-navigation .ui.button.month{ width: 30%; }', '', function(opts) {
'use strict';

var _this = this;

this.weeks = [];
this.value = null;
this.defaultValue = null;
this.transitionStatus = opts.popup ? 'hidden' : 'visible';
var visibleFlg = false;
var itemActivated = false;
var lastValue = null;
var lastOptsValue = null;
var lastOptsCurrentDate = null;
var yearRange = 20;

this.on('mount', function () {
  if (typeof opts.riotValue === 'undefined' && typeof opts.value !== 'undefined') {
    opts.riotValue = opts.value;
  }
  if (!_this.value) {
    _this.value = copyDate(opts.riotValue);
  }
  lastValue = copyDate(_this.value);
  lastOptsValue = copyDate(opts.riotValue);

  if (_this.value) {
    opts.currentDate = copyDate(_this.value);
  }
  if (!opts.currentDate) {
    opts.currentDate = new Date();
  }
  _this.months = getMonthes();
  _this.update();
  _this.defaultValue = _this.value;
});

this.on('update', function () {
  var changed = false;
  if (!isSameDay(lastValue, _this.value)) {
    lastValue = copyDate(_this.value);
    changed = true;
  } else if (!isSameDay(lastOptsValue, opts.riotValue)) {
    _this.value = copyDate(opts.riotValue);
    lastOptsValue = copyDate(opts.riotValue);
    lastValue = copyDate(opts.riotValue);
    changed = true;
  }

  if (changed && _this.value) {
    opts.currentDate = copyDate(_this.value);
  }
  if (!isSameDay(lastOptsCurrentDate, opts.currentDate)) {
    lastOptsCurrentDate = copyDate(opts.currentDate);
    generate();
  }
});

// ===================================================================================
//                                                                               State
//                                                                               =====
this.reset = function () {
  _this.value = _this.defaultValue;
};

this.changed = function () {
  return !isSameDay(_this.value, _this.defaultValue);
};

// ===================================================================================
//                                                                               Event
//                                                                               =====
this.selectMonth = function () {
  _this.yearSelecting = false;
  _this.monthSelecting = !_this.monthSelecting;
};

this.selectYear = function () {
  _this.years = getYears();
  _this.monthSelecting = false;
  _this.yearSelecting = !_this.yearSelecting;
};

this.clickDay = function (event) {
  if (_this.isReadOnly() || _this.isDisabled()) {
    return;
  }
  setDate(event.item.day);
  _this.trigger('click', _this.value);
};

this.clickMonth = function (event) {
  opts.currentDate.setMonth(event.item.month.value);
  _this.monthSelecting = false;
};

this.clickYear = function (event) {
  opts.currentDate.setYear(event.item.year);
  _this.selectMonth();
};

this.clickPrevious = function () {
  if (_this.yearSelecting) {
    addYear(-yearRange);
  } else {
    _this.monthSelecting = false;
    opts.currentDate = dateFns.addMonths(opts.currentDate, -1);
  }
};

this.clickNext = function () {
  if (_this.yearSelecting) {
    addYear(yearRange);
  } else {
    _this.monthSelecting = false;
    opts.currentDate = dateFns.addMonths(opts.currentDate, 1);
  }
};

this.clickClear = function () {
  setDate(null);
  _this.trigger('clear', _this.value);
};

this.clickToday = function () {
  setDate(new Date());
  _this.trigger('today', _this.value);
};

// -----------------------------------------------------
//                                          popup option
//                                          ------------
this.toggle = function () {
  if (_this.isReadOnly() || _this.isDisabled()) {
    return;
  }
  if (!visibleFlg) {
    open();
  } else {
    close();
  }
};

this.mousedown = function () {
  itemActivated = true;
};

this.mouseup = function () {
  itemActivated = false;
};

this.blur = function () {
  if (opts.popup && !itemActivated) {
    close();
  }
};

// ===================================================================================
//                                                                               Logic
//                                                                               =====
var generate = function generate() {
  var startOfMonth = dateFns.startOfMonth(opts.currentDate);
  var baseDate = dateFns.addDays(startOfMonth, -startOfMonth.getDay());
  var i = 0;
  _this.weeks = [];

  for (var r = 0; r < 6; r++) {
    var days = [];
    for (var c = 0; c < 7; c++) {
      days.push(dateFns.addDays(baseDate, i++));
    }
    _this.weeks.push({ days: days });
  }
};

var addYear = function addYear(year) {
  _this.years = _this.years.map(function (values) {
    values = values.map(function (value) {
      return value + year;
    });
    return values;
  });
};

var getYears = function getYears() {
  var years = [[], [], [], [], []];
  for (var index = 0; index < yearRange; index++) {
    years[(index - index % 4) / 4][index % 4] = opts.currentDate.getFullYear() + index - 9;
  }
  return years;
};

var getMonthes = function getMonthes() {
  var months = [[], [], []];
  var monthNames = range(12).map(function (month) {
    return dateFns.format(new Date(2018, month, 1), 'MMM', { locale: getLocale() });
  });
  monthNames.forEach(function (month, index) {
    months[(index - index % 4) / 4][index % 4] = {
      label: month,
      value: index
    };
  });
  return months;
};

var open = function open() {
  _this.transitionStatus = 'visible';
  visibleFlg = true;
  if (_this.value) {
    opts.currentDate = copyDate(_this.value);
  }
  if (!opts.currentDate) {
    opts.currentDate = new Date();
  }
  _this.trigger('open', _this.value);
};

var close = function close() {
  _this.transitionStatus = 'hidden';
  visibleFlg = false;
  _this.trigger('close', _this.value);
};

var setDate = function setDate(date) {
  _this.value = date;
  if (_this.refs.input) {
    _this.refs.input.value = _this.value ? dateFns.format(_this.value, getPattern(), { locale: getLocale() }) : null;
    close();
  }
  _this.trigger('change', _this.value);
};

var isSameDay = function isSameDay(d1, d2) {
  if (d1 == d2) {
    return true;
  }
  if (typeof d1 === 'undefined' || typeof d2 === 'undefined' || d1 === null || d2 === null) {
    return false;
  }
  return dateFns.isSameDay(d1, d2);
};

var copyDate = function copyDate(date) {
  if (!date) {
    return date;
  }
  return new Date(date.getTime());
};

// ===================================================================================
//                                                                              Helper
//                                                                              ======
this.getCurrentYear = function () {
  if (opts.currentDate) {
    return opts.currentDate.getFullYear();
  }
};

this.getCurrentMonthView = function () {
  if (opts.currentDate) {
    return dateFns.format(opts.currentDate, 'MMM', { locale: getLocale() });
  }
};

this.getCurrentMonth = function () {
  return opts.currentDate.getMonth();
};

this.getWeekNames = function () {
  return range(7, 1).map(function (day) {
    return dateFns.format(new Date(2018, 6, day), 'dd', { locale: getLocale() });
  });
};

this.isActive = function (date) {
  return isSameDay(_this.value, date);
};

this.isToday = function (date) {
  return dateFns.isToday(date);
};

this.getTabindex = function () {
  if (!opts.popup) {
    return false;
  }
  if (opts.tabindex) {
    return opts.tabindex;
  }
  return 0;
};

this.isReadOnly = function () {
  return _this.root.classList.contains('read-only');
};
this.isDisabled = function () {
  return _this.root.classList.contains('disabled');
};

var getPattern = function getPattern() {
  if (opts.pattern) {
    return opts.pattern;
  }
  if (_this.defaultOptions && _this.defaultOptions.pattern) {
    return _this.defaultOptions.pattern;
  }
  return 'YYYY-MM-DD';
};

var getLocale = function getLocale() {
  if (opts.locale) {
    return opts.locale;
  }
  if (_this.defaultOptions && _this.defaultOptions.locale) {
    return _this.defaultOptions.locale;
  }
};

var range = function range(size) {
  var startAt = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

  return Array.from(Array(size).keys()).map(function (i) {
    return i + startAt;
  });
};
});

/***/ }),

/***/ "./tags/dropdown/su-dropdown.tag":
/*!***************************************!*\
  !*** ./tags/dropdown/su-dropdown.tag ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

riot.tag2('su-dropdown', '<i class="dropdown icon"></i> <input class="search" autocomplete="off" tabindex="{getTabindex()}" ref="condition" if="{opts.search}" oninput="{input}" onclick="{stopPropagation}" onfocus="{focus}" onblur="{blur}" readonly="{isReadOnly()}"> <a each="{item in opts.items}" class="ui label transition visible" style="display: inline-block !important;" if="{item.selected}" onclick="{stopPropagation}"> {item.label} <i class="delete icon" onclick="{unselect}"></i> </a> <div class="{default: default} text {filtered: filtered}" if="{!opts.multiple || !selectedFlg}"> {label} </div> <div class="menu transition {transitionStatus}" onmousedown="{mousedown}" onmouseup="{mouseup}" onblur="{blur}" tabindex="-1"> <div each="{item in opts.items}" riot-value="{item.value}" default="{item.default}" onmousedown="{mousedown}" onmouseup="{mouseup}" class="{item: isItem(item)} {header: item.header && !filtered} {divider: item.divider && !filtered} {default: item.default} {hover: item.active} {active: item.value == value} {selected: item.value == value}" onclick="{itemClick}" if="{!(opts.multiple && item.default) && !item.selected}"> <i class="{item.icon} icon" if="{item.icon}"></i> <img class="ui avatar image" riot-src="{item.image}" if="{item.image}"> <span class="description" if="{item.description}">{item.description}</span> <span class="text">{item.label}</span> </div> <div class="message" if="{filtered && filteredItems.length == 0}">No results found.</div> </div>', 'su-dropdown.ui.dropdown .menu>.item.default,[data-is="su-dropdown"].ui.dropdown .menu>.item.default{ color: rgba(0, 0, 0, 0.4) } su-dropdown.ui.dropdown .menu>.item.hover,[data-is="su-dropdown"].ui.dropdown .menu>.item.hover{ background: rgba(0, 0, 0, .05); color: rgba(0, 0, 0, .95); }', 'class="ui selection {opts.class} {search: opts.search} {multiple: opts.multiple} dropdown {active: isActive()} {visible: isActive()}" onclick="{toggle}" onfocus="{focus}" onmousedown="{mousedown}" onmouseup="{mouseup}" onblur="{blur}" onkeydown="{keydown}" onkeyup="{keyup}" tabindex="{opts.search ? -1 : getTabindex()}"', function(opts) {
'use strict';

var _this = this;

this.selectedFlg = false;
this.filtered = false;
this.transitionStatus = 'hidden';
this.value = '';
this.label = '';
this.defaultValue = '';
var visibleFlg = false;
var keys = {
  enter: 13,
  escape: 27,
  upArrow: 38,
  downArrow: 40
};

if (opts.items && opts.items.length > 0) {
  this.label = opts.items[0].label;
  this.value = opts.items[0].value;
  this.default = opts.items[0].default;
}

this.on('mount', function () {
  if (typeof opts.riotValue === 'undefined' && typeof opts.value !== 'undefined') {
    opts.riotValue = opts.value;
  }
  if (typeof opts.riotValue !== 'undefined') {
    _this.value = opts.riotValue;
    _this.defaultValue = _this.value;
    _this.update();
    parentUpdate();
  } else {
    _this.defaultValue = _this.value;
  }
});

this.on('update', function () {
  if (opts.multiple) {
    opts.items.forEach(function (item) {
      return item.selected = false;
    });
    opts.items.filter(function (item) {
      return _this.value && _this.value.indexOf(item.value) >= 0;
    }).forEach(function (item) {
      return item.selected = true;
    });
    selectMultiTarget(true);
  } else if (opts.items) {
    var selected = opts.items.filter(function (item) {
      return item.value === _this.value;
    });
    if (selected && selected.length > 0) {
      var target = selected[0];
      if (_this.label !== target.label) {
        selectTarget(target, true);
      }
    } else if (opts.items && opts.items.length > 0) {
      if (_this.value != opts.items[0].value) {
        _this.value = opts.items[0].value;
      }
      if (_this.label != opts.items[0].label) {
        _this.label = opts.items[0].label;
        _this.default = opts.items[0].default;
      }
    }
  }
});

// ===================================================================================
//                                                                               State
//                                                                               =====
this.reset = function () {
  _this.value = _this.defaultValue;
};

this.changed = function () {
  if (opts.multiple) {
    var value = _this.value ? _this.value : [];
    var defaultValue = _this.defaultValue ? _this.defaultValue : [];
    return value.toString() !== defaultValue.toString();
  }
  return _this.value !== _this.defaultValue;
};

// ===================================================================================
//                                                                               Event
//                                                                               =====
this.toggle = function () {
  if (!visibleFlg) {
    open();
  } else {
    close();
  }
};

this.focus = function () {
  open();
};

this.mousedown = function () {
  _this.itemActivated = true;
};

this.mouseup = function () {
  _this.itemActivated = false;
};

this.blur = function () {
  if (!_this.itemActivated) {
    if (!_this.closing && visibleFlg) {
      var target = opts.multiple ? opts.items.filter(function (item) {
        return item.selected;
      }) : { value: _this.value, label: _this.label, default: _this.default };
      _this.trigger('blur', target);
    }
    close();
  }
};

this.itemClick = function (event) {
  event.stopPropagation();
  if (!_this.isItem(event.item.item)) {
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
};

this.keydown = function (event) {
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
  _this.update();
  scrollPosition();
};

this.keyup = function (event) {
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
};

this.stopPropagation = function (event) {
  event.stopPropagation();
};

// -----------------------------------------------------
//                                         search option
//                                         -------------
this.input = function (event) {
  var value = event.target.value.toLowerCase();
  _this.filtered = value.length > 0;
  search(value);
};

// -----------------------------------------------------
//                                       multiple option
//                                       ---------------
this.unselect = function (event) {
  event.stopPropagation();
  event.item.item.selected = false;
  _this.value = opts.items.filter(function (item) {
    return item.selected;
  }).map(function (item) {
    return item.value;
  });
  _this.selectedFlg = opts.items.some(function (item) {
    return item.selected;
  });
  parentUpdate();
};

// ===================================================================================
//                                                                               Logic
//                                                                               =====
var open = function open() {
  if (_this.openning || _this.closing || visibleFlg || _this.isReadOnly() || _this.isDisabled()) {
    return;
  }
  _this.openning = true;
  search('');
  _this.transitionStatus = 'visible animating in slide down';
  opts.items.forEach(function (item) {
    return item.active = false;
  });
  setTimeout(function () {
    _this.openning = false;
    visibleFlg = true;
    _this.transitionStatus = 'visible';
    _this.update();
  }, 300);

  if (opts.search) {
    _this.refs.condition.focus();
  }
  _this.update();
  scrollPosition();
  _this.trigger('open');
};

var close = function close() {
  if (_this.closing || !visibleFlg) {
    return;
  }
  _this.closing = true;
  _this.transitionStatus = 'visible animating out slide down';
  setTimeout(function () {
    _this.closing = false;
    visibleFlg = false;
    _this.transitionStatus = 'hidden';
    _this.update();
  }, 300);

  if (opts.search) {
    _this.refs.condition.blur();
    if (_this.filtered && _this.filteredItems.length > 0) {
      selectTarget(_this.filteredItems[0]);
    } else {
      _this.refs.condition.value = '';
      _this.filtered = false;
    }
  }
  _this.update();
  _this.trigger('close');
};

var selectTarget = function selectTarget(target, updating) {
  if (_this.value === target.value && _this.label === target.label && _this.default === target.default) {
    if (!updating) {
      _this.trigger('select', target);
    }
    return;
  }
  _this.value = target.value;
  _this.label = target.label;
  _this.default = target.default;
  if (opts.search) {
    _this.refs.condition.value = '';
    _this.filtered = false;
  }
  if (!updating) {
    _this.update();
    parentUpdate();
    _this.trigger('select', target);
    _this.trigger('change', target);
  }
};

var selectMultiTarget = function selectMultiTarget(updating) {
  if (JSON.stringify(_this.value) == JSON.stringify(opts.items.filter(function (item) {
    return item.selected;
  }).map(function (item) {
    return item.value;
  })) && _this.selectedFlg == opts.items.some(function (item) {
    return item.selected;
  })) {
    if (!updating) {
      _this.trigger('select', opts.items.filter(function (item) {
        return item.selected;
      }));
    }
    return;
  }
  _this.value = opts.items.filter(function (item) {
    return item.selected;
  }).map(function (item) {
    return item.value;
  });
  _this.selectedFlg = opts.items.some(function (item) {
    return item.selected;
  });
  if (!updating) {
    _this.update();
    parentUpdate();
    _this.trigger('select', opts.items.filter(function (item) {
      return item.selected;
    }));
    _this.trigger('change', opts.items.filter(function (item) {
      return item.selected;
    }));
  }
};

var search = function search(target) {
  opts.items.forEach(function (item) {
    item.searched = item.label && item.label.toLowerCase().indexOf(target) >= 0;
  });
  _this.filteredItems = opts.items.filter(function (item) {
    return item.searched;
  });
  _this.update();
  _this.trigger('search');
};

var scrollPosition = function scrollPosition() {
  var menu = _this.root.querySelector('.menu');
  var item = _this.root.querySelector('.item.hover');

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
};

var parentUpdate = function parentUpdate() {
  if (_this.parent) {
    _this.parent.update();
  }
};

// ===================================================================================
//                                                                              Helper
//                                                                              ======
this.isItem = function (item) {
  return item.searched && !item.header && !item.divider;
};

this.isActive = function () {
  if (_this.closing) {
    return false;
  }
  return _this.openning || visibleFlg;
};

this.getTabindex = function () {
  if (opts.tabindex) {
    return opts.tabindex;
  }
  return 0;
};

this.isReadOnly = function () {
  return _this.root.classList.contains('read-only');
};

this.isDisabled = function () {
  return _this.root.classList.contains('disabled');
};
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

var _this = this;

this.defaultValue = '';
this.value = '';
this.label = '';

if (opts.items && opts.items.length > 0) {
  this.label = opts.items[0].label;
  this.value = opts.items[0].value;
  this.default = opts.items[0].default;
}

this.on('mount', function () {
  if (typeof opts.riotValue === 'undefined' && typeof opts.value !== 'undefined') {
    opts.riotValue = opts.value;
  }
  if (typeof opts.riotValue !== 'undefined') {
    _this.value = opts.riotValue;
    _this.defaultValue = _this.value;
    _this.update();
  } else {
    _this.defaultValue = _this.value;
  }
});

this.on('update', function () {
  if (opts.items) {
    var selected = opts.items.filter(function (item) {
      return item.value === _this.value;
    });
    if (!selected || selected.length == 0) {
      var childItems = flatMap(opts.items.filter(function (item) {
        return item.items;
      }), function (item) {
        return item.items;
      });
      selected = childItems.filter(function (item) {
        return item.value == _this.value;
      });
    }

    if (selected && selected.length > 0) {
      var target = selected[0];
      if (_this.label !== target.label) {
        _this.changeValues(_this.value, true);
      }
    } else if (opts.items && opts.items.length > 0) {
      if (_this.value != opts.items[0].value) {
        _this.value = opts.items[0].value;
      }
      if (_this.label != opts.items[0].label) {
        _this.label = opts.items[0].label;
        _this.default = opts.items[0].default;
      }
    }
  }
});

// ===================================================================================
//                                                                               State
//                                                                               =====
this.reset = function () {
  _this.value = _this.defaultValue;
};

this.changed = function () {
  return _this.value !== _this.defaultValue;
};

// ===================================================================================
//                                                                               Event
//                                                                               =====
this.blur = function () {
  _this.trigger('blur');
};

this.change = function (target) {
  _this.changeValues(target.target.value);
};

this.changeValues = function (value, updating) {
  var item = void 0;
  if (opts.items.some(function (item) {
    return item.value == value || item.label == value;
  })) {
    item = opts.items.filter(function (item) {
      return item.value == value || item.label == value;
    })[0];
    _this.label = item.label;
    _this.value = item.value;
    _this.default = item.default;
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
      _this.label = item.label;
      _this.value = item.value;
      _this.default = item.default;
    }
  }

  if (!updating) {
    _this.update();
    _this.trigger('change', item);
  }
};

// ===================================================================================
//                                                                               Logic
//                                                                               =====
var flatMap = function flatMap(xs, f) {
  return xs.reduce(function (ys, x) {
    return ys.concat(f(x));
  }, []);
};
});

/***/ }),

/***/ "./tags/modal/su-modal.tag":
/*!*********************************!*\
  !*** ./tags/modal/su-modal.tag ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

riot.tag2('su-modal', '<div class="ui modal transition visible active {opts.class}" onclick="{clickModal}" id="{getId()}"> <i class="close icon" if="{isFullscreen()}" onclick="{hide}"></i> <div class="ui header {icon: opts.modal.header.icon}" if="{opts.modal.header}"> <i class="icon {opts.modal.header.icon}" if="{opts.modal.header.icon}"></i> {(opts.modal.header.text) ? opts.modal.header.text : opts.modal.header} </div> <div class="content {image: isImageContent()}" ref="content"> <yield></yield> </div> <div class="actions"> <button each="{opts.modal.buttons}" class="ui button {type} {labeled: icon && text} {icon: icon} {inverted: isBasic()} {disabled: disabled}" onclick="{parent.click}" ref="button_{text}"> {text} <i class="icon {icon}" if="{icon}"></i> </button> </div> </div>', 'su-modal.ui.dimmer.visible.transition,[data-is="su-modal"].ui.dimmer.visible.transition{ display: flex !important; align-items: center; justify-content: center; } su-modal .ui.modal,[data-is="su-modal"] .ui.modal{ top: auto; left: auto; position: relative; margin: 0 !important; } su-modal .ui.fullscreen.modal,[data-is="su-modal"] .ui.fullscreen.modal{ left: 0 !important; }', 'class="ui dimmer modals page transition {transitionStatus}" onclick="{dimmerClose}"', function(opts) {
'use strict';

var _this = this;

var image_content = false;
var openning = void 0,
    closing = void 0,
    visible = void 0;

if (!opts.modal) {
  opts.modal = {};
}

this.on('mount', function () {
  if (typeof opts.modal.closable === 'undefined') {
    opts.modal.closable = true;
  }
});

this.on('update', function () {
  if (_this.refs.content.getElementsByTagName('img').length > 0) {
    image_content = true;
  }
});

// ===================================================================================
//                                                                               Event
//                                                                               =====
this.show = function () {
  if (openning || closing || visible) {
    return;
  }
  openning = true;
  _this.transitionStatus = 'animating fade in visible';
  _this.update();
  setDefaultFocus();
  _this.trigger('show');

  setTimeout(function () {
    openning = false;
    visible = true;
    _this.transitionStatus = 'visible active';
    _this.update();
  }, 500);
};

this.click = function (event) {
  _this.trigger(event.item.action || event.item.text);
  if (typeof event.item.closable === 'undefined' || event.item.closable) {
    _this.hide();
  }
};

this.dimmerClose = function () {
  if (opts.modal.closable && !_this.isBasic()) {
    _this.hide();
  }
};

this.clickModal = function (event) {
  event.stopPropagation();
};

this.hide = function () {
  if (openning || closing || !visible) {
    return;
  }
  closing = true;
  _this.transitionStatus = 'animating fade out visible active';
  _this.update();
  _this.trigger('hide');

  setTimeout(function () {
    closing = false;
    visible = false;
    _this.transitionStatus = '';
    _this.update();
  }, 300);
};

// ===================================================================================
//                                                                               Logic
//                                                                               =====
var isContainsClassName = function isContainsClassName(className) {
  var modalElement = document.getElementById(_this.getId());
  if (!modalElement) {
    return false;
  }
  return modalElement.classList.contains(className);
};

var setDefaultFocus = function setDefaultFocus() {
  if (!opts.modal || !opts.modal.buttons || opts.modal.buttons.length == 0) {
    return;
  }
  if (opts.modal.buttons.some(function (button) {
    return button.default;
  })) {
    var text = opts.modal.buttons.filter(function (button) {
      return button.default;
    })[0].text;
    _this.refs['button_' + text].focus();
  }
};

// ===================================================================================
//                                                                              Helper
//                                                                              ======
this.getId = function () {
  return 'su-modal-' + _this._riot_id;
};

this.isFullscreen = function () {
  return isContainsClassName('fullscreen');
};

this.isBasic = function () {
  return isContainsClassName('basic');
};

this.isImageContent = function () {
  return image_content;
};
});

/***/ }),

/***/ "./tags/popup/su-popup.tag":
/*!*********************************!*\
  !*** ./tags/popup/su-popup.tag ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

riot.tag2('su-popup', '<div id="{getId()}" class="ui popup {opts.position} {opts.dataVariation} transition {transitionStatus} {nowrap: isNowrap()}"></div> <yield></yield>', 'su-popup,[data-is="su-popup"]{ position: relative; } su-popup .ui.popup,[data-is="su-popup"] .ui.popup{ position: absolute; } su-popup .ui.popup.nowrap,[data-is="su-popup"] .ui.popup.nowrap{ white-space: nowrap; } su-popup .ui.popup.wide,[data-is="su-popup"] .ui.popup.wide{ width: 350px; } su-popup .ui.popup.very.wide,[data-is="su-popup"] .ui.popup.very.wide{ width: 550px; } su-popup .ui.popup.top.left,[data-is="su-popup"] .ui.popup.top.left{ top: auto; bottom: 100%; left: 1em; right: auto; margin-left: -1rem; } su-popup .ui.popup.bottom.left,[data-is="su-popup"] .ui.popup.bottom.left{ top: 100%; bottom: auto; left: 1em; right: auto; margin-left: -1rem; } su-popup .ui.popup.top.center,[data-is="su-popup"] .ui.popup.top.center{ top: auto; bottom: 100%; left: 50%; right: auto; -webkit-transform: translateX(-50%) !important; transform: translateX(-50%) !important; } su-popup .ui.popup.bottom.center,[data-is="su-popup"] .ui.popup.bottom.center{ top: 100%; bottom: auto; left: 50%; right: auto; -webkit-transform: translateX(-50%) !important; transform: translateX(-50%) !important; } su-popup .ui.popup.top.right,[data-is="su-popup"] .ui.popup.top.right{ top: auto; bottom: 100%; left: auto; right: 1em; margin-right: -1rem; } su-popup .ui.popup.bottom.right,[data-is="su-popup"] .ui.popup.bottom.right{ top: 100%; bottom: auto; left: auto; right: 1em; margin-right: -1rem; } su-popup .ui.popup.left.center,[data-is="su-popup"] .ui.popup.left.center{ left: auto; right: 100%; top: 50%; -webkit-transform: translateY(-50%) !important; transform: translateY(-50%) !important; } su-popup .ui.popup.right.center,[data-is="su-popup"] .ui.popup.right.center{ left: 100%; right: auto; top: 50%; -webkit-transform: translateY(-50%) !important; transform: translateY(-50%) !important; }', 'onmouseover="{mouseover}" onmouseout="{mouseout}"', function(opts) {
'use strict';

var _this = this;

this.content = '';
this.on('mount', function () {
  if (!opts.position) {
    opts.position = 'top left';
  }
  if (opts.tooltip) {
    if (opts.dataTitle) {
      _this.content = '<div class="header">' + opts.dataTitle + '</div><div class="content">' + opts.tooltip + '</div>';
    } else {
      _this.content = opts.tooltip;
    }
  } else if (_this.tags['su-popup-content']) {
    _this.content = _this.tags['su-popup-content'].root.innerHTML;
    _this.tags['su-popup-content'].unmount();
  }
  document.getElementById(_this.getId()).innerHTML = _this.content;
  _this.update();
});

// ===================================================================================
//                                                                               Event
//                                                                               =====
this.mouseover = function () {
  _this.transitionStatus = 'visible';
  _this.trigger('mouseover');
};

this.mouseout = function () {
  _this.transitionStatus = 'hidden';
  _this.trigger('mouseout');
};

// ===================================================================================
//                                                                              Helper
//                                                                              ======
this.isNowrap = function () {
  if (opts.dataVariation && opts.dataVariation.indexOf('wide') >= 0) {
    return false;
  }
  return true;
};

this.getId = function () {
  return 'su-popup-' + _this._riot_id;
};
});

riot.tag2('su-popup-content', '', '', '', function(opts) {
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

var _this = this;

this.label = '';
this.value = '';
this.defaultValue = '';
var lastValue = void 0;
var lastOptsValue = void 0;

this.on('mount', function () {
  if (typeof opts.riotValue === 'undefined' && typeof opts.value !== 'undefined') {
    opts.riotValue = opts.value;
  }
  if (_this.value) {
    opts.riotValue = _this.value;
  } else {
    _this.value = opts.riotValue;
  }
  lastValue = _this.value;
  lastOptsValue = _this.value;

  var radios = _this.tags['su-radio'];
  if (!Array.isArray(radios)) {
    radios = [radios];
  }
  radios.forEach(function (radio) {
    initializeChild(radio);
  });

  _this.defaultValue = _this.value;
  _this.update();
});

this.on('update', function () {
  var changed = false;
  if (lastValue != _this.value) {
    opts.riotValue = _this.value;
    lastOptsValue = _this.value;
    lastValue = _this.value;
    changed = true;
  } else if (lastOptsValue != opts.riotValue) {
    _this.value = opts.riotValue;
    lastOptsValue = opts.riotValue;
    lastValue = opts.riotValue;
    changed = true;
  }

  var radios = _this.tags['su-radio'];

  if (!Array.isArray(radios)) {
    radios = [radios];
  }
  radios.forEach(function (radio) {
    updateState(radio);
  });

  if (changed) {
    _this.trigger('change', _this.value);
  }
});

// ===================================================================================
//                                                                               State
//                                                                               =====
this.reset = function () {
  _this.value = _this.defaultValue;
};

this.changed = function () {
  return _this.value !== _this.defaultValue;
};

// ===================================================================================
//                                                                               Logic
//                                                                               =====
var updateState = function updateState(radio) {
  if (typeof radio.opts.value === 'undefined') {
    return;
  }
  radio.checked = _this.value == radio.opts.value;
  if (radio.checked) {
    _this.label = radio.root.getElementsByTagName('label')[0].innerText;
  }
};

var initializeChild = function initializeChild(radio) {
  radio.opts.name = getRadioName();
  radio.on('click', function (value) {
    _this.value = value;
    _this.update();
  });
};

var getRadioName = function getRadioName() {
  return 'su-radio-name-' + _this._riot_id;
};
});

/***/ }),

/***/ "./tags/radio/su-radio.tag":
/*!*********************************!*\
  !*** ./tags/radio/su-radio.tag ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

riot.tag2('su-radio', '<input type="radio" name="{name}" riot-value="{value}" checked="{checked}" onclick="{click}" ref="target" id="{getId()}"> <label if="{!opts.label}" for="{getId()}"><yield></yield></label> <label if="{opts.label}" for="{getId()}">{opts.label}</label>', 'su-radio.ui.checkbox label,[data-is="su-radio"].ui.checkbox label{ cursor: pointer; } su-radio.ui.read-only input[type="radio"],[data-is="su-radio"].ui.read-only input[type="radio"],su-radio.ui.disabled input[type="radio"],[data-is="su-radio"].ui.disabled input[type="radio"]{ cursor: default!important; }', 'class="ui {radio: isRadio()} checkbox {opts.class}"', function(opts) {
'use strict';

var _this = this;

this.name = '';
this.checked = false;
var lastChecked = void 0;
var lastOptsCheck = void 0;

this.on('mount', function () {
  if (_this.checked) {
    opts.checked = _this.checked;
  } else {
    _this.checked = opts.checked === true || opts.checked === 'checked' || opts.checked === 'true';
  }
  lastChecked = _this.checked;
  lastOptsCheck = opts.checked;
  _this.update();
});

this.on('update', function () {
  _this.name = opts.name;
  _this.value = opts.value;
  if (lastChecked != _this.checked) {
    opts.checked = _this.checked;
    lastChecked = _this.checked;
  } else if (lastOptsCheck != opts.checked) {
    _this.checked = opts.checked;
    lastOptsCheck = opts.checked;
  }
});

// ===================================================================================
//                                                                               Event
//                                                                               =====
this.click = function (event) {
  if (isReadOnly() || _this.isDisabled()) {
    event.preventDefault();
    return;
  }
  _this.checked = event.target.checked;
  _this.trigger('click', event.target.value);
};

// ===================================================================================
//                                                                               Logic
//                                                                               =====
var isReadOnly = function isReadOnly() {
  return _this.root.classList.contains('read-only');
};

// ===================================================================================
//                                                                              Helper
//                                                                              ======
this.getId = function () {
  return 'su-radio-' + _this._riot_id;
};

this.isDisabled = function () {
  return _this.root.classList.contains('disabled');
};

this.isRadio = function () {
  return !_this.root.classList.contains('slider');
};
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

riot.tag2('su-tab-title', '<a class="{opts.class} {active: active} item" onclick="{click}"> <yield></yield> </a>', '', '', function(opts) {
'use strict';

var _this = this;

this.active = false;
var index = 0;
var tabs = void 0;
this.on('mount', function () {
  tabs = _this.parent.tags['su-tab-title'];

  if (!Array.isArray(tabs)) {
    tabs = [tabs];
  }
  tabs.forEach(function (tab, i) {
    if (tab._riot_id == _this._riot_id) {
      index = i;
    }
  });
});

this.click = function () {
  tabs.forEach(function (tab) {
    tab.active = false;
  });
  _this.parent.parent.click(index);
  tabs[index].active = true;
  _this.update();
  _this.trigger('click', _this.parent.parent.tabs[index]);
};
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

var _this = this;

this.active = false;
this.mounted = false;
this.on('mount', function () {
  _this.update();
});
this.on('update', function () {
  if (_this.active && !_this.mounted) {
    _this.mounted = true;
  }
});
});

/***/ }),

/***/ "./tags/tab/su-tabset.tag":
/*!********************************!*\
  !*** ./tags/tab/su-tabset.tag ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

riot.tag2('su-tabset', '<div class="ui {opts.class} {getClass()} menu" if="{!isBottom() && !hasTitle()}"> <a each="{tab, i in tabs}" class="{tab.opts.titleClass} {active: tab.active} item" onclick="{click.bind(this, i)}">{tab.opts.title}</a> </div> <yield></yield> <div class="ui {opts.class} {getClass()} menu" if="{isBottom() && !hasTitle()}"> <a each="{tab, i in tabs}" class="{tab.opts.titleClass} {active: tab.active} item" onclick="{click.bind(this, i)}">{tab.opts.title}</a> </div>', '', '', function(opts) {
'use strict';

var _this = this;

this.tabs = [];

this.on('mount', function () {
  if (_this.tags['su-tab-header']) {
    _this.tags['su-tab-header'].opts.class = getTitleClass();
  }

  _this.tabs = _this.tags['su-tab'];

  if (!Array.isArray(_this.tabs)) {
    _this.tabs = [_this.tabs];
  }
  var defaultActive = false;
  _this.tabs.forEach(function (tab) {
    initializeChild(tab);
    if (tab.opts.active) {
      defaultActive = true;
      tab.active = true;
    }
  });
  if (!defaultActive) {
    var titles = _this.hasTitle();
    if (titles) {
      titles[0].active = true;
    }
    _this.tabs[0].active = true;
  }

  _this.update();
});

// ===================================================================================
//                                                                               Event
//                                                                               =====
this.click = function (index) {
  _this.tabs.forEach(function (tab) {
    tab.active = false;
  });
  _this.tabs[index].active = true;
  _this.update();
  _this.trigger('click', _this.tabs[index]);
};

// ===================================================================================
//                                                                              Helper
//                                                                              ======
this.isBottom = function () {
  return hasClass('bottom');
};

this.hasTitle = function () {
  if (!_this.tags['su-tab-header']) {
    return false;
  }
  var titles = _this.tags['su-tab-header'].tags['su-tab-title'];
  if (!titles) {
    return false;
  }

  if (!Array.isArray(titles)) {
    return [titles];
  }
  return titles;
};

this.getClass = function () {
  if (hasClass('tabular') && !hasClass('attached')) {
    return 'attached';
  }
};

// ===================================================================================
//                                                                               Logic
//                                                                               =====
var initializeChild = function initializeChild(tab) {
  tab.mounted = !opts.lazyMount;
  if (tab.opts.class) {
    return;
  }
  var classList = ['segment'];
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
};

var getTitleClass = function getTitleClass() {
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
};

var hasClass = function hasClass(className) {
  return _this.root.classList.contains(className);
};
});

/***/ })

/******/ });
});