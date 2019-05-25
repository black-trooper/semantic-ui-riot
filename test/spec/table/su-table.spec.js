import * as riot from 'riot'
import { init, fireEvent, compile } from '../../helpers/'
import TableComponent from '../../../dist/tags/table/su-table.js'
import ThComponent from '../../../dist/tags/table/su-th.js'

describe('su-table', function () {
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
        <su-table data="{ props.data }" nulls-first="{ props.nullsFirst }">
          <su-th field="name">Name</su-th>
          <su-th field="age">Age</su-th>
          <su-th field="gender">Gender</su-th>
        </su-table>
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
    fireEvent(component.$$('su-th')[0], 'click')
    expect(component.props.data[0].name).to.equal('Amber')
    expect(component.props.data[0]['su-table-index']).to.equal(1)
    expect(component.props.data[1]['su-table-index']).to.equal(4)
    expect(component.props.data[2]['su-table-index']).to.equal(0)
    expect(component.props.data[3]['su-table-index']).to.equal(3)
    expect(component.props.data[4]['su-table-index']).to.equal(2)
    expect(component.$('su-th').classList.contains('sorted')).to.equal(true)
    expect(component.$('su-th').classList.contains('ascending')).to.equal(true)
    expect(component.$('su-th').classList.contains('descending')).to.equal(false)

    // name desc
    fireEvent(component.$$('su-th')[0], 'click')
    expect(component.props.data[0].name).to.equal('Terry')
    expect(component.$$('su-th')[0].classList.contains('sorted')).to.equal(true)
    expect(component.$$('su-th')[1].classList.contains('sorted')).to.equal(false)
    expect(component.$$('su-th')[2].classList.contains('sorted')).to.equal(false)
    expect(component.$('su-th').classList.contains('ascending')).to.equal(false)
    expect(component.$('su-th').classList.contains('descending')).to.equal(true)

    // default
    fireEvent(component.$$('su-th')[0], 'click')
    expect(component.props.data[0].name).to.equal('John')
    expect(component.$$('su-th')[0].classList.contains('sorted')).to.equal(false)
    expect(component.$$('su-th')[1].classList.contains('sorted')).to.equal(false)
    expect(component.$$('su-th')[2].classList.contains('sorted')).to.equal(false)
    expect(component.$('su-th').classList.contains('ascending')).to.equal(false)
    expect(component.$('su-th').classList.contains('descending')).to.equal(false)

    // age
    fireEvent(component.$$('su-th')[1], 'click')
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
    expect(component.$$('su-th')[1].classList.contains('sorted')).to.equal(true)
    expect(component.$$('su-th')[1].classList.contains('ascending')).to.equal(true)
    expect(component.$$('su-th')[1].classList.contains('descending')).to.equal(false)

    // gender
    // fireEvent(component.$$('su-th')[2], 'click')
    // expect(component.props.data[0]['su-table-index']).to.equal(1)
    // expect(component.props.data[1]['su-table-index']).to.equal(0)
    // expect(component.props.data[2]['su-table-index']).to.equal(2)
    // expect(component.props.data[3]['su-table-index']).to.equal(4)
    // expect(component.props.data[4]['su-table-index']).to.equal(3)
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
    // console.log(JSON.stringify(component.props.data))
    fireEvent(component.$$('su-th')[2], 'click')
    // console.log(JSON.stringify(component.props.data))
    expect(component.props.data[0]['su-table-index']).to.equal(3)
    expect(component.props.data[1]['su-table-index']).to.equal(1)
    // expect(component.props.data[2]['su-table-index']).to.equal(0)
    // expect(component.props.data[3]['su-table-index']).to.equal(2)
    // expect(component.props.data[4]['su-table-index']).to.equal(4)
  })

  // it('default sort', function () {
  //   mount({
  //     data: [
  //       { name: 'John', age: 15, gender: 'Male' },
  //       { name: 'Amber', age: 40, gender: 'Female' },
  //       { name: 'Terry', age: 25, gender: 'Male' },
  //       { name: 'Leslie', age: 25 },
  //       { name: 'Ben', age: 70, gender: 'Male' },
  //     ],
  //     defaultSortField: 'age',
  //     defaultSortReverse: true,
  //   })

  //   component.props.data[0].name.should.equal('Ben')
  //   component.props.data[0]['su-table-index'].should.equal(4)
  //   component.props.data[1]['su-table-index'].should.equal(1)
  //   component.props.data[2]['su-table-index'].should.equal(2)
  //   component.props.data[3]['su-table-index'].should.equal(3)
  //   component.props.data[4]['su-table-index'].should.equal(0)
  // })


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

  //   component.props.data[0].name.should.equal('Ben')
  //   component.props.data[0]['su-table-index'].should.equal(4)
  //   component.props.data[1]['su-table-index'].should.equal(1)
  //   component.props.data[2]['su-table-index'].should.equal(2)
  //   component.props.data[3]['su-table-index'].should.equal(3)
  //   component.props.data[4]['su-table-index'].should.equal(0)
  // })
})
