function onBeforeUpdate(props, state) {
  const temp = [];
  if (state.sorted) {
    temp.push('sorted ');
    temp.push(stat.reverse ? 'descending' : 'ascending');
  }
  this.classes = temp.join(' ');
}

function onClick() {
  this.obs.trigger(`${su_id}-click`, opts.field);
}

var suTh = {
  'css': null,

  'exports': {
    state: {
      sorted: false,
      reverse: false,
    },

    classes: '',
    onBeforeUpdate,
    onClick
  },

  'template': null,
  'name': 'su-th'
};

export default suTh;
