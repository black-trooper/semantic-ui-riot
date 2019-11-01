let index = 0;

// ===================================================================================
//                                                                           Lifecycle
//                                                                           =========
function onMounted(props, state) {
  this.su_id = `su-th-${index++}`;
  this.update();

  this.obs.on(`${this.su_id}-set-condition`, condition => {
    this.update({
      sorted: props.field == condition.field,
      reverse: condition.reverse
    });
  });
}

function onBeforeUpdate(props, state) {
  const classList = [];
  if (state.sorted) {
    classList.push('sorted ');
    classList.push(state.reverse ? 'descending' : 'ascending');
  }
  this.clazz = classList.join(' ');
  state.field = props.field;
}

// ===================================================================================
//                                                                              Events
//                                                                              ======
function onClick() {
  this.obs.trigger(`${this.su_id}-click`, this.state.field);
}

var suTh = {
  'css': null,

  'exports': {
    state: {
      sorted: false,
      reverse: false,
    },

    clazz: '',
    onMounted,
    onBeforeUpdate,
    onClick
  },

  'template': function(template, expressionTypes, bindingTypes, getComponent) {
    return template('<slot expr69="expr69"></slot>', [{
      'expressions': [{
        'type': expressionTypes.EVENT,
        'name': 'onclick',

        'evaluate': function(scope) {
          return scope.onClick;
        }
      }, {
        'type': expressionTypes.ATTRIBUTE,
        'name': 'class',

        'evaluate': function(scope) {
          return scope.clazz;
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
      'attributes': [],
      'name': 'default',
      'redundantAttribute': 'expr69',
      'selector': '[expr69]'
    }]);
  },

  'name': 'su-th'
};

export default suTh;
