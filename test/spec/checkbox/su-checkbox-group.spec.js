import * as riot from 'riot'
import { init } from '../../helpers/'
import CheckboxGroupComponent from '../../../dist/tags/checkbox/su-checkbox-group.js'
import CheckboxComponent from '../../../dist/tags/checkbox/su-checkbox.js'

describe('su-checkbox-group', function () {
  let element, component
  let spyOnChange = sinon.spy()
  init(riot)

  beforeEach(function () {
    riot.register('su-checkbox-group', CheckboxGroupComponent)
    riot.register('su-checkbox', CheckboxComponent)
    element = document.createElement('su-checkbox-group')
    const child1 = document.createElement('su-checkbox')
    child1.setAttribute('value', '1')
    const child2 = document.createElement('su-checkbox')
    child2.setAttribute('value', '2')
    element.appendChild(child1)
    element.appendChild(child2)

    component = riot.mount(element, {
      'onchange': spyOnChange
    })[0]
    riot.mount(child1)
    riot.mount(child2)
  })

  afterEach(function () {
    spyOnChange.reset()
    component.unmount()
    riot.unregister('su-checkbox')
    riot.unregister('su-checkbox-group')
  })

  it('is mounted', function () {
    expect(component).to.be.ok
  })

  it('update value', function () {
    expect(component.$$('su-checkbox')[0].getAttribute("checked")).to.be.not.ok
    expect(component.$$('su-checkbox')[1].getAttribute("checked")).to.be.not.ok

    component.update({ value: '1' })
    expect(component.$$('su-checkbox')[0].getAttribute("checked")).to.be.ok
    expect(component.$$('su-checkbox')[1].getAttribute("checked")).to.be.not.ok
    spyOnChange.should.have.been.calledOnce

    component.update({ value: '2' })
    expect(component.$$('su-checkbox')[0].getAttribute("checked")).to.be.not.ok
    expect(component.$$('su-checkbox')[1].getAttribute("checked")).to.be.ok
    spyOnChange.should.have.been.calledTwice
  })

  it('update option', function () {
    expect(component.$$('su-checkbox')[0].getAttribute("checked")).to.be.not.ok
    expect(component.$$('su-checkbox')[1].getAttribute("checked")).to.be.not.ok

    element.setAttribute('value', '1')
    component.update()
    expect(component.$$('su-checkbox')[0].getAttribute("checked")).to.be.ok
    expect(component.$$('su-checkbox')[1].getAttribute("checked")).to.be.not.ok
    spyOnChange.should.have.been.calledOnce

    element.setAttribute('value', '2')
    component.update()
    expect(component.$$('su-checkbox')[0].getAttribute("checked")).to.be.not.ok
    expect(component.$$('su-checkbox')[1].getAttribute("checked")).to.be.ok
    spyOnChange.should.have.been.calledTwice

    element.setAttribute('value', 1)
    component.update()
    expect(component.$$('su-checkbox')[0].getAttribute("checked")).to.be.ok
    expect(component.$$('su-checkbox')[1].getAttribute("checked")).to.be.not.ok

    element.setAttribute('value', 2)
    component.update()
    expect(component.$$('su-checkbox')[0].getAttribute("checked")).to.be.not.ok
    expect(component.$$('su-checkbox')[1].getAttribute("checked")).to.be.ok

    element.setAttribute('value', '1, 2')
    component.update()
    expect(component.$$('su-checkbox')[0].getAttribute("checked")).to.be.ok
    expect(component.$$('su-checkbox')[1].getAttribute("checked")).to.be.ok

    element.setAttribute('value', [1, 2])
    component.update()
    expect(component.$$('su-checkbox')[0].getAttribute("checked")).to.be.ok
    expect(component.$$('su-checkbox')[1].getAttribute("checked")).to.be.ok
  })

  it('click checkbox', function () {
    expect(component.$$('su-checkbox')[0].getAttribute("checked")).to.be.not.ok
    expect(component.$$('su-checkbox')[1].getAttribute("checked")).to.be.not.ok

    component.$$('su-checkbox input')[0].click()
    expect(component.$$('su-checkbox')[0].getAttribute("checked")).to.be.ok
    expect(component.$$('su-checkbox')[1].getAttribute("checked")).to.be.not.ok
    spyOnChange.should.have.been.calledOnce

    component.$$('su-checkbox input')[1].click()
    expect(component.$$('su-checkbox')[0].getAttribute("checked")).to.be.ok
    expect(component.$$('su-checkbox')[1].getAttribute("checked")).to.be.ok
    spyOnChange.should.have.been.calledTwice
  })

  it('reset value', function () {
    expect(component.root.value).to.be.undefined
    expect(component.root.getAttribute('changed')).to.be.not.ok

    component.$$('su-checkbox input')[0].click()
    expect(component.root.value[0]).to.equal(component.$('su-checkbox').getAttribute("value"))
    expect(component.root.getAttribute('changed')).to.be.ok

    component.obs.trigger(`${component.root.id}-reset`)
    expect(component.root.value).to.be.undefined
    expect(component.root.getAttribute('changed')).to.be.not.ok
  })
})
