import * as riot from 'riot'
import { init } from '../../helpers/'
import TargetComponent from '../../../dist/tags/dropdown/su-dropdown.js'

describe('su-dropdown.option', function () {
  let element, component
  let spyOnOpen, spyOnClose, spyOnSelect, spyOnChange, spyOnBlur
  init(riot)

  const mount = opts => {
    opts.items = items
    opts.onopen = spyOnOpen
    opts.onclose = spyOnClose
    opts.onselect = spyOnSelect
    opts.onchange = spyOnChange
    opts.onblur = spyOnBlur

    component = riot.mount(element, opts)[0]
  }

  let items = [
    {
      label: 'Gender',
      value: null,
      default: true
    },
    {
      label: 'Male',
      value: 1
    },
    {
      label: 'Female',
      value: 2
    },
  ]

  beforeEach(function () {
    spyOnOpen = sinon.spy()
    spyOnClose = sinon.spy()
    spyOnSelect = sinon.spy()
    spyOnChange = sinon.spy()
    spyOnBlur = sinon.spy()
    riot.register('su-dropdown', TargetComponent)
    element = document.createElement('su-dropdown')
    this.clock = sinon.useFakeTimers()
  })

  afterEach(function () {
    this.clock.restore()
    component.unmount()
    riot.unregister('su-dropdown')
  })

  it('upward', function () {
    mount({
      direction: 'upward'
    })

    expect(component.$('.menu').classList.contains('visible')).to.equal(false)
    expect(element.classList.contains('upward')).to.equal(false)

    element.click()
    this.clock.tick(310)
    expect(component.$('.menu').classList.contains('visible')).to.equal(true)
    expect(element.classList.contains('upward')).to.equal(true)
    expect(spyOnOpen).to.have.been.calledOnce

    element.click()
    this.clock.tick(310)
    expect(component.$('.menu').classList.contains('visible')).to.equal(false)
    expect(element.classList.contains('upward')).to.equal(true)
    expect(spyOnClose).to.have.been.calledOnce
  })

  it('downward', function () {
    mount({
      direction: 'downward'
    })

    expect(component.$('.menu').classList.contains('visible')).to.equal(false)
    expect(element.classList.contains('upward')).to.equal(false)

    element.click()
    this.clock.tick(310)
    expect(component.$('.menu').classList.contains('visible')).to.equal(true)
    expect(element.classList.contains('upward')).to.equal(false)
    expect(spyOnOpen).to.have.been.calledOnce

    element.click()
    this.clock.tick(310)
    expect(component.$('.menu').classList.contains('visible')).to.equal(false)
    expect(element.classList.contains('upward')).to.equal(false)
    expect(spyOnClose).to.have.been.calledOnce
  })
})
