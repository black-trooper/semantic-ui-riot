let index = 0;

function onMounted(props, state) {
  this.su_id = `su-tab-header-${index++}`;
  this.obs.on(`${this.su_id}-add-class`, classes => {
    this.update({
      classes
    });
  });
}

var suTabHeader = {
  'css': null,

  'exports': {
    onMounted
  },

  'template': function(template, expressionTypes, bindingTypes, getComponent) {
    return template('<slot expr67></slot>', [{
      'expressions': [{
        'type': expressionTypes.ATTRIBUTE,
        'name': 'class',

        'evaluate': function(scope) {
          return ['ui ', scope.state.classes, ' menu'].join('');
        }
      }, {
        'type': expressionTypes.ATTRIBUTE,
        'name': 'id',

        'evaluate': function(scope) {
          return scope.su_id;
        }
      }]
    }, {
      'type': bindingTypes.SLOT,
      'name': 'default',
      'redundantAttribute': 'expr67',
      'selector': '[expr67]'
    }]);
  },

  'name': 'su-tab-header'
};

export default suTabHeader;
