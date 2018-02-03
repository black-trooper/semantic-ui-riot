<su-datepicker>
  <div class="ui { dropdown:opts.popup }">
    <div class="ui action input" if="{ opts.popup }">
      <input type="text" placeholder="{ opts.placeholder }" ref="input" tabindex="{ getTabindex() }" />
      <button class="ui icon button" click="{ toggle }" onblur="{ blur }">
        <i class="calendar icon"></i>
      </button>
    </div>
    <div class="menu transition { transitionStatus }" onmousedown="{ mousedown }" onmouseup="{ mouseup }" onblur="{ blur }" tabindex="{ getTabindex() }">
      <div class="ui compact segments">
        <div class="ui center aligned secondary segment">
          <div class="ui buttons dp-navigation">
            <button class="icon tiny ui button prev" click="{ clickPrevious }">
                <i class="chevron left icon"></i>
              </button>
            <button class="ui button month" click="{ selectMonth }">{ getCurrentMonthView() }</button>
            <button class="ui button year" click="{ selectYear }">{ getCurrentYear() }</button>
            <button class="icon tiny ui button next" click="{ clickNext }">
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
              <button class="ui button { today: isToday(day) } { primary: isActive(day) } { non-active: !isActive(day) } { disabled: day.getMonth() != getCurrentMonth() }"
                click="{ clickDay }">{day.getDate()}</button>
            </div>
          </div>
        </div>
        <div class="ui center aligned segment" if="{ !yearSelecting && !monthSelecting }">
          <div class="ui two column grid">
            <div class="column">
              <button type="button" class="ui button" click="{ clear }">Clear</button></div>
            <div class="column">
              <button type="button" class="ui button" click="{ today }">Today</button></div>
          </div>
        </div>
        <div class="ui center aligned segment" if="{ monthSelecting }">
          <div each="{ element in months }" class="dp-wrapper">
            <div each="{ month in element}" class="dp-month"><button class="ui button" click="{ clickMonth }">{month.label}</button></div>
          </div>
        </div>
        <div class="ui center aligned segment" if="{ yearSelecting }">
          <div each="{ element in years }" class="dp-wrapper">
            <div each="{ year in element}" class="dp-month"><button class="ui button" click="{ clickYear }">{year}</button></div>
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

    .dp-navigation .ui.button,
    .dp-month .ui.button,
    .dp-day .ui.button.non-active {
      background-color: transparent;
    }

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
    this.transitionStatus = opts.popup ? 'hidden' : 'visible'
    let monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    let weekNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    let visibleFlg = false
    let itemActivated = false
    let lastValue = null
    let lastOptsValue = null
    let lastOptsCurrentDate = null
    const yearRange = 20

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
    })

    this.on('update', () => {
      let changed = false
      if (!dateEqual(lastValue, this.value)) {
        lastValue = copyDate(this.value)
        changed = true
      } else if (!dateEqual(lastOptsValue, opts.riotValue)) {
        this.value = copyDate(opts.riotValue)
        lastOptsValue = copyDate(opts.riotValue)
        lastValue = copyDate(opts.riotValue)
        changed = true
      }

      if (changed && this.value) {
        opts.currentDate = copyDate(this.value)
      }
      if (!dateEqual(lastOptsCurrentDate, opts.currentDate)) {
        lastOptsCurrentDate = copyDate(opts.currentDate)
        generate()
      }
    })

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
      this.value = event.item.day
      if (this.refs.input) {
        this.refs.input.value = format(this.value, opts.pattern)
        close()
      }
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
        addMonth(opts.currentDate, -1)
      }
    }

    this.clickNext = () => {
      if (this.yearSelecting) {
        addYear(yearRange)
      } else {
        this.monthSelecting = false
        addMonth(opts.currentDate, 1)
      }
    }

    this.toggle = () => {
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
      const year = opts.currentDate.getFullYear()
      const month = opts.currentDate.getMonth()
      const firstMonthDay = new Date(year, month, 1).getDay()
      let i = 1 - firstMonthDay

      this.weeks = []
      for (let r = 0; r < 6; r++) {
        const days = []
        for (let c = 0; c < 7; c++) {
          days.push(new Date(year, month, i++))
        }
        // if (days[0].getMonth() > month && days[6].getMonth() > month) {
        //   break
        // }
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

    const addMonth = (date, month) => {
      date.setMonth(date.getMonth() + month)
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

    const format = (date, pattern) => {
      if (!pattern) {
        pattern = 'yyyy-MM-dd'
      }
      pattern = pattern.replace(/yyyy/g, date.getFullYear().toString())
      pattern = pattern.replace(/yy/g, date.getFullYear().toString().slice(-2))
      pattern = pattern.replace(/MM/g, pad(date.getMonth() + 1, 2))
      pattern = pattern.replace(/M/g, (date.getMonth() + 1).toString())
      pattern = pattern.replace(/dd/g, pad(date.getDate(), 2))
      pattern = pattern.replace(/d/g, date.getDate().toString())
      return pattern
    }

    const pad = (n, digit) => {
      const str = n.toString()
      if (str.length >= digit) {
        return str
      }
      return new Array(digit - str.length + 1).join('0') + str
    }

    const dateEqual = (d1, d2) => {
      if (d1 == d2) {
        return true
      }
      if (typeof d1 === 'undefined' || typeof d2 === 'undefined' || d1 === null || d2 === null) {
        return false
      }
      return d1.getTime() == d2.getTime()
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
        return `${monthNames[opts.currentDate.getMonth()]}`
      }
    }

    this.getCurrentMonth = () => {
      return opts.currentDate.getMonth()
    }

    this.getWeekNames = () => {
      return weekNames
    }

    this.isActive = date => {
      return dateEqual(this.value, date)
    }

    this.isToday = date => {
      const today = new Date()
      return dateEqual(date, new Date(today.getFullYear(), today.getMonth(), today.getDate()))
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
  </script>
</su-datepicker>