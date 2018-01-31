const fireEvent = require('../../helpers').fireEvent

describe('su-datepicker', function () {
  let tag
  let spyOnOpen = sinon.spy()
  let spyOnClose = sinon.spy()
  let mount = opts => {
    tag = riot.mount('su-datepicker', opts)[0]
    tag.on('open', spyOnOpen)
      .on('close', spyOnClose)
  }

  beforeEach(function () {
  })

  afterEach(function () {
    spyOnOpen.reset()
    spyOnClose.reset()
    tag.unmount()
  })

  it('is mounted', function () {
    $('body').append('<su-datepicker />')
    mount()
    tag.isMounted.should.be.true

    $('su-datepicker .ui.action.input').size().should.equal(0)
    spyOnOpen.should.have.been.callCount(0)
    spyOnClose.should.have.been.callCount(0)
  })

  it('opens/closes datepicker and triggers open/close event', function () {
    $('body').append('<su-datepicker />')
    mount({ popup: true })
    $('su-datepicker .menu').is(':visible').should.equal(false)

    fireEvent($('su-datepicker button.ui.icon.button')[0], 'click')
    spyOnOpen.should.have.been.calledOnce
    $('su-datepicker .menu').is(':visible').should.equal(true)

    fireEvent($('su-datepicker .dp-day .ui.button:first')[0], 'click')
    spyOnClose.should.have.been.calledOnce
    $('su-datepicker .menu').is(':visible').should.equal(false)


    fireEvent($('su-datepicker button.ui.icon.button')[0], 'click')
    spyOnOpen.should.have.been.calledTwice
    $('su-datepicker .menu').is(':visible').should.equal(true)

    fireEvent($('su-datepicker button.ui.icon.button')[0], 'click')
    spyOnClose.should.have.been.calledTwice
    $('su-datepicker .menu').is(':visible').should.equal(false)

    fireEvent($('su-datepicker button.ui.icon.button')[0], 'click')
    spyOnOpen.should.have.been.callCount(3)
    $('su-datepicker .menu').is(':visible').should.equal(true)

    fireEvent($('su-datepicker .menu')[0], 'mousedown')
    fireEvent($('su-datepicker button.ui.icon.button')[0], 'blur')
    fireEvent($('su-datepicker .menu')[0], 'mouseup')
    $('su-datepicker .menu').is(':visible').should.equal(true)
    spyOnClose.should.have.been.calledTwice

    fireEvent($('su-datepicker .menu')[0], 'blur')
    $('su-datepicker .menu').is(':visible').should.equal(false)
    spyOnClose.should.have.been.callCount(3)
  })

  it('select month event', function () {
    $('body').append('<su-datepicker />')
    mount({ currentDate: new Date(2017, 11, 1) })
    tag.opts.currentDate.getTime().should.equal(new Date(2017, 11, 1).getTime())

    fireEvent($('su-datepicker .dp-navigation .link')[1], 'click')
    $('su-datepicker .dp-day').size().should.equal(0)
    $('su-datepicker .dp-month').size().should.equal(12)
    $('su-datepicker .dp-month:first').text().should.equal('Jan')

    fireEvent($('su-datepicker .dp-month:first .button')[0], 'click')
    tag.opts.currentDate.getTime().should.equal(new Date(2017, 0, 1).getTime())

    $('su-datepicker .dp-day').size().should.equal(7 * 6)
    $('su-datepicker .dp-month').size().should.equal(0)
  })


  it('next/prev month event', function () {
    $('body').append('<su-datepicker />')
    mount({ currentDate: new Date(2017, 11, 1) })
    tag.opts.currentDate.getTime().should.equal(new Date(2017, 11, 1).getTime())

    fireEvent($('su-datepicker .dp-navigation .link')[0], 'click')
    $('su-datepicker .dp-day').size().should.equal(7 * 6)
    $('su-datepicker .dp-month').size().should.equal(0)
    $('su-datepicker .dp-day:first').text().trim().should.equal('29')
    tag.opts.currentDate.getTime().should.equal(new Date(2017, 10, 1).getTime())

    fireEvent($('su-datepicker .dp-navigation .link')[3], 'click')
    $('su-datepicker .dp-day:first').text().trim().should.equal('26')
    tag.opts.currentDate.getTime().should.equal(new Date(2017, 11, 1).getTime())
  })


  it('select year event', function () {
    $('body').append('<su-datepicker />')
    mount({ currentDate: new Date(2017, 11, 1) })
    tag.opts.currentDate.getTime().should.equal(new Date(2017, 11, 1).getTime())

    fireEvent($('su-datepicker .dp-navigation .link')[2], 'click')
    $('su-datepicker .dp-day').size().should.equal(0)
    $('su-datepicker .dp-month').size().should.equal(20)
    $('su-datepicker .dp-month:first').text().should.equal('2008')

    fireEvent($('su-datepicker .dp-navigation .link')[3], 'click')
    $('su-datepicker .dp-month:first').text().should.equal('2028')

    fireEvent($('su-datepicker .dp-navigation .link')[0], 'click')
    $('su-datepicker .dp-month:first').text().should.equal('2008')

    fireEvent($('su-datepicker .dp-month:first .button')[0], 'click')
    tag.opts.currentDate.getTime().should.equal(new Date(2008, 11, 1).getTime())

    $('su-datepicker .dp-day').size().should.equal(0)
    $('su-datepicker .dp-month').size().should.equal(12)
  })

  it('popup datepicker', function () {
    $('body').append('<su-datepicker />')
    mount({
      popup: true,
      currentDate: new Date(2017, 11, 1)
    })
    $('su-datepicker .menu').is(':visible').should.equal(false)

    fireEvent($('su-datepicker button.ui.icon.button')[0], 'click')
    spyOnOpen.should.have.been.calledOnce
    $('su-datepicker .menu').is(':visible').should.equal(true)

    fireEvent($('su-datepicker .dp-day .ui.button:eq(5)')[0], 'click')
    spyOnClose.should.have.been.calledOnce
    $('su-datepicker .menu').is(':visible').should.equal(false)
    tag.refs.input.value.should.equal('2017-12-01')
  })

  it('popup datepicker option', function () {
    $('body').append('<su-datepicker />')
    mount({
      popup: true,
      currentDate: new Date(2017, 11, 1),
      placeholder: 'YYYY/MM/DD',
      pattern: 'yyyy/MM/dd',
      tabindex: 10
    })
    $('su-datepicker .menu').is(':visible').should.equal(false)

    fireEvent($('su-datepicker button.ui.icon.button')[0], 'click')
    spyOnOpen.should.have.been.calledOnce
    $('su-datepicker .menu').is(':visible').should.equal(true)
    $('su-datepicker input').attr('placeholder').should.equal('YYYY/MM/DD')
    $('su-datepicker input').attr('tabindex').should.equal('10')

    fireEvent($('su-datepicker .dp-day .ui.button:eq(5)')[0], 'click')
    spyOnClose.should.have.been.calledOnce
    $('su-datepicker .menu').is(':visible').should.equal(false)
    tag.refs.input.value.should.equal('2017/12/01')
  })

  it('update option value', function () {
    $('body').append('<su-datepicker />')
    mount({
      value: new Date(2017, 11, 1)
    })

    $('su-datepicker .dp-navigation .column:eq(1)').text().trim().should.equal('Dec')
    $('su-datepicker .dp-navigation .column:eq(2)').text().trim().should.equal('2017')

    tag.opts.riotValue = new Date(2018, 0, 1)
    tag.update()
    $('su-datepicker .dp-navigation .column:eq(1)').text().trim().should.equal('Jan')
    $('su-datepicker .dp-navigation .column:eq(2)').text().trim().should.equal('2018')
  })
})
