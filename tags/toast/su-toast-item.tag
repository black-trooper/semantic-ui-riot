<su-toast-item class="item { transition }">
  <div class=" { position } floated" if="{ !hide }">
    <div class="ui attached active progress { className } top" if="{ progress == 'top' }">
      <div class="bar"></div>
    </div>
    <div class="ui { icon: icon } { className } floating compact message">
      <i class="close icon" onclick="{ close }"></i>
      <i class="{ icon } icon" if="{ icon }"></i>
      <div class="content">
        <div class="header" if="{ title }">
          { title }
        </div>
        <p each="{ message in messages }">{ message }</p>
      </div>
    </div>
    <div class="ui attached active progress { className } bottom" if="{ progress == 'bottom' }">
      <div class="bar"></div>
    </div>
  </div>

  <style>
    .ui.message {
      margin: 0
    }

    @-webkit-keyframes progress-active {
      0% {
        -webkit-transform: scale(0, 1);
        transform: scale(0, 1);
      }

      100% {
        -webkit-transform: scale(1);
        transform: scale(1);
      }
    }

    @keyframes progress-active {
      0% {
        -webkit-transform: scale(0, 1);
        transform: scale(0, 1);
      }

      100% {
        -webkit-transform: scale(1);
        transform: scale(1);
      }
    }

    .attached.progress {
      z-index: 1;
    }

    .attached.progress .bar {
      min-width: 0%;
      width: 100%;
    }

    .active.progress .bar:after,
    .ui.progress.success .bar:after,
    .ui.progress.warning .bar:after,
    .ui.progress.error .bar:after {
      animation: progress-active 3.5s infinite !important;
      -webkit-transform-origin: left;
      transform-origin: left;
      opacity: 0.3 !important;
    }

    .bottom.attached.progress {
      margin: -3px 0 6px;
    }

    .top.attached.progress {
      margin: 6px 0 -3px;
    }
  </style>

  <script>
    const tag = this
    // ===================================================================================
    //                                                                      Tag Properties
    //                                                                      ==============
    tag.position = isRight() ? 'right' : 'left'
    tag.direction = isRight() ? 'left' : 'right'
    tag.icon = opts.item.icon
    tag.progress = opts.item.progress
    tag.className = opts.item.class
    tag.transition = `transition animating in fade ${tag.direction}`
    tag.title = opts.item.title
    tag.messages = opts.item.messages

    // ===================================================================================
    //                                                                         Tag Methods
    //                                                                         ===========
    tag.close = close
    tag.on('mount', onMount)

    // ===================================================================================
    //                                                                          Properties
    //                                                                          ==========

    // ===================================================================================
    //                                                                             Methods
    //                                                                             =======
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
      return opts.position.indexOf('right') >= 0
    }
  </script>
</su-toast-item>