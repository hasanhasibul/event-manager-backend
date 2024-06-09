import { Request } from "express";
import { eventInterface } from "./event.interface";
import eventModal from "./event.model";
import { paginationHelper } from "../../../helpers";
import pick from "../../../shared/pick";

const createEventServices = async (reqBody: eventInterface) => {
  const event = await eventModal.create(reqBody);
  if (!event) {
    throw new Error("event creation fail");
  }
  return event;
};

const updateEventServices = async (req: Request) => {
  const id = req.params.id;
  const event = await eventModal.findByIdAndUpdate(id, req.body);
  if (!event) {
    throw new Error("event updated fail");
  }
  return event;
};
const addEventAttedenceServices = async (req: Request) => {
  const user = req?.user;
  if (!user) {
    throw new Error("user not found");
  }
  const id = req.params.id;
  const event = await eventModal.find({ _id: id });
  if (!event) {
    throw new Error("event not found");
  }
  const findEvent = event[0];

  if (!findEvent?.attendees?.includes(user?._id)) {
    findEvent?.attendees?.push(user?._id);
  }

  const eventUpdate = await eventModal.findByIdAndUpdate(id, findEvent);
  if (!eventUpdate) {
    throw new Error("event updated fail");
  }
  return eventUpdate;
};
const getEventServices = async (req: Request) => {
  const { limit, page, skip, searchTerm } = paginationHelper(req);

  const andConditions = [];
  // Search needs $or for searching in specified fields
  if (searchTerm) {
    andConditions.push({
      $or: ["location", "title"].map((field) => ({
        [field]: {
          $regex: searchTerm,
          $options: "i",
        },
      })),
    });
  }
  const filtersByDateRange = pick(req.query, ["start_time", "end_time"]);
  const start_time = new Date(filtersByDateRange?.start_time as any);
  const end_time = new Date(filtersByDateRange?.end_time as any);
  if (Object.keys(filtersByDateRange).length) {
    andConditions.push({
      $and: Object.entries(filtersByDateRange).map(([field, value]: any) => {
        if (field === "start_time") {
          return {
            start_time: { $gte: new Date(start_time) },
          };
        }
        if (field === "end_time") {
          return {
            start_time: { $lte: new Date(end_time) },
          };
        }
      }),
    });
  }

  // return andConditions;

  const whereConditions: any =
    andConditions.length > 0 ? { $and: andConditions } : {};
  const total = await eventModal.countDocuments();
  const event = await eventModal
    .find(whereConditions, {
      title: 1,
      location: 1,
      start_time: 1,
    })
    .skip(skip)
    .limit(Number(limit))
    .sort({
      createdAt: "desc",
    });

  if (!event) {
    throw new Error("event retrieved fail");
  }
  return {
    meta: {
      page,
      limit,
      total,
    },
    event,
  };
};
const deleteEventServices = async (req: Request) => {
  const id = req.params.id;
  const event = await eventModal.findByIdAndDelete({ _id: id });
  if (!event) {
    throw new Error("event deleted fail");
  }
  return event;
};
const getEventByIdServices = async (req: Request) => {
  const id = req.params.id;
  const event = await eventModal
    .findById({ _id: id })
    ?.populate("attendees", { password: 0 });
  if (!event) {
    throw new Error("event find  fail");
  }
  return event;
};
export const eventServices = {
  createEventServices,
  getEventServices,
  deleteEventServices,
  getEventByIdServices,
  updateEventServices,
  addEventAttedenceServices,
};
