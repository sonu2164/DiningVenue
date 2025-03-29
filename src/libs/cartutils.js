// utils/cartUtils.js
import Cart from '../models/cart';


export async function getCartItems(email) {
    try {
        const cart = await Cart.findOne({ email });

        if (!cart) {
            return { status: 404, data: [] };
        }

        return { status: 200, data: cart.cartItems };
    } catch (error) {
        console.error(error);
        return { status: 500, data: { message: 'Internal Server Error' } };
    }
}

export async function addToCart(email, cartItems) {
    try {
        // Find the existing cart
        const cart = await Cart.findOne({ email });

        if (!cart) {
            // If the cart doesn't exist, create a new one
            const newCart = new Cart({
                email,
                cartItems,
            });

            await newCart.save();
        } else {
            // If the cart exists, merge existing cartItems with new cartItems
            cart.cartItems = cartItems;

            await cart.save();
        }

        return { status: 200, data: { message: 'Item added to the cart successfully' } };
    } catch (error) {
        console.error(error);
        return { status: 500, data: { message: 'Internal Server Error' } };
    }
}


export async function clearCart(email) {
    try {
        const cart = await Cart.findOne({ email });

        if (cart) {
            Cart.cartItems = [];
            await Cart.save();
        }

        return { status: 200, data: { message: 'Cart cleared successfully' } };
    } catch (error) {
        console.error(error);
        return { status: 500, data: { message: 'Internal Server Error' } };
    }
}


