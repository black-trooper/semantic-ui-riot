riot.tag2('su-checkbox', '<div class="ui checkbox {opts.class}"> <input type="checkbox" checked="{checked}" onclick="{click}" ref="target"> <label onclick="{labelClick}"><yield></yield></label> </div>', '', '', function(opts) {
'use strict';

var _this = this;

var self = this;
this.checked = false;

this.on('mount', function () {
  if (!opts.checkbox) {
    opts.checkbox = {
      checked: false
    };
  }
  if (opts.checked) {
    opts.checkbox.checked = opts.checked;
  }
  if (opts.action) {
    opts.checkbox.action = opts.action;
  }

  self.checked = opts.checkbox.checked;

  _this.update();
  _this.parent.update();
});

this.click = function (event) {
  self.checked = event.target.checked;
  self.parent.update();
  if (opts.checkbox.action) {
    opts.checkbox.action();
  }
};

this.labelClick = function () {
  self.refs.target.click();
};
});
riot.tag2('su-radio', '<div class="ui {radio: isRadio()} checkbox {opts.class}"> <input type="radio" name="{name}" riot-value="{value}" checked="{checked}" onclick="{click}" ref="target"> <label onclick="{labelClick}"><yield></yield></label> </div>', '', '', function(opts) {
'use strict';

var _this = this;

var self = this;
this.checked = false;
this.name = '';

this.on('mount', function () {
  if (!opts.radio) {
    opts.radio = {
      checked: false
    };
  }
  if (opts.checked) {
    opts.radio.checked = opts.checked;
  }
  if (opts.action) {
    opts.radio.action = opts.action;
  }
  if (opts.name) {
    opts.radio.name = opts.name;
  }
  if (opts.value) {
    opts.radio.value = opts.value;
  }

  self.checked = opts.radio.checked;
  self.name = opts.radio.name;
  self.value = opts.radio.value;

  _this.update();
  _this.parent.update();
});

this.isRadio = function () {
  if (!_this.opts.class) {
    return true;
  }
  return !_this.opts.class.split(' ').every(function (str) {
    return str === 'slider';
  });
};

this.click = function (event) {
  self.checked = event.target.checked;
  self.parent.update();
  if (opts.radio.action) {
    opts.radio.action(event.target.value);
  }
};

this.labelClick = function () {
  self.refs.target.click();
};
});
riot.tag2('su-dropdown', '<div class="ui selection {opts.class} {search: searchFlg} {multiple: multipleFlg} dropdown {active: visibleFlg} {visible: visibleFlg}" onclick="{click}"> <i class="dropdown icon"></i> <input class="search" autocomplete="off" tabindex="0" ref="condition" if="{searchFlg}" onkeydown="{keydown}" onkeyup="{keyup}"> <a each="{item in items}" class="ui label transition visible" style="display: inline-block !important;" if="{item.selected}"> {item.label} <i class="delete icon" onclick="{unselect}"></i> </a> <div class="{default: default} text {filtered: filtered}" if="{!multipleFlg || !selectedFlg}"> {label} </div> <div class="menu transition {transitionStatus}" tabindex="-1"> <virtual each="{item in items}"> <div class="item {default: item.default}" if="{isVisible(item)}" riot-value="{item.value}" default="{item.default}" onclick="{itemClick}"> <i class="{item.icon} icon" if="{item.icon}"></i> <img class="ui avatar image" riot-src="{item.image}" if="{item.image}"> <span class="description" if="{item.description}">{item.description}</span> <span class="text">{item.label}</span> </div> <div class="header" if="{item.header && !filtered}"> <i class="{item.icon} icon" if="{item.icon}"></i> {item.label} </div> <div class="divider" if="{item.divider && !filtered}"></div> </virtual> <div class="message" if="{filtered && filteredItems.length == 0}">No results found.</div> </div> </div>', 'su-dropdown .ui.dropdown .menu>.item.default,[data-is="su-dropdown"] .ui.dropdown .menu>.item.default{ color: rgba(0, 0, 0, 0.4) }', '', function(opts) {
'use strict';

var _this = this;

var self = this;
this.searchFlg = false;
this.multipleFlg = false;
this.visibleFlg = false;
this.selectedFlg = false;
this.filtered = false;
this.value = '';
this.label = '';
this.items = [];

this.on('mount', function () {
  if (!opts.dropdown) {
    opts.dropdown = {};
  }
  if (opts.items) {
    opts.dropdown.items = opts.items;
  }
  if (opts.search) {
    opts.dropdown.search = opts.search;
  }
  if (opts.multiple) {
    opts.dropdown.multiple = opts.multiple;
  }
  _this.items = opts.dropdown.items;
  _this.searchFlg = opts.dropdown.search;
  _this.multipleFlg = opts.dropdown.multiple;

  _this.label = _this.items[0].label;
  _this.value = _this.items[0].value;
  _this.default = _this.items[0].default;

  document.addEventListener('click', _this.handleClickOutside);
  _this.update();
  _this.parent.update();
});

this.on('unmount', function () {
  document.removeEventListener('click', _this.handleClickOutside);
});

// ===================================================================================
//                                                                               Event
//                                                                               =====
this.click = function () {
  _this.visibleFlg = !_this.visibleFlg;
  if (_this.visibleFlg) {
    _this.open();
  } else {
    _this.close();
  }
};

this.itemClick = function (event) {
  event.stopPropagation();
  if (_this.multipleFlg) {
    if (!event.item.item.default) {
      event.item.item.selected = true;
    }
    _this.value = _this.items.filter(function (item) {
      return item.selected;
    }).map(function (item) {
      return item.value;
    });
    _this.selectedFlg = _this.items.some(function (item) {
      return item.selected;
    });
    _this.update();
    return;
  }
  _this.selectTarget({
    value: event.target.value,
    label: event.target.textContent,
    default: event.target.attributes['default']
  });
  _this.close();
};

this.handleClickOutside = function (e) {
  if (!_this.root.contains(e.target) && _this.visibleFlg) {
    _this.close();
  }
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
  _this.value = _this.items.filter(function (item) {
    return item.selected;
  }).map(function (item) {
    return item.value;
  });
  _this.selectedFlg = _this.items.some(function (item) {
    return item.selected;
  });
};

// ===================================================================================
//                                                                               Logic
//                                                                               =====
this.open = function () {
  _this.search('');
  _this.transitionStatus = 'visible animating in slide down';
  setTimeout(function () {
    _this.transitionStatus = 'visible';
    _this.update();
  }, 300);

  if (_this.searchFlg) {
    _this.refs.condition.focus();
  }
  _this.update();
};

this.close = function () {
  _this.visibleFlg = false;
  _this.transitionStatus = 'visible animating out slide down';
  setTimeout(function () {
    _this.transitionStatus = 'hidden';
    _this.update();
  }, 300);

  if (_this.searchFlg) {
    _this.refs.condition.blur();
    if (_this.filtered && _this.filteredItems.length > 0) {
      _this.selectTarget(_this.filteredItems[0]);
    } else {
      _this.refs.condition.value = '';
      _this.filtered = false;
    }
  }
  _this.update();
};

this.selectTarget = function (target) {
  self.value = target.value;
  self.label = target.label;
  self.default = target.default;
  if (_this.searchFlg) {
    _this.refs.condition.value = '';
    _this.filtered = false;
  }
  _this.update();
  self.parent.update();
  if (opts.dropdown.action) {
    opts.dropdown.action();
  }
};

this.search = function (target) {
  _this.items.forEach(function (item) {
    item.searched = item.label && item.label.toLowerCase().indexOf(target) >= 0;
  });
  _this.filteredItems = _this.items.filter(function (item) {
    return item.searched;
  });
  _this.update();
};

// ===================================================================================
//                                                                              Helper
//                                                                              ======
this.isVisible = function (item) {
  if (_this.multipleFlg && (item.default || item.selected)) {
    return false;
  }
  return item.searched && !item.header && !item.divider;
};
});
riot.tag2('su-modal', '<div class="ui dimmer modals page transition {transitionStatus}" onclick="{dimmerClose}"> <div class="ui modal transition visible active {opts.class}"> <i class="close icon" if="{opts.class == \'fullscreen\'}" onclick="{close}"></i> <div class="ui header {icon: opts.modal.heading.icon}"> <i class="icon {opts.modal.heading.icon}" if="{opts.modal.heading.icon}"></i> {(opts.modal.heading.text) ? opts.modal.heading.text : opts.modal.heading} </div> <div class="content {opts.modal.content_class}"> <yield></yield> </div> <div class="actions"> <div each="{opts.modal.buttons}" class="ui button {type} {labeled: icon && text} {icon: icon} {inverted: opts.class == \'basic\'}" onclick="{parent.click.bind(this, action)}"> {text} <i class="icon {icon}" if="{icon}"></i> </div> </div> </div> </div>', 'su-modal .ui.dimmer.visible.transition,[data-is="su-modal"] .ui.dimmer.visible.transition{ display: flex !important; align-items: center; justify-content: center; } su-modal .ui.modal,[data-is="su-modal"] .ui.modal{ top: auto; left: auto; position: relative; margin: 0; }', '', function(opts) {
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
});