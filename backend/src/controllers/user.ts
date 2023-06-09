/// <reference path="../../@types/session.d.ts" />
import { Request, Response } from "express";
import { RequestHandler } from "express";
import User from "../models/User.js";
import bcrypt from "bcrypt";

export const getAuthenticatedUser: RequestHandler = async (req, res) => {
  const authenticatedUserId = req.session.userId;
  try {
    if (!authenticatedUserId) {
      res.status(401).json({
        success: false,
        msg: "User not authenticated!",
      });
      return;
    }
    const user = await User.findById(authenticatedUserId)
      .select("+email + userName")
      .exec();
    console.log("User credential cookie", user);
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

export const getUserPhoto: RequestHandler = async (req, res) => {
  const { id } = req.params;
  console.log("user ID:", req.params);
  try {
    if (!id) {
      res.status(401).json({
        success: false,
        msg: "User not authenticated!",
      });
      return;
    }
    const userPhoto = await User.findById(id).select("userPicture").exec();
    console.log("User picture", userPhoto);
    res.status(200).json(userPhoto);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

interface createUser {
  userName?: string;
  email?: string;
  password?: string;
}
export const createUser: RequestHandler<
  unknown,
  unknown,
  createUser,
  unknown
> = async (
  req: Request<unknown, unknown, createUser, unknown>,
  res: Response
) => {
  const username = req.body.userName;
  const email = req.body.email;
  const passwordBefore = req.body.password;
  try {
    if (!username || !email || !passwordBefore) {
      res.status(400).json({
        success: false,
        msg: `You need to provide all parameters. Received: ${JSON.stringify({
          username,
          email,
          passwordBefore,
        })}`,
      });
      return;
    }
    const existingUserName = await User.findOne({ userName: username }).exec();
    if (existingUserName) {
      res.status(409).json({
        success: false,
        msg: `The name already exists. Please choose another one or log in instead.`,
      });
      return;
    }
    const existingEmail = await User.findOne({ email: email }).exec();
    if (existingEmail) {
      res.status(409).json({
        success: false,
        msg: `The email already exists. Please log in instead.`,
      });
      return;
    }
    const passwordHashed = await bcrypt.hash(passwordBefore, 10);
    const newUser = await User.create({
      userName: username,
      email: email,
      password: passwordHashed,
    });
    req.session.userId = newUser._id;
    res.status(201).json(newUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

interface loginUserBody {
  userName?: string;
  password?: string;
}

export const loginUser: RequestHandler<
  unknown,
  unknown,
  loginUserBody,
  unknown
> = async (
  req: Request<unknown, unknown, loginUserBody, unknown>,
  res: Response
) => {
  try {
    const userName = req.body.userName;
    const password = req.body.password;

    if (!userName || !password) {
      res.status(404).json({ success: false, msg: "Credentials missing!" });
      return;
    }
    const user = await User.findOne({ userName: userName })
      .select("password + email + userName")
      .exec();
    if (!user) {
      res.status(401).json({ success: false, msg: "Wrong Credentials!" });
      return;
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      res.status(400).json({ success: false, msg: "Wrong Credentials!" });
      return;
    }
    req.session.userId = user._id;
    console.log("User data:", user);
    res.status(201).json(user);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, msg: "Unable to login user, try again later" });
  }
};

export const logoutUser: RequestHandler = async (req, res) => {
  req.session.destroy((error) => {
    if (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
    } else {
      res.sendStatus(200);
    }
  });
};

interface updateUser {
  userPicture?: string;
  userName?: string;
}
export const updateUser: RequestHandler<
  unknown,
  unknown,
  updateUser,
  unknown
> = async (
  req: Request<unknown, unknown, updateUser, unknown>,
  res: Response
) => {
  const userName = req.body.userName;
  console.log("userName", userName);
  const userPicture = req.body.userPicture;

  try {
    if (!userPicture) {
      res.status(400).json({
        success: false,
        msg: "You need to provide your picture!",
      });
      return;
    }

    const updatedUser = await User.findOneAndUpdate(
      { userName: userName },
      {
        $set: {
          userPicture: userPicture,
        },
      },
      { new: true }
    );
    req.session.userId = updatedUser._id;
    res.status(201).json(updatedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};
