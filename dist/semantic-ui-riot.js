riot.tag2('su-checkbox', '<div class="ui checkbox {style}"> <input type="checkbox" checked="{checked}" onclick="{click}"> <label><yield></yield></label> </div>', '', '', function(opts) {
'use strict';

var _this = this;

var self = this;
this.checked = false;
this.slider = false;

this.on('mount', function () {
    if (!opts.checkbox) {
        opts.checkbox = {
            checked: false
        };
    }
    if (opts.style) {
        opts.checkbox.style = opts.style;
    }
    if (opts.checked) {
        opts.checkbox.checked = opts.checked;
    }
    if (opts.action) {
        opts.checkbox.action = opts.action;
    }

    self.style = opts.checkbox.style;
    self.checked = opts.checkbox.checked;

    _this.update();
    _this.parent.update();
});

this.click = function (e) {
    self.checked = e.target.checked;
    self.parent.update();
    if (opts.checkbox.action) {
        opts.checkbox.action();
    }
};
});
riot.tag2('su-checkbox', '<div class="ui checkbox {style}"> <input type="checkbox" checked="{checked}" onclick="{click}"> <label><yield></yield></label> </div>', '', '', function(opts) {
'use strict';

var _this = this;

var self = this;
this.checked = false;
this.slider = false;

this.on('mount', function () {
    if (!opts.checkbox) {
        opts.checkbox = {
            checked: false
        };
    }
    if (opts.style) {
        opts.checkbox.style = opts.style;
    }
    if (opts.checked) {
        opts.checkbox.checked = opts.checked;
    }
    if (opts.action) {
        opts.checkbox.action = opts.action;
    }

    self.style = opts.checkbox.style;
    self.checked = opts.checkbox.checked;

    _this.update();
    _this.parent.update();
});

this.click = function (e) {
    self.checked = e.target.checked;
    self.parent.update();
    if (opts.checkbox.action) {
        opts.checkbox.action();
    }
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