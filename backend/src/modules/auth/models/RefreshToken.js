import mongoose from 'mongoose';

const refreshTokenSchema = new mongoose.Schema(
  {
    token: {
      type: String,
      required: true,
      unique: true,
    },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    expires_at: {
      type: Date,
      required: true,
      index: { expires: 0 }, // TTL index
    },
    used: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: false },
  }
);

refreshTokenSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: (doc, ret) => {
    delete ret._id;
  },
});

const RefreshToken = mongoose.model('RefreshToken', refreshTokenSchema);
export default RefreshToken;
