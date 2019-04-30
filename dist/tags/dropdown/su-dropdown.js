// ===================================================================================

function reset() {
  this.value = this.defaultValue;
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
    if (!this.closing && visibleFlg) {
      const target = props.multiple ? props.items.filter(item => item.selected) : { value: this.value, label: this.label, default: this.defaultFlg };
      this.trigger('blur', target);
    }
    close();
  }
}

function onItemClick(event, item) {
  event.stopPropagation();
  if (!this.isItem(event.item.item)) {
    return
  }
  if (props.multiple) {
    if (!event.item.item.default) {
      event.item.item.selected = true;
    }
    selectMultiTarget();
    return
  }
  selectTarget(this, event.item.item);
  close();
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
  const searchedItems = props.items.filter(item => {
    if (props.search && !item.searched) {
      return false
    }
    if (props.multiple && (item.default || item.selected)) {
      return false
    }
    return true
  });
  if (searchedItems.length == 0) {
    return true
  }
  if (searchedItems.every(item => !item.active)) {
    searchedItems[0].active = true;
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
  scrollPosition();
}

function onKeyup(event) {
  const keyCode = event.keyCode;
  if (keyCode != keys.enter) {
    return
  }
  const searchedItems = props.items.filter(item => item.searched && !item.selected);
  const index = parseInt(searchedItems.map((item, index) => item.active ? index : -1).filter(index => index >= 0));
  const activeItem = searchedItems[index];
  if (!activeItem) {
    return
  }

  if (props.multiple) {
    activeItem.selected = true;
    activeItem.active = false;
    if (index < searchedItems.length - 1) {
      searchedItems[index + 1].active = true;
    } else if (index > 0) {
      searchedItems[index - 1].active = true;
    }
    selectMultiTarget();
  } else {
    activeItem.active = false;
    selectTarget(this, activeItem);
    close();
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
  search(value);
}

// -----------------------------------------------------
//                                       multiple option
//                                       ---------------
function onUnselect(event) {
  event.stopPropagation();
  event.item.item.selected = false;
  this.value = props.items.filter(item => item.selected).map(item => item.value);
  this.selectedFlg = props.items.some(item => item.selected);
  parentUpdate();
}

// ===================================================================================
//                                                                               Logic
//                                                                               =====
function open(tag) {
  if (tag.openning || tag.closing || visibleFlg || tag.readonly || tag.disabled) {
    return
  }
  tag.openning = true;
  search('');
  tag.upward = isUpward();
  tag.transitionStatus = `visible animating in slide ${tag.upward ? 'up' : 'down'}`;
  props.items.forEach(item => item.active = false);
  setTimeout(() => {
    tag.openning = false;
    visibleFlg = true;
    tag.transitionStatus = 'visible';
    tag.update();
  }, 300);

  if (props.search) {
    tag.refs.condition.focus();
  }
  tag.update();
  scrollPosition();
  tag.trigger('open');
}

function close(tag) {
  if (tag.closing || !visibleFlg) {
    return
  }
  tag.closing = true;
  tag.transitionStatus = `visible animating out slide ${tag.upward ? 'up' : 'down'}`;
  setTimeout(() => {
    tag.closing = false;
    visibleFlg = false;
    tag.transitionStatus = 'hidden';
    tag.update();
  }, 300);

  if (props.search) {
    tag.refs.condition.blur();
    if (tag.filtered && tag.filteredItems.length > 0) {
      selectTarget(tag, tag.filteredItems[0]);
    } else {
      tag.refs.condition.value = '';
      tag.filtered = false;
    }
  }
  tag.update();
  tag.trigger('close');
}

function selectTarget(tag, target, updating) {
  if (tag.value === target.value &&
    tag.label === target.label &&
    tag.default === target.default) {
    if (!updating) {
      tag.trigger('select', target);
    }
    return
  }
  tag.value = target.value;
  tag.label = target.label;
  tag.default = target.default;
  if (props.search) {
    tag.refs.condition.value = '';
    tag.filtered = false;
  }
  if (!updating) {
    tag.update();
    parentUpdate();
    tag.trigger('select', target);
    tag.trigger('change', target);
  }
}

function selectMultiTarget(tag, updating) {
  if (JSON.stringify(tag.value) == JSON.stringify(props.items.filter(item => item.selected).map(item => item.value))
    && tag.selectedFlg == props.items.some(item => item.selected)) {
    if (!updating) {
      tag.trigger('select', props.items.filter(item => item.selected));
    }
    return
  }
  tag.value = props.items.filter(item => item.selected).map(item => item.value);
  tag.selectedFlg = props.items.some(item => item.selected);
  if (!updating) {
    tag.update();
    parentUpdate();
    tag.trigger('select', props.items.filter(item => item.selected));
    tag.trigger('change', props.items.filter(item => item.selected));
  }
}

function search(tag, target) {
  props.items.forEach(item => {
    item.searched = item.label && item.label.toLowerCase().indexOf(target) >= 0;
  });
  tag.filteredItems = props.items.filter(item => {
    return item.searched
  });
  tag.update();
  tag.trigger('search');
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

function isUpward() {
  if (props.direction == 'upward') {
    return true
  }
  if (props.direction == 'downward') {
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
  return this.openning || visibleFlg
}

function getTabindex() {
  if (props.tabindex) {
    return props.tabindex
  }
  return 0
}

function isVisible(item) {
  if (props.multiple && item.default) {
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

    keys: {
      enter: 13,
      escape: 27,
      upArrow: 38,
      downArrow: 40,
    },

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
    getTabindex,
    isActive,
    isDisabled,
    isItem,
    isReadOnly,
    isVisible,
    reset
  },

  'template': function(template, expressionTypes, bindingTypes, getComponent) {
    return template(
      '<i class="dropdown icon"></i>あiuee\n  <input expr122 class="search" autocomplete="off" ref="condition"/><a expr123 class="ui label transition visible" style="display: inline-block !important;"></a><div expr125></div><div expr126 tabindex="-1"><div expr127></div><div expr132 class="message"></div></div>',
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
            return scope.props.search ? -1 : scope.getTabindex();
          }
        }]
      }, {
        'type': bindingTypes.IF,

        'evaluate': function(scope) {
          return scope.props.search;
        },

        'redundantAttribute': 'expr122',
        'selector': '[expr122]',

        'template': template(null, [{
          'expressions': [{
            'type': expressionTypes.ATTRIBUTE,
            'name': 'tabindex',

            'evaluate': function(scope) {
              return scope.getTabindex();
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

        'template': template('<!----><i expr124 class="delete icon"></i>', [{
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
          'redundantAttribute': 'expr124',
          'selector': '[expr124]',

          'expressions': [{
            'type': expressionTypes.EVENT,
            'name': 'onclick',

            'evaluate': function(scope) {
              return scope.onUnselect;
            }
          }]
        }]),

        'redundantAttribute': 'expr123',
        'selector': '[expr123]',
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

        'redundantAttribute': 'expr125',
        'selector': '[expr125]',

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
        'redundantAttribute': 'expr126',
        'selector': '[expr126]',

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
          '<i expr128></i><img expr129 class="ui avatar image"/><span expr130 class="description"></span><span expr131 class="text"><!----></span>',
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

            'redundantAttribute': 'expr128',
            'selector': '[expr128]',

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

            'redundantAttribute': 'expr129',
            'selector': '[expr129]',

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

            'redundantAttribute': 'expr130',
            'selector': '[expr130]',

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
            'redundantAttribute': 'expr131',
            'selector': '[expr131]',

            'expressions': [{
              'type': expressionTypes.TEXT,
              'childNodeIndex': 0,

              'evaluate': function(scope) {
                return scope.item.label;
              }
            }]
          }]
        ),

        'redundantAttribute': 'expr127',
        'selector': '[expr127]',
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

        'redundantAttribute': 'expr132',
        'selector': '[expr132]',
        'template': template('No results found.', [])
      }]
    );
  },

  'name': 'su-dropdown'
};

export default suDropdown;
