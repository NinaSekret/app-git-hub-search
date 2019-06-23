import { Repositories } from "./interfaces";

const requestUrl =
  "https://api.github.com/search/repositories?q=";

function checkStatus(response: Response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  throw new Error("Server error: " + response.statusText);
}

function request<R extends object>(
  url: string,
  method: string,
  body?: object
): Promise<R> {
  const options: any = {
    method
  };

  if (body) {
    options.body = JSON.stringify(body);
  }

  return fetch(requestUrl + url, options)
    .then(checkStatus)
    .then(response => response.json());
}

export function getRepository(subject: string, page: number) {
  return request<Repositories>(`${subject}&page=${page}`, "GET");
}
