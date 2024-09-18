import bcryptjs from "bcryptjs";
import jsonwebtoken from "jsonwebtoken";

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Adjust the import path as needed

export const registerUser = async (req, res) => {
  try {
    const {
      username,
      full_name,
      email,
      password,
      phone_number,
      profile_image,
      weight,
      height,
      gender,
      role,
      fitness_goal,
      fitness_level,
      health_issues,
      activity_level,
      workout_preference,
    } = req.body;

    // Convert weight and height to numbers
    const parsedWeight = parseFloat(weight);
    const parsedHeight = parseFloat(height);

    if (isNaN(parsedWeight) || isNaN(parsedHeight)) {
      return res.status(400).json({ error: 'Invalid weight or height' });
    }

    // Calculate BMI
    const bmi = parsedHeight > 0 ? parsedWeight / ((parsedHeight / 100) ** 2) : null;

    // Hash the password
    const hashedPassword = await bcryptjs.hash(password, 10);

    const user = await prisma.users.create({
      data: {
        username,
        full_name,
        email,
        password: hashedPassword, // Store hashed password
        phone_number,
        profile_image,
        weight: parsedWeight,
        height: parsedHeight,
        gender,
        role,
        fitness_goal,
        fitness_level,
        bmi, // Include calculated BMI
        health_issues,
        activity_level,
        workout_preference,
      },
    });

    res.status(201).json(user);
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


//login user
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await prisma.users.findUnique({
      where: { email },
    });
    
    console.log(user.user_id)

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const isPasswordValid = await bcryptjs.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }
    console.log('id', user.user_id);
    const token = jsonwebtoken.sign(
      { user_id: user.user_id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.status(200).json({ token });
  } catch (error) {
    console.error('Error logging in user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// get all users


const getUsers = async (req, res) => {
    try {
        const users = await prisma.users.findMany();
        res.status(200).json(users);
    } catch (error) {
        console.error('Error getting users:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};




// const getUser = async (req, res) => {
//     try {
//         const userId = req.user.id;
//         const user = await prisma.users.findUnique({
//             where: { id: userId },
//         });
//         res.status(200).json(user);
//     } catch (error) {
//         console.error('Error getting user:', error);
//         res.status(500).json({ error: 'Internal server error' });
//     }
// };

const getUser = async (req, res) => {
  try {
    console.log('Authenticated User:', req.user); // Add this line to debug
    const userId = req.user.user_id;
    if (!userId) {
      return res.status(400).json({ error: 'User ID not found' });
    }
    const user = await prisma.users.findUnique({
      where: { user_id: userId },
    });
    res.status(200).json(user);
  } catch (error) {
    console.error('Error getting user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


// update users

const updateUser = async (req, res) => {
  const { name, email, age, gender, weight, height } = req.body;
  try {
    // Get the user ID from the request if the user is authenticated
    const userId = req.user.user_id;
    
    
    // update user profile
    const updatedUser = await prisma.users.update({
      where: { user_id: userId },
      data: {
        name: name || undefined,
        email: email || undefined,
        age: age ? parseInt(age) : undefined, // Ensure age is an integer
        gender: gender || undefined,
        weight: weight ? parseFloat(weight) : undefined, // Parse weight as a number
        height: height ? parseFloat(height) : undefined, // Parse height as a number
      },
    });
    res.status(200).json({ message: 'Profile updated successfully!', user: updatedUser });
    
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// change password

// const changePassword = async (req, res) => {

//   const { oldPassword, newPassword } = req.body;
//   try {
//     const userId = req.user.user_id;
//     const user = await prisma.users.findUnique({
//       where: { user_id: userId },
//     });
//     if (!user) {
//       return res.status(404).json({ error: 'User not found' });
//     }
//     const isPasswordValid = await bcryptjs.compare(oldPassword, user.password);
//     if (!isPasswordValid) {
//       return res.status(401).json({ error: 'Invalid password' });
//     }
//     const hashedPassword = await bcryptjs.hash(newPassword, 10);
//     await prisma.users.update({
//       where: { user_id: userId },
//       data: { password: hashedPassword },
//     });
//     res.status(200).json({ message: 'Password updated successfully!' });
//   } catch (error) {
//     console.error('Error changing password:', error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// }


import crypto from "crypto";
import nodemailer from "nodemailer";



// Generate a random reset token and store it in the database
export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await prisma.users.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Generate a reset token
    const resetToken = crypto.randomBytes(20).toString("hex");

    // Set token expiration to 1 hour from now
    const resetTokenExpiry = new Date(Date.now() + 3600000);

    // Save the reset token and expiry to the user in the database
    await prisma.users.update({
      where: { email },
      data: {
        reset_token: resetToken,
        reset_token_expiry: resetTokenExpiry,
      },
    });

    // Send the reset token via email
    const transporter = nodemailer.createTransport({
      service: "Gmail", // You can change to another email service if needed
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const resetLink = `http://localhost:5173/reset-password/${resetToken}`; // Update port if different

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Password Reset Request",
      text: `You requested a password reset. Use the following link to reset your password: ${resetLink}`,
    };

    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        return res.status(500).json({ error: "Error sending email" });
      }
      res.status(200).json({ message: "Reset link sent to your email" });
    });
  } catch (error) {
    console.error("Error in forgot password:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};


// reset pw
export const resetPassword = async (req, res) => {
  try {
    const { token } = req.params; // Extract token from URL params
    const { newPassword } = req.body; // Extract new password from request body

    if (!newPassword) {
      return res.status(400).json({ error: "New password is required" });
    }

    // Find the user with the given reset token
    const user = await prisma.users.findFirst({
      where: {
        reset_token: token,
        reset_token_expiry: { gte: new Date() }, // Ensure the token hasn't expired
      },
    });

    if (!user) {
      return res.status(400).json({ error: "Invalid or expired token" });
    }

    // Hash the new password
    const hashedPassword = await bcryptjs.hash(newPassword, 10);

    // Update the user's password and clear the reset token
    await prisma.users.update({
      where: { email: user.email },
      data: {
        password: hashedPassword,
        reset_token: null,
        reset_token_expiry: null,
      },
    });

    res.status(200).json({ message: "Password has been reset successfully" });
  } catch (error) {
    console.error("Error in reset password:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};




export default { registerUser, loginUser, getUsers,getUser, updateUser, forgotPassword, resetPassword };