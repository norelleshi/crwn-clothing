import React from 'react';
import { connect } from 'react-redux';

import { clearItemFromCart, addItem, removeItem } from '../../redux/cart/cart.actions';

import './checkout-item.styles.scss';

const CheckoutItem = ({ item, clearItem, addItem,removeItem }) => {
    const { imageUrl, price, name, quantity } = item;
    return (
        <div className='checkout-item'>
            <div className='image-container'>
                <img src={imageUrl} alt='item' />
            </div>
            <span className='name'>{name}</span>
            <span className='quantity'>
                <div className='decrease' onClick={() => removeItem(item)}>
                    <span role="img" aria-label="decrease">&#x2796;</span>
                </div>
                <span className='value'>{quantity}</span>
                <div className='increase' onClick={() => addItem(item)}>
                    <span role="img" aria-label="increase">&#10133;</span>
                </div>
            </span>
            <span className='price'>${price}</span>
            <div className='remove-button' onClick={() => clearItem(item)}>&#x2715;</div>
        </div>
    )
}

const mapDispatchToProps = dispatch => ({
    clearItem: item => dispatch(clearItemFromCart(item)),
    addItem: item => dispatch(addItem(item)),
    removeItem: item => dispatch(removeItem(item))
})

export default connect(null, mapDispatchToProps)(CheckoutItem);