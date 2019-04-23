let index = 0;

// ===================================================================================
//                                                                           Lifecycle
//                                                                           =========
function onMounted(props, state) {
  this.su_id = `su-radio-group-${index++}`;
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

  this.defaultValue = this.value;
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
    updateState(radio, state.value);
  });

  if (changed) {
    this.dispatch('change', state.value);
  }
}

function reset() {
  this.update({
    value: this.defaultValue
  });
}

// ===================================================================================
//                                                                               Logic
//                                                                               =====
function updateState(radio, value) {
  if (typeof radio.getAttribute('value') === 'undefined' || typeof value === 'undefined') {
    return
  }
  radio.checked = value == radio.getAttribute('value');
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
    onUpdated,
    reset
  },

  'template': function(template, expressionTypes, bindingTypes, getComponent) {
    return template('<slot></slot>', []);
  },

  'name': 'su-radio-group'
};

export default suRadioGroup;
