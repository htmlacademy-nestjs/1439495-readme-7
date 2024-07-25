export const REGISTER_USER_CONFLICT = 'User with this email is already exist';
export const AUTH_USER_INVALID = 'Email or password incorrect';
export const USER_NOT_FOUND = 'User with this ID not found';

export const AuthenticationResponseMessage = {
  LoggedSuccess: 'User has been successfully logged.',
  LoggedError: 'Password or Login is wrong.',
  UserFound: 'User found',
  UserNotFound: 'User not found',
  UserExist: 'User with this email is already exists',
  UserCreated: 'The new user has been successfully created.',
} as const;
