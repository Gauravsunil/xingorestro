import React from "react";
//import "./App.css";
import Menu from "./MenuComponent.js"
// import {DISHES} from "../shared/Dishes.js"
import DishDetailComponent from "./DishdetailComponent.js"
import Header from "./Header.js";
import Footer from "./Footer.js";
import Home from './HomeComponent.js'
import {Switch,Route,Redirect,withRouter} from "react-router-dom";
import Contact from "./ContactComponent.js"
// import {COMMENTS} from "../shared/Comments.js"
// import {PROMOTIONS} from "../shared/Promotions.js"
// import {LEADERS} from "../shared/Leaders.js"
import About from "./AboutUsComponent.js";
import {connect} from "react-redux";
import { postComment, fetchDishes, fetchComments, fetchPromos,fetchLeaders,postFeedback } from '../redux/ActionCreators';
import { actions } from 'react-redux-form';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

 const mapStateToProps=state=>{
 
    return {
        dishes:state.dishes,
        comments:state.comments,
        promotions:state.promotions,
        leaders:state.leaders
    }
}

const mapDispatchToProps = dispatch => ({
    //addComment: (dishId, rating, author, comment) => dispatch(addComment(dishId, rating, author, comment)),
    fetchDishes: () => { dispatch(fetchDishes())},
    resetFeedbackForm: () => { dispatch(actions.reset('feedback'))},
    fetchComments: () => dispatch(fetchComments()),
    fetchPromos: () => dispatch(fetchPromos()),
    postComment: (dishId, rating, author, comment) => dispatch(postComment(dishId, rating, author, comment)),
    fetchLeaders: () => dispatch(fetchLeaders()),
  postComment: (dishId, rating, author, comment) => dispatch(postComment(dishId, rating, author, comment)),
  postFeedback: (firstname,lastname,telnum,email,agree,contactType,message) =>dispatch(postFeedback(
        firstname,
        lastname,
        telnum,
        email,
        agree,
        contactType,
        message
      )
    )
  });
  

 class Main extends React.Component{
 
    constructor(){
        super();
        // this.state={
        //     dishes:DISHES,
        //     comments: COMMENTS,
        //     promotions: PROMOTIONS,
        //     leaders: LEADERS
        // }
    }

    componentDidMount() {
        this.props.fetchDishes();
    this.props.fetchComments();
    this.props.fetchPromos();
    this.props.fetchLeaders();
      }
      

    render(){
        const HomePage=()=>{
            return(
                <Home 
              dish={this.props.dishes.dishes.filter((dish) => dish.featured)[0]}
              dishesLoading={this.props.dishes.isLoading}
              dishErrMess={this.props.dishes.errMess}
              promotion={this.props.promotions.promotions.filter((promo) => promo.featured)[0]}
              promoLoading={this.props.promotions.isLoading}
              promoErrMess={this.props.promotions.errMess}
              leader={this.props.leaders.leaders.filter(leader => leader.featured)[0]}
              leaderLoading={this.props.leaders.isLoading}
              leaderErrMess={this.props.leaders.errMess}
          />
            )
        }

        const DishWithId = ({match}) => {
            return(
                
                <DishDetailComponent dish={this.props.dishes.dishes.filter((dish) => dish.id === parseInt(match.params.dishId,10))[0]}
            isLoading={this.props.dishes.isLoading}
            errMess={this.props.dishes.errMess}
            comments={this.props.comments.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId,10))}
            commentsErrMess={this.props.comments.errMess}
            //addComment={this.props.addComment}
            postComment={this.props.postComment}

          />
            );
          };

          const AboutUsPage=()=>{
              return(
              <About leaders={this.props.leaders}/>
              );
            }
        return(
            <div>
            <Header/>
            <TransitionGroup>
            <CSSTransition key={this.props.location.key} classNames="page" timeout={300}>
              <Switch location={this.props.location}>
                <Route path="/home" component={HomePage}/>
                <Route exact path="/menu" component={()=><Menu dishes={this.props.dishes}/>} />
                <Route path='/menu/:dishId' component={DishWithId}/>
                <Route exact path="/aboutus" component={AboutUsPage}/>
                <Route exact path='/contactus' component={() => <Contact postFeedback={this.props.postFeedback} resetFeedbackForm={this.props.resetFeedbackForm} />} />
                <Redirect to="home" />
                </Switch>
            </CSSTransition>
          </TransitionGroup>
            <Footer/>
            </div>

        )
    }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));