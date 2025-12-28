import * as dotenv from 'dotenv'
dotenv.config()

export const USERS = {
  validUser: {
    username: process.env.ADMIN_USER,
    password: process.env.ADMIN_PASSWORD
  }
}
