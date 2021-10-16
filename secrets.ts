import dotenv from "dotenv"
dotenv.config();
// db config
export const mongoURI = process.env.MONGO_URL
export const elasticPassword = process.env.ELASTIC_PASSWORD

export const pusherAppId = process.env.PUSHER_APP_ID
export const pusherKey = process.env.PUSHER_KEY
export const pusherSecret = process.env.PUSHER_SECRET