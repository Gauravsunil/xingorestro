import React from 'react';
import { Card, CardImg, CardText, CardBody,CardTitle, Breadcrumb, BreadcrumbItem,Modal,ModalHeader, ModalBody,Button, Row, Col,Label } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, LocalForm, Errors } from "react-redux-form";
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';
import { FadeTransform, Fade, Stagger } from 'react-animation-components';

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);

class CommentForm extends React.Component{
    constructor(){
        super();
        this.state={
            isModalOpen:false
        }
        this.handleModal=this.handleModal.bind(this);
        this.handleSubmit=this.handleSubmit.bind(this);
    }

    handleModal(){
        this.setState({isModalOpen:!this.isModalOpen});
    }
    handleSubmit(values){
        this.handleModal();
        this.props.postComment(this.props.dishId, values.rating, values.author, values.comment);

    }

    render(){
        return(
            <div>
        <Button outline onClick={this.handleModal}>
          <span className="fa fa-pencil" /> Submit Comment
        </Button>
        <Modal isOpen={this.state.isModalOpen} toggle={this.handleModal}>
            <ModalHeader toggle={this.handleModal}>Submit Comment</ModalHeader>
            <ModalBody>
                <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                    <Row className="form-group">
                        <Label htmlFor="rating" md={12}>
                            Rating</Label>
                            <Col md={{size:12}}>
                                <Control.select
                                model=".rating"
                                name="rating"
                                className="form-control"
                                >
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                </Control.select>
                                </Col> 
                    </Row>
                    <Row className="form-group">
                        <Label htmlFor="author" md={12}>
                            Your Name
                        </Label>
                        <Col md={12}>
                            <Control.text
                            model=".author"
                            name="author"
                            className="form-control"
                            placeholder="Your Name"
                            validators={{

                                required,
                                minLength:minLength(3),
                                maxLength:maxLength(15)
                            }}
                            />
                            <Errors
                            className="text-danger"
                            model=".author"
                            name="author"
                            show="touched"
                            messages={{
                                required:"REQUIRED",
                                minLength:"Must be greater than 2 characters",
                                maxLength:"Must be 15 characters or less"
                            }}
                            />
                        </Col>
                    </Row>
                    <Row className="form-group">
                        <Label htmlFor="comment" md={12}>
                            Comments
                        </Label>
                        <Col md={12}>
                            <Control.textarea
                            model=".comment"
                            name="comment"
                            rows={5}
                            className="form-control"
                            ></Control.textarea>
                        </Col>
                    </Row>
                    <Button type="submit" value="submit" color="primary">
                        Submit
                    </Button>
                </LocalForm>
            </ModalBody>
        </Modal>
            </div>
        )
    }
}

   function RenderDish({dish}) {
         return (<FadeTransform
            in
            transformProps={{
                exitTransform: 'scale(0.5) translateY(-50%)'
            }}>
        
                <Card>
                <CardImg top src={baseUrl + dish.image} alt={dish.name} />
                    <CardBody>
                        <CardTitle> {dish.name} </CardTitle>
                        <CardText>{dish.description}</CardText>
                    </CardBody>
                </Card >
                </FadeTransform>
            )
        
    }


    function RenderComments({dish, postComment, dishId}) {
        if (dish != null) {
            
                return(
                    <Stagger in>
                  <div>
                    <h4>Comments</h4>
                    {dish.map((comment) => {
                        return (
                            <Fade in>
                            <div key={comment.id} className="m-5">
                                <ul class='list-unstyled'>
                                    <li >{comment.comment}</li>
                                    <li>-- {comment.author}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit' }).format(new Date(Date.parse(comment.date)))}</li>
                                </ul>
                            </div>
                            </Fade>
                        );
                    })}
                    <CommentForm dishId={dishId} postComment={postComment} />
                </div>
                </Stagger>
                )
            
        } else {
            return (
                <div></div>
            );
        }
    }

    const DishDetailComponent=(props)=>{
        if (props.isLoading) {
            return(
                <div className="container">
                    <div className="row">            
                        <Loading />
                    </div>
                </div>
            );
        }
        else if (props.errMess) {
            return(
                <div className="container">
                    <div className="row">            
                        <h4>{props.errMess}</h4>
                    </div>
                </div>
            );
        }
        else if(props.dish!=null)
        return (
            <div className="container">
            <div className="row">
                <Breadcrumb>

                    <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                    <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                </Breadcrumb>
                <div className="col-12">
                     <h3>{props.dish.name}</h3> 
                    <hr />
                </div>                
            </div>
            <div className="row">
                <div className="col-12 col-md-5 m-1">
                    <RenderDish dish={props.dish} />
                </div>
                <div className="col-12 col-md-5 m-1">
                    <RenderComments dish={props.comments}  postComment={props.postComment} dishId={props.dish.id} />
                                    </div>
            </div>
            </div>
        );
        else
        return(
            <div></div>
        )
    }

export default DishDetailComponent;