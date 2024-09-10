import { RegisterUserDTO } from '../../dtos/user/register-user.dto';
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

      const mappedUser = this.mapUser(user);
      
      delete mappedUser.password;
      delete mappedUser.salt;

      return mappedUser;

    });
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.prismaService.execute(async (prisma) => {
      const user = await prisma.user.findUnique({
        where: { email },
      });

      if (!user) {
        return null;
      }

      return this.mapUser(user);
    });
  }

  private mapUser(user: any): User {
    return {
      id: user.id,
      email: user.email,
      phone: user.phone,
      password: user.password,
      salt: user.salt,
      role: user.role as Role,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }
}