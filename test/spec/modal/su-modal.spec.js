import * as riot from 'riot'
import { init, compile } from '../../helpers/'
import TargetComponent from '../../../dist/tags/modal/su-modal.js'

describe('su-modal', function () {
  let element, component
  let spyOnShow, spyOnHide, spyOnToggleSize, spyOnToggleMinimize
  init(riot)

  const mount = option => {
    const AppComponent = compile(`
      <app>
        <su-modal class="${option.class}" modal="{ modal }" show="{ show }" onshow="{ props.onshow }" onhide="{ props.onhide }" ontoggleSize="{ props.ontogglesize }" ontoggleMinimize="{ props.ontoggleminimize }">
          ${option.html}
        </su-modal>
        <script>
          export default {
            modal: ${JSON.stringify(option.modal)},
            show: true
          }
        </script>
      </app>
    `)
    riot.register('app', AppComponent)
    component = riot.mount(element, {
      'onshow': spyOnShow,
      'onhide': spyOnHide,
      'ontogglesize': spyOnToggleSize,
      'ontoggleminimize': spyOnToggleMinimize,
    })[0]
  }

  // TODO: isFocus
  // const isFocus = elem => {
  //   return elem === document.activeElement
  //     && (!document.hasFocus || document.hasFocus())
  //     && !!(elem.type || elem.href || ~elem.tabIndex);
  // }

  beforeEach(function () {
    spyOnShow = sinon.spy()
    spyOnHide = sinon.spy()
    spyOnToggleSize = sinon.spy()
    spyOnToggleMinimize = sinon.spy()
    element = document.createElement('app')
    riot.register('su-modal', TargetComponent)
    this.clock = sinon.useFakeTimers()
  })

  afterEach(function () {
    this.clock.restore()
    riot.unregister('su-modal')
    riot.unregister('app')
  })

  it('is mounted', function () {
    mount({})
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
    expect(component.$('.dimmer').classList.contains('visible')).to.equal(false)

    component.show = true
    component.update()
    expect(spyOnShow).to.have.been.calledOnce
    this.clock.tick(510)
    expect(component.$('.dimmer').classList.contains('visible')).to.equal(true)

    component.$('.ui.button').click()
    expect(spyOnHide).to.have.been.calledOnce
    this.clock.tick(310)
    expect(component.$('.dimmer').classList.contains('visible')).to.equal(false)
  })

  it('dimmer close', function () {
    mount({})
    expect(component.$('.dimmer').classList.contains('visible')).to.equal(false)

    component.show = true
    component.update()
    expect(spyOnShow).to.have.been.calledOnce
    this.clock.tick(510)
    expect(component.$('.dimmer').classList.contains('visible')).to.equal(true)

    component.$('.dimmer').click()
    expect(spyOnHide).to.have.been.calledOnce
    this.clock.tick(310)
    expect(component.$('.dimmer').classList.contains('visible')).to.equal(false)
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
    expect(component.$('.dimmer').classList.contains('visible')).to.equal(false)

    component.show = true
    component.update()
    component.show = true
    component.update()
    expect(spyOnShow).to.have.been.calledOnce
    this.clock.tick(510)
    expect(component.$('.dimmer').classList.contains('visible')).to.equal(true)

    component.$('.ui.button').click()
    component.$('.ui.button').click()
    expect(spyOnHide).to.have.been.calledOnce
    this.clock.tick(310)
    expect(component.$('.dimmer').classList.contains('visible')).to.equal(false)
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
    component.show = true
    component.update()
    this.clock.tick(510)
    expect(component.$('.dimmer').classList.contains('visible')).to.equal(true)

    const btn_ok = component.$('.ui.button')
    expect(btn_ok.classList.contains('labeled')).to.equal(true)
    expect(btn_ok.classList.contains('icon')).to.equal(true)
    expect(btn_ok.querySelectorAll('.icon')).to.have.lengthOf(1)
    expect(btn_ok.innerText.trim()).to.equal(modal.buttons[0].text)
    expect(btn_ok.classList.contains(modal.buttons[0].type)).to.equal(true)
    expect(btn_ok.querySelectorAll(`.${modal.buttons[0].icon}`)).to.have.lengthOf(1)
    // TODO: focus
    // expect(btn_ok).to.be.not.equal(document.activeElement)

    const btn_cancel = component.$$('.ui.button')[1]
    expect(btn_cancel.classList.contains('labeled')).to.equal(false)
    expect(btn_cancel.classList.contains('icon')).to.equal(false)
    expect(btn_cancel.querySelectorAll('.icon')).to.have.lengthOf(0)
    expect(btn_cancel.innerText.trim()).to.equal(modal.buttons[1].text)
    // TODO: focus
    // expect(btn_cancel).to.be.not.equal(document.activeElement)
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
    component.show = true
    component.update()
    this.clock.tick(510)
    expect(component.$('.dimmer').classList.contains('visible')).to.equal(true)

    const btn_one = component.$('.ui.button')
    expect(btn_one.innerText.trim()).to.equal(modal.buttons[0].text)
    // TODO: focus
    // expect(isFocus(btn_one)).to.equal(true)

    const btn_two = component.$$('.ui.button')[1]
    expect(btn_two.innerText.trim()).to.equal(modal.buttons[1].text)
    // TODO: focus
    // expect(btn_two).to.be.not.equal(document.activeElement)

    const btn_three = component.$$('.ui.button')[2]
    expect(btn_three.innerText.trim()).to.equal(modal.buttons[2].text)
    // TODO: focus
    // expect(isFocus(btn_three)).to.be.not.equal(false)
  })

  it('header', function () {
    const modal = {
      header: 'modal header'
    }
    mount({ modal })
    component.show = true
    component.update()
    this.clock.tick(510)
    expect(component.$('.dimmer').classList.contains('visible')).to.equal(true)

    const header = component.$('.ui.header')
    expect(header.classList.contains('icon')).to.equal(false)
    expect(header.innerText.trim()).to.equal(modal.header)
  })

  it('icon header', function () {
    const modal = {
      header: {
        icon: 'archive',
        text: 'modal header'
      }
    }
    mount({ modal })
    component.show = true
    component.update()
    this.clock.tick(510)
    expect(component.$('.dimmer').classList.contains('visible')).to.equal(true)

    const header = component.$('.ui.header')
    expect(header.classList.contains('icon')).to.equal(true)
    expect(header.innerText.trim()).to.equal(modal.header.text)
  })

  it('image content', function () {
    const html = `
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
    mount({ html })
    component.show = true
    component.update()
    this.clock.tick(510)
    expect(component.$('.dimmer').classList.contains('visible')).to.equal(true)

    const content = component.$('.content')
    expect(content.classList.contains('image')).to.equal(true)
    expect(content.classList.contains('scrolling')).to.equal(false)
  })

  it('scrolling content', function () {
    mount({ class: 'scrolling' })
    component.show = true
    component.update()
    this.clock.tick(510)
    expect(component.$('.dimmer').classList.contains('visible')).to.equal(true)

    const content = component.$('.content')
    expect(content.classList.contains('image')).to.equal(false)
    expect(content.classList.contains('scrolling')).to.equal(true)
  })

  it('full screen', function () {
    mount({ class: 'fullscreen' })
    component.show = true
    component.update()
    this.clock.tick(510)
    expect(component.$('.dimmer').classList.contains('visible')).to.equal(true)

    expect(component.$$('i.close.icon')).to.have.lengthOf(1)

    component.$('i.close.icon').click()
    expect(spyOnHide).to.have.been.calledOnce
    this.clock.tick(310)
    expect(component.$('.dimmer').classList.contains('visible')).to.equal(false)
  })

  it('modeless', function () {
    const modal = {
      closable: false,
      modeless: true,
      buttons: [{
        text: 'Ok',
        closable: true
      }]
    }
    mount({ modal: modal })
    component.show = true
    component.update()
    this.clock.tick(510)
    expect(component.$$('i.close.icon')).to.have.lengthOf(0)

    expect(component.$('.dimmer').classList.contains('visible')).to.equal(true)
    expect(component.$$('i.minimize.icon')).to.have.lengthOf(1)
    expect(component.$$('i.restore.icon')).to.have.lengthOf(1)
    expect(component.$$('i.maximize.icon')).to.have.lengthOf(0)
    expect(component.$$('a.label.minimized')).to.have.lengthOf(0)

    component.$('i.restore.icon').click()
    expect(spyOnToggleSize).to.have.been.calledOnce
    this.clock.tick(310)
    expect(component.$('.dimmer').classList.contains('visible')).to.equal(true)
    expect(component.$$('i.minimize.icon')).to.have.lengthOf(1)
    expect(component.$$('i.restore.icon')).to.have.lengthOf(0)
    expect(component.$$('i.maximize.icon')).to.have.lengthOf(1)
    expect(component.$$('a.label.minimized')).to.have.lengthOf(0)

    component.$('i.maximize.icon').click()
    expect(spyOnToggleSize).to.have.been.calledTwice
    this.clock.tick(310)
    expect(component.$('.dimmer').classList.contains('visible')).to.equal(true)
    expect(component.$$('i.minimize.icon')).to.have.lengthOf(1)
    expect(component.$$('i.restore.icon')).to.have.lengthOf(1)
    expect(component.$$('i.maximize.icon')).to.have.lengthOf(0)
    expect(component.$$('a.label.minimized')).to.have.lengthOf(0)

    component.$('i.minimize.icon').click()
    expect(spyOnToggleMinimize).to.have.been.calledOnce
    this.clock.tick(310)
    expect(component.$('.dimmer').classList.contains('visible')).to.equal(false)
    expect(component.$$('i.minimize.icon')).to.have.lengthOf(1)
    expect(component.$$('i.restore.icon')).to.have.lengthOf(1)
    expect(component.$$('i.maximize.icon')).to.have.lengthOf(0)
    expect(component.$$('a.label.unminimize')).to.have.lengthOf(1)

    component.$('a.label.unminimize').click()
    expect(spyOnToggleMinimize).to.have.been.calledTwice
    this.clock.tick(310)
    expect(component.$('.dimmer').classList.contains('visible')).to.equal(true)
    expect(component.$$('i.minimize.icon')).to.have.lengthOf(1)
    expect(component.$$('i.restore.icon')).to.have.lengthOf(1)
    expect(component.$$('i.maximize.icon')).to.have.lengthOf(0)
    expect(component.$$('a.label.unminimize')).to.have.lengthOf(0)

    component.$('i.restore.icon').click()
    this.clock.tick(310)
    expect(component.$('.dimmer').classList.contains('visible')).to.equal(true)

    component.$('.ui.button').click()
    this.clock.tick(310)
    expect(component.$('.dimmer').classList.contains('visible')).to.equal(false)
  })

  it('modeless class option', function () {
    const modal = {
      closable: false,
      modeless: {
        class: 'tiny scrolling'
      }
    }
    mount({ modal: modal })
    component.show = true
    component.update()
    this.clock.tick(510)
    expect(component.$$('i.close.icon')).to.have.lengthOf(0)

    expect(component.$('.dimmer').classList.contains('visible')).to.equal(true)
    expect(component.$$('i.minimize.icon')).to.have.lengthOf(1)
    expect(component.$$('i.restore.icon')).to.have.lengthOf(1)
    expect(component.$$('i.maximize.icon')).to.have.lengthOf(0)
    expect(component.$$('a.label.minimized')).to.have.lengthOf(0)
    expect(component.$('.ui.modal').classList.contains('tiny')).to.equal(false)
    expect(component.$('.content').classList.contains('scrolling')).to.equal(false)

    component.$('i.restore.icon').click()
    expect(spyOnToggleSize).to.have.been.calledOnce
    this.clock.tick(310)
    expect(component.$('.dimmer').classList.contains('visible')).to.equal(true)
    expect(component.$$('i.minimize.icon')).to.have.lengthOf(1)
    expect(component.$$('i.restore.icon')).to.have.lengthOf(0)
    expect(component.$$('i.maximize.icon')).to.have.lengthOf(1)
    expect(component.$$('a.label.minimized')).to.have.lengthOf(0)

    expect(component.$('.ui.modal').classList.contains('tiny')).to.equal(true)
    expect(component.$('.content').classList.contains('scrolling')).to.equal(true)
  })

  it('modeless resize option', function () {
    const modal = {
      closable: false,
      modeless: {
        minimize: false,
        resize: false,
      }
    }
    mount({ modal: modal })
    component.show = true
    component.update()
    this.clock.tick(510)
    expect(component.$$('i.close.icon')).to.have.lengthOf(0)

    expect(component.$('.dimmer').classList.contains('visible')).to.equal(true)
    expect(component.$$('i.minimize.icon')).to.have.lengthOf(0)
    expect(component.$$('i.restore.icon')).to.have.lengthOf(0)
    expect(component.$$('i.maximize.icon')).to.have.lengthOf(0)
    expect(component.$$('a.label.minimized')).to.have.lengthOf(0)
  })

  it('modeless with closable', function () {
    const modal = {}
    mount({
      class: 'modeless',
      modal: modal
    })
    component.show = true
    component.update()
    this.clock.tick(510)
    expect(component.$$('i.close.icon')).to.have.lengthOf(1)

    expect(component.$('.dimmer').classList.contains('visible')).to.equal(true)
    expect(component.$$('i.minimize.icon')).to.have.lengthOf(0)
    expect(component.$$('i.restore.icon')).to.have.lengthOf(0)
    expect(component.$$('i.maximize.icon')).to.have.lengthOf(0)
    expect(component.$$('a.label.minimized')).to.have.lengthOf(0)
  })
})

