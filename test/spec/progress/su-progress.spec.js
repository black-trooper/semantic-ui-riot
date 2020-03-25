import * as riot from 'riot'
import { init, compile } from '../../helpers/'
import TargetComponent from '../../../dist/tags/progress/su-progress.js'

describe('su-progress', function () {
  let element, component
  init(riot)

  const mount = option => {
    element = document.createElement('app')
    riot.register('su-progress', TargetComponent)
    const AppComponent = compile(`
      <app>
        <su-progress
          value="{ value || props.value }"
          total="{ props.total }"
          class="{ props.class }"
          onmouseover="{ () => dispatch('mouseover') }"
          onmouseout="{ () => dispatch('mouseout') }"
        >Uploading Files</su-progress>
      </app>`)
    riot.register('app', AppComponent)
    component = riot.mount(element, option)[0]
  }

  afterEach(function () {
    riot.unregister('su-progress')
    riot.unregister('app')
  })

  it('is mounted', function () {
    mount()
    expect(component).to.be.ok
  })

  it('show label and update value', function () {
    mount()
    expect(component.$('su-progress .ui.progress > .label').innerText.trim()).to.equal('Uploading Files')
    expect(component.$('su-progress .bar > .progress')).to.be.undefined
    expect(component.$('su-progress .ui.progress').classList.contains('success')).to.equal(false)
    expect(component.$('su-progress .ui.progress').classList.contains('active')).to.equal(false)
    expect(component.$('su-progress').getAttribute('percent')).to.equal('0')

    component.value = 50
    component.update()
    expect(component.$('su-progress').getAttribute('percent')).to.equal('50')
    expect(component.$('su-progress .ui.progress').classList.contains('success')).to.equal(false)
    expect(component.$('su-progress .ui.progress').classList.contains('active')).to.equal(false)

    component.value = 100
    component.update()
    expect(component.$('su-progress').getAttribute('percent')).to.equal('100')
    expect(component.$('su-progress .ui.progress').classList.contains('success')).to.equal(true)
    expect(component.$('su-progress .ui.progress').classList.contains('active')).to.equal(false)

    component.value = 101
    component.update()
    expect(component.$('su-progress').getAttribute('percent')).to.equal('100')
    expect(component.$('su-progress .ui.progress').classList.contains('success')).to.equal(true)
    expect(component.$('su-progress .ui.progress').classList.contains('active')).to.equal(false)
  })

  it('opts value', function () {
    mount({
      value: 50
    })
    expect(component.$('su-progress .ui.progress > .label').innerText.trim()).to.equal('Uploading Files')
    expect(component.$('su-progress .bar > .progress')).to.be.undefined
    expect(component.$('su-progress .ui.progress').classList.contains('success')).to.equal(false)
    expect(component.$('su-progress .ui.progress').classList.contains('active')).to.equal(false)
    expect(component.$('su-progress').getAttribute('percent')).to.equal('50')

    component.value = 100
    component.update()
    expect(component.$('su-progress').getAttribute('percent')).to.equal('100')
    expect(component.$('su-progress .ui.progress').classList.contains('success')).to.equal(true)
    expect(component.$('su-progress .ui.progress').classList.contains('active')).to.equal(false)
  })

  it('active option', function () {
    mount({
      class: 'progress active'
    })
    expect(component.$('su-progress .ui.progress > .label').innerText.trim()).to.equal('Uploading Files')
    expect(component.$$('su-progress .bar > .progress').length).to.equal(1)
    expect(component.$('su-progress .ui.progress').classList.contains('success')).to.equal(false)
    expect(component.$('su-progress .ui.progress').classList.contains('active')).to.equal(false)
    expect(component.$('su-progress').getAttribute('percent')).to.equal('0')

    component.value = 50
    component.update()
    expect(component.$('su-progress').getAttribute('percent')).to.equal('50')
    expect(component.$('su-progress .ui.progress').classList.contains('success')).to.equal(false)
    expect(component.$('su-progress .ui.progress').classList.contains('active')).to.equal(true)

    component.value = 100
    component.update()
    expect(component.$('su-progress').getAttribute('percent')).to.equal('100')
    expect(component.$('su-progress .ui.progress').classList.contains('success')).to.equal(true)
    expect(component.$('su-progress .ui.progress').classList.contains('active')).to.equal(false)
  })

  it('total option', function () {
    mount({
      total: '200'
    })
    expect(component.$('su-progress .ui.progress > .label').innerText.trim()).to.equal('Uploading Files')
    expect(component.$('su-progress .ui.progress').classList.contains('success')).to.equal(false)
    expect(component.$('su-progress .ui.progress').classList.contains('active')).to.equal(false)
    expect(component.$('su-progress').getAttribute('percent')).to.equal('0')

    component.value = 100
    component.update()
    expect(component.$('su-progress').getAttribute('percent')).to.equal('50')
    expect(component.$('su-progress .ui.progress').classList.contains('success')).to.equal(false)
    expect(component.$('su-progress .ui.progress').classList.contains('active')).to.equal(false)

    component.value = 200
    component.update()
    expect(component.$('su-progress').getAttribute('percent')).to.equal('100')
    expect(component.$('su-progress .ui.progress').classList.contains('success')).to.equal(true)
    expect(component.$('su-progress .ui.progress').classList.contains('active')).to.equal(false)
  })
})
