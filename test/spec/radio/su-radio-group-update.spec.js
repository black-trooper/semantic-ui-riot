require('../../../dist/tags/radio/su-radio.js')
require('../../../dist/tags/radio/su-radio-group.js')

describe('su-radio-group-update', function () {
  let tag
  let spyOnChange = sinon.spy()

  beforeEach(function () {
    const group = $('<su-radio-group></su-radio-group>')
    group.append('<su-radio each="{ item in items }" value="{ item }" label="Radio choice{ item }"></su-radio>')
    $('body').append(group)
    tag = riot.mount('su-radio-group')[0]
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
    expect(tag.tags['su-radio']).to.be.undefined
    tag.update({ items: [1, 2] })
    tag.update()

    tag.tags['su-radio'].length.should.equal(2)
    tag.tags['su-radio'][0].checked.should.equal(false)
    tag.tags['su-radio'][1].checked.should.equal(false)

    tag.value = '1'
    tag.update()
    tag.tags['su-radio'][0].checked.should.equal(true)
    tag.tags['su-radio'][1].checked.should.equal(false)
    spyOnChange.should.have.been.calledOnce

    tag.value = '2'
    tag.update()
    tag.tags['su-radio'][0].checked.should.equal(false)
    tag.tags['su-radio'][1].checked.should.equal(true)
    spyOnChange.should.have.been.calledTwice

    tag.update({ items: null })
    expect(tag.tags['su-radio']).to.be.undefined
  })

  it('click checkbox', function () {
    expect(tag.tags['su-radio']).to.be.undefined
    tag.update({ items: [1, 2] })
    tag.update()

    tag.tags['su-radio'].length.should.equal(2)
    tag.tags['su-radio'][0].checked.should.equal(false)
    tag.tags['su-radio'][1].checked.should.equal(false)

    $('su-radio:eq(0) input').click()
    tag.tags['su-radio'][0].checked.should.equal(true)
    tag.tags['su-radio'][1].checked.should.equal(false)
    spyOnChange.should.have.been.calledOnce

    $('su-radio:eq(1) input').click()
    tag.tags['su-radio'][0].checked.should.equal(false)
    tag.tags['su-radio'][1].checked.should.equal(true)
    spyOnChange.should.have.been.calledTwice
  })
})
