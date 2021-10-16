import  {Schema, model, Document } from 'mongoose'
import mongoosePaginate from 'mongoose-paginate-v2'

const marketSchema = new Schema({
    marketId : { type: String, required: true, unique: true},
    MarketName : { type: String, required: true, unique: true}, 
    items : [ { type: Schema.Types.ObjectId, ref: 'Item'} ],
})

const userSchema = new Schema({
    google: { type: Object, unique: true },
    alias: { type: String }, 
    keywords: [ {type: String}],
});

const categorySchema = new Schema({
    categoryId : { type: String, required: true, unique:true},
    categoryName : { type: String, required: true},
    items : [ { type: Schema.Types.ObjectId, ref: 'Item'} ],
    itemLength: Number,
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

const postSchema = new Schema({
    title: { type: String, required: true},
    uploadTime: { type: Date },
    hits: { type: Number },
    author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    contents: { type: String, required: true }
})

itemSchema.plugin(mongoosePaginate)
postSchema.plugin(mongoosePaginate)

// Property 'itemLength' does not exist on type 'Document'.
export interface CategoryDoc extends Document {
    itemLength: {
        type: number;
        unique: boolean;
        required: boolean;
    }
}

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

export type itemReturnType = {
    docs: Array<ItemDoc>,
    hasNextPage: Boolean,
    hasPrevPage: Boolean,
    limit: Number,
    nextPage: Number,
    page: Number,
    pagingCounter: Number,
    prevPage: Number | null,
    totalDocs: Number,
    totalPages: Number,
}

export interface PostDoc extends Document {
    uploadTime: {
      type: Date;
    }
}

export const User = model('User', userSchema);
export const Market = model('Market', marketSchema);
export const Category = model<CategoryDoc>('Category', categorySchema);
export const Item = model<ItemDoc>('Item', itemSchema);
export const Post = model<PostDoc>('Post', postSchema)