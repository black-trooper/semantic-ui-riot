let index = 0;

// ===================================================================================
//                                                                           Lifecycle
//                                                                           =========
function onMounted(props, state) {
  this.su_id = `su-radio-group-${index++}`;
  this.obs.on(`${this.su_id}-reset`, () => { reset(this); });
  if (!state.value) {
    state.value = props.value;
  }
  state.lastValue = state.value;
  state.lastOptsValue = state.value;

  this.$$('su-radio').forEach(radio => {
    initializeChild(radio, this.su_id);
  });
  this.obs.on(`${this.su_id}-radio-click`, value => {
    this.update({
      value
    });
  });

  this.defaultValue = state.value;
  this.update();
}

function onBeforeUpdate(props, state) {
  this.changed = state.value !== this.defaultValue;

  if (state.lastOptsValue != props.value) {
    state.value = props.value;
    state.lastOptsValue = props.value;
  }
}

function onUpdated(props, state) {
  let changed = false;
  if (state.lastValue != state.value) {
    state.lastValue = state.value;
    changed = true;
  }

  this.$$('su-radio').forEach(radio => {
    initializeChild(radio, this.su_id);
    updateState(radio, state.value);
  });

  if (changed) {
    this.dispatch('change', state.value);
    this.obs.trigger(`${props.suParentId}-update`);
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
function updateState(radio, value) {
  if (typeof radio.getAttribute('value') === 'undefined' || typeof value === 'undefined') {
    return
  }

  if (value == radio.getAttribute('value')) {
    radio.setAttribute('checked', true);
  } else {
    radio.removeAttribute('checked');
  }
}

function initializeChild(radio, uid) {
  radio.setAttribute('name', `${uid}-radio`);
}

var suRadioGroup = {
  'css': null,

  'exports': {
    state: {
      value: '',
      lastValue: '',
      lastOptsValue: '',
    },

    changed: false,
    defaultValue: '',
    onBeforeUpdate,
    onMounted,
    onUpdated
  },

  'template': function(template, expressionTypes, bindingTypes, getComponent) {
    return template('<slot expr67="expr67"></slot>', [{
      'expressions': [{
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
      'type': bindingTypes.SLOT,
      'attributes': [],
      'name': 'default',
      'redundantAttribute': 'expr67',
      'selector': '[expr67]'
    }]);
  },

  'name': 'su-radio-group'
};

export default suRadioGroup;
