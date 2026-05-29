import mongoose from 'mongoose';
import dotenv from 'dotenv';
import MenuItem from '../models/MenuItem';

dotenv.config({ path: '.env.local' });

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/manifik';

const menuItems = [
  {
    name: 'Tartare from Salmon',
    description: 'Fresh salmon with avocado, capers, and citrus dressing',
    price: 280,
    category: 'starters',
    ingredients: ['Salmon', 'Avocado', 'Capers', 'Citrus'],
  },
  {
    name: 'Burrata with Tomatoes',
    description: 'Creamy burrata with heirloom tomatoes and basil pesto',
    price: 240,
    category: 'starters',
    ingredients: ['Burrata', 'Tomatoes', 'Basil Pesto'],
  },
  {
    name: 'French Onion Soup',
    description: 'Classic soup with caramelized onions and gruyère cheese',
    price: 160,
    category: 'starters',
    ingredients: ['Onions', 'Gruyère', 'Beef Broth'],
  },
  // (add other items as needed)
];

async function run() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    await MenuItem.deleteMany({});
    const res = await MenuItem.insertMany(menuItems);
    console.log(`Inserted ${res.length} items`);
  } catch (err) {
    console.error(err);
  } finally {
    await mongoose.disconnect();
  }
}

run();
