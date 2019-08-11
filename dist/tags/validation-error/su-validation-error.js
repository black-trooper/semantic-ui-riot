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
      '<div expr61 class="ui basic pointing prompt label transition visible"></div><ul expr63 class="list"></ul>',
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

        'redundantAttribute': 'expr61',
        'selector': '[expr61]',

        'template': template('<div expr62></div>', [{
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

          'redundantAttribute': 'expr62',
          'selector': '[expr62]',
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

        'redundantAttribute': 'expr63',
        'selector': '[expr63]',

        'template': template('<virtual expr64></virtual>', [{
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
              'html': '<li expr65></li>',

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

                'redundantAttribute': 'expr65',
                'selector': '[expr65]',
                'itemName': 'message',
                'indexName': null,

                'evaluate': function(scope) {
                  return scope.errors;
                }
              }]
            }],

            'attributes': []
          }]),

          'redundantAttribute': 'expr64',
          'selector': '[expr64]',
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
