riot.tag2('app', '<h2>Modal</h2> <div class="demo"> <su-modal modal="{modal}"> Modal content </su-modal> </div> <button class="button" onclick="{showModal}">Show modal</button> <button class="button" onclick="{toggleModalClosable}">Toggle closable</button>', '', '', function(opts) {
'use strict';

var _this = this;

/*
* MODAL
*/
this.modal = {
    visible: true,
    heading: 'Modal heading',
    size: 'large',
    buttons: [{
        text: 'Ok',
        type: 'primary',
        icon: 'checkmark',
        action: function action() {
            return _this.modal.visible = false;
        }
    }, {
        text: 'Canel',
        action: function action() {
            return _this.modal.visible = false;
        }
    }]
};

this.showModal = function () {
    _this.modal.visible = true;
};

this.toggleModalClosable = function () {
    _this.modal.closable = !_this.modal.closable;
};
});