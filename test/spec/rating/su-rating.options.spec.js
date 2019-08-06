import * as riot from 'riot'
import { init, fireEvent, compile } from '../../helpers/'
import TargetComponent from '../../../dist/tags/rating/su-rating.js'

describe('su-rating-options', function () {
  let element, component
  const spyOnClick = sinon.spy()
  const spyOnChange = sinon.spy()
  init(riot)

  const mount = opts => {
    const option = Object.assign({
      'onclick': spyOnClick,
      'onchange': spyOnChange,
    }, opts)
    element = document.createElement('app')
    riot.register('su-rating', TargetComponent)
    const AppComponent = compile(`
      <app>
        <su-rating
          class="{ props.class }"
          value="{ props.value }"
          max="{ props.max }"
          onclick="{ () => dispatch('click') }"
          onchange="{ () => dispatch('change') }"
        />
        <button id="reset" type="button" onclick="{ reset }">reset</button>
        <script>
          export default {
            reset() {
              this.obs.trigger(this.$('su-rating').id + '-reset')
            }
          }
        </script>
      </app>`)
    riot.register('app', AppComponent)
    component = riot.mount(element, option)[0]
  }

  afterEach(function () {
    spyOnClick.reset()
    spyOnChange.reset()
    riot.unregister('su-rating')
    riot.unregister('app')
  })

  it('is mounted', function () {
    mount()
    expect(component).to.be.ok
  })

  it('click event', function () {
    mount({
      value: 2,
      max: 4
    })
    expect(component.$$('su-rating i').length).to.equal(4)
    expect(component.$('su-rating').getAttribute('value')).to.equal('2')
    expect(component.$$('su-rating i')[0].classList.contains('active')).to.equal(true)
    expect(component.$$('su-rating i')[1].classList.contains('active')).to.equal(true)
    expect(component.$$('su-rating i')[2].classList.contains('active')).to.equal(false)
    expect(component.$$('su-rating i')[3].classList.contains('active')).to.equal(false)

    fireEvent(component.$$('su-rating i')[2], 'click')
    expect(component.$('su-rating').getAttribute('value')).to.equal('3')
    expect(component.$$('su-rating i')[0].classList.contains('active')).to.equal(true)
    expect(component.$$('su-rating i')[1].classList.contains('active')).to.equal(true)
    expect(component.$$('su-rating i')[2].classList.contains('active')).to.equal(true)
    expect(component.$$('su-rating i')[3].classList.contains('active')).to.equal(false)

    fireEvent(component.$$('su-rating i')[0], 'click')
    expect(component.$('su-rating').getAttribute('value')).to.equal('1')
    expect(component.$$('su-rating i')[0].classList.contains('active')).to.equal(true)
    expect(component.$$('su-rating i')[1].classList.contains('active')).to.equal(false)
    expect(component.$$('su-rating i')[2].classList.contains('active')).to.equal(false)
    expect(component.$$('su-rating i')[3].classList.contains('active')).to.equal(false)
  })

  it('read only', function () {
    mount({
      class: 'read-only',
      value: 2,
      max: 4
    })
    expect(component.$$('su-rating i').length).to.equal(4)
    expect(component.$('su-rating').getAttribute('value')).to.equal('2')
    expect(component.$$('su-rating i')[0].classList.contains('active')).to.equal(true)
    expect(component.$$('su-rating i')[1].classList.contains('active')).to.equal(true)
    expect(component.$$('su-rating i')[2].classList.contains('active')).to.equal(false)
    expect(component.$$('su-rating i')[3].classList.contains('active')).to.equal(false)
    expect(component.$$('su-rating i')[0].classList.contains('selected')).to.equal(false)
    expect(component.$$('su-rating i')[1].classList.contains('selected')).to.equal(false)
    expect(component.$$('su-rating i')[2].classList.contains('selected')).to.equal(false)
    expect(component.$$('su-rating i')[3].classList.contains('selected')).to.equal(false)

    fireEvent(component.$$('su-rating i')[2], 'click')
    expect(component.$('su-rating').getAttribute('value')).to.equal('2')
    expect(component.$$('su-rating i')[0].classList.contains('active')).to.equal(true)
    expect(component.$$('su-rating i')[1].classList.contains('active')).to.equal(true)
    expect(component.$$('su-rating i')[2].classList.contains('active')).to.equal(false)
    expect(component.$$('su-rating i')[3].classList.contains('active')).to.equal(false)

    fireEvent(component.$$('su-rating i')[2], 'mouseover')
    expect(component.$('su-rating').getAttribute('value')).to.equal('2')
    expect(component.$$('su-rating i')[0].classList.contains('selected')).to.equal(false)
    expect(component.$$('su-rating i')[1].classList.contains('selected')).to.equal(false)
    expect(component.$$('su-rating i')[2].classList.contains('selected')).to.equal(false)
    expect(component.$$('su-rating i')[3].classList.contains('selected')).to.equal(false)

    spyOnClick.should.have.been.callCount(0)
    spyOnChange.should.have.been.callCount(0)
  })

  it('reset value', function () {
    mount({
      value: 2,
      max: 4
    })

    expect(component.$('su-rating').getAttribute('value')).to.equal('2')
    expect(component.$('su-rating').getAttribute('changed')).to.be.not.ok

    fireEvent(component.$$('su-rating i')[2], 'click')
    expect(component.$('su-rating').getAttribute('value')).to.equal('3')
    expect(component.$('su-rating').getAttribute('changed')).to.be.ok

    fireEvent(component.$('#reset'), 'click')
    expect(component.$('su-rating').getAttribute('value')).to.equal('2')
    expect(component.$('su-rating').getAttribute('changed')).to.be.not.ok
  })
})
