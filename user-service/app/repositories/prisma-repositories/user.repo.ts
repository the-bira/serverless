import { RegisterUserDTO } from '../../dtos/register-user.dto';
import { Role } from '../../models/IRole';
import { User } from '../../models/IUser';
import { IUserRepository } from '../user.repo';
import { PrismaService } from './prisma.service';

export class PrismaUserRepository implements IUserRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async register(dto: RegisterUserDTO): Promise<User> {
    return this.prismaService.execute(async (prisma) => {
      const user = await prisma.user.create({
        data: {
          email: dto.email,
          password: dto.password,
          phone: dto.phone,
        },
      });

      return this.mapUser(user);
    });
  }

  private mapUser(user: any): User {
    return {
      id: user.id,
      email: user.email,
      phone: user.phone,
      role: user.role as Role,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }
}