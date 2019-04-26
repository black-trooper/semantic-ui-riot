// ===================================================================================
//                                                                      Tag Properties
//                                                                      ==============
tag.modal = {
  closable: false,
  buttons: []
};

// ===================================================================================
//                                                                         Tag Methods
//                                                                         ===========
tag.mixin('semantic-ui');
tag.observable.on('showConfirm', showConfirm);


// ===================================================================================
//                                                                          Properties
//                                                                          ==========
let reverse = false;
const cancelButton = {
  action: 'negativeAction'
};
const okButton = {
  action: 'positiveAction'
};
riot.mixin({
  suConfirm
});

function setButtons(option) {
  const cancel = {
    text: option.buttons.cancel.text || cancelButton.text,
    type: option.buttons.cancel.type !== null ? option.buttons.cancel.type : cancelButton.type,
    icon: option.buttons.cancel.icon !== null ? option.buttons.cancel.icon : cancelButton.icon,
    action: cancelButton.action,
  };
  const ok = {
    text: option.buttons.ok.text || okButton.text,
    type: option.buttons.ok.type !== null ? option.buttons.ok.type : okButton.type,
    icon: option.buttons.ok.icon !== null ? option.buttons.ok.icon : okButton.icon,
    action: okButton.action,
  };

  if (option.buttons.ok.default) {
    ok.default = true;
  } else if (option.buttons.cancel.default) {
    cancel.default = true;
  } else if (option.buttons.ok.default === null && option.buttons.cancel.default === null) {
    ok.default = okButton.default;
    cancel.default = cancelButton.default;
  }

  tag.modal.buttons.length = 0;
  tag.modal.buttons.push((option.reverse || reverse) ? ok : cancel);
  tag.modal.buttons.push((option.reverse || reverse) ? cancel : ok);
}

function showConfirm(option) {
  tag.title = option.title;
  tag.messages = Array.isArray(option.message) ? option.message : [option.message];
  setButtons(option);
  tag.update();
  tag.refs.modal.show();
}

function suConfirm(param) {
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

  return tag.Q.Promise((resolve, reject) => {
    tag.observable.trigger('showConfirm', option);
    tag.observable.on('callbackConfirm', result => {
      return result ? resolve() : reject()
    });
  })
}

var suConfirm$1 = {
  'css': `su-confirm .ui.dimmer,[is="su-confirm"] .ui.dimmer{
      z-index: 1010;
    } su-confirm .ui.modal,[is="su-confirm"] .ui.modal{
      z-index: 1011;
    } su-confirm .ui.message,[is="su-confirm"] .ui.message{
      background: none;
      box-shadow: none;
    }`,

  'exports': {
    state: {

    }
  },

  'template': function(template, expressionTypes, bindingTypes, getComponent) {
    return template('<su-modal expr7 class="tiny" ref="modal"></su-modal>', [{
      'type': bindingTypes.TAG,
      'getComponent': getComponent,

      'evaluate': function(scope) {
        return 'su-modal';
      },

      'slots': [{
        'id': 'default',
        'html': '<div class="ui icon message"><i class="question circle outline icon"></i><div class="scrolling content"><div expr8 class="header"></div><p expr9></p></div></div>',

        'bindings': [{
          'type': bindingTypes.IF,

          'evaluate': function(scope) {
            return scope.props.title;
          },

          'redundantAttribute': 'expr8',
          'selector': '[expr8]',

          'template': template('<!---->', [{
            'expressions': [{
              'type': expressionTypes.TEXT,
              'childNodeIndex': 0,

              'evaluate': function(scope) {
                return ['\n          ', scope.props.title, '\n        '].join('');
              }
            }]
          }])
        }, {
          'type': bindingTypes.EACH,
          'getKey': null,
          'condition': null,

          'template': template('<!---->', [{
            'expressions': [{
              'type': expressionTypes.TEXT,
              'childNodeIndex': 0,

              'evaluate': function(scope) {
                return scope.messsage;
              }
            }]
          }]),

          'redundantAttribute': 'expr9',
          'selector': '[expr9]',
          'itemName': 'messsage',
          'indexName': null,

          'evaluate': function(scope) {
            return scope.props.messages;
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
        'name': 'ref',

        'evaluate': function() {
          return 'modal';
        }
      }, {
        'type': expressionTypes.ATTRIBUTE,
        'name': 'modal',

        'evaluate': function(scope) {
          return scope.modal;
        }
      }, {
        'type': expressionTypes.ATTRIBUTE,
        'name': 'title',

        'evaluate': function(scope) {
          return scope.title;
        }
      }, {
        'type': expressionTypes.ATTRIBUTE,
        'name': 'messages',

        'evaluate': function(scope) {
          return scope.messages;
        }
      }],

      'redundantAttribute': 'expr7',
      'selector': '[expr7]'
    }]);
  },

  'name': 'su-confirm'
};

export default suConfirm$1;
