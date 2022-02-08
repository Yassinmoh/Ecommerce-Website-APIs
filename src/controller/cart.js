const Cart = require('../models/cart')

exports.addItemToCart = (req, res) => {
    // res.status(200).json('Hello From Cart')


    Cart.findOne({ user: req.user._id })
        .exec((error, cart) => {
            if (error) {
                return res.status(400).json(error)
            }
            if (cart) {
                //if the cart is already exists update the Card by Quantity
                const product =req.body.cartItems.product
                const item = cart.cartItems.find(c => c.product == product)
                let condition,action
                if (item) {
                    condition={ "user": req.user._id , "cartItem.product":product}
                    update={
                        "$set": {
                            "cartItems":{
                                ...req.body.cartItems,
                                quantity:item.quantity+req.body.cartItems.quantity
                            } 
                        }
                    }
                    Cart.findOneAndUpdate(condition, update)
                        .exec((error, _cart) => {
                            if (error) return res.status(400).json(error)
                            if (_cart) return res.status(200).json(_cart)
                        })
                } else {
                    condition={ user: req.user._id }
                    action={
                        "$push": {
                            "cartItems": req.body.cartItems
                        }
                    }
                    Cart.findOneAndUpdate(condition,action)
                        .exec((error, _cart) => {
                            if (error) return res.status(400).json(error)
                            if (_cart) return res.status(200).json(_cart)
                        })
                }
            } else {
                //IF the cart NOT  EXIST Create NEW Card                
                const cart = new Cart({
                    user: req.user._id,
                    cartItems: [req.body.cartItems],
                })
                cart.save((error, cart) => {
                    if (error) {
                        return res.status(400).json(error)
                    }
                    if (cart) {
                        return res.status(200).json(cart)
                    }
                })
            }
        })


}