<su-validation-error class="{ getClass() }">
  <div if="{ opts.errors && opts.errors[opts.name] }" class="ui basic pointing prompt label transition visible">
    <div each="{ message in opts.errors[opts.name] }">{ message }</div>
  </div>

  <ul if="{ !isEmptyErrors() && !opts.name }" class="list">
    <virtual each="{ errors in opts.errors }">
      <li each="{ message in errors }">{ message }</li>
    </virtual>
  </ul>

  <style>
    :scope.ui.error.message {
      display: block !important;
    }
  </style>

  <script>
    const tag = this
    tag.getClass = () => {
      if (opts.name || tag.isEmptyErrors()) {
        return ''
      }
      return 'ui error message'
    }

    tag.isEmptyErrors = () => {
      return !opts.errors || Object.keys(opts.errors).length == 0
    }
  </script>
</su-validation-error>