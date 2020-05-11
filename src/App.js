import React from "react";
//import {Navbar,NavbarBrand} from "reactstrap"
import "./App.css";
import Main from "./components/MainComponent.js"
import {BrowserRouter,withRouter} from 'react-router-dom';
import {Provider} from "react-redux";
import {ConfigureStore} from "./redux/configureStore";

const store=ConfigureStore();
class App extends React.Component{

    
    render(){
        return(
            <Provider store={store}>
                <BrowserRouter>
                <div>
                    <Main />
                </div>
                </BrowserRouter>
            </Provider>
        )
    }
}
export default App;