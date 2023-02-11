import { prisma } from "@/config";
import { Prisma } from "@prisma/client";

async function create(data: Prisma.SessionUncheckedCreateInput) {
  return prisma.session.create({
    data,
  });
}

async function deleteByToken(token: string) {
  return prisma.session.delete({
    where: {
      token
    }
  });
}

const sessionRepository = {
  create,
  deleteByToken
};

export default sessionRepository;