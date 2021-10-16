import express, {Request, Response} from 'express'
import mongoose, { ConnectOptions } from 'mongoose'
import { Client } from '@elastic/elasticsearch'
import cors from 'cors'
import bodyParser from "body-parser";
import redis from "redis"

import router from "./routes"
import { mongoURI, elasticPassword } from "../secrets"

// app config
const app = express();
const port = process.env.PORT || 6000;

// Add a list of allowed origins.
// If you have more origins you would like to add, you can add them to the array below.
const allowedOrigins = [
    'http://localhost:3333',
    "http://ggulmo.com/api"
];

// middlewares
app.use(cors({
    origin: allowedOrigins,
    credential: true,
}))
app.use(express.json())

// parse application/json
app.use(bodyParser.json());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

export const redisClient = redis.createClient(6379, "192.168.0.126")

export const esClient = new Client({ 
    node: 'http://192.168.0.87:9200',
    auth: {
        username: 'elastic',
        password: elasticPassword
    }
})

mongoose.connect(mongoURI, {
    readPreference: 'primary',
    // useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
} as ConnectOptions)

mongoose.connection.once('open', () => {
    console.log('DB Connected')
})

app.use('/', router)

//listen
app.listen(port, () => console.log(`listening on localhost on ${port}`))