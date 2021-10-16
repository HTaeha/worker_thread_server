import { ItemDoc, itemReturnType } from "../data/mongoData"

type redisDataProps = {
    data: string,
    page: number,
    size: number,
}
export const redisData = ({data, page, size}:redisDataProps) => {
    let jsonVal:Array<ItemDoc> = JSON.parse(data)
    jsonVal = setNewThumbnail({data: jsonVal})

    let result:itemReturnType = {
        docs: jsonVal,
        hasNextPage: true,
        hasPrevPage: page === 1 ? false : true,
        limit: size,
        nextPage: page + 1,
        page: page,
        pagingCounter: 1,
        prevPage: null,
        totalDocs: size,
        totalPages: size * 100,
    }

    return result
}

const setNewThumbnail = ({data}) => {
    data.map((item) => {
        let newThumbnail = Buffer.from(item.thumbnail, "base64")
        item.thumbnail = newThumbnail
    })

    return data
}