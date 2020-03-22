function onMounted(props, state) {
  this.update();
}

function onBeforeUpdate(props, state) {
  state.errors = props.errors || {};
  state.blockMessage = Object.keys(state.errors).length > 0 && !props.name;
}

var suValidationError = {
  'css': `su-validation-error.ui.error.message,[is="su-validation-error"].ui.error.message{ display: block !important; }`,

  'exports': {
    state: {
      errors: {}
    },

    onMounted,
    onBeforeUpdate
  },

  'template': function(template, expressionTypes, bindingTypes, getComponent) {
    return template(
      '<div expr109="expr109" class="ui basic pointing prompt label transition visible"></div><ul expr111="expr111" class="list"></ul>',
      [{
        'expressions': [{
          'type': expressionTypes.ATTRIBUTE,
          'name': 'class',

          'evaluate': function(scope) {
            return scope.state.blockMessage ? 'ui error message' : '';
          }
        }]
      }, {
        'type': bindingTypes.IF,

        'evaluate': function(scope) {
          return scope.state.errors[scope.props.name];
        },

        'redundantAttribute': 'expr109',
        'selector': '[expr109]',

        'template': template('<div expr110="expr110"></div>', [{
          'expressions': [{
            'type': expressionTypes.ATTRIBUTE,
            'name': 'class',

            'evaluate': function(scope) {
              return 'ui basic pointing prompt label transition visible';
            }
          }]
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

          'redundantAttribute': 'expr110',
          'selector': '[expr110]',
          'itemName': 'message',
          'indexName': null,

          'evaluate': function(scope) {
            return scope.state.errors[scope.props.name];
          }
        }])
      }, {
        'type': bindingTypes.IF,

        'evaluate': function(scope) {
          return scope.state.blockMessage;
        },

        'redundantAttribute': 'expr111',
        'selector': '[expr111]',

        'template': template('<template expr112="expr112"></template>', [{
          'expressions': [{
            'type': expressionTypes.ATTRIBUTE,
            'name': 'class',

            'evaluate': function(scope) {
              return 'list';
            }
          }]
        }, {
          'type': bindingTypes.EACH,
          'getKey': null,
          'condition': null,

          'template': template('<li expr113="expr113"></li>', [{
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

            'redundantAttribute': 'expr113',
            'selector': '[expr113]',
            'itemName': 'message',
            'indexName': null,

            'evaluate': function(scope) {
              return scope.errors;
            }
          }]),

          'redundantAttribute': 'expr112',
          'selector': '[expr112]',
          'itemName': 'errors',
          'indexName': null,

          'evaluate': function(scope) {
            return Object.values(scope.state.errors);
          }
        }])
      }]
    );
  },

  'name': 'su-validation-error'
};

export default suValidationError;
