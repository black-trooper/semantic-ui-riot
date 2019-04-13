import * as riot from 'riot'
import { init } from '../../helpers/'
import RadioGroupComponent from '../../../tags/radio/su-radio-group.tag'
import RadioComponent from '../../../tags/radio/su-radio.tag'

describe('su-radio-group-single', function () {
  let element, component
  init(riot)

  beforeEach(function () {
    riot.register('su-radio-group', RadioGroupComponent)
    riot.register('su-radio', RadioComponent)
    element = document.createElement('su-radio-group')
    const child1 = document.createElement('su-radio')
    child1.setAttribute('value', '1')
    element.appendChild(child1)

    component = riot.mount(element)[0]
    riot.mount(child1)
  })

  afterEach(function () {
    component.unmount()
    riot.unregister('su-radio')
    riot.unregister('su-radio-group')
  })

  it('is mounted', function () {
    expect(component).to.be.ok
  })

  it('update value', function () {
    expect(component.$('su-radio').checked).to.be.not.ok

    component.update({ value: '1' })
    expect(component.$('su-radio').checked).to.be.ok

    component.update({ value: '2' })
    expect(component.$('su-radio').checked).to.be.not.ok
  })

  it('update option', function () {
    expect(component.$('su-radio').checked).to.be.not.ok

    element.setAttribute('value', '1')
    component.update()
    expect(component.$('su-radio').checked).to.be.ok

    element.setAttribute('value', '2')
    component.update()
    expect(component.$('su-radio').checked).to.be.not.ok
  })
})
