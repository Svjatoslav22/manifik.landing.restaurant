import Fastify from 'fastify';
import cors from '@fastify/cors';
import mongoose from 'mongoose';
import MenuItem from './models/MenuItem';
import Order from './models/Order';
import Reservation from './models/Reservation';
import Review from './models/Review';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const fastify = Fastify({ logger: true });

// Register CORS
fastify.register(cors, {
  origin: ['http://localhost:3000', 'http://localhost:3001'],
  credentials: true,
});

// MongoDB Connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/manifik';

mongoose
  .connect(MONGODB_URI)
  .then(() => fastify.log.info('Connected to MongoDB'))
  .catch((err) => fastify.log.error(`MongoDB connection error: ${err}`));

// Menu Routes
fastify.get('/api/menu', async (request, reply) => {
  try {
    const { category, page = '1', limit = '12' } = request.query as {
      category?: string;
      page?: string;
      limit?: string;
    };

    const query = category ? { category, isAvailable: true } : { isAvailable: true };
    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const skip = (pageNum - 1) * limitNum;

    const [items, total] = await Promise.all([
      MenuItem.find(query).sort({ category: 1, name: 1 }).skip(skip).limit(limitNum),
      MenuItem.countDocuments(query),
    ]);

    return {
      items,
      pagination: {
        currentPage: pageNum,
        totalPages: Math.ceil(total / limitNum),
        totalItems: total,
        itemsPerPage: limitNum,
      },
    };
  } catch (err) {
    fastify.log.error(err);
    reply.status(500).send({ error: 'Failed to fetch menu items' });
  }
});

fastify.get('/api/menu/categories', async (request, reply) => {
  try {
    const categories = await MenuItem.distinct('category', { isAvailable: true });
    return { categories };
  } catch (err) {
    fastify.log.error(err);
    reply.status(500).send({ error: 'Failed to fetch categories' });
  }
});

fastify.get('/api/menu/:id', async (request, reply) => {
  try {
    const { id } = request.params as { id: string };
    const item = await MenuItem.findById(id);
    if (!item) {
      reply.status(404).send({ error: 'Menu item not found' });
      return;
    }
    return item;
  } catch (err) {
    fastify.log.error(err);
    reply.status(500).send({ error: 'Failed to fetch menu item' });
  }
});

// Order Routes
fastify.post('/api/orders', async (request, reply) => {
  try {
    const orderData = request.body as {
      customerName: string;
      phone: string;
      address: string;
      items: Array<{ menuItemId: string; name: string; price: number; quantity: number }>;
      notes?: string;
    };

    const totalAmount = orderData.items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    const order = new Order({
      ...orderData,
      totalAmount,
      status: 'pending',
    });

    await order.save();
    reply.status(201).send(order);
  } catch (err) {
    fastify.log.error(err);
    reply.status(500).send({ error: 'Failed to create order' });
  }
});

fastify.get('/api/orders/:id', async (request, reply) => {
  try {
    const { id } = request.params as { id: string };
    const order = await Order.findById(id);
    if (!order) {
      reply.status(404).send({ error: 'Order not found' });
      return;
    }
    return order;
  } catch (err) {
    fastify.log.error(err);
    reply.status(500).send({ error: 'Failed to fetch order' });
  }
});

// Reservation Routes
fastify.post('/api/reservations', async (request, reply) => {
  try {
    const reservationData = request.body as {
      customerName: string;
      phone: string;
      email?: string;
      date: string;
      time: string;
      guests: number;
      notes?: string;
    };

    const reservation = new Reservation({
      ...reservationData,
      date: new Date(reservationData.date),
      status: 'pending',
    });

    await reservation.save();
    reply.status(201).send(reservation);
  } catch (err) {
    fastify.log.error(err);
    reply.status(500).send({ error: 'Failed to create reservation' });
  }
});

// Review Routes
fastify.get('/api/reviews', async (request, reply) => {
  try {
    const reviews = await Review.find({ isApproved: true })
      .sort({ createdAt: -1 })
      .limit(10);
    return { reviews };
  } catch (err) {
    fastify.log.error(err);
    reply.status(500).send({ error: 'Failed to fetch reviews' });
  }
});

fastify.post('/api/reviews', async (request, reply) => {
  try {
    const reviewData = request.body as {
      customerName: string;
      rating: number;
      comment: string;
    };

    const review = new Review({
      ...reviewData,
      isApproved: false,
    });

    await review.save();
    reply.status(201).send({ message: 'Review submitted for approval' });
  } catch (err) {
    fastify.log.error(err);
    reply.status(500).send({ error: 'Failed to submit review' });
  }
});

// Seed data endpoint (for development)
fastify.post('/api/seed', async (request, reply) => {
  try {
    await MenuItem.deleteMany({});

    const menuItems = [
      // Starters
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
      // Salads
      {
        name: 'Caesar with Chicken',
        description: 'Romaine lettuce, grilled chicken, parmesan, croutons, caesar dressing',
        price: 220,
        category: 'salads',
        ingredients: ['Romaine', 'Chicken', 'Parmesan', 'Croutons'],
      },
      {
        name: 'Greek Salad',
        description: 'Fresh vegetables with feta cheese and olive oil',
        price: 180,
        category: 'salads',
        ingredients: ['Tomatoes', 'Cucumber', 'Feta', 'Olives'],
      },
      {
        name: 'Quinoa Bowl',
        description: 'Quinoa with roasted vegetables, avocado, and tahini dressing',
        price: 200,
        category: 'salads',
        ingredients: ['Quinoa', 'Avocado', 'Roasted Vegetables', 'Tahini'],
      },
      // Burgers
      {
        name: 'Classic Beef Burger',
        description: 'Angus beef patty with cheddar, lettuce, tomato, and house sauce',
        price: 260,
        category: 'burgers',
        ingredients: ['Angus Beef', 'Cheddar', 'Lettuce', 'Tomato'],
      },
      {
        name: 'Truffle Mushroom Burger',
        description: 'Beef patty with sautéed mushrooms, truffle mayo, and arugula',
        price: 320,
        category: 'burgers',
        ingredients: ['Beef', 'Mushrooms', 'Truffle Mayo', 'Arugula'],
      },
      {
        name: 'Chicken Burger',
        description: 'Grilled chicken breast with avocado and chipotle sauce',
        price: 240,
        category: 'burgers',
        ingredients: ['Chicken', 'Avocado', 'Chipotle'],
      },
      // Pizza
      {
        name: 'Margherita',
        description: 'Tomato sauce, fresh mozzarella, basil',
        price: 220,
        category: 'pizza',
        ingredients: ['Tomato', 'Mozzarella', 'Basil'],
      },
      {
        name: 'Quattro Formaggi',
        description: 'Four cheese pizza with gorgonzola, parmesan, mozzarella, and fontina',
        price: 280,
        category: 'pizza',
        ingredients: ['Gorgonzola', 'Parmesan', 'Mozzarella', 'Fontina'],
      },
      {
        name: 'Prosciutto e Rucola',
        description: 'Prosciutto di Parma, arugula, parmesan shavings',
        price: 320,
        category: 'pizza',
        ingredients: ['Prosciutto', 'Arugula', 'Parmesan'],
      },
      // Main Courses
      {
        name: 'Ribeye Steak',
        description: '300g ribeye with herb butter and roasted vegetables',
        price: 580,
        category: 'main-courses',
        ingredients: ['Ribeye', 'Herb Butter', 'Vegetables'],
      },
      {
        name: 'Grilled Salmon',
        description: 'Atlantic salmon with lemon butter sauce and asparagus',
        price: 420,
        category: 'main-courses',
        ingredients: ['Salmon', 'Lemon Butter', 'Asparagus'],
      },
      {
        name: 'Duck Confit',
        description: 'Slow-cooked duck leg with cherry sauce and potato purée',
        price: 480,
        category: 'main-courses',
        ingredients: ['Duck', 'Cherry Sauce', 'Potato'],
      },
      {
        name: 'Lamb Chops',
        description: 'Herb-crusted lamb with mint sauce and ratatouille',
        price: 520,
        category: 'main-courses',
        ingredients: ['Lamb', 'Mint', 'Ratatouille'],
      },
      // Pasta
      {
        name: 'Carbonara',
        description: 'Spaghetti with pancetta, egg yolk, and pecorino',
        price: 240,
        category: 'pasta',
        ingredients: ['Spaghetti', 'Pancetta', 'Egg', 'Pecorino'],
      },
      {
        name: 'Bolognese',
        description: 'Tagliatelle with slow-cooked beef and pork ragù',
        price: 260,
        category: 'pasta',
        ingredients: ['Tagliatelle', 'Beef', 'Pork', 'Tomato'],
      },
      {
        name: 'Lobster Linguine',
        description: 'Linguine with fresh lobster in creamy tomato sauce',
        price: 480,
        category: 'pasta',
        ingredients: ['Linguine', 'Lobster', 'Tomato', 'Cream'],
      },
      // Beer Snacks
      {
        name: 'Chicken Wings',
        description: 'Crispy wings with buffalo or BBQ sauce',
        price: 180,
        category: 'beer-snacks',
        ingredients: ['Chicken Wings', 'Buffalo Sauce'],
      },
      {
        name: 'Nachos Supreme',
        description: 'Tortilla chips with cheese, jalapeños, salsa, and guacamole',
        price: 200,
        category: 'beer-snacks',
        ingredients: ['Tortilla', 'Cheese', 'Jalapeños', 'Guacamole'],
      },
      {
        name: 'Mozzarella Sticks',
        description: 'Breaded mozzarella with marinara sauce',
        price: 160,
        category: 'beer-snacks',
        ingredients: ['Mozzarella', 'Breadcrumbs', 'Marinara'],
      },
      // Desserts
      {
        name: 'Tiramisu',
        description: 'Classic Italian dessert with mascarpone and espresso',
        price: 180,
        category: 'desserts',
        ingredients: ['Mascarpone', 'Espresso', 'Ladyfingers'],
      },
      {
        name: 'Crème Brûlée',
        description: 'Vanilla custard with caramelized sugar',
        price: 160,
        category: 'desserts',
        ingredients: ['Vanilla', 'Cream', 'Sugar'],
      },
      {
        name: 'Chocolate Lava Cake',
        description: 'Warm chocolate cake with molten center and vanilla ice cream',
        price: 200,
        category: 'desserts',
        ingredients: ['Chocolate', 'Ice Cream'],
      },
      // Breakfast
      {
        name: 'Eggs Benedict',
        description: 'Poached eggs with hollandaise sauce on English muffin',
        price: 200,
        category: 'breakfast',
        ingredients: ['Eggs', 'Hollandaise', 'Muffin'],
      },
      {
        name: 'Pancakes with Berries',
        description: 'Fluffy pancakes with fresh berries and maple syrup',
        price: 180,
        category: 'breakfast',
        ingredients: ['Pancakes', 'Berries', 'Maple Syrup'],
      },
      {
        name: 'Avocado Toast',
        description: 'Sourdough with smashed avocado, poached egg, and microgreens',
        price: 190,
        category: 'breakfast',
        ingredients: ['Sourdough', 'Avocado', 'Egg', 'Microgreens'],
      },
    ];

    await MenuItem.insertMany(menuItems);
    reply.send({ message: 'Database seeded successfully', count: menuItems.length });
  } catch (err) {
    fastify.log.error(err);
    reply.status(500).send({ error: 'Failed to seed database' });
  }
});

// Start server
const start = async () => {
  try {
    const PORT = process.env.PORT || 3001;
    await fastify.listen({ port: Number(PORT), host: '0.0.0.0' });
    fastify.log.info(`Server running on port ${PORT}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
