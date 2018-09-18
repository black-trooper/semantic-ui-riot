require('../../../tags/checkbox/su-checkbox-group.tag')
require('../../../tags/checkbox/su-checkbox.tag')

describe('su-checkbox-group', function () {
  let tag
  let spyOnChange = sinon.spy()

  beforeEach(function () {
    const group = $('<su-checkbox-group></su-checkbox-group>')
    group.append('<su-checkbox value="1">Checkbox choice1</su-checkbox>')
      .append('<su-checkbox value="2">Checkbox choice2</su-checkbox>')
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
    tag.tags['su-checkbox'][0].checked.should.equal(false)
    tag.tags['su-checkbox'][1].checked.should.equal(false)

    tag.value = '1'
    tag.update()
    tag.tags['su-checkbox'][0].checked.should.equal(true)
    tag.tags['su-checkbox'][1].checked.should.equal(false)
    spyOnChange.should.have.been.calledOnce

    tag.value = '2'
    tag.update()
    tag.tags['su-checkbox'][0].checked.should.equal(false)
    tag.tags['su-checkbox'][1].checked.should.equal(true)
    spyOnChange.should.have.been.calledTwice
  })

  it('update option', function () {
    tag.tags['su-checkbox'][0].checked.should.equal(false)
    tag.tags['su-checkbox'][1].checked.should.equal(false)

    tag.opts.riotValue = '1'
    tag.update()
    tag.tags['su-checkbox'][0].checked.should.equal(true)
    tag.tags['su-checkbox'][1].checked.should.equal(false)
    spyOnChange.should.have.been.calledOnce

    tag.opts.riotValue = '2'
    tag.update()
    tag.tags['su-checkbox'][0].checked.should.equal(false)
    tag.tags['su-checkbox'][1].checked.should.equal(true)
    spyOnChange.should.have.been.calledTwice

    tag.opts.riotValue = 1
    tag.update()
    tag.tags['su-checkbox'][0].checked.should.equal(true)
    tag.tags['su-checkbox'][1].checked.should.equal(false)

    tag.opts.riotValue = 2
    tag.update()
    tag.tags['su-checkbox'][0].checked.should.equal(false)
    tag.tags['su-checkbox'][1].checked.should.equal(true)

    tag.opts.riotValue = '1, 2'
    tag.update()
    tag.tags['su-checkbox'][0].checked.should.equal(true)
    tag.tags['su-checkbox'][1].checked.should.equal(true)

    tag.opts.riotValue = [1, 2]
    tag.update()
    tag.tags['su-checkbox'][0].checked.should.equal(true)
    tag.tags['su-checkbox'][1].checked.should.equal(true)
  })

  it('click checkbox', function () {
    tag.tags['su-checkbox'][0].checked.should.equal(false)
    tag.tags['su-checkbox'][1].checked.should.equal(false)

    $('su-checkbox:eq(0) input').click()
    tag.tags['su-checkbox'][0].checked.should.equal(true)
    tag.tags['su-checkbox'][1].checked.should.equal(false)
    spyOnChange.should.have.been.calledOnce

    $('su-checkbox:eq(1) input').click()
    tag.tags['su-checkbox'][0].checked.should.equal(true)
    tag.tags['su-checkbox'][1].checked.should.equal(true)
    spyOnChange.should.have.been.calledTwice
  })

  it('reset value', function () {
    expect(tag.value).to.be.undefined
    expect(tag.defaultValue).to.be.undefined
    tag.changed().should.equal(false)

    $('su-checkbox:eq(0) input').click()
    tag.value.toString().should.equal([tag.tags['su-checkbox'][0].opts.value].toString())
    expect(tag.defaultValue).to.be.undefined
    tag.changed().should.equal(true)

    tag.reset()
    expect(tag.value).to.be.undefined
    expect(tag.defaultValue).to.be.undefined
    tag.changed().should.equal(false)
  })
})
