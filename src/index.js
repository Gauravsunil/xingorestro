import React from 'react';
import ReactDOM from 'react-dom';
import'font-awesome/css/font-awesome.min.css';
import 'bootstrap-social/bootstrap-social.css';
//import Form from "./Form.js"
//import Form2 from "./Form2.js"
import App from "./App.js"
// class App extends React.Component{
//     constructor(){
//         super()
//         this.state={count:1}
//         this.handle=this.handle.bind(this)
//     }

//     handle(){
//         this.setState(prestate=>{
//             return {count:prestate.count+1}
//         })
//     }
//     render(){
//         return(
//             <div style={{margin:"auto",textAlign:"center"}}>
//         <h2>{this.state.count}</h2>
//         <button type="submit" className="btn btn-success" onClick={this.handle}>Click</button>
//         </div>
//         )
//     }
// }

//LifeCycle----------------------------------------------------
// class App extends Component{
//     constructor(){
//         super()
//         this.state={color:"red"}
//     }
//     // static getDerivedStateFromProps(props,state){

//     //     return{color:props.color}
//     // }
//     componentDidMount(){
//         setTimeout(()=>{
//             this.setState({color:"blue"})
//         },1000)
//     }
//     getSnapshotBeforeUpdate(prevProps,prevState){

//         document.getElementById("div1").innerHTML="COLOR BEFORE UPDATE WAS "+prevState.color;
//     }
//     componentDidUpdate(){
//         document.getElementById("div2").innerHTML="COLOR AFTER UPDATE WAS "+this.state.color;
//     }
//     render(){
//         return(
//             <div>
//                 <h2 style={{color:this.state.color}}>COLOR HIGHLIGHT</h2>
//                 <h3 id="div1"></h3>
//                 <h3 id="div2"></h3>
//             </div>
//         )
//     }
//  }
 ReactDOM.render(<App />, document.getElementById('root'));

//ReactDOM.render(<Form />,document.getElementById("root"));
//ReactDOM.render(<Form2 />,document.getElementById("root"));