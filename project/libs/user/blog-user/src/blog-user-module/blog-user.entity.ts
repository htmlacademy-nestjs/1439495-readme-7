import { compare, genSalt, hash } from 'bcrypt';
import { Entity } from '@project/shared-core';
import { StorableEntity, User} from '@project/shared-core';
import { SALT_ROUNDS } from './blog-user.constant';

export class BlogUserEntity extends Entity implements StorableEntity<User> {
  public email: string;
  public passwordHash: string;
  public name: string;
  public dateOfRegistry: Date;
  public avatar?: string;

  constructor(user?: User) {
    super();
    this.populate(user);
  }

  public populate(user?: User): void {
    if (! user) {
      return;
    }

    this.id = user.id ?? '';
    this.email = user.email;
    this.name = user.name;
    this.dateOfRegistry = user.dateOfRegistry;
    this.passwordHash = user.passwordHash;
    this.avatar = user.avatar || '';
  }

  public toPOJO(): User {
    return {
      id: this.id,
      email: this.email,
      passwordHash: this.passwordHash,
      name: this.name,
      dateOfRegistry: this.dateOfRegistry,
      avatar: this.avatar
    }
  }

  public async setPassword(password: string): Promise<BlogUserEntity> {
    const salt = await genSalt(SALT_ROUNDS);
    this.passwordHash = await hash(password, salt);
    return this;
  }

  public async comparePassword(password: string): Promise<boolean> {
    return compare(password, this.passwordHash);
  }
}
