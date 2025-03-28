/**
 * Node modules
 */
import mongoose, { Document, Schema } from "mongoose";

/**
 * Utils
 */
import { generateInviteCode } from "../utils/generateInviteCode";

export interface WorkspaceDocument extends Document {
  name: string;
  description: string;
  owner: mongoose.Types.ObjectId;
  inviteCode: string;
}

const workspaceSchema = new Schema<WorkspaceDocument>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: false,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    inviteCode: {
      type: String,
      required: true,
      unique: true,
      default: generateInviteCode,
    },
  },
  {
    timestamps: true,
    methods: {
      resetInviteCode() {
        return (this.inviteCode = generateInviteCode());
      },
    },
  }
);

const WorkspaceModel = mongoose.model<WorkspaceDocument>(
  "Workspace",
  workspaceSchema
);

export default WorkspaceModel;
