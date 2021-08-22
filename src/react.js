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

export let updateQueue = {
    isBatchingUpdate: false,//是否处于批量更新模式
    updaters: new Set(),
    batchUpdate(){
        for(let updater of this.updaters){
            updater.UpdateClassComponent()
        }
        this.isBatchingUpdate=false;
        this.updaters.clear()
    }
}
class Updater {
    constructor(classInstance) {
        this.classInstance = classInstance  //类组件实例
        this.pendingState = []  //等待生效的状态，一个函数，或者一个对象
        this.cbs = []
    }

    addState(portialState, cb) {
        this.pendingState.push(portialState)
        if (typeof cb === 'function') {
            this.cbs.push(cb)
        }
        if (updateQueue.isBatchingUpdate) {
            updateQueue.updaters.add(this)
        } else {
            this.UpdateClassComponent()
        }
    }
    getState() {
        let { classInstance, pendingState } = this
        let { state } = classInstance
        pendingState.forEach(nextState => {
            if (typeof nextState === 'function') {
                nextState = nextState(state)
            }

            state = { ...state, ...nextState }
        })
        //处理完成，清空数组
        pendingState.length = 0

        return state
    }
    UpdateClassComponent() {
        let { classInstance, pendingState, cbs } = this
        if (pendingState.length > 0) {
            classInstance.state = this.getState() //计算新状态
            classInstance.forceUpdate()
            //处理所有回调函数
            this.cbs.forEach(cb => cb())
            this.cbs.length = 0
        }
    }
}

class Component {
    static isReactComponent = true  //用来区分是类组件还是函数组件
    constructor(props) {
        this.props = props
        this.state = {}
        this.updater = new Updater(this)
    }
    setState(portialState, cb) {
        this.updater.addState(portialState, cb)
    }

    forceUpdate() {
        let newVdom = this.render()
        UpdateClassComponent(this, newVdom)
    }
    render() {
        throw new Error("子类需重写父类render方法")
    }
}

function UpdateClassComponent(classInstance, vdom) {
    let oldDOM = classInstance.dom
    let newDOM = createDOM(vdom);
    oldDOM.parentNode.replaceChild(newDOM, oldDOM)   ///将旧的dom进行替换
    classInstance.dom = newDOM
}

const React = {
    createElement,
    Component
}

export default React;