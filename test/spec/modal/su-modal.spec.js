describe('su-modal', function () {
  let tag
  let spyOnShow = sinon.spy()
  let spyOnHide = sinon.spy()
  let mount = opts => {
    tag = riot.mount('su-modal', opts)[0]
    tag.on('show', spyOnShow)
      .on('hide', spyOnHide)
  }

  beforeEach(function () {
    $('body').append('<su-modal>modal</su-modal>')
    this.clock = sinon.useFakeTimers()
  })

  afterEach(function () {
    spyOnShow.reset()
    spyOnHide.reset()
    this.clock.restore()
    tag.unmount()
  })

  it('is mounted', function () {
    mount()
    tag.isMounted.should.be.true
  })

  it('opens/closes modal and triggers open/close event', function () {
    mount({
      modal: {
        buttons: [{
          text: 'Ok',
        }]
      }
    })
    $('su-modal').is(':visible').should.equal(false)

    tag.show()
    spyOnShow.should.have.been.calledOnce
    this.clock.tick(310)
    $('su-modal').is(':visible').should.equal(true)

    $('su-modal .ui.button:first').click()
    spyOnHide.should.have.been.calledOnce
    this.clock.tick(310)
    $('su-modal').is(':visible').should.equal(false)
  })

  it('dimmer close', function () {
    mount()
    $('su-modal').is(':visible').should.equal(false)

    tag.show()
    spyOnShow.should.have.been.calledOnce
    this.clock.tick(310)
    $('su-modal').is(':visible').should.equal(true)

    $('su-modal').click()
    spyOnHide.should.have.been.calledOnce
    this.clock.tick(310)
    $('su-modal').is(':visible').should.equal(false)
  })

  it('component', function () {
    const modal = {
      heading: 'modal header',
      buttons: [{
        text: 'Ok',
        type: 'primary',
        icon: 'checkmark'
      }, {
        text: 'Cancel'
      }]
    }
    mount({ modal: modal })
    tag.show()
    this.clock.tick(310)
    $('su-modal').is(':visible').should.equal(true)

    const header = $('su-modal .ui.header')
    header.hasClass('icon').should.equal(false)
    header.text().trim(modal.heading)

    const btn_ok = $('su-modal .ui.button:first')
    btn_ok.hasClass('labeled').should.equal(true)
    btn_ok.hasClass('icon').should.equal(true)
    btn_ok.find('.icon').length.should.equal(1)
    btn_ok.text().trim().should.equal(modal.buttons[0].text)
    btn_ok.hasClass(modal.buttons[0].type).should.equal(true)
    btn_ok.find(`.${modal.buttons[0].icon}`).length.should.equal(1)

    const btn_cancel = $('su-modal .ui.button:last')
    btn_cancel.hasClass('labeled').should.equal(false)
    btn_cancel.hasClass('icon').should.equal(false)
    btn_cancel.find('.icon').length.should.equal(0)
    btn_cancel.text().trim().should.equal(modal.buttons[1].text)
  })
})
