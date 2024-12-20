const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    orderItems: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'OrderItem',
            required: true,
        },
    ],
    shippingAddress1: { type: String, required: false },
    shippingAddress2: { type: String },
    city: { type: String, required: false },
    zip: { type: String, required: false },
    country: { type: String, required: false },
    phone: { type: String, required: false },
    status: {
        type: String,
        required: false,
        default: 'Pending',
        enum: ['Pending', 'Shipped', 'Delivered', 'Cancelled'], // Example enum
    },
    totalPrice: { type: Number },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    dateOrdered: {
        type: Date,
        default: Date.now,
    },
});

orderSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

orderSchema.set('toJSON', {
    virtuals: true,
});

module.exports = mongoose.model('Order', orderSchema);
