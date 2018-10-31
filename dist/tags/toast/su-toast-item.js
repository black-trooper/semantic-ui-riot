riot.tag2('su-toast-item', '<div class="ui {icon: icon} {class} floating compact message {position} floated" if="{!hide}"> <i class="close icon" onclick="{close}"></i> <i class="{icon} icon" if="{icon}"></i> <div class="content"> <div class="header" if="{title}"> {title} </div> <p each="{message in messages}">{message}</p> </div> </div>', '', 'class="item {transition}"', function(opts) {
    this.on('mount', () => {
      this.position = this.isRight() ? 'right' : 'left'
      const direction = this.isRight() ? 'left' : 'right'
      this.icon = opts.item.icon
      this.class = opts.item.class
      this.transition = `transition animating in fade ${direction}`
      this.title = opts.item.title
      this.messages = opts.item.messages
      this.update()

      setTimeout(() => {
        this.transition = ''
        this.update()
      }, 300)

      setTimeout(() => {
        this.transition = `transition animating out fade ${direction}`
        this.update()
      }, 3000)

      setTimeout(() => {
        this.transition = 'transition hidden'
        this.hide = true
        this.update()
      }, 3500)
    })

    this.close = () => {
      this.hide = true
      this.update()
    }

    this.isRight = () => {
      return opts.position.indexOf('right') >= 0
    }
});