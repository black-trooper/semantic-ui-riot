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
      '<div expr71="expr71" class="ui basic pointing prompt label transition visible"></div><ul expr73="expr73" class="list"></ul>',
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

        'redundantAttribute': 'expr71',
        'selector': '[expr71]',

        'template': template('<div expr72="expr72"></div>', [{
          'expressions': [{
            'type': expressionTypes.ATTRIBUTE,
            'name': 'expr71',

            'evaluate': function(scope) {
              return 'expr71';
            }
          }, {
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
            }, {
              'type': expressionTypes.ATTRIBUTE,
              'name': 'expr72',

              'evaluate': function(scope) {
                return 'expr72';
              }
            }]
          }]),

          'redundantAttribute': 'expr72',
          'selector': '[expr72]',
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

        'redundantAttribute': 'expr73',
        'selector': '[expr73]',

        'template': template('<virtual expr74="expr74"></virtual>', [{
          'expressions': [{
            'type': expressionTypes.ATTRIBUTE,
            'name': 'expr73',

            'evaluate': function(scope) {
              return 'expr73';
            }
          }, {
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

          'template': template(null, [{
            'type': bindingTypes.TAG,
            'getComponent': getComponent,

            'evaluate': function(scope) {
              return 'virtual';
            },

            'slots': [{
              'id': 'default',
              'html': '<li expr75="expr75"></li>',

              'bindings': [{
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
                  }, {
                    'type': expressionTypes.ATTRIBUTE,
                    'name': 'expr75',

                    'evaluate': function(scope) {
                      return 'expr75';
                    }
                  }]
                }]),

                'redundantAttribute': 'expr75',
                'selector': '[expr75]',
                'itemName': 'message',
                'indexName': null,

                'evaluate': function(scope) {
                  return scope.errors;
                }
              }]
            }],

            'attributes': []
          }]),

          'redundantAttribute': 'expr74',
          'selector': '[expr74]',
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
