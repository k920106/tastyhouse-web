/**
 * Parameter types
 */
export type LoginParams = {
  username: string
  password: string
}

/**
 * Helper types
 */
export type LoginResult = { success: true; data: LoginResponse } | { success: false; error: string }

/**
 * Request types
 */
export type LoginRequest = {
  username: string
  password: string
}

/**
 * Response types
 */
export type LoginResponse = {
  accessToken: string
  refreshToken: string
  tokenType: string
}
