import { addEvent } from "./event"

/**
 * 将虚拟DOM转化为真实DOM
 * 将虚拟DOM上的属性更新到真实DOM上
 * 将虚拟DOM上的子元素转化为真是DOM,并挂载
 * @param {Object} vdom 虚拟DOM对象
 * @param {string} container 容器（根元素）
 */
function render(vdom, container) {
    const dom = createDOM(vdom)
    container.appendChild(dom)
}

/**
 * "hello"
 * 123
 * {"type":"div","props":{"children":1}}
 * {"type":"div","props":{"children":"hello"}}
 * {"type":"div","props":{"className":"title","style":{"backgroundColor":"green","color":"red"},"children":"hello"}}
 * {"type":"div","key":"1","ref":null,"props":{"className":"title","style":{"color":"red"},"children":{"type":"span","key":null,"ref":null,"props":{"children":"123"},"_owner":null,"_store":{}}},"_owner":null,"_store":{}}
 * {"type":"div","key":"1","ref":null,"props":{"className":"title","style":{"color":"red"},"children":[{"type":"span","key":null,"ref":null,"props":{"children":"123"},"_owner":null,"_store":{}},{"type":"span","key":null,"ref":null,"props":{"children":"456"},"_owner":null,"_store":{}}]},"_owner":null,"_store":{}}
 * 将虚拟DOM转化为真实DOM
 * @param {Object} vdom 虚拟DOM
 */
export function createDOM(vdom) {
    let dom
    //处理vdom为字符串或者数字类型数据，则返回一个文本节点
    if (typeof vdom === 'string' || typeof vdom === 'number') {
        return document.createTextNode(vdom)
    }

    //处理vdom是虚拟DOM
    const { type, props } = vdom

    if (typeof type === 'function') {   //处理函数组件
        if (type.isReactComponent) {
            return mountClassComponent(vdom)    //处理类组件
        } else {
            return mountFunctionComponent(vdom) //处理函数组件
        }
    } else {  //处理原生组件
        dom = document.createElement(type)
    }

    updateProps(dom, props)

    //处理子元素情况
    //子元素为字符串或者数字
    if (typeof props.children === 'string' || typeof props.children === 'number') {
        dom.textContent = props.children
        //子元素为虚拟DOM,且为一个虚拟DOM
    } else if (typeof props.children === 'object' && props.children.type) {
        render(props.children, dom)
        //子元素为虚拟DOM,且为多个虚拟DOM
    } else if (Array.isArray(props.children)) {
        reconcilChildren(props.children, dom)
    }
    else {
        //其他情况不做处理，理论不存在
    }

    //将真实DOM作为一个属性挂载虚拟DOM上
    //vdom.dom = dom
    return dom
}

/**
 * "props":{"className":"title","style":{"color":"red"},"children":"hello"}
 * 将虚拟DOM上的属性更新到真实DOM上
 * @param {*} dom 真实DOM
 * @param {*} props 新属性
 */
function updateProps(dom, props) {
    for (let key in props) {
        if (key === 'children') continue
        else if (key === 'style') {
            let styles = props.style
            for (let attr in styles) {
                //此处注意写法
                dom.style[attr] = styles[attr]  //将虚拟DOM上的样式添加到真实DOM上去
            }
        } else if (key === 'className') {   //将虚拟DOM类名添加到真实DOM上去
            dom.className = props.className
        } else if (key.startsWith('on')) {
            // dom[key.toLocaleLowerCase()] = props[key]
            addEvent(dom,key.toLocaleLowerCase(),props[key])
        }
    }

}

/**
 * 处理//子元素为虚拟DOM,且为多个虚拟DOM，每个虚拟DOM转为真实DOM并挂载到真实DOM父节点
 * @param {*} childrenVDOM 
 * @param {*} parentDOM 
 */
function reconcilChildren(childrenVDOM, parentDOM) {
    for (let i = 0; i < childrenVDOM.length; i++) {
        render(childrenVDOM[i], parentDOM)
    }
}

function mountFunctionComponent(vdom) {
    const { type, props } = vdom
    let renderVDOM = type(props)
    return createDOM(renderVDOM)
}

function mountClassComponent(vdom) {
    const { type, props } = vdom
    let instance = new type(props)
    let renderVDOM = instance.render()
    let dom = createDOM(renderVDOM)
    instance.dom = dom
    return dom
}

const ReactDOM = {
    render
}

export default ReactDOM;