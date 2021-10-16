import { Request, Response } from "express";
import { PaginateResult, QueryOptions } from "mongoose";
import { Worker } from "worker_threads";

import { Item, ItemDoc } from "../data/mongoData";
import { esClient, redisClient } from "../server";

const saleStatusCondition = ["거래완료", "완료", "삭제", ""];

export const runCategory = async (req: Request, res: Response) => {
  const redisKeyName = String(req.body.redisKeyName);
  const query = req.body.query;
  const options = req.body.options;

  redisClient.exists(redisKeyName, (err, reply)=>{
    console.log(err, reply)
  })

  // const worker = new Worker("./src/worker.js", {
  //   workerData: { redisKeyName, query, options },
  // });

  // //Listen for a message from worker
  // worker.once("message", (result) => {
  //   console.log("message : ", result);
  // });

  // worker.on("error", (error) => {
  //   console.log("error :", error);
  // });

  // worker.on("exit", (exitCode) => {
  //   console.log("exit : ", exitCode);
  // });

  // console.log("Executed in the parent thread");
};

export const runSearch = async (req: Request, res: Response) => {
  let text = String(req.body.text);
  const page = Number(req.body.page);
  const size = Number(req.body.size);
  const checkedList: string[] = String(req.body.checkedList).split(",");
  const ordering = req.body.ordering;

  console.log(req.body);
  console.log(page, size, checkedList, ordering);
  return res.status(200).send();

  let sortItem;
  let sortCondition;
  if (ordering === "newest") {
    sortCondition = {
      uploadTime: {
        order: "desc",
        format: "strict_date_optional_time_nanos",
      },
    };
    sortItem = {
      uploadTime: -1,
    };
  } else if (ordering === "lowestPrice") {
    sortCondition = {
      salePrice: {
        order: "asc",
      },
    };
    sortItem = {
      salePrice: 1,
      uploadTime: -1,
    };
  } else if (ordering === "highestPrice") {
    sortCondition = {
      salePrice: {
        order: "desc",
      },
    };
    sortItem = {
      salePrice: -1,
      uploadTime: -1,
    };
  } else {
    res.status(500).send();
  }

  const { body } = await esClient.search({
    index: "items",
    body: {
      from: page * size,
      size: size,
      sort: [sortCondition, "_score"],
      query: {
        bool: {
          must_not: [
            {
              terms: {
                saleStatus: saleStatusCondition,
                boost: 1.0,
              },
            },
          ],
          must: [
            {
              match: {
                title: {
                  query: text,
                  operator: "or",
                },
              },
            },
            {
              range: {
                salePrice: {
                  gt: 0,
                },
              },
            },
            {
              terms: {
                parentCommunity: checkedList,
                boost: 1.0,
              },
            },
          ],
        },
      },
    },
  });

  let ids = body.hits.hits.map((hit: { _id: any }) => {
    return hit._id;
  });
  let ret: ItemDoc[] = await Item.find({ _id: { $in: ids } }).sort(sortItem);

  let result = {
    docs: ret,
    hasNextPage: true,
    hasPrevPage: page === 1 ? false : true,
    nextPage: page + 1,
    page: page,
    totalPages: 100 * size,
  };

  res.status(200).send(result);
};
