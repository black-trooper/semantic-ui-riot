import * as riot from 'riot'
import { init, fireEvent, compile } from '../../helpers/'
import TargetComponent from '../../../dist/tags/datepicker/su-datepicker.js'

describe('su-datepicker', function () {
  let element, component
  let spyOnOpen = sinon.spy()
  let spyOnClose = sinon.spy()
  let spyOnClick = sinon.spy()
  let spyOnChange = sinon.spy()
  init(riot)

  const mount = opts => {
    const option = Object.assign({
      'onopen': spyOnOpen,
      'onclose': spyOnClose,
      'onclick': spyOnClick,
      'onchange': spyOnChange,
    }, opts)
    element = document.createElement('app')
    riot.register('su-datepicker', TargetComponent)
    const AppComponent = compile(`
      <app>
        <su-datepicker
          onopen="{ () => dispatch('open') }"
          onclose="{ () => dispatch('close') }"
          onclick="{ () => dispatch('click') }"
          onchange="{ () => dispatch('change') }"
          popup="{ props.popup }"
          current-date="{ props.currentDate }"
          value="{ value || props.value }"
          placeholder="{ props.placeholder }"
          pattern="{ props.pattern }"
          locale="{ props.locale }"
          tabindex="{ props.tabindex }"
          start-mode="{ props.startMode }"
          year-range="{ props.yearRange }"
          class="{ props.class }"
          direction="{ props.direction }"
        />
        <button id="reset" type="button" onclick="{ reset }">reset</button>
        <script>
          export default {
            reset() {
              this.obs.trigger(this.$('su-datepicker').id + '-reset')
            }
          }
        </script>
      </app>`)
    riot.register('app', AppComponent)
    component = riot.mount(element, option)[0]
  }

  const addZero = num => {
    return ('0' + num).slice(-2);
  }

  afterEach(function () {
    spyOnOpen.reset()
    spyOnClose.reset()
    spyOnClick.reset()
    spyOnChange.reset()
    riot.unregister('su-datepicker')
    riot.unregister('app')
  })

  it('is mounted', function () {
    mount()
    expect(component).to.be.ok

    expect(component.$('.ui.action.input')).to.be.undefined
    expect(spyOnOpen).to.have.been.not.called
    expect(spyOnClose).to.have.been.not.called
  })

  it('opens/closes datepicker and triggers open/close event', function () {
    mount({
      popup: true
    })
    expect(component.$('.menu').classList.contains('hidden')).to.be.ok

    fireEvent(component.$('button.ui.icon.button'), 'click')
    expect(spyOnOpen).to.have.been.calledOnce
    expect(component.$('.menu').classList.contains('visible')).to.be.ok

    fireEvent(component.$('.dp-day .ui.button'), 'click')
    expect(spyOnClick).to.have.been.calledOnce
    expect(spyOnChange).to.have.been.calledOnce
    expect(spyOnClose).to.have.been.calledOnce
    expect(component.$('.menu').classList.contains('hidden')).to.be.ok


    fireEvent(component.$('button.ui.icon.button'), 'click')
    expect(spyOnOpen).to.have.been.calledTwice
    expect(component.$('.menu').classList.contains('visible')).to.be.ok

    fireEvent(component.$('button.ui.icon.button'), 'click')
    expect(spyOnClose).to.have.been.calledTwice
    expect(component.$('.menu').classList.contains('hidden')).to.be.ok

    fireEvent(component.$('button.ui.icon.button'), 'click')
    expect(spyOnOpen).to.have.been.callCount(3)
    expect(component.$('.menu').classList.contains('visible')).to.be.ok

    fireEvent(component.$('.menu'), 'mousedown')
    fireEvent(component.$('button.ui.icon.button'), 'blur')
    fireEvent(component.$('.menu'), 'mouseup')
    expect(component.$('.menu').classList.contains('visible')).to.be.ok
    expect(spyOnClose).to.have.been.calledTwice

    fireEvent(component.$('.menu'), 'blur')
    expect(component.$('.menu').classList.contains('hidden')).to.be.ok
    expect(spyOnClose).to.have.been.callCount(3)
  })

  it('select month event', function () {
    mount({
      currentDate: new Date(2017, 11, 1)
    })
    expect(component.$('.dp-navigation .year').innerText).to.equal('2017')
    expect(component.$('.dp-navigation .month').innerText).to.equal('Dec')

    fireEvent(component.$('.dp-navigation .month'), 'click')
    expect(component.$('.dp-day')).to.be.undefined
    expect(component.$$('.dp-month').length).to.equal(12)
    expect(component.$('.dp-month').innerText.trim()).to.equal('Jan')

    fireEvent(component.$('.dp-month .button'), 'click')
    expect(component.$('.dp-navigation .year').innerText).to.equal('2017')
    expect(component.$('.dp-navigation .month').innerText).to.equal('Jan')

    expect(component.$$('.dp-day').length).to.equal(7 * 6)
    expect(component.$('.dp-month')).to.be.undefined
  })

  it('next/prev month event', function () {
    mount({
      currentDate: new Date(2017, 11, 1)
    })
    expect(component.$('.dp-day').innerText).to.be.equal('26')
    expect(component.$('.dp-navigation .year').innerText).to.equal('2017')
    expect(component.$('.dp-navigation .month').innerText).to.equal('Dec')

    fireEvent(component.$('.dp-navigation .prev'), 'click')
    expect(component.$$('.dp-day').length).to.be.equal(7 * 6)
    expect(component.$('.dp-month')).to.be.undefined
    expect(component.$('.dp-day').innerText).to.be.equal('29')
    expect(component.$('.dp-navigation .year').innerText).to.equal('2017')
    expect(component.$('.dp-navigation .month').innerText).to.equal('Nov')

    fireEvent(component.$('.dp-navigation .next'), 'click')
    expect(component.$('.dp-day').innerText).to.be.equal('26')
    expect(component.$('.dp-navigation .year').innerText).to.equal('2017')
    expect(component.$('.dp-navigation .month').innerText).to.equal('Dec')
  })

  it('select year event', function () {
    mount({
      currentDate: new Date(2017, 11, 1)
    })
    expect(component.$('.dp-navigation .year').innerText).to.equal('2017')
    expect(component.$('.dp-navigation .month').innerText).to.equal('Dec')

    fireEvent(component.$('.dp-navigation .year'), 'click')
    expect(component.$('.dp-day')).to.be.undefined
    expect(component.$$('.dp-month').length).to.be.equal(20)
    expect(component.$('.dp-month').innerText).to.be.equal('2008')

    fireEvent(component.$('.dp-navigation .next'), 'click')
    expect(component.$('.dp-month').innerText).to.be.equal('2028')

    fireEvent(component.$('.dp-navigation .prev'), 'click')
    expect(component.$('.dp-month').innerText).to.be.equal('2008')

    fireEvent(component.$('.dp-month .button'), 'click')

    expect(component.$('.dp-day')).to.be.undefined
    expect(component.$$('.dp-month').length).to.be.equal(12)
  })

  it('popup datepicker', function () {
    mount({
      popup: true,
      currentDate: new Date(2017, 11, 1)
    })
    expect(component.$('.menu').classList.contains('hidden')).to.be.ok

    fireEvent(component.$('button.ui.icon.button'), 'click')
    expect(spyOnOpen).to.have.been.calledOnce
    expect(component.$('.menu').classList.contains('visible')).to.be.ok

    fireEvent(component.$$('.dp-day .ui.button')[5], 'click')
    expect(spyOnClose).to.have.been.calledOnce
    expect(component.$('.menu').classList.contains('hidden')).to.be.ok
    expect(component.$('input').value).to.equal('2017-12-01')

    component.value = new Date(2018, 11, 1)
    component.update()
    expect(component.$('input').value).to.equal('2018-12-01')
  })

  it('popup datepicker option', function () {
    mount({
      popup: true,
      currentDate: new Date(2017, 11, 1),
      placeholder: 'YYYY/MM/DD',
      pattern: 'YYYY/MM/DD',
      locale: require('date-fns/locale/ja'),
      tabindex: 10
    })
    expect(component.$('.menu').classList.contains('hidden')).to.be.ok
    expect(component.$('.dp-weekday').innerText.trim()).to.equal('日')
    expect(component.$('.dp-navigation .month').innerText.trim()).to.equal('12月')

    fireEvent(component.$('button.ui.icon.button'), 'click')
    expect(spyOnOpen).to.have.been.calledOnce
    expect(component.$('.menu').classList.contains('visible')).to.be.ok
    expect(component.$('input').getAttribute('placeholder')).to.equal('YYYY/MM/DD')
    expect(component.$('input').getAttribute('tabindex')).to.equal('10')

    fireEvent(component.$$('.dp-day .ui.button')[5], 'click')
    expect(spyOnClose).to.have.been.calledOnce
    expect(component.$('.menu').classList.contains('hidden')).to.be.ok
    expect(component.$('input').value).to.equal('2017/12/01')
  })

  it('popup datepicker default value', function () {
    mount({
      popup: true,
      pattern: 'YYYY/MM/DD',
      value: '2017/12/01',
    })
    expect(component.$('input').value).to.equal('2017/12/01')
  })

  it('year first option', function () {
    mount({ currentDate: new Date(2017, 11, 1), popup: true, startMode: "year" })
    expect(component.$('.dp-navigation .year').innerText).to.equal('2017')
    expect(component.$('.dp-navigation .month').innerText).to.equal('Dec')

    fireEvent(component.$('button.ui.icon.button'), 'click')
    expect(component.$('.dp-day')).to.be.undefined
    expect(component.$$('.dp-month').length).to.equal(20)
    expect(component.$('.dp-month').innerText.trim()).to.equal('2008')

    fireEvent(component.$('.dp-navigation .next'), 'click')
    expect(component.$('.dp-month').innerText.trim()).to.equal('2028')

    fireEvent(component.$('.dp-navigation .prev'), 'click')
    expect(component.$('.dp-month').innerText.trim()).to.equal('2008')

    fireEvent(component.$('.dp-month .button'), 'click')
    expect(component.$('.dp-navigation .year').innerText).to.equal('2008')
    expect(component.$('.dp-navigation .month').innerText).to.equal('Dec')

    expect(component.$('.dp-day')).to.undefined
    expect(component.$$('.dp-month').length).to.equal(12)

    fireEvent(component.$('.dp-month .ui.button'), 'click')
    fireEvent(component.$$('.dp-day .ui.button')[5], 'click')
    fireEvent(component.$('button.ui.icon.button'), 'click')
    expect(component.$('.dp-month').innerText.trim()).to.equal('1999')
  })

  it('year range option', function () {
    mount({ currentDate: new Date(2017, 11, 1), startMode: "year", yearRange: "40" })
    expect(component.$('.dp-navigation .year').innerText).to.equal('2017')
    expect(component.$('.dp-navigation .month').innerText).to.equal('Dec')

    expect(component.$('.dp-day')).to.be.undefined
    expect(component.$$('.dp-month').length).to.equal(40)
    expect(component.$('.dp-month').innerText.trim()).to.equal('1998')

    fireEvent(component.$('.dp-navigation .next'), 'click')
    expect(component.$('.dp-month').innerText.trim()).to.equal('2038')

    fireEvent(component.$('.dp-navigation .prev'), 'click')
    expect(component.$('.dp-month').innerText.trim()).to.equal('1998')

    fireEvent(component.$('.dp-month .button'), 'click')
    expect(component.$('.dp-navigation .year').innerText).to.equal('1998')
    expect(component.$('.dp-navigation .month').innerText).to.equal('Dec')

    expect(component.$('.dp-day')).to.be.undefined
    expect(component.$$('.dp-month').length).to.equal(12)
  })

  it('update value', function () {
    mount({
      pattern: 'YYYY/MM/DD',
      value: new Date(2017, 11, 1)
    })

    expect(component.$('.dp-navigation .month').innerText.trim()).to.equal('Dec')
    expect(component.$('.dp-navigation .year').innerText.trim()).to.equal('2017')
    expect(component.$('su-datepicker').getAttribute('value')).to.equal('2017-12-01')
    expect(component.$('su-datepicker').getAttribute('formated-value')).to.equal('2017/12/01')

    component.value = "2018/01/01"
    component.update()
    expect(component.$('.dp-navigation .month').innerText.trim()).to.equal('Jan')
    expect(component.$('.dp-navigation .year').innerText.trim()).to.equal('2018')
    expect(component.$('su-datepicker').getAttribute('value')).to.equal('2018-01-01')
    expect(component.$('su-datepicker').getAttribute('formated-value')).to.equal('2018/01/01')

    component.value = new Date(2018, 0, 2)
    component.update()
    expect(component.$('.dp-navigation .month').innerText.trim()).to.equal('Jan')
    expect(component.$('.dp-navigation .year').innerText.trim()).to.equal('2018')
    expect(component.$('su-datepicker').getAttribute('value')).to.equal('2018-01-02')
    expect(component.$('su-datepicker').getAttribute('formated-value')).to.equal('2018/01/02')
  })

  // it('update value same day', function () {
  //   mount({
  //     pattern: 'YYYY/MM/DD',
  //     value: new Date(2018, 0, 1)
  //   })

  //   expect(component.$('.dp-navigation .month').innerText.trim()).to.equal('Jan')
  //   expect(component.$('.dp-navigation .year').innerText.trim()).to.equal('2018')
  //   expect(component.$('su-datepicker').getAttribute('value')).to.equal('2018-01-01')
  //   expect(component.$('su-datepicker').getAttribute('formated-value')).to.equal('2018/01/01')

  //   component.value = "2018/01/01"
  //   component.update()
  //   expect(component.$('.dp-navigation .month').innerText.trim()).to.equal('Jan')
  //   expect(component.$('.dp-navigation .year').innerText.trim()).to.equal('2018')
  //   expect(component.$('su-datepicker').getAttribute('value')).to.equal('2018-01-01')
  //   expect(component.$('su-datepicker').getAttribute('formated-value')).to.equal('2018/01/01')
  // })

  it('update value with pattern', function () {
    mount({
      pattern: 'MMMM D, YYYY',
      value: new Date(2017, 11, 1)
    })

    expect(component.$('.dp-navigation .month').innerText.trim()).to.equal('Dec')
    expect(component.$('.dp-navigation .year').innerText.trim()).to.equal('2017')
    expect(component.$('su-datepicker').getAttribute('value')).to.equal('2017-12-01')
    expect(component.$('su-datepicker').getAttribute('formated-value')).to.equal('December 1, 2017')

    component.value = "January 1, 2018"
    component.update()
    expect(component.$('.dp-navigation .month').innerText.trim()).to.equal('Jan')
    expect(component.$('.dp-navigation .year').innerText.trim()).to.equal('2018')
    expect(component.$('su-datepicker').getAttribute('value')).to.equal('2018-01-01')
    expect(component.$('su-datepicker').getAttribute('formated-value')).to.equal('January 1, 2018')

    component.value = new Date(2018, 0, 2)
    component.update()
    expect(component.$('.dp-navigation .month').innerText.trim()).to.equal('Jan')
    expect(component.$('.dp-navigation .year').innerText.trim()).to.equal('2018')
    expect(component.$('su-datepicker').getAttribute('value')).to.equal('2018-01-02')
    expect(component.$('su-datepicker').getAttribute('formated-value')).to.equal('January 2, 2018')
  })

  it('read-only option', function () {
    mount({
      class: 'read-only'
    })
    fireEvent(component.$('.dp-day .ui.button'), 'click')
    expect(spyOnClick).to.have.been.not.called
    expect(spyOnChange).to.have.been.not.called
  })

  it('popup datepicker read-only option', function () {
    mount({
      class: 'read-only',
      popup: true
    })
    expect(component.$('.menu').classList.contains('hidden')).to.be.ok

    fireEvent(component.$('button.ui.icon.button'), 'click')
    expect(spyOnOpen).to.have.been.not.called
    expect(component.$('.menu').classList.contains('hidden')).to.be.ok
  })

  it('today and clear event', function () {
    mount({
      popup: true
    })
    fireEvent(component.$('button.ui.icon.button'), 'click')
    expect(spyOnOpen).to.have.been.calledOnce

    fireEvent(component.$('.dp-today .button'), 'click')
    const today = new Date()
    expect(component.$('su-datepicker').getAttribute('value')).to.equal(`${today.getFullYear()}-${addZero(today.getMonth() + 1)}-${addZero(today.getDate())}`)
    expect(component.$('su-datepicker').getAttribute('formated-value')).to.equal(`${today.getFullYear()}-${addZero(today.getMonth() + 1)}-${addZero(today.getDate())}`)
    // tag.valueAsDate.getFullYear().to.equal(today.getFullYear())
    // tag.valueAsDate.getMonth().to.equal(today.getMonth())
    // tag.valueAsDate.getDate().to.equal(today.getDate())
    expect(spyOnClick).to.have.been.not.called
    expect(spyOnChange).to.have.been.calledOnce
    expect(spyOnClose).to.have.been.calledOnce

    fireEvent(component.$('button.ui.icon.button'), 'click')
    expect(spyOnOpen).to.have.been.calledTwice

    fireEvent(component.$('.dp-clear .button'), 'click')
    expect(component.$('su-datepicker').getAttribute('value')).to.be.null
    expect(component.$('su-datepicker').getAttribute('formated-value')).to.be.null
    expect(spyOnClick).to.have.been.not.called
    expect(spyOnChange).to.have.been.calledTwice
    expect(spyOnClose).to.have.been.calledTwice
  })

  it('upward', function () {
    mount({
      popup: true,
      direction: 'upward'
    })

    expect(component.$('su-datepicker').classList.contains('upward')).to.equal(false)

    fireEvent(component.$('button.ui.icon.button'), 'click')
    expect(component.$('.ui.dropdown').classList.contains('upward')).to.equal(true)
  })

  it('downward', function () {
    mount({
      popup: true,
      direction: 'downward'
    })
    expect(component.$('su-datepicker').classList.contains('upward')).to.equal(false)

    fireEvent(component.$('button.ui.icon.button'), 'click')
    expect(component.$('.ui.dropdown').classList.contains('upward')).to.equal(false)
  })

  it('reset value', function () {
    mount()
    expect(component.$('su-datepicker').getAttribute('value')).to.be.null
    expect(component.$('su-datepicker').getAttribute('formated-value')).to.be.null
    expect(component.$('su-datepicker').getAttribute('changed')).to.be.not.ok

    fireEvent(component.$('.dp-today .button'), 'click')
    const today = new Date()
    expect(component.$('su-datepicker').getAttribute('value')).to.equal(`${today.getFullYear()}-${addZero(today.getMonth() + 1)}-${addZero(today.getDate())}`)
    expect(component.$('su-datepicker').getAttribute('formated-value')).to.equal(`${today.getFullYear()}-${addZero(today.getMonth() + 1)}-${addZero(today.getDate())}`)
    expect(component.$('su-datepicker').getAttribute('changed')).to.be.ok

    fireEvent(component.$('#reset'), 'click')
    expect(component.$('su-datepicker').getAttribute('value')).to.be.null
    expect(component.$('su-datepicker').getAttribute('formated-value')).to.be.null
    expect(component.$('su-datepicker').getAttribute('changed')).to.be.not.ok
  })

  it('reset default value', function () {
    const date = new Date(2017, 0, 1)
    mount({ value: date })

    expect(component.$('.dp-navigation .month').innerText.trim()).to.equal('Jan')
    expect(component.$('.dp-navigation .year').innerText.trim()).to.equal('2017')
    expect(component.$('su-datepicker').getAttribute('value')).to.equal('2017-01-01')
    expect(component.$('su-datepicker').getAttribute('formated-value')).to.equal('2017-01-01')
    expect(component.$('su-datepicker').getAttribute('changed')).to.be.not.ok

    fireEvent(component.$('.dp-today .button'), 'click')
    const today = new Date()
    expect(component.$('su-datepicker').getAttribute('value')).to.equal(`${today.getFullYear()}-${addZero(today.getMonth() + 1)}-${addZero(today.getDate())}`)
    expect(component.$('su-datepicker').getAttribute('formated-value')).to.equal(`${today.getFullYear()}-${addZero(today.getMonth() + 1)}-${addZero(today.getDate())}`)
    expect(component.$('su-datepicker').getAttribute('changed')).to.be.ok

    fireEvent(component.$('#reset'), 'click')
    expect(component.$('su-datepicker').getAttribute('value')).to.equal('2017-01-01')
    expect(component.$('su-datepicker').getAttribute('formated-value')).to.equal('2017-01-01')
    expect(component.$('su-datepicker').getAttribute('changed')).to.be.not.ok
  })
})
