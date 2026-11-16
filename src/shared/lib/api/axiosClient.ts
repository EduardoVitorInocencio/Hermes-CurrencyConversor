import axios from 'axios'
import { appConfig } from '@/app/config/env'

export const axiosClient = axios.create({
  baseURL: appConfig.frankfurterApiUrl,
  timeout: 10_000,
  headers: { Accept: 'application/json' },
})
