// QuantityModal.tsx

import React, { FC, useState } from "react";

interface QuantityModalProps {
  isOpen: boolean;
  onClose: () => void;
  handleModalSubmit: (formValues: { size: string; quantity: string }[]) => void; 
}

const QuantityModal: FC<QuantityModalProps> = ({
  isOpen,
  onClose,
  handleModalSubmit,
}) => {
  const [formValues, setFormValues] = useState([{ size: "", quantity: "" }]);

  if (!isOpen) return null;

  const addFormFields = () => {
    setFormValues([...formValues, { size: "", quantity: "" }]);
  };
  const handleChange = (index: number, e: any) => {
    const { name, value } = e.target;
    const newFormValues = [...formValues];
    newFormValues[index] = { ...newFormValues[index], [name]: value };
    setFormValues(newFormValues);
  };

  const removeFields =(index:number)=>{
    const newFormValues = [...formValues];
    newFormValues.splice(index, 1);
    setFormValues(newFormValues)

  }

  const handleSubmit = () => {
    handleModalSubmit(formValues);
    setFormValues([{ size: "", quantity: "" }]);

    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-lg">
        <h2 className="text-xl font-bold mb-4">Add Quantities</h2>
          <div className="space-y-4">
            {formValues.map((element, index) => (
              <div className="flex items-center space-x-4 mb-4" key={index}>
                <div className="flex-1">
                  <label className="block mb-1">Size</label>
                  <select
                    className="p-2 border border-gray-300 rounded w-full"
                    name="size"
                    value={element.size}
                    onChange={(e) => handleChange(index, e)}
                  >
                    <option value="">Select Size</option>
                    <option value="S">Small</option>
                    <option value="M">Medium</option>
                    <option value="L">Large</option>
                    <option value="XL">Extra Large</option>
                  </select>
                </div>
                <div className="flex-1">
                  <label className="block mb-1">Quantity</label>
                  <input
                    type="number"
                    name="quantity"
                    className="p-2 border border-gray-300 rounded w-full"
                    min="1"
                    value={element.quantity}
                    onChange={(e) => handleChange(index, e)}
                  />
                </div>
                <button
                  type="button"
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                  onClick={() => removeFields(index)}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          <button
            type="button"
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 mb-4"
            onClick={() => addFormFields()}
          >
            Add More
          </button>
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              onClick={handleSubmit}
            >
              Submit
            </button>
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 ml-2"
            >
              Cancel
            </button>
          </div>
      </div>
    </div>
  );
};

export default QuantityModal;
