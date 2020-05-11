import React from "react";
//import "./App.css";
import Menu from "./MenuComponent.js"
import {DISHES} from "../shared/Dishes.js"
import DishDetailComponent from "./DishdetailComponent.js"
import Header from "./Header.js";
import Footer from "./Footer.js";
import Home from './HomeComponent.js'
import {Switch,Route,Redirect} from "react-router-dom";
import Contact from "./ContactComponent.js"
import {COMMENTS} from "../shared/Comments.js"
import {PROMOTIONS} from "../shared/Promotions.js"
import {LEADERS} from "../shared/Leaders.js"
import About from "./AboutUsComponent.js";
// import {connect} from "react-redux";


 class Main extends React.Component{
 
    constructor(){
        super();
        this.state={
            dishes:DISHES,
            comments: COMMENTS,
            promotions: PROMOTIONS,
            leaders: LEADERS
        }
    }


    render(){
        const HomePage=()=>{
            return(
                <Home 
              dish={this.state.dishes.filter((dish) => dish.featured)[0]}
              promotion={this.state.promotions.filter((promo) => promo.featured)[0]}
              leader={this.state.leaders.filter((leader) => leader.featured)[0]}
          />
            )
        }

        const DishWithId = ({match}) => {
            return(
                <DishDetailComponent dish={this.state.dishes.filter((dish) => dish.id === parseInt(match.params.dishId,10))[0]} 
                  comments={this.state.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId,10))}
                   />
            );
          };

          const AboutUsPage=()=>{
              return(
              <About leaders={this.state.leaders}/>
              );
            }
        return(
            <div>
            <Header/>
            <Switch>
                <Route path="/home" component={HomePage}/>
                <Route exact path="/menu" component={()=><Menu dishes={this.state.dishes}/>} />
                <Route path='/menu/:dishId' component={DishWithId}/>
                <Route exact path="/aboutus" component={AboutUsPage}/>
                <Route exact path="/contactus" component={Contact}/>
                <Redirect to="home" />
            </Switch>
            <Footer/>
            </div>

        )
    }
}
//export default (connect(mapStateToProps)(Main));
export default Main;