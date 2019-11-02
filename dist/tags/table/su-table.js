// ===================================================================================
//                                                                           Lifecycle
//                                                                           =========
function onBeforeMount(props, state) {
  this.lastData = {};
  this.lastCondition = {};
}

function onMounted(props, state) {
  this.headers = this.$$('su-th');

  this.headers.forEach(th => {
    this.obs.on(`${th.id}-click`, field => {
      sort(this, field);

      this.headers.forEach(th => {
        this.obs.trigger(`${th.id}-set-condition`, this.lastCondition);
      });
      this.update();
    });
  });
  this.update();
}

function onUpdated(props, state) {
  if (JSON.stringify(this.lastData) != JSON.stringify(props.data)) {
    this.lastData = props.data;
    this.lastCondition = {
      field: state.suTableIndex,
      reverse: false,
    };

    if (props.defaultSortField) {
      if (props.defaultSortReverse) {
        this.lastCondition.field = props.defaultSortField;
        this.lastCondition.reverse = false;
      }
      sort(this, props.defaultSortField);

      this.headers.forEach(th => {
        this.obs.trigger(`${th.id}-set-condition`, this.lastCondition);
      });
    }
  }
}

// ===================================================================================
//                                                                               Logic
//                                                                               =====
function sort(tag, field) {
  addIndexField(tag);
  const condition = generateCondition(field, tag.lastCondition, tag.state.suTableIndex);
  tag.props.data.sort(sortBy(condition, tag));
  tag.lastCondition = condition;
}

function generateCondition(field, condition, suTableIndex) {
  if (condition.field === field) {
    if (!condition.reverse) {
      condition.reverse = true;
    } else {
      condition.reverse = false;
      condition.field = suTableIndex;
    }
  } else {
    condition.reverse = false;
    condition.field = field;
  }

  return condition
}

function sortBy(condition, tag) {
  const field = condition.field;
  const reverse = condition.reverse ? -1 : 1;
  const nullsFirst = tag.props.nullsFirst ? -1 : 1;

  return (ason, bson) => {
    const a = ason[field];
    const b = bson[field];

    if (a == null) {
      return reverse * nullsFirst
    }
    if (b == null) {
      return reverse * nullsFirst * -1
    }
    if (a < b) {
      return reverse * -1
    }
    if (a > b) {
      return reverse
    }

    return ason[tag.state.suTableIndex] - bson[tag.state.suTableIndex]
  }
}

function addIndexField(tag) {
  tag.props.data.forEach((data, index) => {
    if (data[tag.state.suTableIndex] === undefined) {
      data[tag.state.suTableIndex] = index;
    }
  });
}

var suTable = {
  'css': null,

  'exports': {
    state: {
      suTableIndex: 'su-table-index',
    },

    lastData: {},
    lastCondition: {},
    headers: [],
    onBeforeMount,
    onMounted,
    onUpdated
  },

  'template': function(template, expressionTypes, bindingTypes, getComponent) {
    return template('<slot expr58="expr58"></slot>', [{
      'type': bindingTypes.SLOT,
      'attributes': [],
      'name': 'default',
      'redundantAttribute': 'expr58',
      'selector': '[expr58]'
    }]);
  },

  'name': 'su-table'
};

export default suTable;
