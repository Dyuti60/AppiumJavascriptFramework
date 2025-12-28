import * as dotenv from 'dotenv'
dotenv.config()

export const TIMEOUTS = {
  SHORT: 3000,
  MEDIUM: 7000,
  LONG: 15000
}

export const PLATFORMS = {
  ANDROID: 'Android',
  WEB: 'Web',
  BROWSER: 'Chrome'
}

export const AuthorDetails = {
  AUTHORNAME: process.env.AUTHOR_NAME
}
