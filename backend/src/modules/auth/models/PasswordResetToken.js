import mongoose from 'mongoose';

const passwordResetTokenSchema = new mongoose.Schema(
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
    },
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: false },
  }
);

passwordResetTokenSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: (doc, ret) => {
    delete ret._id;
  },
});

const PasswordResetToken = mongoose.model('PasswordResetToken', passwordResetTokenSchema);
export default PasswordResetToken;
