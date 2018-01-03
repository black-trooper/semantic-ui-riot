const fireEvent = require('../../helpers').fireEvent

describe('su-popup', function () {
  let tag
  const spyOnMouseover = sinon.spy()
  const spyOnMouseout = sinon.spy()

  const mount = opts => {
    tag = riot.mount('su-popup', opts)[0]
    tag.on('mouseover', spyOnMouseover)
    tag.on('mouseout', spyOnMouseout)
  }


  beforeEach(function () {
    $('body').append('<su-popup><i class="add icon"></i></su-popup>')
  })

  afterEach(function () {
    spyOnMouseover.reset()
    spyOnMouseout.reset()
    tag.unmount()
  })

  it('is mounted', function () {
    mount()
    tag.isMounted.should.be.true
  })

  it('show and hide popup', function () {
    mount({
      tooltip: 'Add users to your feed'
    })
    tag.content.should.equal('Add users to your feed')

    fireEvent($('su-popup')[0], 'mouseover')
    spyOnMouseover.should.have.been.calledOnce
    $('su-popup .ui.popup').is(':visible').should.equal(true)

    fireEvent($('su-popup')[0], 'mouseout')
    spyOnMouseout.should.have.been.calledOnce
    $('su-popup .ui.popup').is(':visible').should.equal(false)
  })

  it('header', function () {
    mount({
      tooltip: 'Add users to your feed',
      dataTitle: 'Title'
    })

    const div = $(`<div>${tag.content}</div>`)
    div.find('.header').html().should.equal("Title")
    div.find('.content').html().should.equal("Add users to your feed")
  })

  it('wide', function () {
    mount({
      tooltip: 'Add users to your feed',
      dataVariation: 'wide'
    })

    $(tag.root).find(".popup").hasClass("wide").should.equal(true)
  })
})
