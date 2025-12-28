import * as dotenv from 'dotenv'
dotenv.config()

export const ENV = process.env.ENV || 'qa'

export const ENVIRONMENTS = {
  qa: {
    baseUrl: process.env.BASE_URL,
    apiUrl: process.env.API_URL
  },
  prod: {
    baseUrl: process.env.BASE_URL,
    apiUrl: process.env.API_URL
  }
}
