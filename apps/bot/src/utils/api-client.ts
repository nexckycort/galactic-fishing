import { type Dispatcher, request } from 'undici';

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
type RequestOptions = {
  dispatcher?: Dispatcher;
} & Omit<Dispatcher.RequestOptions, 'origin' | 'path' | 'method'> &
  Partial<Pick<Dispatcher.RequestOptions, 'method'>>;
type ApiResponse<T> = {
  data: T;
  statusCode: number;
};

export class ApiClient {
  private basicHeaders!: Record<string, string>;
  private readonly urlApi!: string;
  private readonly token!: string;

  constructor(urlApi: string, token: string) {
    this.urlApi = urlApi;
    this.token = token;

    this.basicHeaders = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.token}`,
    };
  }

  private async handlerResponse<T>(
    path: string,
    options: RequestOptions,
  ): Promise<ApiResponse<T>> {
    const { statusCode, body } = await request(
      `${this.urlApi}${path}`,
      options,
    );
    if (![200, 201].includes(statusCode)) {
      throw new Error(`Request failed with status code ${statusCode}`);
    }
    const response = await body.json();

    return {
      data: response as T,
      statusCode,
    };
  }

  private async makeRequest<T>(
    path: string,
    method: HttpMethod,
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    data?: any,
  ): Promise<ApiResponse<T>> {
    const headers = {
      ...this.basicHeaders,
    };

    const requestOptions: RequestOptions = {
      method,
      headers,
      body: JSON.stringify(data),
    };

    return this.handlerResponse<T>(path, requestOptions);
  }

  post<T, D = unknown>(path: string, data?: D): Promise<ApiResponse<T>> {
    return this.makeRequest<T>(path, 'POST', data);
  }
}
