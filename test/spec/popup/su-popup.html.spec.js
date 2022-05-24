require('../../../dist/tags/popup/su-popup.js')

describe('su-popup.html', function () {
  let tag
  const spyOnMouseover = sinon.spy()
  const spyOnMouseout = sinon.spy()

  beforeEach(function () {
    $('body').append('<su-popup><i class="add icon"></i><su-popup-content><div class="header">User Rating</div></su-popup-content></su-popup>')
    tag = riot.mount('su-popup')[0]
    tag.on('mouseover', spyOnMouseover)
    tag.on('mouseout', spyOnMouseout)
  })

  afterEach(function () {
    spyOnMouseover.resetHistory()
    spyOnMouseout.resetHistory()
    tag.unmount()
  })

  it('html content', function () {
    tag.content.should.equal('<div class="header">User Rating</div>')
  })
})
