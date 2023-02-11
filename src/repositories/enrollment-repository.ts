
import { prisma } from "@/config";
import { Enrollment } from "@prisma/client";

async function findWithAddressByUserId(user_id: string) {
  return prisma.enrollment.findFirst({
    where: { user_id },
    include: {
      address: true,
    },
  });
}

async function findById(enrollment_id: string) {
  return prisma.enrollment.findFirst({
    where: { id: enrollment_id }
  });
}

async function findByUserId(user_id: string) {
  return prisma.enrollment.findFirst({
    where: { user_id }
  });
}

async function upsert(
  user_id: string,
  createdEnrollment: CreateEnrollmentParams,
  updatedEnrollment: UpdateEnrollmentParams,
) {
  return prisma.enrollment.upsert({
    where: {
      user_id,
    },
    create: createdEnrollment,
    update: updatedEnrollment,
  });
}

export type CreateEnrollmentParams = Omit<Enrollment, "id" | "created_at" | "updated_at">;
export type UpdateEnrollmentParams = Omit<CreateEnrollmentParams, "user_id">;

const enrollmentRepository = {
  findWithAddressByUserId,
  upsert,
  findById,
  findByUserId
};

export default enrollmentRepository;