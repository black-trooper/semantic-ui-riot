import * as riot from 'riot'
import { init, compile } from '../../helpers/'
import TargetComponent from '../../../dist/tags/dropdown/su-dropdown.js'

describe('su-dropdown-multiple', function () {
  let element, component
  let spyOnOpen, spyOnClose, spyOnSelect, spyOnChange
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
    spyOnOpen = sinon.spy()
    spyOnClose = sinon.spy()
    spyOnSelect = sinon.spy()
    spyOnChange = sinon.spy()
    element = document.createElement('app')
    riot.register('su-dropdown', TargetComponent)
    const AppComponent = compile(`
      <app>
        <su-dropdown
          value="{ value }"
          multiple="{ props.multiple }"
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
      'multiple': true,
      'items': items,
      'onopen': spyOnOpen,
      'onclose': spyOnClose,
      'onselect': spyOnSelect,
      'onchange': spyOnChange,
    })[0]
    this.clock = sinon.useFakeTimers()
  })

  afterEach(function () {
    this.clock.restore()
    component.unmount()
    riot.unregister('su-dropdown')
    riot.unregister('app')
  })

  it('is mounted', function () {
    expect(component).to.be.ok
  })

  it('clicking item', function () {
    fireEvent(component.$('su-dropdown'), 'click')
    this.clock.tick(310)

    component.$('.item').click()
    expect(component.$('.label').innerText.trim()).to.equal(items[1].label)
    expect(spyOnSelect).calledOnce
    expect(spyOnChange).calledOnce

    this.clock.tick(310)
    expect(component.$('.menu').classList.contains('visible')).to.equal(true)
    expect(spyOnClose).callCount(0)

    fireEvent(component.$('su-dropdown'), 'blur')
  })

  it('clicking two items', function () {
    fireEvent(component.$('su-dropdown'), 'click')
    this.clock.tick(310)

    component.$('.item').click()
    component.$('.item').click()
    expect(component.$('.label').innerText.trim()).to.equal(items[1].label)
    expect(component.$$('.label')[1].innerText.trim()).to.equal(items[2].label)
    expect(component.$('su-dropdown').getAttribute('value')).to.equal('angular,css')
    expect(spyOnSelect).calledTwice
    expect(spyOnChange).calledTwice

    this.clock.tick(310)
    expect(component.$('.menu').classList.contains('visible')).to.equal(true)
    expect(spyOnClose).callCount(0)

    fireEvent(component.$('su-dropdown'), 'blur')
  })

  it('unselect item', function () {
    fireEvent(component.$('su-dropdown'), 'click')
    this.clock.tick(310)

    component.$('.item').click()
    component.$('.item').click()
    component.$('.label .delete').click()
    expect(component.$('.label').innerText.trim()).to.equal(items[2].label)
    expect(component.$('su-dropdown').getAttribute('value')).to.equal('css')
    expect(spyOnSelect).calledTwice
    expect(spyOnChange).calledTwice

    this.clock.tick(310)
    expect(component.$('.menu').classList.contains('visible')).to.equal(true)
    expect(spyOnClose).callCount(0)

    fireEvent(component.$('su-dropdown'), 'blur')
  })

  it('pressing enter key on item', function () {
    fireEvent(component.$('su-dropdown'), 'focus')
    this.clock.tick(310)

    fireKeyEvent(component.$('su-dropdown'), 'keydown', keys.downArrow)
    fireKeyEvent(component.$('su-dropdown'), 'keyup', keys.enter)

    expect(component.$('.label').innerText.trim()).to.equal(items[1].label)
    expect(component.$('.hover .text').innerText.trim()).to.equal(items[2].label)
    expect(spyOnSelect).calledOnce
    expect(spyOnChange).calledOnce

    this.clock.tick(310)
    expect(component.$('.menu').classList.contains('visible')).to.equal(true)
    expect(spyOnClose).callCount(0)

    fireEvent(component.$('su-dropdown'), 'blur')
  })

  it('pressing enter key on last item', function () {
    fireEvent(component.$('su-dropdown'), 'focus')
    this.clock.tick(310)

    let length = items.length
    for (let i = 0; i < length; i++) {
      fireKeyEvent(component.$('su-dropdown'), 'keydown', keys.downArrow)
    }
    fireKeyEvent(component.$('su-dropdown'), 'keyup', keys.enter)

    expect(component.$('.label').innerText.trim()).to.equal(items[length - 1].label)
    expect(component.$('.hover .text').innerText.trim()).to.equal(items[length - 2].label)
    expect(spyOnSelect).calledOnce
    expect(spyOnChange).calledOnce

    this.clock.tick(310)
    expect(component.$('.menu').classList.contains('visible')).to.equal(true)
    expect(spyOnClose).callCount(0)

    fireEvent(component.$('su-dropdown'), 'blur')
  })
})
