let index = 0;

function onMounted(props, state) {
  this.su_id = `su-tab-${index++}`;
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
  this.update({
    classes: props.class,
    active: props.active
  });
}

function onBeforeUpdate(props, state) {
  if (state.active && !state.mounted) {
    state.mounted = true;
  }
}

var suTab = {
  'css': `su-tab.ui.segment,[is="su-tab"].ui.segment{
      margin-top: 0;
      margin-bottom: 0;
    } su-tab.ui.segment.top.attached,[is="su-tab"].ui.segment.top.attached{
      margin-top: 0
    } su-tab.ui.segment.bottom.attached,[is="su-tab"].ui.segment.bottom.attached{
      margin-bottom: 0
    }`,

  'exports': {
    state: {
      active: false,
      mounted: false,
    },

    onMounted,
    onBeforeUpdate
  },

  'template': function(template, expressionTypes, bindingTypes, getComponent) {
    return template('<span expr38></span>', [{
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

      'redundantAttribute': 'expr38',
      'selector': '[expr38]',

      'template': template('<slot expr39></slot>', [{
        'type': bindingTypes.SLOT,
        'name': 'default',
        'redundantAttribute': 'expr39',
        'selector': '[expr39]'
      }])
    }]);
  },

  'name': 'su-tab'
};

export default suTab;
