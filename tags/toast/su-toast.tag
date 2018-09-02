<su-toast class="{ opts.position }">
  <div class="ui list">
    <div class="item" each="{ item in items }">
      <div class="ui { icon: item.icon } { item.class } floating compact message right floated" if="{ !item.hide }">
        <i class="close icon" onclick="{ close }"></i>
        <i class="{ item.icon } icon" if="{ item.icon }"></i>
        <div class="content">
          <div class="header" if="{ item.title }">
            { item.title }
          </div>
          <p each="{ message in item.messages }">{ message }</p>
        </div>
      </div>
    </div>
  </div>

  <style>
    :scope {
      position: fixed;
      padding: 1rem;
      z-index: 3000;
    }

    :scope.right {
      right: 0;
    }

    :scope.left {
      left: 300px;
    }

    :scope.top {
      top: 0;
    }

    :scope.bottom {
      bottom: 0;
    }

    :scope.middle {
      top: 50%;
      margin-top: -35px;
    }

    :scope.center {
      left: 50%;
      margin-left: 150px;
    }

    .ui.message {
      min-width: 20rem;
      position: relative;
      padding-right: 2.5rem;
    }

    .ui.icon.message {
      width: auto !important;
    }

    .ui.warning.message {
      -webkit-box-shadow: 0 0 0 1px #c9ba9b inset, 0 2px 4px 0 rgba(34, 36, 38, .12), 0 2px 10px 0 rgba(34, 36, 38, .15);
      box-shadow: 0 0 0 1px #c9ba9b inset, 0 2px 4px 0 rgba(34, 36, 38, .12), 0 2px 10px 0 rgba(34, 36, 38, .15);
    }

    .ui.info.message {
      -webkit-box-shadow: 0 0 0 1px #a9d5de inset, 0 2px 4px 0 rgba(34, 36, 38, .12), 0 2px 10px 0 rgba(34, 36, 38, .15);
      box-shadow: 0 0 0 1px #a9d5de inset, 0 2px 4px 0 rgba(34, 36, 38, .12), 0 2px 10px 0 rgba(34, 36, 38, .15);
    }

    .ui.positive.message,
    .ui.success.message {
      -webkit-box-shadow: 0 0 0 1px #a3c293 inset, 0 2px 4px 0 rgba(34, 36, 38, .12), 0 2px 10px 0 rgba(34, 36, 38, .15);
      box-shadow: 0 0 0 1px #a3c293 inset, 0 2px 4px 0 rgba(34, 36, 38, .12), 0 2px 10px 0 rgba(34, 36, 38, .15);
    }

    .ui.negative.message,
    .ui.error.message {
      -webkit-box-shadow: 0 0 0 1px #e0b4b4 inset, 0 2px 4px 0 rgba(34, 36, 38, .12), 0 2px 10px 0 rgba(34, 36, 38, .15);
      box-shadow: 0 0 0 1px #e0b4b4 inset, 0 2px 4px 0 rgba(34, 36, 38, .12), 0 2px 10px 0 rgba(34, 36, 38, .15);
    }
  </style>

  <script>
    const self = this
    this.mixin('semantic-ui')
    this.items = []

    this.on('mount', () => {
      if (!opts.position) {
        opts.position = 'bottom right'
      }
      this.update()
    })

    this.close = target => {
      target.item.item.hide = true
      this.update()
    }

    // ===================================================================================
    //                                                                          Observable
    //                                                                          ==========
    this.observable.on('showToast', option => {
      this.items.push({
        title: option.title,
        messages: Array.isArray(option.message) ? option.message : [option.message],
        icon: option.icon,
        class: option.class,
      })
      this.update()

      setTimeout(() => {
        this.items.shift()
        this.update()
      }, 3000)
    })

    riot.mixin({
      suToast(param) {
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
  </script>
</su-toast>