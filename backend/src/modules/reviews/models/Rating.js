import mongoose from 'mongoose';

const ratingSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    review_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Review',
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  }
);

// One rating per user per review
ratingSchema.index({ user_id: 1, review_id: 1 }, { unique: true });

ratingSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: (doc, ret) => {
    delete ret._id;
  },
});

const Rating = mongoose.model('Rating', ratingSchema);
export default Rating;
