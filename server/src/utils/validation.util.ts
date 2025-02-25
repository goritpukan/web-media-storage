import { ValidationOptions } from 'class-validator';

export function createRegex(...regexes: string[]) {
  return new RegExp('^[' + regexes.join('') + ']+$');
}

export const validationMessages = {
  cannotBeEmpty: (entity: string, each?: boolean) =>
    validationOptionsMsg(
      `${each ? 'Elements of ' : ''}${entity} cannot be empty`,
      each,
    ),
  mustBeType: (entity: string, type: string, each?: boolean) =>
    validationOptionsMsg(
      `${each ? 'Each elements of ' : ''}${entity} must be ${type}`,
      each,
    ),
};

export function validationOptionsMsg(
  message: string,
  each?: boolean,
): ValidationOptions {
  return { message, each };
}
