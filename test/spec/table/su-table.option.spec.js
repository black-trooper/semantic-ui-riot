import * as riot from 'riot'
import { init, fireEvent, compile } from '../../helpers/'
import TableComponent from '../../../dist/tags/table/su-table.js'
import ThComponent from '../../../dist/tags/table/su-th.js'

describe('su-table-option', function () {
  let element, component
  init(riot)

  beforeEach(function () {
    element = document.createElement('app')
    riot.register('su-table', TableComponent)
    riot.register('su-th', ThComponent)
  })

  const mount = (html, opts) => {
    const AppComponent = compile(html)
    riot.register('app', AppComponent)
    component = riot.mount(element, opts)[0]
  }

  afterEach(function () {
    riot.unregister('su-th')
    riot.unregister('su-table')
    riot.unregister('app')
  })

  it('is mounted', function () {
    mount('<app><su-table><su-th field="name">Name</su-th></su-table></app>')
    expect(component).to.be.ok
  })

  it('single-header', function () {
    mount(
      `<app>
        <su-table data="{ props.data }">
          <su-th field="name">Name</su-th>
        </su-table>
      </app>`,
      {
        data: [
          { name: 'John', age: 15, gender: 'Male' },
          { name: 'Amber', age: 40, gender: 'Female' },
          { name: 'Terry', age: 25, gender: 'Male' },
          { name: 'Leslie', age: 25 },
          { name: 'Ben', age: 70, gender: 'Male' },
        ]
      })

    // name
    fireEvent(component.$$('su-th')[0], 'click')
    expect(component.props.data[0].name).to.equal('Amber')
    expect(component.props.data[0]['su-table-index']).to.equal(1)
    expect(component.$('su-table su-th').classList.contains('sorted')).to.equal(true)
    expect(component.$('su-table su-th').classList.contains('ascending')).to.equal(true)
    expect(component.$('su-table su-th').classList.contains('descending')).to.equal(false)

    // // name desc
    fireEvent(component.$$('su-th')[0], 'click')
    expect(component.props.data[0].name).to.equal('Terry')
    expect(component.$('su-table su-th').classList.contains('sorted')).to.equal(true)
    expect(component.$('su-table su-th').classList.contains('ascending')).to.equal(false)
    expect(component.$('su-table su-th').classList.contains('descending')).to.equal(true)

    // // default
    fireEvent(component.$$('su-th')[0], 'click')
    expect(component.props.data[0].name).to.equal('John')
    expect(component.$('su-table su-th').classList.contains('sorted')).to.equal(false)
    expect(component.$('su-table su-th').classList.contains('ascending')).to.equal(false)
    expect(component.$('su-table su-th').classList.contains('descending')).to.equal(false)
  })

  it('none-header', function () {
    mount('<app><su-table data="{ props.data }"></su-table></app>', {
      data: [
        { name: 'John', age: 15, gender: 'Male' },
        { name: 'Amber', age: 40, gender: 'Female' },
        { name: 'Terry', age: 25, gender: 'Male' },
        { name: 'Leslie', age: 25 },
        { name: 'Ben', age: 70, gender: 'Male' },
      ]
    })

    expect(component.props.data[0].name).to.equal('John')
  })
})
