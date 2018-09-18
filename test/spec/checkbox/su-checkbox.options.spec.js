require('../../../tags/checkbox/su-checkbox.tag')

describe('su-checkbox-options', function () {
  let tag
  let spyOnClick = sinon.spy()
  let mount = opts => {
    tag = riot.mount('su-checkbox', opts)[0]
    tag.on('click', spyOnClick)
  }

  beforeEach(function () {
    $('body').append('<su-checkbox>Make my profile visible</su-checkbox>')
  })

  afterEach(function () {
    spyOnClick.reset()
    tag.unmount()
  })

  it('is mounted', function () {
    mount()
    tag.isMounted.should.be.true
  })

  it('click checkbox', function () {
    mount({ checked: true })
    tag.checked.should.equal(true)

    $('su-checkbox input').click()
    spyOnClick.should.have.been.calledOnce
    tag.checked.should.equal(false)

    $('su-checkbox input').click()
    spyOnClick.should.have.been.calledTwice
    tag.checked.should.equal(true)
  })

  it('click checkbox traditional', function () {
    mount({ check: true })
    tag.checked.should.equal(true)

    $('su-checkbox input').click()
    spyOnClick.should.have.been.calledOnce
    tag.checked.should.equal(false)

    $('su-checkbox input').click()
    spyOnClick.should.have.been.calledTwice
    tag.checked.should.equal(true)
  })

  it('readonly', function () {
    mount({ class: 'read-only' })
    tag.checked.should.equal(false)

    $('su-checkbox input').click()
    tag.checked.should.equal(false)
    spyOnClick.should.have.been.callCount(0)
  })

  it('disabled', function () {
    mount({ class: 'disabled' })
    tag.checked.should.equal(false)

    $('su-checkbox input').click()
    tag.checked.should.equal(false)
    spyOnClick.should.have.been.callCount(0)
  })

  it('update checked', function () {
    mount({ checked: true })
    tag.checked.should.equal(true)

    tag.checked = false
    tag.checked.should.equal(false)

    tag.checked = true
    tag.checked.should.equal(true)

    spyOnClick.should.have.been.callCount(0)
  })

  it('update checked traditional', function () {
    mount({ check: true })
    tag.checked.should.equal(true)

    tag.checked = false
    tag.checked.should.equal(false)

    tag.checked = true
    tag.checked.should.equal(true)

    spyOnClick.should.have.been.callCount(0)
  })
})
