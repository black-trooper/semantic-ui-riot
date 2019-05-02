const keys = {
  enter: 13,
  escape: 27,
  upArrow: 38,
  downArrow: 40,
};

// ===================================================================================
//                                                                           Lifecycle
//                                                                           =========
function onBeforeMount(props, state) {
  if (props.items && props.items.length > 0) {
    this.label = props.items[0].label;
    this.value = props.items[0].value;
    this.defaultFlg = props.items[0].default;
  }
}

function onMounted(props, state) {
  if (typeof props.value !== 'undefined') {
    this.defaultValue = this.value;
    parentUpdate();
  } else {
    this.defaultValue = this.value;
  }
  this.update();
}

function onBeforeUpdate(props, state) {
  if (props.multiple) {
    const value = this.value ? this.value : [];
    const defaultValue = this.defaultValue ? this.defaultValue : [];
    return value.toString() !== defaultValue.toString()
  }
  this.changed = this.value !== this.defaultValue;
  this.readonly = this.root.classList.contains('read-only');
  this.disabled = this.root.classList.contains('disabled');
  this.tabindex = props.tabindex || '0';
}

function onUpdated(props, state) {
  if (props.multiple) {
    props.items.forEach(item => item.selected = false);
    props.items.filter(item => this.value && this.value.indexOf(item.value) >= 0).forEach(item => item.selected = true);
    selectMultiTarget(true);
  } else if (props.items) {
    const selected = props.items.filter(item => item.value === this.value);
    if (selected && selected.length > 0) {
      const target = selected[0];
      if (this.label !== target.label) {
        selectTarget(this, target, true);
      }
    } else if (props.items && props.items.length > 0) {
      if (this.value != props.items[0].value) {
        this.value = props.items[0].value;
      }
      if (this.label != props.items[0].label) {
        this.label = props.items[0].label;
        this.defaultFlg = props.items[0].default;
      }
    }
  }
}

function reset() {
  this.value = this.defaultValue;
  this.update();
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
    if (!this.closing && this.visibleFlg) {
      const target = this.props.multiple ? this.props.items.filter(item => item.selected) : { value: this.value, label: this.label, default: this.defaultFlg };
      this.dispatch('blur', target);
    }
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
function onUnselect(event) {
  event.stopPropagation();
  event.item.item.selected = false;
  this.value = this.props.items.filter(item => item.selected).map(item => item.value);
  this.selectedFlg = this.props.items.some(item => item.selected);
  parentUpdate();
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
  tag.transitionStatus = `visible animating in slide ${tag.upward ? 'up' : 'down'}`;
  tag.props.items.forEach(item => item.active = false);
  setTimeout(() => {
    tag.openning = false;
    tag.visibleFlg = true;
    tag.transitionStatus = 'visible';
    tag.update();
  }, 300);

  if (tag.props.search) {
    tag.refs.condition.focus();
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
  tag.transitionStatus = `visible animating out slide ${tag.upward ? 'up' : 'down'}`;
  setTimeout(() => {
    tag.closing = false;
    tag.visibleFlg = false;
    tag.transitionStatus = 'hidden';
    tag.update();
  }, 300);

  if (tag.props.search) {
    tag.refs.condition.blur();
    if (tag.filtered && tag.filteredItems.length > 0) {
      selectTarget(tag, tag.filteredItems[0]);
    } else {
      tag.refs.condition.value = '';
      tag.filtered = false;
    }
  }
  tag.update();
  tag.dispatch('close');
}

function selectTarget(tag, target, updating) {
  if (tag.value === target.value &&
    tag.label === target.label &&
    tag.defaultFlg === target.default) {
    if (!updating) {
      tag.dispatch('select', target);
    }
    return
  }
  tag.value = target.value;
  tag.label = target.label;
  tag.defaultFlg = target.default;
  if (tag.props.search) {
    tag.refs.condition.value = '';
    tag.filtered = false;
  }
  if (!updating) {
    tag.update();
    // parentUpdate()
    tag.dispatch('select', target);
    tag.dispatch('change', target);
  }
}

function selectMultiTarget(tag, updating) {
  if (JSON.stringify(tag.value) == JSON.stringify(props.items.filter(item => item.selected).map(item => item.value))
    && tag.selectedFlg == props.items.some(item => item.selected)) {
    if (!updating) {
      tag.dispatch('select', props.items.filter(item => item.selected));
    }
    return
  }
  tag.value = props.items.filter(item => item.selected).map(item => item.value);
  tag.selectedFlg = props.items.some(item => item.selected);
  if (!updating) {
    tag.update();
    parentUpdate();
    tag.dispatch('select', props.items.filter(item => item.selected));
    tag.dispatch('change', props.items.filter(item => item.selected));
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
  if (tag.parent) {
    tag.parent.update();
  }
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

function isActive() {
  if (this.closing) {
    return false
  }
  return this.openning || this.visibleFlg
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
  'css': `su-dropdown.ui.dropdown .menu>.item.default,[is="su-dropdown"].ui.dropdown .menu>.item.default{
      color: rgba(0, 0, 0, 0.4)
    } su-dropdown.ui.dropdown .menu>.item.hover,[is="su-dropdown"].ui.dropdown .menu>.item.hover{
      background: rgba(0, 0, 0, .05);
      color: rgba(0, 0, 0, .95);
    } su-dropdown.ui.dropdown .menu,[is="su-dropdown"].ui.dropdown .menu{
      display: block;
    }`,

  'exports': {
    state: {
      defaultValue: '',
      filtered: false,
      label: '',
      selectedFlg: false,
      transitionStatus: 'hidden',
      value: '',
    },

    changed: false,
    visibleFlg: false,
    onBeforeMount,
    onMounted,
    onBeforeUpdate,
    onUpdated,
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
    isActive,
    isItem,
    isVisible,
    reset
  },

  'template': function(template, expressionTypes, bindingTypes, getComponent) {
    return template(
      '<i class="dropdown icon"></i><input expr537 class="search" autocomplete="off" ref="condition"/><a expr538 class="ui label transition visible" style="display: inline-block !important;"></a><div expr540></div><div expr541 tabindex="-1"><div expr542></div><div expr547 class="message"></div></div>',
      [{
        'expressions': [{
          'type': expressionTypes.ATTRIBUTE,
          'name': 'class',

          'evaluate': function(scope) {
            return [
              'ui selection ',
              scope.props.class,
              ' ',
              scope.props.search && 'search',
              ' ',
              scope.props.multiple && 'multiple',
              ' dropdown ',
              scope.isActive() && 'active visible',
              ' ',
              scope.upward && 'upward'
            ].join('');
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
        }]
      }, {
        'type': bindingTypes.IF,

        'evaluate': function(scope) {
          return scope.props.search;
        },

        'redundantAttribute': 'expr537',
        'selector': '[expr537]',

        'template': template(null, [{
          'expressions': [{
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

        'template': template('<!----><i expr539 class="delete icon"></i>', [{
          'expressions': [{
            'type': expressionTypes.TEXT,
            'childNodeIndex': 0,

            'evaluate': function(scope) {
              return ['\n    ', scope.item.label, '\n    '].join('');
            }
          }, {
            'type': expressionTypes.EVENT,
            'name': 'onclick',

            'evaluate': function(scope) {
              return scope.stopPropagation;
            }
          }]
        }, {
          'redundantAttribute': 'expr539',
          'selector': '[expr539]',

          'expressions': [{
            'type': expressionTypes.EVENT,
            'name': 'onclick',

            'evaluate': function(scope) {
              return scope.onUnselect;
            }
          }]
        }]),

        'redundantAttribute': 'expr538',
        'selector': '[expr538]',
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

        'redundantAttribute': 'expr540',
        'selector': '[expr540]',

        'template': template('<!---->', [{
          'expressions': [{
            'type': expressionTypes.TEXT,
            'childNodeIndex': 0,

            'evaluate': function(scope) {
              return ['\n    ', scope.label, '\n  '].join('');
            }
          }, {
            'type': expressionTypes.ATTRIBUTE,
            'name': 'class',

            'evaluate': function(scope) {
              return [scope.defaultFlg && 'default', ' text ', scope.filtered && 'filtered'].join('');
            }
          }]
        }])
      }, {
        'redundantAttribute': 'expr541',
        'selector': '[expr541]',

        'expressions': [{
          'type': expressionTypes.ATTRIBUTE,
          'name': 'class',

          'evaluate': function(scope) {
            return ['menu transition ', scope.transitionStatus].join('');
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
          '<i expr543></i><img expr544 class="ui avatar image"/><span expr545 class="description"></span><span expr546 class="text"><!----></span>',
          [{
            'expressions': [{
              'type': expressionTypes.VALUE,

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
                return [
                  scope.isItem(scope.item) && 'item',
                  ' ',
                  scope.item.header && !scope.filtered && 'header',
                  ' ',
                  scope.item.divider && !scope.filtered && 'divider',
                  ' ',
                  scope.item.default && 'default',
                  ' ',
                  scope.item.active && 'hover',
                  ' ',
                  scope.item.value == scope.value && 'active selected'
                ].join('');
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

            'redundantAttribute': 'expr543',
            'selector': '[expr543]',

            'template': template(null, [{
              'expressions': [{
                'type': expressionTypes.ATTRIBUTE,
                'name': 'class',

                'evaluate': function(scope) {
                  return scope.item.icon;
                }
              }]
            }])
          }, {
            'type': bindingTypes.IF,

            'evaluate': function(scope) {
              return scope.item.image;
            },

            'redundantAttribute': 'expr544',
            'selector': '[expr544]',

            'template': template(null, [{
              'expressions': [{
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

            'redundantAttribute': 'expr545',
            'selector': '[expr545]',

            'template': template('<!---->', [{
              'expressions': [{
                'type': expressionTypes.TEXT,
                'childNodeIndex': 0,

                'evaluate': function(scope) {
                  return scope.item.description;
                }
              }]
            }])
          }, {
            'redundantAttribute': 'expr546',
            'selector': '[expr546]',

            'expressions': [{
              'type': expressionTypes.TEXT,
              'childNodeIndex': 0,

              'evaluate': function(scope) {
                return scope.item.label;
              }
            }]
          }]
        ),

        'redundantAttribute': 'expr542',
        'selector': '[expr542]',
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

        'redundantAttribute': 'expr547',
        'selector': '[expr547]',
        'template': template('No results found.', [])
      }]
    );
  },

  'name': 'su-dropdown'
};

export default suDropdown;
