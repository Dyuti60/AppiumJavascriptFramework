import { $ } from '@wdio/globals'
import Log from '../logger/logger/Logger'

export default class Waits {

    private readonly DEFAULT_TIMEOUT = 5000

    async waitForElementUntilVisible(
        selector: string,
        timeout = this.DEFAULT_TIMEOUT
    ): Promise<void> {
        try {
            const element = await $(selector)
            await element.waitForDisplayed({ timeout })
            Log.info(`Element visible: ${selector}`)
        } catch (error) {
            Log.warn(
                `Element NOT visible after ${timeout}ms: ${selector}`
            )
        }
    }

    async waitForElementUntilClickable(
        selector: string,
        timeout = this.DEFAULT_TIMEOUT
    ): Promise<boolean> {
        try {
            const element = await $(selector)
            await element.waitForClickable({ timeout })
            Log.info(`Element clickable: ${selector}`)
            return true
        } catch (error) {
            Log.warn(
                `Element NOT clickable after ${timeout}ms: ${selector}`
            )
            return false
        }
    }

    async waitForElementUntilExist(
        selector: string,
        timeout = this.DEFAULT_TIMEOUT
    ): Promise<void> {
        try {
            const element = await $(selector)
            await element.waitForExist({ timeout })
            Log.info(`Element exists: ${selector}`)
        } catch (error) {
            Log.warn(
                `Element does NOT exist after ${timeout}ms: ${selector}`
            )
        }
    }
}
