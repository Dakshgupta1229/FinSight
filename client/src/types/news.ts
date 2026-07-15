export interface NewsItem {
  headline: string;
  summary: string;
  source: string;
  url: string;
  image: string;
  datetime: string;
}

export interface NewsResponse {
  success: boolean;
  data: NewsItem[];
}