import * as riot from 'riot'
import { init } from '../../helpers/'
import TargetComponent from '../../../dist/tags/checkbox/su-checkbox.js'

describe('su-checkbox', function () {
  let element, component
  let spyOnClick = sinon.spy()
  init(riot)

  beforeEach(function () {
    riot.register('su-checkbox', TargetComponent)
    element = document.createElement('su-checkbox')
    component = riot.mount(element, {
      'onclick': spyOnClick
    })[0]
  })

  afterEach(function () {
    spyOnClick.reset()
    component.unmount()
    riot.unregister('su-checkbox')
  })

  it('is mounted', function () {
    expect(component).to.be.ok
  })

  it('click checkbox', function () {
    expect(component.state.checked).to.be.equal(false)
    expect(element.getAttribute("checked")).to.be.not.ok

    component.$('input').click()
    expect(spyOnClick).to.have.been.calledOnce
    expect(component.state.checked).to.be.equal(true)
    expect(element.getAttribute("checked")).to.be.ok

    component.$('input').click()
    expect(spyOnClick).to.have.been.calledTwice
    expect(component.state.checked).to.be.equal(false)
    expect(element.getAttribute("checked")).to.be.not.ok
  })

  it('update states', function () {
    expect(component.state.checked).to.be.equal(false)
    expect(element.getAttribute("checked")).to.be.not.ok

    component.update({ checked: true })
    expect(component.state.checked).to.be.equal(true)
    expect(element.getAttribute("checked")).to.be.ok

    component.update({ checked: false })
    expect(component.state.checked).to.be.equal(false)
    expect(element.getAttribute("checked")).to.be.not.ok

    expect(spyOnClick).to.have.been.not.called
  })

  it('update props', function () {
    expect(component.state.checked).to.be.equal(false)
    expect(element.getAttribute("checked")).to.be.not.ok

    element.setAttribute('checked', 'true')
    component.update()
    expect(component.state.checked).to.be.equal(true)
    expect(element.getAttribute("checked")).to.be.ok

    element.setAttribute('checked', 'false')
    component.update()
    expect(component.state.checked).to.be.equal(false)
    expect(element.getAttribute("checked")).to.be.not.ok

    element.setAttribute('checked', true)
    component.update()
    expect(component.state.checked).to.be.equal(true)
    expect(element.getAttribute("checked")).to.be.ok

    element.setAttribute('checked', false)
    component.update()
    expect(component.state.checked).to.be.equal(false)
    expect(element.getAttribute("checked")).to.be.not.ok

    element.removeAttribute('checked')
    component.update()
    expect(component.state.checked).to.be.equal(false)
    expect(element.getAttribute("checked")).to.be.not.ok

    expect(spyOnClick).to.have.been.not.called
  })

  it('reset value', function () {
    expect(component.state.checked).to.be.not.ok
    expect(element.getAttribute("checked")).to.be.not.ok
    expect(component.state.defaultChecked).to.be.not.ok
    expect(element.getAttribute("changed")).to.be.not.ok
    expect(component.changed).to.be.not.ok

    component.$('input').click()
    expect(component.state.checked).to.be.ok
    expect(element.getAttribute("checked")).to.be.ok
    expect(component.state.defaultChecked).to.be.not.ok
    expect(element.getAttribute("changed")).to.be.ok
    expect(component.changed).to.be.ok

    component.reset()
    expect(component.state.checked).to.be.not.ok
    expect(element.getAttribute("checked")).to.be.not.ok
    expect(component.state.defaultChecked).to.be.not.ok
    expect(element.getAttribute("changed")).to.be.not.ok
    expect(component.changed).to.be.not.ok
  })
})
