let index = 0;

const keys = {
  enter: 13,
  escape: 27,
  upArrow: 38,
  downArrow: 40,
};

const reservedClasses = [
  'ui',
  'selection',
  'dropdown',
  'search',
  'multiple',
  'active',
  'visible',
  'upward',
];

// ===================================================================================
//                                                                           Lifecycle
//                                                                           =========
function onBeforeMount(props, state) {
  this.su_id = `su-dropdown-${index++}`;

  if (props.multiple) ; else {
    if (props.items && props.items.length > 0) {
      state.label = props.items[0].label;
      state.value = props.items[0].value;
      state.defaultFlg = props.items[0].default;
    }
  }
}

function onMounted(props, state) {
  if (typeof props.value !== 'undefined') {
    state.value = props.value;
    this.lastPropValue = props.value;
  }
  if (props.multiple) {
    props.items.forEach(item => item.selected = false);
    props.items
      .filter(item => state.value && state.value.indexOf(item.value) >= 0)
      .forEach(item => item.selected = true);
    state.value = this.props.items.filter(item => item.selected).map(item => item.value);
    this.selectedFlg = this.props.items.some(item => item.selected);
  }
  state.defaultValue = state.value;
  this.update();
}

function onBeforeUpdate(props, state) {
  if (this.lastPropValue !== props.value) {
    state.value = props.value;
    this.lastPropValue = props.value;
  }

  state.classes = prepareClasses(this);
  prepareItemClasses(props.items, this.value, this.filtered);
  this.readonly = this.root.classList.contains('read-only');
  this.disabled = this.root.classList.contains('disabled');
  this.tabindex = props.tabindex || '0';

  if (props.multiple) {
    props.items.forEach(item => item.selected = false);
    props.items.filter(item => state.value && state.value.indexOf(item.value) >= 0).forEach(item => item.selected = true);
    selectMultiTarget(this, true);
    this.viewValue = state.value.join(',');
  } else if (props.items) {
    const selected = props.items.filter(item => item.value == state.value);
    if (selected && selected.length > 0) {
      const target = selected[0];
      if (state.label !== target.label) {
        selectTarget(this, target, true);
      }
    } else if (props.items && props.items.length > 0) {
      if (state.value !== props.items[0].value) {
        state.value = props.items[0].value;
        state.defaultFlg = props.items[0].default;
      }
      if (state.label != props.items[0].label) {
        state.label = props.items[0].label;
      }
    }
  }

  if (props.multiple) {
    const value = state.value ? state.value : [];
    const defaultValue = state.defaultValue ? state.defaultValue : [];
    this.changed = value.toString() !== defaultValue.toString();
  } else {
    this.changed = state.value !== state.defaultValue;
  }
}

// ===================================================================================
//                                                                              Events
//                                                                              ======
function onToggle() {
  if (!this.visibleFlg) {
    open(this);
  } else {
    close(this);
  }
}

function onFocus() {
  open(this);
}

function onMousedown() {
  this.itemActivated = true;
}

function onMouseup() {
  this.itemActivated = false;
}

function onBlur() {
  if (!this.itemActivated) {
    close(this);
  }
}

function onItemClick(event, item) {
  event.stopPropagation();
  if (!this.isItem(item)) {
    return
  }
  if (this.props.multiple) {
    if (!item.default) {
      item.selected = true;
    }
    selectMultiTarget(this);
    return
  }
  selectTarget(this, item);
  close(this);
}

function onKeydown(event) {
  const keyCode = event.keyCode;
  if (keyCode == keys.escape) {
    close(this);
  }
  if (keyCode == keys.downArrow) {
    open(this);
  }
  if (keyCode != keys.upArrow && keyCode != keys.downArrow) {
    return true
  }

  event.preventDefault();
  const searchedItems = this.props.items.filter(item => {
    if (this.props.search && !item.searched) {
      return false
    }
    if (this.props.multiple && (item.default || item.selected)) {
      return false
    }
    return true
  });
  if (searchedItems.length == 0) {
    return true
  }
  if (searchedItems.every(item => !item.active)) {
    searchedItems[0].active = true;
    this.update();
    return true
  }

  const activeIndex = parseInt(searchedItems.map((item, index) => item.active ? index : -1).filter(index => index >= 0));
  if (keyCode == keys.upArrow) {
    const nextActiveItem = searchedItems.filter((item, index) => index < activeIndex && !item.header && !item.divider);
    if (nextActiveItem.length > 0) {
      searchedItems[activeIndex].active = false;
      nextActiveItem[nextActiveItem.length - 1].active = true;
    }
  }
  else if (keyCode == keys.downArrow) {
    const nextActiveItem = searchedItems.filter((item, index) => index > activeIndex && !item.header && !item.divider);
    if (nextActiveItem.length > 0) {
      searchedItems[activeIndex].active = false;
      nextActiveItem[0].active = true;
    }
  }
  this.update();
  scrollPosition(this);
}

function onKeyup(event) {
  const keyCode = event.keyCode;
  if (keyCode != keys.enter) {
    return
  }
  const searchedItems = this.props.items.filter(item => item.searched && !item.selected);
  const index = parseInt(searchedItems.map((item, index) => item.active ? index : -1).filter(index => index >= 0));
  const activeItem = searchedItems[index];
  if (!activeItem) {
    return
  }

  if (this.props.multiple) {
    activeItem.selected = true;
    activeItem.active = false;
    if (index < searchedItems.length - 1) {
      searchedItems[index + 1].active = true;
    } else if (index > 0) {
      searchedItems[index - 1].active = true;
    }
    selectMultiTarget(this);
  } else {
    activeItem.active = false;
    selectTarget(this, activeItem);
    close(this);
  }
}

function stopPropagation(event) {
  event.stopPropagation();
}

// -----------------------------------------------------
//                                         search option
//                                         -------------
function onInput(event) {
  const value = event.target.value.toLowerCase();
  this.filtered = value.length > 0;
  search(this, value);
}

// -----------------------------------------------------
//                                       multiple option
//                                       ---------------
function onUnselect(event, target) {
  event.stopPropagation();
  target.selected = false;
  this.state.value = this.props.items.filter(item => item.selected).map(item => item.value);
  this.selectedFlg = this.props.items.some(item => item.selected);
  this.update();
  parentUpdate(this);
}

// ===================================================================================
//                                                                               Logic
//                                                                               =====
function open(tag) {
  if (tag.openning || tag.closing || tag.visibleFlg || tag.readonly || tag.disabled) {
    return
  }
  tag.openning = true;
  search(tag, '');
  tag.upward = isUpward(tag);
  tag.state.transitionStatus = `visible animating in slide ${tag.upward ? 'up' : 'down'}`;
  tag.props.items.forEach(item => item.active = false);
  setTimeout(() => {
    tag.openning = false;
    tag.visibleFlg = true;
    tag.state.transitionStatus = 'visible';
    tag.update();
  }, 300);

  if (tag.props.search) {
    tag.$('.search').focus();
  }
  tag.update();
  scrollPosition(tag);
  tag.dispatch('open');
}

function close(tag) {
  if (tag.closing || !tag.visibleFlg) {
    return
  }
  tag.closing = true;
  tag.state.transitionStatus = `visible animating out slide ${tag.upward ? 'up' : 'down'}`;
  setTimeout(() => {
    tag.closing = false;
    tag.visibleFlg = false;
    tag.state.transitionStatus = 'hidden';
    tag.update();
  }, 300);

  if (tag.props.search) {
    tag.$('.search').blur();
    if (tag.filtered && tag.filteredItems.length > 0) {
      selectTarget(tag, tag.filteredItems[0]);
    } else {
      tag.$('.search').value = '';
      tag.filtered = false;
    }
  }
  tag.update();
  tag.dispatch('close');
}

function selectTarget(tag, target, updating) {
  if (tag.state.value == target.value &&
    tag.state.label == target.label &&
    tag.state.defaultFlg == target.default) {
    if (!updating) {
      tag.dispatch('select', target);
    }
    return
  }
  tag.state.value = target.value;
  tag.state.label = target.label;
  tag.state.defaultFlg = target.default;
  if (tag.props.search) {
    tag.$('.search').value = '';
    tag.filtered = false;
  }
  if (!updating) {
    tag.update();
    parentUpdate(tag);
    tag.dispatch('select', target);
    tag.dispatch('change', target);
  }
}

function selectMultiTarget(tag, updating) {
  if (JSON.stringify(tag.state.value) == JSON.stringify(tag.props.items.filter(item => item.selected).map(item => item.value))
    && tag.selectedFlg == tag.props.items.some(item => item.selected)) {
    if (!updating) {
      tag.dispatch('select', tag.props.items.filter(item => item.selected));
    }
    return
  }
  tag.state.value = tag.props.items.filter(item => item.selected).map(item => item.value);
  tag.selectedFlg = tag.props.items.some(item => item.selected);
  if (!updating) {
    tag.update();
    parentUpdate(tag);
    tag.dispatch('select', tag.props.items.filter(item => item.selected));
    tag.dispatch('change', tag.props.items.filter(item => item.selected));
  }
}

function search(tag, target) {
  tag.props.items.forEach(item => {
    item.searched = item.label && item.label.toLowerCase().indexOf(target) >= 0;
  });
  tag.filteredItems = tag.props.items.filter(item => {
    return item.searched
  });
  tag.update();
  tag.dispatch('search');
}

function scrollPosition(tag) {
  const menu = tag.root.querySelector('.menu');
  const item = tag.root.querySelector('.item.hover');

  if (menu && item) {
    const menuScroll = menu.scrollTop;
    const itemOffset = item.offsetTop;
    const itemHeight = parseInt(document.defaultView.getComputedStyle(item, null).height.replace('px', ''));
    const menuHeight = parseInt(document.defaultView.getComputedStyle(menu, null).height.replace('px', ''));
    const belowPage = menuScroll + menuHeight < itemOffset + itemHeight;
    const abovePage = itemOffset < menuScroll;
    if (abovePage || belowPage) {
      menu.scrollTop = itemOffset;
    }
  }
}

function parentUpdate(tag) {
  tag.obs.trigger(`${tag.props.suParentId}-update`);
}

function prepareClasses(tag) {
  const classes = tag.props.class.split(' ').filter(propClass => !reservedClasses.includes(propClass));
  if (tag.props.search) {
    classes.push('search');
  }
  if (tag.props.multiple) {
    classes.push('multiple');
  }
  if (isActive(tag)) {
    classes.push('active visible');
  }
  if (tag.upward) {
    classes.push('upward');
  }
  return classes.join(' ')
}

function prepareItemClasses(items, value, filtered) {
  items.forEach(item => {
    const classes = [];

    if (isItem(item)) {
      classes.push('item');
    }
    if (item.header && !filtered) {
      classes.push('header');
    }
    if (item.divider && !filtered) {
      classes.push('divider');
    }
    if (item.default) {
      classes.push('default');
    }
    if (item.active) {
      classes.push('hover');
    }
    if (item.value == value) {
      classes.push('active selected');
    }
    if (item.disabled) {
      classes.push('disabled');
    }
    item.classes = classes.join(' ');
  });
}

function isUpward(tag) {
  if (tag.props.direction == 'upward') {
    return true
  }
  if (tag.props.direction == 'downward') {
    return false
  }
  const dropdown = tag.root.getBoundingClientRect();
  const windowHeight = document.documentElement.offsetHeight || document.body.offsetHeight;
  const menuHeight = tag.root.querySelector('.menu').getBoundingClientRect().height;
  const above = menuHeight <= dropdown.top;
  const below = windowHeight >= dropdown.top + dropdown.height + menuHeight;

  if (below) {
    return false
  }
  if (!below && !above) {
    return false
  }
  return true
}

function isItem(item) {
  return item.searched && !item.header && !item.divider
}

function isActive(tag) {
  if (tag.closing) {
    return false
  }
  return tag.openning || tag.visibleFlg
}

function isVisible(item) {
  if (this.props.multiple && item.default) {
    return false
  }
  if (item.selected) {
    return false
  }
  return item.searched || item.divider || item.header
}

var suDropdown = {
  'css': `su-dropdown.ui.dropdown .menu>.item.default,[is="su-dropdown"].ui.dropdown .menu>.item.default{ color: rgba(0, 0, 0, 0.4) } su-dropdown.ui.dropdown .menu>.item.hover,[is="su-dropdown"].ui.dropdown .menu>.item.hover{ background: rgba(0, 0, 0, .05); color: rgba(0, 0, 0, .95); } su-dropdown.ui.dropdown .menu,[is="su-dropdown"].ui.dropdown .menu{ display: block; }`,

  'exports': {
    state: {
      defaultValue: '',
      filtered: false,
      label: '',
      selectedFlg: false,
      transitionStatus: 'hidden',
      value: '',
      classes: '',
    },

    lastPropValue: '',
    changed: false,
    visibleFlg: false,
    onBeforeMount,
    onMounted,
    onBeforeUpdate,
    onBlur,
    onFocus,
    onInput,
    onItemClick,
    onKeydown,
    onKeyup,
    onMousedown,
    onMouseup,
    onToggle,
    onUnselect,
    stopPropagation,
    isItem,
    isVisible
  },

  'template': function(template, expressionTypes, bindingTypes, getComponent) {
    return template(
      '<i class="dropdown icon"></i><input expr78="expr78" class="search" autocomplete="off"/><a expr79="expr79" class="ui label transition visible" style="display: inline-block !important;"></a><div expr81="expr81"></div><div expr82="expr82" tabindex="-1"><div expr83="expr83"></div><div expr88="expr88" class="message"></div></div>',
      [{
        'expressions': [{
          'type': expressionTypes.ATTRIBUTE,
          'name': 'class',

          'evaluate': function(scope) {
            return ['ui selection dropdown ', scope.state.classes].join('');
          }
        }, {
          'type': expressionTypes.EVENT,
          'name': 'onclick',

          'evaluate': function(scope) {
            return scope.onToggle;
          }
        }, {
          'type': expressionTypes.EVENT,
          'name': 'onfocus',

          'evaluate': function(scope) {
            return scope.onFocus;
          }
        }, {
          'type': expressionTypes.EVENT,
          'name': 'onmousedown',

          'evaluate': function(scope) {
            return scope.onMousedown;
          }
        }, {
          'type': expressionTypes.EVENT,
          'name': 'onmouseup',

          'evaluate': function(scope) {
            return scope.onMouseup;
          }
        }, {
          'type': expressionTypes.EVENT,
          'name': 'onblur',

          'evaluate': function(scope) {
            return scope.onBlur;
          }
        }, {
          'type': expressionTypes.EVENT,
          'name': 'onkeydown',

          'evaluate': function(scope) {
            return scope.onKeydown;
          }
        }, {
          'type': expressionTypes.EVENT,
          'name': 'onkeyup',

          'evaluate': function(scope) {
            return scope.onKeyup;
          }
        }, {
          'type': expressionTypes.ATTRIBUTE,
          'name': 'tabindex',

          'evaluate': function(scope) {
            return scope.props.search ? -1 : scope.tabindex;
          }
        }, {
          'type': expressionTypes.ATTRIBUTE,
          'name': 'value',

          'evaluate': function(scope) {
            return scope.props.multiple ? scope.viewValue : scope.state.value;
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
        'type': bindingTypes.IF,

        'evaluate': function(scope) {
          return scope.props.search;
        },

        'redundantAttribute': 'expr78',
        'selector': '[expr78]',

        'template': template(null, [{
          'expressions': [{
            'type': expressionTypes.ATTRIBUTE,
            'name': 'class',

            'evaluate': function(scope) {
              return 'search';
            }
          }, {
            'type': expressionTypes.ATTRIBUTE,
            'name': 'autocomplete',

            'evaluate': function(scope) {
              return 'off';
            }
          }, {
            'type': expressionTypes.ATTRIBUTE,
            'name': 'tabindex',

            'evaluate': function(scope) {
              return scope.tabindex;
            }
          }, {
            'type': expressionTypes.EVENT,
            'name': 'oninput',

            'evaluate': function(scope) {
              return scope.onInput;
            }
          }, {
            'type': expressionTypes.EVENT,
            'name': 'onclick',

            'evaluate': function(scope) {
              return scope.stopPropagation;
            }
          }, {
            'type': expressionTypes.EVENT,
            'name': 'onfocus',

            'evaluate': function(scope) {
              return scope.onFocus;
            }
          }, {
            'type': expressionTypes.EVENT,
            'name': 'onblur',

            'evaluate': function(scope) {
              return scope.onBlur;
            }
          }, {
            'type': expressionTypes.ATTRIBUTE,
            'name': 'readonly',

            'evaluate': function(scope) {
              return scope.readonly;
            }
          }]
        }])
      }, {
        'type': bindingTypes.EACH,
        'getKey': null,

        'condition': function(scope) {
          return scope.item.selected;
        },

        'template': template(' <i expr80="expr80" class="delete icon"></i>', [{
          'expressions': [{
            'type': expressionTypes.TEXT,
            'childNodeIndex': 0,

            'evaluate': function(scope) {
              return [scope.item.label].join('');
            }
          }, {
            'type': expressionTypes.ATTRIBUTE,
            'name': 'class',

            'evaluate': function(scope) {
              return 'ui label transition visible';
            }
          }, {
            'type': expressionTypes.ATTRIBUTE,
            'name': 'style',

            'evaluate': function(scope) {
              return 'display: inline-block !important;';
            }
          }, {
            'type': expressionTypes.EVENT,
            'name': 'onclick',

            'evaluate': function(scope) {
              return scope.stopPropagation;
            }
          }]
        }, {
          'redundantAttribute': 'expr80',
          'selector': '[expr80]',

          'expressions': [{
            'type': expressionTypes.EVENT,
            'name': 'onclick',

            'evaluate': function(scope) {
              return event => scope.onUnselect(event, scope.item);
            }
          }]
        }]),

        'redundantAttribute': 'expr79',
        'selector': '[expr79]',
        'itemName': 'item',
        'indexName': null,

        'evaluate': function(scope) {
          return scope.props.items;
        }
      }, {
        'type': bindingTypes.IF,

        'evaluate': function(scope) {
          return !scope.props.multiple || !scope.selectedFlg;
        },

        'redundantAttribute': 'expr81',
        'selector': '[expr81]',

        'template': template(' ', [{
          'expressions': [{
            'type': expressionTypes.TEXT,
            'childNodeIndex': 0,

            'evaluate': function(scope) {
              return [scope.state.label].join('');
            }
          }, {
            'type': expressionTypes.ATTRIBUTE,
            'name': 'class',

            'evaluate': function(scope) {
              return [
                scope.state.defaultFlg && 'default',
                ' text ',
                scope.filtered && 'filtered'
              ].join('');
            }
          }]
        }])
      }, {
        'redundantAttribute': 'expr82',
        'selector': '[expr82]',

        'expressions': [{
          'type': expressionTypes.ATTRIBUTE,
          'name': 'class',

          'evaluate': function(scope) {
            return ['menu transition ', scope.state.transitionStatus].join('');
          }
        }, {
          'type': expressionTypes.EVENT,
          'name': 'onmousedown',

          'evaluate': function(scope) {
            return scope.onMousedown;
          }
        }, {
          'type': expressionTypes.EVENT,
          'name': 'onmouseup',

          'evaluate': function(scope) {
            return scope.onMouseup;
          }
        }, {
          'type': expressionTypes.EVENT,
          'name': 'onblur',

          'evaluate': function(scope) {
            return scope.onBlur;
          }
        }]
      }, {
        'type': bindingTypes.EACH,
        'getKey': null,

        'condition': function(scope) {
          return scope.isVisible(scope.item);
        },

        'template': template(
          '<i expr84="expr84"></i><img expr85="expr85" class="ui avatar image"/><span expr86="expr86" class="description"></span><span expr87="expr87" class="text"> </span>',
          [{
            'expressions': [{
              'type': expressionTypes.ATTRIBUTE,
              'name': 'value',

              'evaluate': function(scope) {
                return scope.item.value;
              }
            }, {
              'type': expressionTypes.ATTRIBUTE,
              'name': 'default',

              'evaluate': function(scope) {
                return scope.item.default;
              }
            }, {
              'type': expressionTypes.EVENT,
              'name': 'onmousedown',

              'evaluate': function(scope) {
                return scope.onMousedown;
              }
            }, {
              'type': expressionTypes.EVENT,
              'name': 'onmouseup',

              'evaluate': function(scope) {
                return scope.onMouseup;
              }
            }, {
              'type': expressionTypes.ATTRIBUTE,
              'name': 'class',

              'evaluate': function(scope) {
                return scope.item.classes;
              }
            }, {
              'type': expressionTypes.EVENT,
              'name': 'onclick',

              'evaluate': function(scope) {
                return event => scope.onItemClick(event, scope.item);
              }
            }]
          }, {
            'type': bindingTypes.IF,

            'evaluate': function(scope) {
              return scope.item.icon;
            },

            'redundantAttribute': 'expr84',
            'selector': '[expr84]',

            'template': template(null, [{
              'expressions': [{
                'type': expressionTypes.ATTRIBUTE,
                'name': 'class',

                'evaluate': function(scope) {
                  return [scope.item.icon, ' icon'].join('');
                }
              }]
            }])
          }, {
            'type': bindingTypes.IF,

            'evaluate': function(scope) {
              return scope.item.image;
            },

            'redundantAttribute': 'expr85',
            'selector': '[expr85]',

            'template': template(null, [{
              'expressions': [{
                'type': expressionTypes.ATTRIBUTE,
                'name': 'class',

                'evaluate': function(scope) {
                  return 'ui avatar image';
                }
              }, {
                'type': expressionTypes.ATTRIBUTE,
                'name': 'src',

                'evaluate': function(scope) {
                  return scope.item.image;
                }
              }]
            }])
          }, {
            'type': bindingTypes.IF,

            'evaluate': function(scope) {
              return scope.item.description;
            },

            'redundantAttribute': 'expr86',
            'selector': '[expr86]',

            'template': template(' ', [{
              'expressions': [{
                'type': expressionTypes.TEXT,
                'childNodeIndex': 0,

                'evaluate': function(scope) {
                  return scope.item.description;
                }
              }, {
                'type': expressionTypes.ATTRIBUTE,
                'name': 'class',

                'evaluate': function(scope) {
                  return 'description';
                }
              }]
            }])
          }, {
            'redundantAttribute': 'expr87',
            'selector': '[expr87]',

            'expressions': [{
              'type': expressionTypes.TEXT,
              'childNodeIndex': 0,

              'evaluate': function(scope) {
                return scope.item.label;
              }
            }]
          }]
        ),

        'redundantAttribute': 'expr83',
        'selector': '[expr83]',
        'itemName': 'item',
        'indexName': null,

        'evaluate': function(scope) {
          return scope.props.items;
        }
      }, {
        'type': bindingTypes.IF,

        'evaluate': function(scope) {
          return scope.filtered && scope.filteredItems.length == 0;
        },

        'redundantAttribute': 'expr88',
        'selector': '[expr88]',

        'template': template('No results found.', [{
          'expressions': [{
            'type': expressionTypes.ATTRIBUTE,
            'name': 'class',

            'evaluate': function(scope) {
              return 'message';
            }
          }]
        }])
      }]
    );
  },

  'name': 'su-dropdown'
};

export default suDropdown;
