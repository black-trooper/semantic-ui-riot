// ===================================================================================
//                                                                           Lifecycle
//                                                                           =========
function onMounted(props, state) {
  if (this.obs) {
    this.obs.on('su-loading', visible => {
      suLoading(this, visible);
    });
  }
}

// ===================================================================================
//                                                                               Logic
//                                                                               =====
function suLoading(tag, visible) {
  if (visible) {
    tag.counter++;
  } else {
    tag.counter--;
  }
  tag.update();
}

var suLoading$1 = {
  'css': `su-loading .ui.dimmer,[is="su-loading"] .ui.dimmer{ z-index: 20000 }`,

  'exports': {
    counter: 0,
    onMounted
  },

  'template': function(template, expressionTypes, bindingTypes, getComponent) {
    return template(
      '<div expr15="expr15"><div class="ui huge text loader">Loading</div></div>',
      [{
        'redundantAttribute': 'expr15',
        'selector': '[expr15]',

        'expressions': [{
          'type': expressionTypes.ATTRIBUTE,
          'name': 'class',

          'evaluate': function(scope) {
            return ['ui page dimmer inverted ', scope.counter > 0 ? 'active' : ''].join('');
          }
        }]
      }]
    );
  },

  'name': 'su-loading'
};

export default suLoading$1;
