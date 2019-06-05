let index = 0;

// ===================================================================================
//                                                                           Lifecycle
//                                                                           =========
function onMounted(props, state) {
  this.su_id = `su-checkbox-${index++}`;
  this.obs.on(`${this.su_id}-reset`, () => { reset(this); });
  state.checked = normalizeOptChecked(props.checked);
  state.lastChecked = state.checked;
  state.lastOptsChecked = state.checked;
  state.defaultChecked = state.checked;
  this.update();
}

function onBeforeUpdate(props, state) {
  this.readOnly = this.root.classList.contains('read-only');
  this.disabled = this.root.classList.contains('disabled');
  this.changed = state.checked !== state.defaultChecked;

  if (state.lastOptsChecked != normalizeOptChecked(props.checked)) {
    state.checked = normalizeOptChecked(props.checked);
    state.lastOptsChecked = state.checked;
  }
}

function onUpdated(props, state) {
  if (state.lastChecked != state.checked) {
    state.lastChecked = state.checked;
    state.lastOptsChecked = state.checked;
  }
}

function reset(tag) {
  tag.update({
    checked: tag.state.defaultChecked
  });
}

// ===================================================================================
//                                                                              Events
//                                                                              ======
function onClick() {
  if (this.readOnly || this.disabled) {
    event.preventDefault();
    return
  }

  this.update({
    checked: !this.state.checked
  });
  this.dispatch('click', this.checked);
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

var suCheckbox = {
  'css': `su-checkbox.ui.checkbox label,[is="su-checkbox"].ui.checkbox label{ cursor: pointer; } su-checkbox.ui.read-only input[type="checkbox"],[is="su-checkbox"].ui.read-only input[type="checkbox"],su-checkbox.ui.disabled input[type="checkbox"],[is="su-checkbox"].ui.disabled input[type="checkbox"]{ cursor: default !important; }`,

  'exports': {
    state: {
      checked: false,
      defaultChecked: false,
      observable: null,
      lastChecked: false,
      lastOptsChecked: false,
    },

    changed: false,
    onBeforeUpdate,
    onMounted,
    onUpdated,
    onClick
  },

  'template': function(template, expressionTypes, bindingTypes, getComponent) {
    return template(
      '<input expr10 type="checkbox"/><label expr11></label><label expr13></label>',
      [{
        'expressions': [{
          'type': expressionTypes.ATTRIBUTE,
          'name': 'class',

          'evaluate': function(scope) {
            return ['ui checkbox ', scope.props.class].join('');
          }
        }, {
          'type': expressionTypes.ATTRIBUTE,
          'name': 'checked',

          'evaluate': function(scope) {
            return scope.state.checked;
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
        'redundantAttribute': 'expr10',
        'selector': '[expr10]',

        'expressions': [{
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
          'name': 'disabled',

          'evaluate': function(scope) {
            return scope.disabled;
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

        'redundantAttribute': 'expr11',
        'selector': '[expr11]',

        'template': template('<slot expr12></slot>', [{
          'expressions': [{
            'type': expressionTypes.ATTRIBUTE,
            'name': 'for',

            'evaluate': function(scope) {
              return scope.su_id;
            }
          }]
        }, {
          'type': bindingTypes.SLOT,
          'name': 'default',
          'redundantAttribute': 'expr12',
          'selector': '[expr12]'
        }])
      }, {
        'type': bindingTypes.IF,

        'evaluate': function(scope) {
          return scope.props.label;
        },

        'redundantAttribute': 'expr13',
        'selector': '[expr13]',

        'template': template('<!---->', [{
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

  'name': 'su-checkbox'
};

export default suCheckbox;
