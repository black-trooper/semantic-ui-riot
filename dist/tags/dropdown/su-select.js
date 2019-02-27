riot.tag2('su-select', '<select onchange="{change}" onblur="{blur}" class="{default: default} text"> <option each="{item in opts.items}" riot-value="{item.value}" if="{!item.items}"> {item.label} </option> <optgroup label="{item.label}" each="{item in opts.items}" if="{item.items}"> <option each="{child in item.items}" riot-value="{child.value}"> {child.label} </option> </optgroup> </select> <i class="dropdown icon"></i>', 'su-select.ui.selection.dropdown,[data-is="su-select"].ui.selection.dropdown{ padding: 0; } su-select.ui.selection.dropdown>select:focus,[data-is="su-select"].ui.selection.dropdown>select:focus{ outline: 0; border-color: #96c8da; } su-select.ui.selection.dropdown>select,[data-is="su-select"].ui.selection.dropdown>select{ display: block !important; padding: .78571429em 2.1em .78571429em 1em; background: 0 0 !important; position: relative; overflow: hidden; white-space: nowrap; text-overflow: ellipsis; -webkit-appearance: none; -moz-appearance: none; -webkit-box-sizing: border-box; box-sizing: border-box; border: none; width: 100%; z-index: 2; font-family: Lato, \'Helvetica Neue\', Arial, Helvetica, sans-serif; } su-select.ui.selection.dropdown>.dropdown.icon,[data-is="su-select"].ui.selection.dropdown>.dropdown.icon{ z-index: 1; }', 'class="ui selection dropdown"', function(opts) {
    const tag = this

    tag.defaultValue = ''
    tag.value = ''
    tag.label = ''

    tag.blur = blur
    tag.change = change
    tag.changed = changed
    tag.changeValues = changeValues
    tag.reset = reset
    tag.on('before-mount', onBeforeMount)
    tag.on('mount', onMount)
    tag.on('update', onUpdate)

    function onBeforeMount() {
      if (opts.items && opts.items.length > 0) {
        tag.label = opts.items[0].label
        tag.value = opts.items[0].value
        tag.default = opts.items[0].default
      }
    }

    function onMount() {
      if (typeof opts.riotValue === 'undefined' && typeof opts.value !== 'undefined') {
        opts.riotValue = opts.value
      }
      if (typeof opts.riotValue !== 'undefined') {
        tag.value = opts.riotValue
        tag.defaultValue = tag.value
        tag.update()
      } else {
        tag.defaultValue = tag.value
      }
    }

    function onUpdate() {
      if (opts.items) {
        let selected = opts.items.filter(item => item.value === tag.value)
        if (!selected || selected.length == 0) {
          const childItems = flatMap(opts.items.filter(item => item.items), item => item.items)
          selected = childItems.filter(item => item.value == tag.value)
        }

        if (selected && selected.length > 0) {
          const target = selected[0]
          if (tag.label !== target.label) {
            tag.changeValues(tag.value, true)
          }
        } else if (opts.items && opts.items.length > 0) {
          if (tag.value != opts.items[0].value) {
            tag.value = opts.items[0].value
          }
          if (tag.label != opts.items[0].label) {
            tag.label = opts.items[0].label
            tag.default = opts.items[0].default
          }
        }
      }
    }

    function reset() {
      tag.value = tag.defaultValue
    }

    function changed() {
      return tag.value !== tag.defaultValue
    }

    function blur() {
      tag.trigger('blur')
    }

    function change(target) {
      tag.changeValues(target.target.value)
    }

    function changeValues(value, updating) {
      let item
      if (opts.items.some(item => item.value == value || item.label == value)) {
        item = opts.items.filter(item => item.value == value || item.label == value)[0]
        tag.label = item.label
        tag.value = item.value
        tag.default = item.default
      } else {
        const childItems = flatMap(opts.items.filter(item => item.items), item => item.items)
        if (childItems.some(item => item.value == value || item.label == value)) {
          item = childItems.filter(item => item.value == value || item.label == value)[0]
          tag.label = item.label
          tag.value = item.value
          tag.default = item.default
        }
      }

      if (!updating) {
        tag.update()
        tag.trigger('change', item)
      }
    }

    function flatMap(xs, f) {
      return xs.reduce(function (ys, x) {
        return ys.concat(f(x))
      }, [])
    }
});