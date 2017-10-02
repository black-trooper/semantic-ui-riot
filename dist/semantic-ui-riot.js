riot.tag2('su-checkbox', '<input type="checkbox" checked="{checked}" onclick="{click}" ref="target"> <label onclick="{labelClick}"><yield></yield></label>', '', 'class="ui checkbox {opts.class}"', function(opts) {
'use strict';

var _this = this;

this.checked = false;
this.on('update', function () {
  if (typeof opts.check === 'undefined') {
    return;
  }
  if (!_this.clicked) {
    _this.checked = opts.check;
  }
  _this.clicked = false;
});

// ===================================================================================
//                                                                               Event
//                                                                               =====
this.click = function (event) {
  _this.clicked = true;
  _this.checked = event.target.checked;
  _this.parentUpdate();
  _this.trigger('click', _this.checked);
};

this.labelClick = function () {
  _this.refs.target.click();
};

// ===================================================================================
//                                                                              Helper
//                                                                              ======
this.parentUpdate = function () {
  if (_this.parent) {
    _this.parent.update();
  }
};
});
riot.tag2('su-radio', '<input type="radio" name="{name}" riot-value="{value}" checked="{checked}" onclick="{click}" ref="target"> <label onclick="{labelClick}"><yield></yield></label>', '', 'class="ui {radio: isRadio()} checkbox {opts.class}"', function(opts) {
'use strict';

var _this = this;

this.checked = false;
this.name = '';

this.on('mount', function () {
  _this.update();
  _this.parentUpdate();
});

this.on('update', function () {
  _this.checked = opts.checked;
  _this.name = opts.name;
  _this.value = opts.value;
});

// ===================================================================================
//                                                                               Event
//                                                                               =====
this.click = function (event) {
  _this.checked = event.target.checked;
  _this.trigger('click', event.target.value);
  _this.parentUpdate();
};

this.labelClick = function () {
  _this.refs.target.click();
};

// ===================================================================================
//                                                                              Helper
//                                                                              ======
this.isRadio = function () {
  return !_this.root.classList.contains('slider');
};

this.parentUpdate = function () {
  if (_this.parent) {
    _this.parent.update();
  }
};
});
riot.tag2('su-dropdown', '<i class="dropdown icon"></i> <input class="search" autocomplete="off" tabindex="{getTabindex()}" ref="condition" if="{opts.search}" onkeydown="{keydown}" onclick="{clickSearch}" onkeyup="{keyup}" onfocus="{open}" onblur="{blur.bind(this, true)}"> <a each="{item in opts.items}" class="ui label transition visible" style="display: inline-block !important;" if="{item.selected}"> {item.label} <i class="delete icon" onclick="{unselect}"></i> </a> <div class="{default: default} text {filtered: filtered}" if="{!opts.multiple || !selectedFlg}"> {label} </div> <div class="menu transition {transitionStatus}" tabindex="-1"> <virtual each="{item in opts.items}"> <div class="item {default: item.default}" if="{isVisible(item)}" riot-value="{item.value}" default="{item.default}" onclick="{itemClick}" onmousedown="{mousedown}" onmouseup="{mouseup}"> <i class="{item.icon} icon" if="{item.icon}"></i> <img class="ui avatar image" riot-src="{item.image}" if="{item.image}"> <span class="description" if="{item.description}">{item.description}</span> <span class="text">{item.label}</span> </div> <div class="header" if="{item.header && !filtered}"> <i class="{item.icon} icon" if="{item.icon}"></i> {item.label} </div> <div class="divider" if="{item.divider && !filtered}"></div> </virtual> <div class="message" if="{filtered && filteredItems.length == 0}">No results found.</div> </div>', 'su-dropdown.ui.dropdown .menu>.item.default,[data-is="su-dropdown"].ui.dropdown .menu>.item.default{ color: rgba(0, 0, 0, 0.4) }', 'class="ui selection {opts.class} {search: opts.search} {multiple: opts.multiple} dropdown {active: visibleFlg} {visible: visibleFlg}" onclick="{toggle}" onfocus="{open}" onblur="{blur.bind(this, false)}" tabindex="{opts.search ? -1 : getTabindex()}"', function(opts) {
'use strict';

var _this = this;

this.visibleFlg = false;
this.selectedFlg = false;
this.filtered = false;
this.value = '';
this.label = '';

this.on('mount', function () {
  if (opts.items && opts.items.length > 0) {
    _this.label = opts.items[0].label;
    _this.value = opts.items[0].value;
    _this.default = opts.items[0].default;
  }
  _this.update();
  _this.parentUpdate();
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
    _this.selectMultiTarget(true);
  } else {
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
  if (!_this.focused()) {
    _this.visibleFlg = !_this.visibleFlg;
    if (_this.visibleFlg) {
      _this.open();
    } else {
      _this.close();
    }
  }
};

this.mousedown = function () {
  _this.itemActivated = true;
};

this.mouseup = function () {
  _this.itemActivated = false;
};

this.blur = function (isSearchField) {
  if (!isSearchField && opts.search) {
    return;
  }
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

this.clickSearch = function (event) {
  event.stopPropagation();
};

// -----------------------------------------------------
//                                         search option
//                                         -------------
this.keydown = function () {
  _this.filtered = true;
  _this.update();
};

this.keyup = function (event) {
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
  _this.visibleFlg = true;
  _this.search('');
  _this.transitionStatus = 'visible animating in slide down';
  setTimeout(function () {
    _this.transitionStatus = 'visible';
    _this.update();
  }, 300);

  if (opts.search) {
    _this.refs.condition.focus();
  }
  _this.update();
  _this.trigger('open');
};

this.close = function () {
  _this.visibleFlg = false;
  _this.transitionStatus = 'visible animating out slide down';
  setTimeout(function () {
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
  if (opts.action) {
    opts.action();
  }
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

this.parentUpdate = function () {
  if (_this.parent) {
    _this.parent.update();
  }
};

this.focused = function () {
  return document.activeElement === _this.root;
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