import request from "supertest";
import { app } from "../../app";
import { Ticket } from "../../models/ticket";
import { Order, OrderStatus } from "../../models/order";
import { natsWrapper } from "../../nats-wrapper";

it("marks an order as cancelled", async () => {
  //create a ticket
  const ticket = Ticket.build({
    title: "concert",
    price: 20,
  });

  await ticket.save();

  const userCookie = global.signin();
  const { body: order } = await request(app)
    .post("/api/orders")
    .set("Cookie", userCookie)
    .send({ ticketId: ticket.id })
    .expect(201);

  const { body: fetchedOrder } = await request(app)
    .delete(`/api/orders/${order.id}`)
    .set("Cookie", userCookie)
    .send()
    .expect(204);

  const cancelledOrder = await Order.findById(order.id);
  expect(cancelledOrder!.status).toEqual(OrderStatus.Cancelled);
});

it("emits an order cancelled event", async () => {
  //create a ticket
  const ticket = Ticket.build({
    title: "concert",
    price: 20,
  });

  await ticket.save();

  const userCookie = global.signin();
  const { body: order } = await request(app)
    .post("/api/orders")
    .set("Cookie", userCookie)
    .send({ ticketId: ticket.id })
    .expect(201);

  const { body: fetchedOrder } = await request(app)
    .delete(`/api/orders/${order.id}`)
    .set("Cookie", userCookie)
    .send()
    .expect(204);

  const cancelledOrder = await Order.findById(order.id);
  expect(cancelledOrder!.status).toEqual(OrderStatus.Cancelled);
  expect(natsWrapper.client.publish).toHaveBeenCalled();
});
