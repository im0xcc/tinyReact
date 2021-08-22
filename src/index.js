import React from './react';
import ReactDOM from './react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById('root')
// );
//一、jsx声明组件
// let ele = React.createElement('div', { color: 'red', backgroundColor: 'green' }, "hello")
// let ele=(<div className="title" key="1" style={{color:'red',backgroundColor:'blue'}}><span>123</span><span>456</span></div>)
// console.log(JSON.stringify(ele))
// ReactDOM.render(ele, document.getElementById('root'))

//二、函数组件

function Child(props) {
    return <div>123</div>
}
function Welcome(props) {
    return <Child />
    return <div className="title" style={{ color: 'red' }}><span>{props.name}</span></div>
}

console.log(<Welcome name="hello" />)
ReactDOM.render(<Welcome name="hello" />, document.getElementById('root'))
// reportWebVitals();
