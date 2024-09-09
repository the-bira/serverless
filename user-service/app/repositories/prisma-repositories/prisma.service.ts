import { PrismaClient } from '@prisma/client';

export class PrismaService {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async execute<T>(action: (prisma: PrismaClient) => Promise<T>): Promise<T> {
    try {
      return await action(this.prisma);
    } finally {
      await this.prisma.$disconnect();
    }
  }
}
