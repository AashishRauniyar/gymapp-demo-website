import bcryptjs from "bcryptjs";
import jsonwebtoken from "jsonwebtoken";

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();



// register a user
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

    const user = await prisma.users.create({
      data: {
        name,
        email,
        password,
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


// Login a user
const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await prisma.users.findUnique(
            {
                where: {
                    email
                }
            }
        )

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const isPasswordValid = await bcryptjs.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        const token = jsonwebtoken.sign(
            { id: user.id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.status(200).json({ token });

    } catch (error) {
        console.error('Error logging in user:', error);
    res.status(500).json({ error: 'Internal server error' });
    }
}

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

export default { registerUser, loginUser, getUsers };
