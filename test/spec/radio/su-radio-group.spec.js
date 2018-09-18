require('../../../tags/radio/su-radio.tag')
require('../../../tags/radio/su-radio-group.tag')

describe('su-radio-group', function () {
  let tag
  let spyOnChange = sinon.spy()

  beforeEach(function () {
    const group = $('<su-radio-group></su-radio-group>')
    group.append('<su-radio value="1">Radio choice1</su-radio>')
      .append('<su-radio value="2">Radio choice2</su-radio>')
    $('body').append(group)
    tag = riot.mount('su-radio-group')[0]
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
  })

  it('update option', function () {
    tag.tags['su-radio'][0].checked.should.equal(false)
    tag.tags['su-radio'][1].checked.should.equal(false)

    tag.opts.riotValue = '1'
    tag.update()
    tag.tags['su-radio'][0].checked.should.equal(true)
    tag.tags['su-radio'][1].checked.should.equal(false)
    spyOnChange.should.have.been.calledOnce

    tag.opts.riotValue = '2'
    tag.update()
    tag.tags['su-radio'][0].checked.should.equal(false)
    tag.tags['su-radio'][1].checked.should.equal(true)
    spyOnChange.should.have.been.calledTwice
  })

  it('click checkbox', function () {
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

  it('reset value', function () {
    expect(tag.value).to.be.undefined
    expect(tag.defaultValue).to.be.undefined
    tag.changed().should.equal(false)

    $('su-radio:eq(0) input').click()
    expect(tag.defaultValue).to.be.undefined
    tag.value.should.equal(tag.tags['su-radio'][0].value)
    tag.changed().should.equal(true)

    tag.reset()
    expect(tag.value).to.be.undefined
    expect(tag.defaultValue).to.be.undefined
    tag.changed().should.equal(false)
  })
})
