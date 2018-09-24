require('../../../dist/tags/checkbox/su-checkbox-group.js')
require('../../../dist/tags/checkbox/su-checkbox.js')

describe('su-checkbox-group-undefined', function () {
  let tag

  beforeEach(function () {
    const group = $('<su-checkbox-group value="1"></su-checkbox-group>')
    group.append('<su-checkbox>Checkbox choice1</su-checkbox>')
      .append('<su-checkbox>Checkbox choice2</su-checkbox>')
    $('body').append(group)
    tag = riot.mount('su-checkbox-group')[0]
  })

  afterEach(function () {
    tag.unmount()
  })

  it('is mounted', function () {
    tag.isMounted.should.be.true
  })
})
