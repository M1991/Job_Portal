// API Documentation
import swaggerUi from "swagger-ui-express";
import swaggerDoc from "swagger-jsdoc";

// packages imports
import express from "express";
import "express-async-errors";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";

// security
import helmet from "helmet";
import xss from "xss-clean";
import mongoSanitize from "express-mongo-sanitize";
// file imports
import connectDB from "./config/db.js";

//routes
import testRoutes from "./routes/testRoutes.js"
import authRoutes from "./routes/authRoutes.js"
import errorMiddleware from "./middlewares/errorMiddleware.js";
import userRoutes from "./routes/userRoutes.js"
import jobRoutes from "./routes/jobsRoutes.js"

// Dot ENV config
dotenv.config();

//mongodb connection
connectDB();

// Swagger API Config
const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title:'Job Portal Application',
            description: 'Node ExpressJS Job Portal Application',
        },
        servers: [
            {
                url: "http://localhost:5000",
            },
        ],
    },
    apis:['./routes/*.js'],
};

const spec = swaggerDoc(options);


// rest object
const app = express();

// middlewares
app.use(helmet());
app.use(xss());
app.use(mongoSanitize());
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));


//routes
/* app.get("/", (req, res) => {
    res.send("Hello World");
});
 */
app.use("/api/v1/test", testRoutes);
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/job", jobRoutes);

// homeroute root
app.use("/api-doc", swaggerUi.serve, swaggerUi.setup(spec));

// validation middleware
app.use(errorMiddleware);

const PORT = process.env.PORT || 5000;

// listen
app.listen(PORT, () =>{
    console.log(`Server running at PORT:  ${PORT}`)
    // console.log(process.env.DEV_MODE);
});