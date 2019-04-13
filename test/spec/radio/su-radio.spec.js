import * as riot from 'riot'
import { init } from '../../helpers/'
import TargetComponent from '../../../tags/radio/su-radio.tag'

describe('su-radio', function () {
  let element, component
  let spyOnClick = sinon.spy()
  init(riot)

  beforeEach(function () {
    riot.register('su-radio', TargetComponent)
    element = document.createElement('su-radio')
    component = riot.mount(element, {
      'onclick': spyOnClick
    })[0]
  })

  afterEach(function () {
    spyOnClick.reset()
    component.unmount()
    riot.unregister('su-radio')
  })

  it('is mounted', function () {
    expect(component).to.be.ok
  })

  it('click checkbox', function () {
    expect(component.$('input').checked).to.be.not.ok

    component.$('input').click()
    expect(spyOnClick).to.have.been.calledOnce
    expect(component.$('input').checked).to.be.ok

    component.$('input').click()
    expect(spyOnClick).to.have.been.calledTwice
    expect(component.$('input').checked).to.be.ok
  })
})
