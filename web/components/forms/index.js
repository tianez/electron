'use strict'
const Form = require('./Form')
const Input = require('./Input')
const Textarea = require('./Textarea')
const Editer = require('./Editer')
const Canvas = require('./Canvas')
const Upload = require('./Upload')
const Radio = require('./Radio')
const Checkbox = require('./Checkbox')
const Range = require('./Range')
const Button = require('./Button')
const Hidden = require('./Hidden')
const ColorPicker = require('./ColorPicker')
const Select = require('./Select')
const Tab = require('./Tab')
const Audio = require('./Audio')
const {
    Calendar,
    DateRange
} = require('react-date-range')

var Forms = {
    Form: Form,
    Input: Input,
    Textarea: Textarea,
    Editer: Editer,
    Canvas: Canvas,
    Upload: Upload,
    Radio: Radio,
    Checkbox: Checkbox,
    Range: Range,
    Button: Button,
    Hidden: Hidden,
    Calendar: Calendar,
    DateRange: DateRange,
    ColorPicker: ColorPicker,
    Select: Select,
    Tab: Tab,
    Audio: Audio
}
module.exports = Forms
