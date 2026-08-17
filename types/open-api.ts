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
  FillPlaceInfo = "FillPlaceInfo",
  AddFeatures = "AddFeatures",
  AddDescription = "AddDescription",
  UploadImages = "UploadImages",
}

export enum CoupleSide {
  Groom = "Groom",
  Bride = "Bride",
}

export enum PhotoSize {
  Thumbnail = "Thumbnail",
  Medium = "Medium",
  Image = "Image",
}

export enum PriceType {
  PerPerson = "PerPerson",
  PerHour = "PerHour",
  PerItem = "PerItem",
  PerEvent = "PerEvent",
}

export enum Categories {
  Host = "Host",
  Dress = "Dress",
  Suit = "Suit",
  Photographer = "Photographer",
  Car = "Car",
  Dj = "Dj",
  MakeUpArtist = "MakeUpArtist",
  Salon = "Salon",
  HennaSpecialist = "HennaSpecialist",
  Florist = "Florist",
  Decorator = "Decorator",
  Catering = "Catering",
  Procession = "Procession",
  Performer = "Performer",
  DancingCourse = "DancingCourse",
  Honeymoon = "Honeymoon",
  Giveaway = "Giveaway",
  Jewelry = "Jewelry",
  Perfume = "Perfume",
  Shower = "Shower",
  Cosmetic = "Cosmetic",
  Firework = "Firework",
  Clinic = "Clinic",
  AvEquipment = "AvEquipment",
  Miscellaneous = "Miscellaneous",
}

export enum CountryCode {
  AE = "AE",
  BH = "BH",
  KW = "KW",
  OM = "OM",
  QA = "QA",
  SA = "SA",
  IQ = "IQ",
  JO = "JO",
  LB = "LB",
  PS = "PS",
  SY = "SY",
  DZ = "DZ",
  EG = "EG",
  LY = "LY",
  MA = "MA",
  MR = "MR",
  TN = "TN",
  DJ = "DJ",
  KM = "KM",
  SO = "SO",
  SD = "SD",
  IR = "IR",
  TR = "TR",
  YE = "YE",
}

export interface SearchFilter {
  category?: Categories;
  city?: string;
  price?: string;
}

export interface GetPlacesRequest {
  countryCode: CountryCode;
  offset: number;
  filters: SearchFilter;
  search?: string;
}

export interface PlacesFeatures {
  rent?: boolean;
  capacity?: number;
  outdoor?: boolean;
  indoor?: boolean;
}

export interface PlacesDto {
  category: Categories;
  priceType: PriceType;
  country: CountryCode;
  id: number;
  name?: string | null;
  formattedAddress?: string | null;
  mainPhoto: string;
  mainPhotoBlurhash?: string;
  minPrice: string;
  maxPrice: string;
  isPromoted: boolean;
  label: string | null;
  phoneNumber: string;
  city: string;
  features: PlacesFeatures;
}

export interface PlacesViewModel {
  places: PlacesDto[];
}

export interface PlaceDetailsPhotos {
  url: string;
  blurhash: string;
}

export interface HeroMediaItemDto {
  id: number;
  type: "Photo" | "Video";
  uri: string;
  posterUri: string | null;
  blurhash: string | null;
  ratio: number | null;
  isMain: boolean;
}

export interface PlaceDetailsDto {
  category: Categories;
  countryCode: CountryCode;
  priceType: PriceType;
  id: number;
  name: string;
  address?: string;
  website?: string;
  facebook?: string;
  tiktok?: string;
  instagram?: string;
  phoneNumber: string;
  photos: PlaceDetailsPhotos[];
  heroMedia: HeroMediaItemDto[];
  maxPrice: string;
  minPrice: string;
  description: string;
  city: string;
  features: PlacesFeatures;
}

export interface FavoritePlaceDto {
  priceType?: PriceType;
  country?: CountryCode;
  category?: Categories;
  id: number;
  isFound: boolean;
  name?: string;
  thumbnail?: string;
  thumbnailBlurhash?: string;
  minPrice?: string;
  maxPrice?: string;
}

export interface PhotosDto {
  photoSize: PhotoSize;
  id: number;
  uri: string;
  ratio: number;
  blurhash: string;
  isMain: boolean;
}

export interface PhotosViewModel {
  result: PhotosDto[];
}

export interface DeletePhotoRequest {
  id: number;
}

export interface VideosDto {
  id: number;
  uri: string;
  posterUri: string | null;
  ratio: number | null;
  blurhash: string | null;
  durationMs: number | null;
  isMain: boolean;
}

export interface VideosViewModel {
  result: VideosDto[];
}

export interface DeleteVideoRequest {
  id: number;
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

export interface SignUpDto {
  firstName: string;
  lastName: string;
  /** @format email */
  email: string;
  password: string;
}

export interface SignInDto {
  /** @format email */
  email: string;
  password: string;
}

export interface UserInfo {
  firstName: string;
  lastName: string;
  email: string;
}

export interface ExchangeTokenDto {
  id: number;
  accessToken: string;
  refreshToken: string;
  user: UserInfo;
}

export interface VerifyEmailDto {
  /** @format email */
  email: string;
  /**
   * @minLength 6
   * @maxLength 6
   */
  code: string;
}

export interface ResendVerificationDto {
  /** @format email */
  email: string;
}

export interface CountryInfo {
  countryCode: CountryCode;
  countryName: string;
  cities: string[];
  currency: string;
}

export interface DeletePlaceRequest {
  id: number;
}

export interface PlaceInfo {
  category: Categories;
  name: string;
  phoneNumber: string;
  minPrice?: string | null;
  maxPrice?: string | null;
  priceType?: "PerPerson" | "PerHour" | "PerItem" | "PerEvent" | null;
  city: string;
  countryCode:
    | "AE"
    | "BH"
    | "KW"
    | "OM"
    | "QA"
    | "SA"
    | "IQ"
    | "JO"
    | "LB"
    | "PS"
    | "SY"
    | "DZ"
    | "EG"
    | "LY"
    | "MA"
    | "MR"
    | "TN"
    | "DJ"
    | "KM"
    | "SO"
    | "SD"
    | "IR"
    | "TR"
    | "YE";
  streetName?: string;
  postalCode?: string;
  lat?: number;
  lng?: number;
  googleId?: string;
}

export interface CreatePlaceRequest {
  placeInfo: PlaceInfo;
}

export interface VendorPlaceDetailsDto {
  category: Categories;
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
  minPrice: string;
  maxPrice: string;
  city: string;
  features: PlacesFeatures;
}

export interface UpdateFeaturesRequest {
  category: Categories;
  features: PlacesFeatures;
}

export interface SocialMediaInfo {
  instagram?: string;
  facebook?: string;
  tiktok?: string;
  website?: string;
}

export interface UpdatePlaceRequest {
  updateStep: UpdateStep;
  id: number;
  placeInfo?: PlaceInfo;
  description?: string;
  features?: UpdateFeaturesRequest;
  socialMedia?: SocialMediaInfo;
}

export interface VendorPlaceDto {
  priceType: PriceType;
  country: CountryCode;
  category: Categories;
  id: number;
  name: string;
  streetName?: string;
  thumbnail: string;
  thumbnailBlurhash?: string;
  isPublished: boolean;
  isPromoted: boolean;
  minPrice: string;
  maxPrice: string;
  city: string;
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
}

export interface PublishPlaceRequest {
  placeId: number;
  isPublished: boolean;
}

export interface VersionDto {
  minSupportedVersion: string;
  latestVersion: string;
  storeUrls: {
    ios: string;
    android: string;
  };
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
     * @request POST:/api/planner/getPlaces
     */
    plannerControllerGetPlaces: (
      data: GetPlacesRequest,
      params: RequestParams = {},
    ) =>
      this.request<PlacesViewModel, any>({
        path: `/api/planner/getPlaces`,
        method: "POST",
        body: data,
        type: ContentType.Json,
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
     * @name PlannerControllerGetFavorites
     * @request GET:/api/planner/getFavorites
     */
    plannerControllerGetFavorites: (
      query: {
        id: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<FavoritePlaceDto, any>({
        path: `/api/planner/getFavorites`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Photos
     * @name PhotosControllerUploadFile
     * @request POST:/api/photos/upload/{placeId}
     */
    photosControllerUploadFile: (
      placeId: number,
      data: any,
      params: RequestParams = {},
    ) =>
      this.request<PhotosDto, any>({
        path: `/api/photos/upload/${placeId}`,
        method: "POST",
        body: data,
        type: ContentType.FormData,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Photos
     * @name PhotosControllerGetAllPhotos
     * @request GET:/api/photos/getAll/{placeId}/{photoSize}
     */
    photosControllerGetAllPhotos: (
      placeId: number,
      photoSize: string,
      params: RequestParams = {},
    ) =>
      this.request<PhotosViewModel, any>({
        path: `/api/photos/getAll/${placeId}/${photoSize}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Photos
     * @name PhotosControllerGetPhoto
     * @request GET:/api/photos/getPhoto/{id}
     */
    photosControllerGetPhoto: (id: number, params: RequestParams = {}) =>
      this.request<PhotosDto, any>({
        path: `/api/photos/getPhoto/${id}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Photos
     * @name PhotosControllerDeletePhoto
     * @request POST:/api/photos/delete
     */
    photosControllerDeletePhoto: (
      data: DeletePhotoRequest,
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/api/photos/delete`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Photos
     * @name PhotosControllerSetMain
     * @request POST:/api/photos/toggleMain/{placeId}/{photoId}
     */
    photosControllerSetMain: (
      photoId: number,
      placeId: number,
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/api/photos/toggleMain/${placeId}/${photoId}`,
        method: "POST",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Videos
     * @name VideosControllerUploadFile
     * @request POST:/api/videos/upload/{placeId}
     */
    videosControllerUploadFile: (
      placeId: number,
      data: any,
      params: RequestParams = {},
    ) =>
      this.request<VideosDto, any>({
        path: `/api/videos/upload/${placeId}`,
        method: "POST",
        body: data,
        type: ContentType.FormData,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Videos
     * @name VideosControllerGetAllVideos
     * @request GET:/api/videos/getAll/{placeId}
     */
    videosControllerGetAllVideos: (
      placeId: number,
      params: RequestParams = {},
    ) =>
      this.request<VideosViewModel, any>({
        path: `/api/videos/getAll/${placeId}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Videos
     * @name VideosControllerGetVideo
     * @request GET:/api/videos/getVideo/{id}
     */
    videosControllerGetVideo: (id: number, params: RequestParams = {}) =>
      this.request<VideosDto, any>({
        path: `/api/videos/getVideo/${id}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Videos
     * @name VideosControllerDeleteVideo
     * @request POST:/api/videos/delete
     */
    videosControllerDeleteVideo: (
      data: DeleteVideoRequest,
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/api/videos/delete`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Videos
     * @name VideosControllerSetMain
     * @request POST:/api/videos/toggleMain/{placeId}/{videoId}
     */
    videosControllerSetMain: (
      videoId: number,
      placeId: number,
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/api/videos/toggleMain/${placeId}/${videoId}`,
        method: "POST",
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
     * @name AuthControllerErrorTest
     * @request GET:/api/auth/error
     */
    authControllerErrorTest: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/auth/error`,
        method: "GET",
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
     * @name AuthControllerSignUp
     * @request POST:/api/auth/signup
     */
    authControllerSignUp: (data: SignUpDto, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/auth/signup`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Auth
     * @name AuthControllerSignIn
     * @request POST:/api/auth/signin
     */
    authControllerSignIn: (data: SignInDto, params: RequestParams = {}) =>
      this.request<ExchangeTokenDto, any>({
        path: `/api/auth/signin`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Auth
     * @name AuthControllerVerifyEmail
     * @request POST:/api/auth/verify-email
     */
    authControllerVerifyEmail: (
      data: VerifyEmailDto,
      params: RequestParams = {},
    ) =>
      this.request<ExchangeTokenDto, any>({
        path: `/api/auth/verify-email`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Auth
     * @name AuthControllerResendVerification
     * @request POST:/api/auth/resend-verification
     */
    authControllerResendVerification: (
      data: ResendVerificationDto,
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/api/auth/resend-verification`,
        method: "POST",
        body: data,
        type: ContentType.Json,
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
     * @name AuthControllerAppleLogin
     * @request GET:/api/auth/apple/login
     */
    authControllerAppleLogin: (
      query: {
        scope: string;
        state: string;
        redirect_uri: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/api/auth/apple/login`,
        method: "GET",
        query: query,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Auth
     * @name AuthControllerAppleCallback
     * @request POST:/api/auth/apple/callback
     */
    authControllerAppleCallback: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/auth/apple/callback`,
        method: "POST",
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
     * @tags Users
     * @name UsersControllerDeleteUser
     * @request POST:/api/users/delete
     */
    usersControllerDeleteUser: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/users/delete`,
        method: "POST",
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
     * @tags AppVersion
     * @name AppVersionControllerGetConfig
     * @request GET:/api/app-version/getConfig
     */
    appVersionControllerGetConfig: (params: RequestParams = {}) =>
      this.request<VersionDto, any>({
        path: `/api/app-version/getConfig`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Promotions
     * @name PromotionsControllerGetPromotionsHistory
     * @request GET:/api/promotions/getAll
     */
    promotionsControllerGetPromotionsHistory: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/promotions/getAll`,
        method: "GET",
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
