/**
 * Node modules
 */
import mongoose from "mongoose";

/**
 * Types
 */
import { LoginPayload, RegisterPayload } from "../types/user";

/**
 * Models
 */
import UserModel from "../models/userModel";
import RoleModel from "../models/roleModel";
import MemberModel from "../models/memberModel";
import AccountModel from "../models/accountModel";
import WorkspaceModel from "../models/workspaceModel";
import RefreshTokenModel from "../models/refreshTokenModel";

/**
 * Middlewares
 */
import {
  BadRequestException,
  NotFoundException,
  UnauthorizedException,
} from "../middlewares/errorHandler";

/**
 * Constants
 */
import { ROLES } from "../constants/roles";
import { AUTH_PROVIDERS } from "../constants/authProviders";

/**
 * Utils
 */
import { generateTokens, verifyToken } from "../utils/jwt";

export const authService = {
  /**
   * REGISTER
   */
  async register({ name, email, password }: RegisterPayload) {
    const session = await mongoose.startSession();
    try {
      return await session.withTransaction(async () => {
        const existingUser = await UserModel.exists({ email }).session(session);
        if (existingUser) {
          throw new BadRequestException("Email already exists!");
        }

        const newUser = new UserModel({
          email,
          name,
          password,
        });
        await newUser.save({ session });

        const account = new AccountModel({
          userId: newUser._id,
          provider: AUTH_PROVIDERS.EMAIL,
          providerId: email,
        });
        await account.save({ session });

        const workspace = new WorkspaceModel({
          name: `My Workspace`,
          description: `Workspace created for ${newUser.name}`,
          owner: newUser._id,
        });
        await workspace.save({ session });

        const ownerRole = await RoleModel.findOne({
          name: ROLES.OWNER,
        }).session(session);
        if (!ownerRole) {
          throw new NotFoundException("Owner role not found");
        }

        const member = new MemberModel({
          userId: newUser._id,
          workspaceId: workspace._id,
          roleId: ownerRole._id,
          joinedAt: new Date(),
        });
        await member.save({ session });

        newUser.currentWorkspace = workspace._id as mongoose.Types.ObjectId;
        await newUser.save({ session });

        return {
          userId: newUser._id as mongoose.Types.ObjectId,
          workspaceId: workspace._id as mongoose.Types.ObjectId,
        };
      });
    } catch (error) {
      throw error;
    } finally {
      session.endSession();
    }
  },

  /**
   * LOGIN
   */
  async login({ email, password }: LoginPayload) {
    const session = await mongoose.startSession();
    try {
      return await session.withTransaction(async () => {
        const user = await UserModel.findOne({ email }).session(session);

        if (!user) {
          throw new NotFoundException("User not found");
        }

        const isValidPassword = await user.comparePassword(password);

        if (!isValidPassword) {
          throw new BadRequestException(
            "Invalid credentials",
            "INVALID_CREDENTIALS"
          );
        }

        const tokens = generateTokens({ userId: user._id as string });

        await RefreshTokenModel.create(
          [
            {
              token: tokens.refreshToken,
              userId: user._id,
              expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
            },
          ],
          { session }
        );

        user.lastLogin = new Date();

        await user.save({ session });

        return {
          user,
          tokens,
        };
      });
    } catch (error) {
      throw error;
    } finally {
      session.endSession();
    }
  },

  /**
   * LOGOUT
   */
  async logout(userId: string, refreshToken: string) {
    await RefreshTokenModel.findOneAndUpdate(
      { userId, token: refreshToken },
      { isRevoked: true }
    );
  },

  /**
   * REFRESH TOKEN
   */
  async refreshToken(token: string) {
    const refreshTokenDoc = await RefreshTokenModel.findOne({
      token,
      isRevoked: false,
      expiresAt: { $gt: new Date() },
    });

    if (!refreshTokenDoc) {
      throw new UnauthorizedException("Invalid refresh token");
    }

    const { accessToken } = generateTokens({
      userId: refreshTokenDoc.userId.toString(),
    });

    return { accessToken };
  },
};
