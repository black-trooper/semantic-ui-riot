<su-datepicker>
  <div class="ui compact segments">
    <div class="ui center aligned secondary segment">
      <div class="dp-navigation ui four column grid">
        <div class="column link" click="{ previousMonth }">
          <i class="chevron left icon"></i>
        </div>
        <div class="column">{ getCurrentMonthView() }</div>
        <div class="column">{ opts.currentDate.getFullYear() }</div>
        <div class="column link" click="{ nextMonth }">
          <i class="chevron right icon"></i>
        </div>
      </div>
      <div class="dp-week">
        <div each="{week in getWeekNames()}" class="dp-weekday">{ week }</div>
      </div>
    </div>
    <div class="dp-month ui center aligned segment">
      <div each="{week in weeks}" class="dp-week">
        <div each="{day in week.days}" class="dp-day">
          <button class="ui button { today: isToday(day) } { primary: isActive(day) } { non-active: !isActive(day) } { disabled: day.getMonth() != getCurrentMonth() }"
            click="{ clickDay }">{day.getDate()}</button>
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

    .dp-day {
      cursor: pointer;
    }

    .dp-week {
      border-radius: 0.25rem;
      display: flex;
    }

    .dp-day,
    .dp-weekday {
      width: 2.5rem;
    }

    .dp-day .ui.button {
      padding: 0;
      width: 2.5rem;
      height: 2.5rem;
      font-weight: normal
    }

    .dp-day .ui.button.today {
      font-weight: 700;
    }

    .dp-day .ui.button.non-active {
      background-color: transparent;
    }

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

    this.on('mount', () => {
      if (!opts.currentDate) {
        opts.currentDate = new Date()
      }
      generate(opts.currentDate)
      this.update()
    })

    // ===================================================================================
    //                                                                               Event
    //                                                                               =====
    this.clickDay = event => {
      this.date = event.item.day
      this.trigger('click', this.date)
    }

    this.previousMonth = () => {
      addMonth(opts.currentDate, -1)
      generate(opts.currentDate)
    }

    this.nextMonth = () => {
      addMonth(opts.currentDate, 1)
      generate(opts.currentDate)
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

    const addMonth = (date, month) => {
      date.setMonth(date.getMonth() + month)
    }

    // ===================================================================================
    //                                                                              Helper
    //                                                                              ======
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
      return this.date == date
    }

    this.isToday = date => {
      const today = new Date()
      return date.getTime() == new Date(today.getFullYear(), today.getMonth(), today.getDate()).getTime()
    }
  </script>
</su-datepicker>