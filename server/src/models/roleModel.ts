/**
 * Node modules
 */
import mongoose, { Schema } from "mongoose";

/**
 * Constants
 */
import {
  PERMISSIONS,
  PermissionType,
  ROLES,
  RoleType,
} from "../constants/roles";
import { RolePermissions } from "../utils/rolePermission";

export interface RoleDocument extends Document {
  name: RoleType;
  permissions: Array<PermissionType>;
}

const roleSchema = new Schema<RoleDocument>(
  {
    name: {
      type: String,
      enum: Object.values(ROLES),
      required: true,
      unique: true,
    },
    permissions: {
      type: [String],
      enum: Object.values(PERMISSIONS),
      required: true,
      default: function (this: RoleDocument) {
        return RolePermissions[this.name];
      },
    },
  },
  {
    timestamps: true,
  }
);

const RoleModel = mongoose.model<RoleDocument>("Role", roleSchema);
export default RoleModel;
