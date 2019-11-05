import * as riot from 'riot'
import { init, compile } from '../../helpers/'
import TableComponent from '../../../dist/tags/table/su-table.js'
import ThComponent from '../../../dist/tags/table/su-th.js'

describe('su-table-is-attribute', function () {
  let element, component
  init(riot)

  beforeEach(function () {
    element = document.createElement('app')
    riot.register('su-table', TableComponent)
    riot.register('su-th', ThComponent)
  })

  const mount = opts => {
    const AppComponent = compile(`
      <app>
        <table is="su-table" data="{ props.data }" nulls-first="{ props.nullsFirst }" default-sort-field="{ props.defaultSortField }" default-sort-reverse="{ props.defaultSortReverse }">
          <th is="su-th" field="name">Name</th>
          <th is="su-th" field="age">Age</th>
          <th is="su-th" field="gender">Gender</th>
        </table>
      </app>
    `)
    riot.register('app', AppComponent)
    component = riot.mount(element, opts)[0]
  }

  afterEach(function () {
    riot.unregister('su-th')
    riot.unregister('su-table')
    riot.unregister('app')
  })

  it('is mounted', function () {
    mount()
    expect(component).to.be.ok
  })

  it('sort data', function () {
    mount({
      data: [
        { name: 'John', age: 15, gender: 'Male' },
        { name: 'Amber', age: 40, gender: 'Female' },
        { name: 'Terry', age: 25, gender: 'Male' },
        { name: 'Leslie', age: 25 },
        { name: 'Ben', age: 70, gender: 'Male' },
      ]
    })

    // name
    fireEvent(component.$$('[is="su-th"]')[0], 'click')
    expect(component.props.data[0].name).to.equal('Amber')
    expect(component.props.data[0]['su-table-index']).to.equal(1)
    expect(component.props.data[1]['su-table-index']).to.equal(4)
    expect(component.props.data[2]['su-table-index']).to.equal(0)
    expect(component.props.data[3]['su-table-index']).to.equal(3)
    expect(component.props.data[4]['su-table-index']).to.equal(2)
    expect(component.$('[is="su-th"]').classList.contains('sorted')).to.equal(true)
    expect(component.$('[is="su-th"]').classList.contains('ascending')).to.equal(true)
    expect(component.$('[is="su-th"]').classList.contains('descending')).to.equal(false)

    // name desc
    fireEvent(component.$$('[is="su-th"]')[0], 'click')
    expect(component.props.data[0].name).to.equal('Terry')
    expect(component.$$('[is="su-th"]')[0].classList.contains('sorted')).to.equal(true)
    expect(component.$$('[is="su-th"]')[1].classList.contains('sorted')).to.equal(false)
    expect(component.$$('[is="su-th"]')[2].classList.contains('sorted')).to.equal(false)
    expect(component.$('[is="su-th"]').classList.contains('ascending')).to.equal(false)
    expect(component.$('[is="su-th"]').classList.contains('descending')).to.equal(true)

    // default
    fireEvent(component.$$('[is="su-th"]')[0], 'click')
    expect(component.props.data[0].name).to.equal('John')
    expect(component.$$('[is="su-th"]')[0].classList.contains('sorted')).to.equal(false)
    expect(component.$$('[is="su-th"]')[1].classList.contains('sorted')).to.equal(false)
    expect(component.$$('[is="su-th"]')[2].classList.contains('sorted')).to.equal(false)
    expect(component.$('[is="su-th"]').classList.contains('ascending')).to.equal(false)
    expect(component.$('[is="su-th"]').classList.contains('descending')).to.equal(false)

    // age
    fireEvent(component.$$('[is="su-th"]')[1], 'click')
    expect(component.props.data[0].age).to.equal(15)
    expect(component.props.data[1].age).to.equal(25)
    expect(component.props.data[2].age).to.equal(25)
    expect(component.props.data[3].age).to.equal(40)
    expect(component.props.data[4].age).to.equal(70)
    expect(component.props.data[0]['su-table-index']).to.equal(0)
    expect(component.props.data[1]['su-table-index']).to.equal(2)
    expect(component.props.data[2]['su-table-index']).to.equal(3)
    expect(component.props.data[3]['su-table-index']).to.equal(1)
    expect(component.props.data[4]['su-table-index']).to.equal(4)
    expect(component.$$('[is="su-th"]')[1].classList.contains('sorted')).to.equal(true)
    expect(component.$$('[is="su-th"]')[1].classList.contains('ascending')).to.equal(true)
    expect(component.$$('[is="su-th"]')[1].classList.contains('descending')).to.equal(false)

    // gender
    fireEvent(component.$$('[is="su-th"]')[2], 'click')
    expect(component.props.data[0]['su-table-index']).to.equal(1)
    expect(component.props.data[1]['su-table-index']).to.equal(0)
    expect(component.props.data[2]['su-table-index']).to.equal(2)
    expect(component.props.data[3]['su-table-index']).to.equal(4)
    expect(component.props.data[4]['su-table-index']).to.equal(3)
  })

  it('nulls first', function () {
    mount({
      data: [
        { name: 'John', age: 15, gender: 'Male' },
        { name: 'Amber', age: 40, gender: 'Female' },
        { name: 'Terry', age: 25, gender: 'Male' },
        { name: 'Leslie', age: 25 },
        { name: 'Ben', age: 70, gender: 'Male' },
      ],
      nullsFirst: true
    })

    // gender
    fireEvent(component.$$('[is="su-th"]')[2], 'click')
    expect(component.props.data[0]['su-table-index']).to.equal(3)
    expect(component.props.data[1]['su-table-index']).to.equal(1)
    expect(component.props.data[2]['su-table-index']).to.equal(0)
    expect(component.props.data[3]['su-table-index']).to.equal(2)
    expect(component.props.data[4]['su-table-index']).to.equal(4)
  })

  it('default sort', function () {
    mount({
      data: [
        { name: 'John', age: 15, gender: 'Male' },
        { name: 'Amber', age: 40, gender: 'Female' },
        { name: 'Terry', age: 25, gender: 'Male' },
        { name: 'Leslie', age: 25 },
        { name: 'Ben', age: 70, gender: 'Male' },
      ],
      defaultSortField: 'age',
      defaultSortReverse: true,
    })

    expect(component.props.data[0].name).to.equal('Ben')
    expect(component.props.data[0]['su-table-index']).to.equal(4)
    expect(component.props.data[1]['su-table-index']).to.equal(1)
    expect(component.props.data[2]['su-table-index']).to.equal(2)
    expect(component.props.data[3]['su-table-index']).to.equal(3)
    expect(component.props.data[4]['su-table-index']).to.equal(0)
  })

  // TODO update attribute
  // it('update data with default sort', function () {
  //   mount({
  //     data: [],
  //     defaultSortField: 'age',
  //     defaultSortReverse: true,
  //   })

  //   component.props.data = [
  //     { name: 'John', age: 15, gender: 'Male' },
  //     { name: 'Amber', age: 40, gender: 'Female' },
  //     { name: 'Terry', age: 25, gender: 'Male' },
  //     { name: 'Leslie', age: 25 },
  //     { name: 'Ben', age: 70, gender: 'Male' },
  //   ]
  //   tag.update()

  //   expect(component.props.data[0].name).to.equal('Ben')
  //   expect(component.props.data[0]['su-table-index']).to.equal(4)
  //   expect(component.props.data[1]['su-table-index']).to.equal(1)
  //   expect(component.props.data[2]['su-table-index']).to.equal(2)
  //   expect(component.props.data[3]['su-table-index']).to.equal(3)
  //   expect(component.props.data[4]['su-table-index']).to.equal(0)
  // })
})
