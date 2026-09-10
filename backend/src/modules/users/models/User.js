import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, 'Username is required'],
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password_hash: {
      type: String,
      required: [true, 'Password hash is required'],
    },
    avatar_url: {
      type: String,
      default: null,
    },
    role: {
      type: String,
      enum: ['USER', 'ADMIN'],
      default: 'USER',
    },
    is_active: {
      type: Boolean,
      default: true,
    },
    favoriteReviews: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Review',
    }],
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  }
);

// Add transform to mirror Prisma's output (id instead of _id)
userSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  },
});

const User = mongoose.model('User', userSchema);
export default User;
