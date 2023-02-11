import paymentRepository from "@/repositories/payment-repository";
import enrollmentRepository from "@/repositories/enrollment-repository";
import cartRepository from "@/repositories/cart-repository";

import { unauthorizedError } from "@/errors";

export async function processPayment(user_id: string, params: paymentParams) {
  const enrollment = await enrollmentRepository.findByUserId(user_id);
  const cart = await cartRepository.findByUserId(user_id);
  
  if( !enrollment || !cart ) throw unauthorizedError();

  const paymentData = {
    enrollment_id: enrollment.id,
    cart_id: cart.id,
    value: params.value,
    card_issuer: params.issuer,
    card_last_digits: params.number.toString().slice(-4),
  };

  return await paymentRepository.processPayment(paymentData);
}

type paymentParams = {
  value: number,
  issuer: string;
  number: number;
  name: string;
  expirationDate: Date;
  cvv: number;
};

const paymentService = {
  processPayment
};

export default paymentService;