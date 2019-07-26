function onMounted(props, state) {
  this.update();
}

function onBeforeUpdate(props, state) {
  state.errors = props.errors || {};
  state.blockMessage = Object.keys(state.errors).length > 0 && !props.name;
}

var suValidationError = {
  'css': `su-validation-error :scope.ui.error.message,[is="su-validation-error"] :scope.ui.error.message{ display: block !important; }`,

  'exports': {
    state: {
      errors: {}
    },

    onMounted,
    onBeforeUpdate
  },

  'template': function(template, expressionTypes, bindingTypes, getComponent) {
    return template(
      '<div expr134 class="ui basic pointing prompt label transition visible"></div><ul expr136 class="list"></ul>',
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

        'redundantAttribute': 'expr134',
        'selector': '[expr134]',

        'template': template('<div expr135></div>', [{
          'type': bindingTypes.EACH,
          'getKey': null,
          'condition': null,

          'template': template('<!---->', [{
            'expressions': [{
              'type': expressionTypes.TEXT,
              'childNodeIndex': 0,

              'evaluate': function(scope) {
                return scope.message;
              }
            }]
          }]),

          'redundantAttribute': 'expr135',
          'selector': '[expr135]',
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

        'redundantAttribute': 'expr136',
        'selector': '[expr136]',

        'template': template('<virtual expr137></virtual>', [{
          'type': bindingTypes.EACH,
          'getKey': null,
          'condition': null,

          'template': template(null, [{
            'type': bindingTypes.TAG,
            'getComponent': getComponent,

            'evaluate': function(scope) {
              return 'virtual';
            },

            'slots': [{
              'id': 'default',
              'html': '<li expr138></li>',

              'bindings': [{
                'type': bindingTypes.EACH,
                'getKey': null,
                'condition': null,

                'template': template('<!---->', [{
                  'expressions': [{
                    'type': expressionTypes.TEXT,
                    'childNodeIndex': 0,

                    'evaluate': function(scope) {
                      return scope.message;
                    }
                  }]
                }]),

                'redundantAttribute': 'expr138',
                'selector': '[expr138]',
                'itemName': 'message',
                'indexName': null,

                'evaluate': function(scope) {
                  return scope.errors;
                }
              }]
            }],

            'attributes': []
          }]),

          'redundantAttribute': 'expr137',
          'selector': '[expr137]',
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
