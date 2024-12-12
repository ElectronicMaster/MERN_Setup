import {create} from "zustand"
import mongoose from "mongoose"

// we are creating it for global products (State management)

export const useProductStore = create((set) => ({
    product: [],
    setProduct: (products) => set({products}),
    createProduct: async(newProduct) => {
        if(!newProduct.name || !newProduct.image || !newProduct.price){
            return {success: false, message: "Please fill in all fields."}
        }
        const response = await fetch("http://localhost:5000/product", {
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:  JSON.stringify(newProduct)
        })
        const data = await response.json();
        set((state) => ({product:[...state.product,data.data]}))
        return {success: true, message: "Product Created Successfully"}
    },
    fetchProduct: async() => {
        const response = await fetch("http://localhost:5000/product")
        const data = await response.json()
        set({product: data})
    },
    deleteProduct: async (pid) => {
        console.log(pid);
        const link = `http://localhost:5000/product/${pid}`;
        const response = await fetch(link, {
          method: "DELETE",
        });
    
        const data = await response.json();
        if (!data.success) return { success: false, message: data.message };
    
        // Ensure proper mutation of the state.
        set((state) => {
          const updatedProducts = state.product.filter((product) => product._id !== pid);
          console.log("Updated Products:", updatedProducts);  // Log the updated products
          return { product: updatedProducts };  // Return updated state with filtered products
        });
    
        return { success: true, message: "Product Deleted Successfully" };
      },
    updateProduct: async (pid,updatedProduct) => {
        console.log(updatedProduct)
        const link = `http://localhost:5000/product/${pid}`;
        const response = await fetch(link, {
          method: "PUT",
          headers: {
            "Content-Type" : "application/json",
          },
          body: JSON.stringify(updatedProduct)
        });

        const data = await response.json();
        if (!data.success) return { success: false, message: data.message };
    }
}))