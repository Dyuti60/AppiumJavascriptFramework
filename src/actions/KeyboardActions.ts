import { $ } from '@wdio/globals'
import BaseClass from '../utils/BaseClass'
import type { Browser } from 'webdriverio'
import Waits from '../waits/Waits'

declare const browser: Browser
declare let wait:Waits

export default class KeyboardActions extends BaseClass {
    /* ----------------------------------------------------
       TEXT ENTRY
    ---------------------------------------------------- */

    async enterTextWithoutClearing(
        selector: string,
        text: string
    ): Promise<void> {
        try {
            await wait.waitForElementUntilVisible(selector)
            const element = await $(selector)

            await element.addValue(text)
            console.info(`Entered text "${text}" in locator: ${selector}`)
        } catch (error) {
            console.error(
                `Failed to enter text in locator: ${selector}`,
                error
            )
            throw error
        }
    }

    async enterTextAfterClearing(
        selector: string,
        text: string
    ): Promise<void> {
        try {
            await wait.waitForElementUntilVisible(selector)
            const element = await $(selector)

            await element.clearValue()
            console.info(`Cleared text in locator: ${selector}`)

            await element.setValue(text)
            console.info(`Entered text "${text}" in locator: ${selector}`)
        } catch (error) {
            console.error(
                `Failed to clear & enter text in locator: ${selector}`,
                error
            )
            throw error
        }
    }

    async clearText(selector: string): Promise<void> {
        try {
            await wait.waitForElementUntilVisible(selector)
            const element = await $(selector)

            await element.clearValue()
            console.info(`Cleared text from locator: ${selector}`)
        } catch (error) {
            console.error(
                `Failed to clear text from locator: ${selector}`,
                error
            )
            throw error
        }
    }

    /* ----------------------------------------------------
       KEYBOARD ACTIONS
    ---------------------------------------------------- */

    async pressEnterOnElement(selector: string): Promise<void> {
        try {
            await wait.waitForElementUntilVisible(selector)
            const element = await $(selector)

            await element.addValue('\n')
            console.info(`Pressed Enter on element: ${selector}`)
        } catch (error) {
            console.error(
                `Failed to press Enter on element: ${selector}`,
                error
            )
            throw error
        }
    }

    async pressEnter(): Promise<void> {
        try {
            await browser.execute('mobile: pressKey', {
                keycode: 66 // Android KEYCODE_ENTER
            })
            console.info('Pressed Enter from keyboard')
        } catch (error) {
            console.error('Failed to press Enter key', error)
            throw error
        }
    }

    async pressBack(): Promise<void> {
        try {
            await browser.execute('mobile: pressKey', {
                keycode: 4 // Android KEYCODE_BACK
            })
            console.info('Pressed Back from keyboard')
        } catch (error) {
            console.error('Failed to press Back key', error)
            throw error
        }
    }

    async hideKeyboard(): Promise<void> {
        try {
            await browser.execute('mobile: hideKeyboard')
            console.info('Keyboard hidden')
        } catch (error) {
            // Appium throws error if keyboard is already hidden → safe to ignore
            console.warn('Keyboard was not visible')
        }
    }
}
