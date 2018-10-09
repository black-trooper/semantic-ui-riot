<su-datepicker>
  <div class="ui { dropdown:opts.popup }">
    <div class="ui action input { disabled: isDisabled() }" if="{ opts.popup }">
      <input type="text" placeholder="{ opts.placeholder }" ref="input" tabindex="{ getTabindex() }" readonly="{ isReadOnly() }"
      />
      <button class="ui icon button { disabled: isDisabled() }" onclick="{ toggle }" onblur="{ blur }">
        <i class="calendar icon"></i>
      </button>
    </div>
    <div class="menu transition { transitionStatus }" onmousedown="{ mousedown }" onmouseup="{ mouseup }" onblur="{ blur }"
      tabindex="{ getTabindex() }">
      <div class="ui compact segments">
        <div class="ui center aligned secondary segment">
          <div class="ui buttons dp-navigation">
            <button class="icon tiny ui button { disabled: isDisabled() } prev" onclick="{ clickPrevious }">
                <i class="chevron left icon"></i>
              </button>
            <button class="ui button { disabled: isDisabled() } month" onclick="{ selectMonth }">{ getCurrentMonthView() }</button>
            <button class="ui button { disabled: isDisabled() } year" onclick="{ selectYear }">{ getCurrentYear() }</button>
            <button class="icon tiny ui button { disabled: isDisabled() } next" onclick="{ clickNext }">
                  <i class="chevron right icon"></i>
                </button>
          </div>
          <div class="dp-wrapper">
            <div each="{week in getWeekNames()}" class="dp-weekday">{ week }</div>
          </div>
        </div>
        <div class="ui center aligned segment" if="{ !yearSelecting && !monthSelecting }">
          <div each="{week in weeks}" class="dp-wrapper">
            <div each="{day in week.days}" class="dp-day">
              <button class="ui button { today: isToday(day) } { primary: isActive(day) } { non-active: !isActive(day) } { disabled: day.getMonth() != getCurrentMonth() || isDisabled() }"
                onclick="{ clickDay }">{day.getDate()}</button>
            </div>
          </div>
        </div>
        <div class="ui center aligned segment" if="{ !yearSelecting && !monthSelecting }">
          <div class="ui two column grid">
            <div class="column dp-clear">
              <button type="button" class="ui icon fluid button {disabled : isDisabled()}" onclick="{ clickClear }"><i class="times icon"></i></button></div>
            <div class="column dp-today">
              <button type="button" class="ui icon fluid button {disabled : isDisabled()}" onclick="{ clickToday }"><i class="calendar check icon"></i></button></div>
          </div>
        </div>
        <div class="ui center aligned segment" if="{ monthSelecting }">
          <div each="{ element in months }" class="dp-wrapper">
            <div each="{ month in element}" class="dp-month"><button class="ui button {disabled : isDisabled()}" onclick="{ clickMonth }">{month.label}</button></div>
          </div>
        </div>
        <div class="ui center aligned segment" if="{ yearSelecting }">
          <div each="{ element in years }" class="dp-wrapper">
            <div each="{ year in element}" class="dp-month"><button class="ui button {disabled : isDisabled()}" onclick="{ clickYear }">{year}</button></div>
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

    .ui.buttons.dp-navigation {
      margin-bottom: 0.4rem;
    }

    .ui.dropdown {
      display: block;
    }

    .dp-wrapper {
      display: flex;
    }

    .dp-day,
    .dp-month {
      cursor: pointer;
    }

    .dp-weekday,
    .dp-day,
    .dp-day .ui.button {
      width: 2.5rem;
    }

    .dp-month,
    .dp-month .ui.button {
      width: 4.375rem;
    }

    .dp-day .ui.button,
    .dp-month .ui.button {
      padding: 0;
      height: 2.5rem;
      font-weight: normal
    }

    .dp-day .ui.button.today {
      font-weight: 700;
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

    this.weeks = []
    this.value = null
    this.valueAsDate = null
    this.defaultValue = null
    this.transitionStatus = opts.popup ? 'hidden' : 'visible'
    let visibleFlg = false
    let itemActivated = false
    let lastValue = null
    let lastOptsValue = null
    let lastOptsCurrentDate = null
    let yearRange = 20

    this.mixin('semantic-ui')

    this.on('mount', () => {
      if (typeof opts.riotValue === 'undefined' && typeof opts.value !== 'undefined') {
        opts.riotValue = opts.value
      }
      if (!this.valueAsDate) {
        this.valueAsDate = copyDate(this.value || opts.riotValue)
      }
      setValueFromValueAsDate()
      lastValue = copyDate(this.valueAsDate)
      lastOptsValue = copyDate(opts.riotValue)

      if (this.valueAsDate) {
        opts.currentDate = copyDate(this.valueAsDate)
      }
      if (!opts.currentDate) {
        opts.currentDate = new Date()
      }
      this.months = getMonthes()
      if (opts.yearRange && !isNaN(opts.yearRange) && opts.yearRange > 20) {
        yearRange = opts.yearRange
      }
      if (opts.startMode === 'year') {
        this.selectYear()
      }
      this.update()
      this.defaultValue = this.valueAsDate
    })

    this.on('update', () => {
      let changed = false
      if (!isEqualDay(lastValue, this.value)) {
        this.valueAsDate = copyDate(this.value)
        lastValue = copyDate(this.value)
        changed = true
      } else if (!isEqualDay(lastValue, this.valueAsDate)) {
        lastValue = copyDate(this.valueAsDate)
        changed = true
      } else if (!isEqualDay(lastOptsValue, opts.riotValue)) {
        this.valueAsDate = copyDate(opts.riotValue)
        lastOptsValue = copyDate(opts.riotValue)
        lastValue = copyDate(opts.riotValue)
        changed = true
      }
      setValueFromValueAsDate()

      if (changed && this.valueAsDate) {
        opts.currentDate = copyDate(this.valueAsDate)
      }
      if (!isEqualDay(lastOptsCurrentDate, opts.currentDate)) {
        lastOptsCurrentDate = copyDate(opts.currentDate)
        generate()
      }
    })

    // ===================================================================================
    //                                                                               State
    //                                                                               =====
    this.reset = () => {
      this.valueAsDate = this.defaultValue
      setValueFromValueAsDate()
    }

    this.changed = () => {
      return !isEqualDay(this.valueAsDate, this.defaultValue)
    }

    // ===================================================================================
    //                                                                               Event
    //                                                                               =====
    this.selectMonth = () => {
      this.yearSelecting = false
      this.monthSelecting = !this.monthSelecting
    }

    this.selectYear = () => {
      this.years = getYears()
      this.monthSelecting = false
      this.yearSelecting = !this.yearSelecting
    }

    this.clickDay = event => {
      if (this.isReadOnly() || this.isDisabled()) {
        return
      }
      setDate(event.item.day)
      this.trigger('click', this.valueAsDate)
    }

    this.clickMonth = event => {
      opts.currentDate.setMonth(event.item.month.value)
      this.monthSelecting = false
    }

    this.clickYear = event => {
      opts.currentDate.setYear(event.item.year)
      this.selectMonth()
    }

    this.clickPrevious = () => {
      if (this.yearSelecting) {
        addYear(-yearRange)
      } else {
        this.monthSelecting = false
        opts.currentDate = addMonths(opts.currentDate, -1)
      }
    }

    this.clickNext = () => {
      if (this.yearSelecting) {
        addYear(yearRange)
      } else {
        this.monthSelecting = false
        opts.currentDate = addMonths(opts.currentDate, 1)
      }
    }

    this.clickClear = () => {
      setDate(null)
      this.trigger('clear', this.valueAsDate)
    }

    this.clickToday = () => {
      setDate(new Date())
      this.trigger('today', this.valueAsDate)
    }

    // -----------------------------------------------------
    //                                          popup option
    //                                          ------------
    this.toggle = () => {
      if (this.isReadOnly() || this.isDisabled()) {
        return
      }
      if (!visibleFlg) {
        open()
      } else {
        close()
      }
    }

    this.mousedown = () => {
      itemActivated = true
    }

    this.mouseup = () => {
      itemActivated = false
    }

    this.blur = () => {
      if (opts.popup && !itemActivated) {
        close()
      }
    }

    // ===================================================================================
    //                                                                               Logic
    //                                                                               =====
    const generate = () => {
      const startDate = startOfMonth(opts.currentDate)
      const baseDate = addDays(startDate, - startDate.getDay())
      let i = 0
      this.weeks = []

      for (let r = 0; r < 6; r++) {
        const days = []
        for (let c = 0; c < 7; c++) {
          days.push(addDays(baseDate, i++))
        }
        this.weeks.push({ days })
      }
    }

    const addYear = year => {
      this.years = this.years.map(values => {
        values = values.map(value => {
          return value + parseInt(year)
        })
        return values
      })
    }

    const getYears = () => {
      const rowSize = ((yearRange - yearRange % 4) / 4) + ((yearRange % 4 != 0) ? 1 : 0)
      const years = new Array()
      for (let index = 0; index < rowSize; index++) {
        years.push([])
      }
      for (let index = 0; index < yearRange; index++) {
        years[(index - index % 4) / 4][index % 4] = opts.currentDate.getFullYear() + index - ((yearRange - yearRange % 2) / 2 - 1)
      }
      return years
    }

    const getMonthes = () => {
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

    const open = () => {
      this.transitionStatus = 'visible'
      visibleFlg = true
      if (this.valueAsDate) {
        opts.currentDate = copyDate(this.valueAsDate)
      }
      if (!opts.currentDate) {
        opts.currentDate = new Date()
      }
      this.trigger('open', this.valueAsDate)
    }

    const close = () => {
      this.transitionStatus = 'hidden'
      visibleFlg = false
      this.trigger('close', this.valueAsDate)
    }

    const setDate = date => {
      this.valueAsDate = date
      setValueFromValueAsDate()
      if (this.refs.input) {
        this.refs.input.value = this.value
        close()
      }
      this.trigger('change', this.valueAsDate)
    }

    const setValueFromValueAsDate = () => {
      this.value = this.valueAsDate ? format(this.valueAsDate, getPattern(), { locale: getLocale() }) : null
    }

    const isEqualDay = (d1, d2) => {
      if (d1 == d2) {
        return true
      }
      if (typeof d1 === 'undefined' || typeof d2 === 'undefined' || d1 === null || d2 === null) {
        return false
      }
      return isSameDay(d1, d2)
    }

    const copyDate = date => {
      if (!date) {
        return date
      }
      return parse(date)
      // return new Date(date.getTime())
    }

    // ===================================================================================
    //                                                                              Helper
    //                                                                              ======
    this.getCurrentYear = () => {
      if (opts.currentDate) {
        return opts.currentDate.getFullYear()
      }
    }

    this.getCurrentMonthView = () => {
      if (opts.currentDate) {
        return format(opts.currentDate, 'MMM', { locale: getLocale() })
      }
    }

    this.getCurrentMonth = () => {
      return opts.currentDate.getMonth()
    }

    this.getWeekNames = () => {
      return range(7, 1).map(day => format(new Date(2018, 6, day), 'dd', { locale: getLocale() }))
    }

    this.isActive = date => {
      return isEqualDay(this.valueAsDate, date)
    }

    this.isToday = date => {
      return isToday(date)
    }

    this.getTabindex = () => {
      if (!opts.popup) {
        return false
      }
      if (opts.tabindex) {
        return opts.tabindex
      }
      return 0
    }

    this.isReadOnly = () => {
      return this.root.classList.contains('read-only')
    }
    this.isDisabled = () => {
      return this.root.classList.contains('disabled')
    }

    const getPattern = () => {
      if (opts.pattern) {
        return opts.pattern
      }
      if (this.defaultOptions && this.defaultOptions.pattern) {
        return this.defaultOptions.pattern
      }
      return 'YYYY-MM-DD'
    }

    const getLocale = () => {
      if (opts.locale) {
        return opts.locale
      }
      if (this.defaultOptions && this.defaultOptions.locale) {
        return this.defaultOptions.locale
      }
    }

    const range = (size, startAt = 0) => {
      return Array.from(Array(size).keys()).map(i => i + startAt)
    }
  </script>
</su-datepicker>