// Sidebar.jsx
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="w-64 bg-gray-800 text-white h-screen p-4">
      <h2 className="text-2xl font-bold mb-6 text-blue-400">Gestion des Stock</h2>
      <ul className="space-y-4">
        <li>
          <Link
            to="/create"
            className="block p-2 hover:bg-gray-700 rounded transition duration-300"
          >
            Ajouter un Produit
          </Link>
        </li>
        <li>
          <Link
            to="/display"
            className="block p-2 hover:bg-gray-700 rounded transition duration-300"
          >
            Afficher les Produits
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;