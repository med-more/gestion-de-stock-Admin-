const express = require("express");
const Produit = require("./model"); 

const route = express.Router();

// Get all products
route.get("/", async (req, res) => {
  try {
    const products = await Produit.find();
    res.status(200).json(products);
  } catch (error) {
    console.error("Erreur lors de la récupération des produits:", error);
    res.status(500).json({ message: "Erreur serveur lors de la récupération des produits" });
  }
});

// Get product by ID
route.get("/:id", async (req, res) => {
  try {
    const product = await Produit.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Produit non trouvé" });
    }
    res.status(200).json(product);
  } catch (error) {
    console.error("Erreur lors de la récupération du produit:", error);
    res.status(500).json({ message: "Erreur serveur lors de la récupération du produit" });
  }
});

// Add new product
route.post("/", async (req, res) => {
  try {
    const newProduct = new Produit({
      title: req.body.title,
      description: req.body.description,
      price: req.body.price,
      stock: req.body.stock,
    });

    await newProduct.save();
    res.status(201).json({ message: "Produit ajouté avec succès", product: newProduct });
  } catch (error) {
    console.error("Erreur lors de l'ajout du produit:", error);
    res.status(500).json({ error: error.message });
  }
});

// Update product
route.put("/:id", async (req, res) => {
  try {
    const updatedProduct = await Produit.findByIdAndUpdate(
      req.params.id,
      {
        title: req.body.title,
        description: req.body.description,
        price: req.body.price,
        stock: req.body.stock,
      },
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: "Produit non trouvé" });
    }

    res.status(200).json({ message: "Produit mis à jour avec succès", product: updatedProduct });
  } catch (error) {
    console.error("Erreur lors de la mise à jour du produit:", error);
    res.status(500).json({ error: error.message });
  }
});

// Delete product
route.delete("/:id", async (req, res) => {
  try {
    const deletedProduct = await Produit.findByIdAndDelete(req.params.id);
    if (!deletedProduct) {
      return res.status(404).json({ message: "Produit non trouvé" });
    }
    res.status(200).json({ message: "Produit supprimé avec succès" });
  } catch (error) {
    console.error("Erreur lors de la suppression du produit:", error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = route;
