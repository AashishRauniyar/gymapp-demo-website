import bcryptjs from "bcryptjs";
import jsonwebtoken from "jsonwebtoken";

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();



export const registerUser = async (req, res) => {
  try {
    const { name, email, password, age, gender, weight, height } = req.body;

    // Convert age, weight, and height to integers
    const parsedAge = parseInt(age, 10);
    const parsedWeight = parseInt(weight, 10);
    const parsedHeight = parseInt(height, 10);

    if (isNaN(parsedAge) || isNaN(parsedWeight) || isNaN(parsedHeight)) {
      return res.status(400).json({ error: 'Invalid input data' });
    }

    // Hash the password
    const hashedPassword = await bcryptjs.hash(password, 10);

    const user = await prisma.users.create({
      data: {
        name,
        email,
        password: hashedPassword, // Store hashed password
        age: parsedAge,
        gender,
        weight: parsedWeight,
        height: parsedHeight,
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


export default { registerUser, loginUser, getUsers,getUser, updateUser };