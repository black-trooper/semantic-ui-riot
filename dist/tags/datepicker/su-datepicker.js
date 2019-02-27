import addDays from 'date-fns/add_days'
import addMonths from 'date-fns/add_months'
import format from 'date-fns/format'
import isSameDay from 'date-fns/is_same_day'
import isToday from 'date-fns/is_today'
import parse from 'date-fns/parse'
import startOfMonth from 'date-fns/start_of_month'
riot.tag2('su-datepicker', '<div class="ui {dropdown:opts.popup} {upward: upward}"> <div class="ui action input {disabled: isDisabled()}" if="{opts.popup}"> <input type="text" placeholder="{opts.placeholder}" ref="input" tabindex="{getTabindex()}" readonly="{isReadOnly()}"> <button class="ui icon button {disabled: isDisabled()}" onclick="{toggle}" onblur="{blur}" type="button"> <i class="calendar icon"></i> </button> </div> <div class="menu transition {transitionStatus}" onmousedown="{mousedown}" onmouseup="{mouseup}" onblur="{blur}" tabindex="{getTabindex()}"> <div class="ui compact segments"> <div class="ui center aligned secondary segment"> <div class="ui buttons dp-navigation"> <button class="icon tiny ui button {disabled: isDisabled()} prev" onclick="{clickPrevious}" type="button"> <i class="chevron left icon"></i> </button> <button class="ui button {disabled: isDisabled()} month" onclick="{selectMonth}" type="button">{getCurrentMonthView()}</button> <button class="ui button {disabled: isDisabled()} year" onclick="{selectYear}" type="button">{getCurrentYear()}</button> <button class="icon tiny ui button {disabled: isDisabled()} next" onclick="{clickNext}" type="button"> <i class="chevron right icon"></i> </button> </div> <div class="dp-wrapper"> <div each="{week in getWeekNames()}" class="dp-weekday">{week}</div> </div> </div> <div class="ui center aligned segment" if="{!yearSelecting && !monthSelecting}"> <div each="{week in weeks}" class="dp-wrapper"> <div each="{day in week.days}" class="dp-day"> <button class="ui button {today: isToday(day)} {primary: isActive(day)} {non-active: !isActive(day)} {disabled: day.getMonth() != getCurrentMonth() || isDisabled()}" onclick="{clickDay}" type="button">{day.getDate()}</button> </div> </div> </div> <div class="ui center aligned segment" if="{!yearSelecting && !monthSelecting}"> <div class="ui two column grid"> <div class="column dp-clear"> <button class="ui icon fluid button {disabled : isDisabled()}" onclick="{clickClear}" type="button"><i class="times icon"></i></button> </div> <div class="column dp-today"> <button class="ui icon fluid button {disabled : isDisabled()}" onclick="{clickToday}" type="button"><i class="calendar check icon"></i></button> </div> </div> </div> <div class="ui center aligned segment" if="{monthSelecting}"> <div each="{element in months}" class="dp-wrapper"> <div each="{month in element}" class="dp-month"> <button class="ui button {disabled : isDisabled()}" onclick="{clickMonth}" type="button">{month.label}</button> </div> </div> </div> <div class="ui center aligned segment" if="{yearSelecting}"> <div each="{element in years}" class="dp-wrapper"> <div each="{year in element}" class="dp-month"> <button class="ui button {disabled : isDisabled()}" onclick="{clickYear}" type="button">{year}</button> </div> </div> </div> </div> </div> </div>', 'su-datepicker .ui.segment,[data-is="su-datepicker"] .ui.segment{ padding-top: 0.5rem; padding-bottom: 0.5rem; } su-datepicker .ui.dropdown .menu,[data-is="su-datepicker"] .ui.dropdown .menu{ display: block; } su-datepicker .ui.buttons.dp-navigation,[data-is="su-datepicker"] .ui.buttons.dp-navigation{ margin-bottom: 0.4rem; } su-datepicker .ui.dropdown,[data-is="su-datepicker"] .ui.dropdown{ display: block; } su-datepicker .dp-wrapper,[data-is="su-datepicker"] .dp-wrapper{ display: flex; } su-datepicker .dp-day,[data-is="su-datepicker"] .dp-day,su-datepicker .dp-month,[data-is="su-datepicker"] .dp-month{ cursor: pointer; } su-datepicker .dp-weekday,[data-is="su-datepicker"] .dp-weekday,su-datepicker .dp-day,[data-is="su-datepicker"] .dp-day,su-datepicker .dp-day .ui.button,[data-is="su-datepicker"] .dp-day .ui.button{ width: 2.5rem; } su-datepicker .dp-month,[data-is="su-datepicker"] .dp-month,su-datepicker .dp-month .ui.button,[data-is="su-datepicker"] .dp-month .ui.button{ width: 4.375rem; } su-datepicker .dp-day .ui.button,[data-is="su-datepicker"] .dp-day .ui.button,su-datepicker .dp-month .ui.button,[data-is="su-datepicker"] .dp-month .ui.button{ padding: 0; height: 2.5rem; font-weight: normal } su-datepicker .dp-day .ui.button.today,[data-is="su-datepicker"] .dp-day .ui.button.today{ font-weight: 700; } su-datepicker .dp-today .ui.button,[data-is="su-datepicker"] .dp-today .ui.button,su-datepicker .dp-clear .ui.button,[data-is="su-datepicker"] .dp-clear .ui.button,su-datepicker .dp-navigation .ui.button,[data-is="su-datepicker"] .dp-navigation .ui.button,su-datepicker .dp-month .ui.button,[data-is="su-datepicker"] .dp-month .ui.button,su-datepicker .dp-day .ui.button.non-active,[data-is="su-datepicker"] .dp-day .ui.button.non-active{ background-color: transparent; } su-datepicker .dp-today .ui.button:hover,[data-is="su-datepicker"] .dp-today .ui.button:hover,su-datepicker .dp-clear .ui.button:hover,[data-is="su-datepicker"] .dp-clear .ui.button:hover,su-datepicker .dp-navigation .ui.button:hover,[data-is="su-datepicker"] .dp-navigation .ui.button:hover,su-datepicker .dp-month .ui.button:hover,[data-is="su-datepicker"] .dp-month .ui.button:hover,su-datepicker .dp-day .ui.button.non-active:hover,[data-is="su-datepicker"] .dp-day .ui.button.non-active:hover{ background-color: #e0e1e2; } su-datepicker .dp-day .ui.button.disabled,[data-is="su-datepicker"] .dp-day .ui.button.disabled{ pointer-events: all !important; } su-datepicker .dp-navigation,[data-is="su-datepicker"] .dp-navigation{ width: 100%; } su-datepicker .dp-navigation .ui.button,[data-is="su-datepicker"] .dp-navigation .ui.button{ width: 20%; } su-datepicker .dp-navigation .ui.button.year,[data-is="su-datepicker"] .dp-navigation .ui.button.year,su-datepicker .dp-navigation .ui.button.month,[data-is="su-datepicker"] .dp-navigation .ui.button.month{ width: 30%; }', '', function(opts) {

    const tag = this

    tag.currentDate = null
    tag.defaultValue = null
    tag.transitionStatus = opts.popup ? 'hidden' : 'visible'
    tag.value = null
    tag.valueAsDate = null
    tag.weeks = []

    tag.mixin('semantic-ui')
    tag.on('mount', onMount)
    tag.on('update', onUpdate)
    tag.reset = reset
    tag.changed = changed
    tag.selectMonth = selectMonth
    tag.selectYear = selectYear
    tag.clickDay = clickDay
    tag.clickMonth = clickMonth
    tag.clickYear = clickYear
    tag.clickPrevious = clickPrevious
    tag.clickNext = clickNext
    tag.clickClear = clickClear
    tag.clickToday = clickToday
    tag.toggle = toggle
    tag.mousedown = mousedown
    tag.mouseup = mouseup
    tag.blur = blur
    tag.getCurrentYear = getCurrentYear
    tag.getCurrentMonthView = getCurrentMonthView
    tag.getCurrentMonth = getCurrentMonth
    tag.getWeekNames = getWeekNames
    tag.isActive = isActive
    tag.isToday = isToday
    tag.getTabindex = getTabindex
    tag.isReadOnly = isReadOnly
    tag.isDisabled = isDisabled

    let visibleFlg = false
    let itemActivated = false
    let lastValue = null
    let lastOptsValue = null
    let lastCurrentDate = null
    let lastOptsCurrentDate = null
    let yearRange = 20

    function onMount() {
      if (typeof opts.riotValue === 'undefined' && typeof opts.value !== 'undefined') {
        opts.riotValue = opts.value
      }
      if (!tag.valueAsDate) {
        tag.valueAsDate = copyDate(tag.value || opts.riotValue)
      }
      setValueFromValueAsDate()
      lastValue = copyDate(tag.valueAsDate)
      lastOptsValue = copyDate(opts.riotValue)

      tag.currentDate = copyDate(opts.currentDate)
      if (tag.valueAsDate) {
        tag.currentDate = copyDate(tag.valueAsDate)
      }
      if (!tag.currentDate) {
        tag.currentDate = new Date()
      }
      tag.months = getMonthes()
      if (opts.yearRange && !isNaN(opts.yearRange) && opts.yearRange > 20) {
        yearRange = opts.yearRange
      }
      if (opts.startMode === 'year') {
        tag.selectYear()
      }
      tag.update()
      tag.defaultValue = tag.valueAsDate
    }

    function onUpdate() {
      let changed = false
      if (!isEqualDay(lastValue, tag.value)) {
        tag.valueAsDate = copyDate(tag.value)
        lastValue = copyDate(tag.value)
        changed = true
      } else if (!isEqualDay(lastValue, tag.valueAsDate)) {
        lastValue = copyDate(tag.valueAsDate)
        changed = true
      } else if (!isEqualDay(lastOptsValue, opts.riotValue)) {
        tag.valueAsDate = copyDate(opts.riotValue)
        lastOptsValue = copyDate(opts.riotValue)
        lastValue = copyDate(opts.riotValue)
        changed = true
      }
      setValueFromValueAsDate()
      if (changed && tag.refs.input) {
        tag.refs.input.value = tag.value
      }

      if (changed && tag.valueAsDate) {
        tag.currentDate = copyDate(tag.valueAsDate)
      }
      if (!isEqualDay(lastOptsCurrentDate, opts.currentDate)) {
        tag.currentDate = copyDate(opts.currentDate)
        lastOptsCurrentDate = copyDate(opts.currentDate)
      }
      if (!isEqualDay(lastCurrentDate, tag.currentDate)) {
        lastCurrentDate = copyDate(tag.currentDate)
        generate()
      }
    }

    function reset() {
      tag.valueAsDate = tag.defaultValue
      setValueFromValueAsDate()
    }

    function changed() {
      return !isEqualDay(tag.valueAsDate, tag.defaultValue)
    }

    function selectMonth() {
      tag.yearSelecting = false
      tag.monthSelecting = !tag.monthSelecting
    }

    function selectYear() {
      tag.years = getYears()
      tag.monthSelecting = false
      tag.yearSelecting = !tag.yearSelecting
    }

    function clickDay(event) {
      if (tag.isReadOnly() || tag.isDisabled()) {
        return
      }
      setDate(event.item.day)
      tag.trigger('click', tag.valueAsDate)
    }

    function clickMonth(event) {
      tag.currentDate.setMonth(event.item.month.value)
      tag.monthSelecting = false
    }

    function clickYear(event) {
      tag.currentDate.setYear(event.item.year)
      tag.selectMonth()
    }

    function clickPrevious() {
      if (tag.yearSelecting) {
        addYear(-yearRange)
      } else {
        tag.monthSelecting = false
        tag.currentDate = addMonths(tag.currentDate, -1)
      }
    }

    function clickNext() {
      if (tag.yearSelecting) {
        addYear(yearRange)
      } else {
        tag.monthSelecting = false
        tag.currentDate = addMonths(tag.currentDate, 1)
      }
    }

    function clickClear() {
      setDate(null)
      tag.trigger('clear', tag.valueAsDate)
    }

    function clickToday() {
      setDate(new Date())
      tag.trigger('today', tag.valueAsDate)
    }

    function toggle() {
      if (tag.isReadOnly() || tag.isDisabled()) {
        return
      }
      if (!visibleFlg) {
        if (opts.startMode === 'year') {
          tag.selectYear()
          tag.yearSelecting = true
        }
        open()
      } else {
        close()
      }
    }

    function mousedown() {
      itemActivated = true
    }

    function mouseup() {
      itemActivated = false
    }

    function blur() {
      if (opts.popup && !itemActivated) {
        close()
      }
    }

    function generate() {
      const startDate = startOfMonth(tag.currentDate)
      const baseDate = addDays(startDate, - startDate.getDay())
      let i = 0
      tag.weeks = []

      for (let r = 0; r < 6; r++) {
        const days = []
        for (let c = 0; c < 7; c++) {
          days.push(addDays(baseDate, i++))
        }
        tag.weeks.push({ days })
      }
    }

    function addYear(year) {
      tag.years = tag.years.map(values => {
        values = values.map(value => {
          return value + parseInt(year)
        })
        return values
      })
    }

    function getYears() {
      const rowSize = ((yearRange - yearRange % 4) / 4) + ((yearRange % 4 != 0) ? 1 : 0)
      const years = new Array()
      for (let index = 0; index < rowSize; index++) {
        years.push([])
      }
      for (let index = 0; index < yearRange; index++) {
        years[(index - index % 4) / 4][index % 4] = tag.currentDate.getFullYear() + index - ((yearRange - yearRange % 2) / 2 - 1)
      }
      return years
    }

    function getMonthes() {
      const months = [[], [], []]
      const monthNames = range(12).map(month => format(new Date(2018, month, 1), 'MMM', { locale: getLocale() }))
      monthNames.forEach((month, index) => {
        months[(index - index % 4) / 4][index % 4] = {
          label: month,
          value: index
        }
      })
      return months
    }

    function open() {
      tag.upward = isUpward()
      tag.transitionStatus = 'visible'
      visibleFlg = true
      tag.currentDate = copyDate(opts.currentDate)
      if (tag.valueAsDate) {
        tag.currentDate = copyDate(tag.valueAsDate)
      }
      if (!tag.currentDate) {
        tag.currentDate = new Date()
      }
      tag.trigger('open', tag.valueAsDate)
    }

    function close() {
      tag.transitionStatus = 'hidden'
      visibleFlg = false
      tag.trigger('close', tag.valueAsDate)
    }

    function setDate(date) {
      tag.valueAsDate = date
      setValueFromValueAsDate()
      if (tag.refs.input) {
        tag.refs.input.value = tag.value
        close()
      }
      tag.trigger('change', tag.valueAsDate)
    }

    function setValueFromValueAsDate() {
      tag.value = tag.valueAsDate ? format(tag.valueAsDate, getPattern(), { locale: getLocale() }) : null
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

    function isUpward() {
      if (opts.direction == 'upward') {
        return true
      }
      if (opts.direction == 'downward') {
        return false
      }
      const inputField = tag.root.getBoundingClientRect()
      const windowHeight = document.documentElement.offsetHeight || document.body.offsetHeight
      const menuHeight = tag.root.querySelector('.menu').getBoundingClientRect().height
      const above = menuHeight <= inputField.top
      const below = windowHeight >= inputField.top + inputField.height + menuHeight

      if (below) {
        return false
      }
      if (!below && !above) {
        return false
      }
      return true
    }

    function getCurrentYear() {
      if (tag.currentDate) {
        return tag.currentDate.getFullYear()
      }
    }

    function getCurrentMonthView() {
      if (tag.currentDate) {
        return format(tag.currentDate, 'MMM', { locale: getLocale() })
      }
    }

    function getCurrentMonth() {
      return tag.currentDate.getMonth()
    }

    function getWeekNames() {
      return range(7, 1).map(day => format(new Date(2018, 6, day), 'dd', { locale: getLocale() }))
    }

    function isActive(date) {
      return isEqualDay(tag.valueAsDate, date)
    }

    function getTabindex() {
      if (!opts.popup) {
        return false
      }
      if (opts.tabindex) {
        return opts.tabindex
      }
      return 0
    }

    function isReadOnly() {
      return tag.root.classList.contains('read-only')
    }
    function isDisabled() {
      return tag.root.classList.contains('disabled')
    }

    function getPattern() {
      if (opts.pattern) {
        return opts.pattern
      }
      if (tag.defaultOptions && tag.defaultOptions.pattern) {
        return tag.defaultOptions.pattern
      }
      return 'YYYY-MM-DD'
    }

    function getLocale() {
      if (opts.locale) {
        return opts.locale
      }
      if (tag.defaultOptions && tag.defaultOptions.locale) {
        return tag.defaultOptions.locale
      }
    }

    function range(size, startAt = 0) {
      return Array.from(Array(size).keys()).map(i => i + startAt)
    }
});