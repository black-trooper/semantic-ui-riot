import * as riot from 'riot'
import { init } from '../../helpers/'
import RadioGroupComponent from '../../../tags/radio/su-radio-group.tag'
import RadioComponent from '../../../tags/radio/su-radio.tag'

describe('su-radio-group-undefined', function () {
  let element, component
  init(riot)

  beforeEach(function () {
    riot.register('su-radio-group', RadioGroupComponent)
    riot.register('su-radio', RadioComponent)
    element = document.createElement('su-radio-group')
    const child1 = document.createElement('su-radio')
    const child2 = document.createElement('su-radio')
    element.appendChild(child1)
    element.appendChild(child2)

    component = riot.mount(element, {
      value: 1,
    })[0]
    riot.mount(child1)
    riot.mount(child2)
  })

  afterEach(function () {
    component.unmount()
    riot.unregister('su-radio')
    riot.unregister('su-radio-group')
  })

  it('is mounted', function () {
    expect(component).to.be.ok
  })
})
