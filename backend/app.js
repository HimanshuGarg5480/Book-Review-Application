import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import authRouter from './routes/auth.route.js';
import userRouter from './routes/user.route.js';

const app = express();
app.use(cookieParser());
app.use(cors({
    origin: 'http://localhost:5173/',
    credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use("/api/auth", authRouter);
app.use("/api/user",userRouter)

export { app }