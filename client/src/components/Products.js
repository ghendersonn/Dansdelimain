import { Component, useState } from 'react';
import AppNavbar from './AppNavbar';
import {Card, CardText, CardBody, CardTitle, CardSubtitle, Button, Container} from 'reactstrap';
import { Dropdown } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getItems } from '../actions/itemActions';
import { addToCart } from '../actions/cartActions';
import 'react-dropdown-now/style.css';
import { motion } from "framer-motion"



class Products extends Component {

    constructor(props) {
        super(props);
        this.state = {
          price: 0
          
        };
      }
      


    componentDidMount(){
        this.props.getItems();
        this.setState({
            active: false,
        })
    }

    getCategory = async () => {
        const { items }  = this.props.item;
        console.log( items )
        let steaks = []
        items.forEach(element => {
            if ( element.category === "Steaks") {
            steaks.push( element )
            console.log( steaks )  
            }
        })
        
        };
        
        handleOptionChange = changeEvent => {
            this.setState({
              priceActive: changeEvent.target.value
            });
          };
        
          handleFormSubmit = formSubmitEvent => {
            formSubmitEvent.preventDefault();
            let priceActive = this.state.priceActive
            console.log("You have submitted:", priceActive);
            return priceActive
          };
    
    

    static propTypes = {
        getItems: PropTypes.func.isRequired,
        item: PropTypes.object.isRequired,
        isAuthenticated: PropTypes.bool,
        addToCart: PropTypes.func.isRequired,
        user: PropTypes.object.isRequired
    }

    onAddToCart = async (id, productId) => {
        let priceActive = this.state.priceActive
        await this.props.addToCart(id, productId, 1, priceActive);
        alert ('Item added to Cart');
    }

    

    render(){
        const { items } = this.props.item;
        const user = this.props.user;
        let steaks = []
        items.forEach(element => {
            if ( element.category === "Steaks") {
            steaks.push( element )
 
            }
        })

        let hoagies = []
        items.forEach(element => {
            if ( element.category === "Hoagies") {
            hoagies.push( element )
            
            }
        })

        let sandwiches = []
        items.forEach(element => {
            if ( element.category === "Sandwiches") {
            sandwiches.push( element )
            }
        })




        return (
            <motion.div exit={{ opacity: 0 }}>
            <div>
            
            <Container>
            <h2>Steaks</h2>
                <div className="row">
                {steaks.map((item, i)=>(
                    
                    <div className="col-md-4">
                    <Card className="mb-4">
                        <CardBody>
                            
                            <CardTitle tag="h5">{item.name}</CardTitle>
                            
                            <form onSubmit={this.handleFormSubmit}>
                                <div className="form-check">
                                    <label>
                                    <input
                                        type="radio"
                                        name="react-tips"
                                        
                                        value={item.price}
                                        onChange={this.handleOptionChange}
                                        className="form-check-input"
                                    />
                                    <CardSubtitle tag="h6">Reg: $ {item.price.toFixed(2)}</CardSubtitle>
                                    </label>
                                </div>
                                <div className="form-check">
                                    <label>
                                    <input
                                        type="radio"
                                        name="react-tips"
                                        
                                        value={item.priceM}
                                        onChange={this.handleOptionChange}
                                        className="form-check-input"
                                    />
                                    <CardSubtitle tag="h6">M: $ {item.priceM.toFixed(2)}</CardSubtitle>
                                    </label>
                                </div>
                                <div className="form-check">
                                    <label>
                                    <input
                                        type="radio"
                                        name="react-tips"
                                        
                                        value={item.priceL}
                                        onChange={this.handleOptionChange}
                                        className="form-check-input"
                                    />
                                    <CardSubtitle tag="h6">L: $ {item.priceL.toFixed(2)}</CardSubtitle>
                                    </label>
                                </div>
                                <div className="form-group">
                                    <button className="btn btn-primary mt-2" type="submit">
                                    Save
                                    </button>
                                </div>
                            </form>
                            
                            
                            {this.props.isAuthenticated ? 
                                <Button
                                    color="success"
                                    size="sm"
                                    onClick={this.onAddToCart.bind(this, user._id, item._id, )}
                                    >Add To Cart</Button> :
                                    null}
                        </CardBody>
                    </Card>
                    </div>
                ))}
                 </div>
            </Container>

            <Container>
            <h2>Hoagies</h2>
                <div className="row">
                
                {hoagies.map((item, i )=>(
                    
                    <div className="col-md-4">
                        
                    <Card className="mb-4">
                        <CardBody>
                        <CardTitle tag="h5">{item.name}</CardTitle>
                        <form onSubmit={this.handleFormSubmit}>
                                <div className="form-check">
                                    <label>
                                    <input
                                        type="radio"
                                        name="react-tips"
                                        
                                        value={item.price}
                                        onChange={this.handleOptionChange}
                                        className="form-check-input"
                                    />
                                    <CardSubtitle tag="h6">Reg: $ {item.price.toFixed(2)}</CardSubtitle>
                                    </label>
                                </div>
                                <div className="form-check">
                                    <label>
                                    <input
                                        type="radio"
                                        name="react-tips"
                                        
                                        value={item.priceM}
                                        onChange={this.handleOptionChange}
                                        className="form-check-input"
                                    />
                                    <CardSubtitle tag="h6">M: $ {item.priceM.toFixed(2)}</CardSubtitle>
                                    </label>
                                </div>
                                <div className="form-check">
                                    <label>
                                    <input
                                        type="radio"
                                        name="react-tips"
                                        
                                        value={item.priceL}
                                        onChange={this.handleOptionChange}
                                        className="form-check-input"
                                    />
                                    <CardSubtitle tag="h6">L: $ {item.priceL.toFixed(2)}</CardSubtitle>
                                    </label>
                                </div>
                                <div className="form-group">
                                    <button className="btn btn-primary mt-2" type="submit">
                                    Save
                                    </button>
                                </div>
                            </form>
                            
                            {this.props.isAuthenticated ? 
                                <Button
                                    color="success"
                                    size="sm"
                                    onClick={this.onAddToCart.bind(this, user._id, item._id)}
                                    >Add To Cart</Button> :
                                    null}
                        </CardBody>
                    </Card>
                    </div>
                ))}
                 </div>
            </Container>



            <Container>
            <h2>Sandwiches</h2>
                <div className="row">
                
                {sandwiches.map((item, i)=>(
                    
                    <div className="col-md-4">
                        
                    <Card className="mb-4">
                        <CardBody>
                            
                            <CardTitle tag="h5">{item.name}</CardTitle>
                            <CardSubtitle tag="h6">$ {item.price}</CardSubtitle>
                            <CardText>{item.category}</CardText>
                            {this.props.isAuthenticated ? 
                                <Button
                                    color="success"
                                    size="sm"
                                    onClick={this.onAddToCart.bind(this, user._id, item._id)}
                                    >Add To Cart</Button> :
                                    null}
                        </CardBody>
                    </Card>
                    </div>
                ))}
                 </div>
            </Container>



            </div>
            </motion.div>
        )
    }
}

const mapStateToProps = (state) => ({
    item: state.item,
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user
})

export default connect(mapStateToProps, {getItems, addToCart})(Products);