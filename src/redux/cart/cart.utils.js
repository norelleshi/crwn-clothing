//Add a functionality to group items in cart reducer (add the quantity property to cartItem)
export const addItemToCart = (cartItems, cartItemToAdd) => {
    /** 
    Look inside of our existing cart items to see if that cart item already exists.
    Find the first cart item where the car item id matches the cart item we are trying to add id.
    **/
    const existingCartItem = cartItems.find(cartItem => cartItem.id === cartItemToAdd.id);

    //If the item already exists, then we increase the quantity
    if(existingCartItem) {
        return cartItems.map(cartItem => (
           cartItem.id === cartItemToAdd.id
           ? { ...cartItem, quantity: cartItem.quantity +1 }
           : cartItem 
        ))
    }
    //If the item doesn't exist, we add a new item and set the property quantity to 1
    return [...cartItems, { ...cartItemToAdd, quantity: 1 }]
}