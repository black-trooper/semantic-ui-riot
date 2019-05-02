import * as riot from 'riot'
import { init, fireEvent, fireKeyEvent, keys } from '../../helpers/'
import TargetComponent from '../../../dist/tags/dropdown/su-dropdown.js'

describe('su-dropdown', function () {
  let element, component
  let spyOnOpen = sinon.spy()
  let spyOnClose = sinon.spy()
  let spyOnSelect = sinon.spy()
  let spyOnChange = sinon.spy()
  let spyOnBlur = sinon.spy()
  init(riot)

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
    component = riot.mount(element, {
      'items': items,
      'onopen': spyOnOpen,
      'onclose': spyOnClose,
      'onselect': spyOnSelect,
      'onchange': spyOnChange,
      'onblur': spyOnBlur,
    })[0]
    this.clock = sinon.useFakeTimers()
  })

  afterEach(function () {
    this.clock.restore()
    spyOnOpen.reset()
    spyOnClose.reset()
    spyOnSelect.reset()
    spyOnChange.reset()
    spyOnBlur.reset()
    component.unmount()
    riot.unregister('su-dropdown')
  })

  it('is mounted', function () {
    expect(component).to.be.ok
  })

  it('has no items visible on load', function () {
    expect(component.$$('.menu .item')).to.have.lengthOf(0)
  })

  it('clicking dropdown opens/closes dropdown and triggers open/close event', function () {
    expect(component.$('.menu').classList.contains('visible')).to.equal(false)

    element.click()
    this.clock.tick(310)
    expect(component.$('.menu').classList.contains('visible')).to.equal(true)
    expect(spyOnOpen).calledOnce

    element.click()
    this.clock.tick(310)
    expect(component.$('.menu').classList.contains('visible')).to.equal(false)
    expect(spyOnClose).calledOnce
  })

  it('focusing/blurring dropdown opens/closes dropdown and triggers open/close event', function () {
    expect(component.$('.menu').classList.contains('visible')).to.equal(false)

    fireEvent(element, 'focus')
    this.clock.tick(310)
    expect(component.$('.menu').classList.contains('visible')).to.equal(true)
    expect(spyOnOpen).calledOnce

    fireEvent(element, 'blur')
    this.clock.tick(310)
    expect(component.$('.menu').classList.contains('visible')).to.equal(false)
    expect(spyOnClose).calledOnce
    expect(spyOnBlur).calledOnce
  })

  it('clicking default item', function () {
    element.click()
    this.clock.tick(310)

    component.$('.item').click()
    expect(component.$('.text').innerText.trim()).to.equal(items[0].label)
    expect(component.$('.text').classList.contains('default')).to.equal(true)
    expect(spyOnSelect).calledOnce
    expect(spyOnChange).callCount(0)

    this.clock.tick(310)
    expect(component.$('.menu').classList.contains('visible')).to.equal(false)
    expect(spyOnClose).calledOnce

    expect(component.value).to.null
  })

  it('clicking item', function () {
    element.click()
    this.clock.tick(310)

    // fireEvent(component.$('.item:eq(1)')[0], 'mousedown')
    // fireEvent($('su-dropdown')[0], 'blur')
    // fireEvent(component.$('.item:eq(1)')[0], 'mouseup')
    component.$$('.item')[1].click()
    expect(component.$('.text').innerText.trim()).to.equal(items[1].label)
    expect(component.$('.text').classList.contains('default')).to.equal(false)
    expect(spyOnSelect).calledOnce
    expect(spyOnChange).calledOnce

    this.clock.tick(310)
    expect(component.$('.menu').classList.contains('visible')).to.equal(false)
    expect(spyOnClose).calledOnce

    expect(component.value).to.equal(items[1].value)
  })

  it('pressing enter key on item', function () {
    fireEvent(element, 'focus')
    this.clock.tick(310)

    fireKeyEvent(element, 'keydown', keys.downArrow)
    fireKeyEvent(element, 'keyup', keys.downArrow)
    fireKeyEvent(element, 'keydown', keys.downArrow)
    fireKeyEvent(element, 'keyup', keys.downArrow)
    fireKeyEvent(element, 'keyup', keys.enter)

    expect(component.$('.text').innerText.trim()).to.equal(items[1].label)
    expect(component.$('.text').classList.contains('default')).to.equal(false)
    expect(spyOnSelect).calledOnce
    expect(spyOnChange).calledOnce

    this.clock.tick(310)
    expect(component.$('.menu').classList.contains('visible')).to.equal(false)
    expect(spyOnClose).calledOnce

    expect(component.value).to.equal(items[1].value)
  })

  it('pressing key down will active item', function () {
    fireEvent(element, 'focus')
    this.clock.tick(310)

    fireKeyEvent(element, 'keydown', keys.downArrow)
    expect(component.$('.hover .text').innerText).to.equal(items[0].label)

    fireKeyEvent(element, 'keydown', keys.downArrow)
    expect(component.$('.hover .text').innerText).to.equal(items[1].label)

    fireKeyEvent(element, 'keydown', keys.downArrow)
    expect(component.$('.hover .text').innerText).to.equal(items[2].label)

    fireKeyEvent(element, 'keydown', keys.downArrow)
    expect(component.$('.hover .text').innerText).to.equal(items[2].label)

    fireKeyEvent(element, 'keydown', keys.upArrow)
    expect(component.$('.hover .text').innerText).to.equal(items[1].label)

    fireKeyEvent(element, 'keydown', keys.upArrow)
    expect(component.$('.hover .text').innerText).to.equal(items[0].label)

    fireKeyEvent(element, 'keydown', keys.upArrow)
    expect(component.$('.hover .text').innerText).to.equal(items[0].label)

    fireEvent(element, 'blur')
  })

  it('pressing escape key', function () {
    fireEvent(element, 'focus')
    this.clock.tick(310)

    fireKeyEvent(element, 'keydown', keys.escape)
    this.clock.tick(310)
    expect(component.$('.menu').classList.contains('visible')).to.equal(false)
    expect(spyOnClose).calledOnce
  })

  it('update value', function () {
    expect(component.value).to.be.null
    component.value = items[1].value
    component.update()
    component.value.should.deep.equal(items[1].value)
    component.label.should.deep.equal(items[1].label)
  })

  it('update item value', function () {
    component.$$('.item')[1].click()
    items[1].value = 'M'
    component.update()
    expect(component.value).to.be.null
  })

  // it('update items', function () {
  //   expect(component.$$('.menu .item')).to.have.lengthOf(3)

  //   element.setAttribute('items', [
  //     {
  //       label: 'Alphabet',
  //       value: null,
  //       default: true
  //     },
  //     {
  //       label: 'A to C',
  //       header: true
  //     },
  //     {
  //       label: 'a',
  //       value: 'a'
  //     },
  //     {
  //       label: 'b',
  //       value: 'b'
  //     },
  //     {
  //       label: 'c',
  //       value: 'c'
  //     },
  //   ])
  //   component.update()
  //   // fireEvent(element, 'focus')
  //   this.clock.tick(310)

  //   expect(component.$$('.menu .item')).to.have.lengthOf(4)
  //   component.$('.header').click()
  //   expect(spyOnSelect).callCount(0)
  //   expect(spyOnChange).callCount(0)
  // })

  it('reset value', function () {
    expect(component.value).to.be.null
    expect(component.defaultValue).to.be.null
    component.changed.should.deep.equal(false)
    element.click()
    this.clock.tick(310)

    component.$$('.item')[1].click()

    expect(component.value).to.equal(items[1].value)
    expect(component.changed).to.equal(true)
    expect(component.defaultValue).to.be.null

    component.reset()
    expect(component.value).to.be.null
    expect(component.defaultValue).to.be.null
    expect(component.changed).to.equal(false)
  })
})
