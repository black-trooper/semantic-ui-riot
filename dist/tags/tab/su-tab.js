let index = 0;

// ===================================================================================
//                                                                           Lifecycle
//                                                                           =========
function onMounted(props, state) {
  this.su_id = `su-tab-${index++}`;
  this.update({
    classes: props.class,
    active: props.active
  });

  this.obs.on(`${this.su_id}-toggle-active`, active => {
    this.update({
      active
    });
  });
  this.obs.on(`${this.su_id}-add-class`, classes => {
    this.update({
      classes
    });
  });
  this.obs.on(`${this.su_id}-mount`, () => {
    this.update({
      mounted: true
    });
  });
}

function onBeforeUpdate(props, state) {
  if (state.active && !state.mounted) {
    state.mounted = true;
  }
}

var suTab = {
  'css': `su-tab.ui.segment,[is="su-tab"].ui.segment{ margin-top: 0; margin-bottom: 0; } su-tab.ui.segment.top.attached,[is="su-tab"].ui.segment.top.attached{ margin-top: 0 } su-tab.ui.segment.bottom.attached,[is="su-tab"].ui.segment.bottom.attached{ margin-bottom: 0 }`,

  'exports': {
    state: {
      active: false,
      mounted: false,
    },

    onMounted,
    onBeforeUpdate
  },

  'template': function(template, expressionTypes, bindingTypes, getComponent) {
    return template('<span expr49="expr49"></span>', [{
      'expressions': [{
        'type': expressionTypes.ATTRIBUTE,
        'name': 'class',

        'evaluate': function(scope) {
          return ['ui ', scope.state.classes, ' ', scope.state.active && 'active', ' tab'].join('');
        }
      }, {
        'type': expressionTypes.ATTRIBUTE,
        'name': 'id',

        'evaluate': function(scope) {
          return scope.su_id;
        }
      }]
    }, {
      'type': bindingTypes.IF,

      'evaluate': function(scope) {
        return scope.state.mounted;
      },

      'redundantAttribute': 'expr49',
      'selector': '[expr49]',

      'template': template('<slot expr50="expr50"></slot>', [{
        'type': bindingTypes.SLOT,
        'attributes': [],
        'name': 'default',
        'redundantAttribute': 'expr50',
        'selector': '[expr50]'
      }])
    }]);
  },

  'name': 'su-tab'
};

export default suTab;
