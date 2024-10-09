import { faker } from "@faker-js/faker";

export { faker as sample };

export function random(min: number, max: number) {
  return faker.number.int({ min, max });
}

export function range(size: number) {
  return Array.from({ length: size }, (_, index) => index);
}

export function repeat<T>(size: number, func: () => T) {
  return range(size).map(func);
}

export function selectOne<T>(arr: T[]) {
  return faker.helpers.arrayElement(arr);
}

export function select<T>(arr: T[], min: number, max: number) {
  return faker.helpers.arrayElements(arr, { min, max });
}

/* eslint-disable no-promise-executor-return */
export function delay<T>(ms: number, func: () => T) {
  return () => new Promise((resolve) => setTimeout(resolve, ms)).then(func);
}
