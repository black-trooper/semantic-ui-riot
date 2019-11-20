// ===================================================================================
//                                                                           Lifecycle
//                                                                           =========
function onMounted(props) {
  const isRight = (props.position || '').indexOf('right') >= 0;
  const direction = isRight ? 'left' : 'right';
  this.position = isRight ? 'right' : 'left';
  this.transition = `transition animating in fade ${direction}`;
  this.icon = props.icon;
  this.progress = props.progress;
  this.className = props.className;
  this.title = props.title;
  this.messages = props.messages;
  this.update();

  setTimeout(() => {
    this.transition = '';
    this.update();
  }, 300);

  setTimeout(() => {
    this.transition = `transition animating out fade ${direction}`;
    this.update();
  }, 3000);

  setTimeout(() => {
    this.transition = 'transition hidden';
    this.hide = true;
    this.update();
  }, 3500);
}

// ===================================================================================
//                                                                              Events
//                                                                              ======
function onClose() {
  this.hide = true;
  this.update();
}

var suToastItem = {
  'css': `su-toast-item .ui.message,[is="su-toast-item"] .ui.message{ margin: 0 } @-webkit-keyframes progress-active { 0% { -webkit-transform: scale(0, 1); transform: scale(0, 1); } 100% { -webkit-transform: scale(1); transform: scale(1); } } @keyframes progress-active { 0% { -webkit-transform: scale(0, 1); transform: scale(0, 1); } 100% { -webkit-transform: scale(1); transform: scale(1); } } su-toast-item .attached.progress,[is="su-toast-item"] .attached.progress{ z-index: 1; } su-toast-item .attached.progress .bar,[is="su-toast-item"] .attached.progress .bar{ min-width: 0%; width: 100%; } su-toast-item .active.progress .bar:after,[is="su-toast-item"] .active.progress .bar:after,su-toast-item .ui.progress.success .bar:after,[is="su-toast-item"] .ui.progress.success .bar:after,su-toast-item .ui.progress.warning .bar:after,[is="su-toast-item"] .ui.progress.warning .bar:after,su-toast-item .ui.progress.error .bar:after,[is="su-toast-item"] .ui.progress.error .bar:after{ animation: progress-active 3.5s infinite !important; -webkit-transform-origin: left; transform-origin: left; opacity: 0.3 !important; } su-toast-item .bottom.attached.progress,[is="su-toast-item"] .bottom.attached.progress{ margin: -3px 0 6px; } su-toast-item .top.attached.progress,[is="su-toast-item"] .top.attached.progress{ margin: 6px 0 -3px; }`,

  'exports': {
    onMounted,
    onClose
  },

  'template': function(template, expressionTypes, bindingTypes, getComponent) {
    return template('<div expr58="expr58"></div>', [{
      'expressions': [{
        'type': expressionTypes.ATTRIBUTE,
        'name': 'class',

        'evaluate': function(scope) {
          return ['item ', scope.transition].join('');
        }
      }]
    }, {
      'type': bindingTypes.IF,

      'evaluate': function(scope) {
        return !scope.hide;
      },

      'redundantAttribute': 'expr58',
      'selector': '[expr58]',

      'template': template(
        '<div expr59="expr59"></div><div expr60="expr60"><i expr61="expr61" class="close icon"></i><i expr62="expr62"></i><div class="content"><div expr63="expr63" class="header"></div><p expr64="expr64"></p></div></div><div expr65="expr65"></div>',
        [{
          'expressions': [{
            'type': expressionTypes.ATTRIBUTE,
            'name': 'class',

            'evaluate': function(scope) {
              return [' ', scope.position, ' floated'].join('');
            }
          }]
        }, {
          'type': bindingTypes.IF,

          'evaluate': function(scope) {
            return scope.progress == 'top';
          },

          'redundantAttribute': 'expr59',
          'selector': '[expr59]',

          'template': template('<div class="bar"></div>', [{
            'expressions': [{
              'type': expressionTypes.ATTRIBUTE,
              'name': 'class',

              'evaluate': function(scope) {
                return ['ui attached active progress ', scope.className, ' top'].join('');
              }
            }]
          }])
        }, {
          'redundantAttribute': 'expr60',
          'selector': '[expr60]',

          'expressions': [{
            'type': expressionTypes.ATTRIBUTE,
            'name': 'class',

            'evaluate': function(scope) {
              return [
                'ui ',
                scope.icon ? 'icon' : '',
                ' ',
                scope.className,
                ' floating compact message'
              ].join('');
            }
          }]
        }, {
          'redundantAttribute': 'expr61',
          'selector': '[expr61]',

          'expressions': [{
            'type': expressionTypes.EVENT,
            'name': 'onclick',

            'evaluate': function(scope) {
              return scope.onClose;
            }
          }]
        }, {
          'type': bindingTypes.IF,

          'evaluate': function(scope) {
            return scope.icon;
          },

          'redundantAttribute': 'expr62',
          'selector': '[expr62]',

          'template': template(null, [{
            'expressions': [{
              'type': expressionTypes.ATTRIBUTE,
              'name': 'class',

              'evaluate': function(scope) {
                return [scope.icon, ' icon'].join('');
              }
            }]
          }])
        }, {
          'type': bindingTypes.IF,

          'evaluate': function(scope) {
            return scope.title;
          },

          'redundantAttribute': 'expr63',
          'selector': '[expr63]',

          'template': template(' ', [{
            'expressions': [{
              'type': expressionTypes.TEXT,
              'childNodeIndex': 0,

              'evaluate': function(scope) {
                return [scope.title].join('');
              }
            }, {
              'type': expressionTypes.ATTRIBUTE,
              'name': 'class',

              'evaluate': function(scope) {
                return 'header';
              }
            }]
          }])
        }, {
          'type': bindingTypes.EACH,
          'getKey': null,
          'condition': null,

          'template': template(' ', [{
            'expressions': [{
              'type': expressionTypes.TEXT,
              'childNodeIndex': 0,

              'evaluate': function(scope) {
                return scope.message;
              }
            }]
          }]),

          'redundantAttribute': 'expr64',
          'selector': '[expr64]',
          'itemName': 'message',
          'indexName': null,

          'evaluate': function(scope) {
            return scope.messages;
          }
        }, {
          'type': bindingTypes.IF,

          'evaluate': function(scope) {
            return scope.progress == 'bottom';
          },

          'redundantAttribute': 'expr65',
          'selector': '[expr65]',

          'template': template('<div class="bar"></div>', [{
            'expressions': [{
              'type': expressionTypes.ATTRIBUTE,
              'name': 'class',

              'evaluate': function(scope) {
                return ['ui attached active progress ', scope.className, ' bottom'].join('');
              }
            }]
          }])
        }]
      )
    }]);
  },

  'name': 'su-toast-item'
};

export default suToastItem;
