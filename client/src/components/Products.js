import { Component, useState } from 'react';
import AppNavbar from './AppNavbar';
import { CardText, CardBody, CardTitle, CardSubtitle,  Container} from 'reactstrap';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getItems } from '../actions/itemActions';
import { addToCart } from '../actions/cartActions';
import 'react-dropdown-now/style.css';
import { motion } from "framer-motion"
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Alert from '@material-ui/lab/Alert';
import  Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent'
class Products extends Component {


    constructor(props) {
        super(props);
        this.state = {anchorEl: null};
      }


    componentDidMount(){
        this.props.getItems();
        this.setState({
            active: false,
            anchorEl: null
        })
    }


     

    getCategory = async () => {
        const { items }  = this.props.item;
        console.log( items )
        let steaks = []
        let hoagies = []
        items.forEach(element => {
            if ( element.category === "Steaks") {
            steaks.push( element )
            console.log( steaks )  
            }
            if ( element.category === "Hoagies") {
                hoagies.push( element )
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
        <Alert severity="success">Added to Cart</Alert>
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

        let handleClose = () => {
            this.setState({ anchorEl: null })
          };
        let handleClick = (event) => {
            this.setState({ anchorEl: event.currentTarget })
          };


        return (
            <motion.div exit={{ opacity: 0 }}>
            <div>
            
            <Container>
            <h2>Steaks</h2>
                <div className="row">
                {steaks.map((item, i)=>(
                    
                    <div className="col-md-4">
                    <Card className="mb-4">
                        <CardContent>
                            
                            <CardTitle tag="h5">{item.name}</CardTitle>
                            <Button id="price"aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                            Prices
                            </Button>
                            <form onSubmit={this.handleFormSubmit}>
                            <Menu
                                id="simple-menu"
                                anchorEl={this.state.anchorEl}
                                keepMounted
                                elevation={0}
                                open={Boolean(this.state.anchorEl)}
                                onClose={handleClose}
                                anchorOrigin={{
                                    horizontal: 'center',
                                  }}
                                  transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'center',
                                  }}
                            >
                                <MenuItem ><div className="form-check">
                                    <label>
                                    <input
                                        type="radio"
                                        name="react-tips"
                                        
                                        value={item.price}
                                        onChange={this.handleOptionChange}
                                        className="form-check-input"
                                    />
                                   Reg: $ {item.price.toFixed(2)}
                                    </label>
                                </div></MenuItem>
                                <MenuItem ><div className="form-check">
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
                                </div></MenuItem>
                                <MenuItem ><div className="form-check">
                                    <label>
                                    <input
                                        type="radio"
                                        name="react-tips"
                                        
                                        value={item.priceL}
                                        onChange={this.handleOptionChange}
                                        className="form-check-input"
                                    />
                                    <CardSubtitle >L: $ {item.priceL.toFixed(2)}</CardSubtitle>
                                    </label>
                                </div></MenuItem>
                            </Menu>
                            </form>
                                
                                
                                
                                
                            
                            
                            
                            {this.props.isAuthenticated ? 
                                <Button
                                    color="success"
                                    size="sm"
                                    onClick={this.onAddToCart.bind(this, user._id, item._id)}
                                    >Add To Cart</Button> :
                                    null}
                        </CardContent>
                    </Card>
                    </div>
                ))}
                 </div>
            </Container>

            <Container>
            <h2>Hoagies</h2>
                <div className="row">
                
                {hoagies.map((item, i)=>(
                    
                    <div className="col-md-4">
                        
                    <Card className="mb-4">
                        <CardContent>
                            







                            
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
                        </CardContent>
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