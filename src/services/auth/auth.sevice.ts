import { AuthArgsType, SignUpArgsType, SignUpResponseType } from '@/services/auth/auth.types'
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

export const { useLoginMutation, useSignUpMutation } = AuthService
