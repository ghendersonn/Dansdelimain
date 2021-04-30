import { Component } from 'react';
import AppNavbar from './AppNavbar';
import {Card, CardText, CardBody, CardTitle, CardSubtitle, Button, Container} from 'reactstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getItems } from '../actions/itemActions';
import { addToCart } from '../actions/cartActions';



class Products extends Component {

    componentDidMount(){
        this.props.getItems();
        
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
        
        
    
    

    static propTypes = {
        getItems: PropTypes.func.isRequired,
        item: PropTypes.object.isRequired,
        isAuthenticated: PropTypes.bool,
        addToCart: PropTypes.func.isRequired,
        user: PropTypes.object.isRequired
    }

    onAddToCart = async (id, productId) => {
        await this.props.addToCart(id, productId, 1);
        alert ('Item added to Cart');
    }

    

    render(){
        const { items } = this.props.item;
        const user = this.props.user;
        let steaks = []
        items.forEach(element => {
            if ( element.category === "Steaks") {
            steaks.push( element )
            console.log( steaks )  
            }
        })

        let hoagies = []
        items.forEach(element => {
            if ( element.category === "Hoagies") {
            hoagies.push( element )
            console.log( hoagies )  
            }
        })



        return (
            <div>

            <Container>
            <h2>Steaks</h2>
                <div className="row">
                {steaks.map((item )=>(
                    
                    <div className="col-md-4">
                    <Card className="mb-4">
                        <CardBody>
                            
                            <CardTitle tag="h5">{item.name}</CardTitle>
                            <CardSubtitle tag="h6">Rs. {item.price}</CardSubtitle>
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

            <Container>
            <h2>Hoagies</h2>
                <div className="row">
                
                {hoagies.map((item )=>(
                    
                    <div className="col-md-4">
                        
                    <Card className="mb-4">
                        <CardBody>
                            
                            <CardTitle tag="h5">{item.name}</CardTitle>
                            <CardSubtitle tag="h6">Rs. {item.price}</CardSubtitle>
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
        )
    }
}

const mapStateToProps = (state) => ({
    item: state.item,
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user
})

export default connect(mapStateToProps, {getItems, addToCart})(Products);