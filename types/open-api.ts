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

export enum PlaceStatus {
  Incomplete = "Incomplete",
  Unpublished = "Unpublished",
  Published = "Published",
}

export enum CoupleSide {
  Groom = "Groom",
  Bride = "Bride",
}

export enum SearchFilter {
  MyPick = "MyPick",
  MyFavourite = "MyFavourite",
  OnSale = "onSale",
}

export enum WeddingSteps {
  Host = "Host",
  Dress = "Dress",
  Photographer = "Photographer",
  Decorator = "Decorator",
  Catering = "Catering",
  DancingCourse = "DancingCourse",
  Dj = "Dj",
  MakeUpArtist = "MakeUpArtist",
  Car = "Car",
  Giveaways = "Giveaways",
  Aarada = "Aarada",
  MusiciansAndPerformers = "MusiciansAndPerformers",
  Jewelry = "Jewelry",
  Perfumes = "Perfumes",
  Hammam = "Hammam",
  CosmeticClinics = "CosmeticClinics",
  Fireworks = "Fireworks",
  Extra = "Extra",
}

export interface PlacePriceRange {
  min: string;
  max: string;
}

export interface PlacePrice {
  priceRange: PlacePriceRange;
  currency: string;
}

export interface PlacesDto {
  step: WeddingSteps;
  mainPhoto: SearchFilter;
  id: number;
  name?: string | null;
  formattedAddress?: string | null;
  picked: boolean;
  favourite: boolean;
  price: PlacePrice;
}

export interface PlacesViewModel {
  places: PlacesDto[];
  filter?: "MyPick" | "MyFavourite" | "onSale";
}

export interface PlaceDetailsDto {
  step: WeddingSteps;
  id: number;
  name: string;
  address?: string;
  website?: string;
  facebook?: string;
  tiktok?: string;
  instagram?: string;
  phoneNumber: string;
  price: PlacePrice;
  currency: string;
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

export interface DeleteGuestRequest {
  id: number;
}

export interface ExchangeTokenDto {
  id: number;
  accessToken: string;
  refreshToken: string;
}

export interface NumRangeDto {
  min: string;
  max: string;
}

export interface CreatePlaceInfo {
  name: string;
  phoneNumber: string;
  facebook?: string;
  instagram?: string;
  tiktok?: string;
  website?: string;
  priceRange: NumRangeDto;
}

export interface CreatePlaceLocation {
  streetName: string;
  city: string;
  country: string;
  postalCode: string;
  lat?: number;
  lng?: number;
  googleId?: string;
}

export interface CreatePlaceRequest {
  type: WeddingSteps;
  placeInfo: CreatePlaceInfo;
  description?: string;
  location?: CreatePlaceLocation;
}

export interface CreatePlaceDto {
  id: number;
}

export interface VendorPlaceDto {
  status: PlaceStatus;
  id: number;
  name: string;
  streetName?: string;
  prices: PlacePrice;
  thumbnail: string;
}

export interface VendorPlaceViewModel {
  result: VendorPlaceDto[];
}

export interface PublishPlaceRequest {
  status: PlaceStatus;
  placeId: number;
}

export interface VendorPlaceDetailsDto {
  status: PlaceStatus;
  id: number;
  name: string;
  streetName?: string;
  phoneNumber: string;
  facebook?: string;
  instagram?: string;
  tiktok?: string;
  website?: string;
  placePrice: PlacePrice;
  mainPhoto: string;
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
     * @request GET:/api/planner/getPlaces
     */
    plannerControllerGetPlaces: (
      query: {
        step:
          | "Host"
          | "Dress"
          | "Photographer"
          | "Decorator"
          | "Catering"
          | "DancingCourse"
          | "Dj"
          | "MakeUpArtist"
          | "Car"
          | "Giveaways"
          | "Aarada"
          | "MusiciansAndPerformers"
          | "Jewelry"
          | "Perfumes"
          | "Hammam"
          | "CosmeticClinics"
          | "Fireworks"
          | "Extra";
        search?: string;
        filter?: "MyPick" | "MyFavourite" | "onSale";
      },
      params: RequestParams = {},
    ) =>
      this.request<PlacesViewModel, any>({
        path: `/api/planner/getPlaces`,
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
     * @request GET:/api/planner/getPlaceById
     */
    plannerControllerGetPlaceById: (
      query: {
        placeId: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<PlaceDetailsDto, any>({
        path: `/api/planner/getPlaceById`,
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
     * @request GET:/api/planner/getSteps
     */
    plannerControllerGetSteps: (params: RequestParams = {}) =>
      this.request<StepsViewModel, any>({
        path: `/api/planner/getSteps`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Planner
     * @name PlannerControllerUpdatePlaceDetails
     * @request POST:/api/planner/updatePlaceDetails
     */
    plannerControllerUpdatePlaceDetails: (
      data: PlaceDetailsRequest,
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/api/planner/updatePlaceDetails`,
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
     * @request GET:/api/planner/getWeddingDate
     */
    plannerControllerGetWeddingDate: (params: RequestParams = {}) =>
      this.request<WeddingDateDto, any>({
        path: `/api/planner/getWeddingDate`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Planner
     * @name PlannerControllerUpdateWeddingDate
     * @request POST:/api/planner/updateWeddingDate
     */
    plannerControllerUpdateWeddingDate: (
      data: UpdateDateRequest,
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/api/planner/updateWeddingDate`,
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
     * @request GET:/api/planner/getChecklist
     */
    plannerControllerGetChecklist: (params: RequestParams = {}) =>
      this.request<ChecklistViewModel, any>({
        path: `/api/planner/getChecklist`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Photos
     * @name PhotosControllerUploadFile
     * @request POST:/api/photos/upload
     */
    photosControllerUploadFile: (data: any, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/photos/upload`,
        method: "POST",
        body: data,
        type: ContentType.FormData,
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

    /**
     * No description
     *
     * @tags Guests
     * @name GuestsControllerDeleteGuest
     * @request POST:/api/guests/deleteGuest
     */
    guestsControllerDeleteGuest: (
      data: DeleteGuestRequest,
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/api/guests/deleteGuest`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Auth
     * @name AuthControllerRefreshToken
     * @request POST:/api/auth/refresh
     */
    authControllerRefreshToken: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/auth/refresh`,
        method: "POST",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Auth
     * @name AuthControllerSignOut
     * @request POST:/api/auth/signout
     */
    authControllerSignOut: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/auth/signout`,
        method: "POST",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Auth
     * @name AuthControllerGoogleLogin
     * @request GET:/api/auth/google/login
     */
    authControllerGoogleLogin: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/auth/google/login`,
        method: "GET",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Auth
     * @name AuthControllerGoogleCallback
     * @request GET:/api/auth/google/callback
     */
    authControllerGoogleCallback: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/auth/google/callback`,
        method: "GET",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Auth
     * @name AuthControllerExchangeToken
     * @request POST:/api/auth/exchangeToken
     */
    authControllerExchangeToken: (params: RequestParams = {}) =>
      this.request<ExchangeTokenDto, any>({
        path: `/api/auth/exchangeToken`,
        method: "POST",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Places
     * @name PlacesControllerCreatePlace
     * @request POST:/api/places/create
     */
    placesControllerCreatePlace: (
      data: CreatePlaceRequest,
      params: RequestParams = {},
    ) =>
      this.request<CreatePlaceDto, any>({
        path: `/api/places/create`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Places
     * @name PlacesControllerGetPlaces
     * @request GET:/api/places/getPlaces
     */
    placesControllerGetPlaces: (params: RequestParams = {}) =>
      this.request<VendorPlaceViewModel, any>({
        path: `/api/places/getPlaces`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Places
     * @name PlacesControllerToggleStatus
     * @request POST:/api/places/toggleStatus
     */
    placesControllerToggleStatus: (
      data: PublishPlaceRequest,
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/api/places/toggleStatus`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Places
     * @name PlacesControllerGetPlaceDetails
     * @request GET:/api/places/getPlaceDetails
     */
    placesControllerGetPlaceDetails: (
      query: {
        id: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<VendorPlaceDetailsDto, any>({
        path: `/api/places/getPlaceDetails`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),
  };
}
