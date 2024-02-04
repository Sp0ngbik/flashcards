import {
  AuthArgsType,
  MeResponse,
  PasswordRecovery,
  SignUpArgsType,
  SignUpResponseType,
  UpdateProfile,
} from '@/services/auth/auth.types'
import { baseApi } from '@/services/baseApi'

export const authService = baseApi.injectEndpoints({
  endpoints(build) {
    return {
      login: build.mutation<void, AuthArgsType>({
        invalidatesTags: ['Me'],
        query: args => ({
          body: args,
          method: 'POST',
          url: '/v1/auth/login',
        }),
      }),
      logout: build.mutation<void, void>({
        invalidatesTags: ['Me'],
        query: () => ({
          method: 'POST',
          url: '/v1/auth/logout',
        }),
      }),
      me: build.query<MeResponse, void>({
        providesTags: ['Me'],
        query: () => 'v1/auth/me',
      }),
      passwordRecovery: build.mutation<void, PasswordRecovery>({
        query: args => ({
          body: args,
          method: 'POST',
          url: '/v1/auth/recover-password',
        }),
      }),
      signUp: build.mutation<SignUpResponseType, SignUpArgsType>({
        invalidatesTags: ['Me'],
        query: args => ({
          body: args ?? undefined,
          method: 'POST',
          url: '/v1/auth/sign-up',
        }),
      }),
      updateProfile: build.mutation<MeResponse, UpdateProfile>({
        invalidatesTags: ['Me'],
        query: args => ({ body: args ?? undefined, method: 'PATCH', url: '/v1/auth/me' }),
      }),
    }
  },
})

export const {
  useLoginMutation,
  useLogoutMutation,
  useMeQuery,
  usePasswordRecoveryMutation,
  useSignUpMutation,
  useUpdateProfileMutation,
} = authService
