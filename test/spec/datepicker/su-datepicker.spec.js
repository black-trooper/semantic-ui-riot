const fireEvent = require('../../helpers').fireEvent
require('../../../dist/tags/datepicker/su-datepicker.js')

riot.mixin('semantic-ui', {})

describe('su-datepicker', function () {
  let tag
  let spyOnOpen = sinon.spy()
  let spyOnClose = sinon.spy()
  let spyOnClick = sinon.spy()
  let spyOnChange = sinon.spy()
  let mount = opts => {
    tag = riot.mount('su-datepicker', opts)[0]
    tag.on('open', spyOnOpen)
      .on('close', spyOnClose)
      .on('click', spyOnClick)
      .on('change', spyOnChange)
  }
  const addZero = num => {
    return ('0' + num).slice(-2);
  }

  beforeEach(function () {
  })

  afterEach(function () {
    spyOnOpen.resetHistory()
    spyOnClose.resetHistory()
    spyOnClick.resetHistory()
    spyOnChange.resetHistory()
    tag.unmount()
  })

  it('is mounted', function () {
    $('body').append('<su-datepicker />')
    mount()
    tag.isMounted.should.be.true

    $('su-datepicker .ui.action.input').length.should.equal(0)
    spyOnOpen.should.have.been.callCount(0)
    spyOnClose.should.have.been.callCount(0)
  })

  it('opens/closes datepicker and triggers open/close event', function () {
    $('body').append('<su-datepicker />')
    mount({ dataPopup: true })
    $('su-datepicker .menu').css('visibility').should.equal('hidden')

    fireEvent($('su-datepicker button.ui.icon.button')[0], 'click')
    spyOnOpen.should.have.been.calledOnce
    $('su-datepicker .menu').css('visibility').should.equal('visible')

    fireEvent($('su-datepicker .dp-day .ui.button:first')[0], 'click')
    spyOnClick.should.have.been.calledOnce
    spyOnChange.should.have.been.calledOnce
    spyOnClose.should.have.been.calledOnce
    $('su-datepicker .menu').css('visibility').should.equal('hidden')


    fireEvent($('su-datepicker button.ui.icon.button')[0], 'click')
    spyOnOpen.should.have.been.calledTwice
    $('su-datepicker .menu').css('visibility').should.equal('visible')

    fireEvent($('su-datepicker button.ui.icon.button')[0], 'click')
    spyOnClose.should.have.been.calledTwice
    $('su-datepicker .menu').css('visibility').should.equal('hidden')

    fireEvent($('su-datepicker button.ui.icon.button')[0], 'click')
    spyOnOpen.should.have.been.callCount(3)
    $('su-datepicker .menu').css('visibility').should.equal('visible')

    fireEvent($('su-datepicker .menu')[0], 'mousedown')
    fireEvent($('su-datepicker button.ui.icon.button')[0], 'blur')
    fireEvent($('su-datepicker .menu')[0], 'mouseup')
    $('su-datepicker .menu').css('visibility').should.equal('visible')
    spyOnClose.should.have.been.calledTwice

    fireEvent($('su-datepicker .menu')[0], 'blur')
    $('su-datepicker .menu').css('visibility').should.equal('hidden')
    spyOnClose.should.have.been.callCount(3)
  })

  it('select month event', function () {
    $('body').append('<su-datepicker />')
    mount({ currentDate: new Date(2017, 11, 1) })
    tag.currentDate.getTime().should.equal(new Date(2017, 11, 1).getTime())

    fireEvent($('su-datepicker .dp-navigation .month')[0], 'click')
    $('su-datepicker .dp-day').length.should.equal(0)
    $('su-datepicker .dp-month .button').length.should.equal(12)
    $('su-datepicker .dp-month .button:first').text().trim().should.equal('Jan')

    fireEvent($('su-datepicker .dp-month .button:first')[0], 'click')
    tag.currentDate.getTime().should.equal(new Date(2017, 0, 1).getTime())

    $('su-datepicker .dp-day .button').length.should.equal(7 * 6)
    $('su-datepicker .dp-month').length.should.equal(0)
  })

  it('next/prev month event', function () {
    $('body').append('<su-datepicker />')
    mount({ currentDate: new Date(2017, 11, 1) })
    tag.currentDate.getTime().should.equal(new Date(2017, 11, 1).getTime())

    fireEvent($('su-datepicker .dp-navigation .prev')[0], 'click')
    $('su-datepicker .dp-day .button').length.should.equal(7 * 6)
    $('su-datepicker .dp-month').length.should.equal(0)
    $('su-datepicker .dp-day .button:first').text().trim().should.equal('29')
    tag.currentDate.getTime().should.equal(new Date(2017, 10, 1).getTime())

    fireEvent($('su-datepicker .dp-navigation .next')[0], 'click')
    $('su-datepicker .dp-day .button:first').text().trim().should.equal('26')
    tag.currentDate.getTime().should.equal(new Date(2017, 11, 1).getTime())
  })

  it('select year event', function () {
    $('body').append('<su-datepicker />')
    mount({ currentDate: new Date(2017, 11, 1) })
    tag.currentDate.getTime().should.equal(new Date(2017, 11, 1).getTime())

    fireEvent($('su-datepicker .dp-navigation .year')[0], 'click')
    $('su-datepicker .dp-day').length.should.equal(0)
    $('su-datepicker .dp-month .button').length.should.equal(20)
    $('su-datepicker .dp-month .button:first').text().trim().should.equal('2008')

    fireEvent($('su-datepicker .dp-navigation .next')[0], 'click')
    $('su-datepicker .dp-month .button:first').text().trim().should.equal('2028')

    fireEvent($('su-datepicker .dp-navigation .prev')[0], 'click')
    $('su-datepicker .dp-month .button:first').text().trim().should.equal('2008')

    fireEvent($('su-datepicker .dp-month .button:first')[0], 'click')
    tag.currentDate.getTime().should.equal(new Date(2008, 11, 1).getTime())

    $('su-datepicker .dp-day').length.should.equal(0)
    $('su-datepicker .dp-month .button').length.should.equal(12)
  })

  it('popup datepicker', function () {
    $('body').append('<su-datepicker />')
    mount({
      dataPopup: true,
      currentDate: new Date(2017, 11, 1)
    })
    $('su-datepicker .menu').css('visibility').should.equal('hidden')

    fireEvent($('su-datepicker button.ui.icon.button')[0], 'click')
    spyOnOpen.should.have.been.calledOnce
    $('su-datepicker .menu').css('visibility').should.equal('visible')

    fireEvent($('su-datepicker .dp-day .ui.button:eq(5)')[0], 'click')
    spyOnClose.should.have.been.calledOnce
    $('su-datepicker .menu').css('visibility').should.equal('hidden')
    tag.refs.input.value.should.equal('2017-12-01')

    tag.value = new Date(2018, 11, 1)
    tag.update()
    tag.refs.input.value.should.equal('2018-12-01')
  })

  it('popup datepicker option', function () {
    $('body').append('<su-datepicker />')
    mount({
      dataPopup: true,
      currentDate: new Date(2017, 11, 1),
      placeholder: 'YYYY/MM/DD',
      pattern: 'YYYY/MM/DD',
      locale: require('date-fns/locale/ja'),
      tabindex: 10
    })
    $('su-datepicker .menu').css('visibility').should.equal('hidden')
    $('su-datepicker .dp-weekday .column:first').text().trim().should.equal('日')
    $('su-datepicker .dp-navigation .month').text().trim().should.equal('12月')

    fireEvent($('su-datepicker button.ui.icon.button')[0], 'click')
    spyOnOpen.should.have.been.calledOnce
    $('su-datepicker .menu').css('visibility').should.equal('visible')
    $('su-datepicker input').attr('placeholder').should.equal('YYYY/MM/DD')
    $('su-datepicker input').attr('tabindex').should.equal('10')

    fireEvent($('su-datepicker .dp-day .ui.button:eq(5)')[0], 'click')
    spyOnClose.should.have.been.calledOnce
    $('su-datepicker .menu').css('visibility').should.equal('hidden')
    tag.refs.input.value.should.equal('2017/12/01')
  })

  it('popup datepicker default value', function () {
    $('body').append('<su-datepicker />')
    mount({
      dataPopup: true,
      pattern: 'YYYY/MM/DD',
      value: '2017/12/01',
    })
    tag.refs.input.value.should.equal('2017/12/01')
  })

  it('year first option', function () {
    $('body').append('<su-datepicker />')
    mount({ currentDate: new Date(2017, 11, 1), dataPopup: true, startMode: "year" })
    tag.currentDate.getTime().should.equal(new Date(2017, 11, 1).getTime())

    fireEvent($('su-datepicker button.ui.icon.button')[0], 'click')
    $('su-datepicker .dp-day').length.should.equal(0)
    $('su-datepicker .dp-month .button').length.should.equal(20)
    $('su-datepicker .dp-month .button:first').text().trim().should.equal('2008')

    fireEvent($('su-datepicker .dp-navigation .next')[0], 'click')
    $('su-datepicker .dp-month .button:first').text().trim().should.equal('2028')

    fireEvent($('su-datepicker .dp-navigation .prev')[0], 'click')
    $('su-datepicker .dp-month .button:first').text().trim().should.equal('2008')

    fireEvent($('su-datepicker .dp-month .button:first')[0], 'click')
    tag.currentDate.getTime().should.equal(new Date(2008, 11, 1).getTime())

    $('su-datepicker .dp-day').length.should.equal(0)
    $('su-datepicker .dp-month .button').length.should.equal(12)

    fireEvent($('su-datepicker .dp-month .ui.button:eq(0)')[0], 'click')
    fireEvent($('su-datepicker .dp-day .ui.button:eq(5)')[0], 'click')
    fireEvent($('su-datepicker button.ui.icon.button')[0], 'click')
    $('su-datepicker .dp-month .button:first').text().trim().should.equal('1999')
  })

  it('year range option', function () {
    $('body').append('<su-datepicker />')
    mount({ currentDate: new Date(2017, 11, 1), startMode: "year", yearRange: "40" })
    tag.currentDate.getTime().should.equal(new Date(2017, 11, 1).getTime())

    $('su-datepicker .dp-day').length.should.equal(0)
    $('su-datepicker .dp-month .button').length.should.equal(40)
    $('su-datepicker .dp-month .button:first').text().trim().should.equal('1998')

    fireEvent($('su-datepicker .dp-navigation .next')[0], 'click')
    $('su-datepicker .dp-month .button:first').text().trim().should.equal('2038')

    fireEvent($('su-datepicker .dp-navigation .prev')[0], 'click')
    $('su-datepicker .dp-month .button:first').text().trim().should.equal('1998')

    fireEvent($('su-datepicker .dp-month .button:first')[0], 'click')
    tag.currentDate.getTime().should.equal(new Date(1998, 11, 1).getTime())

    $('su-datepicker .dp-day').length.should.equal(0)
    $('su-datepicker .dp-month .button').length.should.equal(12)
  })

  it('update value', function () {
    $('body').append('<su-datepicker />')
    mount({
      pattern: 'YYYY/MM/DD',
      value: new Date(2017, 11, 1)
    })

    $('su-datepicker .dp-navigation .month').text().trim().should.equal('Dec')
    $('su-datepicker .dp-navigation .year').text().trim().should.equal('2017')
    tag.value.should.equal('2017/12/01')

    tag.value = "2018/01/01"
    tag.update()
    $('su-datepicker .dp-navigation .month').text().trim().should.equal('Jan')
    $('su-datepicker .dp-navigation .year').text().trim().should.equal('2018')
    tag.value.should.equal('2018/01/01')

    tag.value = new Date(2018, 0, 2)
    tag.update()
    $('su-datepicker .dp-navigation .month').text().trim().should.equal('Jan')
    $('su-datepicker .dp-navigation .year').text().trim().should.equal('2018')
    tag.value.should.equal('2018/01/02')

    tag.valueAsDate = new Date(2018, 0, 3)
    tag.update()
    $('su-datepicker .dp-navigation .month').text().trim().should.equal('Jan')
    $('su-datepicker .dp-navigation .year').text().trim().should.equal('2018')
    tag.value.should.equal('2018/01/03')
  })

  it('update value same day', function () {
    $('body').append('<su-datepicker />')
    mount({
      pattern: 'YYYY/MM/DD',
      value: new Date(2018, 0, 1)
    })

    $('su-datepicker .dp-navigation .month').text().trim().should.equal('Jan')
    $('su-datepicker .dp-navigation .year').text().trim().should.equal('2018')
    tag.value.should.equal('2018/01/01')

    tag.value = "2018/01/01"
    tag.update()
    $('su-datepicker .dp-navigation .month').text().trim().should.equal('Jan')
    $('su-datepicker .dp-navigation .year').text().trim().should.equal('2018')
    tag.value.should.equal('2018/01/01')

    tag.value = new Date(2018, 0, 1)
    tag.update()
    $('su-datepicker .dp-navigation .month').text().trim().should.equal('Jan')
    $('su-datepicker .dp-navigation .year').text().trim().should.equal('2018')
    tag.value.should.equal('2018/01/01')

    tag.valueAsDate = new Date(2018, 0, 1)
    tag.update()
    $('su-datepicker .dp-navigation .month').text().trim().should.equal('Jan')
    $('su-datepicker .dp-navigation .year').text().trim().should.equal('2018')
    tag.value.should.equal('2018/01/01')
  })

  it('update value with pattern', function () {
    $('body').append('<su-datepicker />')
    mount({
      pattern: 'MMMM D, YYYY',
      value: new Date(2017, 11, 1)
    })

    $('su-datepicker .dp-navigation .month').text().trim().should.equal('Dec')
    $('su-datepicker .dp-navigation .year').text().trim().should.equal('2017')
    tag.value.should.equal('December 1, 2017')

    tag.value = "January 1, 2018"
    tag.update()
    $('su-datepicker .dp-navigation .month').text().trim().should.equal('Jan')
    $('su-datepicker .dp-navigation .year').text().trim().should.equal('2018')
    tag.value.should.equal('January 1, 2018')

    tag.value = new Date(2018, 0, 2)
    tag.update()
    $('su-datepicker .dp-navigation .month').text().trim().should.equal('Jan')
    $('su-datepicker .dp-navigation .year').text().trim().should.equal('2018')
    tag.value.should.equal('January 2, 2018')

    tag.valueAsDate = new Date(2018, 0, 3)
    tag.update()
    $('su-datepicker .dp-navigation .month').text().trim().should.equal('Jan')
    $('su-datepicker .dp-navigation .year').text().trim().should.equal('2018')
    tag.value.should.equal('January 3, 2018')
  })

  it('update option value', function () {
    $('body').append('<su-datepicker />')
    mount({
      value: new Date(2017, 11, 1)
    })

    $('su-datepicker .dp-navigation .month').text().trim().should.equal('Dec')
    $('su-datepicker .dp-navigation .year').text().trim().should.equal('2017')

    tag.opts.riotValue = new Date(2018, 0, 1)
    tag.update()
    $('su-datepicker .dp-navigation .month').text().trim().should.equal('Jan')
    $('su-datepicker .dp-navigation .year').text().trim().should.equal('2018')
  })

  it('popup datepicker update input value', function () {
    $('body').append('<su-datepicker />')
    mount({
      dataPopup: true,
      pattern: 'YYYY/MM/DD',
      value: '2017/12/01',
    })
    $('su-datepicker input')[0].value = '2017/12/02'
    fireEvent($('su-datepicker input')[0], 'change')
    tag.value.should.equal('2017/12/02')
    tag.refs.input.value.should.equal('2017/12/02')
    spyOnChange.should.have.been.calledOnce

    $('su-datepicker input')[0].value = '2017-12-00'
    fireEvent($('su-datepicker input')[0], 'change')
    tag.value.should.equal('2017/11/30')
    tag.refs.input.value.should.equal('2017/11/30')
    spyOnChange.should.have.been.calledTwice

    $('su-datepicker input')[0].value = '2017/11/00'
    fireEvent($('su-datepicker input')[0], 'change')
    tag.value.should.equal('2017/10/31')
    tag.refs.input.value.should.equal('2017/10/31')
    spyOnChange.should.have.been.callCount(3)

    $('su-datepicker input')[0].value = '2017-12-aa'
    fireEvent($('su-datepicker input')[0], 'change')
    tag.value.should.equal('2017/10/31')
    tag.refs.input.value.should.equal('2017/10/31')
    spyOnChange.should.have.been.callCount(3)
  })

  it('popup datepicker clear input value', function () {
    $('body').append('<su-datepicker />')
    mount({
      dataPopup: true,
      pattern: 'YYYY/MM/DD',
      value: '2017/12/01',
    })
    $('su-datepicker input')[0].value = ''
    fireEvent($('su-datepicker input')[0], 'change')
    expect(tag.value).to.be.null
    tag.refs.input.value.should.equal('')
    spyOnChange.should.have.been.calledOnce

    $('su-datepicker input')[0].value = '2017/12/02'
    fireEvent($('su-datepicker input')[0], 'change')
    tag.value.should.equal('2017/12/02')
    tag.refs.input.value.should.equal('2017/12/02')
    spyOnChange.should.have.been.calledTwice
  })

  it('read-only option', function () {
    $('body').append('<su-datepicker class="read-only" />')
    mount()
    fireEvent($('su-datepicker .dp-day .ui.button:first')[0], 'click')
    spyOnClick.should.have.been.callCount(0)
    spyOnChange.should.have.been.callCount(0)
  })

  it('popup datepicker read-only option', function () {
    $('body').append('<su-datepicker class="read-only" />')
    mount({
      dataPopup: true
    })
    $('su-datepicker .menu').css('visibility').should.equal('hidden')

    fireEvent($('su-datepicker button.ui.icon.button')[0], 'click')
    spyOnOpen.should.have.been.callCount(0)
    $('su-datepicker .menu').css('visibility').should.equal('hidden')
  })

  it('today and clear event', function () {
    $('body').append('<su-datepicker />')
    mount({
      dataPopup: true
    })
    fireEvent($('su-datepicker button.ui.icon.button')[0], 'click')
    spyOnOpen.should.have.been.calledOnce

    fireEvent($('su-datepicker .dp-today .button')[0], 'click')
    const today = new Date()
    tag.value.should.equal(`${today.getFullYear()}-${addZero(today.getMonth() + 1)}-${addZero(today.getDate())}`)
    tag.valueAsDate.getFullYear().should.equal(today.getFullYear())
    tag.valueAsDate.getMonth().should.equal(today.getMonth())
    tag.valueAsDate.getDate().should.equal(today.getDate())
    spyOnClick.should.have.been.callCount(0)
    spyOnChange.should.have.been.calledOnce
    spyOnClose.should.have.been.calledOnce

    fireEvent($('su-datepicker button.ui.icon.button')[0], 'click')
    spyOnOpen.should.have.been.calledTwice

    fireEvent($('su-datepicker .dp-clear .button')[0], 'click')
    expect(tag.value).to.be.null
    spyOnClick.should.have.been.callCount(0)
    spyOnChange.should.have.been.calledTwice
    spyOnClose.should.have.been.calledTwice
  })

  it('upward', function () {
    $('body').append('<su-datepicker />')
    mount({
      dataPopup: true,
      direction: 'upward'
    })

    $('su-datepicker').hasClass('upward').should.equal(false)

    fireEvent($('su-datepicker button.ui.icon.button')[0], 'click')
    $('su-datepicker .ui.dropdown').hasClass('upward').should.equal(true)
  })

  it('downward', function () {
    $('body').append('<su-datepicker />')
    mount({
      dataPopup: true,
      direction: 'downward'
    })
    $('su-datepicker').hasClass('upward').should.equal(false)

    fireEvent($('su-datepicker button.ui.icon.button')[0], 'click')
    $('su-datepicker .ui.dropdown').hasClass('upward').should.equal(false)
  })

  it('support traditional options', function () {
    $('body').append('<su-datepicker />')
    mount({
      popup: true,
      direction: 'downward'
    })
    $('su-datepicker').hasClass('upward').should.equal(false)

    fireEvent($('su-datepicker button.ui.icon.button')[0], 'click')
    $('su-datepicker .ui.dropdown').hasClass('upward').should.equal(false)
  })

  it('datetime option', function () {
    $('body').append('<su-datepicker />')
    mount({
      datetime: true,
      currentDate: new Date(2017, 11, 1),
    })

    $('su-datepicker .dp-day .button').length.should.equal(7 * 6)
    $('su-datepicker .dp-month').length.should.equal(0)
    $('su-datepicker .dp-time .button').length.should.equal(48)
    $('su-datepicker .dp-time .button:first').text().trim().should.equal('00:00')
    $('su-datepicker .dp-time .button.primary').length.should.equal(0)
    expect(tag.milliseconds).to.be.null

    fireEvent($('su-datepicker .dp-day .button:eq(7)')[0], 'click')
    tag.valueAsDate.getTime().should.equal(new Date(2017, 11, 3, 0, 0).getTime())
    $('su-datepicker .dp-time .button.primary').text().trim().should.equal('00:00')

    fireEvent($('su-datepicker .dp-time .button:eq(1)')[0], 'click')
    tag.valueAsDate.getTime().should.equal(new Date(2017, 11, 3, 0, 30).getTime())
    $('su-datepicker .dp-time .button.primary').text().trim().should.equal('00:30')

    fireEvent($('su-datepicker .dp-day .button:eq(8)')[0], 'click')
    tag.valueAsDate.getTime().should.equal(new Date(2017, 11, 4, 0, 30).getTime())
  })

  it('datetime option before time click', function () {
    $('body').append('<su-datepicker />')
    mount({
      datetime: true,
      currentDate: new Date(2017, 11, 1),
    })

    $('su-datepicker .dp-day .button').length.should.equal(7 * 6)
    $('su-datepicker .dp-month').length.should.equal(0)
    $('su-datepicker .dp-time .button').length.should.equal(48)
    $('su-datepicker .dp-time .button:first').text().trim().should.equal('00:00')
    $('su-datepicker .dp-time .button.primary').length.should.equal(0)
    expect(tag.milliseconds).to.be.null

    fireEvent($('su-datepicker .dp-time .button:eq(1)')[0], 'click')
    expect(tag.valueAsDate).to.be.undefined

    fireEvent($('su-datepicker .dp-day .button:eq(7)')[0], 'click')
    tag.valueAsDate.getTime().should.equal(new Date(2017, 11, 3, 0, 0).getTime())
    $('su-datepicker .dp-time .button.primary').text().trim().should.equal('00:00')

    fireEvent($('su-datepicker .dp-time .button:eq(1)')[0], 'click')
    tag.valueAsDate.getTime().should.equal(new Date(2017, 11, 3, 0, 30).getTime())
    $('su-datepicker .dp-time .button.primary').text().trim().should.equal('00:30')

    fireEvent($('su-datepicker .dp-day .button:eq(8)')[0], 'click')
    tag.valueAsDate.getTime().should.equal(new Date(2017, 11, 4, 0, 30).getTime())
  })

  it('datetime option readonly', function () {
    $('body').append('<su-datepicker class="read-only" />')
    mount({
      datetime: true,
    })

    $('su-datepicker .dp-day .button').length.should.equal(7 * 6)
    $('su-datepicker .dp-month').length.should.equal(0)
    $('su-datepicker .dp-time .button').length.should.equal(48)
    $('su-datepicker .dp-time .button:first').text().trim().should.equal('00:00')

    fireEvent($('su-datepicker .dp-day .button:eq(7)')[0], 'click')
    expect(tag.valueAsDate).to.be.undefined

    fireEvent($('su-datepicker .dp-time .button:eq(1)')[0], 'click')
    expect(tag.valueAsDate).to.be.undefined
  })

  it('reset value', function () {
    $('body').append('<su-datepicker />')
    mount()
    expect(tag.value).to.be.null
    expect(tag.valueAsDate).to.be.undefined
    expect(tag.defaultValue).to.be.undefined

    fireEvent($('su-datepicker .dp-today .button')[0], 'click')
    const today = new Date()
    tag.value.should.equal(`${today.getFullYear()}-${addZero(today.getMonth() + 1)}-${addZero(today.getDate())}`)
    tag.valueAsDate.getFullYear().should.equal(today.getFullYear())
    tag.valueAsDate.getMonth().should.equal(today.getMonth())
    tag.valueAsDate.getDate().should.equal(today.getDate())
    expect(tag.defaultValue).to.be.undefined

    tag.reset()
    expect(tag.value).to.be.null
    expect(tag.valueAsDate).to.be.undefined
    expect(tag.defaultValue).to.be.undefined
  })

  it('reset default value', function () {
    $('body').append('<su-datepicker />')
    const date = new Date(2017, 0, 1)
    mount({ value: date })

    tag.valueAsDate.getTime().should.equal(date.getTime())
    tag.defaultValue.getTime().should.equal(date.getTime())
    tag.changed().should.equal(false)

    fireEvent($('su-datepicker .dp-today .button')[0], 'click')
    const today = new Date()
    tag.value.should.equal(`${today.getFullYear()}-${addZero(today.getMonth() + 1)}-${addZero(today.getDate())}`)
    tag.valueAsDate.getFullYear().should.equal(today.getFullYear())
    tag.valueAsDate.getMonth().should.equal(today.getMonth())
    tag.valueAsDate.getDate().should.equal(today.getDate())
    tag.defaultValue.getTime().should.equal(date.getTime())
    tag.changed().should.equal(true)

    tag.reset()
    tag.valueAsDate.getTime().should.equal(date.getTime())
    tag.defaultValue.getTime().should.equal(date.getTime())
    tag.changed().should.equal(false)
  })
})

