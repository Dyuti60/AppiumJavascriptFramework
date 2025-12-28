export {}
declare global{
    namespace NodeJS {
    interface ProcessEnv {
        ENV: string

        APPIUM_HOST: string
        APPIUM_PORT: string

        BASE_URL: string
        API_URL: string

        ANDROID_DEVICE_NAME: string
        ANDROID_PLATFORM_VERSION: string
        ANDROID_DRIVER: string
        
        APP_PACKAGE: string
        APP_ACTIVITY: string

        AUTHOR_NAME: string

        ADMIN_USER: string
        ADMIN_PASSWORD: string
  }
}
}
