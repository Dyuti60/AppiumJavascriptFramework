import { browser } from '@wdio/globals'
import * as fs from 'fs'
import * as path from 'path'

export default class BaseClass {

    async activateApp(appPackage: string): Promise<void> {
        await (browser as any).execute('mobile: activateApp', {
            appId: appPackage
        })
    }

    async terminateApp(appPackage: string): Promise<void> {
        await (browser as any).execute('mobile: terminateApp', {
            appId: appPackage
        })
    }

    async backgroundApp(seconds: number): Promise<void> {
        await (browser as any).background(seconds)
    }

    /* ----------------------------------------------------
       BROWSER ACCESS
    ---------------------------------------------------- */
    getBrowser() {
        return browser
    }

    async pressBack(): Promise<void> {
        await (browser as any).execute('mobile: back')
    }

    async hideKeyboard(): Promise<void> {
        await (browser as any).execute('mobile: hideKeyboard')
    }

    /* ----------------------------------------------------
       SCREENSHOT
    ---------------------------------------------------- */

    getCurrentDateTime(): string {
        const now = new Date()
        return now.toISOString().replace(/[:.]/g, '-')
    }

    async takeScreenshot(testCaseName: string): Promise<string> {
        const dateTime = this.getCurrentDateTime()
        const dirPath = path.join(
            process.cwd(),
            'screenshots',
            dateTime,
            testCaseName
        )

        fs.mkdirSync(dirPath, { recursive: true })

        const filePath = path.join(dirPath, `${testCaseName}.png`)
        await (browser as any).saveScreenshot(filePath)

        return filePath
    }

    /* ----------------------------------------------------
       SCREEN RECORDING
    ---------------------------------------------------- */

    async startScreenRecording(): Promise<void> {
        if (browser.isAndroid) {
            await browser.execute('mobile: startMediaProjectionRecording', {
                videoSize: '720x1280',
                bitRate: 4000000
            })
        }
    }

    async stopAndSaveScreenRecording(testCaseName: string): Promise<string> {
        const base64Video = await browser.execute(
                'mobile: stopMediaProjectionRecording',
                {}
        ) as string
        const dateTime = this.getCurrentDateTime()
        const dirPath = path.join(
            process.cwd(),
            'recordings',
            dateTime
        )

        fs.mkdirSync(dirPath, { recursive: true })

        const filePath = path.join(dirPath, `${testCaseName}.mp4`)
        const buffer = await Buffer.from(base64Video, 'base64')

        await fs.writeFileSync(filePath, buffer)
        return filePath
    }
}

