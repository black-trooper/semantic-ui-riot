// ===================================================================================
//                                                                           Lifecycle
//                                                                           =========
function onMounted(props, state) {
  let defaultButton = {};
  if (this.suDefaultOptions && this.suDefaultOptions.alert && this.suDefaultOptions.alert.button) {
    defaultButton = this.suDefaultOptions.alert.button;
  }
  if (defaultButton.default) {
    this.button.default = true;
  }
  this.button.text = defaultButton.text || 'Close';
  this.button.type = defaultButton.type || '';
  this.button.icon = defaultButton.icon || '';

  if (this.obs) {
    this.obs.on('su-alert-show', option => {
      suAlert(this, option);
    });
  }
}

// ===================================================================================
//                                                                              Events
//                                                                              ======
function onClose() {
  this.obs.trigger('callbackConfirm');
}

// ===================================================================================
//                                                                               Logic
//                                                                               =====
function setButton(tag, option) {
  const btn = {
    text: option.button.text || tag.button.text,
    type: option.button.type || tag.button.type,
    icon: option.button.icon || tag.button.icon,
    action: 'close',
    closable: false,
  };
  if (option.button.default) {
    btn.default = true;
  } else if (option.button.default === null) {
    btn.default = tag.button.default;
  }

  tag.modal.buttons.length = 0; // reset
  tag.modal.buttons.push(btn);
}

function showAlert(tag, option = {}) {
  tag.title = option.title;
  tag.messages = Array.isArray(option.message) ? option.message : [option.message];
  setButton(tag, option);
  tag.update();
  tag.suShowModal(tag.$('su-modal'));
}

function suAlert(tag, param) {
  const option = {
    title: null,
    message: null,
    button: {
      text: null,
      default: null,
      type: null,
      icon: null,
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
    if (param.button) {
      option.button = param.button;
    }
  }

  showAlert(tag, option);
  tag.obs.on('callbackConfirm', () => {
    tag.suHideModal(tag.$('su-modal'));
    tag.obs.trigger('su-alert-close');
  });
}

var suAlert$1 = {
  'css': `su-alert .ui.dimmer,[is="su-alert"] .ui.dimmer{ z-index: 1020; } su-alert .ui.modal,[is="su-alert"] .ui.modal{ z-index: 1021; } su-alert .ui.message,[is="su-alert"] .ui.message{ background: none; box-shadow: none; } su-alert .ui.message .header+p,[is="su-alert"] .ui.message .header+p{ margin-top: 1em; }`,

  'exports': {
    state: {
    },

    modal: {
      closable: false,
      buttons: []
    },

    button: {},
    onMounted,
    onClose
  },

  'template': function(template, expressionTypes, bindingTypes, getComponent) {
    return template('<su-modal expr12="expr12" class="tiny"></su-modal>', [{
      'type': bindingTypes.TAG,
      'getComponent': getComponent,

      'evaluate': function(scope) {
        return 'su-modal';
      },

      'slots': [{
        'id': 'default',
        'html': '<div class="ui icon message"><i class="info circle icon"></i><div class="scrolling content"><div expr13="expr13" class="header"></div><p expr14="expr14"></p></div></div>',

        'bindings': [{
          'type': bindingTypes.IF,

          'evaluate': function(scope) {
            return scope.title;
          },

          'redundantAttribute': 'expr13',
          'selector': '[expr13]',

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
                return scope.message;
              }
            }]
          }]),

          'redundantAttribute': 'expr14',
          'selector': '[expr14]',
          'itemName': 'message',
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
        'name': 'modal',

        'evaluate': function(scope) {
          return scope.modal;
        }
      }, {
        'type': expressionTypes.EVENT,
        'name': 'onclose',

        'evaluate': function(scope) {
          return scope.onClose;
        }
      }],

      'redundantAttribute': 'expr12',
      'selector': '[expr12]'
    }]);
  },

  'name': 'su-alert'
};

export default suAlert$1;
