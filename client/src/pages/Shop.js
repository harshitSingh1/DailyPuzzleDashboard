// client\src\pages\Shop.js
import { useState, useEffect } from 'react';
import ShopForm from '../components/ShopForm';
import ShopList from '../components/ShopList';
import { getShopItems, createShopItem, deleteShopItem, updateShopItem } from '../api';

const Shop = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      setLoading(true);
      const { data } = await getShopItems();
      setItems(data);
      setError('');
    } catch (err) {
      setError('Failed to load shop items');
      console.error('Fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddItem = async (item) => {
    try {
      setError('');
      const { data } = await createShopItem(item);
      setItems([data, ...items]);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add item');
      console.error('Add error:', err);
    }
  };

  const handleDelete = async (id) => {
    try {
      setError('');
      await deleteShopItem(id);
      setItems(items.filter(item => item._id !== id));
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete item');
      console.error('Delete error:', err);
    }
  };

  const handleUpdate = async (id, updatedItem) => {
    try {
      setError('');
      const { data } = await updateShopItem(id, updatedItem);
      setItems(items.map(item => item._id === id ? data : item));
      return data;
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update item');
      console.error('Update error:', err);
      throw err; // Re-throw to allow ShopList to handle it
    }
  };

  if (loading) return <div className="loading">Loading shop items...</div>;

  return (
    <div className="page">
      <h1>Shop Management</h1>
      {error && <div className="error-message">{error}</div>}
      <ShopForm onSubmit={handleAddItem} />
      <ShopList 
        items={items} 
        onDelete={handleDelete}
        onUpdate={handleUpdate}
      />
    </div>
  );
};

export default Shop;

