import * as riot from 'riot'
import { init, compile, fireEvent } from '../../helpers/'
import TargetComponent from '../../../dist/tags/pagination/su-pagination.js'

describe('su-pagination', function () {
  let element, component
  const spyOnChange = sinon.spy()
  init(riot)

  const mount = opts => {
    const option = Object.assign({
      'onchange': spyOnChange,
    }, opts)
    element = document.createElement('app')
    riot.register('su-pagination', TargetComponent)
    const AppComponent = compile(`
      <app>
        <su-pagination
          total-page="{ props.totalPage }"
          onchange="{ () => dispatch('change') }"
        >
        </su-pagination>
      </app>`)
    riot.register('app', AppComponent)
    component = riot.mount(element, option)[0]
  }

  afterEach(function () {
    spyOnChange.reset()
    riot.unregister('su-pagination')
    riot.unregister('app')
  })

  it('is mounted', function () {
    mount()
    expect(component).to.be.ok
  })

  it('page count is 1', function () {
    mount({
      totalPage: 1
    })

    expect(component.$$('su-pagination .item:not(.angle)').length).to.equal(1)
    expect(component.$$('su-pagination .item:not(.angle).disabled').length).to.equal(0)
    expect(component.$$('su-pagination .item:not(.angle)')[0].classList.contains('disabled')).to.equal(false)
    expect(component.$$('su-pagination .item:not(.angle)')[0].classList.contains('active')).to.equal(true)
    expect(component.$$('su-pagination a.angle.item')[0].classList.contains('disabled')).to.equal(true)
    expect(component.$$('su-pagination a.angle.item')[1].classList.contains('disabled')).to.equal(true)
    expect(component.$$('su-pagination a.angle.item')[2].classList.contains('disabled')).to.equal(true)
    expect(component.$$('su-pagination a.angle.item')[3].classList.contains('disabled')).to.equal(true)

    fireEvent(component.$$('su-pagination a.angle.item')[2], 'click')
    expect(component.$$('su-pagination .item:not(.angle)')[0].classList.contains('disabled')).to.equal(false)
    expect(component.$$('su-pagination .item:not(.angle)')[0].classList.contains('active')).to.equal(true)
    expect(component.$$('su-pagination a.angle.item')[0].classList.contains('disabled')).to.equal(true)
    expect(component.$$('su-pagination a.angle.item')[1].classList.contains('disabled')).to.equal(true)
    expect(component.$$('su-pagination a.angle.item')[2].classList.contains('disabled')).to.equal(true)
    expect(component.$$('su-pagination a.angle.item')[3].classList.contains('disabled')).to.equal(true)
    expect(spyOnChange).to.have.been.callCount(0)
  })

  it('page count is 7', function () {
    mount({
      totalPage: 7
    })

    expect(component.$$('su-pagination .item:not(.angle)').length).to.equal(7)
    expect(component.$$('su-pagination .item:not(.angle).disabled').length).to.equal(0)
    expect(component.$$('su-pagination .item:not(.angle)')[1].classList.contains('disabled')).to.equal(false)
    expect(component.$$('su-pagination .item:not(.angle)')[5].classList.contains('disabled')).to.equal(false)
    expect(component.$$('su-pagination .item:not(.angle)')[0].classList.contains('active')).to.equal(true)
    expect(component.$$('su-pagination a.angle.item')[0].classList.contains('disabled')).to.equal(true)
    expect(component.$$('su-pagination a.angle.item')[1].classList.contains('disabled')).to.equal(true)
    expect(component.$$('su-pagination a.angle.item')[2].classList.contains('disabled')).to.equal(false)
    expect(component.$$('su-pagination a.angle.item')[3].classList.contains('disabled')).to.equal(false)

    fireEvent(component.$$('su-pagination a.angle.item')[2], 'click')
    expect(component.$$('su-pagination .item:not(.angle)')[1].classList.contains('disabled')).to.equal(false)
    expect(component.$$('su-pagination .item:not(.angle)')[5].classList.contains('disabled')).to.equal(false)
    expect(component.$$('su-pagination .item:not(.angle)')[1].classList.contains('active')).to.equal(true)
    expect(component.$$('su-pagination a.angle.item')[0].classList.contains('disabled')).to.equal(false)
    expect(component.$$('su-pagination a.angle.item')[1].classList.contains('disabled')).to.equal(false)
    expect(component.$$('su-pagination a.angle.item')[2].classList.contains('disabled')).to.equal(false)
    expect(component.$$('su-pagination a.angle.item')[3].classList.contains('disabled')).to.equal(false)
    expect(spyOnChange).to.have.been.calledOnce

    fireEvent(component.$$('su-pagination a.angle.item')[2], 'click')
    expect(component.$$('su-pagination .item:not(.angle)')[1].classList.contains('disabled')).to.equal(false)
    expect(component.$$('su-pagination .item:not(.angle)')[5].classList.contains('disabled')).to.equal(false)
    expect(component.$$('su-pagination .item:not(.angle)')[2].classList.contains('active')).to.equal(true)
    expect(component.$$('su-pagination a.angle.item')[0].classList.contains('disabled')).to.equal(false)
    expect(component.$$('su-pagination a.angle.item')[1].classList.contains('disabled')).to.equal(false)
    expect(component.$$('su-pagination a.angle.item')[2].classList.contains('disabled')).to.equal(false)
    expect(component.$$('su-pagination a.angle.item')[3].classList.contains('disabled')).to.equal(false)

    fireEvent(component.$$('su-pagination a.angle.item')[2], 'click')
    expect(component.$$('su-pagination .item:not(.angle)')[1].classList.contains('disabled')).to.equal(false)
    expect(component.$$('su-pagination .item:not(.angle)')[5].classList.contains('disabled')).to.equal(false)
    expect(component.$$('su-pagination .item:not(.angle)')[3].classList.contains('active')).to.equal(true)
    expect(component.$$('su-pagination a.angle.item')[0].classList.contains('disabled')).to.equal(false)
    expect(component.$$('su-pagination a.angle.item')[1].classList.contains('disabled')).to.equal(false)
    expect(component.$$('su-pagination a.angle.item')[2].classList.contains('disabled')).to.equal(false)
    expect(component.$$('su-pagination a.angle.item')[3].classList.contains('disabled')).to.equal(false)

    fireEvent(component.$$('su-pagination a.angle.item')[2], 'click')
    expect(component.$$('su-pagination .item:not(.angle)')[1].classList.contains('disabled')).to.equal(false)
    expect(component.$$('su-pagination .item:not(.angle)')[5].classList.contains('disabled')).to.equal(false)
    expect(component.$$('su-pagination .item:not(.angle)')[4].classList.contains('active')).to.equal(true)
    expect(component.$$('su-pagination a.angle.item')[0].classList.contains('disabled')).to.equal(false)
    expect(component.$$('su-pagination a.angle.item')[1].classList.contains('disabled')).to.equal(false)
    expect(component.$$('su-pagination a.angle.item')[2].classList.contains('disabled')).to.equal(false)
    expect(component.$$('su-pagination a.angle.item')[3].classList.contains('disabled')).to.equal(false)

    fireEvent(component.$$('su-pagination a.angle.item')[2], 'click')
    expect(component.$$('su-pagination .item:not(.angle)')[1].classList.contains('disabled')).to.equal(false)
    expect(component.$$('su-pagination .item:not(.angle)')[5].classList.contains('disabled')).to.equal(false)
    expect(component.$$('su-pagination .item:not(.angle)')[5].classList.contains('active')).to.equal(true)
    expect(component.$$('su-pagination a.angle.item')[0].classList.contains('disabled')).to.equal(false)
    expect(component.$$('su-pagination a.angle.item')[1].classList.contains('disabled')).to.equal(false)
    expect(component.$$('su-pagination a.angle.item')[2].classList.contains('disabled')).to.equal(false)
    expect(component.$$('su-pagination a.angle.item')[3].classList.contains('disabled')).to.equal(false)

    fireEvent(component.$$('su-pagination a.angle.item')[2], 'click')
    expect(component.$$('su-pagination .item:not(.angle)')[1].classList.contains('disabled')).to.equal(false)
    expect(component.$$('su-pagination .item:not(.angle)')[5].classList.contains('disabled')).to.equal(false)
    expect(component.$$('su-pagination .item:not(.angle)')[6].classList.contains('active')).to.equal(true)
    expect(component.$$('su-pagination a.angle.item')[0].classList.contains('disabled')).to.equal(false)
    expect(component.$$('su-pagination a.angle.item')[1].classList.contains('disabled')).to.equal(false)
    expect(component.$$('su-pagination a.angle.item')[2].classList.contains('disabled')).to.equal(true)
    expect(component.$$('su-pagination a.angle.item')[3].classList.contains('disabled')).to.equal(true)
    expect(spyOnChange).to.have.been.callCount(6)
  })

  it('page count is 8', function () {
    mount({
      totalPage: 8
    })

    expect(component.$$('su-pagination .item:not(.angle)').length).to.equal(7)
    expect(component.$$('su-pagination .item:not(.angle).disabled').length).to.equal(1)
    expect(component.$$('su-pagination .item:not(.angle)')[5].classList.contains('disabled')).to.equal(true)
    expect(component.$$('su-pagination a.angle.item')[0].classList.contains('disabled')).to.equal(true)
    expect(component.$$('su-pagination a.angle.item')[1].classList.contains('disabled')).to.equal(true)
    expect(component.$$('su-pagination a.angle.item')[2].classList.contains('disabled')).to.equal(false)
    expect(component.$$('su-pagination a.angle.item')[3].classList.contains('disabled')).to.equal(false)

    fireEvent(component.$$('su-pagination a.angle.item')[2], 'click')
    expect(component.$$('su-pagination .item:not(.angle)')[1].classList.contains('disabled')).to.equal(false)
    expect(component.$$('su-pagination .item:not(.angle)')[5].classList.contains('disabled')).to.equal(true)
    expect(component.$$('su-pagination a.angle.item')[0].classList.contains('disabled')).to.equal(false)
    expect(component.$$('su-pagination a.angle.item')[1].classList.contains('disabled')).to.equal(false)
    expect(component.$$('su-pagination a.angle.item')[2].classList.contains('disabled')).to.equal(false)
    expect(component.$$('su-pagination a.angle.item')[3].classList.contains('disabled')).to.equal(false)
    expect(spyOnChange).to.have.been.calledOnce


    fireEvent(component.$$('su-pagination a.angle.item')[2], 'click')
    expect(component.$$('su-pagination .item:not(.angle)')[1].classList.contains('disabled')).to.equal(false)
    expect(component.$$('su-pagination .item:not(.angle)')[5].classList.contains('disabled')).to.equal(true)
    expect(component.$$('su-pagination a.angle.item')[0].classList.contains('disabled')).to.equal(false)
    expect(component.$$('su-pagination a.angle.item')[1].classList.contains('disabled')).to.equal(false)
    expect(component.$$('su-pagination a.angle.item')[2].classList.contains('disabled')).to.equal(false)
    expect(component.$$('su-pagination a.angle.item')[3].classList.contains('disabled')).to.equal(false)

    fireEvent(component.$$('su-pagination a.angle.item')[2], 'click')
    expect(component.$$('su-pagination .item:not(.angle)')[1].classList.contains('disabled')).to.equal(false)
    expect(component.$$('su-pagination .item:not(.angle)')[5].classList.contains('disabled')).to.equal(true)
    expect(component.$$('su-pagination a.angle.item')[0].classList.contains('disabled')).to.equal(false)
    expect(component.$$('su-pagination a.angle.item')[1].classList.contains('disabled')).to.equal(false)
    expect(component.$$('su-pagination a.angle.item')[2].classList.contains('disabled')).to.equal(false)
    expect(component.$$('su-pagination a.angle.item')[3].classList.contains('disabled')).to.equal(false)

    fireEvent(component.$$('su-pagination a.angle.item')[2], 'click')
    expect(component.$$('su-pagination .item:not(.angle)')[1].classList.contains('disabled')).to.equal(true)
    expect(component.$$('su-pagination .item:not(.angle)')[5].classList.contains('disabled')).to.equal(false)
    expect(component.$$('su-pagination a.angle.item')[0].classList.contains('disabled')).to.equal(false)
    expect(component.$$('su-pagination a.angle.item')[1].classList.contains('disabled')).to.equal(false)
    expect(component.$$('su-pagination a.angle.item')[2].classList.contains('disabled')).to.equal(false)
    expect(component.$$('su-pagination a.angle.item')[3].classList.contains('disabled')).to.equal(false)

    fireEvent(component.$$('su-pagination a.angle.item')[2], 'click')
    expect(component.$$('su-pagination .item:not(.angle)')[1].classList.contains('disabled')).to.equal(true)
    expect(component.$$('su-pagination .item:not(.angle)')[5].classList.contains('disabled')).to.equal(false)
    expect(component.$$('su-pagination a.angle.item')[0].classList.contains('disabled')).to.equal(false)
    expect(component.$$('su-pagination a.angle.item')[1].classList.contains('disabled')).to.equal(false)
    expect(component.$$('su-pagination a.angle.item')[2].classList.contains('disabled')).to.equal(false)
    expect(component.$$('su-pagination a.angle.item')[3].classList.contains('disabled')).to.equal(false)

    fireEvent(component.$$('su-pagination a.angle.item')[2], 'click')
    expect(component.$$('su-pagination .item:not(.angle)')[1].classList.contains('disabled')).to.equal(true)
    expect(component.$$('su-pagination .item:not(.angle)')[5].classList.contains('disabled')).to.equal(false)
    expect(component.$$('su-pagination a.angle.item')[0].classList.contains('disabled')).to.equal(false)
    expect(component.$$('su-pagination a.angle.item')[1].classList.contains('disabled')).to.equal(false)
    expect(component.$$('su-pagination a.angle.item')[2].classList.contains('disabled')).to.equal(false)
    expect(component.$$('su-pagination a.angle.item')[3].classList.contains('disabled')).to.equal(false)

    fireEvent(component.$$('su-pagination a.angle.item')[2], 'click')
    expect(component.$$('su-pagination .item:not(.angle)')[1].classList.contains('disabled')).to.equal(true)
    expect(component.$$('su-pagination .item:not(.angle)')[5].classList.contains('disabled')).to.equal(false)
    expect(component.$$('su-pagination a.angle.item')[0].classList.contains('disabled')).to.equal(false)
    expect(component.$$('su-pagination a.angle.item')[1].classList.contains('disabled')).to.equal(false)
    expect(component.$$('su-pagination a.angle.item')[2].classList.contains('disabled')).to.equal(true)
    expect(component.$$('su-pagination a.angle.item')[3].classList.contains('disabled')).to.equal(true)
    expect(spyOnChange).to.have.been.callCount(7)
  })

  // it('page count is 9', function () {
  //   mount({
  //     totalPage: 9
  //   })

  //   expect(component.$$('su-pagination .item:not(.angle)').length).to.equal(7)
  //   expect(component.$$('su-pagination .item:not(.angle).disabled').length).to.equal(1)
  //   expect(component.$$('su-pagination .item:not(.angle)')[5].classList.contains('disabled')).to.equal(true)
  //   expect(component.$$('su-pagination a.angle.item')[0].classList.contains('disabled')).to.equal(true)
  //   expect(component.$$('su-pagination a.angle.item')[1].classList.contains('disabled')).to.equal(true)
  //   expect(component.$$('su-pagination a.angle.item')[2].classList.contains('disabled')).to.equal(false)
  //   expect(component.$$('su-pagination a.angle.item')[3].classList.contains('disabled')).to.equal(false)

  //   fireEvent(component.$$('su-pagination a.angle.item')[2], 'click')
  //   expect(component.$$('su-pagination .item:not(.angle)')[1].classList.contains('disabled')).to.equal(false)
  //   expect(component.$$('su-pagination .item:not(.angle)')[5].classList.contains('disabled')).to.equal(true)
  //   expect(component.$$('su-pagination a.angle.item')[0].classList.contains('disabled')).to.equal(false)
  //   expect(component.$$('su-pagination a.angle.item')[1].classList.contains('disabled')).to.equal(false)
  //   expect(component.$$('su-pagination a.angle.item')[2].classList.contains('disabled')).to.equal(false)
  //   expect(component.$$('su-pagination a.angle.item')[3].classList.contains('disabled')).to.equal(false)
  //   expect(spyOnChange).to.have.been.calledOnce


  //   fireEvent(component.$$('su-pagination a.angle.item')[2], 'click')
  //   expect(component.$$('su-pagination .item:not(.angle)')[1].classList.contains('disabled')).to.equal(false)
  //   expect(component.$$('su-pagination .item:not(.angle)')[5].classList.contains('disabled')).to.equal(true)
  //   expect(component.$$('su-pagination a.angle.item')[0].classList.contains('disabled')).to.equal(false)
  //   expect(component.$$('su-pagination a.angle.item')[1].classList.contains('disabled')).to.equal(false)
  //   expect(component.$$('su-pagination a.angle.item')[2].classList.contains('disabled')).to.equal(false)
  //   expect(component.$$('su-pagination a.angle.item')[3].classList.contains('disabled')).to.equal(false)

  //   fireEvent(component.$$('su-pagination a.angle.item')[2], 'click')
  //   expect(component.$$('su-pagination .item:not(.angle)')[1].classList.contains('disabled')).to.equal(false)
  //   expect(component.$$('su-pagination .item:not(.angle)')[5].classList.contains('disabled')).to.equal(true)
  //   expect(component.$$('su-pagination a.angle.item')[0].classList.contains('disabled')).to.equal(false)
  //   expect(component.$$('su-pagination a.angle.item')[1].classList.contains('disabled')).to.equal(false)
  //   expect(component.$$('su-pagination a.angle.item')[2].classList.contains('disabled')).to.equal(false)
  //   expect(component.$$('su-pagination a.angle.item')[3].classList.contains('disabled')).to.equal(false)

  //   fireEvent(component.$$('su-pagination a.angle.item')[2], 'click')
  //   expect(component.$$('su-pagination .item:not(.angle)')[1].classList.contains('disabled')).to.equal(true)
  //   expect(component.$$('su-pagination .item:not(.angle)')[5].classList.contains('disabled')).to.equal(true)
  //   expect(component.$$('su-pagination a.angle.item')[0].classList.contains('disabled')).to.equal(false)
  //   expect(component.$$('su-pagination a.angle.item')[1].classList.contains('disabled')).to.equal(false)
  //   expect(component.$$('su-pagination a.angle.item')[2].classList.contains('disabled')).to.equal(false)
  //   expect(component.$$('su-pagination a.angle.item')[3].classList.contains('disabled')).to.equal(false)

  //   fireEvent(component.$$('su-pagination a.angle.item')[2], 'click')
  //   expect(component.$$('su-pagination .item:not(.angle)')[1].classList.contains('disabled')).to.equal(true)
  //   expect(component.$$('su-pagination .item:not(.angle)')[5].classList.contains('disabled')).to.equal(false)
  //   expect(component.$$('su-pagination a.angle.item')[0].classList.contains('disabled')).to.equal(false)
  //   expect(component.$$('su-pagination a.angle.item')[1].classList.contains('disabled')).to.equal(false)
  //   expect(component.$$('su-pagination a.angle.item')[2].classList.contains('disabled')).to.equal(false)
  //   expect(component.$$('su-pagination a.angle.item')[3].classList.contains('disabled')).to.equal(false)

  //   fireEvent(component.$$('su-pagination a.angle.item')[2], 'click')
  //   expect(component.$$('su-pagination .item:not(.angle)')[1].classList.contains('disabled')).to.equal(true)
  //   expect(component.$$('su-pagination .item:not(.angle)')[5].classList.contains('disabled')).to.equal(false)
  //   expect(component.$$('su-pagination a.angle.item')[0].classList.contains('disabled')).to.equal(false)
  //   expect(component.$$('su-pagination a.angle.item')[1].classList.contains('disabled')).to.equal(false)
  //   expect(component.$$('su-pagination a.angle.item')[2].classList.contains('disabled')).to.equal(false)
  //   expect(component.$$('su-pagination a.angle.item')[3].classList.contains('disabled')).to.equal(false)

  //   fireEvent(component.$$('su-pagination a.angle.item')[2], 'click')
  //   expect(component.$$('su-pagination .item:not(.angle)')[1].classList.contains('disabled')).to.equal(true)
  //   expect(component.$$('su-pagination .item:not(.angle)')[5].classList.contains('disabled')).to.equal(false)
  //   expect(component.$$('su-pagination a.angle.item')[0].classList.contains('disabled')).to.equal(false)
  //   expect(component.$$('su-pagination a.angle.item')[1].classList.contains('disabled')).to.equal(false)
  //   expect(component.$$('su-pagination a.angle.item')[2].classList.contains('disabled')).to.equal(false)
  //   expect(component.$$('su-pagination a.angle.item')[3].classList.contains('disabled')).to.equal(false)

  //   fireEvent(component.$$('su-pagination a.angle.item')[2], 'click')
  //   expect(component.$$('su-pagination .item:not(.angle)')[1].classList.contains('disabled')).to.equal(true)
  //   expect(component.$$('su-pagination .item:not(.angle)')[5].classList.contains('disabled')).to.equal(false)
  //   expect(component.$$('su-pagination a.angle.item')[0].classList.contains('disabled')).to.equal(false)
  //   expect(component.$$('su-pagination a.angle.item')[1].classList.contains('disabled')).to.equal(false)
  //   expect(component.$$('su-pagination a.angle.item')[2].classList.contains('disabled')).to.equal(true)
  //   expect(component.$$('su-pagination a.angle.item')[3].classList.contains('disabled')).to.equal(true)
  //   expect(spyOnChange).to.have.been.callCount(8)
  // })

  // it('page count is 0', function () {
  //   mount({
  //     totalPage: 0
  //   })

  //   expect(component.$$('su-pagination .item:not(.angle)').length).to.equal(0)
  //   expect(component.$$('su-pagination a.angle.item')[0].classList.contains('disabled')).to.equal(true)
  //   expect(component.$$('su-pagination a.angle.item')[1].classList.contains('disabled')).to.equal(true)
  //   expect(component.$$('su-pagination a.angle.item')[2].classList.contains('disabled')).to.equal(true)
  //   expect(component.$$('su-pagination a.angle.item')[3].classList.contains('disabled')).to.equal(true)
  //   expect(spyOnChange).to.have.been.callCount(0)
  // })

  // it('update options', function () {
  //   mount({
  //     totalPage: 9
  //   })

  //   expect(component.$$('su-pagination .item:not(.angle)').length).to.equal(7)
  //   expect(component.$$('su-pagination .item:not(.angle).disabled').length).to.equal(1)
  //   expect(component.$$('su-pagination .item:not(.angle)')[5].classList.contains('disabled')).to.equal(true)
  //   expect(component.$$('su-pagination a.angle.item')[0].classList.contains('disabled')).to.equal(true)
  //   expect(component.$$('su-pagination a.angle.item')[1].classList.contains('disabled')).to.equal(true)
  //   expect(component.$$('su-pagination a.angle.item')[2].classList.contains('disabled')).to.equal(false)
  //   expect(component.$$('su-pagination a.angle.item')[3].classList.contains('disabled')).to.equal(false)

  //   tag.opts.totalPage = 7
  //   tag.update()
  //   expect(component.$$('su-pagination .item:not(.angle)').length).to.equal(7)
  //   expect(component.$$('su-pagination .item:not(.angle).disabled').length).to.equal(0)
  //   expect(component.$$('su-pagination .item:not(.angle)')[1].classList.contains('disabled')).to.equal(false)
  //   expect(component.$$('su-pagination .item:not(.angle)')[5].classList.contains('disabled')).to.equal(false)
  //   expect(component.$$('su-pagination a.angle.item')[0].classList.contains('disabled')).to.equal(true)
  //   expect(component.$$('su-pagination a.angle.item')[1].classList.contains('disabled')).to.equal(true)
  //   expect(component.$$('su-pagination a.angle.item')[2].classList.contains('disabled')).to.equal(false)
  //   expect(component.$$('su-pagination a.angle.item')[3].classList.contains('disabled')).to.equal(false)

  //   tag.opts.activePage = 2
  //   tag.update()
  //   expect(component.$$('su-pagination .item:not(.angle)')[1].classList.contains('disabled')).to.equal(false)
  //   expect(component.$$('su-pagination .item:not(.angle)')[5].classList.contains('disabled')).to.equal(false)
  //   expect(component.$$('su-pagination a.angle.item')[0].classList.contains('disabled')).to.equal(false)
  //   expect(component.$$('su-pagination a.angle.item')[1].classList.contains('disabled')).to.equal(false)
  //   expect(component.$$('su-pagination a.angle.item')[2].classList.contains('disabled')).to.equal(false)
  //   expect(component.$$('su-pagination a.angle.item')[3].classList.contains('disabled')).to.equal(false)
  // })
})
