const fireEvent = require('../../helpers').fireEvent
require('../../../dist/tags/progress/su-progress.js')

describe('su-progress', function () {
  let tag
  const spyOnMouseover = sinon.spy()
  const spyOnMouseout = sinon.spy()

  const mount = (html, opts) => {
    $('body').append(html)
    tag = riot.mount('su-progress', opts)[0]
    tag.on('mouseover', spyOnMouseover)
    tag.on('mouseout', spyOnMouseout)
  }

  afterEach(function () {
    spyOnMouseover.resetHistory()
    spyOnMouseout.resetHistory()
    tag.unmount()
  })

  it('is mounted', function () {
    mount('<su-progress></su-progress>')
    tag.isMounted.should.be.true
  })

  it('show label and update value', function () {
    mount('<su-progress>Uploading Files</su-progress>')
    $('su-progress .ui.progress > .label').text().trim().should.equal('Uploading Files')
    $('su-progress .bar > .progress').length.should.equal(0)
    $('su-progress .ui.progress').hasClass('success').should.equal(false)
    $('su-progress .ui.progress').hasClass('active').should.equal(false)
    tag.percent.should.equal(0)

    tag.value = 50
    tag.update()
    tag.percent.should.equal(50)
    $('su-progress .ui.progress').hasClass('success').should.equal(false)
    $('su-progress .ui.progress').hasClass('active').should.equal(false)

    tag.value = 100
    tag.update()
    tag.percent.should.equal(100)
    $('su-progress .ui.progress').hasClass('success').should.equal(true)
    $('su-progress .ui.progress').hasClass('active').should.equal(false)

    tag.value = 101
    tag.update()
    tag.percent.should.equal(100)
    $('su-progress .ui.progress').hasClass('success').should.equal(true)
    $('su-progress .ui.progress').hasClass('active').should.equal(false)
  })

  it('opts value', function () {
    mount('<su-progress>Uploading Files</su-progress>', {
      value: 50
    })
    $('su-progress .ui.progress > .label').text().trim().should.equal('Uploading Files')
    $('su-progress .bar > .progress').length.should.equal(0)
    $('su-progress .ui.progress').hasClass('success').should.equal(false)
    $('su-progress .ui.progress').hasClass('active').should.equal(false)
    tag.percent.should.equal(50)

    tag.opts.riotValue = 100
    tag.update()
    tag.percent.should.equal(100)
    $('su-progress .ui.progress').hasClass('success').should.equal(true)
    $('su-progress .ui.progress').hasClass('active').should.equal(false)
  })

  it('active option', function () {
    mount('<su-progress>Uploading Files</su-progress>', {
      class: 'progress active'
    })
    $('su-progress .ui.progress > .label').text().trim().should.equal('Uploading Files')
    $('su-progress .bar > .progress').length.should.equal(1)
    $('su-progress .ui.progress').hasClass('success').should.equal(false)
    $('su-progress .ui.progress').hasClass('active').should.equal(false)
    tag.percent.should.equal(0)

    tag.value = 50
    tag.update()
    tag.percent.should.equal(50)
    $('su-progress .ui.progress').hasClass('success').should.equal(false)
    $('su-progress .ui.progress').hasClass('active').should.equal(true)

    tag.value = 100
    tag.update()
    tag.percent.should.equal(100)
    $('su-progress .ui.progress').hasClass('success').should.equal(true)
    $('su-progress .ui.progress').hasClass('active').should.equal(false)
  })

  it('total option', function () {
    mount('<su-progress>Uploading Files</su-progress>', {
      total: '200'
    })
    $('su-progress .ui.progress > .label').text().trim().should.equal('Uploading Files')
    $('su-progress .ui.progress').hasClass('success').should.equal(false)
    $('su-progress .ui.progress').hasClass('active').should.equal(false)
    tag.percent.should.equal(0)

    tag.value = 100
    tag.update()
    tag.percent.should.equal(50)
    $('su-progress .ui.progress').hasClass('success').should.equal(false)
    $('su-progress .ui.progress').hasClass('active').should.equal(false)

    tag.value = 200
    tag.update()
    tag.percent.should.equal(100)
    $('su-progress .ui.progress').hasClass('success').should.equal(true)
    $('su-progress .ui.progress').hasClass('active').should.equal(false)
  })

})
