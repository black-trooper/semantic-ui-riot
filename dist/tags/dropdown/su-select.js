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
    state.defaultValue = state.value;
  } else {
    state.defaultValue = state.value;
  }
  this.update();
}

function reset(tag) {
  tag.update({
    value: tag.state.defaultValue
  });
}

var suSelect = {
  'css': `su-select.ui.selection.dropdown,[is="su-select"].ui.selection.dropdown{ padding: 0; } su-select.ui.selection.dropdown>select:focus,[is="su-select"].ui.selection.dropdown>select:focus{ outline: 0; border-color: #96c8da; } su-select.ui.selection.dropdown>select,[is="su-select"].ui.selection.dropdown>select{ display: block !important; padding: .78571429em 2.1em .78571429em 1em; background: 0 0 !important; position: relative; overflow: hidden; white-space: nowrap; text-overflow: ellipsis; -webkit-appearance: none; -moz-appearance: none; -webkit-box-sizing: border-box; box-sizing: border-box; border: none; width: 100%; z-index: 2; font-family: Lato, 'Helvetica Neue', Arial, Helvetica, sans-serif; } su-select.ui.selection.dropdown>.dropdown.icon,[is="su-select"].ui.selection.dropdown>.dropdown.icon{ z-index: 1; }`,

  'exports': {
    state: {
      defaultValue: '',
      value: '',
      label: '',
    },

    onBeforeMount,

    // onBeforeUpdate,
    // onUpdated,
    // onBlur,
    // onChange,
    onMounted
  },

  'template': function(template, expressionTypes, bindingTypes, getComponent) {
    return template('<i class="dropdown icon"></i>', [{
      'expressions': [{
        'type': expressionTypes.VALUE,

        'evaluate': function(scope) {
          return scope.state.value;
        }
      }]
    }]);
  },

  'name': 'su-select'
};

export default suSelect;
