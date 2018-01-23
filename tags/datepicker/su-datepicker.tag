<su-datepicker>
  <div class="ui { dropdown:opts.popup }">
    <div class="ui action input" if="{ opts.popup }">
      <input type="text" placeholder="{ opts.placeholder }" ref="input" />
      <button class="ui icon button" click="{ toggle }" onblur="{ blur }">
        <i class="calendar icon"></i>
      </button>
    </div>
    <div class="menu transition { transitionStatus }" onmousedown="{ mousedown }" onmouseup="{ mouseup }" onblur="{ blur }" tabindex="{ getTabindex() }">
      <div class="ui compact segments">
        <div class="ui center aligned secondary segment">
          <div class="dp-navigation ui four column grid">
            <div class="column link" click="{ clickPrevious }">
              <i class="chevron left icon"></i>
            </div>
            <div class="column link" click="{ selectMonth }">{ getCurrentMonthView() }</div>
            <div class="column link" click="{ selectYear }">{ getCurrentYear() }</div>
            <div class="column link" click="{ clickNext }">
              <i class="chevron right icon"></i>
            </div>
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
    .link {
      cursor: pointer;
    }

    .ui.segment {
      padding-top: 0.5rem;
      padding-bottom: 0.5rem;
    }

    .ui.grid.dp-navigation {
      margin-top: -0.5rem;
      margin-bottom: 0;
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

    .dp-month .ui.button,
    .dp-day .ui.button.non-active {
      background-color: transparent;
    }

    .dp-month .ui.button:hover,
    .dp-day .ui.button.non-active:hover {
      background-color: #e0e1e2;
    }

    .dp-day .ui.button.disabled {
      pointer-events: all !important;
    }
  </style>

  <script>
    this.weeks = []
    this.date = null
    let monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    let weekNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    let visibleFlg = false
    let itemActivated = false
    const yearRange = 20

    this.on('mount', () => {
      opts.currentDate = this.date
      if (!opts.currentDate) {
        opts.currentDate = new Date()
      }
      this.months = getMonthes()
      generate(opts.currentDate)
      this.update()
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
      this.date = event.item.day
      if (this.refs.input) {
        this.refs.input.value = format(this.date)
        close()
      }
      this.trigger('click', this.date)
    }

    this.clickMonth = event => {
      opts.currentDate.setMonth(event.item.month.value)
      generate(opts.currentDate)
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
        generate(opts.currentDate)
      }
    }

    this.clickNext = () => {
      if (this.yearSelecting) {
        addYear(yearRange)
      } else {
        this.monthSelecting = false
        addMonth(opts.currentDate, 1)
        generate(opts.currentDate)
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
    const generate = date => {
      const year = date.getFullYear()
      const month = date.getMonth()
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
      opts.currentDate = this.date
      if (!opts.currentDate) {
        opts.currentDate = new Date()
      }
      generate(opts.currentDate)
    }

    const close = () => {
      this.transitionStatus = 'hidden'
      visibleFlg = false
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
      return this.date && this.date.getTime() == date.getTime()
    }

    this.isToday = date => {
      const today = new Date()
      return date.getTime() == new Date(today.getFullYear(), today.getMonth(), today.getDate()).getTime()
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