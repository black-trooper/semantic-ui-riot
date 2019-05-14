function onClick(label) {
  this.dispatch('click', label);
}

var suTabsetTest_options = {
  'css': null,

  'exports': {
    onClick
  },

  'template': function(template, expressionTypes, bindingTypes, getComponent) {
    return template('<su-tabset expr1></su-tabset>', [{
      'type': bindingTypes.TAG,
      'getComponent': getComponent,

      'evaluate': function(scope) {
        return 'su-tabset';
      },

      'slots': [{
        'id': 'default',
        'html': '<su-tab expr2 label="Home"></su-tab><su-tab expr3 label="Messages"></su-tab>',

        'bindings': [{
          'type': bindingTypes.TAG,
          'getComponent': getComponent,

          'evaluate': function(scope) {
            return 'su-tab';
          },

          'slots': [{
            'id': 'default',
            'html': 'Home content',
            'bindings': []
          }],

          'attributes': [{
            'type': expressionTypes.ATTRIBUTE,
            'name': 'label',

            'evaluate': function() {
              return 'Home';
            }
          }],

          'redundantAttribute': 'expr2',
          'selector': '[expr2]'
        }, {
          'type': bindingTypes.TAG,
          'getComponent': getComponent,

          'evaluate': function(scope) {
            return 'su-tab';
          },

          'slots': [{
            'id': 'default',
            'html': 'Messages content',
            'bindings': []
          }],

          'attributes': [{
            'type': expressionTypes.ATTRIBUTE,
            'name': 'label',

            'evaluate': function() {
              return 'Messages';
            }
          }],

          'redundantAttribute': 'expr3',
          'selector': '[expr3]'
        }]
      }],

      'attributes': [{
        'type': expressionTypes.ATTRIBUTE,
        'name': 'onclick',

        'evaluate': function(scope) {
          return label => scope.onClick(label);
        }
      }, {
        'type': expressionTypes.ATTRIBUTE,
        'name': 'class',

        'evaluate': function(scope) {
          return scope.props.class;
        }
      }, {
        'type': expressionTypes.ATTRIBUTE,
        'name': 'active',

        'evaluate': function(scope) {
          return scope.props.active;
        }
      }, {
        'type': expressionTypes.ATTRIBUTE,
        'name': 'lazy-mount',

        'evaluate': function(scope) {
          return scope.props.lazyMount;
        }
      }],

      'redundantAttribute': 'expr1',
      'selector': '[expr1]'
    }]);
  },

  'name': 'su-tabset-test'
};

export default suTabsetTest_options;
