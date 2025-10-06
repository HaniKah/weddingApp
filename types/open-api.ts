/* eslint-disable */
/* tslint:disable */
// @ts-nocheck
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export enum CoupleSide {
  Groom = "Groom",
  Bride = "Bride",
}

export enum WeddingSteps {
  Date = "Date",
  Host = "Host",
  Dress = "Dress",
  Photographer = "Photographer",
  Dj = "Dj",
  MakeUpArtist = "MakeUpArtist",
  Decorator = "Decorator",
  Catering = "Catering",
  Coordinator = "Coordinator",
  DancingCourse = "DancingCourse",
  Aarada = "Aarada",
  Car = "Car",
  HotelAfterWedding = "HotelAfterWedding",
  Giveaways = "Giveaways",
  MusiciansAndPerformers = "MusiciansAndPerformers",
  Jewelry = "Jewelry",
  Perfumes = "Perfumes",
  Hammam = "Hammam",
  CosmeticClinics = "CosmeticClinics",
  ExtraDecorations = "ExtraDecorations",
}

export interface PlacesDto {
  step: WeddingSteps;
  id: number;
  name?: string | null;
  formattedAddress?: string | null;
}

export interface PlacesViewModel {
  places: PlacesDto[];
}

export interface PlaceDetailsDto {
  step: WeddingSteps;
  id: number;
  name: string;
  address: string | null;
  website: string | null;
  facebook: string | null;
  tiktok: string | null;
  instagram: string | null;
  phoneNumber: string | null;
  minCost: number | null;
  maxCost: number | null;
  cost: number | null;
  picked: boolean;
  favourite: boolean;
  notes: string | null;
}

export interface StepsDto {
  step: WeddingSteps;
  isCompleted: boolean;
  note: string;
  title: string;
  description: string;
}

export interface StepsViewModel {
  progress: number;
  steps: StepsDto[];
}

export interface PlaceDetailsRequest {
  step: WeddingSteps;
  placeId: number;
  cost: number | null;
  notes: string | null;
  favorite: boolean;
  picked: boolean;
}

export interface WeddingDateDto {
  date: string;
}

export interface UpdateDateRequest {
  date: string;
}

export interface ChecklistDto {
  step: WeddingSteps;
  isCompleted: boolean;
  placeName: string | null;
  placeId: number | null;
  cost: number | null;
}

export interface ChecklistViewModel {
  list: ChecklistDto[];
}

export interface GuestsDto {
  coupleSide: CoupleSide;
  id: number;
  name: string;
  phoneNumber: string;
  isInvited: boolean;
}

export interface GuestsViewModel {
  result: GuestsDto[];
}

export interface AddGuestRequest {
  coupleSide: CoupleSide;
  name: string;
  phoneNumber: string;
}

export interface UpdateGuestRequest {
  coupleSide?: CoupleSide;
  id: number;
  name?: string;
  phoneNumber?: string;
}

import type {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  HeadersDefaults,
  ResponseType,
} from "axios";
import axios from "axios";

export type QueryParamsType = Record<string | number, any>;

export interface FullRequestParams
  extends Omit<AxiosRequestConfig, "data" | "params" | "url" | "responseType"> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseType;
  /** request body */
  body?: unknown;
}

export type RequestParams = Omit<
  FullRequestParams,
  "body" | "method" | "query" | "path"
>;

export interface ApiConfig<SecurityDataType = unknown>
  extends Omit<AxiosRequestConfig, "data" | "cancelToken"> {
  securityWorker?: (
    securityData: SecurityDataType | null,
  ) => Promise<AxiosRequestConfig | void> | AxiosRequestConfig | void;
  secure?: boolean;
  format?: ResponseType;
}

export enum ContentType {
  Json = "application/json",
  JsonApi = "application/vnd.api+json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
  Text = "text/plain",
}

export class HttpClient<SecurityDataType = unknown> {
  public instance: AxiosInstance;
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>["securityWorker"];
  private secure?: boolean;
  private format?: ResponseType;

  constructor({
    securityWorker,
    secure,
    format,
    ...axiosConfig
  }: ApiConfig<SecurityDataType> = {}) {
    this.instance = axios.create({
      ...axiosConfig,
      baseURL: axiosConfig.baseURL || "",
    });
    this.secure = secure;
    this.format = format;
    this.securityWorker = securityWorker;
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  protected mergeRequestParams(
    params1: AxiosRequestConfig,
    params2?: AxiosRequestConfig,
  ): AxiosRequestConfig {
    const method = params1.method || (params2 && params2.method);

    return {
      ...this.instance.defaults,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...((method &&
          this.instance.defaults.headers[
            method.toLowerCase() as keyof HeadersDefaults
          ]) ||
          {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  protected stringifyFormItem(formItem: unknown) {
    if (typeof formItem === "object" && formItem !== null) {
      return JSON.stringify(formItem);
    } else {
      return `${formItem}`;
    }
  }

  protected createFormData(input: Record<string, unknown>): FormData {
    if (input instanceof FormData) {
      return input;
    }
    return Object.keys(input || {}).reduce((formData, key) => {
      const property = input[key];
      const propertyContent: any[] =
        property instanceof Array ? property : [property];

      for (const formItem of propertyContent) {
        const isFileType = formItem instanceof Blob || formItem instanceof File;
        formData.append(
          key,
          isFileType ? formItem : this.stringifyFormItem(formItem),
        );
      }

      return formData;
    }, new FormData());
  }

  public request = async <T = any, _E = any>({
    secure,
    path,
    type,
    query,
    format,
    body,
    ...params
  }: FullRequestParams): Promise<AxiosResponse<T>> => {
    const secureParams =
      ((typeof secure === "boolean" ? secure : this.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const responseFormat = format || this.format || undefined;

    if (
      type === ContentType.FormData &&
      body &&
      body !== null &&
      typeof body === "object"
    ) {
      body = this.createFormData(body as Record<string, unknown>);
    }

    if (
      type === ContentType.Text &&
      body &&
      body !== null &&
      typeof body !== "string"
    ) {
      body = JSON.stringify(body);
    }

    return this.instance.request({
      ...requestParams,
      headers: {
        ...(requestParams.headers || {}),
        ...(type ? { "Content-Type": type } : {}),
      },
      params: query,
      responseType: responseFormat,
      data: body,
      url: path,
    });
  };
}

/**
 * @title Wedding Planner
 * @version 1.0
 * @contact
 *
 * this is the Open Api docs for the wedding planner
 */
export class Api<
  SecurityDataType extends unknown,
> extends HttpClient<SecurityDataType> {
  api = {
    /**
     * No description
     *
     * @tags App
     * @name AppControllerGetHello
     * @request GET:/api
     */
    appControllerGetHello: (params: RequestParams = {}) =>
      this.request<string, any>({
        path: `/api`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Planner
     * @name PlannerControllerGetPlaces
     * @request GET:/api/places/getPlaces
     */
    plannerControllerGetPlaces: (
      query: {
        step: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<PlacesViewModel, any>({
        path: `/api/places/getPlaces`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Planner
     * @name PlannerControllerGetPlaceById
     * @request GET:/api/places/getPlaceById
     */
    plannerControllerGetPlaceById: (
      query: {
        placeId: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<PlaceDetailsDto, any>({
        path: `/api/places/getPlaceById`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Planner
     * @name PlannerControllerGetSteps
     * @request GET:/api/places/getSteps
     */
    plannerControllerGetSteps: (params: RequestParams = {}) =>
      this.request<StepsViewModel, any>({
        path: `/api/places/getSteps`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Planner
     * @name PlannerControllerUpdatePlaceDetails
     * @request POST:/api/places/updatePlaceDetails
     */
    plannerControllerUpdatePlaceDetails: (
      data: PlaceDetailsRequest,
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/api/places/updatePlaceDetails`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Planner
     * @name PlannerControllerGetWeddingDate
     * @request GET:/api/places/getWeddingDate
     */
    plannerControllerGetWeddingDate: (params: RequestParams = {}) =>
      this.request<WeddingDateDto, any>({
        path: `/api/places/getWeddingDate`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Planner
     * @name PlannerControllerUpdateWeddingDate
     * @request POST:/api/places/updateWeddingDate
     */
    plannerControllerUpdateWeddingDate: (
      data: UpdateDateRequest,
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/api/places/updateWeddingDate`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Planner
     * @name PlannerControllerGetChecklist
     * @request GET:/api/places/getChecklist
     */
    plannerControllerGetChecklist: (params: RequestParams = {}) =>
      this.request<ChecklistViewModel, any>({
        path: `/api/places/getChecklist`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Guests
     * @name GuestsControllerGetGuests
     * @request GET:/api/guests/getGuests
     */
    guestsControllerGetGuests: (params: RequestParams = {}) =>
      this.request<GuestsViewModel, any>({
        path: `/api/guests/getGuests`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Guests
     * @name GuestsControllerAddGuest
     * @request POST:/api/guests/addGuest
     */
    guestsControllerAddGuest: (
      data: AddGuestRequest,
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/api/guests/addGuest`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Guests
     * @name GuestsControllerUpdateGuest
     * @request POST:/api/guests/updateGuest
     */
    guestsControllerUpdateGuest: (
      data: UpdateGuestRequest,
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/api/guests/updateGuest`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        ...params,
      }),
  };
}
