import { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "react-hot-toast";

const AddProduct = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    stock: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const validateForm = () => {
    let newErrors = {};
    if (!formData.title.trim()) newErrors.title = "Le titre est requis.";
    if (!formData.description.trim()) newErrors.description = "La description est requise.";
    if (!formData.price || isNaN(formData.price) || formData.price <= 0) newErrors.price = "Le prix doit être un nombre positif.";
    if (!formData.stock || isNaN(formData.stock) || formData.stock < 0) newErrors.stock = "Le stock ne peut pas être négatif.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    toast.success("Produit ajouté avec succès!");
    console.log("Produit ajouté:", formData);
    setFormData({ title: "", description: "", price: "", stock: "" });
    setErrors({});
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 p-6">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-gray-800 p-16 rounded-3xl shadow-2xl w-full max-w-4xl text-white"
      >
        <h2 className="text-4xl font-bold mb-10 text-center text-blue-400">Ajouter un Produit</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <input type="text" name="title" placeholder="Titre" value={formData.title} onChange={handleChange} className="w-full p-5 text-xl rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-4 focus:ring-blue-500" />
            {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
          </div>
          <div>
            <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} className="w-full p-5 text-xl rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-4 focus:ring-blue-500 h-40" />
            {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
          </div>
          <div>
            <input type="number" name="price" placeholder="Prix" value={formData.price} onChange={handleChange} className="w-full p-5 text-xl rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-4 focus:ring-blue-500" />
            {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price}</p>}
          </div>
          <div>
            <input type="number" name="stock" placeholder="Stock" value={formData.stock} onChange={handleChange} className="w-full p-5 text-xl rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-4 focus:ring-blue-500" />
            {errors.stock && <p className="text-red-500 text-sm mt-1">{errors.stock}</p>}
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 transition duration-300 p-5 text-xl rounded-lg font-semibold shadow-lg"
          >
            Ajouter
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default AddProduct;
