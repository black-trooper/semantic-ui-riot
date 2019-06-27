import * as riot from 'riot'
import { init, compile, fireEvent } from '../../helpers/'
import TargetComponent from '../../../dist/tags/toast/su-toast.js'
import TargetItemComponent from '../../../dist/tags/toast/su-toast-item.js'

describe('su-toast-options', function () {
  let element, component
  init(riot)

  const mount = opts => {
    element = document.createElement('app')
    riot.register('su-toast', TargetComponent)
    riot.register('su-toast-item', TargetItemComponent)
    const AppComponent = compile(`
      <app>
        <su-toast position="{ props.position }">
        </su-toast>
      </app>`)
    riot.register('app', AppComponent)
    component = riot.mount(element, opts)[0]
  }

  beforeEach(function () {
    this.clock = sinon.useFakeTimers()
  })

  afterEach(function () {
    riot.unregister('su-toast-item')
    riot.unregister('su-toast')
    riot.unregister('app')
    this.clock.restore()
  })

  it('is mounted', function () {
    mount()
    expect(component).to.be.ok
  })

  it('no option', function () {
    mount()
    expect(component.$('su-toast').classList.contains('bottom')).to.equal(true)
    expect(component.$('su-toast').classList.contains('right')).to.equal(true)

    component.suToast('hello')
    expect(component.$('su-toast-item > div').classList.contains('right')).to.equal(true)
    expect(component.$('su-toast .progress.top')).to.be.undefined
  })

  it('option', function () {
    mount({
      'position': 'top left'
    })
    expect(component.$('su-toast').classList.contains('top')).to.equal(true)
    expect(component.$('su-toast').classList.contains('left')).to.equal(true)

    component.suToast({ message: 'hello', progress: 'top' })
    expect(component.$('su-toast-item > div').classList.contains('right')).to.equal(false)
    expect(component.$('su-toast .progress.top')).to.be.not.undefined
  })
})
