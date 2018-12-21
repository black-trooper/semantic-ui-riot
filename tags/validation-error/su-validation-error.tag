<su-validation-error>
  <div if="{ opts.errors[opts.name] }" class="ui basic pointing prompt label transition visible">
    <div each="{ message in opts.errors[opts.name] }">{ message }</div>
  </div>
</su-validation-error>