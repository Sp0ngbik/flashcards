import {
  AuthArgsType,
  MeResponse,
  SignUpArgsType,
  SignUpResponseType,
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
      signUp: build.mutation<SignUpResponseType, SignUpArgsType>({
        invalidatesTags: ['Me'],
        query: args => ({
          body: args ?? undefined,
          method: 'POST',
          url: '/v1/auth/sign-up',
        }),
      }),
    }
  },
})

export const { useLoginMutation, useLogoutMutation, useMeQuery, useSignUpMutation } = authService
