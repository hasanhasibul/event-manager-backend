import { RequestHandler } from "express";
import { StatusCodes } from "http-status-codes";
import { eventInterface } from "./event.interface";
import { eventServices } from "./event.services";
const createEventController: RequestHandler = async (req, res, next) => {
  try {
    const reqBody: eventInterface = {
      description: req?.body?.description,
      end_time: req?.body?.end_time,
      location: req?.body?.location,
      start_time: req?.body?.start_time,
      title: req?.body?.title,
      user: req?.user?._id,
    };
    await eventServices?.createEventServices(reqBody);
    res.send({
      success: true,
      statusCode: StatusCodes.CREATED,
      message: "Event created successfully",
    });
  } catch (error) {
    next(error);
  }
};

const getEventController: RequestHandler = async (req, res, next) => {
  try {
    const events = await eventServices.getEventServices(req);
    res.send({
      success: true,
      statusCode: StatusCodes.OK,
      message: "Event retrieved successfully",
      data: events,
    });
  } catch (error) {
    next(error);
  }
};

const deleteEventController: RequestHandler = async (req, res, next) => {
  try {
    await eventServices.deleteEventServices(req);
    res.send({
      success: true,
      statusCode: StatusCodes.OK,
      message: "Event deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};
const getEventByIdController: RequestHandler = async (req, res, next) => {
  try {
    const data = await eventServices.getEventByIdServices(req);
    res.send({
      success: true,
      statusCode: StatusCodes.OK,
      message: "event retrieved successfully",
      data: data,
    });
  } catch (error) {
    next(error);
  }
};
const EventUpdateByIdController: RequestHandler = async (req, res, next) => {
  try {
    await eventServices.updateEventServices(req);
    res.send({
      success: true,
      statusCode: StatusCodes.OK,
      message: "event update successfully",
    });
  } catch (error) {
    next(error);
  }
};
const AddEventAttendenceByIdController: RequestHandler = async (
  req,
  res,
  next
) => {
  try {
    await eventServices.addEventAttedenceServices(req);
    res.send({
      success: true,
      statusCode: StatusCodes.OK,
      message: "Cograsstulations you are ready to attend ",
    });
  } catch (error) {
    next(error);
  }
};

export const eventController = {
  createEventController,
  getEventController,
  deleteEventController,
  getEventByIdController,
  EventUpdateByIdController,
  AddEventAttendenceByIdController,
};
