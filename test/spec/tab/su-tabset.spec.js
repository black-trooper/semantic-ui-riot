const fireEvent = require('../../helpers').fireEvent

describe('su-tabset', function () {
  let tag
  let spyOnClick = sinon.spy()

  beforeEach(function () {
    const group = $('<su-tabset></su-tabset>')
    group.append('<su-tab title="Home">Home content</su-tab>')
      .append('<su-tab title="Message">Messages content</su-tab>')
    $('body').append(group)
    tag = riot.mount('su-tabset')[0]
    tag.on('click', spyOnClick)
  })

  afterEach(function () {
    spyOnClick.reset()
    tag.unmount()
  })

  it('is mounted', function () {
    tag.isMounted.should.be.true
  })

  it('change active', function () {
    tag.tags['su-tab'][0].active.should.equal(true)
    tag.tags['su-tab'][1].active.should.equal(false)

    fireEvent($('a.item:eq(1)')[0], 'click')
    tag.tags['su-tab'][0].active.should.equal(false)
    tag.tags['su-tab'][1].active.should.equal(true)
    spyOnClick.should.have.been.calledOnce

    fireEvent($('a.item:eq(0)')[0], 'click')
    tag.tags['su-tab'][0].active.should.equal(true)
    tag.tags['su-tab'][1].active.should.equal(false)
    spyOnClick.should.have.been.calledTwice
  })
})
