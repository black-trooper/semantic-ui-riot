riot.tag2('demo-modal', '<h2>Modal</h2> <div class="demo"> <su-modal modal="{modal}"> Modal content </su-modal> </div> <button class="button" onclick="{showModal}">Show modal</button> <button class="button" onclick="{toggleModalClosable}">Toggle closable</button> <div class="demo"> <su-modal modal="{modal_basic}"> Your inbox is getting full, would you like us to enable automatic archiving of old messages? </su-modal> </div> <button class="button" onclick="{showModalBasic}">Show modal</button>', '', '', function(opts) {
'use strict';

var _this = this;

/*
* MODAL
*/
this.modal = {
  visible: false,
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
/*
* MODAL BASIC
*/
this.modal_basic = {
  visible: false,
  heading: {
    text: 'Archive Old Messages',
    icon: 'archive'
  },
  type: 'basic',
  buttons: [{
    text: 'No',
    action: function action() {
      return _this.modal_basic.visible = false;
    }
  }, {
    text: 'Yes',
    type: 'green',
    icon: 'checkmark',
    action: function action() {
      return _this.modal_basic.visible = false;
    }
  }]
};

this.showModalBasic = function () {
  _this.modal_basic.visible = true;
};

this.on('mount', function () {
  PR.prettyPrint(false);
});
});