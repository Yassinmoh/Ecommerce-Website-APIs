const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({

    name: { type: String, required: true, trim: true },

    slug: { type: String, required: true, unique: true },

    price: { type: Number, required: true },

    quantity: { type: Number, required: true },

    description: { type: String, required: true, trim: true },

    offer: { type: String },

    productPictures: [
        { img: { type: 'string' } }
    ],

    reviews: [
        {
            userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
            reviews: String
        }
    ],
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    updatedAt: Date,
}, { timestamps: true })

module.exports = mongoose.model('Products', productSchema)