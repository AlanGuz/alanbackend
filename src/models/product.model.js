import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    title: String,
    description: String,
    price: Number,
    stock: Number,
    category: String,
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
});

export default mongoose.model("Products", productSchema);