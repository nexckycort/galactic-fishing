type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
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
    response: Response,
  ): Promise<ApiResponse<T>> {
    const statusCode = response.status;
    if (![200, 201].includes(statusCode)) {
      console.log(`Request failed with status code ${statusCode}`);
    }
    const data = await response.json();

    return {
      data: data as T,
      statusCode,
    };
  }

  private async makeRequest<T>(
    path: string,
    method: HttpMethod,
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    data?: any,
  ): Promise<ApiResponse<T>> {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.token}`,
    };

    const requestOptions: RequestInit = {
      method,
      headers,
      body: data ? JSON.stringify(data) : undefined,
    };

    const response = await fetch(`${this.urlApi}${path}`, requestOptions);
    return this.handlerResponse<T>(response);
  }

  post<T, D = unknown>(path: string, data?: D): Promise<ApiResponse<T>> {
    return this.makeRequest<T>(path, 'POST', data);
  }
}
