'use strict'
/**
 *{"type":"div","props":{"className":"title","style":{"backgroundColor":"green","color":"red"},"children":"hello"}}
 * @param {*} type 元素类型
 * @param {*} config 配置对象
 * @param {*} children 儿子节点或儿子们节点
 */
function createElement(type, config, children) {
    let props = { ...config }
    if (arguments.length > 3) {
        children = Array.prototype.slice.call(arguments, 2)
    }
    props.children = children
    return {
        type,
        props
    }
}

const React = {
    createElement
}

export default React;