riot.tag2('su-checkbox', '<input type="checkbox" checked="{checked}" onclick="{click}" ref="target" disabled="{isDisabled()}" id="{getId()}"> <label if="{!opts.label}" for="{getId()}"><yield></yield></label> <label if="{opts.label}" for="{getId()}">{opts.label}</label>', '', 'class="ui checkbox {opts.class}"', function(opts) {
'use strict';

var _this = this;

this.checked = false;
var lastChecked = void 0;
var lastOptsCheck = void 0;

this.on('mount', function () {
  _this.supportTraditionalOptions();
  _this.checked = opts.checked === true || opts.checked === 'checked' || opts.checked === 'true';
  lastChecked = _this.checked;
  lastOptsCheck = opts.checked;
  _this.update();
});

this.on('update', function () {
  _this.supportTraditionalOptions();
  if (lastChecked != _this.checked) {
    opts.checked = _this.checked;
    lastChecked = _this.checked;
    _this.parentUpdate();
  } else if (lastOptsCheck != opts.checked) {
    _this.checked = opts.checked;
    lastOptsCheck = opts.checked;
    _this.parentUpdate();
  }
});

// ===================================================================================
//                                                                               Event
//                                                                               =====
this.click = function () {
  if (_this.isReadOnly() || _this.isDisabled()) {
    _this.refs.target.checked = _this.checked;
    _this.update();
    return;
  }
  _this.checked = !_this.checked;
  _this.parentUpdate();
  _this.trigger('click', _this.checked);
};

// ===================================================================================
//                                                                              Helper
//                                                                              ======
this.getId = function () {
  return 'su-checkbox-' + _this._riot_id;
};

this.isReadOnly = function () {
  return _this.root.classList.contains('read-only');
};

this.isDisabled = function () {
  return _this.root.classList.contains('disabled');
};

this.parentUpdate = function () {
  if (_this.parent) {
    _this.parent.update();
  }
};

this.supportTraditionalOptions = function () {
  if (typeof opts.check !== 'undefined' && !_this.shownMessage) {
    console.warn('\'check\' attribute is deprecated. Please use \'checked\'.');
    opts.checked = opts.check;
    opts.check = undefined;
    _this.shownMessage = true;
  }
};
});
riot.tag2('su-radio', '<input type="radio" name="{name}" riot-value="{value}" checked="{checked}" onclick="{click}" ref="target" id="{getId()}"> <label if="{!opts.label}" for="{getId()}"><yield></yield></label> <label if="{opts.label}" for="{getId()}">{opts.label}</label>', '', 'class="ui {radio: isRadio()} checkbox {opts.class}"', function(opts) {
'use strict';

var _this = this;

this.checked = false;
var lastChecked = void 0;
var lastOptsCheck = void 0;
this.name = '';

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
    _this.parentUpdate();
  } else if (lastOptsCheck != opts.checked) {
    _this.checked = opts.checked;
    lastOptsCheck = opts.checked;
    _this.parentUpdate();
  }
});

// ===================================================================================
//                                                                               Event
//                                                                               =====
this.click = function (event) {
  if (_this.isReadOnly() || _this.isDisabled()) {
    _this.refs.target.checked = _this.checked;
    _this.update();
    return;
  }
  _this.checked = event.target.checked;
  _this.trigger('click', event.target.value);
  _this.parentUpdate();
};

// ===================================================================================
//                                                                              Helper
//                                                                              ======
this.getId = function () {
  return 'su-radio-' + _this._riot_id;
};

this.isReadOnly = function () {
  return _this.root.classList.contains('read-only');
};

this.isDisabled = function () {
  return _this.root.classList.contains('disabled');
};

this.isRadio = function () {
  return !_this.root.classList.contains('slider');
};

this.parentUpdate = function () {
  if (_this.parent) {
    _this.parent.update();
  }
};
});
riot.tag2('su-dropdown', '<i class="dropdown icon"></i> <input class="search" autocomplete="off" tabindex="{getTabindex()}" ref="condition" if="{opts.search}" oninput="{input}" onclick="{clickSearch}" onfocus="{open}" onblur="{blur}"> <a each="{item in opts.items}" class="ui label transition visible" style="display: inline-block !important;" if="{item.selected}"> {item.label} <i class="delete icon" onclick="{unselect}"></i> </a> <div class="{default: default} text {filtered: filtered}" if="{!opts.multiple || !selectedFlg}"> {label} </div> <div class="menu transition {transitionStatus}" onmousedown="{mousedown}" onmouseup="{mouseup}" onblur="{blur}" tabindex="-1"> <virtual each="{item in opts.items}"> <div class="item {default: item.default} {active: item.active} {selected: item.active}" if="{isVisible(item)}" riot-value="{item.value}" default="{item.default}" onclick="{itemClick}" onmousedown="{mousedown}" onmouseup="{mouseup}"> <i class="{item.icon} icon" if="{item.icon}"></i> <img class="ui avatar image" riot-src="{item.image}" if="{item.image}"> <span class="description" if="{item.description}">{item.description}</span> <span class="text">{item.label}</span> </div> <div class="header" if="{item.header && !filtered}"> <i class="{item.icon} icon" if="{item.icon}"></i> {item.label} </div> <div class="divider" if="{item.divider && !filtered}"></div> </virtual> <div class="message" if="{filtered && filteredItems.length == 0}">No results found.</div> </div>', 'su-dropdown.ui.dropdown .menu>.item.default,[data-is="su-dropdown"].ui.dropdown .menu>.item.default{ color: rgba(0, 0, 0, 0.4) }', 'class="ui selection {opts.class} {search: opts.search} {multiple: opts.multiple} dropdown {active: isActive()} {visible: isActive()}" onclick="{toggle}" onfocus="{open}" onblur="{blur}" onkeydown="{keydown}" onkeyup="{keyup}" tabindex="{opts.search ? -1 : getTabindex()}"', function(opts) {
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
    _this.selectMultiTarget(true);
  } else if (opts.items) {
    var selected = opts.items.filter(function (item) {
      return item.value === _this.value;
    });
    if (selected && selected.length > 0) {
      var target = selected[0];
      if (_this.label !== target.label) {
        _this.selectTarget(target, true);
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
    _this.open();
  } else {
    _this.close();
  }
};

this.mousedown = function () {
  _this.itemActivated = true;
};

this.mouseup = function () {
  _this.itemActivated = false;
};

this.blur = function () {
  if (!_this.itemActivated) {
    _this.close();
  }
};

this.itemClick = function (event) {
  event.stopPropagation();
  if (opts.multiple) {
    if (!event.item.item.default) {
      event.item.item.selected = true;
    }
    _this.selectMultiTarget();
    return;
  }
  _this.selectTarget(event.item.item);
  _this.close();
};

this.keydown = function (event) {
  var keyCode = event.keyCode;
  if (keyCode == _this.keys.escape) {
    _this.close();
  }
  if (keyCode == _this.keys.downArrow) {
    _this.open();
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
  _this.scrollPosition();
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
    _this.selectMultiTarget();
  } else {
    activeItem.active = false;
    _this.selectTarget(activeItem);
    _this.close();
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
  _this.search(value);
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
  _this.parentUpdate();
};

// ===================================================================================
//                                                                               Logic
//                                                                               =====
this.open = function () {
  if (_this.openning || _this.closing || _this.visibleFlg) {
    return;
  }
  _this.openning = true;
  _this.search('');
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
  _this.scrollPosition();
  _this.trigger('open');
};

this.close = function () {
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
      _this.selectTarget(_this.filteredItems[0]);
    } else {
      _this.refs.condition.value = '';
      _this.filtered = false;
    }
  }
  _this.update();
  _this.trigger('close');
};

this.selectTarget = function (target, updating) {
  _this.value = target.value;
  _this.label = target.label;
  _this.default = target.default;
  if (opts.search) {
    _this.refs.condition.value = '';
    _this.filtered = false;
  }
  if (!updating) {
    _this.update();
  }
  _this.parentUpdate();
  _this.trigger('select', target);
};

this.selectMultiTarget = function (updating) {
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
    _this.parentUpdate();
  }
  _this.trigger('select', opts.items.filter(function (item) {
    return item.selected;
  }));
};

this.search = function (target) {
  opts.items.forEach(function (item) {
    item.searched = item.label && item.label.toLowerCase().indexOf(target) >= 0;
  });
  _this.filteredItems = opts.items.filter(function (item) {
    return item.searched;
  });
  _this.update();
  _this.trigger('search');
};

this.scrollPosition = function () {
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

this.parentUpdate = function () {
  if (_this.parent) {
    _this.parent.update();
  }
};

// ===================================================================================
//                                                                              Helper
//                                                                              ======
this.isVisible = function (item) {
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
riot.tag2('su-modal', '<div class="ui modal transition visible active {opts.class}"> <i class="close icon" if="{isFullscreen()}" onclick="{close}"></i> <div class="ui header {icon: opts.modal.heading.icon}"> <i class="icon {opts.modal.heading.icon}" if="{opts.modal.heading.icon}"></i> {(opts.modal.heading.text) ? opts.modal.heading.text : opts.modal.heading} </div> <div class="content {opts.modal.content_class}"> <yield></yield> </div> <div class="actions"> <div each="{opts.modal.buttons}" class="ui button {type} {labeled: icon && text} {icon: icon} {inverted: isBasic()}" onclick="{parent.click.bind(this, action)}"> {text} <i class="icon {icon}" if="{icon}"></i> </div> </div> </div>', 'su-modal.ui.dimmer.visible.transition,[data-is="su-modal"].ui.dimmer.visible.transition{ display: flex !important; align-items: center; justify-content: center; } su-modal .ui.modal,[data-is="su-modal"] .ui.modal{ top: auto; left: auto; position: relative; margin: 0 !important; }', 'class="ui dimmer modals page transition {transitionStatus}" onclick="{dimmerClose}"', function(opts) {
'use strict';

var _this = this;

this.on('mount', function () {
  if (!opts.modal) {
    opts.modal = {};
  }
  if (typeof opts.modal.closable === 'undefined') {
    opts.modal.closable = true;
  }
});

this.on('update', function () {
  if (opts.modal.visible) {
    _this.transitionStatus = 'animating fade in visible';
    setTimeout(function () {
      _this.transitionStatus = 'visible';
      _this.update();
    }, 500);
  }
});

// ===================================================================================
//                                                                               Event
//                                                                               =====
this.click = function (action) {
  _this.close(action);
};

this.dimmerClose = function (action) {
  if (opts.modal.closable) {
    _this.close(action);
  }
};

this.close = function (action) {
  if (action && toString.call(action).slice(8, -1).toLowerCase() === 'function') {
    action();
  }
  opts.modal.visible = false;
  _this.transitionStatus = 'animating fade out visible active';
  _this.update();

  setTimeout(function () {
    _this.transitionStatus = 'hidden';
    _this.update();
  }, 300);
};

// ===================================================================================
//                                                                              Helper
//                                                                              ======
this.isFullscreen = function () {
  return _this.root.classList.contains('fullscreen');
};

this.isBasic = function () {
  return _this.root.classList.contains('basic');
};
});