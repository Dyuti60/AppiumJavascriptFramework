import * as dotenv from 'dotenv'
dotenv.config()

export const ANDROID_DEVICE = {
  deviceName: process.env.ANDROID_DEVICE_NAME,
  platformVersion: process.env.ANDROID_PLATFORM_VERSION,
  automationName: process.env.ANDROID_DRIVER
}
