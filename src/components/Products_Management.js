import React, { useState } from 'react';
import './ProductsManagement.css'; // Import CSS file for ProductsManagement

const ProductsManagement = () => {
  // Mock product data
  const [products, setProducts] = useState([
    { id: 1, name: 'Product 1', category: 'Category A', price: 10.99, stockQuantity: 50 },
    { id: 2, name: 'Product 2', category: 'Category B', price: 20.49, stockQuantity: 30 },
    // More product data...
  ]);

  const [editingProduct, setEditingProduct] = useState(null);
  const [newProduct, setNewProduct] = useState({ id: null, name: '', category: '', price: 0, stockQuantity: 0 });

  const handleEditProduct = (productId) => {
    const productToEdit = products.find(product => product.id === productId);
    setEditingProduct(productToEdit);
  };

  const handleDeleteProduct = (productId) => {
    setProducts(prevProducts => prevProducts.filter(product => product.id !== productId));
  };

  const handleAddProduct = () => {
    if (!newProduct.name || !newProduct.category || !newProduct.price || !newProduct.stockQuantity) {
      alert("Please fill in all fields to add a product.");
      return;
    }

    // Find the maximum ID in the existing products
    const maxId = Math.max(...products.map(product => product.id), 0);
    // Increment the ID for the new product
    const newId = maxId + 1;
      // Create the new product with the incremented ID
    const updatedNewProduct = { ...newProduct, id: newId };
    // Update the products state
    setProducts(prevProducts => [...prevProducts, updatedNewProduct]);
    setNewProduct({ id: null, name: '', category: '', price: 0, stockQuantity: 0 });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
  };

  const handleSaveEdit = () => {
    setProducts(prevProducts => prevProducts.map(product =>
      product.id === editingProduct.id ? editingProduct : product
    ));
    setEditingProduct(null);
  };

  const handleCancelEdit = () => {
    setEditingProduct(null);
  };

  return (
    <div className="products-management-container">
      <h2>Products Management</h2>
      <div className="product-list">
        <h3>Products List</h3>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>Stock Quantity</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map(product => (
              <tr key={product.id}>
                <td>{product.id}</td>
                <td>{editingProduct && editingProduct.id === product.id ?
                  <input type="text" name="name" value={editingProduct.name} onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })} /> :
                  product.name}
                </td>
                <td>{editingProduct && editingProduct.id === product.id ?
                  <input type="text" name="category" value={editingProduct.category} onChange={(e) => setEditingProduct({ ...editingProduct, category: e.target.value })} /> :
                  product.category}
                </td>
                <td>{typeof product.price === 'number' ? `$${product.price.toFixed(2)}` : 'Invalid Price'}</td>
                <td>{editingProduct && editingProduct.id === product.id ?
                  <input type="number" name="stockQuantity" value={editingProduct.stockQuantity} onChange={(e) => setEditingProduct({ ...editingProduct, stockQuantity: parseInt(e.target.value) })} /> :
                  product.stockQuantity}
                </td>
                <td>
                  {editingProduct && editingProduct.id === product.id ?
                    <>
                      <button className="save-button" onClick={handleSaveEdit}>Save</button>
                      <button className="cancel-button" onClick={handleCancelEdit}>Cancel</button>
                    </> :
                    <>
                      <button className="edit-button" onClick={() => handleEditProduct(product.id)}>Edit</button>
                      <button className="delete-button" onClick={() => handleDeleteProduct(product.id)}>Delete</button>
                    </>
                  }
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="add-product">
        <h3>Add Product</h3>
        <input type="text" name="name" placeholder="Name" value={newProduct.name} onChange={handleInputChange} />
        &nbsp;
        <input type="text" name="category" placeholder="Category" value={newProduct.category} onChange={handleInputChange} />
        &nbsp;
        <input type="number" name="price" placeholder="Price" value={newProduct.price} onChange={handleInputChange} />
        &nbsp;
        <input type="number" name="stockQuantity" placeholder="Stock Quantity" value={newProduct.stockQuantity} onChange={handleInputChange} />
        &nbsp;
        <button className="add-product-button" onClick={handleAddProduct}>Add Product</button>
      </div>
    </div>
  );
}

export default ProductsManagement;
