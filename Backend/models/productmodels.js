import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: [true, "Name is required"] },
    description: { type: String, required: [true, "Description is required"] },
    price: { type: Number, required: [true, "Price is required"] },
    category: { type: String, required: [true, "Category is required"] },
    rating: { type: Number, default: 0 },
    images: [
        { 
        public_id: {type: String, required:[true]},
        url: {type: String, required:[true]}
    }
],
    stock: { type: Number, required: [true, "Stock is required"], default: 1  },
    numberOfReviews: { type: Number, default: 0 },
    reviews: [
        {   
            name: { type: String, required: true },
            rating: { type: Number, required: true },
            comment: { type: String, required: true }  
        },
    ] ,
    createdAt: { type: Date, default: Date.now },


  
});

export default mongoose.model("Product", productSchema);