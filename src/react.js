'use strict'
import { createDOM } from './react-dom'
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

class Component {
    static isReactComponent = true  //用来区分是类组件还是函数组件
    constructor(props) {
        this.props = props
        this.state = {}
    }
    setState(portialState) {
        let oldState = this.state
        this.state = { ...oldState, ...portialState }
        let newVdom = this.render()
        console.log('setState', newVdom)
        UpdateClassComponent(this, newVdom)
    }
    render() {
        throw new Error("子类需重写父类render方法")
    }
}

function UpdateClassComponent(classInstance, vdom) {
    let oldDOM = classInstance.dom
    let newDOM = createDOM(vdom);
    console.log(newDOM)
    oldDOM.parentNode.replaceChild(newDOM,oldDOM)   ///将旧的dom进行替换
    classInstance.dom = newDOM
}

const React = {
    createElement,
    Component
}

export default React;