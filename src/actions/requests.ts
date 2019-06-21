import { Dispatch } from "redux";
import { createStandardAction } from 'typesafe-actions';
import {
  getRepository,
} from "../api";
import { Repositories } from "../interfaces";

export const getRepositoriesPending = createStandardAction('GET_REPOSITORIES_REQUEST')<void>();
export const getRepositoriesSuccess = createStandardAction('GET_REPOSITORIES_SUCCESS')<Repositories>();
export const getRepositoriesError = createStandardAction('GET_REPOSITORIES_ERROR')<string>();


export function getRepositories(subject: string) {
  return (dispatch: Dispatch<any>) => {
    dispatch(getRepositoriesPending());
    return getRepository(subject)
      .then(results => {
        dispatch(getRepositoriesSuccess(results));
      })
      .catch((error: Error) => {
        dispatch(getRepositoriesError(error.message));
        throw error;
      });
  };
}
