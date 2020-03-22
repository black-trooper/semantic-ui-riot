import { isToday, format, addMonths, startOfMonth, addDays, isSameDay, parse } from 'date-fns';

let index = 0;

// tag.mixin('semantic-ui')

// ===================================================================================
//                                                                           Lifecycle
//                                                                           =========
function onBeforeMount(props, state) {
  this.state.transitionStatus = props.popup ? 'hidden' : 'visible';
  this.weeks = [];
  this.pattern = getPattern(this);
  this.locale = getLocale(this);
  this.tabIndex = getTabindex(this);
  this.weekNames = getWeekNames(this);
  this.su_id = `su-datepicker-${index++}`;
  this.obs.on(`${this.su_id}-reset`, () => { reset(this); });
}

function onMounted(props, state) {
  if (!state.value) {
    state.value = copyDate(props.value);
  }
  if (state.value) {
    state.value = format(copyDate(state.value), 'YYYY-MM-DD');
  }
  state.formatedValue = formatViewDate(this, state.value);
  if (props.popup) {
    this.$('input').value = state.formatedValue;
  }
  this.lastValue = copyDate(state.value);
  this.lastPropsValue = copyDate(props.value);

  state.currentDate = copyDate(props.currentDate);
  if (state.value) {
    state.currentDate = copyDate(state.value);
  }
  if (!state.currentDate) {
    state.currentDate = new Date();
  }
  state.months = getMonthes(this);
  if (props.yearRange && !isNaN(props.yearRange) && props.yearRange > 20) {
    this.yearRange = props.yearRange;
  }
  if (props.startMode === 'year') {
    this.selectYear();
  }
  state.defaultValue = state.value;
  this.update();
  parentUpdate(this);
}

function onBeforeUpdate(props, state) {
  this.readOnly = this.root.classList.contains('read-only') ? "read-only" : '';
  this.disabled = this.root.classList.contains('disabled') ? 'disabled' : '';

  let changed = false;
  if (!isEqualDay(this.lastValue, state.value)) {
    this.lastValue = copyDate(state.value);
    changed = true;
  } else if (this.lastPropsValue !== props.value) {
    state.value = props.value ? format(copyDate(props.value), 'YYYY-MM-DD') : null;
    this.lastPropsValue = copyDate(props.value);
    this.lastValue = copyDate(props.value);
    changed = true;
  }
  if (changed) {
    state.formatedValue = formatViewDate(this, state.value);
    if (props.popup) {
      this.$('input').value = state.formatedValue;
    }
    parentUpdate(this);
  }

  if (changed && state.value) {
    state.currentDate = copyDate(state.value);
  }
  if (!isEqualDay(this.lastPropsCurrentDate, props.currentDate)) {
    state.currentDate = copyDate(props.currentDate);
    this.lastPropsCurrentDate = copyDate(props.currentDate);
  }
  if (!isEqualDay(this.lastCurrentDate, state.currentDate)) {
    this.lastCurrentDate = copyDate(state.currentDate);
    generate(this);
  }
  this.changed = !isEqualDay(state.value, state.defaultValue);
}

function reset(tag) {
  tag.state.value = tag.state.defaultValue;
  tag.update();
  parentUpdate(tag);
}

// ===================================================================================
//                                                                               Event
//                                                                               =====
function selectMonth() {
  this.yearSelecting = false;
  this.monthSelecting = !this.monthSelecting;
  this.update();
}

function selectYear() {
  this.state.years = getYears(this);
  this.monthSelecting = false;
  this.yearSelecting = !this.yearSelecting;
  this.update();
}

function clickDay(day) {
  if (this.readOnly || this.disabled) {
    return
  }
  setDate(this, day);
  this.update();
  parentUpdate(this);
  this.dispatch('click', this.state.value);
}

function clickMonth(month) {
  this.state.currentDate.setMonth(month.value);
  this.monthSelecting = false;
  this.update();
}

function clickYear(year) {
  this.state.currentDate.setYear(year);
  this.selectMonth();
  this.update();
}

function clickPrevious() {
  if (this.yearSelecting) {
    this.state.years = addYear(this.state.years, -this.yearRange);
  } else {
    this.monthSelecting = false;
    this.state.currentDate = addMonths(this.state.currentDate, -1);
  }
  this.update();
}

function clickNext() {
  if (this.yearSelecting) {
    this.state.years = addYear(this.state.years, this.yearRange);
  } else {
    this.monthSelecting = false;
    this.state.currentDate = addMonths(this.state.currentDate, 1);
  }
  this.update();
}

function clickClear() {
  setDate(this, null);
  this.update();
  parentUpdate(this);
  this.dispatch('clear', this.state.value);
}

function clickToday() {
  setDate(this, new Date());
  this.update();
  parentUpdate(this);
  this.dispatch('today', this.state.value);
}

// -----------------------------------------------------
//                                          popup option
//                                          ------------
function toggle() {
  if (this.readOnly || this.disabled) {
    return
  }
  if (!this.visibleFlg) {
    if (this.props.startMode === 'year') {
      this.selectYear();
      this.yearSelecting = true;
    }
    open(this);
  } else {
    close(this);
  }
  this.update();
}

function onMouseDown() {
  this.itemActivated = true;
  this.update();
}

function onMouseUp() {
  this.itemActivated = false;
  this.update();
}

function onBlur() {
  if (this.props.popup && !this.itemActivated) {
    close(this);
    this.update();
  }
}

// ===================================================================================
//                                                                              Helper
//                                                                              ======
function getCurrentYear() {
  if (this.state.currentDate) {
    return this.state.currentDate.getFullYear()
  }
}

function getCurrentMonthView() {
  if (this.state.currentDate) {
    return format(this.state.currentDate, 'MMM', { locale: this.locale })
  }
}

function getCurrentMonth() {
  return this.state.currentDate.getMonth()
}

function isActive(date) {
  return isEqualDay(this.state.value, date)
}

// ===================================================================================
//                                                                               Logic
//                                                                               =====
function generate(tag) {
  const startDate = startOfMonth(tag.state.currentDate);
  const baseDate = addDays(startDate, - startDate.getDay());
  let i = 0;
  tag.weeks = [];

  for (let r = 0; r < 6; r++) {
    const days = [];
    for (let c = 0; c < 7; c++) {
      days.push(addDays(baseDate, i++));
    }
    tag.weeks.push({ days });
  }
}

function addYear(years, range) {
  return years.map(values => {
    values = values.map(value => {
      return value + parseInt(range)
    });
    return values
  })
}

function getYears(tag) {
  const rowSize = ((tag.yearRange - tag.yearRange % 4) / 4) + ((tag.yearRange % 4 != 0) ? 1 : 0);
  const years = new Array();
  for (let index = 0; index < rowSize; index++) {
    years.push([]);
  }
  for (let index = 0; index < tag.yearRange; index++) {
    years[(index - index % 4) / 4][index % 4] = tag.state.currentDate.getFullYear() + index - ((tag.yearRange - tag.yearRange % 2) / 2 - 1);
  }
  return years
}

function getMonthes(tag) {
  const months = [[], [], []];
  const monthNames = range(12).map(month => format(new Date(2018, month, 1), 'MMM', { locale: tag.locale }));
  monthNames.forEach((month, index) => {
    months[(index - index % 4) / 4][index % 4] = {
      label: month,
      value: index
    };
  });
  return months
}

function open(tag) {
  tag.upward = isUpward(tag);
  tag.state.transitionStatus = 'visible';
  tag.visibleFlg = true;
  tag.state.currentDate = copyDate(tag.props.currentDate);
  if (tag.state.value) {
    tag.state.currentDate = copyDate(tag.state.value);
  }
  if (!tag.state.currentDate) {
    tag.state.currentDate = new Date();
  }
  tag.dispatch('open', tag.state.value);
}

function close(tag) {
  tag.state.transitionStatus = 'hidden';
  tag.visibleFlg = false;
  tag.dispatch('close', tag.state.value);
}

function setDate(tag, date) {
  tag.state.value = date ? format(date, 'YYYY-MM-DD') : null;
  if (tag.props.popup) {
    tag.$('input').value = tag.state.value;
    close(tag);
  }
  tag.dispatch('change', tag.state.value);
}

function isEqualDay(d1, d2) {
  if (d1 == d2) {
    return true
  }
  if (typeof d1 === 'undefined' || typeof d2 === 'undefined' || d1 === null || d2 === null) {
    return false
  }
  return isSameDay(d1, d2)
}

function copyDate(date) {
  if (!date) {
    return date
  }
  return parse(date)
}

function isUpward(tag) {
  if (tag.props.direction == 'upward') {
    return true
  }
  if (tag.props.direction == 'downward') {
    return false
  }
  const inputField = tag.root.getBoundingClientRect();
  const windowHeight = document.documentElement.offsetHeight || document.body.offsetHeight;
  const menuHeight = tag.root.querySelector('.menu').getBoundingClientRect().height;
  const above = menuHeight <= inputField.top;
  const below = windowHeight >= inputField.top + inputField.height + menuHeight;

  if (below) {
    return false
  }
  if (!below && !above) {
    return false
  }
  return true
}

function getWeekNames(tag) {
  return range(7, 1).map(day => format(new Date(2018, 6, day), 'dd', { locale: tag.locale }))
}

function getTabindex(tag) {
  if (!tag.props.popup) {
    return false
  }
  if (tag.props.tabindex) {
    return tag.props.tabindex
  }
  return 0
}

function getPattern(tag) {
  if (tag.props.pattern) {
    return tag.props.pattern
  }
  if (tag.defaultOptions && tag.defaultOptions.pattern) {
    return tag.defaultOptions.pattern
  }
  return 'YYYY-MM-DD'
}

function getLocale(tag) {
  if (tag.props.locale) {
    return tag.props.locale
  }
  if (tag.defaultOptions && tag.defaultOptions.locale) {
    return tag.defaultOptions.locale
  }
}

function range(size, startAt = 0) {
  return Array.from(Array(size).keys()).map(i => i + startAt)
}

function formatViewDate(tag, value) {
  const viewDate = copyDate(value);
  return viewDate ? format(viewDate, tag.pattern, { locale: tag.locale }) : null
}

function parentUpdate(tag) {
  tag.obs.trigger(`${tag.props.suParentId}-update`);
}

var suDatepicker = {
  'css': `su-datepicker .ui.segment,[is="su-datepicker"] .ui.segment{ padding-top: 0.5rem; padding-bottom: 0.5rem; } su-datepicker .ui.dropdown .menu,[is="su-datepicker"] .ui.dropdown .menu{ display: block; } su-datepicker .ui.buttons.dp-navigation,[is="su-datepicker"] .ui.buttons.dp-navigation{ margin-bottom: 0.4rem; } su-datepicker .ui.dropdown,[is="su-datepicker"] .ui.dropdown{ display: block; } su-datepicker .dp-wrapper,[is="su-datepicker"] .dp-wrapper{ display: flex; } su-datepicker .dp-day,[is="su-datepicker"] .dp-day,su-datepicker .dp-month,[is="su-datepicker"] .dp-month{ cursor: pointer; } su-datepicker .dp-weekday,[is="su-datepicker"] .dp-weekday,su-datepicker .dp-day,[is="su-datepicker"] .dp-day,su-datepicker .dp-day .ui.button,[is="su-datepicker"] .dp-day .ui.button{ width: 2.5rem; } su-datepicker .dp-month,[is="su-datepicker"] .dp-month,su-datepicker .dp-month .ui.button,[is="su-datepicker"] .dp-month .ui.button{ width: 4.375rem; } su-datepicker .dp-day .ui.button,[is="su-datepicker"] .dp-day .ui.button,su-datepicker .dp-month .ui.button,[is="su-datepicker"] .dp-month .ui.button{ padding: 0; height: 2.5rem; font-weight: normal } su-datepicker .dp-day .ui.button.today,[is="su-datepicker"] .dp-day .ui.button.today{ font-weight: 700; } su-datepicker .dp-today .ui.button,[is="su-datepicker"] .dp-today .ui.button,su-datepicker .dp-clear .ui.button,[is="su-datepicker"] .dp-clear .ui.button,su-datepicker .dp-navigation .ui.button,[is="su-datepicker"] .dp-navigation .ui.button,su-datepicker .dp-month .ui.button,[is="su-datepicker"] .dp-month .ui.button,su-datepicker .dp-day .ui.button.non-active,[is="su-datepicker"] .dp-day .ui.button.non-active{ background-color: transparent; } su-datepicker .dp-today .ui.button:hover,[is="su-datepicker"] .dp-today .ui.button:hover,su-datepicker .dp-clear .ui.button:hover,[is="su-datepicker"] .dp-clear .ui.button:hover,su-datepicker .dp-navigation .ui.button:hover,[is="su-datepicker"] .dp-navigation .ui.button:hover,su-datepicker .dp-month .ui.button:hover,[is="su-datepicker"] .dp-month .ui.button:hover,su-datepicker .dp-day .ui.button.non-active:hover,[is="su-datepicker"] .dp-day .ui.button.non-active:hover{ background-color: #e0e1e2; } su-datepicker .dp-day .ui.button.disabled,[is="su-datepicker"] .dp-day .ui.button.disabled{ pointer-events: all !important; } su-datepicker .dp-navigation,[is="su-datepicker"] .dp-navigation{ width: 100%; } su-datepicker .dp-navigation .ui.button,[is="su-datepicker"] .dp-navigation .ui.button{ width: 20%; } su-datepicker .dp-navigation .ui.button.year,[is="su-datepicker"] .dp-navigation .ui.button.year,su-datepicker .dp-navigation .ui.button.month,[is="su-datepicker"] .dp-navigation .ui.button.month{ width: 30%; }`,

  'exports': {
    state: {
      currentDate: null,
      defaultValue: null,
      value: null,
      weeks: [],
    },

    visibleFlg: false,
    itemActivated: false,
    lastValue: null,
    lastPropsValue: null,
    lastCurrentDate: null,
    lastPropsCurrentDate: null,
    yearRange: 20,
    onBeforeMount,
    onMounted,
    onBeforeUpdate,
    clickDay,
    clickMonth,
    clickYear,
    clickPrevious,
    clickNext,
    clickClear,
    clickToday,
    selectMonth,
    selectYear,
    toggle,
    onMouseDown,
    onMouseUp,
    onBlur,
    getCurrentYear,
    getCurrentMonthView,
    getCurrentMonth,
    isActive,
    isToday
  },

  'template': function(template, expressionTypes, bindingTypes, getComponent) {
    return template(
      '<div expr24="expr24"><div expr25="expr25"></div><div expr28="expr28"><div class="ui compact segments"><div class="ui center aligned secondary segment"><div class="ui buttons dp-navigation"><button expr29="expr29" type="button"><i class="chevron left icon"></i></button><button expr30="expr30" type="button"> </button><button expr31="expr31" type="button"> </button><button expr32="expr32" type="button"><i class="chevron right icon"></i></button></div><div class="dp-wrapper"><div expr33="expr33" class="dp-weekday"></div></div></div><div expr34="expr34" class="ui center aligned segment"></div><div expr38="expr38" class="ui center aligned segment"></div><div expr41="expr41" class="ui center aligned segment"></div><div expr45="expr45" class="ui center aligned segment"></div></div></div></div>',
      [{
        'expressions': [{
          'type': expressionTypes.ATTRIBUTE,
          'name': 'value',

          'evaluate': function(scope) {
            return scope.state.value;
          }
        }, {
          'type': expressionTypes.ATTRIBUTE,
          'name': 'formated-value',

          'evaluate': function(scope) {
            return scope.state.formatedValue;
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
        'redundantAttribute': 'expr24',
        'selector': '[expr24]',

        'expressions': [{
          'type': expressionTypes.ATTRIBUTE,
          'name': 'class',

          'evaluate': function(scope) {
            return [
              'ui ',
              scope.props.popup ? 'dropdown' : '',
              ' ',
              scope.upward ? 'upward' : ''
            ].join('');
          }
        }]
      }, {
        'type': bindingTypes.IF,

        'evaluate': function(scope) {
          return scope.props.popup;
        },

        'redundantAttribute': 'expr25',
        'selector': '[expr25]',

        'template': template(
          '<input expr26="expr26" type="text"/><button expr27="expr27" type="button"><i class="calendar icon"></i></button>',
          [{
            'expressions': [{
              'type': expressionTypes.ATTRIBUTE,
              'name': 'class',

              'evaluate': function(scope) {
                return ['ui action input ', scope.disabled].join('');
              }
            }]
          }, {
            'redundantAttribute': 'expr26',
            'selector': '[expr26]',

            'expressions': [{
              'type': expressionTypes.ATTRIBUTE,
              'name': 'placeholder',

              'evaluate': function(scope) {
                return scope.props.placeholder;
              }
            }, {
              'type': expressionTypes.ATTRIBUTE,
              'name': 'tabindex',

              'evaluate': function(scope) {
                return scope.tabIndex;
              }
            }, {
              'type': expressionTypes.ATTRIBUTE,
              'name': 'readonly',

              'evaluate': function(scope) {
                return scope.readOnly;
              }
            }]
          }, {
            'redundantAttribute': 'expr27',
            'selector': '[expr27]',

            'expressions': [{
              'type': expressionTypes.ATTRIBUTE,
              'name': 'class',

              'evaluate': function(scope) {
                return ['ui icon button ', scope.disabled].join('');
              }
            }, {
              'type': expressionTypes.EVENT,
              'name': 'onclick',

              'evaluate': function(scope) {
                return scope.toggle;
              }
            }, {
              'type': expressionTypes.EVENT,
              'name': 'onblur',

              'evaluate': function(scope) {
                return scope.onBlur;
              }
            }]
          }]
        )
      }, {
        'redundantAttribute': 'expr28',
        'selector': '[expr28]',

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
            return scope.onMouseDown;
          }
        }, {
          'type': expressionTypes.EVENT,
          'name': 'onmouseup',

          'evaluate': function(scope) {
            return scope.onMouseUp;
          }
        }, {
          'type': expressionTypes.EVENT,
          'name': 'onblur',

          'evaluate': function(scope) {
            return scope.onBlur;
          }
        }, {
          'type': expressionTypes.ATTRIBUTE,
          'name': 'tabindex',

          'evaluate': function(scope) {
            return scope.tabIndex;
          }
        }]
      }, {
        'redundantAttribute': 'expr29',
        'selector': '[expr29]',

        'expressions': [{
          'type': expressionTypes.ATTRIBUTE,
          'name': 'class',

          'evaluate': function(scope) {
            return ['icon tiny ui button ', scope.disabled, ' prev'].join('');
          }
        }, {
          'type': expressionTypes.EVENT,
          'name': 'onclick',

          'evaluate': function(scope) {
            return scope.clickPrevious;
          }
        }]
      }, {
        'redundantAttribute': 'expr30',
        'selector': '[expr30]',

        'expressions': [{
          'type': expressionTypes.TEXT,
          'childNodeIndex': 0,

          'evaluate': function(scope) {
            return scope.getCurrentMonthView();
          }
        }, {
          'type': expressionTypes.ATTRIBUTE,
          'name': 'class',

          'evaluate': function(scope) {
            return ['ui button ', scope.disabled, ' month'].join('');
          }
        }, {
          'type': expressionTypes.EVENT,
          'name': 'onclick',

          'evaluate': function(scope) {
            return scope.selectMonth;
          }
        }]
      }, {
        'redundantAttribute': 'expr31',
        'selector': '[expr31]',

        'expressions': [{
          'type': expressionTypes.TEXT,
          'childNodeIndex': 0,

          'evaluate': function(scope) {
            return scope.getCurrentYear();
          }
        }, {
          'type': expressionTypes.ATTRIBUTE,
          'name': 'class',

          'evaluate': function(scope) {
            return ['ui button ', scope.disabled, ' year'].join('');
          }
        }, {
          'type': expressionTypes.EVENT,
          'name': 'onclick',

          'evaluate': function(scope) {
            return scope.selectYear;
          }
        }]
      }, {
        'redundantAttribute': 'expr32',
        'selector': '[expr32]',

        'expressions': [{
          'type': expressionTypes.ATTRIBUTE,
          'name': 'class',

          'evaluate': function(scope) {
            return ['icon tiny ui button ', scope.disabled, ' next'].join('');
          }
        }, {
          'type': expressionTypes.EVENT,
          'name': 'onclick',

          'evaluate': function(scope) {
            return scope.clickNext;
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
              return scope.week;
            }
          }, {
            'type': expressionTypes.ATTRIBUTE,
            'name': 'class',

            'evaluate': function(scope) {
              return 'dp-weekday';
            }
          }]
        }]),

        'redundantAttribute': 'expr33',
        'selector': '[expr33]',
        'itemName': 'week',
        'indexName': null,

        'evaluate': function(scope) {
          return scope.weekNames;
        }
      }, {
        'type': bindingTypes.IF,

        'evaluate': function(scope) {
          return !scope.yearSelecting && !scope.monthSelecting;
        },

        'redundantAttribute': 'expr34',
        'selector': '[expr34]',

        'template': template('<div expr35="expr35" class="dp-wrapper"></div>', [{
          'expressions': [{
            'type': expressionTypes.ATTRIBUTE,
            'name': 'class',

            'evaluate': function(scope) {
              return 'ui center aligned segment';
            }
          }]
        }, {
          'type': bindingTypes.EACH,
          'getKey': null,
          'condition': null,

          'template': template('<div expr36="expr36" class="dp-day"></div>', [{
            'expressions': [{
              'type': expressionTypes.ATTRIBUTE,
              'name': 'class',

              'evaluate': function(scope) {
                return 'dp-wrapper';
              }
            }]
          }, {
            'type': bindingTypes.EACH,
            'getKey': null,
            'condition': null,

            'template': template('<button expr37="expr37" type="button"> </button>', [{
              'expressions': [{
                'type': expressionTypes.ATTRIBUTE,
                'name': 'class',

                'evaluate': function(scope) {
                  return 'dp-day';
                }
              }]
            }, {
              'redundantAttribute': 'expr37',
              'selector': '[expr37]',

              'expressions': [{
                'type': expressionTypes.TEXT,
                'childNodeIndex': 0,

                'evaluate': function(scope) {
                  return scope.day.getDate();
                }
              }, {
                'type': expressionTypes.ATTRIBUTE,
                'name': 'class',

                'evaluate': function(scope) {
                  return [
                    'ui button ',
                    scope.isToday(scope.day) ? 'today' : '',
                    ' ',
                    scope.isActive(scope.day) ? 'primary' : 'non-active',
                    ' ',
                    scope.day.getMonth() != scope.getCurrentMonth() || scope.disabled ? 'disabled' : ''
                  ].join('');
                }
              }, {
                'type': expressionTypes.EVENT,
                'name': 'onclick',

                'evaluate': function(scope) {
                  return () => scope.clickDay(scope.day);
                }
              }]
            }]),

            'redundantAttribute': 'expr36',
            'selector': '[expr36]',
            'itemName': 'day',
            'indexName': null,

            'evaluate': function(scope) {
              return scope.week.days;
            }
          }]),

          'redundantAttribute': 'expr35',
          'selector': '[expr35]',
          'itemName': 'week',
          'indexName': null,

          'evaluate': function(scope) {
            return scope.weeks;
          }
        }])
      }, {
        'type': bindingTypes.IF,

        'evaluate': function(scope) {
          return !scope.yearSelecting && !scope.monthSelecting;
        },

        'redundantAttribute': 'expr38',
        'selector': '[expr38]',

        'template': template(
          '<div class="ui two column grid"><div class="column dp-clear"><button expr39="expr39" type="button"><i class="times icon"></i></button></div><div class="column dp-today"><button expr40="expr40" type="button"><i class="calendar check icon"></i></button></div></div>',
          [{
            'expressions': [{
              'type': expressionTypes.ATTRIBUTE,
              'name': 'class',

              'evaluate': function(scope) {
                return 'ui center aligned segment';
              }
            }]
          }, {
            'redundantAttribute': 'expr39',
            'selector': '[expr39]',

            'expressions': [{
              'type': expressionTypes.ATTRIBUTE,
              'name': 'class',

              'evaluate': function(scope) {
                return ['ui icon fluid button ', scope.disabled].join('');
              }
            }, {
              'type': expressionTypes.EVENT,
              'name': 'onclick',

              'evaluate': function(scope) {
                return scope.clickClear;
              }
            }]
          }, {
            'redundantAttribute': 'expr40',
            'selector': '[expr40]',

            'expressions': [{
              'type': expressionTypes.ATTRIBUTE,
              'name': 'class',

              'evaluate': function(scope) {
                return ['ui icon fluid button ', scope.disabled].join('');
              }
            }, {
              'type': expressionTypes.EVENT,
              'name': 'onclick',

              'evaluate': function(scope) {
                return scope.clickToday;
              }
            }]
          }]
        )
      }, {
        'type': bindingTypes.IF,

        'evaluate': function(scope) {
          return scope.monthSelecting;
        },

        'redundantAttribute': 'expr41',
        'selector': '[expr41]',

        'template': template('<div expr42="expr42" class="dp-wrapper"></div>', [{
          'expressions': [{
            'type': expressionTypes.ATTRIBUTE,
            'name': 'class',

            'evaluate': function(scope) {
              return 'ui center aligned segment';
            }
          }]
        }, {
          'type': bindingTypes.EACH,
          'getKey': null,
          'condition': null,

          'template': template('<div expr43="expr43" class="dp-month"></div>', [{
            'expressions': [{
              'type': expressionTypes.ATTRIBUTE,
              'name': 'class',

              'evaluate': function(scope) {
                return 'dp-wrapper';
              }
            }]
          }, {
            'type': bindingTypes.EACH,
            'getKey': null,
            'condition': null,

            'template': template('<button expr44="expr44" type="button"> </button>', [{
              'expressions': [{
                'type': expressionTypes.ATTRIBUTE,
                'name': 'class',

                'evaluate': function(scope) {
                  return 'dp-month';
                }
              }]
            }, {
              'redundantAttribute': 'expr44',
              'selector': '[expr44]',

              'expressions': [{
                'type': expressionTypes.TEXT,
                'childNodeIndex': 0,

                'evaluate': function(scope) {
                  return scope.month.label;
                }
              }, {
                'type': expressionTypes.ATTRIBUTE,
                'name': 'class',

                'evaluate': function(scope) {
                  return ['ui button ', scope.disabled].join('');
                }
              }, {
                'type': expressionTypes.EVENT,
                'name': 'onclick',

                'evaluate': function(scope) {
                  return () => scope.clickMonth(scope.month);
                }
              }]
            }]),

            'redundantAttribute': 'expr43',
            'selector': '[expr43]',
            'itemName': 'month',
            'indexName': null,

            'evaluate': function(scope) {
              return scope.element;
            }
          }]),

          'redundantAttribute': 'expr42',
          'selector': '[expr42]',
          'itemName': 'element',
          'indexName': null,

          'evaluate': function(scope) {
            return scope.state.months;
          }
        }])
      }, {
        'type': bindingTypes.IF,

        'evaluate': function(scope) {
          return scope.yearSelecting;
        },

        'redundantAttribute': 'expr45',
        'selector': '[expr45]',

        'template': template('<div expr46="expr46" class="dp-wrapper"></div>', [{
          'expressions': [{
            'type': expressionTypes.ATTRIBUTE,
            'name': 'class',

            'evaluate': function(scope) {
              return 'ui center aligned segment';
            }
          }]
        }, {
          'type': bindingTypes.EACH,
          'getKey': null,
          'condition': null,

          'template': template('<div expr47="expr47" class="dp-month"></div>', [{
            'expressions': [{
              'type': expressionTypes.ATTRIBUTE,
              'name': 'class',

              'evaluate': function(scope) {
                return 'dp-wrapper';
              }
            }]
          }, {
            'type': bindingTypes.EACH,
            'getKey': null,
            'condition': null,

            'template': template('<button expr48="expr48" type="button"> </button>', [{
              'expressions': [{
                'type': expressionTypes.ATTRIBUTE,
                'name': 'class',

                'evaluate': function(scope) {
                  return 'dp-month';
                }
              }]
            }, {
              'redundantAttribute': 'expr48',
              'selector': '[expr48]',

              'expressions': [{
                'type': expressionTypes.TEXT,
                'childNodeIndex': 0,

                'evaluate': function(scope) {
                  return scope.year;
                }
              }, {
                'type': expressionTypes.ATTRIBUTE,
                'name': 'class',

                'evaluate': function(scope) {
                  return ['ui button ', scope.disabled].join('');
                }
              }, {
                'type': expressionTypes.EVENT,
                'name': 'onclick',

                'evaluate': function(scope) {
                  return () =>scope.clickYear(scope.year);
                }
              }]
            }]),

            'redundantAttribute': 'expr47',
            'selector': '[expr47]',
            'itemName': 'year',
            'indexName': null,

            'evaluate': function(scope) {
              return scope.element;
            }
          }]),

          'redundantAttribute': 'expr46',
          'selector': '[expr46]',
          'itemName': 'element',
          'indexName': null,

          'evaluate': function(scope) {
            return scope.state.years;
          }
        }])
      }]
    );
  },

  'name': 'su-datepicker'
};

export default suDatepicker;
