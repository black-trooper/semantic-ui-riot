riot.tag2('su-toast-item', '<div class=" {position} floated" if="{!hide}"> <div class="ui attached active progress {class} top" if="{progress == \'top\'}"> <div class="bar"></div> </div> <div class="ui {icon: icon} {class} floating compact message"> <i class="close icon" onclick="{close}"></i> <i class="{icon} icon" if="{icon}"></i> <div class="content"> <div class="header" if="{title}"> {title} </div> <p each="{message in messages}">{message}</p> </div> </div> <div class="ui attached active progress {class} bottom" if="{progress == \'bottom\'}"> <div class="bar"></div> </div> </div>', 'su-toast-item .ui.message,[data-is="su-toast-item"] .ui.message{ margin: 0 } @-webkit-keyframes progress-active { 0% { -webkit-transform: scale(0, 1); transform: scale(0, 1); } 100% { -webkit-transform: scale(1); transform: scale(1); } } @keyframes progress-active { 0% { -webkit-transform: scale(0, 1); transform: scale(0, 1); } 100% { -webkit-transform: scale(1); transform: scale(1); } } su-toast-item .attached.progress,[data-is="su-toast-item"] .attached.progress{ z-index: 1; } su-toast-item .attached.progress .bar,[data-is="su-toast-item"] .attached.progress .bar{ min-width: 0%; width: 100%; } su-toast-item .active.progress .bar:after,[data-is="su-toast-item"] .active.progress .bar:after,su-toast-item .ui.progress.success .bar:after,[data-is="su-toast-item"] .ui.progress.success .bar:after,su-toast-item .ui.progress.warning .bar:after,[data-is="su-toast-item"] .ui.progress.warning .bar:after,su-toast-item .ui.progress.error .bar:after,[data-is="su-toast-item"] .ui.progress.error .bar:after{ animation: progress-active 3.5s infinite !important; -webkit-transform-origin: left; transform-origin: left; opacity: 0.3 !important; } su-toast-item .bottom.attached.progress,[data-is="su-toast-item"] .bottom.attached.progress{ margin: -3px 0 6px; } su-toast-item .top.attached.progress,[data-is="su-toast-item"] .top.attached.progress{ margin: 6px 0 -3px; }', 'class="item {transition}"', function(opts) {
    this.on('mount', () => {
      this.position = this.isRight() ? 'right' : 'left'
      const direction = this.isRight() ? 'left' : 'right'
      this.icon = opts.item.icon
      this.progress = opts.item.progress
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