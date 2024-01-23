import {
  AuthArgsType,
  MeResponse,
  SignUpArgsType,
  SignUpResponseType,
} from '@/services/auth/auth.types'
import { baseApi } from '@/services/baseApi'

export const AuthService = baseApi.injectEndpoints({
  endpoints(build) {
    return {
      login: build.mutation<{ accessToken: string }, AuthArgsType>({
        query: args => ({
          body: args ?? undefined,
          method: 'POST',
          url: '/v1/auth/login',
        }),
      }),
      me: build.query<MeResponse, undefined>({
        query: args => ({
          params: args,
          url: 'v1/auth/me',
        }),
      }),
      signUp: build.mutation<SignUpResponseType, SignUpArgsType>({
        query: args => ({
          body: args ?? undefined,
          method: 'POST',
          url: '/v1/auth/sign-up',
        }),
      }),
    }
  },
})

export const { useLoginMutation, useMeQuery, useSignUpMutation } = AuthService
