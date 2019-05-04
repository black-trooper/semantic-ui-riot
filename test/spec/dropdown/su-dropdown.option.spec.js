import * as riot from 'riot'
import { init } from '../../helpers/'
import TargetComponent from '../../../dist/tags/dropdown/su-dropdown.js'

describe('su-dropdown.option', function () {
  let element, component
  let spyOnOpen = sinon.spy()
  let spyOnClose = sinon.spy()
  let spyOnSelect = sinon.spy()
  let spyOnChange = sinon.spy()
  let spyOnBlur = sinon.spy()
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
    riot.register('su-dropdown', TargetComponent)
    element = document.createElement('su-dropdown')
    this.clock = sinon.useFakeTimers()
  })

  afterEach(function () {
    spyOnOpen.reset()
    spyOnClose.reset()
    spyOnSelect.reset()
    spyOnChange.reset()
    spyOnBlur.reset()
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
    spyOnOpen.should.have.been.calledOnce

    element.click()
    this.clock.tick(310)
    expect(component.$('.menu').classList.contains('visible')).to.equal(false)
    expect(element.classList.contains('upward')).to.equal(true)
    spyOnClose.should.have.been.calledOnce
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
    spyOnOpen.should.have.been.calledOnce

    element.click()
    this.clock.tick(310)
    expect(component.$('.menu').classList.contains('visible')).to.equal(false)
    expect(element.classList.contains('upward')).to.equal(false)
    spyOnClose.should.have.been.calledOnce
  })
})
