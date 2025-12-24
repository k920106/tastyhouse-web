export type LoginRequest = {
  username: string
  password: string
}

export type LoginResponse = {
  accessToken: string
  refreshToken: string
  tokenType: string
}

export type LoginResult = { success: true; data: LoginResponse } | { success: false; error: string }
