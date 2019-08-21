require('../../../dist/tags/checkbox/su-checkbox-group.js')
require('../../../dist/tags/checkbox/su-checkbox.js')

describe('su-checkbox-group', function () {
  let tag
  let spyOnChange = sinon.spy()

  beforeEach(function () {
    const group = $('<su-checkbox-group></su-checkbox-group>')
    group.append('<su-checkbox each="{ item in items }" value="{ item }" label="Checkbox choice{ item }"></su-checkbox>')

    $('body').append(group)
    tag = riot.mount('su-checkbox-group')[0]
    tag.on('change', spyOnChange)
  })

  afterEach(function () {
    spyOnChange.reset()
    tag.unmount()
  })

  it('is mounted', function () {
    tag.isMounted.should.be.true
  })

  it('update value', function () {
    expect(tag.tags['su-checkbox']).to.be.undefined
    tag.update({ items: [1, 2] })

    tag.tags['su-checkbox'].length.should.equal(2)
    tag.tags['su-checkbox'][0].checked.should.equal(false)
    tag.tags['su-checkbox'][1].checked.should.equal(false)

    tag.value = '1'
    tag.update()
    tag.tags['su-checkbox'][0].checked.should.equal(true)
    tag.tags['su-checkbox'][1].checked.should.equal(false)
    spyOnChange.should.have.been.calledOnce

    tag.update({ items: null })
    expect(tag.tags['su-checkbox']).to.be.undefined
  })
})
