import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQueryChat } from './base-query-chat.ts'
import { jsonRequestHeaders } from '../../../api/request-headers.ts'
import { IMessage } from '../models/Message.ts'

export const chatApi = createApi({
  reducerPath: 'chatApi',
  baseQuery: baseQueryChat(jsonRequestHeaders),
  endpoints: (build) => ({
    getChats: build.query<void, void>({
      query: (token) => ({
        url: '/chat/messages/getChats',
        method: 'GET',
        headers: { 'Authorization': `bearer ${token}` },
      }),
    }),
    getAllMessages: build.query<IMessage, void>({
      query: (chatId) => {
        const token = localStorage.getItem('token');
        console.log('chatId:', chatId)
        return {
          url: `/chat/messages/getAll?chatId=${chatId}`,
          method: 'GET',
          headers: { 'Authorization': `Bearer ${token}` },
        };
      },
    }),
    sendMessage: build.mutation<void, { activeId: string; message: string; token: string }>({
      query: ({ activeId, message, token }) => {
        const formData = new URLSearchParams();
        formData.append('ToUserId', activeId);
        formData.append('text', message);

        return {
          url: '/chat/messages/send',
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: formData.toString(),
        };
      },
    })
  }),
})

export const { useGetChatsQuery, useGetAllMessagesQuery, useSendMessageMutation } = chatApi
