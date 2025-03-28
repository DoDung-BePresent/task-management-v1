import mongoose, { Document, Schema } from "mongoose";

export interface RefreshTokenDocument extends Document {
  token: string;
  userId: mongoose.Types.ObjectId;
  expiresAt: Date;
  isRevoked: boolean;
}

const refreshTokenSchema = new Schema<RefreshTokenDocument>(
  {
    token: {
      type: String,
      required: true,
      unique: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    expiresAt: {
      type: Date,
      required: true,
    },
    isRevoked: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const RefreshTokenModel = mongoose.model<RefreshTokenDocument>(
  "RefreshToken",
  refreshTokenSchema
);
export default RefreshTokenModel;
