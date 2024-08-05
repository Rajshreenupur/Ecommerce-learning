"use client";
import Loader from "@/app/components/loader";
import Navbar from "@/app/components/navbar";
import {
  DeleteProduct,
  EditProductDetails,
  GetAllProduct,
  PostProduct,
} from "@/app/services/productApi";
import { FC, useEffect, useState } from "react";

const Dashboard: FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    image: "",
    description:"",
    category: "Mens",
  });
  const [products, setProducts] = useState<any>([]);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState<boolean>(false);
  const [editFormData, setEditFormData] = useState({
    name: "",
    price: "",
    image: "",
    description:"",
    category: "Mens",
    id: "",
  });

  const handleChange = (e: any) => {
    if (editMode) {
      setEditFormData({ ...editFormData, [e.target.name]: e.target.value });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };
  const handlePhoto = (e: any) => {
    const file = e.target.files?.[0] || null;
    // if (editMode) {
    //   setEditFormData((prevState) => ({ ...prevState, image: file }));
    // } else {
    setFormData((prevState) => ({ ...prevState, image: file }));
    // }
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();

    setProducts([...products, formData]);

    PostProduct(formData);
    setFormData({
      name: "",
      price: "",
      image: "",
      description:"",
      category: "Mens",
    });
  };

  useEffect(() => {
    setLoading(true);
    // console.log(products);
    GetAllProduct().then((responseJson) => {
      setProducts(responseJson);
    });
    setLoading(false);
  }, []);

  const handleEdit = (productID: any) => {
    // setFormData({ ...formData, [e.target.name]: e.target.value });
    setEditMode(true);
    const editForm = products.find((product: any) => product._id === productID);
    console.log(editForm);
    setEditFormData({
      name: editForm?.productName,
      price: editForm?.productPrice,
      image: editForm?.productUrl,
      category: editForm.category,
      description:editForm.description,
      id: editForm?._id,
    });
  };

  const updateProduct = (e: any) => {
    e.preventDefault();
    EditProductDetails(editFormData);
    setEditMode(false);
  };

  const handleDelete = (productID: any) => {
    DeleteProduct(productID);
  };

  return (
    <>
      <Navbar />
      <div className="flex h-screen bg-gray-100">
        {/* {JSON.stringify(formData)} */}
        <div className="w-64 bg-gray-800 text-white">
          <div className="p-4 text-lg font-bold">Dashboard</div>
          <ul className="mt-4">
            <li className={"p-4 cursor-pointer bg-gray-700"}>
              Add New Product
            </li>
          </ul>
        </div>
        {loading ? (
          <Loader />
        ) : (
          <div className="flex-1 p-8">
            <h1 className="text-2xl font-bold mb-6">Product Dashboard</h1>
            <div className="mb-6">
              <input
                type="text"
                name="name"
                placeholder="Product name"
                value={formData.name}
                className="p-2 border border-gray-300 rounded mr-2"
                onChange={handleChange}
              />
              <input
                type="text"
                name="price"
                placeholder="Product price"
                value={formData.price}
                className="p-2 border border-gray-300 rounded mr-2"
                onChange={handleChange}
              />
               <input
                type="text"
                name="description"
                placeholder="Product description"
                value={formData.description}
                className="p-2 border border-gray-300 rounded mr-2"
                onChange={handleChange}
              />
              <input
                type="file"
                name="image"
                placeholder="Product image URL"
                className="p-2 border border-gray-300 rounded mr-2"
                onChange={handlePhoto}
              />
              <select
                className="p-2 border border-gray-300 rounded mr-2"
                name="category"
                value={formData.category}
                onChange={handleChange}
              >
                <option value="Mens">Mens</option>
                <option value="Womens">Womens</option>
                <option value="Kids">Kids</option>
              </select>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                onClick={handleSubmit}
              >
                Add Product
              </button>
            </div>
            {/* {JSON.stringify(products)} */}
            {editMode ? (
              // Edit Form
              <div className="mb-6">
                <h2 className="text-xl font-bold mb-4">Edit Product</h2>
                <form>
                  <input
                    type="text"
                    name="name"
                    placeholder="Product name"
                    value={editFormData.name}
                    className="p-2 border border-gray-300 rounded mr-2"
                    onChange={handleChange}
                  />
                  <input
                    type="text"
                    name="price"
                    placeholder="Product price"
                    value={editFormData.price}
                    className="p-2 border border-gray-300 rounded mr-2"
                    onChange={handleChange}
                  />
                  <input
                    type="text"
                    name="description"
                    placeholder="Product description"
                    value={editFormData.description}
                    className="p-2 border border-gray-300 rounded mr-2"
                    onChange={handleChange}
                  />
                  <input
                    type="file"
                    name="image"
                    placeholder="Product image URL"
                    className="p-2 border border-gray-300 rounded mr-2"
                    onChange={handlePhoto}
                  />
                  <select
                    className="p-2 border border-gray-300 rounded mr-2"
                    name="category"
                    value={editFormData.category}
                    onChange={handleChange}
                  >
                    <option value="Mens">Mens</option>
                    <option value="Womens">Womens</option>
                    <option value="Kids">Kids</option>
                  </select>
                  <button
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    type="submit"
                    onClick={updateProduct}
                  >
                    Update Product
                  </button>
                  <button
                    className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 ml-2"
                    onClick={() => setEditMode(false)}
                  >
                    Cancel
                  </button>
                </form>
              </div>
            ) : (
              // Product List
              <ul className="space-y-4">
                {products.map((product: any) => (
                  <li
                    key={product?._id}
                    className="flex items-center space-x-4 p-4 bg-white rounded shadow-md"
                  >
                    <img
                      src={`http://localhost:5000${product?.productUrl}`}
                      alt="Sample Product"
                      className="w-32 h-24 object-cover rounded mr-4"
                    />
                    <div className="flex-1">
                      <div className="font-semibold">
                        {product?.productName}
                      </div>
                      <div className="text-gray-600">
                        {product?.productPrice}
                      </div>
                      <div className="text-gray-600">{product?.category}</div>
                      <div className="text-gray-600">
                        {product?.description}
                      </div>
                    </div>
                    
                    <button
                      className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
                      onClick={() => handleEdit(product?._id)}
                    >
                      Edit
                    </button>
                    <button
                      className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                      onClick={() => handleDelete(product?._id)}
                    >
                      Delete
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default Dashboard;
