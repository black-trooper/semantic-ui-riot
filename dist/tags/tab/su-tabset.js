// ===================================================================================
//                                                                          Properties
//                                                                          ==========
let lastOptsActive, lastActive;

// ===================================================================================
//                                                                           Lifecycle
//                                                                           =========
function onMounted(props, state) {
  if (this.$('su-tab-header')) {
    this.$('su-tab-header').state.class = getTitleClass();
  }

  this.tabs = this.$$('su-tab');
  if (typeof this.tabs === 'undefined') {
    return
  }

  if (typeof props.active === 'undefined') {
    const titles = hasTitle(this);
    if (titles) {
      state.active = titles[0].root.innerText.trim();
    } else {
      state.active = this.tabs[0].getAttribute('label');
    }
  }

  this.tabs.forEach(tab => {
    initializeChild(this, tab);
  });

  this.update();
}

function onUpdated(props, state) {
  let changed = false;
  if (lastOptsActive != props.active) {
    lastOptsActive = props.active;
    state.active = props.active;
    changed = true;
  }
  if (lastActive != state.active) {
    lastActive = state.$$;
    changed = true;
  }

  if (changed) {
    const titles = hasTitle(this);
    if (titles) {
      let index;
      titles.forEach((title, i) => {
        title.active = false;
        if (title.root.innerText.trim() === state.active.trim()) {
          title.active = true;
          index = i;
        }
      });
      if (!titles.some(title => title.active)) {
        titles[0].active = true;
        index = 0;
      }
      this.tabs.forEach((tab, i) => {
        tab.active = index == i;
      });
    } else {
      this.tabs.forEach(tab => {
        if (tab.getAttribute('label') == state.active) {
          tab.classList.add('active');
        } else {
          tab.classList.remove('active');
        }
      });
      if (!this.tabs.some(tab => tab.classList.contains('active'))) {
        this.tabs[0].classList.add('active');
      }
    }
  }
}

// ===================================================================================
//                                                                              Events
//                                                                              ======
function onClick(item) {
  this.state.active = item.getAttribute('label');
  this.update();
  this.dispatch('click', this.state.active);
}

// function clickForTitle(title) {
//   active = title
//   tag.update()
//   tag.trigger('click', active)
// }


// ===================================================================================
//                                                                              Helper
//                                                                              ======
function isBottom() {
  return hasClass(this, 'bottom')
}

function showMenu() {
  return !hasTitle(this)
}

function getClass() {
  if (hasClass(this, 'tabular') && !hasClass(this, 'attached')) {
    return 'attached'
  }
}

// ===================================================================================
//                                                                               Logic
//                                                                               =====
function initializeChild(tag, tab) {
  tab.mounted = !tag.props.lazyMount;
  if (tab.classList) {
    return
  }
  let classList = hasClass(tag, 'no-segment') ? [] : ['segment'];
  if (hasClass(tag, 'tabular')) {
    classList.push('tabular');
  }
  if ((hasClass(tag, 'attached') || hasClass(tag, 'tabular')) && !hasClass(tag, 'left') && !hasClass(tag, 'right')) {
    if (hasClass(tag, 'bottom')) {
      classList.push('top');
    } else {
      classList.push('bottom');
    }
    classList.push('attached');
  }
  tab.classList.add(classList);
}

function hasTitle(tag) {
  if (!tag.$('su-tab-header')) {
    return false
  }
  const titles = tag.$$('su-tab-header su-tab-title');
  if (!titles) {
    return false
  }

  return titles
}

function getTitleClass(tag) {
  const classList = [];
  if (hasClass(tag, 'left') || hasClass(tag, 'right')) {
    classList.push('vertical');
    classList.push('fluid');
  }
  if (hasClass(tag, 'left')) {
    classList.push('left');
  }
  if (hasClass(tag, 'right')) {
    classList.push('right');
  }
  if (hasClass(tag, 'tabular')) {
    classList.push('tabular');
  }
  return classList.join(' ')
}

function hasClass(tag, className) {
  return tag.root.classList.contains(className)
}

var suTabset = {
  'css': null,

  'exports': {
    state: {
      active: false,
    },

    onMounted,
    onUpdated,
    onClick,

    // clickForTitle,
    getClass,

    showMenu,
    isBottom
  },

  'template': function(template, expressionTypes, bindingTypes, getComponent) {
    return template('<div expr117></div><slot></slot><div expr119></div>', [{
      'type': bindingTypes.IF,

      'evaluate': function(scope) {
        return !scope.isBottom() && scope.showMenu();
      },

      'redundantAttribute': 'expr117',
      'selector': '[expr117]',

      'template': template('<a expr118></a>', [{
        'expressions': [{
          'type': expressionTypes.ATTRIBUTE,
          'name': 'class',

          'evaluate': function(scope) {
            return ['ui ', scope.props.class, ' ', scope.getClass(), ' menu'].join('');
          }
        }]
      }, {
        'type': bindingTypes.EACH,
        'getKey': null,
        'condition': null,

        'template': template('<!---->', [{
          'expressions': [{
            'type': expressionTypes.TEXT,
            'childNodeIndex': 0,

            'evaluate': function(scope) {
              return scope.tab.getAttribute('label');
            }
          }, {
            'type': expressionTypes.ATTRIBUTE,
            'name': 'class',

            'evaluate': function(scope) {
              return [
                scope.tab.getAttribute('titleClass'),
                ' ',
                scope.tab.active && scope.state.active,
                ' item'
              ].join('');
            }
          }, {
            'type': expressionTypes.EVENT,
            'name': 'onclick',

            'evaluate': function(scope) {
              return () => scope.onClick(scope.tab);
            }
          }]
        }]),

        'redundantAttribute': 'expr118',
        'selector': '[expr118]',
        'itemName': 'tab',
        'indexName': null,

        'evaluate': function(scope) {
          return scope.tabs;
        }
      }])
    }, {
      'type': bindingTypes.IF,

      'evaluate': function(scope) {
        return scope.isBottom() && scope.showMenu();
      },

      'redundantAttribute': 'expr119',
      'selector': '[expr119]',

      'template': template('<a expr120></a>', [{
        'expressions': [{
          'type': expressionTypes.ATTRIBUTE,
          'name': 'class',

          'evaluate': function(scope) {
            return ['ui ', scope.props.class, ' ', scope.getClass(), ' menu'].join('');
          }
        }]
      }, {
        'type': bindingTypes.EACH,
        'getKey': null,
        'condition': null,

        'template': template('<!---->', [{
          'expressions': [{
            'type': expressionTypes.TEXT,
            'childNodeIndex': 0,

            'evaluate': function(scope) {
              return scope.tab.getAttribute('label');
            }
          }, {
            'type': expressionTypes.ATTRIBUTE,
            'name': 'class',

            'evaluate': function(scope) {
              return [
                scope.tab.getAttribute('titleClass'),
                ' ',
                scope.tab.active && scope.state.active,
                ' item'
              ].join('');
            }
          }, {
            'type': expressionTypes.EVENT,
            'name': 'onclick',

            'evaluate': function(scope) {
              return () => scope.onClick(scope.tab);
            }
          }]
        }]),

        'redundantAttribute': 'expr120',
        'selector': '[expr120]',
        'itemName': 'tab',
        'indexName': null,

        'evaluate': function(scope) {
          return scope.tabs;
        }
      }])
    }]);
  },

  'name': 'su-tabset'
};

export default suTabset;
