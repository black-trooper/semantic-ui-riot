// ===================================================================================
//                                                                           Lifecycle
//                                                                           =========
function onMounted() {
  this.value = props.value || 0;
  if (props.total > 0) {
    total = props.total;
  }
  this.percent = getPercent(this);
  this.lastValue = this.value;
  this.lastPropsValue = props.value;
  this.update();
}

function onUpdated() {
  let changed = false;
  if (this.state.value >= total) {
    this.state.value = total;
  }
  if (this.state.value <= 0) {
    this.state.value = 0;
  }
  if (this.lastValue != this.state.value) {
    this.lastValue = this.state.value;
    changed = true;
  } else if (this.lastPropsValue != props.value) {
    this.state.value = props.value;
    this.lastPropsValue = props.value;
    this.lastValue = props.value;
    changed = true;
  }

  if (changed) {
    this.percent = getPercent(this);
  }
}

// ===================================================================================
//                                                                              Helper
//                                                                              ======
function getClass() {
  const excludeClasses = ['progress', 'active'];
  return Array.apply(null, this.root.classList).filter(clazz => {
    return !excludeClasses.some(excludeClass => excludeClass == clazz)
  }).join(' ')
}

function getStates() {
  if (isSuccess(this)) {
    return 'success'
  }
  if (isActive(this)) {
    return 'active'
  }
}

function isProgress() {
  return hasClass(this, 'progress')
}

// ===================================================================================
//                                                                               Logic
//                                                                               =====
function getPercent(tag) {
  return parseInt(tag.value / total * 100)
}

function isActive(tag) {
  return hasClass(tag, 'active') && tag.percent > 0 && tag.percent < 100
}

function isSuccess(tag) {
  return tag.percent == 100
}

function hasClass(tag, className) {
  return tag.root.classList.contains(className)
}

var suProgress = {
  'css': `su-progress .ui.progress:last-child,[is="su-progress"] .ui.progress:last-child{ margin: 0 0 2.5em; } su-progress.attached,[is="su-progress"].attached{ display: block; height: 0.2rem; padding: 0px; overflow: hidden; border-radius: 0em 0em 0.28571429rem 0.28571429rem; position: absolute; left: 0; width: 100%; } su-progress.top.attached,[is="su-progress"].top.attached{ top: 0px; bottom: 100%; border-radius: 0.28571429rem 0.28571429rem 0em 0em; } su-progress.bottom.attached,[is="su-progress"].bottom.attached{ top: 100%; bottom: auto; }`,

  'exports': {
    state: {
      value: null,
    },

    lastPropsValue: null,
    lastValue: null,
    total: 100,
    onMounted,
    onUpdated,
    getClass,
    getStates,
    isProgress
  },

  'template': function(template, expressionTypes, bindingTypes, getComponent) {
    return template(
      '<div expr62><div expr63 class="bar"><div expr64 class="progress"></div></div><div class="label"><slot expr65></slot></div></div>',
      [{
        'expressions': [{
          'type': expressionTypes.ATTRIBUTE,
          'name': 'class',

          'evaluate': function(scope) {
            return scope.props.class;
          }
        }]
      }, {
        'redundantAttribute': 'expr62',
        'selector': '[expr62]',

        'expressions': [{
          'type': expressionTypes.ATTRIBUTE,
          'name': 'class',

          'evaluate': function(scope) {
            return ['ui progress ', scope.getClass(), ' ', scope.getStates()].join('');
          }
        }, {
          'type': expressionTypes.ATTRIBUTE,
          'name': 'data-percent',

          'evaluate': function(scope) {
            return scope.percent;
          }
        }]
      }, {
        'redundantAttribute': 'expr63',
        'selector': '[expr63]',

        'expressions': [{
          'type': expressionTypes.ATTRIBUTE,
          'name': 'style',

          'evaluate': function(scope) {
            return ['transition-duration: 300ms; width: ', scope.percent, '%;'].join('');
          }
        }]
      }, {
        'type': bindingTypes.IF,

        'evaluate': function(scope) {
          return scope.isProgress();
        },

        'redundantAttribute': 'expr64',
        'selector': '[expr64]',

        'template': template('<!---->', [{
          'expressions': [{
            'type': expressionTypes.TEXT,
            'childNodeIndex': 0,

            'evaluate': function(scope) {
              return [scope.percent, '%'].join('');
            }
          }]
        }])
      }, {
        'type': bindingTypes.SLOT,
        'name': 'default',
        'redundantAttribute': 'expr65',
        'selector': '[expr65]'
      }]
    );
  },

  'name': 'su-progress'
};

export default suProgress;
