import * as riot from 'riot'
import { init } from '../../helpers/'
import RadioGroupComponent from '../../../dist/tags/radio/su-radio-group.js'
import RadioComponent from '../../../dist/tags/radio/su-radio.js'

describe('su-radio-group', function () {
  let element, component
  let spyOnChange = sinon.spy()
  init(riot)

  beforeEach(function () {
    riot.register('su-radio-group', RadioGroupComponent)
    riot.register('su-radio', RadioComponent)
    element = document.createElement('su-radio-group')
    const child1 = document.createElement('su-radio')
    child1.setAttribute('value', '1')
    const child2 = document.createElement('su-radio')
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
    riot.unregister('su-radio')
    riot.unregister('su-radio-group')
  })

  it('is mounted', function () {
    expect(component).to.be.ok
  })

  it('update value', function () {
    expect(component.$$('su-radio')[0].checked).to.be.not.ok
    expect(component.$$('su-radio')[1].checked).to.be.not.ok

    component.update({ value: '1' })
    expect(component.$$('su-radio')[0].checked).to.be.ok
    expect(component.$$('su-radio')[1].checked).to.be.not.ok
    spyOnChange.should.have.been.calledOnce

    component.update({ value: '2' })
    expect(component.$$('su-radio')[0].checked).to.be.not.ok
    expect(component.$$('su-radio')[1].checked).to.be.ok
    spyOnChange.should.have.been.calledTwice
  })

  it('update option', function () {
    expect(component.$$('su-radio')[0].checked).to.be.not.ok
    expect(component.$$('su-radio')[1].checked).to.be.not.ok

    element.setAttribute('value', '1')
    component.update()
    expect(component.$$('su-radio')[0].checked).to.be.ok
    expect(component.$$('su-radio')[1].checked).to.be.not.ok
    spyOnChange.should.have.been.calledOnce

    element.setAttribute('value', '2')
    component.update()
    expect(component.$$('su-radio')[0].checked).to.be.not.ok
    expect(component.$$('su-radio')[1].checked).to.be.ok
    spyOnChange.should.have.been.calledTwice
  })

  it('click radio', function () {
    expect(component.$$('su-radio')[0].checked).to.be.not.ok
    expect(component.$$('su-radio')[1].checked).to.be.not.ok

    component.$$('su-radio input')[0].click()
    expect(component.$$('su-radio')[0].checked).to.be.ok
    expect(component.$$('su-radio')[1].checked).to.be.not.ok
    spyOnChange.should.have.been.calledOnce

    component.$$('su-radio input')[1].click()
    expect(component.$$('su-radio')[0].checked).to.be.not.ok
    expect(component.$$('su-radio')[1].checked).to.be.ok
    spyOnChange.should.have.been.calledTwice
  })

  it('reset value', function () {
    expect(element.value).to.be.undefined
    expect(element.getAttribute("changed")).to.be.not.ok

    component.$$('su-radio input')[0].click()
    expect(element.value).to.equal(component.$$('su-radio')[0].getAttribute("value"))
    expect(element.getAttribute("changed")).to.be.ok

    component.obs.trigger(`${element.id}-reset`)
    expect(element.value).to.be.undefined
    expect(element.getAttribute("changed")).to.be.not.ok
  })
})
