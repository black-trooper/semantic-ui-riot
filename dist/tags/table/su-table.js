riot.tag2('su-table', '', '', '', function(opts) {
    const tag = this
    let lastData
    let lastCondition = {}
    let headers
    const suTableIndex = 'su-table-index'

    tag.on('mount', () => {
      headers = tag.tags['su-th']
      if (!Array.isArray(headers)) {
        headers = headers ? [headers] : []
      }

      headers.forEach(th => {
        th.on('click', field => {
          sort(field)

          headers.forEach(th => {
            th.sorted = th.opts.field == lastCondition.field
            th.reverse = lastCondition.reverse
          })
          tag.update()
        })
      })
      tag.update()
    })

    tag.on('update', () => {
      if (JSON.stringify(lastData) != JSON.stringify(opts.data)) {
        lastData = opts.data
        lastCondition = {
          field: suTableIndex,
          reverse: false,
        }

        if (opts.defaultSortField) {
          if (opts.defaultSortReverse) {
            lastCondition.field = opts.defaultSortField
            lastCondition.reverse = false
          }
          sort(opts.defaultSortField)

          headers.forEach(th => {
            th.sorted = th.opts.field == lastCondition.field
            th.reverse = lastCondition.reverse
          })
          tag.update()
        }
      }
    })

    const sort = field => {
      addIndexField(opts.data)
      const condition = generateCondition(field, lastCondition)
      opts.data.sort(sortBy(condition))
      lastCondition = condition
    }

    const generateCondition = (field, condition) => {
      if (condition.field === field) {
        if (!condition.reverse) {
          condition.reverse = true
        } else {
          condition.reverse = false
          condition.field = suTableIndex
        }
      } else {
        condition.reverse = false
        condition.field = field
      }

      return condition
    }

    const sortBy = condition => {
      const field = condition.field
      const reverse = condition.reverse ? -1 : 1
      const nullsFirst = opts.nullsFirst ? -1 : 1
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

        return ason[suTableIndex] - bson[suTableIndex]
      }
    }

    const addIndexField = json => {
      json.forEach((data, index) => {
        if (data[suTableIndex] === undefined) {
          data[suTableIndex] = index
        }
      })
    }
});