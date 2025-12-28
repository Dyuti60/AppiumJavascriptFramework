import * as dotenv from 'dotenv'
dotenv.config()

export const appConfig = {
    appium: {
        host: process.env.APPIUM_HOST ?? '127.0.0.1',
        port: Number(process.env.APPIUM_PORT ?? 4723),
    },
    baseUrl: process.env.BASE_URL ?? '',
    android: {
        package: process.env.APP_PACKAGE,
        activity: process.env.APP_ACTIVITY
  }
}
