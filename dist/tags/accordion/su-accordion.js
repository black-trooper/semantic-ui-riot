let index = 0;

// ===================================================================================
//                                                                           Lifecycle
//                                                                           =========
function onMounted(props, state) {
  this.su_id = `su-accordion-${index++}`;
  this.update();

  this.obs.on(`${this.su_id}-toggle-active`, active => {
    this.update({
      active
    });
  });
}

// ===================================================================================
//                                                                              Events
//                                                                              ======
function onClick() {
  this.obs.trigger(`${this.su_id}-click`, {
    id: this.su_id,
    active: this.state.active,
    label: this.props.title
  });
}

var suAccordion = {
  'css': null,

  'exports': {
    state: {
      active: false,
    },

    onMounted,
    onClick
  },

  'template': function(template, expressionTypes, bindingTypes, getComponent) {
    return template(
      '<div expr7="expr7"><i class="dropdown icon"></i> </div><div expr8="expr8"><slot expr9="expr9"></slot></div>',
      [{
        'expressions': [{
          'type': expressionTypes.ATTRIBUTE,
          'name': 'id',

          'evaluate': function(scope) {
            return scope.su_id;
          }
        }]
      }, {
        'redundantAttribute': 'expr7',
        'selector': '[expr7]',

        'expressions': [{
          'type': expressionTypes.TEXT,
          'childNodeIndex': 1,

          'evaluate': function(scope) {
            return [scope.props.title].join('');
          }
        }, {
          'type': expressionTypes.ATTRIBUTE,
          'name': 'class',

          'evaluate': function(scope) {
            return ['title ', scope.state.active ? 'active' : ''].join('');
          }
        }, {
          'type': expressionTypes.EVENT,
          'name': 'onclick',

          'evaluate': function(scope) {
            return scope.onClick;
          }
        }]
      }, {
        'redundantAttribute': 'expr8',
        'selector': '[expr8]',

        'expressions': [{
          'type': expressionTypes.ATTRIBUTE,
          'name': 'class',

          'evaluate': function(scope) {
            return ['content active ', scope.state.active ? 'open' : 'close'].join('');
          }
        }]
      }, {
        'type': bindingTypes.SLOT,
        'attributes': [],
        'name': 'default',
        'redundantAttribute': 'expr9',
        'selector': '[expr9]'
      }]
    );
  },

  'name': 'su-accordion'
};

export default suAccordion;
