import { toast } from 'react-toastify'

import {
  AuthArgsType,
  CreateNewPassword,
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
      createNewPassword: build.mutation<void, CreateNewPassword>({
        query: ({ token, ...args }) => ({
          body: args,
          method: 'POST',
          url: `/v1/auth/reset-password/${token}`,
        }),
      }),
      login: build.mutation<void, AuthArgsType>({
        invalidatesTags: ['Me'],
        query: args => ({
          body: args,
          method: 'POST',
          url: '/v1/auth/login',
        }),
      }),
      logout: build.mutation<void, void>({
        invalidatesTags: (_, error) => (error ? [] : ['Me']),
        async onQueryStarted(_, { dispatch, queryFulfilled }) {
          try {
            await queryFulfilled
            dispatch(authService.util.resetApiState())
          } catch {
            toast.error('Unable to logout')
          }
        },
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
        invalidatesTags: (_, error) => (error ? [] : ['Me']),
        async onQueryStarted(arg, { dispatch, queryFulfilled }) {
          const updateResult = dispatch(
            authService.util.updateQueryData('me', undefined, draft => {
              const name = arg.get('name')
              const avatar = arg.get('avatar')

              if (avatar instanceof File) {
                draft.avatar = URL.createObjectURL(avatar)
              }
              if (typeof name === 'string') {
                draft.name = name
              }
            })
          )

          try {
            await queryFulfilled
          } catch {
            updateResult.undo()
          }
        },
        query: args => ({ body: args ?? undefined, method: 'PATCH', url: '/v1/auth/me' }),
      }),
    }
  },
})

export const {
  useCreateNewPasswordMutation,
  useLoginMutation,
  useLogoutMutation,
  useMeQuery,
  usePasswordRecoveryMutation,
  useSignUpMutation,
  useUpdateProfileMutation,
} = authService
