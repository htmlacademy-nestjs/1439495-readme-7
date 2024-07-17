import { Entity } from '@project/shared-core';
import { StorableEntity, User} from '@project/shared-core';

export class BlogUserEntity extends Entity implements StorableEntity<User> {
  public email: string;
  public passwordHash: string;
  public name: string;
  public dateOfRegistry: Date;

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
  }

  public toPOJO(): User {
    return {
      id: this.id,
      email: this.email,
      passwordHash: this.passwordHash,
      name: this.name,
      dateOfRegistry: this.dateOfRegistry
    }
  }
}
