import logo from './logo.svg';
import './App.css';
import React from 'react';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

class Child1 extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      name: 'Child1 hello'
    }
  }

  handleChangeName = () => {
    // this.setState({
    //   name:'change'
    // })
    this.props.handleChangeName()
  }
  render() {
    console.log("Child1 render");
    return (
      <>
        <div>This is {this.props.name}</div>
        <button onClick={this.handleChangeName}>改变</button>
      </>
    )
  }
}

class Child2 extends React.PureComponent {
  constructor(props) {
    super(props)
  }
  render() {
    console.log("Child2 render");
    return (
      <div>This is Child2</div>
    )
  }
}

function Child3(props) {
  console.log('Child3 render')
  return <div>This is Child3</div>
}

let MemoChild3=React.memo(Child3)

class App extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      name: 'App'
    }
  }
  handleChangeName = () => {
    this.setState({
      name: 'App change'
    })
  }
  render() {
    console.log("App render",<h1 htmlFor="title"><span>1</span></h1>);
    return (
      <React.Fragment>
        <Child1 name={this.state.name} handleChangeName={this.handleChangeName} />
        <Child2 />
        <MemoChild3/>
      </React.Fragment>

    )
  }
}

export default App;
