import * as riot from 'riot'
import { init, fireEvent, fireKeyEvent, keys } from '../../helpers/'
import TargetComponent from '../../../dist/tags/dropdown/su-select.js'

describe('su-select', function () {
  let element, component
  let spyOnChange = sinon.spy()
  let spyOnBlur = sinon.spy()
  init(riot)

  let items = [
    {
      label: 'Gender',
      value: null,
      default: true
    },
    {
      label: 'Male',
      value: 1
    },
    {
      label: 'Female',
      value: 2
    },
  ]

  beforeEach(function () {
    riot.register('su-select', TargetComponent)
    element = document.createElement('su-select')
    component = riot.mount(element, {
      'items': items,
      'onchange': spyOnChange,
      'onblur': spyOnBlur,
    })[0]
  })

  afterEach(function () {
    spyOnChange.reset()
    spyOnBlur.reset()
    riot.unregister('su-select')
  })

  // it('is mounted', function () {
  //   expect(component).to.be.ok
  // })

  // it('clicking default item', function () {
  //   expect(component.$('su-select select').classList.contains('default')).to.equal(true)
  //   component.$('su-select select').click()

  //   component.$('su-select option').click()
  //   expect(component.$('su-select select').classList.contains('default')).to.equal(true)
  //   expect(spyOnChange).callCount(0)

  //   expect(element.getAttribute('value')).to.be.null
  // })

  // it('clicking item', function () {
  //   expect(component.$('su-select select').classList.contains('default')).to.equal(true)
  //   component.$('su-select select').click()

  //   // TODO riot の onchange イベントを呼び出せないので仕方なく changeValues を実行している
  //   tag.changeValues(items[1].value)
  //   expect(component.$('su-select select').classList.contains('default')).to.equal(false)
  //   expect(spyOnChange).calledOnce

  //   tag.value.should.deep.equal(items[1].value)
  //   tag.label.should.deep.equal(items[1].label)

  //   fireEvent(component.$('su-select select'), 'blur')
  //   expect(spyOnBlur).calledOnce
  // })

  // it('update value', function () {
  //   expect(tag.value).to.be.null
  //   tag.value = items[1].value
  //   tag.update()
  //   tag.value.should.deep.equal(items[1].value)
  //   tag.label.should.deep.equal(items[1].label)
  // })

  // it('update item value', function () {
  //   tag.value = items[1].value
  //   tag.update()
  //   items[1].value = 'M'
  //   tag.update()
  //   expect(tag.value).to.be.null
  // })

  // it('update items', function () {
  //   $('su-select option').length.should.equal(3)

  //   tag.opts.items = [
  //     {
  //       label: 'Alphabet',
  //       value: null,
  //       default: true
  //     },
  //     {
  //       label: 'A to C',
  //       items: [
  //         {
  //           label: 'A',
  //           value: 'a'
  //         },
  //         {
  //           label: 'B',
  //           value: 'b'
  //         },
  //         {
  //           label: 'C',
  //           value: 'c'
  //         }]
  //     }
  //   ]
  //   tag.update()

  //   $('su-select option').length.should.equal(4)
  //   expect(spyOnChange).callCount(0)

  //   // TODO riot の onchange イベントを呼び出せないので仕方なく changeValues を実行している
  //   tag.changeValues('a')
  //   expect(component.$('su-select select').classList.contains('default')).to.equal(false)
  //   expect(spyOnChange).calledOnce

  //   tag.value.should.deep.equal('a')
  //   tag.label.should.deep.equal('A')
  // })

  // it('reset value', function () {
  //   expect(tag.value).to.be.null
  //   expect(tag.defaultValue).to.be.null
  //   tag.changed().should.deep.equal(false)

  //   // TODO riot の onchange イベントを呼び出せないので仕方なく changeValues を実行している
  //   tag.changeValues(items[1].value)

  //   tag.value.should.deep.equal(items[1].value)
  //   tag.changed().should.deep.equal(true)
  //   expect(tag.defaultValue).to.be.null

  //   tag.reset()
  //   expect(tag.value).to.be.null
  //   expect(tag.defaultValue).to.be.null
  //   tag.changed().should.deep.equal(false)
  // })
})
