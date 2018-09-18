const fireEvent = require('../../helpers').fireEvent
require('../../../tags/accordion/su-accordion.tag')
require('../../../tags/accordion/su-accordionset.tag')

describe('su-accordionset', function () {
  let tag
  let spyOnClick = sinon.spy()

  beforeEach(function () {
    const group = $('<su-accordionset></su-accordionset>')
    group.append('<su-accordion title="Home">Home content</su-accordion>')
      .append('<su-accordion title="Message">Messages content</su-accordion>')
    $('body').append(group)
    tag = riot.mount('su-accordionset')[0]
    tag.on('click', spyOnClick)
  })

  afterEach(function () {
    spyOnClick.reset()
    tag.unmount()
  })

  it('is mounted', function () {
    tag.isMounted.should.be.true
  })

  it('click title', function () {
    tag.tags['su-accordion'][0].active.should.equal(true)
    tag.tags['su-accordion'][1].active.should.equal(false)

    fireEvent($('div.title:eq(1)')[0], 'click')
    tag.tags['su-accordion'][0].active.should.equal(false)
    tag.tags['su-accordion'][1].active.should.equal(true)
    spyOnClick.should.have.been.calledOnce

    fireEvent($('div.title:eq(0)')[0], 'click')
    tag.tags['su-accordion'][0].active.should.equal(true)
    tag.tags['su-accordion'][1].active.should.equal(false)
    spyOnClick.should.have.been.calledTwice

    fireEvent($('div.title:eq(0)')[0], 'click')
    tag.tags['su-accordion'][0].active.should.equal(false)
    tag.tags['su-accordion'][1].active.should.equal(false)
    spyOnClick.should.have.been.callCount(3)
  })
})
