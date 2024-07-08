import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import userRouter from './routes/auth.route.js';

const app = express();
app.use(cookieParser());
app.use(cors({
    origin: 'http://localhost:5173/',
    credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use("/api/auth", userRouter);

export { app }