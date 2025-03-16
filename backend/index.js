import express from "express"
import { connectDB } from "./config/connectToDB.js"
import { errorHandler, notFound } from "./middlewares/error.js"
import rateLimiting from "express-rate-limit"
import xss from 'xss-clean'
import dotenv from 'dotenv'
import hpp from "hpp"
import helmet from "helmet"
import authRoute from "./routes/auth.route.js";
import reviewRoute from "./routes/review.route.js";
import categoryRoute from "./routes/category.route.js";
import productRoute from "./routes/product.route.js";
import cartRoute from "./routes/cart.route.js";
import cors from "cors"
dotenv.config()

const app = express()

app.use(express.json())

app.use(helmet())

app.use(hpp())

app.use(xss())

app.use(rateLimiting({
    windowMs: 10 * 60 * 1000,
    max: 200
}))

app.use(cors());

app.use("/auth", authRoute);
app.use("/categories", categoryRoute);
app.use("/products", productRoute);
app.use("/carts", cartRoute);
app.use("/reviews", reviewRoute);

app.use(notFound)
app.use(errorHandler)

app.listen(process.env.PORT, async() => {
    console.log(`Server started at http://localhost:${process.env.PORT}`);
    await connectDB();
});