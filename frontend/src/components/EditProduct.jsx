import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";
import { motion } from "framer-motion";

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({
    title: "",
    description: "",
    price: 0,
    stock: 0,
    image: "",
  });

  const [imagePreview, setImagePreview] = useState(""); // Preview image

  useEffect(() => {
    axios
      .get(`http://localhost:8000/stock/${id}`)
      .then((response) => {
        setProduct(response.data);
        setImagePreview(`http://localhost:8000${response.data.image}`); // Load existing image
      })
      .catch((error) => {
        console.error("Erreur:", error);
        toast.error("Erreur lors du chargement du produit");
      });
  }, [id]);

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProduct({ ...product, image: file });
      setImagePreview(URL.createObjectURL(file)); // Show new image preview
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", product.title);
    formData.append("description", product.description);
    formData.append("price", product.price);
    formData.append("stock", product.stock);
    if (product.image) {
      formData.append("image", product.image);
    }

    try {
      await axios.put(`http://localhost:8000/stock/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success("Produit mis à jour !");
      setTimeout(() => navigate("/display"), 1000); 
    } catch (error) {
      toast.error("Erreur lors de la mise à jour");
    }
  };

  return (
    <motion.div
      className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <Toaster position="top-center" />
      <motion.div
        className="w-full max-w-lg bg-gray-800 p-6 rounded-lg shadow-lg"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <h2 className="text-2xl font-bold text-center text-blue-400 mb-6">Modifier le Produit {product.title}</h2>
        <form onSubmit={handleSubmit} className="space-y-4" encType="multipart/form-data">
          <div>
            <label className="text-gray-300">Titre</label>
            <input
              type="text"
              name="title"
              value={product.title}
              onChange={handleChange}
              className="w-full p-2 mt-1 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="text-gray-300">Description</label>
            <textarea
              name="description"
              value={product.description}
              onChange={handleChange}
              className="w-full p-2 mt-1 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="text-gray-300">Prix (Dh)</label>
            <input
              type="number"
              name="price"
              value={product.price}
              onChange={handleChange}
              className="w-full p-2 mt-1 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="text-gray-300">Stock</label>
            <input
              type="number"
              name="stock"
              value={product.stock}
              onChange={handleChange}
              className="w-full p-2 mt-1 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Image Upload Section */}
          <div>
            <label className="text-gray-300">Image du Produit</label>
            {imagePreview && (
              <motion.img
                src={imagePreview}
                alt="Aperçu du produit"
                className="w-32 h-32 object-cover rounded-lg mt-2 border border-gray-600"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              />
            )}
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full p-2 mt-2 bg-gray-700 text-white border border-gray-600 rounded-lg cursor-pointer"
            />
          </div>

          <div className="flex justify-between mt-4">
            <motion.button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Enregistrer
            </motion.button>
            <motion.button
              type="button"
              onClick={() => navigate("/display")}
              className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-lg transition duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Annuler
            </motion.button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default EditProduct;
