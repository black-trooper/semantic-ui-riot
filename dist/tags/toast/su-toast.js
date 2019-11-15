// ===================================================================================
//                                                                           Lifecycle
//                                                                           =========
function onBeforeMount(props, state) {
  state.items = [];
}

function onMounted() {
  this.update();

  if (this.obs) {
    this.obs.off('su-toast-show');
    this.obs.on('su-toast-show', option => {
      showToast(this, option);
    });
  }
}

function onBeforeUpdate(props, state) {
  state.position = props.position || 'bottom right';
}

// ===================================================================================
//                                                                               Logic
//                                                                               =====
function showToast(tag, param) {
  const item = {
    title: null,
    message: null,
    icon: null,
    progress: null,
    class: null,
  };

  if (typeof param === 'string') {
    item.message = param;
  } else if (param) {
    Object.assign(item, param);
  }
  item.messages = Array.isArray(item.message) ? item.message : [item.message];

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

    onBeforeMount,
    onMounted,
    onBeforeUpdate
  },

  'template': function(template, expressionTypes, bindingTypes, getComponent) {
    return template(
      '<div class="ui list"><su-toast-item expr71="expr71"></su-toast-item></div>',
      [{
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
              return scope.state.position;
            }
          }]
        }]),

        'redundantAttribute': 'expr71',
        'selector': '[expr71]',
        'itemName': 'item',
        'indexName': null,

        'evaluate': function(scope) {
          return scope.state.items;
        }
      }]
    );
  },

  'name': 'su-toast'
};

export default suToast;
