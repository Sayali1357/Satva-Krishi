import { db } from "../firebase";
import { collection, addDoc, getDocs, getDoc, doc } from "firebase/firestore";

// Add Product
export const addProduct = async (productData) => {
  try {
    const docRef = await addDoc(collection(db, "products"), productData);
    console.log("Product added with ID:", docRef.id);
    return docRef.id;
  } catch (error) {
    console.error("Error adding product:", error);
  }
};

// Get All Products
export const getProducts = async () => {
  const querySnapshot = await getDocs(collection(db, "products"));
  return querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};

// ✅ Get Product By ID
export const getProductById = async (id) => {
  try {
    const productDoc = await getDoc(doc(db, "products", id));
    if (productDoc.exists()) {
      return { id: productDoc.id, ...productDoc.data() };
    } else {
      throw new Error("Product not found");
    }
  } catch (error) {
    console.error("Error fetching product:", error);
    return null;
  }
};
