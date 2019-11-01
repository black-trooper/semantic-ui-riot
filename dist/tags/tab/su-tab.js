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
    return template('<span expr58="expr58"></span>', [{
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

      'redundantAttribute': 'expr58',
      'selector': '[expr58]',

      'template': template('<slot expr59="expr59"></slot>', [{
        'expressions': [{
          'type': expressionTypes.ATTRIBUTE,
          'name': 'expr58',

          'evaluate': function(scope) {
            return 'expr58';
          }
        }]
      }, {
        'type': bindingTypes.SLOT,
        'attributes': [],
        'name': 'default',
        'redundantAttribute': 'expr59',
        'selector': '[expr59]'
      }])
    }]);
  },

  'name': 'su-tab'
};

export default suTab;
