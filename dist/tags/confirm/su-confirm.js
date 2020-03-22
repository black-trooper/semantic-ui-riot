// ===================================================================================
//                                                                           Lifecycle
//                                                                           =========
function onMounted(props, state) {
  let defaultOkButton = {};
  let defaultCancelButton = {};
  this.reverse = false;
  if (this.suDefaultOptions && this.suDefaultOptions.confirm) {
    if (this.suDefaultOptions.confirm.reverse) {
      this.reverse = this.suDefaultOptions.confirm.reverse;
    }
    if (this.suDefaultOptions.confirm.buttons) {
      if (this.suDefaultOptions.confirm.buttons.ok) {
        defaultOkButton = this.suDefaultOptions.confirm.buttons.ok;
      }
      if (this.suDefaultOptions.confirm.buttons.cancel) {
        defaultCancelButton = this.suDefaultOptions.confirm.buttons.cancel;
      }
    }
  }

  this.okButton.text = defaultOkButton.text || 'OK';
  this.okButton.type = typeof defaultOkButton.type !== 'undefined' ? defaultOkButton.type : 'primary';
  this.okButton.icon = typeof defaultOkButton.icon !== 'undefined' ? defaultOkButton.icon : 'check';
  this.cancelButton.text = defaultCancelButton.text || 'Cancel';
  this.cancelButton.type = defaultCancelButton.type || '';
  this.cancelButton.icon = defaultCancelButton.icon || '';

  if (defaultOkButton.default) {
    this.okButton.default = true;
  } else if (defaultCancelButton.default) {
    this.cancelButton.default = true;
  } else if (typeof defaultOkButton.default === 'undefined' && typeof defaultOkButton.default === 'undefined') {
    this.okButton.default = true;
  }

  if (this.obs) {
    this.obs.on('su-confirm-show', option => {
      suConfirm(this, option);
    });
  }
}

// ===================================================================================
//                                                                              Events
//                                                                              ======
function onOk() {
  this.show = false;
  this.update();
  this.obs.trigger('callbackConfirm', true);
}

function onCancel() {
  this.show = false;
  this.update();
  this.obs.trigger('callbackConfirm', false);
}

// ===================================================================================
//                                                                               Logic
//                                                                               =====
function setButtons(tag, option) {
  const cancel = {
    text: option.buttons.cancel.text || tag.cancelButton.text,
    type: option.buttons.cancel.type !== null ? option.buttons.cancel.type : tag.cancelButton.type,
    icon: option.buttons.cancel.icon !== null ? option.buttons.cancel.icon : tag.cancelButton.icon,
    action: 'cancel',
  };
  const ok = {
    text: option.buttons.ok.text || tag.okButton.text,
    type: option.buttons.ok.type !== null ? option.buttons.ok.type : tag.okButton.type,
    icon: option.buttons.ok.icon !== null ? option.buttons.ok.icon : tag.okButton.icon,
    action: 'ok',
  };

  if (option.buttons.ok.default) {
    ok.default = true;
  } else if (option.buttons.cancel.default) {
    cancel.default = true;
  } else if (option.buttons.ok.default === null && option.buttons.cancel.default === null) {
    ok.default = tag.okButton.default;
    cancel.default = tag.cancelButton.default;
  }

  tag.modal.buttons.length = 0;
  tag.modal.buttons.push((option.reverse || tag.reverse) ? ok : cancel);
  tag.modal.buttons.push((option.reverse || tag.reverse) ? cancel : ok);
}

function showConfirm(tag, option = {}) {
  tag.title = option.title;
  tag.messages = Array.isArray(option.message) ? option.message : [option.message];
  // kokookasii
  setButtons(tag, option);
  tag.show = true;
  tag.update();
}

function suConfirm(tag, param) {
  const option = {
    title: null,
    message: null,
    reverse: null,
    buttons: {
      ok: {
        text: null,
        default: null,
        type: null,
        icon: null,
      },
      cancel: {
        text: null,
        default: null,
        type: null,
        icon: null,
      },
    },
  };
  if (typeof param === 'string') {
    option.message = param;
  } else if (param) {
    if (param.title) {
      option.title = param.title;
    }
    if (param.message) {
      option.message = param.message;
    }
    if (param.reverse) {
      option.reverse = param.reverse;
    }
    if (param.buttons) {
      if (param.buttons.ok) {
        option.buttons.ok = param.buttons.ok;
      }
      if (param.buttons.cancel) {
        option.buttons.cancel = param.buttons.cancel;
      }
    }
  }

  showConfirm(tag, option);
  tag.obs.on('callbackConfirm', result => {
    tag.obs.trigger('su-confirm-close', result);
  });
}

var suConfirm$1 = {
  'css': `su-confirm .ui.dimmer,[is="su-confirm"] .ui.dimmer{ z-index: 1010; } su-confirm .ui.modal,[is="su-confirm"] .ui.modal{ z-index: 1011; } su-confirm .ui.message,[is="su-confirm"] .ui.message{ background: none; box-shadow: none; }`,

  'exports': {
    state: {
    },

    modal: {
      closable: false,
      buttons: []
    },

    show: false,
    reverse: false,

    cancelButton: {
      action: 'negativeAction'
    },

    okButton: {
      action: 'positiveAction'
    },

    onMounted,
    onOk,
    onCancel
  },

  'template': function(template, expressionTypes, bindingTypes, getComponent) {
    return template('<su-modal expr6="expr6" class="tiny"></su-modal>', [{
      'type': bindingTypes.TAG,
      'getComponent': getComponent,

      'evaluate': function(scope) {
        return 'su-modal';
      },

      'slots': [{
        'id': 'default',
        'html': '<div class="ui icon message"><i class="question circle outline icon"></i><div class="scrolling content"><div expr7="expr7" class="header"></div><p expr8="expr8"></p></div></div>',

        'bindings': [{
          'type': bindingTypes.IF,

          'evaluate': function(scope) {
            return scope.title;
          },

          'redundantAttribute': 'expr7',
          'selector': '[expr7]',

          'template': template(' ', [{
            'expressions': [{
              'type': expressionTypes.TEXT,
              'childNodeIndex': 0,

              'evaluate': function(scope) {
                return [scope.title].join('');
              }
            }, {
              'type': expressionTypes.ATTRIBUTE,
              'name': 'class',

              'evaluate': function(scope) {
                return 'header';
              }
            }]
          }])
        }, {
          'type': bindingTypes.EACH,
          'getKey': null,
          'condition': null,

          'template': template(' ', [{
            'expressions': [{
              'type': expressionTypes.TEXT,
              'childNodeIndex': 0,

              'evaluate': function(scope) {
                return scope.messsage;
              }
            }]
          }]),

          'redundantAttribute': 'expr8',
          'selector': '[expr8]',
          'itemName': 'messsage',
          'indexName': null,

          'evaluate': function(scope) {
            return scope.messages;
          }
        }]
      }],

      'attributes': [{
        'type': expressionTypes.ATTRIBUTE,
        'name': 'class',

        'evaluate': function() {
          return 'tiny';
        }
      }, {
        'type': expressionTypes.ATTRIBUTE,
        'name': 'show',

        'evaluate': function(scope) {
          return scope.show;
        }
      }, {
        'type': expressionTypes.ATTRIBUTE,
        'name': 'modal',

        'evaluate': function(scope) {
          return scope.modal;
        }
      }, {
        'type': expressionTypes.EVENT,
        'name': 'onok',

        'evaluate': function(scope) {
          return scope.onOk;
        }
      }, {
        'type': expressionTypes.EVENT,
        'name': 'oncancel',

        'evaluate': function(scope) {
          return scope.onCancel;
        }
      }],

      'redundantAttribute': 'expr6',
      'selector': '[expr6]'
    }]);
  },

  'name': 'su-confirm'
};

export default suConfirm$1;
