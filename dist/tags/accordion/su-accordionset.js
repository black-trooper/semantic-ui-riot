// ===================================================================================
//                                                                           Lifecycle
//                                                                           =========
function onBeforeMount() {
  this.accordions = [];
}

function onMounted() {
  this.accordions = this.$$(':scope > su-accordion');

  let defaultActive = false;
  this.accordions.forEach(accordion => {
    initializeChild(this, accordion);
    if (accordion.getAttribute('active')) {
      defaultActive = true;
      this.obs.trigger(`${accordion.id}-toggle-active`, true);
    }
  });
  if (!defaultActive) {
    this.obs.trigger(`${this.accordions[0].id}-toggle-active`, true);
  }

  this.update();
}

// ===================================================================================
//                                                                               Logic
//                                                                               =====
function initializeChild(tag, child) {
  tag.obs.on(`${child.id}-click`, target => {
    const active = target.active;
    tag.accordions.forEach(accordion => {
      tag.obs.trigger(`${accordion.id}-toggle-active`, false);
    });
    tag.obs.trigger(`${target.id}-toggle-active`, !active);
    tag.update();
    tag.dispatch('click', target);
  });
}

var suAccordionset = {
  'css': `su-accordionset,[is="su-accordionset"]{ display: block; } su-accordionset.ui.accordion .title~.content:not(.ui).close,[is="su-accordionset"].ui.accordion .title~.content:not(.ui).close{ padding-top: 0; padding-bottom: 0; } su-accordionset .content.close *,[is="su-accordionset"] .content.close *{ line-height: 0 !important; opacity: 0 !important; visibility: hidden !important; padding-top: 0 !important; padding-bottom: 0 !important; margin-top: 0 !important; margin-bottom: 0 !important; min-height: 0 !important; transition: all 300ms 0s linear !important; } su-accordionset .content.close .dropdown.icon,[is="su-accordionset"] .content.close .dropdown.icon{ height: 0 !important; transition: height 300ms 0s linear !important; } su-accordionset .content.open *,[is="su-accordionset"] .content.open *{ line-height: 1.4285; opacity: 1; visibility: visible; transition: all 300ms 0s linear !important; } su-accordionset .content.open .dropdown.icon,[is="su-accordionset"] .content.open .dropdown.icon{ height: 1.4285 !important; transition: height 300ms 0s linear !important; }`,

  'exports': {
    state: {
    },

    accordions: [],
    onBeforeMount,
    onMounted
  },

  'template': function(template, expressionTypes, bindingTypes, getComponent) {
    return template('<slot expr6="expr6"></slot>', [{
      'expressions': [{
        'type': expressionTypes.ATTRIBUTE,
        'name': 'class',

        'evaluate': function(scope) {
          return ['ui accordion ', scope.props.class].join('');
        }
      }]
    }, {
      'type': bindingTypes.SLOT,
      'attributes': [],
      'name': 'default',
      'redundantAttribute': 'expr6',
      'selector': '[expr6]'
    }]);
  },

  'name': 'su-accordionset'
};

export default suAccordionset;
