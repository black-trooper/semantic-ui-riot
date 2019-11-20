import chai from 'chai'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
import { fireEvent, fireKeyEvent, keys } from '../helpers/'

chai.use(sinonChai)
global.sinon = sinon
global.expect = chai.expect

global.fireEvent = fireEvent
global.fireKeyEvent = fireKeyEvent
global.keys = keys
