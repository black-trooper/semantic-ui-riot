let index = 0;

// ===================================================================================
//                                                                           Lifecycle
//                                                                           =========
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

// ===================================================================================
//                                                                              Events
//                                                                              ======
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
    return template('<a expr45><slot expr46></slot></a>', [{
      'expressions': [{
        'type': expressionTypes.ATTRIBUTE,
        'name': 'id',

        'evaluate': function(scope) {
          return scope.su_id;
        }
      }]
    }, {
      'redundantAttribute': 'expr45',
      'selector': '[expr45]',

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
      'redundantAttribute': 'expr46',
      'selector': '[expr46]'
    }]);
  },

  'name': 'su-tab-title'
};

export default suTabTitle;
