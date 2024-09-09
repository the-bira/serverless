import { PrismaService } from '../repositories/prisma-repositories/prisma.service';

export const instanceOfPrismaService = (): PrismaService => {
  return new PrismaService();
}