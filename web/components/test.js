(function(root, factory) {
    if (typeof define === 'function' && define.amd) {
        define('simditor-html', ["simditor"], function(a0) {
            return (root['HTMLButton'] = factory(a0));
        });
    } else if (typeof exports === 'object') {
        module.exports = factory(require("simditor"));
    } else {
        root['SimditorHTML'] = factory(Simditor);
    }
}(this, function(Simditor) {
    var HTMLButton,
        extend = function(child, parent) {
            for (var key in parent) {
                if (hasProp.call(parent, key)) child[key] = parent[key];
            }
            function ctor() {
                this.constructor = child;
            }
            ctor.prototype = parent.prototype;
            child.prototype = new ctor();
            child.__super__ = parent.prototype;
            return child;
        },
        hasProp = {}.hasOwnProperty;
    HTMLButton = (function(superClass) {
        extend(HTMLButton, superClass);
        function HTMLButton() {
            return HTMLButton.__super__.constructor.apply(this, arguments);
        }
        HTMLButton.prototype.name = 'test';
        HTMLButton.prototype.icon = 'html5';
        return HTMLButton;
    })(Simditor.Button);
    Simditor.Toolbar.addButton(HTMLButton);
    return HTMLButton;
}));
