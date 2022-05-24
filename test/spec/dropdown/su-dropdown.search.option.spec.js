import * as riot from 'riot'
import { init } from '../../helpers/'
import TargetComponent from '../../../dist/tags/dropdown/su-dropdown.js'

describe('su-dropdown-search-option', function () {
  let element, component
  init(riot)

  let zenkakuToHankaku = target => {
    return target.replace(/[Ａ-Ｚａ-ｚ０-９]/g, s => {
      return String.fromCharCode(s.charCodeAt(0) - 0xFEE0)
    }).toLocaleLowerCase()
  }
  let items = [
    {
      label: '銀行',
      value: null,
      default: true
    },
    {
      "value": "0001",
      "label": "みずほ",
      "searchKey": ["0001", "ミズホ", "みずほ", "mizuho"]
    },
    {
      "value": "0005",
      "label": "三菱ＵＦＪ",
      "searchKey": ["0005", "ミツビシユ－エフジエイ", "みつびしゆ－えふじえい", "mitsubishiyu-efujiei"]
    },
    {
      "value": "0009",
      "label": "三井住友",
      "searchKey": ["0009", "ミツイスミトモ", "みついすみとも", "mitsuisumitomo"]
    },
    {
      "value": "0010",
      "label": "りそな",
      "searchKey": ["0010", "リソナ", "りそな", "risona"]
    },
    {
      "value": "0017",
      "label": "埼玉りそな",
      "searchKey": ["0017", "サイタマリソナ", "さいたまりそな", "saitamarisona"]
    },
    {
      "value": "0033",
      "label": "ＰａｙＰａｙ",
      "searchKey": ["0033", "ペイペイ", "ぺいぺい", "peipei"]
    },
    {
      "value": "0034",
      "label": "セブン",
      "searchKey": ["0034", "セブン", "せぶん", "sebun"]
    },
    {
      "value": "0035",
      "label": "ソニー",
      "searchKey": ["0035", "ソニ－", "そに－", "soni-"]
    },
    {
      "value": "0036",
      "label": "楽天",
      "searchKey": ["0036", "ラクテン", "らくてん", "rakuten"]
    },
    {
      "value": "0038",
      "label": "住信ＳＢＩネット",
      "searchKey": ["0038", "スミシンエスビ－アイネツト", "すみしんえすび－あいねつと", "sumishinesubi-ainetsuto"]
    },
    {
      "value": "0039",
      "label": "ａｕじぶん",
      "searchKey": ["0039", "エ－ユ－ジブン", "え－ゆ－じぶん", "e-yu-jibun"]
    },
    {
      "value": "0040",
      "label": "イオン",
      "searchKey": ["0040", "イオン", "いおん", "ion"]
    },
    {
      "value": "0041",
      "label": "大和ネクスト",
      "searchKey": ["0041", "ダイワネクスト", "だいわねくすと", "daiwanekusuto"]
    },
    {
      "value": "0042",
      "label": "ローソン",
      "searchKey": ["0042", "ロ－ソン", "ろ－そん", "ro-son"]
    },
    {
      "value": "0043",
      "label": "みんなの",
      "searchKey": ["0043", "ミンナノ", "みんなの", "minnano"]
    },
    {
      "value": "0044",
      "label": "ＵＩ",
      "searchKey": ["0044", "ユ－アイ", "ゆ－あい", "yu-ai"]
    },
  ]

  beforeEach(function () {
    riot.register('su-dropdown', TargetComponent)
    element = document.createElement('su-dropdown')
    component = riot.mount(element, {
      'items': items,
      'search': true,
      'search-key-convert': zenkakuToHankaku,
    })[0]
    this.clock = sinon.useFakeTimers()
  })

  afterEach(function () {
    this.clock.restore()
    component.unmount()
    riot.unregister('su-dropdown')
  })

  it('is mounted', function () {
    expect(component).to.be.ok
  })

  it('adding text to box filters the options list', function () {
    expect(component.$('.menu').classList.contains('visible')).to.equal(false)

    fireEvent(component.$('.search'), 'focus')
    expect(component.$('.menu').classList.contains('visible')).to.equal(true)
    expect(component.$$('.menu div')).to.have.lengthOf(17)

    component.$('.search').value = '0005'
    fireEvent(component.$('.search'), 'input')
    expect(component.$$('.menu div')).to.have.lengthOf(1)

    component.$('.search').value = 'ufj'
    fireEvent(component.$('.search'), 'input')
    expect(component.$$('.menu div')).to.have.lengthOf(1)

    component.$('.search').value = 'YU'
    fireEvent(component.$('.search'), 'input')
    expect(component.$$('.menu div')).to.have.lengthOf(3)
  })
})

