let index = 0;

// ===================================================================================
//                                                                           Lifecycle
//                                                                           =========
function onMounted(props, state) {
  this.su_id = `su-radio-${index++}`;
  state.checked = normalizeOptChecked(props.checked);
  state.lastChecked = state.checked;
  state.lastOptsChecked = state.checked;
  this.update();
}

function onBeforeUpdate(props, state) {
  this.readOnly = this.root.classList.contains('read-only');
  this.disabled = this.root.classList.contains('disabled');
  this.radio = this.root.classList.contains('slider') ? '' : 'radio';
  this.radioName = this.root.getAttribute('name');

  if (state.lastOptsChecked != normalizeOptChecked(props.checked)) {
    state.checked = normalizeOptChecked(props.checked);
    state.lastOptsChecked = state.checked;
  }
}

function onUpdated(props, state) {
  if (state.lastChecked != state.checked) {
    state.lastChecked = state.checked;
  }
}

// ===================================================================================
//                                                                              Events
//                                                                              ======
function onClick(event) {
  if (this.readOnly || this.disabled) {
    event.preventDefault();
    return
  }

  this.update({
    checked: event.target.checked
  });
  this.dispatch('click', event.target.value);
  if (this.obs && this.root.getAttribute('name')) {
    this.obs.trigger(`${this.root.getAttribute('name')}-click`, this.props.value);
  }
}

// ===================================================================================
//                                                                               Logic
//                                                                               =====
function normalizeOptChecked(checked) {
  return checked === true || checked === 'checked' || checked === 'true'
}

var suRadio = {
  'css': `su-radio.ui.checkbox label,[is="su-radio"].ui.checkbox label{ cursor: pointer; } su-radio.ui.read-only input[type="radio"],[is="su-radio"].ui.read-only input[type="radio"],su-radio.ui.disabled input[type="radio"],[is="su-radio"].ui.disabled input[type="radio"]{ cursor: default !important; }`,

  'exports': {
    state: {
      checked: false,
      lastChecked: false,
      lastOptsChecked: false,
    },

    radio: 'radio',
    onMounted,
    onBeforeUpdate,
    onUpdated,
    onClick
  },

  'template': function(template, expressionTypes, bindingTypes, getComponent) {
    return template(
      '<input expr83="expr83" type="radio"/><label expr84="expr84"></label><label expr86="expr86"></label>',
      [{
        'expressions': [{
          'type': expressionTypes.ATTRIBUTE,
          'name': 'class',

          'evaluate': function(scope) {
            return ['ui ', scope.radio, ' checkbox ', scope.props.class].join('');
          }
        }]
      }, {
        'redundantAttribute': 'expr83',
        'selector': '[expr83]',

        'expressions': [{
          'type': expressionTypes.ATTRIBUTE,
          'name': 'name',

          'evaluate': function(scope) {
            return scope.radioName;
          }
        }, {
          'type': expressionTypes.VALUE,

          'evaluate': function(scope) {
            return scope.value;
          }
        }, {
          'type': expressionTypes.ATTRIBUTE,
          'name': 'checked',

          'evaluate': function(scope) {
            return scope.state.checked;
          }
        }, {
          'type': expressionTypes.EVENT,
          'name': 'onclick',

          'evaluate': function(scope) {
            return scope.onClick;
          }
        }, {
          'type': expressionTypes.ATTRIBUTE,
          'name': 'id',

          'evaluate': function(scope) {
            return scope.su_id;
          }
        }]
      }, {
        'type': bindingTypes.IF,

        'evaluate': function(scope) {
          return !scope.props.label;
        },

        'redundantAttribute': 'expr84',
        'selector': '[expr84]',

        'template': template('<slot expr85="expr85"></slot>', [{
          'expressions': [{
            'type': expressionTypes.ATTRIBUTE,
            'name': 'for',

            'evaluate': function(scope) {
              return scope.su_id;
            }
          }]
        }, {
          'type': bindingTypes.SLOT,
          'attributes': [],
          'name': 'default',
          'redundantAttribute': 'expr85',
          'selector': '[expr85]'
        }])
      }, {
        'type': bindingTypes.IF,

        'evaluate': function(scope) {
          return scope.props.label;
        },

        'redundantAttribute': 'expr86',
        'selector': '[expr86]',

        'template': template(' ', [{
          'expressions': [{
            'type': expressionTypes.TEXT,
            'childNodeIndex': 0,

            'evaluate': function(scope) {
              return scope.props.label;
            }
          }, {
            'type': expressionTypes.ATTRIBUTE,
            'name': 'for',

            'evaluate': function(scope) {
              return scope.su_id;
            }
          }]
        }])
      }]
    );
  },

  'name': 'su-radio'
};

export default suRadio;
