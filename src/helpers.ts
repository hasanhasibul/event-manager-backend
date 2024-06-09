import { Request } from "express";

export const paginationHelper = (req: Request) => {
  const page = req.query.page || 1;
  const limit = req.query.limit || 20;

  const skip = (Number(page) - Number(1)) * Number(limit);
  const searchTerm = req.query.searchTerm;

  return { page, limit, skip, searchTerm };
};
