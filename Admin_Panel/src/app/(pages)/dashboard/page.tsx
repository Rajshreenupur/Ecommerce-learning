"use client";
import CreateProductForm from "@/app/components/addProductForm/CreateProductForm";
import EditFormData from "@/app/components/addProductForm/EditFormData";
import Loader from "@/app/components/loader";
import QuantityModal from "@/app/components/modelForm/QuantityModal";
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
    description: "",
    sizeQuatities:[],
    category: "Mens",
  });
  const [products, setProducts] = useState<any>([]);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState<boolean>(false);
  const [editFormData, setEditFormData] = useState({
    name: "",
    price: "",
    image: "",
    description: "",
    sizeQuatities:[],
    category: "Mens",
    id: "",
  });
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const handleChange = (e: any) => {
    if (editMode) {
      setEditFormData({ ...editFormData, [e.target.name]: e.target.value });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handlePhoto = (e: any) => {
    const file = e.target.files?.[0] || null;
    if (editMode) {
      setEditFormData((prevState) => ({ ...prevState, image: file }));
    } else {
      setFormData((prevState) => ({ ...prevState, image: file }));
    }
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    PostProduct(formData);
    console.log(formData,"<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<")
    setFormData({
      name: "",
      price: "",
      image: "",
      description: "",
      sizeQuatities:[],
      category: "Mens",
    });
  };

  useEffect(() => {
    setLoading(true);
    GetAllProduct().then((responseJson) => {
      setProducts(responseJson);
      setLoading(false);
    });
  }, []);

  const handleEdit = (productID: any) => {
    setEditMode(true);
    const editForm = products.find((product: any) => product._id === productID);
    setEditFormData({
      name: editForm?.productName,
      price: editForm?.productPrice,
      image: editForm?.productUrl,
      category: editForm.category,
      description: editForm.description,
      sizeQuatities:[],
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

  const handleModalSubmit = (data: { size: string; quantity: number }[]) => {
    setFormData((prevFormData:any) => ({
      ...prevFormData,
      sizeQuatities: data,
    }));
    // console.log(data)
  };
  

  return (
    <>
      <Navbar />
      <div className="flex h-screen bg-gray-100">
        <div className="w-64 bg-gray-800 text-white">
          <div className="p-4 text-lg font-bold">Dashboard</div>
          <ul className="mt-4">
            <li
              className={"p-4 cursor-pointer bg-gray-700"}
              onClick={() => {
                setEditMode(false);
                setFormData({
                  name: "",
                  price: "",
                  image: "",
                  description: "",
                  sizeQuatities:[],
                  category: "Mens",
                });
              }}
            >
              Add New Product
            </li>
          </ul>
        </div>
        {loading ? (
          <Loader />
        ) : (
          <div className="flex-1 p-8">
            {!editMode ? (
              <div>
                <CreateProductForm
                  formData={formData}
                  handleChange={handleChange}
                  handlePhoto={handlePhoto}
                  handleSubmit={handleSubmit}
                  setModalOpen={setModalOpen}
                />
              </div>
            ) : (
           <div>
            <EditFormData
            editFormData={editFormData}
            handleChange ={handleChange}
            handlePhoto={handlePhoto}
            setModalOpen ={setModalOpen}
            updateProduct={updateProduct}
            setEditMode={setEditMode}

            />
           </div>
            )}
            
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
                    <div className="font-semibold">{product?.productName}</div>
                    <div className="text-gray-600">{product?.productPrice}</div>
                    <div className="text-gray-600">{product?.category}</div>
                    <div className="text-gray-600">{product?.description}</div>
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
          </div>
        )}
      </div>
      <QuantityModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        handleModalSubmit={handleModalSubmit}
      />
    </>
  );
};

export default Dashboard;
