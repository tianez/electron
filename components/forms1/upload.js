'use strict';
var FormGroup = require('./formGroup')
var Canvas2 = require('../Canvas2')
var ajaxUpload = require('./ajaxupload')
const Upload = React.createClass({

    getInitialState: function() {
        return {
            files: [],
            thumbs: [],
        }
    },

    getDefaultProps: function() {
        return {
            autoUpload: false,
            cors: true,
            fileSize: 40960,
            limit: 1,
            withCredentials: false,
            btnValue: '上传图片',
            multiple: true,
        }
    },
    componentWillMount: function() {
        let thumbs = this.props.value
        if (thumbs == '') {
            thumbs = []
        } else {
            thumbs = JSON.parse(thumbs)
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
            thumbs: thumbs,
        })
    },
    componentDidMount: function() {},
    _onChange: function(e) {
        e.preventDefault()
        let files = e.target.files
            // 文件过滤
            // 只允许上传图片
        files = Array.prototype.slice.call(files, 0)
        files = files.filter(function(file) {
            return /image/i.test(file.type)
        })
        let count = this.props.multiple ? files.length : 1
        let i
        for (i = 0; i < count; i++) {
            files[i].thumb = URL.createObjectURL(files[i])
            files[i].state = 0
        }
        let value
        if (this.props.multiple) {
            value = this.state.files
        } else {
            value = []
        }
        value = value.concat(files)
        this.setState({
            files: value
        })
    },
    uploads: function() {
        let files = this.state.files
        let count = this.props.multiple ? files.length : 1
        let i
        for (i = 0; i < count; i++) {
            if (files[i].state != 1 && files[i].state != 4) {
                this.uploadFile(files[i], i)
            }
        }
    },

    uploadFile(file, id) {
        let files = this.state.files
        return ajaxUpload({
            url: '/upload',
            name: 'file',
            cors: this.props.cors,
            withCredentials: this.props.withCredentials,
            file: file,
            onProgress: (e) => {
                files[id].state = 3;
                this.setState({
                    files: files,
                })
                console.log((e.loaded / e.total) * 100 + '%')
            },
            onLoad: (e) => {
                let thumbs
                files[id].state = 1;
                let res = JSON.parse(e.currentTarget.responseText);
                file.url = res[0].info.path + res[0].info.name;
                if (this.props.multiple) {
                    thumbs = this.state.thumbs

                } else {
                    thumbs = []
                }
                thumbs.push(file.url)
                this.setState({
                    files: files,
                    thumbs: thumbs
                })
                thumbs = JSON.stringify(thumbs)
                this.props._onChange(this.props.k, thumbs)
            },
            onError: () => {
                let files = this.state.files;
                files[id].state = 2;
                this.setState({
                    files: files
                })
            }
        })
    },

    _onClick: function(e) {
        // this.refs.fileInput.click();
        let fileInput = document.getElementById(this.props.k)
        fileInput.click()
    },

    _onClickd: function(e) {
        if (this.props.multiple) {
            e.stopPropagation()
        } else {
            console.log(123)
        }
    },

    _onUp: function(e) {
        e.stopPropagation()
        let no = e.target.id
        no = no.split("-")
        no = no[1]
        if (no == 0) {
            return
        }
        let files = this.state.files
        let thumbs = this.state.thumbs
        let file_up = files[no]
        let thumbs_up = thumbs[no]
        files.splice(no, 1)
        thumbs.splice(no, 1)
        files.splice(no - 1, 0, file_up)
        thumbs.splice(no - 1, 0, thumbs_up)
        this.setState({
            files: files,
            thumbs: thumbs
        })
        thumbs = JSON.stringify(thumbs)
        this.props._onChange(this.props.k, thumbs)
    },
    _onDown: function(e) {
        e.stopPropagation()
        let no = e.target.id
        no = no.split("-")
        no = no[1]
        let files = this.state.files
        let length = files.length - 1
        if (no == length) {
            return
        }
        let thumbs = this.state.thumbs
        let file_up = files[no]
        let thumbs_up = thumbs[no]
        files.splice(no, 1)
        thumbs.splice(no, 1)
        files.splice(no + 1, 0, file_up)
        thumbs.splice(no + 1, 0, thumbs_up)
        this.setState({
            files: files,
            thumbs: thumbs
        })
        thumbs = JSON.stringify(thumbs)
        this.props._onChange(this.props.k, thumbs)
    },
    _onDel: function(e) {
        let no = e.target.id
        no = no.split("-")
        no = no[1]
        let files = this.state.files
        let thumbs = this.state.thumbs
        files.splice(no, 1)
        thumbs.splice(no, 1)
        this.setState({
            files: files,
            thumbs: thumbs
        })
        thumbs = JSON.stringify(thumbs)
        this.props._onChange(this.props.k, thumbs)
    },

    render: function() {
        let i = 0
        let thumbs = this.state.files.map(function(file) {
            let j = i
            i++
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
            return React.createElement('div', {
                    key: j,
                    style: {
                        float: 'left',
                        margin: '0 5px',
                        animationDelay: 50 * j + 'ms',
                        animationDuration: '500ms',
                    },
                    className: 'animated zoomIn',
                    onClick: this._onClickd,
                    id: 'd_canvas' + j,
                },
                React.createElement(Canvas, {
                    src: file.thumb,
                    id: 'canvas' + j,
                }),
                React.createElement('p', {}, msg,
                    React.createElement('span', {
                        style: {
                            marginLeft: '15px',
                            cursor: 'pointer'
                        },
                        id: this.props.k + '-' + j,
                        onClick: this._onDel,
                    }, '删除'),
                    React.createElement('span', {
                        style: {
                            'marginLeft': '15px',
                            cursor: 'pointer'
                        },
                        id: this.props.k + 'u-' + j,
                        onClick: this._onUp,
                    }, '上移'),
                    React.createElement('span', {
                        style: {
                            'marginLeft': '15px',
                            cursor: 'pointer'
                        },
                        id: this.props.k + 'd-' + j,
                        onClick: this._onDown,
                    }, '下移')
                )
            );
        }.bind(this));
        return (
            React.createElement(FormGroup, {
                    title: this.props.title,
                    help: this.state.tip,
                    k: this.props.kk,
                },
                React.createElement('input', {
                    type: 'file',
                    ref: 'fileInput',
                    id: this.props.k,
                    multiple: this.props.multiple,
                    onChange: this._onChange,
                    style: {
                        display: 'none'
                    }
                }),
                React.createElement('div', {
                        onClick: this._onClick,
                        style: {
                            minHeight: '200px',
                            border: '1px solid #e5e5e5',
                            padding: '10px 5px',
                            marginBottom: '10px',
                            float: 'left',
                            width: '100%',
                        }
                    },
                    this.state.files.length ?
                    React.createElement("div", {
                            className: "thumb-box"
                        },
                        thumbs
                    ) : null
                ),
                React.createElement('input', {
                    className: 'btn btn-success submit-btn',
                    type: 'button',
                    onClick: this.uploads,
                    value: this.props.btnValue,
                    style: {
                        float: 'left',
                    }
                })
            )
        )

    }

})

module.exports = Upload