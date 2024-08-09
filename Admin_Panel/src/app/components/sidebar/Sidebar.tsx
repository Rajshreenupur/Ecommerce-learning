import { FC } from "react";

const Sidebar: FC = () => {
  return (
    <div className="w-64 bg-gray-800 text-white">
      <div className="p-4 text-lg font-bold">Dashboard</div>
      <ul className="mt-4">
        <li className="p-4 cursor-pointer bg-gray-700">Add New Product</li>
      </ul>
    </div>
  );
};

export default Sidebar;
