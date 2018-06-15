<su-select class="ui selection dropdown">
  <select onchange="{ changed }">
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
</su-select>