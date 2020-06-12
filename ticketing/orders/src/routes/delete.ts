import express, { Request, Response } from "express";
import { Order, OrderStatus } from "../models/order";
import {
  requireAuth,
  NotFoundError,
  NotAuthorizedError,
} from "@mftickets/common";
const router = express.Router();

router.delete(
  "/api/orders/:orderId",
  requireAuth,
  async (request: Request, response: Response) => {
    const orderId = request.params.orderId;
    const order = await Order.findById(orderId);
    if (!order) {
      throw new NotFoundError();
    }

    if (order.userId !== request.currentUser!.id) {
      throw new NotAuthorizedError();
    }

    order.status = OrderStatus.Cancelled;
    await order.save();

    response.status(204).send(order);
  }
);

export { router as deleteOrderRouter };
