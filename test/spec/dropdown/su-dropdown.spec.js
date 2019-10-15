import * as riot from 'riot'
import { init, compile, fireEvent, fireKeyEvent, keys } from '../../helpers/'
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
      value: '1'
    },
    {
      label: 'Female',
      value: '2'
    },
  ]

  // beforeEach(function () {
  //   riot.register('su-dropdown', TargetComponent)
  //   element = document.createElement('su-dropdown')
  //   component = riot.mount(element, {
  //     'items': items,
  //     'onopen': spyOnOpen,
  //     'onclose': spyOnClose,
  //     'onselect': spyOnSelect,
  //     'onchange': spyOnChange,
  //     'onblur': spyOnBlur,
  //   })[0]
  //   this.clock = sinon.useFakeTimers()
  // })

  beforeEach(function () {
    element = document.createElement('app')
    riot.register('su-dropdown', TargetComponent)
    const AppComponent = compile(`
      <app>
        <su-dropdown
          value="{ value }"
          items="{ props.items }"
          onopen="{ () => dispatch('open') }"
          onclose="{ () => dispatch('close') }"
          onselect="{ () => dispatch('select') }"
          onchange="{ () => dispatch('change') }"
          onblur="{ () => dispatch('blur') }">
        </su-dropdown>
        <button id="reset" type="button" onclick="{ reset }">reset</button>
        <script>
          export default {
            reset() {
              this.obs.trigger(this.$('su-dropdown').id + '-reset')
            }
          }
        </script>
      </app>`)
    riot.register('app', AppComponent)
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
    riot.unregister('app')
  })

  it('is mounted', function () {
    expect(component).to.be.ok
  })

  it('has no items visible on load', function () {
    expect(component.$$('.menu .item')).to.have.lengthOf(0)
  })

  it('clicking dropdown opens/closes dropdown and triggers open/close event', function () {
    expect(component.$('.menu').classList.contains('visible')).to.equal(false)

    fireEvent(component.$('su-dropdown'), 'click')
    this.clock.tick(310)
    expect(component.$('.menu').classList.contains('visible')).to.equal(true)
    expect(spyOnOpen).calledOnce

    fireEvent(component.$('su-dropdown'), 'click')
    this.clock.tick(310)
    expect(component.$('.menu').classList.contains('visible')).to.equal(false)
    expect(spyOnClose).calledOnce
  })

  it('focusing/blurring dropdown opens/closes dropdown and triggers open/close event', function () {
    expect(component.$('.menu').classList.contains('visible')).to.equal(false)

    fireEvent(component.$('su-dropdown'), 'focus')
    this.clock.tick(310)
    expect(component.$('.menu').classList.contains('visible')).to.equal(true)
    expect(spyOnOpen).calledOnce

    fireEvent(component.$('su-dropdown'), 'blur')
    this.clock.tick(310)
    expect(component.$('.menu').classList.contains('visible')).to.equal(false)
    expect(spyOnClose).calledOnce
    expect(spyOnBlur).calledOnce
  })

  it('clicking default item', function () {
    fireEvent(component.$('su-dropdown'), 'click')
    this.clock.tick(310)

    component.$('.item').click()
    expect(component.$('.text').innerText.trim()).to.equal(items[0].label)
    expect(component.$('.text').classList.contains('default')).to.equal(true)
    expect(spyOnSelect).calledOnce
    expect(spyOnChange).callCount(0)

    this.clock.tick(310)
    expect(component.$('.menu').classList.contains('visible')).to.equal(false)
    expect(spyOnClose).calledOnce

    expect(component.$('su-dropdown').getAttribute('value')).to.null
  })

  it('clicking item', function () {
    fireEvent(component.$('su-dropdown'), 'click')
    this.clock.tick(310)

    component.$$('.item')[1].click()
    expect(component.$('.text').innerText.trim()).to.equal(items[1].label)
    expect(component.$('.text').classList.contains('default')).to.equal(false)
    expect(spyOnSelect).calledOnce
    expect(spyOnChange).calledOnce

    this.clock.tick(310)
    expect(component.$('.menu').classList.contains('visible')).to.equal(false)
    expect(spyOnClose).calledOnce

    expect(component.$('su-dropdown').getAttribute('value')).to.equal(items[1].value)
  })

  it('pressing enter key on item', function () {
    fireEvent(component.$('su-dropdown'), 'focus')
    this.clock.tick(310)

    fireKeyEvent(component.$('su-dropdown'), 'keydown', keys.downArrow)
    fireKeyEvent(component.$('su-dropdown'), 'keyup', keys.downArrow)
    fireKeyEvent(component.$('su-dropdown'), 'keydown', keys.downArrow)
    fireKeyEvent(component.$('su-dropdown'), 'keyup', keys.downArrow)
    fireKeyEvent(component.$('su-dropdown'), 'keyup', keys.enter)

    expect(component.$('.text').innerText.trim()).to.equal(items[1].label)
    expect(component.$('.text').classList.contains('default')).to.equal(false)
    expect(spyOnSelect).calledOnce
    expect(spyOnChange).calledOnce

    this.clock.tick(310)
    expect(component.$('.menu').classList.contains('visible')).to.equal(false)
    expect(spyOnClose).calledOnce

    expect(component.$('su-dropdown').getAttribute('value')).to.equal(items[1].value)
  })

  it('pressing key down will active item', function () {
    fireEvent(component.$('su-dropdown'), 'focus')
    this.clock.tick(310)

    fireKeyEvent(component.$('su-dropdown'), 'keydown', keys.downArrow)
    expect(component.$('.hover .text').innerText).to.equal(items[0].label)

    fireKeyEvent(component.$('su-dropdown'), 'keydown', keys.downArrow)
    expect(component.$('.hover .text').innerText).to.equal(items[1].label)

    fireKeyEvent(component.$('su-dropdown'), 'keydown', keys.downArrow)
    expect(component.$('.hover .text').innerText).to.equal(items[2].label)

    fireKeyEvent(component.$('su-dropdown'), 'keydown', keys.downArrow)
    expect(component.$('.hover .text').innerText).to.equal(items[2].label)

    fireKeyEvent(component.$('su-dropdown'), 'keydown', keys.upArrow)
    expect(component.$('.hover .text').innerText).to.equal(items[1].label)

    fireKeyEvent(component.$('su-dropdown'), 'keydown', keys.upArrow)
    expect(component.$('.hover .text').innerText).to.equal(items[0].label)

    fireKeyEvent(component.$('su-dropdown'), 'keydown', keys.upArrow)
    expect(component.$('.hover .text').innerText).to.equal(items[0].label)

    fireEvent(element, 'blur')
  })

  it('pressing escape key', function () {
    fireEvent(component.$('su-dropdown'), 'focus')
    this.clock.tick(310)

    fireKeyEvent(component.$('su-dropdown'), 'keydown', keys.escape)
    this.clock.tick(310)
    expect(component.$('.menu').classList.contains('visible')).to.equal(false)
    expect(spyOnClose).calledOnce
  })

  it('update value', function () {
    expect(component.$('su-dropdown').getAttribute('value')).to.be.null
    component.value = items[1].value
    component.update()
    expect(component.$('su-dropdown').getAttribute('value')).to.equal(items[1].value)
    expect(component.$('su-dropdown').getAttribute('label')).to.equal(items[1].label)
  })

  it('update item value', function () {
    component.$$('.item')[1].click()
    items[1].value = 'M'
    component.update()
    expect(component.$('su-dropdown').getAttribute('value')).to.be.null
  })

  // TODO update attribute
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
  //   // fireEvent(component.$('su-dropdown'), 'focus')
  //   this.clock.tick(310)

  //   expect(component.$$('.menu .item')).to.have.lengthOf(4)
  //   component.$('.header').click()
  //   expect(spyOnSelect).callCount(0)
  //   expect(spyOnChange).callCount(0)
  // })
})
