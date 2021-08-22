import React from './react';
import ReactDOM from './react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

console.log('11', <h1>11</h1>)

// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById('root')
// );
// let ele = React.createElement('div', { color: 'red', backgroundColor: 'green' }, "hello")
let ele=(<div className="title" key="1" style={{color:'red',backgroundColor:'blue'}}><span>123</span><span>456</span></div>)
console.log(JSON.stringify(ele))
ReactDOM.render(ele, document.getElementById('root'))

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
