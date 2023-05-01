import * as riot from 'riot'
import { init, compile } from '../../helpers/'
import TargetComponent from '../../../dist/tags/popup/su-popup.js'

describe('su-popup', function () {
  let element, component
  init(riot)

  const mount = option => {
    element = document.createElement('app')
    riot.register('su-popup', TargetComponent)
    const AppComponent = compile(`
      <app>
        <su-popup
          tooltip="{ props.tooltip }"
          data-title="{ props.dataTitle }"
          data-variation="{ props.dataVariation }"
        >
          <i class="add icon"></i>
          <su-popup-content>
            <p>User Rating</p>
          </su-popup-content>
        </su-popup>
      </app>`)
    riot.register('app', AppComponent)
    component = riot.mount(element, option)[0]
  }

  afterEach(function () {
    riot.unregister('su-popup')
    riot.unregister('app')
  })

  it('html content', function () {
    mount()
    expect(component.$('.content').innerHTML).to.equal('<p>User Rating</p>')
    expect(component.$('su-popup-content')).to.undefined
  })
})
