let index = 0;

// ===================================================================================
//                                                                           Lifecycle
//                                                                           =========
function onMounted(props, state) {
  this.su_id = `su-checkbox-group-${index++}`;
  this.obs.on(`${this.su_id}-reset`, () => { reset(this); });
  if (!state.value) {
    state.value = props.value;
  }
  if (typeof state.value !== 'undefined' && !Array.isArray(state.value)) {
    state.value = state.value.toString().split(/\s+/).join('').split(',');
  }
  state.lastValue = state.value;
  state.lastOptsValue = state.value;

  let checkboxes = this.$$('su-checkbox');
  checkboxes.forEach(checkbox => {
    initializeChild(checkbox, this.su_id);
    updateState(checkbox);
  });
  this.obs.on(`${this.su_id}-checkbox-click`, () => {
    this.update({
      value: checkboxes.filter(_checkbox => _checkbox.checked).map(_checkbox => {
        return _checkbox.getAttribute('value')
      })
    });
  });

  this.defaultValue = state.value;
  this.update();
}

function onBeforeUpdate(props, state) {
  this.changed = state.value !== this.defaultValue;

  if (normalizeValue(state.lastOptsValue) != normalizeValue(props.value)) {
    state.value = props.value;
    state.lastOptsValue = props.value;
  }
}

function onUpdated(props, state) {
  let changed = false;
  if (normalizeValue(state.lastValue) != normalizeValue(state.value)) {
    state.lastValue = state.value;
    changed = true;
  }
  if (typeof state.value !== 'undefined' && !Array.isArray(state.value)) {
    state.value = state.value.toString().split(/\s+/).join('').split(',');
  }

  if (changed) {
    let checkboxes = this.$$('su-checkbox');
    checkboxes.forEach(checkbox => {
      updateState(checkbox, state.value);
    });
    this.dispatch('change', state.value);
  }
}

function reset(tag) {
  tag.update({
    value: tag.defaultValue
  });
}

// ===================================================================================
//                                                                               Logic
//                                                                               =====
function updateState(checkbox, value) {
  if (typeof checkbox.getAttribute('value') === 'undefined' || typeof value === 'undefined') {
    return
  }
  if (value.some(v => v == checkbox.getAttribute('value'))) {
    checkbox.setAttribute('checked', true);
  } else {
    checkbox.removeAttribute('checked');
  }
}

function initializeChild(checkbox, uid) {
  checkbox.setAttribute('name', `${uid}-checkbox`);
}

// function parentUpdate() {
//   if (this.parent) {
//     this.parent.update()
//   } else {
//     this.update()
//   }
// }

function normalizeValue(value) {
  if (typeof value === 'undefined') {
    return value
  }
  if (!Array.isArray(value)) {
    return [value].toString()
  }
  return value.toString()
}

var suCheckboxGroup = {
  'css': null,

  'exports': {
    state: {
      value: '',
      lastValue: '',
      lastOptsValue: '',
    },

    changed: false,
    defaultValue: '',
    onMounted,
    onBeforeUpdate,
    onUpdated
  },

  'template': function(template, expressionTypes, bindingTypes, getComponent) {
    return template('<slot expr9></slot>', [{
      'expressions': [{
        'type': expressionTypes.VALUE,

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
      'type': bindingTypes.SLOT,
      'name': 'default',
      'redundantAttribute': 'expr9',
      'selector': '[expr9]'
    }]);
  },

  'name': 'su-checkbox-group'
};

export default suCheckboxGroup;
