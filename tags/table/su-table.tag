<su-table>
  <script>
    let lastCondition
    let headers

    this.on('mount', () => {
      headers = this.tags['su-th']

      headers.forEach(th => {
        th.on('click', fieldName => {
          this.sort(fieldName)

          headers.forEach(th => {
            th.sorted = th.opts.field == lastCondition.field
            th.reverse = lastCondition.reverse
          })
          this.update()
        })
      })
      this.update()
    })

    this.sort = (field, option) => {
      if (!option) {
        option = {
          defaultSortField: 'index',
          nullsFirst: false,
        }
      }
      if (!option.defaultSortField) {
        option.defaultSortField = 'index'
        addIndexField(opts.data)
      }
      if (!lastCondition) {
        lastCondition = {
          field: option.defaultSortField,
          reverse: false,
        }
      }
      const condition = generateCondition(field, lastCondition, option)
      opts.data.sort(sortBy(condition, option))
      lastCondition = condition
    }

    const generateCondition = (field, condition, option) => {
      if (condition.field === field) {
        if (!condition.reverse) {
          condition.reverse = true
        } else {
          condition.reverse = false
          condition.field = option.defaultSortField
        }
      } else {
        condition.reverse = false
        condition.field = field
      }
      condition.nullsFirst = option.nullsFirst

      return condition
    }

    const sortBy = (condition, option) => {
      const field = condition.field
      const reverse = condition.reverse ? -1 : 1
      const nullsFirst = condition.nullsFirst ? -1 : 1
      return (ason, bson) => {
        const a = ason[field]
        const b = bson[field]

        if (a == null) {
          return reverse * nullsFirst
        }
        if (b == null) {
          return reverse * nullsFirst * -1
        }
        if (a < b) {
          return reverse * -1
        }
        if (a > b) {
          return reverse
        }

        return ason[option.defaultSortField] - bson[option.defaultSortField]
      }
    }

    const addIndexField = (json) => {
      json.forEach((data, index) => {
        if (data.index === undefined) {
          data.index = index
        }
      })
    }
  </script>
</su-table>