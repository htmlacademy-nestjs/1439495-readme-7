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
  PasswordChanged: 'The password was succesfully changed.'
} as const;

export const AuthenticationValidateMessage = {
  EmailNotValid: 'The email is not valid',
  NameNotValid: 'The user name is not valid',
  NameMinLength: 'The user name must be at least 3 characters',
  NameMaxLength: 'The user name must be shorter than 50 characters',
  PasswordMinLength: 'The password must be at least 6 characters',
  PasswordMaxLength: 'The password must be shorter than 12 characters'
} as const;
