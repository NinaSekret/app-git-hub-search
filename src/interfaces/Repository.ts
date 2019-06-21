export interface Repositories {
  total_count: number;
  items: Repository[];
}
export interface Repository {
  id: number;
  name: string;
  html_url: string;
  stargazers_count: number;
  watchers: number;
};
