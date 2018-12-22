<su-validation-error class="{ getClass() }">
  <div if="{ opts.errors[opts.name] }" class="ui basic pointing prompt label transition visible">
    <div each="{ message in opts.errors[opts.name] }">{ message }</div>
  </div>

  <ul if="{ !opts.name }" class="list">
    <virtual each="{ errors in opts.errors }">
        <li each="{ message in errors }">{ message }</li>
      </virtual>
  </ul>

  <style>
    :scope.ui.error.message {
      display: block;
    }
  </style>

  <script>
    this.getClass = () => {
      return opts.name ? '' : 'ui error message'
    }
  </script>
</su-validation-error>