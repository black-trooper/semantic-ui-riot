riot.tag2('su-checkbox', '<div class="ui checkbox {type}"> <input type="checkbox" checked="{checked}" onclick="{click}" ref="target"> <label onclick="{labelClick}"><yield></yield></label> </div>', '', '', function(opts) {
'use strict';

var _this = this;

var self = this;
this.checked = false;
this.type = '';

this.on('mount', function () {
  if (!opts.checkbox) {
    opts.checkbox = {
      checked: false
    };
  }
  if (opts.type) {
    opts.checkbox.type = opts.type;
  }
  if (opts.checked) {
    opts.checkbox.checked = opts.checked;
  }
  if (opts.action) {
    opts.checkbox.action = opts.action;
  }

  self.type = opts.checkbox.type;
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
riot.tag2('su-radio', '<div class="ui {radio: isRadio()} checkbox {type}"> <input type="radio" name="{name}" riot-value="{value}" checked="{checked}" onclick="{click}" ref="target"> <label onclick="{labelClick}"><yield></yield></label> </div>', '', '', function(opts) {
'use strict';

var _this = this;

var self = this;
this.checked = false;
this.type = '';
this.name = '';

this.on('mount', function () {
  if (!opts.radio) {
    opts.radio = {
      checked: false
    };
  }
  if (opts.type) {
    opts.radio.type = opts.type;
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

  self.type = opts.radio.type;
  self.checked = opts.radio.checked;
  self.name = opts.radio.name;
  self.value = opts.radio.value;

  _this.update();
  _this.parent.update();
});

this.isRadio = function () {
  if (!self.type) {
    return true;
  }
  return !self.type.split(' ').every(function (str) {
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
riot.tag2('su-modal', '<div class="ui dimmer modals page transition visible active" if="{opts.modal.visible}" onclick="{dimmerClose}"></div> <div class="ui modal transition visible active {modal_type}" if="{opts.modal.visible}"> <i class="close icon" if="{modal_type == \'fullscreen\'}" onclick="{close}"></i> <div class="ui header {icon: opts.modal.heading.icon}"> <i class="icon {opts.modal.heading.icon}" if="{opts.modal.heading.icon}"></i> {(opts.modal.heading.text) ? opts.modal.heading.text : opts.modal.heading} </div> <div class="content {opts.modal.content_type}"> <yield></yield> </div> <div class="actions"> <div each="{opts.modal.buttons}" class="ui button {type} {labeled: icon && text} {icon: icon} {inverted: modal_type == \'basic\'}" onclick="{action}"> {text} <i class="icon {icon}" if="{icon}"></i> </div> </div> </div>', '', '', function(opts) {
'use strict';

var _this = this;

this.on('mount', function () {
  if (!opts.modal) {
    opts.modal = {};
  }
  _this.modal_type = opts.modal.type;
});

this.dimmerClose = function () {
  if (opts.modal.closable) {
    opts.modal.visible = false;
    _this.trigger('close');
  }
};

this.close = function () {
  opts.modal.visible = false;
  _this.trigger('close');
};
});
riot.tag2('su-dropdown', '<div class="ui selection {search: search} dropdown {active: visible} {visible: visible}" onclick="{click}"> <i class="dropdown icon"></i> <input class="search" autocomplete="off" tabindex="0" ref="search" if="{search}" onkeydown="{keydown}" onkeyup="{keyup}"> <div class="{default: default} text {filtered: filtered}"> {label} </div> <div class="menu transition {visible: visible}" tabindex="-1"> <div class="item {default: item.default}" each="{item in items}" if="{item.select}" riot-value="{item.value}" default="{item.default}" onclick="{itemClick}"> {item.label} </div> <div class="message" if="{filtered && filteredCount == 0}">No results found.</div> </div> </div>', 'su-dropdown .ui.dropdown .menu>.item.default,[data-is="su-dropdown"] .ui.dropdown .menu>.item.default{ color: rgba(0, 0, 0, 0.4) }', '', function(opts) {
'use strict';

var _this = this;

var self = this;
this.search = false;
this.visible = false;
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
  _this.items = opts.dropdown.items;
  _this.search = opts.dropdown.search;

  _this.label = _this.items[0].label;
  _this.value = _this.items[0].value;
  _this.default = _this.items[0].default;
  _this.update();
  _this.parent.update();
});

this.click = function () {
  _this.select('');
  _this.visible = !_this.visible;
  if (_this.search) {
    if (_this.visible) {
      _this.refs.search.focus();
    } else {
      _this.refs.search.blur();
    }
  }
  _this.update();
};

this.itemClick = function (event) {
  self.value = event.target.value;
  self.label = event.target.textContent;
  self.default = event.target.attributes['default'];
  if (_this.search) {
    _this.refs.search.value = '';
    _this.filtered = false;
  }
  _this.update();
  self.parent.update();
  if (opts.dropdown.action) {
    opts.dropdown.action();
  }
};

this.keydown = function () {
  _this.filtered = true;
  _this.update();
};

this.keyup = function (event) {
  var value = event.target.value.toLowerCase();
  _this.filtered = value.length > 0;
  _this.select(value);
};

this.select = function (target) {
  _this.items.forEach(function (item) {
    item.select = item.label.toLowerCase().indexOf(target) >= 0;
  });
  _this.filteredCount = _this.items.filter(function (item) {
    return item.select;
  });
  _this.update();
};
});