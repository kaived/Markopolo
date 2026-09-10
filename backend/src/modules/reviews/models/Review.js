import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      default: null,
    },
    content: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
    },
    attachments: [{
      type: String,
    }],
    location: {
      type: String,
      default: null,
    },
    author_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    is_disabled: {
      type: Boolean,
      default: false,
    },
    is_hidden: {
      type: Boolean,
      default: false,
    },
    favoritedBy: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    }],
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  }
);

// Prisma-like object ID mapping
reviewSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: (doc, ret) => {
    delete ret._id;
  },
});

const Review = mongoose.model('Review', reviewSchema);
export default Review;
