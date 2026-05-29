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
const allowedOrigins = ['http://localhost:3000', 'http://localhost:3001'];
if (process.env.FRONTEND_URL) {
  allowedOrigins.push(process.env.FRONTEND_URL);
}

fastify.register(cors, {
  origin: allowedOrigins,
  credentials: true,
});

fastify.get('/', async () => ({
  status: 'ok',
  service: 'manifik-backend',
}));

fastify.get('/health', async () => ({
  status: 'ok',
}));

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

// Seed endpoint removed: all data should come from MongoDB in production.

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
