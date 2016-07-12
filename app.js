'use strict'
// const React = require('react');
// const ReactDOM = require('react-dom');
// const ReactRouter = require('react-router');
// import './less/style.less' //webpack编译时导入
// function setCookie(c_name, value, expiredays) {
//     var exdate = new Date()
//     exdate.setDate(exdate.getDate() + expiredays)
//     document.cookie = c_name + "=" + escape(value) +
//         ((expiredays == null) ? "" : ";expires=" + exdate.toGMTString())
// }
//
// function getCookie(c_name) {
//     if (document.cookie.length > 0) {
//         c_start = document.cookie.indexOf(c_name + "=")
//         if (c_start != -1) {
//             c_start = c_start + c_name.length + 1
//             c_end = document.cookie.indexOf(";", c_start)
//             if (c_end == -1) c_end = document.cookie.length
//             return unescape(document.cookie.substring(c_start, c_end))
//         }
//     }
//     return "987"
// }
// setCookie('PHPSESSID','12322323');
// console.log(getCookie('PHPSESSID'));

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
