export interface ApiRequestSignIn {
  email: string
  password: string
}

export interface ApiResponseSignIn {
  expiresIn: number
  token: string
  tokenType: string
  user: User
}

export interface User {
  name: string | null
  avatarUrl: string | null
  createdAt: string | null
  customLeisId: string | null
  email: string | null
  emailVerifiedAt: string | null
  firstName: string | null
  id: number | null
  lastName: string | null
  leisId: string | null
  locale: string | null
  mobilePhone: string | null
  status: number | null
  timezone: string | null
  updatedAt: string | null
}
