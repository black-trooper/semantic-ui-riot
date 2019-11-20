import * as riot from 'riot'
import { init } from '../../helpers/'
import TargetComponent from '../../../dist/tags/alert/su-alert.js'
import ModalComponent from '../../../dist/tags/modal/su-modal.js'

describe('su-alert', function () {
  let element, component
  init(riot)

  const mount = () => {
    component = riot.mount(element)[0]
  }

  beforeEach(function () {
    riot.register('su-alert', TargetComponent)
    riot.register('su-modal', ModalComponent)
    element = document.createElement('su-alert')
    this.clock = sinon.useFakeTimers()
  })

  afterEach(function () {
    this.clock.restore()
    riot.unregister('su-modal')
    riot.unregister('su-alert')
  })

  it('is mounted', function () {
    mount()
    expect(component).to.be.ok
  })

  it('opens/closes alert', function () {
    mount()
    expect(component.$('.dimmer').classList.contains('visible')).to.equal(false)

    component.suAlert('hello')
    expect(component.$('p').innerText).to.equal('hello')
    this.clock.tick(510)
    expect(component.$('.dimmer').classList.contains('visible')).to.equal(true)

    const btn_one = component.$('.ui.button')
    expect(btn_one.innerText.trim()).to.equal('Close')
    // TODO: focus
    // expect(btn_one).to.be.not.equal(document.activeElement)

    component.$('su-modal').click()
    this.clock.tick(310)
    expect(component.$('.dimmer').classList.contains('visible')).to.equal(true)

    btn_one.click()
    this.clock.tick(310)
    expect(component.$('.dimmer').classList.contains('visible')).to.equal(false)
  })

  it('title and messages', function () {
    mount()
    component.suAlert({ title: 'riot', message: ['hello!', 'hello!!'] })
    expect(component.$('.header').innerText.trim()).to.equal('riot')
    expect(component.$$('p')[0].innerText).to.equal('hello!')
    expect(component.$$('p')[1].innerText).to.equal('hello!!')
  })

  it('title only', function () {
    mount()
    component.suAlert({ title: 'riot' })
    expect(component.$('.header').innerText.trim()).to.equal('riot')
    expect(component.$('p').innerText).to.be.empty
  })

  it('messages only', function () {
    mount()
    component.suAlert({ message: ['hello!', 'hello!!'] })
    expect(component.$('.header')).to.undefined
    expect(component.$$('p')[0].innerText).to.equal('hello!')
    expect(component.$$('p')[1].innerText).to.equal('hello!!')
  })

  it('none message', function () {
    mount()
    component.suAlert()
    expect(component.$('.header')).to.undefined
    expect(component.$('p').innerText).to.empty
  })

  it('button name by opts', function () {
    mount()
    component.suAlert({
      button: {
        text: 'ok',
        default: true,
      }
    })
    expect(component.$('.header')).to.undefined
    expect(component.$('p').innerText).to.empty
    const btn_one = component.$('su-modal .ui.button')
    expect(btn_one.innerText.trim()).to.equal('ok')
    // TODO: focus
    // btn_one.is(':focus').to.equal(true)
  })

  it('button name by defaultOptions', function () {
    riot.install(function (_component) {
      _component.suDefaultOptions = {
        alert: {
          button: {
            text: 'Yes',
            default: true,
          }
        }
      }
    })

    mount()
    component.suAlert()
    const btn_one = component.$('su-modal .ui.button')
    expect(btn_one.innerText.trim()).to.equal('Yes')
    // TODO: focus
    // btn_one.is(':focus').to.equal(true)
  })
})
