let index = 0;

// ===================================================================================
//                                                                           Lifecycle
//                                                                           =========
function onBeforeMount(props, state) {
  this.su_id = `su-dropdown-${index++}`;
  this.obs.on(`${this.su_id}-reset`, () => { reset(this); });

  if (props.items && props.items.length > 0) {
    state.label = props.items[0].label;
    state.value = props.items[0].value;
    state.default = props.items[0].default;
  }
}

function onMounted(props, state) {
  if (typeof props.value !== 'undefined') {
    state.value = props.value;
  }
  this.lastPropsValue = props.value;
  this.lastValue = props.value;
  state.defaultValue = state.value;
  this.update();
}

function onBeforeUpdate(props, state) {
  state.items = props.items || [];
  if (this.lastPropsValue != props.value) {
    state.value = props.value;
    this.lastPropsValue = props.value;
    this.lastValue = props.value;
  }

  let selected = state.items.filter(item => item.value === state.value);
  if (!selected || selected.length == 0) {
    const childItems = flatMap(state.items.filter(item => item.items), item => item.items);
    selected = childItems.filter(item => item.value == state.value);
  }

  if (selected && selected.length > 0) {
    const target = selected[0];
    if (state.label !== target.label) {
      changeValues(this, state.value, true);
    }
  } else if (state.items.length > 0) {
    if (state.value != state.items[0].value) {
      state.value = state.items[0].value;
    }
    if (state.label != state.items[0].label) {
      state.label = state.items[0].label;
      state.default = state.items[0].default;
    }
  }
  this.changed = state.value !== state.defaultValue;
}

// ===================================================================================
//                                                                               Event
//                                                                               =====
function onBlur() {
  this.dispatch('blur');
}

function onChange(target) {
  changeValues(this, this.$('select').value);
}

function reset(tag) {
  tag.update({
    value: tag.state.defaultValue
  });
}

// ===================================================================================
//                                                                               Logic
//                                                                               =====
function changeValues(tag, value, updating) {
  let item;
  if (tag.state.items.some(item => item.value == value || item.label == value)) {
    item = tag.state.items.filter(item => item.value == value || item.label == value)[0];
    tag.state.label = item.label;
    tag.state.value = item.value;
    tag.state.default = item.default;
  } else {
    const childItems = flatMap(tag.state.items.filter(item => item.items), item => item.items);
    if (childItems.some(item => item.value == value || item.label == value)) {
      item = childItems.filter(item => item.value == value || item.label == value)[0];
      tag.state.label = item.label;
      tag.state.value = item.value;
      tag.state.default = item.default;
    }
  }

  if (!updating) {
    tag.update();
    tag.dispatch('change', item);
  }
}

function flatMap(xs, f) {
  return xs.reduce(function (ys, x) {
    return ys.concat(f(x))
  }, [])
}

var suSelect = {
  'css': `su-select.ui.selection.dropdown,[is="su-select"].ui.selection.dropdown{ padding: 0; } su-select.ui.selection.dropdown>select:focus,[is="su-select"].ui.selection.dropdown>select:focus{ outline: 0; border-color: #96c8da; } su-select.ui.selection.dropdown>select,[is="su-select"].ui.selection.dropdown>select{ display: block !important; padding: .78571429em 2.1em .78571429em 1em; background: 0 0 !important; position: relative; overflow: hidden; white-space: nowrap; text-overflow: ellipsis; -webkit-appearance: none; -moz-appearance: none; -webkit-box-sizing: border-box; box-sizing: border-box; border: none; width: 100%; z-index: 2; font-family: Lato, 'Helvetica Neue', Arial, Helvetica, sans-serif; } su-select.ui.selection.dropdown>.dropdown.icon,[is="su-select"].ui.selection.dropdown>.dropdown.icon{ z-index: 1; }`,

  'exports': {
    state: {
      defaultValue: '',
      value: '',
      label: '',
    },

    lastPropsValue: '',
    lastValue: '',
    onBeforeMount,
    onMounted,
    onBeforeUpdate,
    onBlur,
    onChange
  },

  'template': function(template, expressionTypes, bindingTypes, getComponent) {
    return template(
      '<select expr49="expr49"><option expr50="expr50"></option><optgroup expr51="expr51"></optgroup></select><i class="dropdown icon"></i>',
      [{
        'expressions': [{
          'type': expressionTypes.ATTRIBUTE,
          'name': 'class',

          'evaluate': function(scope) {
            return 'ui selection dropdown';
          }
        }, {
          'type': expressionTypes.ATTRIBUTE,
          'name': 'value',

          'evaluate': function(scope) {
            return scope.state.value;
          }
        }, {
          'type': expressionTypes.ATTRIBUTE,
          'name': 'label',

          'evaluate': function(scope) {
            return scope.state.label;
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
        'redundantAttribute': 'expr49',
        'selector': '[expr49]',

        'expressions': [{
          'type': expressionTypes.EVENT,
          'name': 'onchange',

          'evaluate': function(scope) {
            return scope.onChange;
          }
        }, {
          'type': expressionTypes.EVENT,
          'name': 'onblur',

          'evaluate': function(scope) {
            return scope.onBlur;
          }
        }, {
          'type': expressionTypes.ATTRIBUTE,
          'name': 'class',

          'evaluate': function(scope) {
            return [scope.state.default ? 'default' : '', ' text'].join('');
          }
        }]
      }, {
        'type': bindingTypes.EACH,
        'getKey': null,

        'condition': function(scope) {
          return !scope.item.items;
        },

        'template': template(' ', [{
          'expressions': [{
            'type': expressionTypes.TEXT,
            'childNodeIndex': 0,

            'evaluate': function(scope) {
              return [scope.item.label].join('');
            }
          }, {
            'type': expressionTypes.ATTRIBUTE,
            'name': 'value',

            'evaluate': function(scope) {
              return scope.item.value;
            }
          }]
        }]),

        'redundantAttribute': 'expr50',
        'selector': '[expr50]',
        'itemName': 'item',
        'indexName': null,

        'evaluate': function(scope) {
          return scope.state.items;
        }
      }, {
        'type': bindingTypes.EACH,
        'getKey': null,

        'condition': function(scope) {
          return scope.item.items;
        },

        'template': template('<option expr52="expr52"></option>', [{
          'expressions': [{
            'type': expressionTypes.ATTRIBUTE,
            'name': 'label',

            'evaluate': function(scope) {
              return scope.item.label;
            }
          }]
        }, {
          'type': bindingTypes.EACH,
          'getKey': null,
          'condition': null,

          'template': template(' ', [{
            'expressions': [{
              'type': expressionTypes.TEXT,
              'childNodeIndex': 0,

              'evaluate': function(scope) {
                return [scope.child.label].join('');
              }
            }, {
              'type': expressionTypes.ATTRIBUTE,
              'name': 'value',

              'evaluate': function(scope) {
                return scope.child.value;
              }
            }]
          }]),

          'redundantAttribute': 'expr52',
          'selector': '[expr52]',
          'itemName': 'child',
          'indexName': null,

          'evaluate': function(scope) {
            return scope.item.items;
          }
        }]),

        'redundantAttribute': 'expr51',
        'selector': '[expr51]',
        'itemName': 'item',
        'indexName': null,

        'evaluate': function(scope) {
          return scope.state.items;
        }
      }]
    );
  },

  'name': 'su-select'
};

export default suSelect;
