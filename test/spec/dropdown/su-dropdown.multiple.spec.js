import * as riot from 'riot'
import { init, fireEvent, fireKeyEvent, keys } from '../../helpers/'
import TargetComponent from '../../../dist/tags/dropdown/su-dropdown.js'

describe('su-dropdown-multiple', function () {
  let element, component
  let spyOnOpen = sinon.spy()
  let spyOnClose = sinon.spy()
  let spyOnSelect = sinon.spy()
  let spyOnChange = sinon.spy()
  let spyOnBlur = sinon.spy()
  init(riot)

  let items = [
    {
      label: 'Skills',
      value: null,
      default: true
    },
    { value: 'angular', label: 'Angular' },
    { value: 'css', label: 'CSS' },
    { value: 'design', label: 'Graphic Design' },
    { value: 'ember', label: 'Ember' },
    { value: 'html', label: 'HTML' },
    { value: 'ia', label: 'Information Architecture' },
    { value: 'javascript', label: 'Javascript' },
    { value: 'mech', label: 'Mechanical Engineering' },
    { value: 'meteor', label: 'Meteor' },
    { value: 'node', label: 'NodeJS' },
    { value: 'plumbing', label: 'Plumbing' },
    { value: 'python', label: 'Python' },
    { value: 'rails', label: 'Rails' },
    { value: 'react', label: 'React' },
    { value: 'repair', label: 'Kitchen Repair' },
    { value: 'ruby', label: 'Ruby' },
    { value: 'ui', label: 'UI Design' },
    { value: 'ux', label: 'User Experience' }
  ]

  beforeEach(function () {
    riot.register('su-dropdown', TargetComponent)
    element = document.createElement('su-dropdown')
    component = riot.mount(element, {
      'multiple': true,
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
    spyOnOpen.reset()
    spyOnClose.reset()
    spyOnSelect.reset()
    spyOnChange.reset()
    spyOnBlur.reset()
    this.clock.restore()
    component.unmount()
    riot.unregister('su-dropdown')
  })

  it('is mounted', function () {
    expect(component).to.be.ok
  })

  it('clicking item', function () {
    element.click()
    this.clock.tick(310)

    component.$('.item').click()
    expect(component.$('.label').innerText.trim()).to.equal(items[1].label)
    expect(spyOnSelect).calledOnce
    expect(spyOnChange).calledOnce

    this.clock.tick(310)
    expect(component.$('.menu').classList.contains('visible')).to.equal(true)
    expect(spyOnClose).callCount(0)

    fireEvent(element, 'blur')
  })

  it('clicking two items', function () {
    element.click()
    this.clock.tick(310)

    component.$('.item').click()
    component.$('.item').click()
    expect(component.$('.label').innerText.trim()).to.equal(items[1].label)
    expect(component.$$('.label')[1].innerText.trim()).to.equal(items[2].label)
    expect(component.state.value).to.deep.equal(['angular', 'css'])
    expect(spyOnSelect).calledTwice
    expect(spyOnChange).calledTwice

    this.clock.tick(310)
    expect(component.$('.menu').classList.contains('visible')).to.equal(true)
    expect(spyOnClose).callCount(0)

    fireEvent(element, 'blur')
  })

  it('unselect item', function () {
    element.click()
    this.clock.tick(310)

    component.$('.item').click()
    component.$('.item').click()
    component.$('.label .delete').click()
    expect(component.$('.label').innerText.trim()).to.equal(items[2].label)
    expect(component.state.value).to.deep.equal(['css'])
    expect(spyOnSelect).calledTwice
    expect(spyOnChange).calledTwice

    this.clock.tick(310)
    expect(component.$('.menu').classList.contains('visible')).to.equal(true)
    expect(spyOnClose).callCount(0)

    fireEvent(element, 'blur')
  })

  it('pressing enter key on item', function () {
    fireEvent(element, 'focus')
    this.clock.tick(310)

    fireKeyEvent(element, 'keydown', keys.downArrow)
    fireKeyEvent(element, 'keyup', keys.enter)

    expect(component.$('.label').innerText.trim()).to.equal(items[1].label)
    expect(component.$('.hover .text').innerText.trim()).to.equal(items[2].label)
    expect(spyOnSelect).calledOnce
    expect(spyOnChange).calledOnce

    this.clock.tick(310)
    expect(component.$('.menu').classList.contains('visible')).to.equal(true)
    expect(spyOnClose).callCount(0)

    fireEvent(element, 'blur')
    expect(spyOnBlur).calledOnce
  })

  it('pressing enter key on last item', function () {
    fireEvent(element, 'focus')
    this.clock.tick(310)

    let length = items.length
    for (let i = 0; i < length; i++) {
      fireKeyEvent(element, 'keydown', keys.downArrow)
    }
    fireKeyEvent(element, 'keyup', keys.enter)

    expect(component.$('.label').innerText.trim()).to.equal(items[length - 1].label)
    expect(component.$('.hover .text').innerText.trim()).to.equal(items[length - 2].label)
    expect(spyOnSelect).calledOnce
    expect(spyOnChange).calledOnce

    this.clock.tick(310)
    expect(component.$('.menu').classList.contains('visible')).to.equal(true)
    expect(spyOnClose).callCount(0)

    fireEvent(element, 'blur')
    expect(spyOnBlur).calledOnce
  })

  it('reset value', function () {
    expect(component.state.value).to.deep.equal([])
    expect(component.state.defaultValue).to.deep.equal([])
    component.changed.should.deep.equal(false)
    element.click()
    this.clock.tick(310)

    component.$('.item').click()
    component.$('.item').click()

    expect(component.state.value).to.deep.equal(['angular', 'css'])
    expect(component.state.defaultValue).to.deep.equal([])
    component.changed.should.deep.equal(true)

    component.reset()
    expect(component.state.value).to.deep.equal([])
    expect(component.state.defaultValue).to.deep.equal([])
    component.changed.should.deep.equal(false)

    fireEvent(element, 'blur')
  })
})
