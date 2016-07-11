'use strict'
// const React = require('react');
// const ReactDOM = require('react-dom');
// const ReactRouter = require('react-router');
// import './less/style.less' //webpack编译时导入

var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup
const {
    Router,
    Route,
    IndexRoute,
    Redirect,
    hashHistory,
    browserHistory
} = ReactRouter

const {
    Layout,
    Nomatch,
    Home,
    Drag,
    ApiCloudsIndex,
    ApiClouds,
    ApiCloud,
    Pages,
    Page,
    Login
} = require('./html')

require('./html/global')

function onEnter(nextState, replace) {
    let pathname = nextState.location.pathname
    let user = storedb('user').find() ? true : false
    console.log(storedb('user').find())
    if (!user && pathname !== 'login' && pathname !== '/login') {
        ConfigActions.update('msg', '你还没有登录，请先登录！')
        replace({
            pathname: '/login'
        })
    } else if (user && (pathname == 'login' || pathname == '/login')) {
        replace({
            pathname: '/'
        })
    }
}


const routers = (
    React.createElement(Router, {
            history: hashHistory
        },
        React.createElement(Route, {
                path: "/",
                component: Layout,
                onEnter: onEnter
            },
            React.createElement(IndexRoute, {
                component: Home
            }),
            React.createElement(Route, {
                path: "drag",
                component: Drag
            }),
            React.createElement(Route, {
                    path: "apicloud",
                    // onEnter: onEnter
                },
                React.createElement(IndexRoute, {
                    component: ApiCloudsIndex
                }),
                React.createElement(Route, {
                        path: ":clouds"
                    },
                    React.createElement(IndexRoute, {
                        component: ApiClouds
                    }),
                    React.createElement(Route, {
                        path: ":articleId",
                        component: ApiCloud
                    })
                )
            ),
            React.createElement(Route, {
                    path: "api",
                    // onEnter: onEnter
                },
                React.createElement(IndexRoute, {
                    component: ApiCloudsIndex
                }),
                React.createElement(Redirect, {
                    from: ':pages',
                    to: ':pages/index'
                }),
                React.createElement(Route, {
                        path: ":pages"
                    },
                    React.createElement(Route, {
                        path: "index",
                        component: Pages
                    }),
                    React.createElement(Route, {
                        path: ":page",
                        component: Page
                    })
                )
            )
        ),
        React.createElement(Route, {
            path: "login",
            component: Login
        }),
        React.createElement(Route, {
            path: "*",
            component: Nomatch
        })
    )
)
ReactDOM.render(routers, document.getElementById('app'))
