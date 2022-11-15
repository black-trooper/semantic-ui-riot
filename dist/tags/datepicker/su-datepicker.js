import {
      addDays,
      addMilliseconds,
      addMinutes,
      addMonths,
      differenceInMilliseconds,
      format,
      isSameDay,
      isSameHour,
      isSameMinute,
      isToday,
      parse,
      startOfDay,
      startOfMonth,
    } from 'date-fns'
riot.tag2('su-datepicker', '<div class="ui {dropdown:opts.dataPopup} {upward: upward}"> <div class="ui action input {disabled: isDisabled()}" if="{opts.dataPopup}"> <input type="text" placeholder="{opts.placeholder}" ref="input" onchange="{changeInput}" tabindex="{getTabindex()}" readonly="{isReadOnly()}"> <button class="ui icon button {disabled: isDisabled()}" onclick="{toggle}" onblur="{blur}" type="button"> <i class="calendar icon"></i> </button> </div> <div class="menu transition {transitionStatus}" onmousedown="{mousedown}" onmouseup="{mouseup}" onblur="{blur}" tabindex="{getTabindex()}"> <div class="ui center aligned segment date-picker {datetime-picker : opts.datetime}"> <div class="ui buttons dp-navigation"> <button class="icon tiny ui button {disabled: isDisabled()} prev" onclick="{clickPrevious}" type="button"> <i class="chevron left icon"></i> </button> <button class="ui button {disabled: isDisabled()} month" onclick="{selectMonth}" type="button"> {getCurrentMonthView()} </button> <button class="ui button {disabled: isDisabled()} year" onclick="{selectYear}" type="button"> {getCurrentYear()} </button> <button class="icon tiny ui button {disabled: isDisabled()} next" onclick="{clickNext}" type="button"> <i class="chevron right icon"></i> </button> </div> <div if="{!yearSelecting && !monthSelecting}"> <div class="ui grid"> <div class="{opts.datetime ? \'ten\' : \'sixteen\'} wide column"> <div class="ui seven column padded grid dp-weekday"> <div each="{week in getWeekNames()}" class="column">{week}</div> </div> <div class="ui divider"></div> <div class="ui seven column padded grid dp-day"> <div each="{day in days}" class="column"> <button class="fluid ui button {today: isToday(day) && ! isActive(day)} {primary: isActive(day)} {non-active: !isActive(day)} {disabled: day.getMonth() != getCurrentMonth() || isDisabled()}" onclick="{clickDay}" type="button"> {day.getDate()} </button> </div> </div> <div class="ui divider"></div> <div class="ui two column grid"> <div class="column dp-clear"> <button class="ui icon fluid button {disabled : isDisabled()}" onclick="{clickClear}" type="button"> <i class="times icon"></i> </button> </div> <div class="column dp-today"> <button class="ui icon fluid button {disabled : isDisabled()}" onclick="{clickToday}" type="button"> <i class="calendar check icon"></i> </button> </div> </div> </div> <div class="six wide column" if="{opts.datetime}"> <div class="ui two column padded grid dp-time"> <div class="column" each="{hour, index in hours}"> <button class="fluid ui button {nearly-time: isNearlyTime(index) && ! isActiveTime(index)} {primary: isActiveTime(index)} {disabled: isDisabled()}" onclick="{clickHour}" type="button"> {hour} </button> </div> </div> </div> </div> </div> <div if="{monthSelecting}"> <div class="ui divider"></div> <div class="ui four column padded grid dp-month"> <div each="{month in months}" class="column"> <button class="fluid ui button {disabled : isDisabled()}" onclick="{clickMonth}" type="button"> {month.label} </button> </div> </div> </div> <div if="{yearSelecting}"> <div class="ui divider"></div> <div class="ui four column padded grid dp-month"> <div each="{year in years}" class="column"> <button class="fluid ui button {disabled : isDisabled()}" onclick="{clickYear}" type="button"> {year} </button> </div> </div> </div> </div> </div> </div>', 'su-datepicker .ui.segment,[data-is="su-datepicker"] .ui.segment{ padding-top: 0.5rem; padding-bottom: 0.5rem; } su-datepicker .ui.dropdown .menu,[data-is="su-datepicker"] .ui.dropdown .menu{ display: block; } su-datepicker .ui.dropdown,[data-is="su-datepicker"] .ui.dropdown{ display: block; } su-datepicker .ui.padded.grid>.column:not(.row),[data-is="su-datepicker"] .ui.padded.grid>.column:not(.row){ padding: 0; } su-datepicker .date-picker,[data-is="su-datepicker"] .date-picker{ width: 20rem; } su-datepicker .datetime-picker,[data-is="su-datepicker"] .datetime-picker{ width: 28rem; } su-datepicker .dp-weekday,[data-is="su-datepicker"] .dp-weekday{ color: rgba(0, 0, 0, 0.6); } su-datepicker .dp-time,[data-is="su-datepicker"] .dp-time{ height: 25rem; overflow-y: auto; padding-right: 0.2rem; } su-datepicker .dp-time .ui.button,[data-is="su-datepicker"] .dp-time .ui.button{ padding: 0; height: 2rem; font-weight: normal; } su-datepicker .dp-day .ui.button,[data-is="su-datepicker"] .dp-day .ui.button,su-datepicker .dp-month .ui.button,[data-is="su-datepicker"] .dp-month .ui.button{ padding: 0; height: 2.5rem; font-weight: normal; } su-datepicker .ui.button.nearly-time,[data-is="su-datepicker"] .ui.button.nearly-time,su-datepicker .dp-day .ui.button.today,[data-is="su-datepicker"] .dp-day .ui.button.today{ background: transparent none; color: rgba(0, 0, 0, 0.6); font-weight: 400; border-radius: 0.28571429rem; text-transform: none; text-shadow: none !important; -webkit-box-shadow: 0 0 0 1px rgba(34, 36, 38, 0.15) inset; box-shadow: 0 0 0 1px rgba(34, 36, 38, 0.15) inset; } su-datepicker .date-picker .ui.button:not(.primary),[data-is="su-datepicker"] .date-picker .ui.button:not(.primary){ background-color: transparent; } su-datepicker .date-picker .ui.button:not(.primary):hover,[data-is="su-datepicker"] .date-picker .ui.button:not(.primary):hover{ background-color: #e0e1e2; } su-datepicker .dp-day .ui.button.disabled,[data-is="su-datepicker"] .dp-day .ui.button.disabled,su-datepicker .dp-time .ui.button.disabled,[data-is="su-datepicker"] .dp-time .ui.button.disabled{ pointer-events: all !important; } su-datepicker .dp-navigation,[data-is="su-datepicker"] .dp-navigation{ width: 100%; margin-bottom: 0.4rem !important; } su-datepicker .dp-navigation .ui.button,[data-is="su-datepicker"] .dp-navigation .ui.button{ width: 20%; } su-datepicker .dp-navigation .ui.button.year,[data-is="su-datepicker"] .dp-navigation .ui.button.year,su-datepicker .dp-navigation .ui.button.month,[data-is="su-datepicker"] .dp-navigation .ui.button.month{ width: 30%; }', '', function(opts) {

    const tag = this

    tag.currentDate = null
    tag.defaultValue = null
    tag.transitionStatus = opts.dataPopup ? 'hidden' : 'visible'
    tag.value = null
    tag.valueAsDate = null
    tag.milliseconds = null
    tag.days = []
    tag.hours = range(48).map(index => format(addMinutes(new Date(2020, 3, 22), index * 30), 'HH:mm'))

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
    tag.clickHour = clickHour
    tag.toggle = toggle
    tag.mousedown = mousedown
    tag.mouseup = mouseup
    tag.blur = blur
    tag.changeInput = changeInput
    tag.getCurrentYear = getCurrentYear
    tag.getCurrentMonthView = getCurrentMonthView
    tag.getCurrentMonth = getCurrentMonth
    tag.getWeekNames = getWeekNames
    tag.isActive = isActive
    tag.isActiveTime = isActiveTime
    tag.isToday = isToday
    tag.isNearlyTime = isNearlyTime
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
      supportTraditionalOptions()
      tag.update()
      if (typeof opts.riotValue === 'undefined' && typeof opts.value !== 'undefined') {
        opts.riotValue = opts.value
      }
      if (!tag.valueAsDate) {
        tag.valueAsDate = copyDate(tag.value || opts.riotValue)
      }
      setValueFromValueAsDate()
      if (tag.refs.input) {
        tag.refs.input.value = tag.value
      }
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
      if (!isEqualDatetime(lastValue, tag.value)) {
        tag.valueAsDate = copyDate(tag.value)
        lastValue = copyDate(tag.value)
        changed = true
      } else if (!isEqualDatetime(lastValue, tag.valueAsDate)) {
        lastValue = copyDate(tag.valueAsDate)
        changed = true
      } else if (!isEqualDatetime(lastOptsValue, opts.riotValue)) {
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
      if (!isEqualDatetime(lastOptsCurrentDate, opts.currentDate)) {
        tag.currentDate = copyDate(opts.currentDate)
        lastOptsCurrentDate = copyDate(opts.currentDate)
      }
      if (!isEqualDatetime(lastCurrentDate, tag.currentDate)) {
        lastCurrentDate = copyDate(tag.currentDate)
        generate()
      }
    }

    function reset() {
      tag.valueAsDate = tag.defaultValue
      setValueFromValueAsDate()
    }

    function changed() {
      return !isEqualDatetime(tag.valueAsDate, tag.defaultValue)
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

      let date = event.item.day
      if (tag.milliseconds) {
        date = addMilliseconds(startOfDay(date), tag.milliseconds)
      }
      setDate(date)
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
      tag.milliseconds = undefined
      setDate(null)
      tag.trigger('clear', tag.valueAsDate)
    }

    function clickToday() {
      const today = new Date()
      tag.milliseconds = differenceInMilliseconds(today, startOfDay(today))
      setDate(today)
      tag.trigger('today', tag.valueAsDate)
    }

    function clickHour(event) {
      if (tag.isReadOnly() || tag.isDisabled()) {
        return
      }

      tag.milliseconds = getMilliseconds(event.item.index)
      if (tag.valueAsDate) {
        const date = addMilliseconds(startOfDay(tag.valueAsDate), tag.milliseconds)
        setDate(date)
      }
      tag.trigger('click', tag.valueAsDate)
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
      if (opts.dataPopup && !itemActivated) {
        close()
      }
    }

    function changeInput() {
      const value = tag.refs.input.value ? parse(tag.refs.input.value.replace(/\//g, '-')) : ''
      if (value != 'Invalid Date') {
        setDate(value)
      } else {
        tag.refs.input.value = tag.value
        tag.update()
      }
    }

    function generate() {
      const startDate = startOfMonth(tag.currentDate)
      const baseDate = addDays(startDate, -startDate.getDay())
      tag.days = range(42).map((index) => addDays(baseDate, index))
    }

    function addYear(year) {
      tag.years = tag.years.map((value) => {
        return value + parseInt(year)
      })
    }

    function getYears() {
      const startAt = tag.currentDate.getFullYear() - ((yearRange - (yearRange % 2)) / 2 - 1)
      return range(parseInt(yearRange), startAt)
    }

    function getMonthes() {
      return range(12).map((month) => {
        return {
          label: format(new Date(2018, month, 1), 'MMM', {
            locale: getLocale(),
          }),
          value: month,
        }
      })
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
      if (tag.refs.input && !opts.datetime) {
        tag.refs.input.value = tag.value
        close()
      }
      tag.trigger('change', tag.valueAsDate)
    }

    function setValueFromValueAsDate() {
      if (tag.valueAsDate) {
        tag.value = format(tag.valueAsDate, getPattern(), { locale: getLocale() })
        tag.milliseconds = differenceInMilliseconds(tag.valueAsDate, startOfDay(tag.valueAsDate))
      } else {
        tag.value = null
        tag.milliseconds = null
      }
    }

    function isEqualDatetime(d1, d2) {
      return isEqualDay(d1, d2) && isEqualTime(d1, d2)
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

    function isEqualTime(d1, d2) {
      if (d1 == d2) {
        return true
      }
      if (typeof d1 === 'undefined' || typeof d2 === 'undefined' || d1 === null || d2 === null) {
        return false
      }
      return isSameHour(d1, d2) && isSameMinute(d1, d2)
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
      return range(7, 1).map((day) => format(new Date(2018, 6, day), 'dd', { locale: getLocale() }))
    }

    function isActive(date) {
      return isEqualDay(tag.valueAsDate, date)
    }

    function isActiveTime(index) {
      return isEqualTime(tag.milliseconds, getMilliseconds(index))
    }

    function isNearlyTime(index) {
      const target = getMilliseconds(index)
      if (typeof tag.milliseconds === 'undefined' || tag.milliseconds > target) {
        return false
      }
      return target - tag.milliseconds < 30 * 60 * 1000
    }

    function getMilliseconds(index) {
      return index * 30 * 60 * 1000
    }

    function getTabindex() {
      if (!opts.dataPopup) {
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
      return opts.datetime ? 'YYYY-MM-DD HH:mm:ss' : 'YYYY-MM-DD'
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
      return Array.from(Array(size).keys()).map((i) => i + startAt)
    }

    function supportTraditionalOptions() {
      if (typeof opts.popup !== 'undefined') {
        console.warn('\'popup\' attribute is deprecated. Please use \'data-popup\'.')
        opts.dataPopup = opts.popup
        opts.popup = undefined
        tag.transitionStatus = opts.dataPopup ? 'hidden' : 'visible'
      }
    }
});