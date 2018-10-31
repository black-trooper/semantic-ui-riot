riot.tag2('su-toast', '<div class="ui list"> <su-toast-item each="{item in items}" item="{item}" position="{parent.opts.position}"></su-toast-item> </div>', 'su-toast,[data-is="su-toast"]{ position: fixed; padding: 1rem; z-index: 3000; } su-toast.right,[data-is="su-toast"].right{ right: 0; } su-toast.left,[data-is="su-toast"].left{ left: 0; } su-toast.top,[data-is="su-toast"].top{ top: 0; } su-toast.bottom,[data-is="su-toast"].bottom{ bottom: 0; } su-toast.middle,[data-is="su-toast"].middle{ top: 50%; margin-top: -35px; } su-toast.center,[data-is="su-toast"].center{ left: 50%; margin-left: 150px; } su-toast .ui.message,[data-is="su-toast"] .ui.message{ min-width: 20rem; position: relative; padding-right: 2.5rem; } su-toast .ui.icon.message,[data-is="su-toast"] .ui.icon.message{ width: auto !important; }', 'class="{opts.position}"', function(opts) {
    const self = this
    this.mixin('semantic-ui')
    this.items = []

    this.on('mount', () => {
      if (!opts.position) {
        opts.position = 'bottom right'
      }
      this.update()
    })

    this.observable.on('showToast', option => {
      const item = {
        title: option.title,
        messages: Array.isArray(option.message) ? option.message : [option.message],
        icon: option.icon,
        class: option.class
      }
      this.items.push(item)
      this.update()

      setTimeout(() => {
        this.items.shift()
        this.update()
      }, 5000)
    })

    riot.mixin({
      suToast: param => {
        const option = {
          title: null,
          message: null,
          icon: null,
          class: null,
        }

        if (typeof param === 'string') {
          option.message = param
        } else if (param) {
          if (param.title) {
            option.title = param.title
          }
          if (param.message) {
            option.message = param.message
          }
          if (param.icon) {
            option.icon = param.icon
          }
          if (param.class) {
            option.class = param.class
          }
        }
        self.observable.trigger('showToast', option)
      }
    })
});