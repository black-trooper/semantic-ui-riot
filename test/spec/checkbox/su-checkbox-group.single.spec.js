require('../../../dist/tags/checkbox/su-checkbox-group.js')
require('../../../dist/tags/checkbox/su-checkbox.js')

describe('su-checkbox-group-single', function () {
  let tag
  let spyOnChange = sinon.spy()

  beforeEach(function () {
    const group = $('<su-checkbox-group></su-checkbox-group>')
    group.append('<su-checkbox value="1">Checkbox choice1</su-checkbox>')
    $('body').append(group)
    tag = riot.mount('su-checkbox-group')[0]
    tag.on('change', spyOnChange)
  })

  afterEach(function () {
    spyOnChange.resetHistory()
    tag.unmount()
  })

  it('is mounted', function () {
    tag.isMounted.should.be.true
  })

  it('update value', function () {
    tag.tags['su-checkbox'].checked.should.equal(false)

    tag.value = '1'
    tag.update()
    tag.tags['su-checkbox'].checked.should.equal(true)

    tag.value = '2'
    tag.update()
    tag.tags['su-checkbox'].checked.should.equal(false)
  })

  it('update option', function () {
    tag.tags['su-checkbox'].checked.should.equal(false)

    tag.opts.riotValue = '1'
    tag.update()
    tag.tags['su-checkbox'].checked.should.equal(true)

    tag.opts.riotValue = '2'
    tag.update()
    tag.tags['su-checkbox'].checked.should.equal(false)
  })

  it('click checkbox', function () {
    tag.tags['su-checkbox'].checked.should.equal(false)

    $('su-checkbox:eq(0) input').click()
    tag.tags['su-checkbox'].checked.should.equal(true)
    spyOnChange.should.have.been.calledOnce
  })
})
