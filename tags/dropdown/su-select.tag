<su-select class="ui selection dropdown">
  <select onchange="{ changed }" class="{ default: default } text">
    <option each="{ item in opts.items }" value="{ item.value }" if="{ !item.items }">
      { item.label }
    </option>
    <optgroup label="{ item.label }" each="{ item in opts.items }" if="{ item.items }">
      <option each="{ child in item.items }" value="{ child.value }">
        { child.label }
      </option>
    </optgroup>
  </select>
  <i class="dropdown icon"></i>

  <style>
    :scope.ui.selection.dropdown {
      padding: 0;
    }

    :scope.ui.selection.dropdown>select:focus {
      outline: 0;
      border-color: #96c8da;
    }

    :scope.ui.selection.dropdown>select {
      display: block !important;
      padding: .78571429em 2.1em .78571429em 1em;
      background: 0 0 !important;
      position: relative;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      -webkit-appearance: none;
      -moz-appearance: none;
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
      border: none;
      width: 100%;
      z-index: 2;
      font-family: Lato, 'Helvetica Neue', Arial, Helvetica, sans-serif;
    }

    :scope.ui.selection.dropdown>.dropdown.icon {
      z-index: 1;
    }
  </style>

  <script>
    this.value = ''
    this.label = ''

    if (opts.items && opts.items.length > 0) {
      this.label = opts.items[0].label
      this.value = opts.items[0].value
      this.default = opts.items[0].default
    }

    this.changed = target => {
      this.value = target.target.value
      if (opts.items.some(item => item.value == this.value || item.label == this.value)) {
        const item = opts.items.filter(item => item.value == this.value || item.label == this.value)[0]
        this.label = item.label
        this.default = item.default
        return
      }

      const childItems = flatMap(opts.items.filter(item => item.items), item => item.items)
      if (childItems.some(item => item.value == this.value || item.label == this.value)) {
        const item = childItems.filter(item => item.value == this.value || item.label == this.value)[0]
        this.label = item.label
        this.default = item.default
      }
    }

    const flatMap = (xs, f) => {
      return xs.reduce(function (ys, x) {
        return ys.concat(f(x))
      }, [])
    }
  </script>
</su-select>