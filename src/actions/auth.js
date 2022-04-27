import { types } from '../types/types';

/**
 *
 * @param {String} uid
 * @param {String} displayName
 * @returns Object
 */
export const login = (uid, displayName) => {
  return {
    type: types.login,
    payload: {
      uid,
      displayName,
    },
  };
};
