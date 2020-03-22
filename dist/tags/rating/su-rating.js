let index = 0;

// ===================================================================================
//                                                                           Lifecycle
//                                                                           =========
function onBeforeMount(props, state) {
  init(this, props.max, props.value);
  this.su_id = `su-rating-${index++}`;
  this.obs.on(`${this.su_id}-reset`, () => { reset(this); });
}

function onMounted(props, state) {
  this.update();
}

function onBeforeUpdate(props, state) {
  if (this.lastValue != props.value) {
    this.lastValue = props.value;
    this.state.value = props.value;
  }
  this.readOnly = this.root.classList.contains('read-only');
  this.changed = state.value != state.defaultValue;
  updateView(this);
}

// ===================================================================================
//                                                                              Events
//                                                                              ======
function onClick(target) {
  if (this.readOnly) {
    return
  }
  let valueChanged = false;
  let beforeValue;
  if (this.state.value != target.value) {
    beforeValue = this.state.value;
    valueChanged = true;
  }
  this.state.value = target.value;
  updateView(this);
  this.update();

  this.dispatch('click', target.value);
  if (valueChanged) {
    this.dispatch('change', { value: this.state.value, beforeValue: beforeValue });
  }
}

function onMouseover(target) {
  if (this.readOnly) {
    return
  }
  this.state.items.forEach(item => {
    item.selected = item.value <= target.value;
  });
  this.update();
}

function onMouseout() {
  if (this.readOnly) {
    return
  }
  this.state.items.forEach(item => {
    item.selected = false;
  });
  this.update();
}

// ===================================================================================
//                                                                               Logic
//                                                                               =====
function init(tag, max = 5, value = 0) {
  tag.lastValue = value;
  tag.state.value = value;
  tag.state.defaultValue = value;
  tag.state.items.length = 0;
  for (let i = 0; i < max; i++) {
    tag.state.items[i] = { value: i + 1, active: false, selected: false };
  }
  updateView(tag);
}

function reset(tag) {
  tag.update({
    value: tag.state.defaultValue
  });
}

function updateView(tag) {
  tag.state.items.forEach(item => {
    item.active = item.value <= tag.state.value;
  });
}

var suRating = {
  'css': null,

  'exports': {
    state: {
      items: [],
      value: null,
      lastValue: null,
      defaultValue: null,
    },

    changed: false,
    onBeforeMount,
    onMounted,
    onBeforeUpdate,
    onClick,
    onMouseover,
    onMouseout
  },

  'template': function(template, expressionTypes, bindingTypes, getComponent) {
    return template('<i expr91="expr91"></i>', [{
      'expressions': [{
        'type': expressionTypes.ATTRIBUTE,
        'name': 'class',

        'evaluate': function(scope) {
          return ['ui rating ', scope.props.class].join('');
        }
      }, {
        'type': expressionTypes.ATTRIBUTE,
        'name': 'value',

        'evaluate': function(scope) {
          return scope.state.value;
        }
      }, {
        'type': expressionTypes.ATTRIBUTE,
        'name': 'changed',

        'evaluate': function(scope) {
          return scope.changed;
        }
      }, {
        'type': expressionTypes.ATTRIBUTE,
        'name': 'id',

        'evaluate': function(scope) {
          return scope.su_id;
        }
      }]
    }, {
      'type': bindingTypes.EACH,
      'getKey': null,
      'condition': null,

      'template': template(null, [{
        'expressions': [{
          'type': expressionTypes.ATTRIBUTE,
          'name': 'class',

          'evaluate': function(scope) {
            return [
              'icon ',
              scope.item.active ? 'active' : '',
              ' ',
              scope.item.selected ? 'selected' : ''
            ].join('');
          }
        }, {
          'type': expressionTypes.EVENT,
          'name': 'onclick',

          'evaluate': function(scope) {
            return () => scope.onClick(scope.item);
          }
        }, {
          'type': expressionTypes.EVENT,
          'name': 'onmouseover',

          'evaluate': function(scope) {
            return () => scope.onMouseover(scope.item);
          }
        }, {
          'type': expressionTypes.EVENT,
          'name': 'onmouseout',

          'evaluate': function(scope) {
            return scope.onMouseout;
          }
        }]
      }]),

      'redundantAttribute': 'expr91',
      'selector': '[expr91]',
      'itemName': 'item',
      'indexName': null,

      'evaluate': function(scope) {
        return scope.state.items;
      }
    }]);
  },

  'name': 'su-rating'
};

export default suRating;
