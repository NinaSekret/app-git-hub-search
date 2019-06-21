import { Repository } from "../interfaces";
import * as actions from "../actions/requests";

import { getType, ActionType } from "typesafe-actions";

type IAction = ActionType<typeof actions>;

type IInitialState = {
  repositories: Repository[];
  total_count: number;
  isloading: boolean;
  error: string | null;
};

const initialState: IInitialState = {
  repositories: [],
  total_count: 0,
  isloading: false,
  error: null
};

export default function reducer(
  state: IInitialState = initialState,
  action: IAction
): IInitialState {
  switch (action.type) {
    case getType(actions.getRepositoriesPending):
      return { ...state, isloading: true };
    case getType(actions.getRepositoriesSuccess):
      return {
        ...state, total_count: action.payload.total_count,
        repositories: action.payload.items.map((item: Repository) => {
          return {
            id: item.id,
            name: item.name,
            html_url: item.html_url,
            stargazers_count: item.stargazers_count,
            watchers: item.watchers
          }
        }),
        isloading: true,
      };
    case getType(actions.getRepositoriesError):
      return { ...state, isloading: false, error: action.payload };
    default:
      return state;
  }
}
