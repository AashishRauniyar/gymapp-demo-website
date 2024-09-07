import express from 'express';
import dotenv from 'dotenv';
import userRouter from './routes/userRoutes.js';
import cors from 'cors';


dotenv.config();

const app = express();
// app.use(cors({
//     origin: 'http://localhost:5173', // Your frontend URL
//     methods: 'GET,POST,PUT,DELETE',
//     credentials: true
// }));  

app.use(cors());
app.use(express.json());

app.use('/api/users', userRouter);

const PORT = process.env.PORT || 8001;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
