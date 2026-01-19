export const API_ENDPOINTS = {
  // 상품
  PRODUCTS: '/api/products/v1',
  PRODUCT_DETAIL: (id: string | number) => `/api/products/v1/${id}`,

  // 장바구니
  CART: '/api/cart/v1',
  CART_ITEM: (id: string | number) => `/api/cart/v1/${id}`,

  // 회원
  MEMBER: '/api/members/v1',
  MEMBER_PROFILE: '/api/members/v1/profile',
  MEMBER_ME: '/api/members/v1/me',

  // 쿠폰
  COUPONS: '/api/coupons/v1',
  COUPON_DETAIL: (id: string | number) => `/api/coupons/v1/${id}`,

  // 이벤트
  EVENTS: '/api/events/v1',
  EVENT_DETAIL: (id: string | number) => `/api/events/v1/${id}`,

  // 포인트
  POINTS: '/api/points/v1',
  POINT_HISTORY: '/api/points/v1/history',

  // 랭킹
  RANKS: '/api/ranks/v1',
  RANK_DETAIL: (id: string | number) => `/api/ranks/v1/${id}`,
  RANK_EVENT_DURATION: '/api/event/v1/ranking/duration',
  RANK_MEMBERS: '/api/ranks/v1/members',
  RANK_MEMBERS_ME: '/api/ranks/v1/members/me',

  // 경품
  PRIZES: '/api/prizes/v1',

  // 장소 추가 엔드포인트
  PLACES_EDITOR_CHOICE: '/api/places/v1/editor-choice',
  PLACES_BEST: '/api/places/v1/best',
  PLACES_LATEST: '/api/places/v1/latest',
  PLACES_STATIONS: '/api/places/v1/stations',
  PLACES_FOOD_TYPES: '/api/places/v1/food-types',
  PLACES_AMENITIES: '/api/places/v1/amenities',

  // 리뷰 추가 엔드포인트
  REVIEWS_BEST: '/api/reviews/v1/best',
  REVIEWS_LATEST: '/api/reviews/v1/latest',

  // 상품 추가 엔드포인트
  PRODUCTS_TODAY_DISCOUNTS: '/api/products/v1/today-discounts',

  // 인증
  AUTH_LOGIN: '/api/auth/login',
  AUTH_LOGOUT: '/api/auth/v1/logout',
  AUTH_REFRESH: '/api/auth/v1/refresh',
  AUTH_REGISTER: '/api/auth/v1/register',
} as const

export type ApiEndpoint = (typeof API_ENDPOINTS)[keyof typeof API_ENDPOINTS]
