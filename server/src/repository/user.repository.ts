import { EntityRepository, Repository } from 'typeorm';
import { User } from '../entity/user.entity';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  public findOneByEmail(email: string): Promise<User | undefined> {
    return this.createQueryBuilder('user')
      .where('user.email = :email', {
        email,
      })
      .getOne();
  }

  public async emailExists(email: string): Promise<boolean> {
    return !!(await this.findOneByEmail(email));
  }
}
