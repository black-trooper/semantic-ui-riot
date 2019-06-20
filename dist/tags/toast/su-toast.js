// ===================================================================================
//                                                                           Lifecycle
//                                                                           =========
function onMounted() {
  this.update();

  if (this.obs) {
    this.obs.on('su-toast-show', option => {
      showToast(this, option);
    });
  }
}

function onUpdated(props, state) {
  state.position = props.position || 'bottom right';
}

// ===================================================================================
//                                                                               Logic
//                                                                               =====
function showToast(tag, param) {
  const option = {
    title: null,
    message: null,
    icon: null,
    progress: null,
    class: null,
  };

  if (typeof param === 'string') {
    option.message = param;
  } else if (param) {
    Object.assign(option, param);
  }
  option.message = Array.isArray(option.message) ? option.message : [option.message];

  tag.state.items.push(item);
  tag.update();

  setTimeout(() => {
    tag.state.items.shift();
    tag.update();
  }, 5000);
}

var suToast = {
  'css': `su-toast,[is="su-toast"]{ position: fixed; padding: 1rem; z-index: 3000; } su-toast.right,[is="su-toast"].right{ right: 0; } su-toast.left,[is="su-toast"].left{ left: 0; } su-toast.top,[is="su-toast"].top{ top: 0; } su-toast.bottom,[is="su-toast"].bottom{ bottom: 0; } su-toast.middle,[is="su-toast"].middle{ top: 50%; margin-top: -35px; } su-toast.center,[is="su-toast"].center{ left: 50%; margin-left: 150px; } su-toast .ui.message,[is="su-toast"] .ui.message{ min-width: 20rem; position: relative; padding-right: 2.5rem; } su-toast .ui.icon.message,[is="su-toast"] .ui.icon.message{ width: auto !important; }`,

  'exports': {
    state: {
      items: [],
      position: '',
    },

    onMounted,
    onUpdated
  },

  'template': function(template, expressionTypes, bindingTypes, getComponent) {
    return template('<div class="ui list"><su-toast-item expr129></su-toast-item></div>', [{
      'expressions': [{
        'type': expressionTypes.ATTRIBUTE,
        'name': 'class',

        'evaluate': function(scope) {
          return scope.state.position;
        }
      }]
    }, {
      'type': bindingTypes.EACH,
      'getKey': null,
      'condition': null,

      'template': template(null, [{
        'type': bindingTypes.TAG,
        'getComponent': getComponent,

        'evaluate': function(scope) {
          return 'su-toast-item';
        },

        'slots': [],

        'attributes': [{
          'type': expressionTypes.ATTRIBUTE,
          'name': 'icon',

          'evaluate': function(scope) {
            return scope.item.icon;
          }
        }, {
          'type': expressionTypes.ATTRIBUTE,
          'name': 'progress',

          'evaluate': function(scope) {
            return scope.item.progress;
          }
        }, {
          'type': expressionTypes.ATTRIBUTE,
          'name': 'class-name',

          'evaluate': function(scope) {
            return scope.item.class;
          }
        }, {
          'type': expressionTypes.ATTRIBUTE,
          'name': 'title',

          'evaluate': function(scope) {
            return scope.item.title;
          }
        }, {
          'type': expressionTypes.ATTRIBUTE,
          'name': 'messages',

          'evaluate': function(scope) {
            return scope.item.messages;
          }
        }, {
          'type': expressionTypes.ATTRIBUTE,
          'name': 'position',

          'evaluate': function(scope) {
            return scope.position;
          }
        }]
      }]),

      'redundantAttribute': 'expr129',
      'selector': '[expr129]',
      'itemName': 'item',
      'indexName': null,

      'evaluate': function(scope) {
        return scope.state.items;
      }
    }]);
  },

  'name': 'su-toast'
};

export default suToast;
