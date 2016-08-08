'use strict'

var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup

var placeholder = document.createElement("div");
placeholder.className = "placeholder";
var Drag = React.createClass({
    getInitialState: function() {
        return {
            items: ['hello', 'world', 'click', 'me']
        };
    },
    handleAdd: function() {
        // var name = prompt("Please enter your name", "")
        let add = 'add:' + Math.random()
        var newItems = this.state.items.concat([add]);
        this.setState({
            items: newItems
        });
    },
    handleRemove: function(i) {
        var newItems = this.state.items;
        newItems.splice(i, 1);
        this.setState({
            items: newItems
        });
    },
    dragStart: function(e) {
        this.dragged = e.currentTarget;
        e.dataTransfer.effectAllowed = 'move';
        // // Firefox requires dataTransfer data to be set
        e.dataTransfer.setData("text/html", e.currentTarget);
    },
    dragEnd: function(e) {
        this.dragged.style.display = "block";
        this.dragged.parentNode.removeChild(placeholder);
        // Update data
        var items = this.state.items;
        var from = Number(this.dragged.dataset.id);
        var to = Number(this.over.dataset.id);
        if (from < to) to--;
        if (this.nodePlacement == "after") to++;
        items.splice(to, 0, items.splice(from, 1)[0]);
        this.setState({
            items: items
        });
    },
    dragOver: function(e) {
        e.preventDefault();
        this.dragged.style.display = "none";
        if (e.target.className == "placeholder") return;
        this.over = e.target;
        // Inside the dragOver method
        var relY = e.clientY - this.over.offsetTop;
        var height = this.over.offsetHeight / 2;
        var parent = e.target.parentNode;
        if (relY > height) {
            this.nodePlacement = "after";
            parent.insertBefore(placeholder, e.target.nextElementSibling);
        } else if (relY < height) {
            this.nodePlacement = "before"
            parent.insertBefore(placeholder, e.target);
        }
    },
    handleSelect: function(date) {
        console.log(date); // Momentjs object
    },
    render: function() {
        var items = this.state.items.map(function(item, i) {
            return (
                React.createElement('div', {
                        key: item,
                        className: "item",
                        onClick: this.handleRemove.bind(this, i),
                        'data-id': i,
                        draggable: true,
                        onDragEnd: this.dragEnd,
                        onDragStart: this.dragStart
                    },
                    item
                )
            );
        }.bind(this));
        return (
            React.createElement('div', {
                    className: 'container pure-g'
                },
                React.createElement('div', {
                        className: 'pure-u-1'
                    },
                    React.createElement('h3', null, 'Hello, world2!'),
                    React.createElement('button', {
                            onClick: this.handleAdd
                        },
                        'Add Item'
                    ),
                    React.createElement(ReactCSSTransitionGroup, {
                            transitionName: 'example',
                            transitionEnter: false,
                            onDragOver: this.dragOver
                                // transitionLeave: false
                        },
                        items
                    )
                )
            )
        )
    }
});

module.exports = Drag
