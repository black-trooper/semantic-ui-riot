import * as riot from 'riot'
import { init } from '../../helpers/'
import CheckboxGroupComponent from '../../../dist/tags/checkbox/su-checkbox-group.js'
import CheckboxComponent from '../../../dist/tags/checkbox/su-checkbox.js'

describe('su-checkbox-group-single', function () {
  let element, component
  let spyOnChange = sinon.spy()
  init(riot)

  beforeEach(function () {
    riot.register('su-checkbox-group', CheckboxGroupComponent)
    riot.register('su-checkbox', CheckboxComponent)
    element = document.createElement('su-checkbox-group')
    const child1 = document.createElement('su-checkbox')
    child1.setAttribute('value', '1')
    element.appendChild(child1)

    component = riot.mount(element, {
      'onchange': spyOnChange
    })[0]
    riot.mount(child1)
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
    expect(component.$('su-checkbox').getAttribute("checked")).to.be.not.ok

    component.update({ value: '1' })
    expect(component.$('su-checkbox').getAttribute("checked")).to.be.ok

    component.update({ value: '2' })
    expect(component.$('su-checkbox').getAttribute("checked")).to.be.not.ok
  })

  it('click checkbox', function () {
    expect(component.$('su-checkbox').getAttribute("checked")).to.be.not.ok

    component.$('su-checkbox input').click()
    expect(component.$('su-checkbox').getAttribute("checked")).to.be.ok
    spyOnChange.should.have.been.calledOnce
  })
})
