let index = 0;

function onMounted(props, state) {
  this.su_id = `su-tab-${index++}`;
  this.obs.on(`${this.su_id}-toggle-active`, active => {
    this.update({
      active
    });
  });
  this.update({
    active: props.active
  });
}

function onUpdated(props, state) {
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
    onUpdated
  },

  'template': function(template, expressionTypes, bindingTypes, getComponent) {
    return template('<span expr67></span>', [{
      'expressions': [{
        'type': expressionTypes.ATTRIBUTE,
        'name': 'class',

        'evaluate': function(scope) {
          return ['ui ', scope.props.class, ' ', scope.state.active && 'active', ' tab'].join('');
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

      'redundantAttribute': 'expr67',
      'selector': '[expr67]',

      'template': template('<slot expr68></slot>', [{
        'type': bindingTypes.SLOT,
        'name': 'default',
        'redundantAttribute': 'expr68',
        'selector': '[expr68]'
      }])
    }]);
  },

  'name': 'su-tab'
};

export default suTab;
