/**
 * Node modules
 */
import mongoose from "mongoose";

/**
 * Models
 */
import UserModel from "../models/userModel";
import { NotFoundException } from "../middlewares/errorHandler";

export const userService = {
  /**
   * Get current user
   */
  async getCurrentUser(userId: string) {
    const session = await mongoose.startSession();
    try {
      return await session.withTransaction(async () => {
        const user = await UserModel.findById(userId).session(session);

        if (!user) {
          throw new NotFoundException("User not found");
        }
        return user;
      });
    } catch (error) {
      throw error;
    } finally {
      session.endSession();
    }
  },
};
