/**
 * Node modules
 */
import mongoose, { Document, Schema } from "mongoose";

/**
 * Constants
 */
import { AUTH_PROVIDERS, AuthProviderType } from "../constants/authProviders";

export interface AccountDocument extends Document {
  provider: AuthProviderType;
  providerId: string;
  userId: mongoose.Types.ObjectId;
}

const accountSchema = new Schema<AccountDocument>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    provider: {
      type: String,
      enum: Object.values(AUTH_PROVIDERS),
    },
    providerId: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

const AccountModel = mongoose.model<AccountDocument>("Account", accountSchema);
export default AccountModel;
