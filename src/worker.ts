import { PaginateResult } from "mongoose"
import { workerData, parentPort } from "worker_threads"
import redis from "redis"
import mongoose, { ConnectOptions } from 'mongoose'
import  {Schema, model, Document } from 'mongoose'
import mongoosePaginate from 'mongoose-paginate-v2'
import wait from "waait"

import { mongoURI } from "../secrets"

// 3초
const refreshTime = 3000
export const redisClient = redis.createClient(6379, "192.168.0.126")

mongoose.connect(mongoURI, {
    readPreference: 'primary',
    // useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
} as ConnectOptions)
mongoose.connection.once('open', () => {
    console.log('DB Connected in worker')
})

const itemSchema = new Schema({
    href: { type: String, required: true},
    category: { type: String },
    categoryName: { type: String },
    community: {type: String},
    communityName: {type: String},
    mappingCategory: { type: String },
    mappingCategoryName: { type: String },
    salePrice: { type : Number },
    saleStatus: { type : String },
    tags: { type : Array },
    thumbnail: { type : Buffer },
    title: { type : String },
    uploadTime: { type: Date },
    parentCommunity: { type: String },
    parentCommunityName: { type: String },
});
itemSchema.plugin(mongoosePaginate)
export interface ItemDoc extends Document {
    href: string,
    category: string,
    categoryName: string,
    community: string,
    communityName: string,
    mappingCategory: string,
    mappingCategoryName: string,
    salePrice: number,
    saleStatus: string,
    tags: string[]
    thumbnail: { type : Buffer, data : any },
    title: string,
    uploadTime: Date,
    parentCommunity: string,
    parentCommunityName: string,
}
export const Item = model<ItemDoc>('Item', itemSchema);

const run = (workerData) => {
  getItem(workerData)
};

function sleep(ms) {
  const wakeUpTime = Date.now() + ms;
  while (Date.now() < wakeUpTime) {}
}

const getItem = async ({ redisKeyName, query, options }) => {
  while (true) {
    sleep(refreshTime)
    try {
      const data = await Item.paginate(query, options);
      redisClient.set(redisKeyName, JSON.stringify(data), "EX", 60)
      console.log("succcess : ", redisKeyName)
    } catch (err) {
      console.log(`Error : ${err}`);
    }
  }

};

parentPort.postMessage(run(workerData));