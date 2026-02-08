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

export enum UpdateStep {
  PickPlaceType = "PickPlaceType",
  FillPlaceInfo = "FillPlaceInfo",
  AddDescription = "AddDescription",
  PickPlaceLocation = "PickPlaceLocation",
  UploadImages = "UploadImages",
}

export enum CountryCode {
  BH = "BH",
  EG = "EG",
  IR = "IR",
  IQ = "IQ",
  JO = "JO",
  KW = "KW",
  LB = "LB",
  OM = "OM",
  PS = "PS",
  QA = "QA",
  SA = "SA",
  SY = "SY",
  TR = "TR",
  AE = "AE",
  YE = "YE",
  SD = "SD",
}

export enum PriceType {
  None = "None",
  PerPerson = "PerPerson",
  PerHour = "PerHour",
  PerItem = "PerItem",
  PerEvent = "PerEvent",
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

export interface PlacesDto {
  step: WeddingSteps;
  mainPhoto: SearchFilter;
  id: number;
  name?: string | null;
  formattedAddress?: string | null;
  picked: boolean;
  favourite: boolean;
  minPrice: string;
  maxPrice: string;
  currency: string;
  isPromoted: boolean;
  label: string | null;
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
  picked: boolean;
  favourite: boolean;
  notes: string | null;
  mainPhoto: string;
  maxPrice: string;
  minPrice: string;
  countryName: string;
  currency: string;
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

export interface PhotosDto {
  uri: string;
  ratio: number;
}

export interface PhotosViewModel {
  result: PhotosDto[];
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

export interface UserInfo {
  firstName: string;
  lastName: string;
  email: string;
}

export interface ExchangeTokenDto {
  id: number;
  rcAppUserId: string;
  accessToken: string;
  refreshToken: string;
  user: UserInfo;
}

export interface DeletePlaceRequest {
  id: number;
}

export interface CreatePlaceRequest {
  type?: WeddingSteps;
}

export interface VendorPlaceDetailsDto {
  step: WeddingSteps;
  priceType: PriceType;
  countryCode: CountryCode;
  id: number;
  name: string;
  streetName?: string;
  phoneNumber: string;
  facebook?: string;
  instagram?: string;
  tiktok?: string;
  website?: string;
  isPublished: boolean;
  description?: string;
  mainPhoto: string;
  minPrice: string;
  maxPrice: string;
  googleId?: string;
  currency: string;
  countryName: string;
}

export interface UpdatePlaceInfo {
  name?: string;
  phoneNumber?: string;
  facebook?: string;
  instagram?: string;
  tiktok?: string;
  website?: string;
  minPrice?: string;
  maxPrice?: string;
  priceType?: "None" | "PerPerson" | "PerHour" | "PerItem" | "PerEvent";
}

export interface UpdateLocationInfo {
  streetName?: string;
  city?: string;
  countryCode?:
    | "BH"
    | "EG"
    | "IR"
    | "IQ"
    | "JO"
    | "KW"
    | "LB"
    | "OM"
    | "PS"
    | "QA"
    | "SA"
    | "SY"
    | "TR"
    | "AE"
    | "YE"
    | "SD";
  postalCode?: string;
  lat?: number;
  lng?: number;
  googleId?: string;
}

export interface UpdatePlaceRequest {
  updateStep?: UpdateStep;
  type?: WeddingSteps;
  id?: number;
  placeInfo?: UpdatePlaceInfo;
  description?: string;
  location?: UpdateLocationInfo;
}

export interface VendorPlaceDto {
  id: number;
  name: string;
  streetName?: string;
  currency: string;
  thumbnail: string;
  isPublished: boolean;
  isCompleted: boolean;
  isPromoted: object;
  minPrice: string;
  maxPrice: string;
}

export interface VendorPlaceViewModel {
  published: {
    title: string;
    data: VendorPlaceDto[];
  };
  unpublished: {
    title: string;
    data: VendorPlaceDto[];
  };
  uncompleted: {
    title: string;
    data: VendorPlaceDto[];
  };
}

export interface PublishPlaceRequest {
  placeId: number;
  isPublished: boolean;
}

export interface CountryInfo {
  countryCode: CountryCode;
  countryName: string;
  states: string[];
  currency: string;
}

export interface CountryInfoViewModel {
  result: CountryInfo[];
}

export interface SubscriberAttributesDto {
  value: string;
  updated_at_ms: number;
}

export interface SubscriberAttributes {
  placeId: SubscriberAttributesDto;
  saleLabel: SubscriberAttributesDto;
  salePercentage: SubscriberAttributesDto;
  promotionBeginsAt: SubscriberAttributesDto;
  promotionEndsAt: SubscriberAttributesDto;
}

export interface RevenueCatEvent {
  event_timestamp_ms: number;
  product_id: string;
  purchased_at_ms: number;
  expiration_at_ms: number;
  environment: string;
  entitlement_id: string;
  entitlement_ids: string[];
  presented_offering_id: string;
  transaction_id: string;
  original_transaction_id: string;
  is_family_share: boolean;
  country_code: string;
  app_user_id: string;
  aliases: string[];
  original_app_user_id: string;
  is_trial_conversion: boolean;
  price: number;
  price_in_purchased_currency: number;
  subscriber_attributes: SubscriberAttributes;
  store: string;
  takehome_percentage: number;
  offer_code: string;
  tax_percentage: number;
  commission_percentage: number;
  metadata: object;
  renewal_number: number;
  type:
    | "TEST"
    | "INITIAL_PURCHASE"
    | "RENEWAL"
    | "CANCELLATION"
    | "UNCANCELLATION"
    | "NON_RENEWING_PURCHASE"
    | "SUBSCRIPTION_PAUSED"
    | "EXPIRATION"
    | "BILLING_ISSUE"
    | "PRODUCT_CHANGE"
    | "TRANSFER"
    | "SUBSCRIPTION_EXTENDED"
    | "TEMPORARY_ENTITLEMENT_GRANT"
    | "REFUND_REVERSED"
    | "INVOICE_ISSUANCE"
    | "VIRTUAL_CURRENCY_TRANSACTION"
    | "EXPERIMENT_ENROLLMENT";
  id: string;
  app_id: string;
}

export interface RevenueCatRequest {
  api_version: string;
  event: RevenueCatEvent;
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
        offset: number;
        countryCode:
          | "BH"
          | "EG"
          | "IR"
          | "IQ"
          | "JO"
          | "KW"
          | "LB"
          | "OM"
          | "PS"
          | "QA"
          | "SA"
          | "SY"
          | "TR"
          | "AE"
          | "YE"
          | "SD";
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
     * @tags Photos
     * @name PhotosControllerGetPhotos
     * @request GET:/api/photos/{id}
     */
    photosControllerGetPhotos: (id: number, params: RequestParams = {}) =>
      this.request<PhotosViewModel, any>({
        path: `/api/photos/${id}`,
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
    authControllerGoogleCallback: (
      query: {
        state: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/api/auth/google/callback`,
        method: "GET",
        query: query,
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
     * @name PlacesControllerDeletePlace
     * @request POST:/api/places/delete
     */
    placesControllerDeletePlace: (
      data: DeletePlaceRequest,
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/api/places/delete`,
        method: "POST",
        body: data,
        type: ContentType.Json,
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
      this.request<VendorPlaceDetailsDto, any>({
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
     * @name PlacesControllerUpdatePlace
     * @request POST:/api/places/update
     */
    placesControllerUpdatePlace: (
      data: UpdatePlaceRequest,
      params: RequestParams = {},
    ) =>
      this.request<VendorPlaceDetailsDto, any>({
        path: `/api/places/update`,
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

    /**
     * No description
     *
     * @tags Places
     * @name PlacesControllerGetCountries
     * @request GET:/api/places/getCountries
     */
    placesControllerGetCountries: (params: RequestParams = {}) =>
      this.request<CountryInfoViewModel, any>({
        path: `/api/places/getCountries`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Packages
     * @name PackagesControllerGeneratePackages
     * @request GET:/api/packages/generatePackage
     */
    packagesControllerGeneratePackages: (
      query: {
        budget: number;
        includedSteps: (
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
          | "Extra"
        )[];
      },
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/api/packages/generatePackage`,
        method: "GET",
        query: query,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Webhooks
     * @name WebhooksControllerRevenueCatWebhook
     * @request POST:/api/webhooks/revenue-cat
     */
    webhooksControllerRevenueCatWebhook: (
      data: RevenueCatRequest,
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/api/webhooks/revenue-cat`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        ...params,
      }),
  };
}
