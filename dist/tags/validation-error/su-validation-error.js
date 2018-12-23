riot.tag2('su-validation-error', '<div if="{opts.errors && opts.errors[opts.name]}" class="ui basic pointing prompt label transition visible"> <div each="{message in opts.errors[opts.name]}">{message}</div> </div> <ul if="{opts.errors && !opts.name}" class="list"> <virtual each="{errors in opts.errors}"> <li each="{message in errors}">{message}</li> </virtual> </ul>', 'su-validation-error.ui.error.message,[data-is="su-validation-error"].ui.error.message{ display: block; }', 'class="{getClass()}"', function(opts) {
    this.getClass = () => {
      return opts.name ? '' : 'ui error message'
    }
});