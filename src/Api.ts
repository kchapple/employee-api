/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface Employee {
  /**
   * @format uuid
   * @example d290f1ee-6c54-4b01-90e6-d701748f0851
   */
  id?: string;

  /** @example Abhishek */
  name: string;

  /** @example 145000 */
  salary: string;

  /** @example USD */
  currency: string;

  /** @example Engineering */
  department: string;

  /** @example Platform */
  sub_department: string;

  /** @example true */
  on_contract?: string;
}

export interface ComboStatistics {
  /** @example Banking */
  department: string;
  departmentStatistics: object;
}

export interface DepartmentStatistics {
  /** @example Engineering */
  department: string;
  summaryStatistics: SummaryStatistics[];
}

export interface ErrorResponse {
  /** @example 400 */
  status: number;

  /** @example Your request could not be completed because of incomplete data */
  message: string;
}

export interface SummaryStatistics {
  /** @example 90000 */
  mean: number;

  /** @example 37000 */
  min: number;

  /** @example 2000000 */
  max: number;
}

export type QueryParamsType = Record<string | number, any>;
export type ResponseFormat = keyof Omit<Body, 'body' | 'bodyUsed'>;

export interface FullRequestParams extends Omit<RequestInit, 'body'> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: 'json') */
  format?: ResponseFormat;
  /** request body */
  body?: unknown;
  /** base url */
  baseUrl?: string;
  /** request cancellation token */
  cancelToken?: CancelToken;
}

export type RequestParams = Omit<FullRequestParams, 'body' | 'method' | 'query' | 'path'>;

export interface ApiConfig<SecurityDataType = unknown> {
  baseUrl?: string;
  baseApiParams?: Omit<RequestParams, 'baseUrl' | 'cancelToken' | 'signal'>;
  securityWorker?: (securityData: SecurityDataType | null) => Promise<RequestParams | void> | RequestParams | void;
  customFetch?: typeof fetch;
}

export interface HttpResponse<D extends unknown, E extends unknown = unknown> extends Response {
  data: D;
  error: E;
}

type CancelToken = Symbol | string | number;

export enum ContentType {
  Json = 'application/json',
  FormData = 'multipart/form-data',
  UrlEncoded = 'application/x-www-form-urlencoded',
}

export class HttpClient<SecurityDataType = unknown> {
  public baseUrl: string = 'https://virtserver.swaggerhub.com/kchapple/Employees/1.0.0';
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>['securityWorker'];
  private abortControllers = new Map<CancelToken, AbortController>();
  private customFetch = (...fetchParams: Parameters<typeof fetch>) => fetch(...fetchParams);

  private baseApiParams: RequestParams = {
    credentials: 'same-origin',
    headers: {},
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
  };

  constructor(apiConfig: ApiConfig<SecurityDataType> = {}) {
    Object.assign(this, apiConfig);
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  private encodeQueryParam(key: string, value: any) {
    const encodedKey = encodeURIComponent(key);
    return `${encodedKey}=${encodeURIComponent(typeof value === 'number' ? value : `${value}`)}`;
  }

  private addQueryParam(query: QueryParamsType, key: string) {
    return this.encodeQueryParam(key, query[key]);
  }

  private addArrayQueryParam(query: QueryParamsType, key: string) {
    const value = query[key];
    return value.map((v: any) => this.encodeQueryParam(key, v)).join('&');
  }

  protected toQueryString(rawQuery?: QueryParamsType): string {
    const query = rawQuery || {};
    const keys = Object.keys(query).filter((key) => 'undefined' !== typeof query[key]);
    return keys
      .map((key) => (Array.isArray(query[key]) ? this.addArrayQueryParam(query, key) : this.addQueryParam(query, key)))
      .join('&');
  }

  protected addQueryParams(rawQuery?: QueryParamsType): string {
    const queryString = this.toQueryString(rawQuery);
    return queryString ? `?${queryString}` : '';
  }

  private contentFormatters: Record<ContentType, (input: any) => any> = {
    [ContentType.Json]: (input: any) =>
      input !== null && (typeof input === 'object' || typeof input === 'string') ? JSON.stringify(input) : input,
    [ContentType.FormData]: (input: any) =>
      Object.keys(input || {}).reduce((formData, key) => {
        const property = input[key];
        formData.append(
          key,
          property instanceof Blob
            ? property
            : typeof property === 'object' && property !== null
            ? JSON.stringify(property)
            : `${property}`,
        );
        return formData;
      }, new FormData()),
    [ContentType.UrlEncoded]: (input: any) => this.toQueryString(input),
  };

  private mergeRequestParams(params1: RequestParams, params2?: RequestParams): RequestParams {
    return {
      ...this.baseApiParams,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...(this.baseApiParams.headers || {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  private createAbortSignal = (cancelToken: CancelToken): AbortSignal | undefined => {
    if (this.abortControllers.has(cancelToken)) {
      const abortController = this.abortControllers.get(cancelToken);
      if (abortController) {
        return abortController.signal;
      }
      return void 0;
    }

    const abortController = new AbortController();
    this.abortControllers.set(cancelToken, abortController);
    return abortController.signal;
  };

  public abortRequest = (cancelToken: CancelToken) => {
    const abortController = this.abortControllers.get(cancelToken);

    if (abortController) {
      abortController.abort();
      this.abortControllers.delete(cancelToken);
    }
  };

  public request = async <T = any, E = any>({
    body,
    secure,
    path,
    type,
    query,
    format,
    baseUrl,
    cancelToken,
    ...params
  }: FullRequestParams): Promise<HttpResponse<T, E>> => {
    const secureParams =
      ((typeof secure === 'boolean' ? secure : this.baseApiParams.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const queryString = query && this.toQueryString(query);
    const payloadFormatter = this.contentFormatters[type || ContentType.Json];
    const responseFormat = format || requestParams.format;

    return this.customFetch(`${baseUrl || this.baseUrl || ''}${path}${queryString ? `?${queryString}` : ''}`, {
      ...requestParams,
      headers: {
        ...(type && type !== ContentType.FormData ? { 'Content-Type': type } : {}),
        ...(requestParams.headers || {}),
      },
      signal: cancelToken ? this.createAbortSignal(cancelToken) : void 0,
      body: typeof body === 'undefined' || body === null ? null : payloadFormatter(body),
    }).then(async (response) => {
      const r = response as HttpResponse<T, E>;
      r.data = null as unknown as T;
      r.error = null as unknown as E;

      const data = !responseFormat
        ? r
        : await response[responseFormat]()
            .then((data) => {
              if (r.ok) {
                r.data = data;
              } else {
                r.error = data;
              }
              return r;
            })
            .catch((e) => {
              r.error = e;
              return r;
            });

      if (cancelToken) {
        this.abortControllers.delete(cancelToken);
      }

      if (!response.ok) throw data;
      return data;
    });
  };
}

/**
 * @title Employee Stats API
 * @version 1.0.0
 * @license Apache 2.0 (http://www.apache.org/licenses/LICENSE-2.0.html)
 * @baseUrl https://virtserver.swaggerhub.com/kchapple/Employees/1.0.0
 * @contact <ken.chapple@gmail.com>
 *
 * This is an API to calculate salary stats across employees and departments
 */
export class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
  health = {
    /**
     * @description simple get to see if the server is there
     *
     * @name GetHealth
     * @summary get health of sever
     * @request GET:/health
     */
    getHealth: (params: RequestParams = {}) =>
      this.request<{ message?: string }, ErrorResponse>({
        path: `/health`,
        method: 'GET',
        format: 'json',
        ...params,
      }),
  };
  employees = {
    /**
     * @description Gets a list of all employees in the system
     *
     * @name GetAllEmployees
     * @summary get all employees
     * @request GET:/employees
     */
    getAllEmployees: (params: RequestParams = {}) =>
      this.request<Employee[], ErrorResponse>({
        path: `/employees`,
        method: 'GET',
        format: 'json',
        ...params,
      }),
  };
  employee = {
    /**
     * @description Finds an employee by ID
     *
     * @name FindEmployee
     * @summary gets an employee
     * @request GET:/employee/{employeeId}
     */
    findEmployee: (employeeId: string, params: RequestParams = {}) =>
      this.request<Employee, ErrorResponse>({
        path: `/employee/${employeeId}`,
        method: 'GET',
        format: 'json',
        ...params,
      }),

    /**
     * @description Deletes an employee from the system
     *
     * @name DeleteEmployee
     * @summary deletes an employee
     * @request DELETE:/employee/{employeeId}
     */
    deleteEmployee: (employeeId: string, params: RequestParams = {}) =>
      this.request<void, ErrorResponse>({
        path: `/employee/${employeeId}`,
        method: 'DELETE',
        ...params,
      }),

    /**
     * @description Adds an employee to the system
     *
     * @name AddEmployee
     * @summary adds an employee
     * @request POST:/employee
     */
    addEmployee: (data: Employee, params: RequestParams = {}) =>
      this.request<Employee, ErrorResponse>({
        path: `/employee`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),
  };
  statistics = {
    /**
     * @description Retrieve Summary statictics (mean, min, max salary) across all departments
     *
     * @name GetAllSummaryStatistics
     * @summary Retrieve SS across all departments
     * @request GET:/statistics/summary
     */
    getAllSummaryStatistics: (params: RequestParams = {}) =>
      this.request<SummaryStatistics, ErrorResponse>({
        path: `/statistics/summary`,
        method: 'GET',
        format: 'json',
        ...params,
      }),

    /**
     * @description Retrieve Summary statictics (mean, min, max salary) across all departments for employees who are on contract
     *
     * @name GetSummaryStatisticsForOnContract
     * @summary Retrieve SS for on contract employees across all departments
     * @request GET:/statistics/summaryForOnContract
     */
    getSummaryStatisticsForOnContract: (params: RequestParams = {}) =>
      this.request<SummaryStatistics, ErrorResponse>({
        path: `/statistics/summaryForOnContract`,
        method: 'GET',
        format: 'json',
        ...params,
      }),

    /**
     * @description Retrieve Summary statictics (mean, min, max salary) for each department
     *
     * @name GetSummaryStatisticsByDepartment
     * @summary Retrieve SS organized by department
     * @request GET:/statistics/summaryForDepartments
     */
    getSummaryStatisticsByDepartment: (params: RequestParams = {}) =>
      this.request<object, ErrorResponse>({
        path: `/statistics/summaryForDepartments`,
        method: 'GET',
        format: 'json',
        ...params,
      }),

    /**
     * @description Retrieve Summary statictics (mean, min, max salary) for each department's subdepartments
     *
     * @name GetSummaryStatisticsByDepartmentAndSubDeparment
     * @summary Retrieve SS organized by combinations of departments and their sub-departments
     * @request GET:/statistics/summaryForCombinations
     */
    getSummaryStatisticsByDepartmentAndSubDeparment: (params: RequestParams = {}) =>
      this.request<object, ErrorResponse>({
        path: `/statistics/summaryForCombinations`,
        method: 'GET',
        format: 'json',
        ...params,
      }),
  };
}
