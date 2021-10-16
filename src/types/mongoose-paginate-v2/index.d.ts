import { ReadPreferenceMode } from 'mongodb';
import 'mongoose';

// make sure to install mongodb as dev dependency ```yarn add -D mongodb```

// Type definitions for mongoose-paginate-v2 1.3
// Project: https://github.com/webgangster/mongoose-paginate-v2
// Definitions by: Linus Brolin <https://github.com/linusbrolin>
//                 simonxca <https://github.com/simonxca>
//                 woutgg <https://github.com/woutgg>
//                 oktapodia <https://github.com/oktapodia>
//                 Dongjun Lee <https://github.com/ChazEpps>
//                 gamsterX <https://github.com/gamsterx>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped
// Minimum TypeScript Version: 3.2
//
// Based on type declarations for mongoose-paginate 5.0.0.

declare module 'mongoose' {
  interface CustomLabels {
    totalDocs?: string;
    limit?: string;
    page?: string;
    totalPages?: string;
    docs?: string;
    nextPage?: string;
    prevPage?: string;
  }

  interface ReadOptions {
    pref: string;
    tags?: any[];
  }

  interface CollationOptions {
    locale?: string;
    caseLevel?: boolean;
    caseFirst?: string;
    strength?: number;
    numericOrdering?: boolean;
    alternate?: string;
    maxVariable?: string;
    backwards?: boolean;
  }

  interface ModelPopulateOptions extends QueryPopulateOptions {
    /** optional, if true Mongoose will always set path to an array. Inferred from schema by default */
    justOne?: boolean;
  }

  interface QueryFindBaseOptions {
    /** Sets a default collation for every query and aggregation. */
    collation?: CollationOptions;
    explain?: any;
    lean?: boolean;
    populate?: string | ModelPopulateOptions;
    /** like select, it determines which fields to return */
    projection?: any;
    /** use client session for transaction */
    session?: ClientSession;
  }

  interface QueryFindOptions extends QueryFindBaseOptions {
    batchSize?: number;
    comment?: any;
    hint?: any;
    limit?: number;
    maxscan?: number;
    readPreference?: ReadPreferenceMode;
    skip?: number;
    snapshot?: any;
    sort?: any;
    tailable?: any;
  }

  interface PaginateOptions {
    select?: object | string;
    sort?: object | string;
    customLabels?: CustomLabels;
    collation?: CollationOptions;
    populate?: object[] | string[] | object | string | QueryPopulateOptions;
    lean?: boolean;
    leanWithId?: boolean;
    offset?: number;
    page?: number;
    limit?: number;
    read?: ReadOptions;
    /* If pagination is set to `false`, it will return all docs without adding limit condition. (Default: `true`) */
    pagination?: boolean;
    projection?: any;
    options?: QueryFindOptions;
  }

  interface QueryPopulateOptions {
    /** space delimited path(s) to populate */
    path: string;
    /** optional fields to select */
    select?: any;
    /** optional query conditions to match */
    match?: any;
    /** optional model to use for population */
    model?: string | Model<any>;
    /** optional query options like sort, limit, etc */
    options?: any;
    /** deep populate */
    populate?: QueryPopulateOptions | QueryPopulateOptions[];
  }

  interface PaginateResult<T> {
    docs: T[];
    totalDocs: number;
    limit: number;
    page?: number;
    totalPages: number;
    nextPage?: number | null;
    prevPage?: number | null;
    pagingCounter: number;
    hasPrevPage: boolean;
    hasNextPage: boolean;
    meta?: any;
    [customLabel: string]: T[] | number | boolean | null | undefined;
  }

  interface PaginateModel<T extends Document> extends Model<T> {
    paginate(
      query?: FilterQuery<T>,
      options?: PaginateOptions,
      callback?: (err: any, result: PaginateResult<T>) => void,
    ): Promise<PaginateResult<T>>;
  }

  function model<T extends Document>(
    name: string,
    schema?: Schema<any>,
    collection?: string,
    skipInit?: boolean,
  ): PaginateModel<T>;
}

import mongoose = require('mongoose');
declare function _(schema: mongoose.Schema): void;
export = _;
declare namespace _ {
  const paginate: { options: mongoose.PaginateOptions };
}