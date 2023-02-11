import { prisma } from "@/config";
import { Address } from "@prisma/client";

async function upsert(enrollment_id: string, createdAddress: CreateAddressParams, updatedAddress: UpdateAddressParams) {
  return prisma.address.upsert({
    where: {
      enrollment_id,
    },
    create: {
      ...createdAddress,
      enrollment: { connect: { id: enrollment_id } },
    },
    update: updatedAddress,
  });
}

export type CreateAddressParams = Omit<Address, "id" | "created_at" | "updated_at" | "enrollment_id">;
export type UpdateAddressParams = CreateAddressParams;

const addressRepository = {
  upsert,
};

export default addressRepository;