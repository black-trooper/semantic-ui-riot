require('../../../tags/modal/su-modal.tag')

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
    this.clock = sinon.useFakeTimers()
  })

  afterEach(function () {
    spyOnShow.reset()
    spyOnHide.reset()
    this.clock.restore()
    tag.unmount()
  })

  it('is mounted', function () {
    $('body').append('<su-modal>modal</su-modal>')
    mount()
    tag.isMounted.should.be.true
  })

  it('opens/closes modal and triggers open/close event', function () {
    $('body').append('<su-modal>modal</su-modal>')
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
    this.clock.tick(510)
    $('su-modal').is(':visible').should.equal(true)

    $('su-modal .ui.button:first').click()
    spyOnHide.should.have.been.calledOnce
    this.clock.tick(310)
    $('su-modal').is(':visible').should.equal(false)
  })

  it('dimmer close', function () {
    $('body').append('<su-modal>modal</su-modal>')
    mount()
    $('su-modal').is(':visible').should.equal(false)

    tag.show()
    spyOnShow.should.have.been.calledOnce
    this.clock.tick(510)
    $('su-modal').is(':visible').should.equal(true)

    $('su-modal').click()
    spyOnHide.should.have.been.calledOnce
    this.clock.tick(310)
    $('su-modal').is(':visible').should.equal(false)
  })

  it('opens/closes event duplicate', function () {
    $('body').append('<su-modal>modal</su-modal>')
    mount({
      modal: {
        buttons: [{
          text: 'Ok',
          closable: true
        }]
      }
    })
    $('su-modal').is(':visible').should.equal(false)

    tag.show()
    tag.show()
    spyOnShow.should.have.been.calledOnce
    this.clock.tick(510)
    $('su-modal').is(':visible').should.equal(true)

    $('su-modal .ui.button:first').click()
    $('su-modal .ui.button:first').click()
    spyOnHide.should.have.been.calledOnce
    this.clock.tick(310)
    $('su-modal').is(':visible').should.equal(false)
  })

  it('buttons', function () {
    $('body').append('<su-modal>modal</su-modal>')
    const modal = {
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
    this.clock.tick(510)
    $('su-modal').is(':visible').should.equal(true)

    const btn_ok = $('su-modal .ui.button:first')
    btn_ok.hasClass('labeled').should.equal(true)
    btn_ok.hasClass('icon').should.equal(true)
    btn_ok.find('.icon').length.should.equal(1)
    btn_ok.text().trim().should.equal(modal.buttons[0].text)
    btn_ok.hasClass(modal.buttons[0].type).should.equal(true)
    btn_ok.find(`.${modal.buttons[0].icon}`).length.should.equal(1)
    btn_ok.is(':focus').should.equal(false)

    const btn_cancel = $('su-modal .ui.button:last')
    btn_cancel.hasClass('labeled').should.equal(false)
    btn_cancel.hasClass('icon').should.equal(false)
    btn_cancel.find('.icon').length.should.equal(0)
    btn_cancel.text().trim().should.equal(modal.buttons[1].text)
    btn_cancel.is(':focus').should.equal(false)
  })

  it('default button', function () {
    $('body').append('<su-modal>modal</su-modal>')
    const modal = {
      buttons: [{
        text: 'one',
        default: true,
      }, {
        text: 'two',
        default: true,
      }, {
        text: 'three'
      }]
    }
    mount({ modal: modal })
    tag.show()
    this.clock.tick(510)
    $('su-modal').is(':visible').should.equal(true)

    const btn_one = $('su-modal .ui.button:first')
    btn_one.text().trim().should.equal(modal.buttons[0].text)
    btn_one.is(':focus').should.equal(true)

    const btn_two = $('su-modal .ui.button:eq(1)')
    btn_two.text().trim().should.equal(modal.buttons[1].text)
    btn_two.is(':focus').should.equal(false)

    const btn_three = $('su-modal .ui.button:last')
    btn_three.text().trim().should.equal(modal.buttons[2].text)
    btn_three.is(':focus').should.equal(false)
  })

  it('header', function () {
    $('body').append('<su-modal>modal</su-modal>')
    const modal = {
      header: 'modal header'
    }
    mount({ modal: modal })
    tag.show()
    this.clock.tick(510)
    $('su-modal').is(':visible').should.equal(true)

    const header = $('su-modal .ui.header')
    header.hasClass('icon').should.equal(false)
    header.text().trim(modal.header)
  })

  it('icon header', function () {
    $('body').append('<su-modal>modal</su-modal>')
    const modal = {
      header: {
        icon: 'archive',
        text: 'modal header'
      }
    }
    mount({ modal: modal })
    tag.show()
    this.clock.tick(510)
    $('su-modal').is(':visible').should.equal(true)

    const header = $('su-modal .ui.header')
    header.hasClass('icon').should.equal(true)
    header.text().trim(modal.header.text)
  })

  it('image content', function () {
    $('body').append(`
      <su-modal>
        <div class="ui medium image">
          <img src="./images/avatar2/large/rachel.png" />
        </div>
        <div class="description">
          <div class="ui header">Default Profile Image</div>
          <p>We've found the following <a href="https://www.gravatar.com" target="_blank">gravatar</a> image associated with
            your e-mail address.</p>
          <p>Is it okay to use this photo?</p>
        </div>
      </su-modal>
    `)
    const modal = {
    }
    mount({ modal: modal })
    tag.show()
    this.clock.tick(510)
    $('su-modal').is(':visible').should.equal(true)

    const content = $('su-modal .content')
    content.hasClass('image').should.equal(true)
  })

  it('full screen', function () {
    $('body').append('<su-modal>modal</su-modal>')
    mount({ class: 'fullscreen' })
    tag.show()
    this.clock.tick(510)
    $('su-modal').is(':visible').should.equal(true)

    $('su-modal i.close.icon').length.should.equal(1)

    $('su-modal i.close.icon').click()
    spyOnHide.should.have.been.calledOnce
    this.clock.tick(310)
    $('su-modal').is(':visible').should.equal(false)
  })
})
