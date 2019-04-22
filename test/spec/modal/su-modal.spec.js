import * as riot from 'riot'
import { init } from '../../helpers/'
import TargetComponent from '../../../dist/tags/modal/su-modal.js'

describe('su-modal', function () {
  let element, component
  const spyOnShow = sinon.spy()
  const spyOnHide = sinon.spy()
  init(riot)

  const mount = opts => {
    const option = Object.assign({
      'onshow': spyOnShow,
      'onhide': spyOnHide
    }, opts)
    component = riot.mount(element, option)[0]
  }

  // const isFocus = elem => {
  //   return elem === document.activeElement
  //     && (!document.hasFocus || document.hasFocus())
  //     && !!(elem.type || elem.href || ~elem.tabIndex);
  // }

  beforeEach(function () {
    riot.register('su-modal', TargetComponent)
    element = document.createElement('su-modal')
    element.innerText = 'modal'
    this.clock = sinon.useFakeTimers()
  })

  afterEach(function () {
    spyOnShow.reset()
    spyOnHide.reset()
    this.clock.restore()
    riot.unregister('su-modal')
  })

  it('is mounted', function () {
    mount()
    expect(component).to.be.ok
  })

  it('opens/closes modal and triggers open/close event', function () {
    mount({
      modal: {
        buttons: [{
          text: 'Ok',
        }]
      }
    })
    expect(component.$('.dimmer').classList.contains('visible')).to.be.equal(false)

    component.showModal(element)
    spyOnShow.should.have.been.calledOnce
    this.clock.tick(510)
    expect(component.$('.dimmer').classList.contains('visible')).to.be.equal(true)

    component.$('.ui.button').click()
    spyOnHide.should.have.been.calledOnce
    this.clock.tick(310)
    expect(component.$('.dimmer').classList.contains('visible')).to.be.equal(false)
  })

  it('dimmer close', function () {
    mount()
    expect(component.$('.dimmer').classList.contains('visible')).to.be.equal(false)

    component.showModal(element)
    spyOnShow.should.have.been.calledOnce
    this.clock.tick(510)
    expect(component.$('.dimmer').classList.contains('visible')).to.be.equal(true)

    element.click()
    spyOnHide.should.have.been.calledOnce
    this.clock.tick(310)
    expect(component.$('.dimmer').classList.contains('visible')).to.be.equal(false)
  })

  it('opens/closes event duplicate', function () {
    mount({
      modal: {
        buttons: [{
          text: 'Ok',
          closable: true
        }]
      }
    })
    expect(component.$('.dimmer').classList.contains('visible')).to.be.equal(false)

    component.showModal(element)
    component.showModal(element)
    spyOnShow.should.have.been.calledOnce
    this.clock.tick(510)
    expect(component.$('.dimmer').classList.contains('visible')).to.be.equal(true)

    component.$('.ui.button').click()
    component.$('.ui.button').click()
    spyOnHide.should.have.been.calledOnce
    this.clock.tick(310)
    expect(component.$('.dimmer').classList.contains('visible')).to.be.equal(false)
  })

  it('buttons', function () {
    const modal = {
      buttons: [{
        text: 'Ok',
        type: 'primary',
        icon: 'checkmark'
      }, {
        text: 'Cancel'
      }]
    }
    mount({ modal })
    component.showModal(element)
    this.clock.tick(510)
    expect(component.$('.dimmer').classList.contains('visible')).to.be.equal(true)

    const btn_ok = component.$('.ui.button')
    expect(btn_ok.classList.contains('labeled')).to.be.equal(true)
    expect(btn_ok.classList.contains('icon')).to.be.equal(true)
    expect(btn_ok.querySelectorAll('.icon').length).to.be.equal(1)
    expect(btn_ok.innerText.trim()).to.be.equal(modal.buttons[0].text)
    expect(btn_ok.classList.contains(modal.buttons[0].type)).to.be.equal(true)
    expect(btn_ok.querySelectorAll(`.${modal.buttons[0].icon}`).length).to.be.equal(1)
    expect(btn_ok).to.be.not.equal(document.activeElement)

    const btn_cancel = component.$$('.ui.button')[1]
    expect(btn_cancel.classList.contains('labeled')).to.be.equal(false)
    expect(btn_cancel.classList.contains('icon')).to.be.equal(false)
    expect(btn_cancel.querySelectorAll('.icon').length).to.be.equal(0)
    expect(btn_cancel.innerText.trim()).to.be.equal(modal.buttons[1].text)
    expect(btn_cancel).to.be.not.equal(document.activeElement)
  })

  it('default button', function () {
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
    mount({ modal })
    component.showModal(element)
    this.clock.tick(510)
    expect(component.$('.dimmer').classList.contains('visible')).to.be.equal(true)

    const btn_one = component.$('.ui.button')
    expect(btn_one.innerText.trim()).to.be.equal(modal.buttons[0].text)
    // expect(isFocus(btn_one)).to.be.equal(true)

    const btn_two = component.$$('.ui.button')[1]
    expect(btn_two.innerText.trim()).to.be.equal(modal.buttons[1].text)
    // expect(btn_two).to.be.not.equal(document.activeElement)

    const btn_three = component.$$('.ui.button')[2]
    expect(btn_three.innerText.trim()).to.be.equal(modal.buttons[2].text)
    // expect(isFocus(btn_three)).to.be.not.equal(false)
  })

  it('header', function () {
    const modal = {
      header: 'modal header'
    }
    mount({ modal: modal })
    component.showModal(element)
    this.clock.tick(510)
    expect(component.$('.dimmer').classList.contains('visible')).to.be.equal(true)

    const header = component.$('.ui.header')
    expect(header.classList.contains('icon')).to.be.equal(false)
    expect(header.innerText.trim()).to.be.equal(modal.header)
  })

  it('icon header', function () {
    const modal = {
      header: {
        icon: 'archive',
        text: 'modal header'
      }
    }
    mount({ modal })
    component.showModal(element)
    this.clock.tick(510)
    expect(component.$('.dimmer').classList.contains('visible')).to.be.equal(true)

    const header = component.$('.ui.header')
    expect(header.classList.contains('icon')).to.be.equal(true)
    expect(header.innerText.trim()).to.be.equal(modal.header.text)
  })

  it('image content', function () {
    element.innerHTML = `
        <div class="ui medium image">
          <img src="./images/avatar2/large/rachel.png" />
        </div>
        <div class="description">
          <div class="ui header">Default Profile Image</div>
          <p>We've found the following <a href="https://www.gravatar.com" target="_blank">gravatar</a> image associated with
            your e-mail address.</p>
          <p>Is it okay to use this photo?</p>
        </div>
    `
    mount()
    component.showModal(element)
    this.clock.tick(510)
    expect(component.$('.dimmer').classList.contains('visible')).to.be.equal(true)

    const content = component.$('.content')
    expect(content.classList.contains('image')).to.be.equal(true)
  })

  it('full screen', function () {
    mount({ class: 'fullscreen' })
    component.showModal(element)
    this.clock.tick(510)
    expect(component.$('.dimmer').classList.contains('visible')).to.be.equal(true)

    expect(component.$$('i.close.icon').length).to.be.equal(1)

    component.$('i.close.icon').click()
    spyOnHide.should.have.been.calledOnce
    this.clock.tick(310)
    expect(component.$('.dimmer').classList.contains('visible')).to.be.equal(false)
  })
})
