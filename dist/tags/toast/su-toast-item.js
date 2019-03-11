riot.tag2('su-toast-item', '<div class=" {position} floated" if="{!hide}"> <div class="ui attached active progress {className} top" if="{progress == \'top\'}"> <div class="bar"></div> </div> <div class="ui {icon: icon} {className} floating compact message"> <i class="close icon" onclick="{close}"></i> <i class="{icon} icon" if="{icon}"></i> <div class="content"> <div class="header" if="{title}"> {title} </div> <p each="{message in messages}">{message}</p> </div> </div> <div class="ui attached active progress {className} bottom" if="{progress == \'bottom\'}"> <div class="bar"></div> </div> </div>', 'su-toast-item .ui.message,[data-is="su-toast-item"] .ui.message{ margin: 0 } @-webkit-keyframes progress-active { 0% { -webkit-transform: scale(0, 1); transform: scale(0, 1); } 100% { -webkit-transform: scale(1); transform: scale(1); } } @keyframes progress-active { 0% { -webkit-transform: scale(0, 1); transform: scale(0, 1); } 100% { -webkit-transform: scale(1); transform: scale(1); } } su-toast-item .attached.progress,[data-is="su-toast-item"] .attached.progress{ z-index: 1; } su-toast-item .attached.progress .bar,[data-is="su-toast-item"] .attached.progress .bar{ min-width: 0%; width: 100%; } su-toast-item .active.progress .bar:after,[data-is="su-toast-item"] .active.progress .bar:after,su-toast-item .ui.progress.success .bar:after,[data-is="su-toast-item"] .ui.progress.success .bar:after,su-toast-item .ui.progress.warning .bar:after,[data-is="su-toast-item"] .ui.progress.warning .bar:after,su-toast-item .ui.progress.error .bar:after,[data-is="su-toast-item"] .ui.progress.error .bar:after{ animation: progress-active 3.5s infinite !important; -webkit-transform-origin: left; transform-origin: left; opacity: 0.3 !important; } su-toast-item .bottom.attached.progress,[data-is="su-toast-item"] .bottom.attached.progress{ margin: -3px 0 6px; } su-toast-item .top.attached.progress,[data-is="su-toast-item"] .top.attached.progress{ margin: 6px 0 -3px; }', 'class="item {transition}"', function(opts) {
    const tag = this

    tag.position = isRight() ? 'right' : 'left'
    tag.direction = isRight() ? 'left' : 'right'
    tag.icon = opts.icon
    tag.progress = opts.progress
    tag.className = opts.className
    tag.transition = `transition animating in fade ${tag.direction}`
    tag.title = opts.title
    tag.messages = opts.messages

    tag.close = close
    tag.on('mount', onMount)

    function close() {
      tag.hide = true
      tag.update()
    }

    function onMount() {
      setTimeout(() => {
        tag.transition = ''
        tag.update()
      }, 300)

      setTimeout(() => {
        tag.transition = `transition animating out fade ${tag.direction}`
        tag.update()
      }, 3000)

      setTimeout(() => {
        tag.transition = 'transition hidden'
        tag.hide = true
        tag.update()
      }, 3500)
    }

    function isRight() {
      const position = opts.position || ''
      return position.indexOf('right') >= 0
    }
});