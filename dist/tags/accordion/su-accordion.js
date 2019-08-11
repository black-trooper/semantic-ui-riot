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
      '<div expr21><i class="dropdown icon"></i><!----></div><div expr22><slot expr23></slot></div>',
      [{
        'expressions': [{
          'type': expressionTypes.ATTRIBUTE,
          'name': 'id',

          'evaluate': function(scope) {
            return scope.su_id;
          }
        }]
      }, {
        'redundantAttribute': 'expr21',
        'selector': '[expr21]',

        'expressions': [{
          'type': expressionTypes.TEXT,
          'childNodeIndex': 1,

          'evaluate': function(scope) {
            return ['\n    ', scope.props.title, '\n  '].join('');
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
        'redundantAttribute': 'expr22',
        'selector': '[expr22]',

        'expressions': [{
          'type': expressionTypes.ATTRIBUTE,
          'name': 'class',

          'evaluate': function(scope) {
            return ['content active ', scope.state.active ? 'open' : 'close'].join('');
          }
        }]
      }, {
        'type': bindingTypes.SLOT,
        'name': 'default',
        'redundantAttribute': 'expr23',
        'selector': '[expr23]'
      }]
    );
  },

  'name': 'su-accordion'
};

export default suAccordion;
