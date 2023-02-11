import { prisma } from "@/config";
import { Prisma, PaymentStatus } from "@prisma/client";

async function processPayment(data: Prisma.PaymentUncheckedCreateInput) {
  const payment = await prisma.$transaction([
    prisma.payment.create({ data }),

    prisma.cart.update({
      where: {
        id: data.cart_id,
      },
      data: {
        status: PaymentStatus.PAID,
      }
    })
  ]);
  return payment;
}

const paymentRepository = {
  processPayment
};

export default paymentRepository;