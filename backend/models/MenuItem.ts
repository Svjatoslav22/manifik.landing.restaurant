import mongoose, { Schema, Document } from 'mongoose';

export interface IMenuItem extends Document {
  name: string;
  description: string;
  price: number;
  category: string;
  image?: string;
  isAvailable: boolean;
  ingredients?: string[];
  createdAt: Date;
  updatedAt: Date;
}

const MenuItemSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    category: {
      type: String,
      required: true,
      enum: [
        'starters',
        'salads',
        'burgers',
        'pizza',
        'main-courses',
        'pasta',
        'beer-snacks',
        'desserts',
        'breakfast',
      ],
    },
    image: { type: String },
    isAvailable: { type: Boolean, default: true },
    ingredients: [{ type: String }],
  },
  { timestamps: true }
);

export default mongoose.models.MenuItem || mongoose.model<IMenuItem>('MenuItem', MenuItemSchema);
