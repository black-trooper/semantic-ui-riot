let index = 0;

function onMounted(props, state) {
  this.su_id = `su-tab-title-${index++}`;
  this.update();

  this.obs.on(`${this.su_id}-toggle-active`, active => {
    this.update({
      active
    });
  });
  this.obs.on(`${this.su_id}-add-tabset-id`, suTabsetId => {
    this.suTabsetId = suTabsetId;
  });
}

function onClick() {
  this.obs.trigger(`${this.suTabsetId}-title-clicked`, this.$('a.item').innerText.trim());
}

var suTabTitle = {
  'css': null,

  'exports': {
    state: {
      active: false,
    },

    onMounted,
    onClick
  },

  'template': function(template, expressionTypes, bindingTypes, getComponent) {
    return template('<a expr280><slot expr281></slot></a>', [{
      'expressions': [{
        'type': expressionTypes.ATTRIBUTE,
        'name': 'id',

        'evaluate': function(scope) {
          return scope.su_id;
        }
      }]
    }, {
      'redundantAttribute': 'expr280',
      'selector': '[expr280]',

      'expressions': [{
        'type': expressionTypes.ATTRIBUTE,
        'name': 'class',

        'evaluate': function(scope) {
          return [scope.props.class, ' ', scope.state.active && 'active', ' item'].join('');
        }
      }, {
        'type': expressionTypes.EVENT,
        'name': 'onclick',

        'evaluate': function(scope) {
          return scope.onClick;
        }
      }]
    }, {
      'type': bindingTypes.SLOT,
      'name': 'default',
      'redundantAttribute': 'expr281',
      'selector': '[expr281]'
    }]);
  },

  'name': 'su-tab-title'
};

export default suTabTitle;
