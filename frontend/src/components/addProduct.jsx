import { useState } from "react";
import { motion } from "framer-motion";
import { toast, Toaster } from "react-hot-toast";
import axios from "axios";

const AddProduct = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    stock: "",
  });
  const [image, setImage] = useState(null);
  const [errors, setErrors] = useState({});
  const [imagePreview, setImagePreview] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5000000) {
        setErrors({ ...errors, image: "L'image ne doit pas dépasser 5 Mo." });
        return;
      }
      if (!file.type.startsWith("image/")) {
        setErrors({ ...errors, image: "Le fichier doit être une image." });
        return;
      }
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
      setErrors({ ...errors, image: "" });
    }
  };

  const validateForm = () => {
    let newErrors = {};
    if (!formData.title.trim()) newErrors.title = "Le titre est requis.";
    if (!formData.description.trim()) newErrors.description = "La description est requise.";
    if (!formData.price || isNaN(formData.price) || formData.price <= 0) newErrors.price = "Le prix doit être un nombre positif.";
    if (!formData.stock || isNaN(formData.stock) || formData.stock < 0) newErrors.stock = "Le stock ne peut pas être négatif.";
    if (!image) newErrors.image = "L'image est requise.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      toast.error("Veuillez corriger les erreurs du formulaire.");
      return;
    }

    const data = new FormData();
    data.append("title", formData.title);
    data.append("description", formData.description);
    data.append("price", formData.price);
    data.append("stock", formData.stock);
    data.append("image", image);

    try {
      const response = await axios.post("http://localhost:8000/stock", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.status === 201) {
        toast.success("Produit ajouté avec succès!");
        setFormData({ title: "", description: "", price: "", stock: "" });
        setImage(null);
        setImagePreview(null);
        document.getElementById("imageInput").value = "";
        setErrors({});
      }
    } catch (error) {
      console.error("Erreur lors de l'ajout du produit:", error);
      toast.error("Erreur lors de l'ajout du produit");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-800 via-gray-600 to-gray-800 p-6">
      <Toaster position="top-center" />

      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-gray-800 p-8 rounded-2xl shadow-xl w-full max-w-3xl text-white"
      >
        <h2 className="text-3xl font-bold mb-6 text-center text-blue-400">Ajouter un Produit</h2>
        <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-2xl mx-auto">
          <input
            type="text"
            name="title"
            placeholder="Titre"
            value={formData.title}
            onChange={handleChange}
            className="w-full p-2 text-base rounded bg-gray-700 text-white focus:ring-blue-500"
          />
          {errors.title && <p className="text-red-500 text-sm">{errors.title}</p>}

          <textarea
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            className="w-full p-2 text-base rounded bg-gray-700 text-white focus:ring-blue-500 h-24"
          />
          {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}

          <input
            type="number"
            name="price"
            placeholder="Prix"
            value={formData.price}
            onChange={handleChange}
            className="w-full p-2 text-base rounded bg-gray-700 text-white focus:ring-blue-500"
          />
          {errors.price && <p className="text-red-500 text-sm">{errors.price}</p>}

          <input
            type="number"
            name="stock"
            placeholder="Stock"
            value={formData.stock}
            onChange={handleChange}
            className="w-full p-2 text-base rounded bg-gray-700 text-white focus:ring-blue-500"
          />
          {errors.stock && <p className="text-red-500 text-sm">{errors.stock}</p>}

          <input
            type="file"
            id="imageInput"
            name="image"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full p-2 text-base rounded bg-gray-700 text-white focus:ring-blue-500"
          />
          {errors.image && <p className="text-red-500 text-sm">{errors.image}</p>}

          {imagePreview && <img src={imagePreview} alt="Aperçu" className="mt-2 w-24 h-24 object-cover rounded-lg" />}

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 transition p-3 text-lg rounded font-semibold shadow-md"
          >
            Ajouter
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default AddProduct;