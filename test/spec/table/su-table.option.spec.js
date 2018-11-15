require('../../../dist/tags/table/su-table.js')
require('../../../dist/tags/table/su-th.js')

describe('su-table-option', function () {
  let tag

  const mount = (html, opts) => {
    $('body').append(html)

    tag = riot.mount('su-table', opts)[0]
  }

  afterEach(function () {
    tag.unmount()
  })

  it('is mounted', function () {
    const html = $('<su-table></su-table>')
    html
      .append('<su-th field="name">Name</su-th>')
    mount(html)
    tag.isMounted.should.be.true
  })

  it('single-header', function () {
    const html = $('<su-table></su-table>')
    html
      .append('<su-th field="name">Name</su-th>')
    mount(html, {
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
  })

  it('none-header', function () {
    const html = $('<su-table></su-table>')
    mount(html, {
      data: [
        { name: 'John', age: 15, gender: 'Male' },
        { name: 'Amber', age: 40, gender: 'Female' },
        { name: 'Terry', age: 25, gender: 'Male' },
        { name: 'Leslie', age: 25 },
        { name: 'Ben', age: 70, gender: 'Male' },
      ]
    })

    tag.opts.data[0].name.should.equal('John')
    $('su-table su-th:first').hasClass('sorted').should.equal(false)
    $('su-table su-th:eq(1)').hasClass('sorted').should.equal(false)
    $('su-table su-th:eq(2)').hasClass('sorted').should.equal(false)
    $('su-table su-th:eq(3)').hasClass('sorted').should.equal(false)
    $('su-table su-th:first').hasClass('ascending').should.equal(false)
    $('su-table su-th:first').hasClass('descending').should.equal(false)
  })
})
