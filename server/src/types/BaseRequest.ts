import { Request } from "express";

export type IBaseRequest<TBody, TQuery = {}> = Request<{}, {}, TBody, TQuery>;
