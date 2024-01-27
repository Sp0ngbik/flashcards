import {
  AuthArgsType,
  MeResponse,
  SignUpArgsType,
  SignUpResponseType,
} from '@/services/auth/auth.types'
import { baseApi } from '@/services/baseApi'
import { Deck } from '@/services/decks/decks.types'

export const AuthService = baseApi.injectEndpoints({
  endpoints(build) {
    return {
      login: build.mutation<{ accessToken: string }, AuthArgsType>({
        query: args => ({
          body: args,
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
      userDecks: build.query<Deck, { id: string }>({
        query: args => ({
          params: args,
          url: `/v1/decks/${args.id}`,
        }),
      }),
    }
  },
})

export const { useLoginMutation, useMeQuery, useSignUpMutation, useUserDecksQuery } = AuthService
