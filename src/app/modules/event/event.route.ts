import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import authMiddleware from "../../middlewares/authMiddleware";
import { authTokeZodSchema } from "../auth/auth.validations";
import { eventController } from "./event.controllers";
import { eventZodSchema } from "./event.validation";

const router = express.Router();

router.post(
  "/create-event",
  validateRequest(authTokeZodSchema),
  validateRequest(eventZodSchema),
  authMiddleware(),
  eventController.createEventController
);
router.get("/events", eventController.getEventController);
router.put(
  "/update-event/:id",
  validateRequest(authTokeZodSchema),
  validateRequest(eventZodSchema),
  authMiddleware(),
  eventController.EventUpdateByIdController
);
router.put(
  "/event-attendece/:id",
  validateRequest(authTokeZodSchema),
  authMiddleware(),
  eventController.AddEventAttendenceByIdController
);
router.get("/event/:id", eventController.getEventByIdController);
router.delete(
  "/event/:id",
  validateRequest(authTokeZodSchema),
  authMiddleware(),
  eventController.deleteEventController
);

export const eventRouter = router;
