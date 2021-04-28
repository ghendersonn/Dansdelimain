import { combineReducers } from 'redux';
import item from './itemReducer';
import error from './errorReducer';
import auth from './authReducer';
import cart from './cartReducer';
import order from './orderReducer';

export default combineReducers({
    item: item,
    error: error,
    auth: auth,
    cart: cart,
    order: order
})