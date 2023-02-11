import addressRepository, { CreateAddressParams } from "@/repositories/address-repository";
import enrollmentRepository, { CreateEnrollmentParams } from "@/repositories/enrollment-repository";
import { notFoundError } from "@/errors";
import { exclude } from "@/utils/prisma-utils";
import { getAddress } from "@/utils/cep-utils";
import { AddressEnrollment } from "@/protocols";
import { Address, Enrollment } from "@prisma/client";

async function getAddressFromCEP(cep: string): Promise<AddressEnrollment> {
  const result = await getAddress(cep);

  if (!result) {
    throw notFoundError(); 
  }

  const {
    bairro,
    localidade,
    uf,
    complemento,
    logradouro
  } = result;

  const address = {
    bairro,
    cidade: localidade,
    uf,
    complemento,
    logradouro
  };

  return address;
}

async function getOneWithAddressByUserId(user_id: string): Promise<GetOneWithAddressByUserIdResult> {
  const enrollmentWithAddress = await enrollmentRepository.findWithAddressByUserId(user_id);

  if (!enrollmentWithAddress) throw notFoundError();

  const firstAddress = enrollmentWithAddress.address;
  const address = getFirstAddress(firstAddress);

  return {
    ...exclude(enrollmentWithAddress, "user_id", "created_at", "updated_at", "address"),
    ...(!!address && { address }),
  };
}

type GetOneWithAddressByUserIdResult = Omit<Enrollment, "user_id" | "created_at" | "updated_at">;

function getFirstAddress(firstAddress: Address): GetAddressResult {
  if (!firstAddress) return null;

  return exclude(firstAddress, "created_at", "updated_at", "enrollment_id");
}

type GetAddressResult = Omit<Address, "created_at" | "updated_at" | "enrollment_id">;

async function createOrUpdateEnrollmentWithAddress(params: CreateOrUpdateEnrollmentWithAddress) {
  const enrollment = exclude(params, "address");
  const address = getAddressForUpsert(params.address);

  const result = await getAddressFromCEP(address.cep);
  if (result.error) {
    throw notFoundError();
  }

  const newEnrollment = await enrollmentRepository.upsert(params.user_id, enrollment, exclude(enrollment, "user_id"));
 
  return await addressRepository.upsert(newEnrollment.id, address, address);
}

function getAddressForUpsert(address: CreateAddressParams) {
  return {
    ...address,
    ...(address?.addressDetail && { addressDetail: address.addressDetail }),
  };
}

export type CreateOrUpdateEnrollmentWithAddress = CreateEnrollmentParams & {
  address: CreateAddressParams;
};

const enrollmentsService = {
  getOneWithAddressByUserId,
  createOrUpdateEnrollmentWithAddress,
  getAddressFromCEP
};

export default enrollmentsService;