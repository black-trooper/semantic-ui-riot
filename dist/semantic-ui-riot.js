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
riot.tag2('su-dropdown', '<div class="ui selection dropdown {active: visible} {visible: visible}" onclick="{click}" onblur="{blur}"> <i class="dropdown icon"></i> <div class="{default: default} text"> {label} </div> <div class="menu transition {visible: visible}" tabindex="-1"> <div class="item {default: item.default}" each="{item in items}" riot-value="{item.value}" default="{item.default}" onclick="{itemClick}"> {item.label} </div> </div> </div>', 'su-dropdown .ui.dropdown .menu>.item.default,[data-is="su-dropdown"] .ui.dropdown .menu>.item.default{ color: rgba(0, 0, 0, 0.4) }', '', function(opts) {
'use strict';

var _this = this;

var self = this;
this.visible = false;
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
  if (opts.action) {
    opts.dropdown.action = opts.action;
  }
  _this.items = opts.dropdown.items;
  _this.label = _this.items[0].label;
  _this.value = _this.items[0].value;
  _this.default = _this.items[0].default;
  _this.update();
});

this.click = function () {
  _this.visible = !_this.visible;
  _this.update();
};

this.itemClick = function (event) {
  self.value = event.target.value;
  self.label = event.target.textContent;
  self.default = event.target.attributes['default'];
  _this.update();
  self.parent.update();
  if (opts.dropdown.action) {
    opts.dropdown.action();
  }
};

this.blur = function () {
  _this.visibile = false;
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