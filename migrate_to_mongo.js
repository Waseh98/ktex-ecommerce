const fs = require('fs');
const path = require('path');
const { MongoClient } = require('mongodb');

// Use the same URI we added to Vercel
const MONGODB_URI = "mongodb+srv://ktex-admin:ktex-secure-pass-2026@cluster0.fcnsgop.mongodb.net/?appName=Cluster0";
const DB_NAME = "ktex_ecommerce";

async function migrateData() {
  const client = new MongoClient(MONGODB_URI);

  try {
    await client.connect();
    console.log("Connected to MongoDB Atlas");
    const db = client.db(DB_NAME);

    // 1. Migrate Products
    const productsPath = path.join(__dirname, 'scratch', 'products.json');
    if (fs.existsSync(productsPath)) {
      const products = JSON.parse(fs.readFileSync(productsPath, 'utf8'));
      if (products.length > 0) {
        // Clean IDs if they are strings but we want them unique
        const cleanedProducts = products.map(p => {
          const { _id, ...rest } = p;
          return rest;
        });
        await db.collection('products').deleteMany({}); // Clear old data
        await db.collection('products').insertMany(cleanedProducts);
        console.log(`Migrated ${products.length} products`);
      }
    }

    // 2. Migrate Orders
    const ordersPath = path.join(__dirname, 'scratch', 'orders.json');
    if (fs.existsSync(ordersPath)) {
      const orders = JSON.parse(fs.readFileSync(ordersPath, 'utf8'));
      if (orders.length > 0) {
        await db.collection('orders').deleteMany({});
        await db.collection('orders').insertMany(orders);
        console.log(`Migrated ${orders.length} orders`);
      }
    }

    console.log("Migration successful!");
  } catch (err) {
    console.error("Migration failed:", err);
  } finally {
    await client.close();
  }
}

migrateData();
