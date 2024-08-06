import React from 'react';

// Define the type for the formData
interface FormData {
  name: string;
  price: string;
  description: string;
  category: string;
  image: File | null; 
}

// Define the type for the props
interface CreateProductFormProps {
  formData: FormData;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  handlePhoto: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: () => void;
  setModalOpen: (open: boolean) => void;
}

const CreateProductForm: React.FC<CreateProductFormProps> = ({
  formData,
  handleChange,
  handlePhoto,
  handleSubmit,
  setModalOpen
}) => {
  return (
    <div className="mb-6">
      <h2 className="text-xl font-bold mb-4">Add Product</h2>

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
        className="bg-blue-500 text-white m-3 px-4 py-2 rounded hover:bg-blue-600"
        type="button"
        onClick={() => setModalOpen(true)}
      >
        Add Quantities +
      </button>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        type="button"
        onClick={handleSubmit}
      >
        Add Product
      </button>
    </div>
  );
};

export default CreateProductForm;
