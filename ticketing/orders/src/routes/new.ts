import express, { Request, Response } from "express";
import { requireAuth, validateRequest, NotFoundError } from "@mftickets/common";
import { body } from "express-validator";
import mongoose from "mongoose";
import { Ticket } from "../models/ticket";
import { Order } from "../models/order";

const router = express.Router();

router.post(
  "/api/orders",
  requireAuth,
  [
    body("ticketId")
      .not()
      .isEmpty()
      .custom((input: string) => mongoose.Types.ObjectId.isValid(input))
      .withMessage("TicketId must be provided"),
  ],
  validateRequest,
  async (request: Request, response: Response) => {
    const { ticketId } = request.body;

    const ticket = await Ticket.findOne({ id: ticketId });

    if (!ticket) {
      throw new NotFoundError();
    }
    response.send({});
  }
);

export { router as newOrderRouter };
