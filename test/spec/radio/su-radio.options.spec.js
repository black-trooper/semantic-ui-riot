import * as riot from 'riot'
import { init } from '../../helpers/'
import TargetComponent from '../../../dist/tags/radio/su-radio.js'

describe('su-radio-options', function () {
  let element, component
  let spyOnClick = sinon.spy()
  init(riot)

  let mount = opts => {
    const option = Object.assign({
      'onclick': spyOnClick
    }, opts)
    component = riot.mount(element, option)[0]
  }

  beforeEach(function () {
    riot.register('su-radio', TargetComponent)
    element = document.createElement('su-radio')
  })

  afterEach(function () {
    spyOnClick.reset()
    component.unmount()
    riot.unregister('su-radio')
  })

  it('is mounted', function () {
    mount()
    expect(component).to.be.ok
  })

  it('checked', function () {
    mount({ checked: true })
    expect(component.$('input').checked).to.be.ok
  })

  it('readonly', function () {
    mount({ class: 'read-only' })
    expect(component.$('input').checked).to.be.not.ok

    component.$('input').click()
    expect(component.$('input').checked).to.be.not.ok
    expect(spyOnClick).to.have.been.not.called
  })

  it('disabled', function () {
    mount({ class: 'disabled' })
    expect(component.$('input').checked).to.be.not.ok

    component.$('input').click()
    expect(component.$('input').checked).to.be.not.ok
    expect(spyOnClick).to.have.been.not.called
  })

  it('update checked', function () {
    mount({ checked: true })
    expect(component.$('input').checked).to.be.ok

    component.update({ checked: false })
    expect(component.$('input').checked).to.be.not.ok

    component.update({ checked: true })
    expect(component.$('input').checked).to.be.ok

    expect(spyOnClick).to.have.been.not.called
  })
})
