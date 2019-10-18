import * as riot from 'riot'
import { init, compile, fireEvent } from '../../helpers/'
import TargetComponent from '../../../dist/tags/popup/su-popup.js'

describe('su-popup', function () {
  let element, component
  const spyOnMouseover = sinon.spy()
  const spyOnMouseout = sinon.spy()
  init(riot)

  const mount = opts => {
    const option = Object.assign({
      'onmouseover': spyOnMouseover,
      'onmouseout': spyOnMouseout,
    }, opts)
    element = document.createElement('app')
    riot.register('su-popup', TargetComponent)
    const AppComponent = compile(`
      <app>
        <su-popup
          tooltip="{ props.tooltip }"
          data-title="{ props.dataTitle }"
          data-variation="{ props.dataVariation }"
          onmouseover="{ () => dispatch('mouseover') }"
          onmouseout="{ () => dispatch('mouseout') }"
        ><i class="add icon"></i></su-popup>
      </app>`)
    riot.register('app', AppComponent)
    component = riot.mount(element, option)[0]
  }

  afterEach(function () {
    spyOnMouseover.reset()
    spyOnMouseout.reset()
    riot.unregister('su-popup')
    riot.unregister('app')
  })

  it('is mounted', function () {
    mount()
    expect(component).to.be.ok
  })

  it('show and hide popup', function () {
    mount({
      tooltip: 'Add users to your feed'
    })
    expect(component.$('.content').innerHTML).to.equal('Add users to your feed')
    expect(component.$('su-popup .ui.popup').classList.contains('nowrap')).to.equal(true)

    fireEvent(component.$('su-popup .ui.popup'), 'mouseover')
    spyOnMouseover.should.have.been.calledOnce
    expect(component.$('su-popup .ui.popup').classList.contains('visible')).to.equal(true)
    expect(component.$('su-popup .ui.popup').classList.contains('hidden')).to.equal(false)

    fireEvent(component.$('su-popup .ui.popup'), 'mouseout')
    spyOnMouseout.should.have.been.calledOnce
    expect(component.$('su-popup .ui.popup').classList.contains('visible')).to.equal(false)
    expect(component.$('su-popup .ui.popup').classList.contains('hidden')).to.equal(true)
  })

  it('header', function () {
    mount({
      tooltip: 'Add users to your feed',
      dataTitle: 'Title'
    })

    expect(component.$('.header').innerHTML).to.equal('Title')
    expect(component.$('.content').innerHTML).to.equal('Add users to your feed')
  })

  it('wide', function () {
    mount({
      tooltip: 'Add users to your feed',
      dataVariation: 'wide'
    })

    expect(component.$('su-popup .ui.popup').classList.contains('wide')).to.equal(true)
    expect(component.$('su-popup .ui.popup').classList.contains('nowrap')).to.equal(false)
  })
})
