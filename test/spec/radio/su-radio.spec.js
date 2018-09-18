require('../../../tags/radio/su-radio.tag')
require('../../../tags/radio/su-radio-group.tag')

describe('su-radio', function () {
  let tag1, tag2
  let spyOnClick = sinon.spy()

  beforeEach(function () {
    $('body').append('<su-radio name="radio1" ref="radio1_1">Radio choice1</su-radio>')
      .append('<su-radio name="radio1" ref="radio1_2">Radio choice2</su-radio>')
    let tags = riot.mount('su-radio')
    tag1 = tags[0]
    tag2 = tags[1]
    tag1.on('click', spyOnClick)
    this.clock = sinon.useFakeTimers()
  })

  afterEach(function () {
    spyOnClick.reset()
    this.clock.restore()
    tag1.unmount()
  })

  it('is mounted', function () {
    tag1.isMounted.should.be.true
    tag2.isMounted.should.be.true
  })

  it('click checkbox', function () {
    tag1.refs.target.checked.should.equal(false)
    tag2.refs.target.checked.should.equal(false)

    $('su-radio:eq(0) input').click()
    spyOnClick.should.have.been.calledOnce
    tag1.refs.target.checked.should.equal(true)
    tag2.refs.target.checked.should.equal(false)

    $('su-radio:eq(1) input').click()
    spyOnClick.should.have.been.calledOnce
    tag1.refs.target.checked.should.equal(false)
    tag2.refs.target.checked.should.equal(true)
  })

  it('click label', function () {
    tag1.refs.target.checked.should.equal(false)
    tag2.refs.target.checked.should.equal(false)

    $('su-radio:eq(0) label').click()
    spyOnClick.should.have.been.calledOnce
    tag1.refs.target.checked.should.equal(true)
    tag2.refs.target.checked.should.equal(false)

    $('su-radio:eq(1) label').click()
    spyOnClick.should.have.been.calledOnce
    tag1.refs.target.checked.should.equal(false)
    tag2.refs.target.checked.should.equal(true)
  })
})
