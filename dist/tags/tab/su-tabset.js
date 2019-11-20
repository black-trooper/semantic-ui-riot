let index = 0;

// ===================================================================================
//                                                                           Lifecycle
//                                                                           =========
function onMounted(props, state) {
  this.su_id = `su-tabset-${index++}`;

  const tabHeader = this.$('su-tab-header');
  if (tabHeader) {
    this.obs.trigger(`${tabHeader.id}-add-class`, getTitleClass(this));
  }
  this.$$('su-tab-title').forEach(title => {
    this.obs.trigger(`${title.id}-add-tabset-id`, this.su_id);
  });
  this.obs.on(`${this.su_id}-title-clicked`, title => {
    onClickForTitle(this, title);
  });

  this.tabs = this.$$('su-tab');
  if (this.tabs.length == 0) {
    return
  }

  if (typeof props.active === 'undefined') {
    const titles = hasTitle(this);
    if (titles.length > 0) {
      state.active = titles[0].innerText.trim();
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
  if (this.lastOptsActive != props.active) {
    this.lastOptsActive = props.active;
    state.active = props.active;
    changed = true;
  }
  if (this.lastActive != state.active) {
    this.lastActive = state.$$;
    changed = true;
  }

  if (changed) {
    const titles = hasTitle(this);
    if (titles.length > 0) {
      let index;
      titles.forEach((title, i) => {
        this.obs.trigger(`${title.id}-toggle-active`, false);
        if (title.innerText.trim() === state.active.trim()) {
          this.obs.trigger(`${title.id}-toggle-active`, true);
          index = i;
        }
      });
      if (!index) {
        this.obs.trigger(`${titles[0].id}-toggle-active`, true);
        index = 0;
      }
      this.tabs.forEach((tab, i) => {
        this.obs.trigger(`${tab.id}-toggle-active`, index == i);
      });
    } else {
      this.tabs.forEach(tab => {
        this.obs.trigger(`${tab.id}-toggle-active`, tab.getAttribute('label') == state.active);
      });
      if (!this.tabs.some(tab => tab.classList.contains('active'))) {
        this.obs.trigger(`${this.tabs[0].id}-toggle-active`, true);
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

function onClickForTitle(tag, title) {
  tag.state.active = title;
  tag.update();
  tag.dispatch('click', tag.state.active);
}


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
  if (!tag.props.lazyMount) {
    tag.obs.trigger(`${tab.id}-mount`);
  }
  if (Array.from(tab.classList.values()).some(clazz => {
    return clazz != 'ui' && clazz != 'tab' && clazz != 'active'
  })) {
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
  tag.obs.trigger(`${tab.id}-add-class`, classList.join(' '));
}

function hasTitle(tag) {
  if (!tag.$('su-tab-header')) {
    return false
  }
  return tag.$$('su-tab-header su-tab-title')
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

    lastOptsActive: null,
    lastActive: null,
    onMounted,
    onUpdated,
    onClick,
    getClass,
    showMenu,
    isBottom
  },

  'template': function(template, expressionTypes, bindingTypes, getComponent) {
    return template(
      '<div expr58="expr58"></div><slot expr60="expr60"></slot><div expr61="expr61"></div>',
      [{
        'expressions': [{
          'type': expressionTypes.ATTRIBUTE,
          'name': 'id',

          'evaluate': function(scope) {
            return scope.su_id;
          }
        }]
      }, {
        'type': bindingTypes.IF,

        'evaluate': function(scope) {
          return !scope.isBottom() && scope.showMenu();
        },

        'redundantAttribute': 'expr58',
        'selector': '[expr58]',

        'template': template('<a expr59="expr59"></a>', [{
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

          'template': template(' ', [{
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
                  scope.tab.getAttribute('title-class'),
                  ' ',
                  scope.tab.getAttribute('label') == scope.state.active ? 'active':'',
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

          'redundantAttribute': 'expr59',
          'selector': '[expr59]',
          'itemName': 'tab',
          'indexName': null,

          'evaluate': function(scope) {
            return scope.tabs;
          }
        }])
      }, {
        'type': bindingTypes.SLOT,
        'attributes': [],
        'name': 'default',
        'redundantAttribute': 'expr60',
        'selector': '[expr60]'
      }, {
        'type': bindingTypes.IF,

        'evaluate': function(scope) {
          return scope.isBottom() && scope.showMenu();
        },

        'redundantAttribute': 'expr61',
        'selector': '[expr61]',

        'template': template('<a expr62="expr62"></a>', [{
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

          'template': template(' ', [{
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
                  scope.tab.getAttribute('title-class'),
                  ' ',
                  scope.tab.getAttribute('label') == scope.state.active ? 'active':'',
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

          'redundantAttribute': 'expr62',
          'selector': '[expr62]',
          'itemName': 'tab',
          'indexName': null,

          'evaluate': function(scope) {
            return scope.tabs;
          }
        }])
      }]
    );
  },

  'name': 'su-tabset'
};

export default suTabset;
