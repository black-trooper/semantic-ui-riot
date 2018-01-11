<su-datepicker>
  <table class="ui celled center aligned unstackable table seven column day">
    <thead>
      <tr>
        <th colspan="7">
          <span class="link">January 2018</span>
          <span class="prev link"><i class="chevron left icon"></i></span>
          <span class="next link"><i class="chevron right icon"></i></span>
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
        <td each="{day in week.days}" class="link {disabled : day.getMonth() != month}">{day.getDate()}</td>
      </tr>
      <!-- <td class="link today focus">10</td>
        <td class="link adjacent disabled">1</td> -->
    </tbody>
  </table>

  <script>
    this.weeks = []
    this.year = 2018
    this.month = 0

    this.on('mount', () => {
      generate(this.year, this.month)
      this.update()
    })

    const generate = (year, month) => {
      const firstMonthDay = new Date(this.year, this.month, 1).getDay()
      let i = 1 - firstMonthDay
      for (let r = 0; r < 6; r++) {
        const days = []
        for (let c = 0; c < 7; c++) {
          days.push(new Date(this.year, this.month, i++))
        }
        if (days[0].getMonth() > this.month && days[6].getMonth() > this.month) {
          break
        }
        this.weeks.push({ days })
      }
    }

  </script>
</su-datepicker>