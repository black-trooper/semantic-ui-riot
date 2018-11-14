require('../../../dist/tags/table/su-table.js')
require('../../../dist/tags/table/su-th.js')

describe('su-table', function () {
  let tag

  const mount = opts => {
    const html = $('<su-table></su-table>')
    html
      .append('<su-th field="name">Name</su-th>')
      .append('<su-th field="age">Age</su-th>')
      .append('<su-th field="gender">Gender</su-th>')
    $('body').append(html)

    tag = riot.mount('su-table', opts)[0]
  }

  afterEach(function () {
    tag.unmount()
  })

  it('is mounted', function () {
    mount()
    tag.isMounted.should.be.true
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
    $('su-table su-th:first').click()
    tag.opts.data[0].name.should.equal('Amber')
    tag.opts.data[0]['su-table-index'].should.equal(1)
    tag.opts.data[1]['su-table-index'].should.equal(4)
    tag.opts.data[2]['su-table-index'].should.equal(0)
    tag.opts.data[3]['su-table-index'].should.equal(3)
    tag.opts.data[4]['su-table-index'].should.equal(2)
    $('su-table su-th:first').hasClass('sorted').should.equal(true)
    $('su-table su-th:first').hasClass('ascending').should.equal(true)
    $('su-table su-th:first').hasClass('descending').should.equal(false)

    // name desc
    $('su-table su-th:first').click()
    tag.opts.data[0].name.should.equal('Terry')
    $('su-table su-th:first').hasClass('sorted').should.equal(true)
    $('su-table su-th:eq(1)').hasClass('sorted').should.equal(false)
    $('su-table su-th:eq(2)').hasClass('sorted').should.equal(false)
    $('su-table su-th:eq(3)').hasClass('sorted').should.equal(false)
    $('su-table su-th:first').hasClass('ascending').should.equal(false)
    $('su-table su-th:first').hasClass('descending').should.equal(true)

    // default
    $('su-table su-th:first').click()
    tag.opts.data[0].name.should.equal('John')
    $('su-table su-th:first').hasClass('sorted').should.equal(false)
    $('su-table su-th:eq(1)').hasClass('sorted').should.equal(false)
    $('su-table su-th:eq(2)').hasClass('sorted').should.equal(false)
    $('su-table su-th:eq(3)').hasClass('sorted').should.equal(false)
    $('su-table su-th:first').hasClass('ascending').should.equal(false)
    $('su-table su-th:first').hasClass('descending').should.equal(false)

    // age
    $('su-table su-th:eq(1)').click()
    tag.opts.data[0].age.should.equal(15)
    tag.opts.data[1].age.should.equal(25)
    tag.opts.data[2].age.should.equal(25)
    tag.opts.data[3].age.should.equal(40)
    tag.opts.data[4].age.should.equal(70)
    tag.opts.data[0]['su-table-index'].should.equal(0)
    tag.opts.data[1]['su-table-index'].should.equal(2)
    tag.opts.data[2]['su-table-index'].should.equal(3)
    tag.opts.data[3]['su-table-index'].should.equal(1)
    tag.opts.data[4]['su-table-index'].should.equal(4)
    $('su-table su-th:eq(1)').hasClass('sorted').should.equal(true)
    $('su-table su-th:eq(1)').hasClass('ascending').should.equal(true)
    $('su-table su-th:eq(1)').hasClass('descending').should.equal(false)

    // gender
    $('su-table su-th:eq(2)').click()
    tag.opts.data[0]['su-table-index'].should.equal(1)
    tag.opts.data[1]['su-table-index'].should.equal(0)
    tag.opts.data[2]['su-table-index'].should.equal(2)
    tag.opts.data[3]['su-table-index'].should.equal(4)
    tag.opts.data[4]['su-table-index'].should.equal(3)
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
    $('su-table su-th:eq(2)').click()
    tag.opts.data[0]['su-table-index'].should.equal(3)
    tag.opts.data[1]['su-table-index'].should.equal(1)
    tag.opts.data[2]['su-table-index'].should.equal(0)
    tag.opts.data[3]['su-table-index'].should.equal(2)
    tag.opts.data[4]['su-table-index'].should.equal(4)
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

    tag.opts.data[0].name.should.equal('Ben')
    tag.opts.data[0]['su-table-index'].should.equal(4)
    tag.opts.data[1]['su-table-index'].should.equal(1)
    tag.opts.data[2]['su-table-index'].should.equal(2)
    tag.opts.data[3]['su-table-index'].should.equal(3)
    tag.opts.data[4]['su-table-index'].should.equal(0)
  })


  it('update data with default sort', function () {
    mount({
      data: [],
      defaultSortField: 'age',
      defaultSortReverse: true,
    })

    tag.opts.data = [
      { name: 'John', age: 15, gender: 'Male' },
      { name: 'Amber', age: 40, gender: 'Female' },
      { name: 'Terry', age: 25, gender: 'Male' },
      { name: 'Leslie', age: 25 },
      { name: 'Ben', age: 70, gender: 'Male' },
    ]
    tag.update()

    tag.opts.data[0].name.should.equal('Ben')
    tag.opts.data[0]['su-table-index'].should.equal(4)
    tag.opts.data[1]['su-table-index'].should.equal(1)
    tag.opts.data[2]['su-table-index'].should.equal(2)
    tag.opts.data[3]['su-table-index'].should.equal(3)
    tag.opts.data[4]['su-table-index'].should.equal(0)
  })
})
