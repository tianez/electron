'use strict'

const classNames = require('classNames')
const ajaxUpload = require('../utils/AjaxUpload')
const FormGroup = require('./FormGroup')
const Canvas = require('./Canvas')
const {
    getUpToken,
    getHash
} = require('../utils/Qiniu')

var Upload = React.createClass({
    getDefaultProps: function() {
        return {
            title: '上传图片',
            value: '',
            files: [],
            thumbs: [],
            multiple: true,
            help: '',
        }
    },
    getInitialState: function() {
        return {
            files: this.props.files,
            thumbs: this.props.thumbs,
            help: this.props.help,
            multiple: this.props.multiple,
            shownum: 0
        }
    },
    componentWillMount: function() {
        let thumbs = this.props.value
        if (thumbs) {
            thumbs = JSON.parse(thumbs)
        } else {
            thumbs = []
        }
        let files = []
        let count = thumbs.length
        if (count == 0) {
            return
        }
        if (this.props.multiple) {
            let i
            for (i = 0; i < count; i++) {
                let file = []
                file.thumb = thumbs[i]
                file.state = 4
                files[i] = file
            }
        } else {
            let file = []
            let thumb = []
            file.thumb = thumbs[0]
            file.state = 4
            files[0] = file
            thumb.concat(thumbs[0])
            thumbs = thumb
        }
        this.setState({
            files: files,
            thumbs: thumbs
        })
    },
    componentDidMount: function() {

    },
    componentDidUpdate: function() {

    },
    _onChange: function(e) {
        e.preventDefault()
        let files = e.target.files
            // 文件过滤
            // 只允许上传图片
        files = Array.prototype.slice.call(files, 0)
        files = files.filter(function(file) {
            return /image/i.test(file.type)
        })
        let value
        if (this.props.multiple) {
            value = this.state.files
        } else {
            value = []
        }
        let count = this.props.multiple ? files.length : 1
        let i
        for (i = 0; i < count; i++) {
            files[i].thumb = URL.createObjectURL(files[i])
            files[i].state = 0
            value = value.concat(files[i])
        }
        this.setState({
            files: value
        })
        let count2 = this.props.multiple ? value.length : 1
        for (i = 0; i < count2; i++) {
            if (value[i].state != 1 && value[i].state != 4) {
                this.uploadFile(value, i)
            }
        }
    },
    uploadFile: function(files, id) {
        let qnurl = 'http://7xj11y.com1.z0.glb.clouddn.com'
        let token = getUpToken()
        let file = files[id]
        return ajaxUpload({
            url: 'http://up.qiniu.com',
            name: 'file',
            key: file.name,
            token: token,
            cors: this.props.cors,
            withCredentials: this.props.withCredentials,
            file: file,
            onProgress: (e) => {
                console.log((e.loaded / e.total) * 100 + '%')
            },
            onLoad: (e) => {
                let thumbs
                let res = JSON.parse(e.currentTarget.responseText)
                files[id].state = 1
                    // file.url = qnurl + '/' + res.name
                if (this.props.multiple) {
                    thumbs = this.state.thumbs
                } else {
                    thumbs = []
                }
                thumbs.push(qnurl + '/' + res.name)
                this.setState({
                    files: files,
                    thumbs: thumbs
                })
                thumbs = JSON.stringify(thumbs)
                if (this.props.onChange) {
                    this.props.onChange(this.props.name, thumbs)
                }
            },
            onError: () => {
                files[id].state = 2
                this.setState({
                    files: files
                })
            }
        })
    },
    _hide: function() {
        this.setState({
            isshow: false
        })
    },
    _show: function(e) {
        e.stopPropagation()
        let no = e.currentTarget.id.split("-")[1]
        this.setState({
            isshow: true,
            shownum: no
        })
    },
    _next: function(e) {
        e.stopPropagation()
        let shownum = parseInt(this.state.shownum) + 1
        if (shownum > this.state.files.length - 1) {
            shownum = 0
        }
        this.setState({
            shownum: shownum
        })
    },
    _prev: function(e) {
        e.stopPropagation()
        let shownum = parseInt(this.state.shownum) - 1
        if (shownum < 0) {
            shownum = this.state.files.length - 1
        }
        this.setState({
            shownum: shownum
        })
    },
    render: function() {
        let thumbs
        let pics
        let bullets
        let shownum = this.state.shownum
        if (this.state.files.length > 0) {
            thumbs = this.state.files.map(function(file, index) {
                let msg
                switch (file.state) {
                    case 0:
                        msg = '等待上传';
                        break;
                    case 1:
                        msg = '上传成功';
                        break;
                    case 2:
                        msg = '上传失败';
                        break;
                    case 3:
                        msg = '上传中';
                        break;
                    case 4:
                        msg = '已上传';
                        break;
                    default:
                        break;
                }
                let style = {
                    float: 'left',
                    animationDelay: 50 * index + 'ms',
                    animationDuration: '500ms',
                    paddingRight: '5px'
                }
                let thumb = file.thumb
                let patt1 = new RegExp("blob:http")
                let patt2 = new RegExp("blob:file")
                if (!patt1.test(thumb) && !patt2.test(thumb)) {
                    thumb += '-thumb'
                }
                let id = 'swiper-' + index
                return (
                    React.createElement('div', {
                            key: index,
                            className: 'animated zoomIn',
                            id: id,
                            style: style,
                            onClick: this._show
                        },
                        React.createElement(Canvas, {
                            className: 'form-canva',
                            src: thumb
                        }),
                        React.createElement('div', null, msg)
                    )
                )
            }.bind(this))
            pics = this.state.files.map(function(file, index) {
                let thumb = file.thumb
                let patt1 = new RegExp("blob:http")
                let patt2 = new RegExp("blob:file")
                if (!patt1.test(thumb) && !patt2.test(thumb)) {
                    thumb += '-max'
                }
                let show = classNames({
                    'swiper-slide': true,
                    'slide-show': shownum == index
                })
                return (
                    React.createElement('div', {
                            key: index,
                            className: show
                        },
                        React.createElement('img', {
                            className: 'swiper-lazy',
                            src: thumb
                        })
                        // React.createElement('div', {
                        //     className: 'swiper-lazy-preloader swiper-lazy-preloader-white'
                        // })
                    )
                )
            }.bind(this))
            bullets = this.state.files.map(function(file, index) {
                let bullet = classNames({
                    'swiper-pagination-bullet': true,
                    'swiper-pagination-bullet-active': shownum == index
                })
                return (
                    React.createElement('span', {
                        key: index,
                        className: bullet
                    })
                )
            }.bind(this))
        } else {
            thumbs = ''
            pics = ''
            bullets = ''
        }
        let swiperClass = classNames({
            'swiper-container': true,
            'swiper-container-horizontal': true,
            'swiper-show': this.state.isshow
        })
        return (
            React.createElement(FormGroup, {
                    title: this.props.title
                },
                React.createElement('input', {
                    id: 'file',
                    name: 'file',
                    className: 'ipt',
                    type: 'file',
                    multiple: 'multiple',
                    onChange: this._onChange
                }),
                React.createElement('div', {
                    className: 'form-canvas'
                }, thumbs),
                React.createElement('div', {
                    className: 'clear'
                }),
                React.createElement('section', {
                        className: swiperClass
                    },
                    React.createElement('div', {
                        className: 'swiper-wrapper',
                        onClick: this._hide
                    }, pics),
                    React.createElement('div', {
                            className: 'swiper-pagination swiper-pagination-white swiper-pagination-clickable swiper-pagination-bullets'
                        },
                        bullets
                    ),
                    React.createElement('div', {
                        className: 'swiper-button-next swiper-button-white',
                        onClick: this._next
                    }),
                    React.createElement('div', {
                        className: 'swiper-button-prev swiper-button-white',
                        onClick: this._prev
                    })
                )
            )
        )
    }
})

module.exports = Upload
