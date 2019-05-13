function onClick(label) {
  this.dispatch('click', label);
}

var suTabsetTest = {
  'css': null,

  'exports': {
    onClick
  },

  'template': function(template, expressionTypes, bindingTypes, getComponent) {
    return template('<su-tabset expr3></su-tabset>', [{
      'type': bindingTypes.TAG,
      'getComponent': getComponent,

      'evaluate': function(scope) {
        return 'su-tabset';
      },

      'slots': [{
        'id': 'default',
        'html': '<su-tab expr4 label="Home"></su-tab><su-tab expr5 label="Messages"></su-tab>',

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

          'redundantAttribute': 'expr4',
          'selector': '[expr4]'
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

          'redundantAttribute': 'expr5',
          'selector': '[expr5]'
        }]
      }],

      'attributes': [{
        'type': expressionTypes.ATTRIBUTE,
        'name': 'onclick',

        'evaluate': function(scope) {
          return label => scope.onClick(label);
        }
      }],

      'redundantAttribute': 'expr3',
      'selector': '[expr3]'
    }]);
  },

  'name': 'su-tabset-test'
};

export default suTabsetTest;
