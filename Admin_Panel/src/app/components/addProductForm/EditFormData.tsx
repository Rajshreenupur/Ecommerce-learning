import React from 'react';

interface EditFormDataProps {
  editFormData: {
    name: string;
    price: string;
    description: string;
    category: string;
    image: File | null; // File object or null
  };
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  handlePhoto: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setModalOpen: (open: boolean) => void;
  updateProduct: () => void;
  setEditMode: (editMode: boolean) => void;
}

const EditFormData: React.FC<EditFormDataProps> = ({
  editFormData,
  handleChange,
  handlePhoto,
  setModalOpen,
  updateProduct,
  setEditMode
}) => {
  return (
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
          className="bg-blue-500 text-white m-3 px-4 py-2 rounded hover:bg-blue-600"
          type="button"
          onClick={() => setModalOpen(true)}
        >
          Update Quantities
        </button>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          type="button"
          onClick={updateProduct}
        >
          Update Product
        </button>
        <button
          className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 ml-2"
          type="button"
          onClick={() => setEditMode(false)}
        >
          Cancel
        </button>
      </form>
    </div>
  );
};

export default EditFormData;
