<su-datepicker>
  <div class="ui { dropdown:opts.popup } { upward: upward }">
    <div class="ui action input { disabled: isDisabled() }" if="{ opts.popup }">
      <input type="text" placeholder="{ opts.placeholder }" ref="input" tabindex="{ getTabindex() }" readonly="{ isReadOnly() }" />
      <button class="ui icon button { disabled: isDisabled() }" onclick="{ toggle }" onblur="{ blur }" type="button">
        <i class="calendar icon"></i>
      </button>
    </div>
    <div class="menu transition { transitionStatus }" onmousedown="{ mousedown }" onmouseup="{ mouseup }"
      onblur="{ blur }" tabindex="{ getTabindex() }">
      <div class="ui center aligned segment date-picker">
        <!-- header -->
        <div class="ui buttons dp-navigation">
          <button class="icon tiny ui button { disabled: isDisabled() } prev" onclick="{ clickPrevious }" type="button">
            <i class="chevron left icon"></i>
          </button>
          <button class="ui button { disabled: isDisabled() } month" onclick="{ selectMonth }" type="button">
            { getCurrentMonthView() }
          </button>
          <button class="ui button { disabled: isDisabled() } year" onclick="{ selectYear }" type="button">
            { getCurrentYear() }
          </button>
          <button class="icon tiny ui button { disabled: isDisabled() } next" onclick="{ clickNext }" type="button">
            <i class="chevron right icon"></i>
          </button>
        </div>
        <!-- date -->
        <div if="{ !yearSelecting && !monthSelecting }">
          <!-- week -->
          <div class="ui seven column padded grid dp-weekday">
            <div each="{week in getWeekNames()}" class="column">{ week }</div>
          </div>
          <div class="ui divider"></div>
          <!-- day -->
          <div class="ui seven column padded grid dp-day">
            <div each="{ day in days}" class="column">
              <button
                class="fluid ui button { today: isToday(day) && ! isActive(day) } { primary: isActive(day) } { non-active: !isActive(day) } { disabled: day.getMonth() != getCurrentMonth() || isDisabled() }"
                onclick="{ clickDay }"
                type="button"
              >
                {day.getDate()}
              </button>
            </div>
          </div>
          <!-- footer -->
          <div class="ui divider"></div>
          <div class="ui two column grid">
            <div class="column dp-clear">
              <button class="ui icon fluid button {disabled : isDisabled()}" onclick="{ clickClear }" type="button">
                <i class="times icon"></i>
              </button>
            </div>
            <div class="column dp-today">
              <button class="ui icon fluid button {disabled : isDisabled()}" onclick="{ clickToday }" type="button">
                <i class="calendar check icon"></i>
              </button>
            </div>
          </div>
        </div>
        <!-- month -->
        <div if="{ monthSelecting }">
          <div class="ui divider"></div>
          <div class="ui four column padded grid dp-month">
            <div each="{ month in months}" class="column">
              <button class="fluid ui button {disabled : isDisabled()}" onclick="{ clickMonth }" type="button">
                {month.label}
              </button>
            </div>
          </div>
        </div>
        <!-- year -->
        <div if="{ yearSelecting }">
          <div class="ui divider"></div>
          <div class="ui four column padded grid dp-month">
            <div each="{ year in years}" class="column">
              <button class="fluid ui button {disabled : isDisabled()}" onclick="{ clickYear }" type="button">
                {year}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <style>
    .ui.segment {
      padding-top: 0.5rem;
      padding-bottom: 0.5rem;
    }

    .ui.dropdown .menu {
      display: block;
    }

    .ui.dropdown {
      display: block;
    }

    .ui.padded.grid>.column:not(.row) {
      padding: 0;
    }

    /* datepicker */
    .date-picker {
      width: 20rem;
    }

    .dp-weekday {
      color: rgba(0, 0, 0, 0.6);
    }

    .dp-day .ui.button,
    .dp-month .ui.button {
      padding: 0;
      height: 2.5rem;
      font-weight: normal;
    }

    .dp-day .ui.button.today {
      background: transparent none;
      color: rgba(0, 0, 0, 0.6);
      font-weight: 400;
      border-radius: 0.28571429rem;
      text-transform: none;
      text-shadow: none !important;
      -webkit-box-shadow: 0 0 0 1px rgba(34, 36, 38, 0.15) inset;
      box-shadow: 0 0 0 1px rgba(34, 36, 38, 0.15) inset;
    }

    .dp-today .ui.button,
    .dp-clear .ui.button,
    .dp-navigation .ui.button,
    .dp-month .ui.button,
    .dp-day .ui.button.non-active {
      background-color: transparent;
    }

    .dp-today .ui.button:hover,
    .dp-clear .ui.button:hover,
    .dp-navigation .ui.button:hover,
    .dp-month .ui.button:hover,
    .dp-day .ui.button.non-active:hover {
      background-color: #e0e1e2;
    }

    .dp-day .ui.button.disabled {
      pointer-events: all !important;
    }

    .dp-navigation {
      width: 100%;
      margin-bottom: 0.4rem !important;
    }

    .dp-navigation .ui.button {
      width: 20%;
    }

    .dp-navigation .ui.button.year,
    .dp-navigation .ui.button.month {
      width: 30%;
    }
  </style>

  <script>
    import addDays from 'date-fns/add_days'
    import addMonths from 'date-fns/add_months'
    import format from 'date-fns/format'
    import isSameDay from 'date-fns/is_same_day'
    import isToday from 'date-fns/is_today'
    import parse from 'date-fns/parse'
    import startOfMonth from 'date-fns/start_of_month'

    const tag = this
    // ===================================================================================
    //                                                                      Tag Properties
    //                                                                      ==============
    tag.currentDate = null
    tag.defaultValue = null
    tag.transitionStatus = opts.popup ? 'hidden' : 'visible'
    tag.value = null
    tag.valueAsDate = null
    tag.days = []

    // ===================================================================================
    //                                                                         Tag Methods
    //                                                                         ===========
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

    // ===================================================================================
    //                                                                          Properties
    //                                                                          ==========
    let visibleFlg = false
    let itemActivated = false
    let lastValue = null
    let lastOptsValue = null
    let lastCurrentDate = null
    let lastOptsCurrentDate = null
    let yearRange = 20

    // ===================================================================================
    //                                                                             Methods
    //                                                                             =======
    function onMount() {
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

    // -----------------------------------------------------
    //                                          popup option
    //                                          ------------
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
      return range(7, 1).map((day) => format(new Date(2018, 6, day), 'dd', { locale: getLocale() }))
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
      return Array.from(Array(size).keys()).map((i) => i + startAt)
    }
  </script>
</su-datepicker>