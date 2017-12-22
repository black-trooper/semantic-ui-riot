riot.tag2('su-checkbox', '<input type="checkbox" checked="{checked}" onclick="{click}" ref="target" disabled="{isDisabled()}" id="{getId()}"> <label if="{!opts.label}" for="{getId()}"><yield></yield></label> <label if="{opts.label}" for="{getId()}">{opts.label}</label>', '', 'class="ui checkbox {opts.class}"', function(opts) {
'use strict';

var _this = this;

this.checked = false;
var lastChecked = void 0;
var lastOptsChecked = void 0;

this.on('mount', function () {
  supportTraditionalOptions();
  _this.checked = normalizeOptChecked();
  lastChecked = _this.checked;
  lastOptsChecked = _this.checked;
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
riot.tag2('su-dropdown', '<i class="dropdown icon"></i> <input class="search" autocomplete="off" tabindex="{getTabindex()}" ref="condition" if="{opts.search}" oninput="{input}" onclick="{clickSearch}" onfocus="{focus}" onblur="{blur}"> <a each="{item in opts.items}" class="ui label transition visible" style="display: inline-block !important;" if="{item.selected}"> {item.label} <i class="delete icon" onclick="{unselect}"></i> </a> <div class="{default: default} text {filtered: filtered}" if="{!opts.multiple || !selectedFlg}"> {label} </div> <div class="menu transition {transitionStatus}" onmousedown="{mousedown}" onmouseup="{mouseup}" onblur="{blur}" tabindex="-1"> <div each="{item in opts.items}" riot-value="{item.value}" default="{item.default}" onmousedown="{mousedown}" onmouseup="{mouseup}" class="{item: isItem(item)} {header: item.header && !filtered} {divider: item.divider && !filtered} {default: item.default} {active: item.active} {selected: item.active}" onclick="{itemClick}"> <i class="{item.icon} icon" if="{item.icon}"></i> <img class="ui avatar image" riot-src="{item.image}" if="{item.image}"> <span class="description" if="{item.description}">{item.description}</span> <span class="text">{item.label}</span> </div> <div class="message" if="{filtered && filteredItems.length == 0}">No results found.</div> </div>', 'su-dropdown.ui.dropdown .menu>.item.default,[data-is="su-dropdown"].ui.dropdown .menu>.item.default{ color: rgba(0, 0, 0, 0.4) }', 'class="ui selection {opts.class} {search: opts.search} {multiple: opts.multiple} dropdown {active: isActive()} {visible: isActive()}" onclick="{toggle}" onfocus="{focus}" onblur="{blur}" onkeydown="{keydown}" onkeyup="{keyup}" tabindex="{opts.search ? -1 : getTabindex()}"', function(opts) {
'use strict';

var _this = this;

this.visibleFlg = false;
this.selectedFlg = false;
this.filtered = false;
this.transitionStatus = 'hidden';
this.value = '';
this.label = '';
this.keys = {
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
//                                                                               Event
//                                                                               =====
this.toggle = function () {
  if (!_this.visibleFlg) {
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
  if (keyCode == _this.keys.escape) {
    close();
  }
  if (keyCode == _this.keys.downArrow) {
    open();
  }
  if (keyCode != _this.keys.upArrow && keyCode != _this.keys.downArrow) {
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
  if (keyCode == _this.keys.upArrow) {
    var nextActiveItem = searchedItems.filter(function (item, index) {
      return index < activeIndex && !item.header && !item.divider;
    });
    if (nextActiveItem.length > 0) {
      searchedItems[activeIndex].active = false;
      nextActiveItem[nextActiveItem.length - 1].active = true;
    }
  } else if (keyCode == _this.keys.downArrow) {
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
  if (keyCode != _this.keys.enter) {
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

this.clickSearch = function (event) {
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
  if (_this.openning || _this.closing || _this.visibleFlg) {
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
    _this.visibleFlg = true;
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
  if (_this.closing || !_this.visibleFlg) {
    return;
  }
  _this.closing = true;
  _this.transitionStatus = 'visible animating out slide down';
  setTimeout(function () {
    _this.closing = false;
    _this.visibleFlg = false;
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
  var item = _this.root.querySelector('.item.active');

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
  if (opts.multiple && (item.default || item.selected)) {
    return false;
  }
  return item.searched && !item.header && !item.divider;
};

this.isActive = function () {
  if (_this.closing) {
    return false;
  }
  return _this.openning || _this.visibleFlg;
};

this.getTabindex = function () {
  if (opts.tabindex) {
    return opts.tabindex;
  }
  return 0;
};
});
riot.tag2('su-modal', '<div class="ui modal transition visible active {opts.class}" onclick="{clickModal}" id="{getId()}"> <i class="close icon" if="{isFullscreen()}" onclick="{hide}"></i> <div class="ui header {icon: opts.modal.header.icon}" if="{opts.modal.header}"> <i class="icon {opts.modal.header.icon}" if="{opts.modal.header.icon}"></i> {(opts.modal.header.text) ? opts.modal.header.text : opts.modal.header} </div> <div class="content {image: isImageContent()}" ref="content"> <yield></yield> </div> <div class="actions"> <div each="{opts.modal.buttons}" class="ui button {type} {labeled: icon && text} {icon: icon} {inverted: isBasic()} {disabled: disabled}" onclick="{parent.click}"> {text} <i class="icon {icon}" if="{icon}"></i> </div> </div> </div>', 'su-modal.ui.dimmer.visible.transition,[data-is="su-modal"].ui.dimmer.visible.transition{ display: flex !important; align-items: center; justify-content: center; } su-modal .ui.modal,[data-is="su-modal"] .ui.modal{ top: auto; left: auto; position: relative; margin: 0 !important; }', 'class="ui dimmer modals page transition {transitionStatus}" onclick="{dimmerClose}"', function(opts) {
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
riot.tag2('su-radio', '<input type="radio" name="{name}" riot-value="{value}" checked="{checked}" onclick="{click}" ref="target" id="{getId()}"> <label if="{!opts.label}" for="{getId()}"><yield></yield></label> <label if="{opts.label}" for="{getId()}">{opts.label}</label>', '', 'class="ui {radio: isRadio()} checkbox {opts.class}"', function(opts) {
'use strict';

var _this = this;

this.name = '';
this.checked = false;
var lastChecked = void 0;
var lastOptsCheck = void 0;

this.on('mount', function () {
  _this.checked = opts.checked === true || opts.checked === 'checked' || opts.checked === 'true';
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
riot.tag2('su-radio-group', '<yield></yield>', '', '', function(opts) {
'use strict';

var _this = this;

this.label = '';
this.value = '';
var lastValue = void 0;
var lastOptsValue = void 0;

this.on('mount', function () {
  if (typeof opts.riotValue === 'undefined' && typeof opts.value !== 'undefined') {
    opts.riotValue = opts.value;
  }
  _this.value = opts.riotValue;
  lastValue = _this.value;
  lastOptsValue = _this.value;

  var radios = _this.tags['su-radio'];
  if (Array.isArray(radios)) {
    for (var _iterator = radios, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
      var _ref;

      if (_isArray) {
        if (_i >= _iterator.length) break;
        _ref = _iterator[_i++];
      } else {
        _i = _iterator.next();
        if (_i.done) break;
        _ref = _i.value;
      }

      var radio = _ref;

      initializeChild(radio);
    }
  } else {
    initializeChild(radios);
  }

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
  if (Array.isArray(radios)) {
    for (var _iterator2 = radios, _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator]();;) {
      var _ref2;

      if (_isArray2) {
        if (_i2 >= _iterator2.length) break;
        _ref2 = _iterator2[_i2++];
      } else {
        _i2 = _iterator2.next();
        if (_i2.done) break;
        _ref2 = _i2.value;
      }

      var radio = _ref2;

      updateState(radio);
    }
  } else {
    updateState(radios);
  }

  if (changed) {
    _this.trigger('change', _this.value);
  }
});

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
riot.tag2('su-tab', '<yield></yield>', 'su-tab.ui.segment,[data-is="su-tab"].ui.segment{ margin-top: 0; margin-bottom: 0; } su-tab.ui.segment.top.attached,[data-is="su-tab"].ui.segment.top.attached{ margin-top: 0 } su-tab.ui.segment.bottom.attached,[data-is="su-tab"].ui.segment.bottom.attached{ margin-bottom: 0 }', 'class="ui {opts.class} {active: active} tab"', function(opts) {
"use strict";

this.active = false;
});
riot.tag2('su-tabset', '<div class="ui {opts.class} {getClass()} menu" if="{!isBottom()}"> <a each="{tab, i in tabs}" class="{tab.opts.titleClass} {active: tab.active} item" onclick="{click}">{tab.opts.title}</a> </div> <yield></yield> <div class="ui {opts.class} {getClass()} menu" if="{isBottom()}"> <a each="{tab, i in tabs}" class="{tab.opts.titleClass} {active: tab.active} item" onclick="{click}">{tab.opts.title}</a> </div>', '', '', function(opts) {
'use strict';

var _this = this;

this.tabs = [];

this.on('mount', function () {
  _this.tabs = _this.tags['su-tab'];

  if (!Array.isArray(_this.tabs)) {
    _this.tabs = [_this.tabs];
  }
  var defaultActive = false;
  for (var _iterator = _this.tabs, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
    var _ref;

    if (_isArray) {
      if (_i >= _iterator.length) break;
      _ref = _iterator[_i++];
    } else {
      _i = _iterator.next();
      if (_i.done) break;
      _ref = _i.value;
    }

    var tab = _ref;

    initializeChild(tab);
    if (tab.opts.active) {
      defaultActive = true;
      tab.active = true;
    }
  }
  if (!defaultActive) {
    _this.tabs[0].active = true;
  }

  _this.update();
});

// ===================================================================================
//                                                                               Event
//                                                                               =====
this.click = function (event) {
  var index = event.item.i;

  for (var _iterator2 = _this.tabs, _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator]();;) {
    var _ref2;

    if (_isArray2) {
      if (_i2 >= _iterator2.length) break;
      _ref2 = _iterator2[_i2++];
    } else {
      _i2 = _iterator2.next();
      if (_i2.done) break;
      _ref2 = _i2.value;
    }

    var tab = _ref2;

    tab.active = false;
  }
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

this.getClass = function () {
  if (hasClass('tabular') && !hasClass('attached')) {
    return 'attached';
  }
};

// ===================================================================================
//                                                                               Logic
//                                                                               =====
var initializeChild = function initializeChild(tab) {
  if (tab.opts.class) {
    return;
  }
  var classList = ['segment'];
  if (hasClass('tabular')) {
    classList.push('tabular');
  }
  if (hasClass('attached') || hasClass('tabular')) {
    if (hasClass('bottom')) {
      classList.push('top');
    } else {
      classList.push('bottom');
    }
    classList.push('attached');
  }
  tab.opts.class = classList.join(' ');
};

var hasClass = function hasClass(className) {
  return _this.root.classList.contains(className);
};
});