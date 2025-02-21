import { useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import { Link } from "react-router-dom";

const DisplayProducts = () => {
  const [products, setProducts] = useState([
    {
      _id: "1",
      title: "Produit 1",
      description: "Description du produit 1",
      price: 19.99,
      stock: 10,
      image: "https://via.placeholder.com/150", 
    },
    {
      _id: "2",
      title: "Produit 2",
      description: "Description du produit 2",
      price: 29.99,
      stock: 5,
      image: "https://via.placeholder.com/150", 
    },
    {
      _id: "3",
      title: "Produit 3",
      description: "Description du produit 3",
      price: 39.99,
      stock: 20,
      image: "https://via.placeholder.com/150", 
    },
  ]);

  const handleDelete = (id) => {
    setProducts(products.filter((product) => product._id !== id));
    toast.success("Produit supprimé avec succès!");
  };

  return (
    <div className="flex-1 p-6">
      <Toaster position="top-center" />

      <h2 className="text-3xl font-bold mb-6 text-blue-400">Liste des Produits</h2>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-gray-800 text-white rounded-lg shadow-lg">
          <thead>
            <tr className="bg-gray-700">
              <th className="px-6 py-3 text-left text-sm font-semibold">Image</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">Titre</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">Description</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">Prix</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">Stock</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {products.map((product) => (
              <tr key={product._id} className="hover:bg-gray-750 transition duration-300">
                {/* Product Image */}
                <td className="px-6 py-4">
                  {product.image && (
                    <img
                      src={product.image}
                      alt={product.title}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                  )}
                </td>

                <td className="px-6 py-4 text-sm">{product.title}</td>

                <td className="px-6 py-4 text-sm">{product.description}</td>

                <td className="px-6 py-4 text-sm">{product.price} €</td>

                <td className="px-6 py-4 text-sm">{product.stock}</td>

                <td className="px-6 py-4">
                  <div className="flex space-x-4">
                    <Link
                      to={`/edit/${product._id}`} 
                      className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg transition duration-300"
                    >
                      Modifier
                    </Link>

                    <button
                      onClick={() => handleDelete(product._id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition duration-300"
                    >
                      Supprimer
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DisplayProducts;