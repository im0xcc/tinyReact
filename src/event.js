import { updateQueue } from './react'

export function addEvent(dom, eventType, listener) {
    let store = dom.store || (dom.store = {})
    store[eventType] = listener
    if (!document[eventType]) {
        //事件委托
        document[eventType] = dispatchEvent
    }
}

let syntheticEvent = {}
function dispatchEvent(event) {
    let { target, type } = event
    // console.log('event', event)
    let eventType = `on${type}`
    updateQueue.isBatchingUpdate = true //设置为批量更新模式
    createSyntheticEvent(event)
    let { store } = target
    let listener = store && store[eventType]
    listener && listener.call(target, syntheticEvent)
    clearSyntheticEvent()
    updateQueue.batchUpdate()

}

function createSyntheticEvent(nativeEvent) {    //可对原生事件对象做些扩展
    for (let key in nativeEvent) {
        syntheticEvent[key] = nativeEvent[key]
    }
}


function clearSyntheticEvent() {
    for (let key in syntheticEvent) {
        syntheticEvent[key] = null
    }
}