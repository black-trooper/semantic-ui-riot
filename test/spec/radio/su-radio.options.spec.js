require('../../../dist/tags/radio/su-radio.js')
require('../../../dist/tags/radio/su-radio-group.js')

describe('su-radio-options', function () {
  let tag
  let spyOnClick = sinon.spy()
  let mount = opts => {
    tag = riot.mount('su-radio', opts)[0]
    tag.on('click', spyOnClick)
  }

  beforeEach(function () {
    $('body').append('<su-radio name="radio1" ref="radio1_1">Radio choice1</su-radio>')
      .append('<su-radio name="radio1" ref="radio1_2">Radio choice2</su-radio>')
  })

  afterEach(function () {
    spyOnClick.resetHistory()
    tag.unmount()
  })

  it('is mounted', function () {
    mount()
    tag.isMounted.should.be.true
  })

  it('checked', function () {
    mount({ checked: true })
    tag.checked.should.equal(true)
  })

  it('readonly', function () {
    mount({ class: 'read-only' })
    tag.checked.should.equal(false)

    $('su-radio:eq(0) input').click()
    tag.checked.should.equal(false)
    spyOnClick.should.have.been.callCount(0)
  })

  it('disabled', function () {
    mount({ class: 'disabled' })
    tag.checked.should.equal(false)

    $('su-radio:eq(0) input').click()
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
})
