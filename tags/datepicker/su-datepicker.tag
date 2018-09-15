<su-datepicker>
  <div class="ui { dropdown:opts.popup }">
    <div class="ui action input { disabled: isDisabled() }" if="{ opts.popup }">
      <input type="text" placeholder="{ opts.placeholder }" ref="input" tabindex="{ getTabindex() }" readonly="{ isReadOnly() }"
      />
      <button class="ui icon button { disabled: isDisabled() }" onclick="{ toggle }" onblur="{ blur }">
        <i class="calendar icon"></i>
      </button>
    </div>
    <div class="menu transition { transitionStatus }" onmousedown="{ mousedown }" onmouseup="{ mouseup }" onblur="{ blur }" tabindex="{ getTabindex() }">
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
    this.weeks = []
    this.value = null
    this.defaultValue = null
    this.transitionStatus = opts.popup ? 'hidden' : 'visible'
    let visibleFlg = false
    let itemActivated = false
    let lastValue = null
    let lastOptsValue = null
    let lastOptsCurrentDate = null
    const yearRange = 20

    this.mixin('semantic-ui')

    this.on('mount', () => {
      if (typeof opts.riotValue === 'undefined' && typeof opts.value !== 'undefined') {
        opts.riotValue = opts.value
      }
      if (!this.value) {
        this.value = copyDate(opts.riotValue)
      }
      lastValue = copyDate(this.value)
      lastOptsValue = copyDate(opts.riotValue)

      if (this.value) {
        opts.currentDate = copyDate(this.value)
      }
      if (!opts.currentDate) {
        opts.currentDate = new Date()
      }
      this.months = getMonthes()
      this.update()
      this.defaultValue = this.value
    })

    this.on('update', () => {
      let changed = false
      if (!isSameDay(lastValue, this.value)) {
        lastValue = copyDate(this.value)
        changed = true
      } else if (!isSameDay(lastOptsValue, opts.riotValue)) {
        this.value = copyDate(opts.riotValue)
        lastOptsValue = copyDate(opts.riotValue)
        lastValue = copyDate(opts.riotValue)
        changed = true
      }

      if (changed && this.value) {
        opts.currentDate = copyDate(this.value)
      }
      if (!isSameDay(lastOptsCurrentDate, opts.currentDate)) {
        lastOptsCurrentDate = copyDate(opts.currentDate)
        generate()
      }
    })

    // ===================================================================================
    //                                                                               State
    //                                                                               =====
    this.reset = () => {
      this.value = this.defaultValue
    }

    this.changed = () => {
      return !isSameDay(this.value, this.defaultValue)
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
      this.trigger('click', this.value)
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
        opts.currentDate = dateFns.addMonths(opts.currentDate, -1)
      }
    }

    this.clickNext = () => {
      if (this.yearSelecting) {
        addYear(yearRange)
      } else {
        this.monthSelecting = false
        opts.currentDate = dateFns.addMonths(opts.currentDate, 1)
      }
    }

    this.clickClear = () => {
      setDate(null)
      this.trigger('clear', this.value)
    }

    this.clickToday = () => {
      setDate(new Date())
      this.trigger('today', this.value)
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
      const startOfMonth = dateFns.startOfMonth(opts.currentDate)
      const baseDate = dateFns.addDays(startOfMonth, - startOfMonth.getDay())
      let i = 0
      this.weeks = []

      for (let r = 0; r < 6; r++) {
        const days = []
        for (let c = 0; c < 7; c++) {
          days.push(dateFns.addDays(baseDate, i++))
        }
        this.weeks.push({ days })
      }
    }

    const addYear = year => {
      this.years = this.years.map(values => {
        values = values.map(value => {
          return value + year
        })
        return values
      })
    }

    const getYears = () => {
      const years = [[], [], [], [], []]
      for (let index = 0; index < yearRange; index++) {
        years[(index - index % 4) / 4][index % 4] = opts.currentDate.getFullYear() + index - 9
      }
      return years
    }

    const getMonthes = () => {
      const months = [[], [], []]
      const monthNames = range(12).map(month => dateFns.format(new Date(2018, month, 1), 'MMM', { locale: getLocale() }))
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
      if (this.value) {
        opts.currentDate = copyDate(this.value)
      }
      if (!opts.currentDate) {
        opts.currentDate = new Date()
      }
      this.trigger('open', this.value)
    }

    const close = () => {
      this.transitionStatus = 'hidden'
      visibleFlg = false
      this.trigger('close', this.value)
    }

    const setDate = date => {
      this.value = date
      if (this.refs.input) {
        this.refs.input.value = this.value ? dateFns.format(this.value, getPattern(), { locale: getLocale() }) : null
        close()
      }
      this.trigger('change', this.value)
    }

    const isSameDay = (d1, d2) => {
      if (d1 == d2) {
        return true
      }
      if (typeof d1 === 'undefined' || typeof d2 === 'undefined' || d1 === null || d2 === null) {
        return false
      }
      return dateFns.isSameDay(d1, d2)
    }

    const copyDate = date => {
      if (!date) {
        return date
      }
      return new Date(date.getTime())
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
        return dateFns.format(opts.currentDate, 'MMM', { locale: getLocale() })
      }
    }

    this.getCurrentMonth = () => {
      return opts.currentDate.getMonth()
    }

    this.getWeekNames = () => {
      return range(7, 1).map(day => dateFns.format(new Date(2018, 6, day), 'dd', { locale: getLocale() }))
    }

    this.isActive = date => {
      return isSameDay(this.value, date)
    }

    this.isToday = date => {
      return dateFns.isToday(date)
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