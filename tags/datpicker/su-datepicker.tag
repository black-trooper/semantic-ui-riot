<su-datepicker>
  <table class="ui celled center aligned unstackable table seven column day">
    <thead>
      <tr>
        <th colspan="7">
          <span class="link">{ getCurrentYearMonthView() }</span>
          <span class="prev link" click="{ previousMonth }"><i class="chevron left icon"></i></span>
          <span class="next link" click="{ nextMonth }"><i class="chevron right icon"></i></span>
        </th>
      </tr>
      <tr>
        <th>S</th>
        <th>M</th>
        <th>T</th>
        <th>W</th>
        <th>T</th>
        <th>F</th>
        <th>S</th>
      </tr>
    </thead>
    <tbody>
      <tr each="{week in weeks}">
        <td each="{day in week.days}" class="link { active: isToday(day) } { disabled: day.getMonth() != getCurrentMonth() }" click="{ clickDay }">{day.getDate()}</td>
      </tr>
      <!-- <td class="link today focus">10</td>
        <td class="link adjacent disabled">1</td> -->
    </tbody>
  </table>

  <script>
    this.weeks = []
    this.date = null
    let monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

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
    this.getCurrentYearMonthView = () => {
      if (opts.currentDate) {
        return `${monthNames[opts.currentDate.getMonth()]} ${opts.currentDate.getFullYear()}`
      }
    }

    this.getCurrentMonth = () => {
      return opts.currentDate.getMonth()
    }

    this.isToday = date => {
      return date.getTime() == new Date(2018, 0, 12).getTime()
    }
  </script>
</su-datepicker>