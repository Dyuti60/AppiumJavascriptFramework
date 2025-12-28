import { expect } from 'expect-webdriverio'
import { $ } from '@wdio/globals'
import BaseClass from '../utils/BaseClass'

export default class Assertion extends BaseClass {
    /* ----------------------------------------------------
       VALUE ASSERTIONS
    ---------------------------------------------------- */

    static assertEquals(actual: string, expected: string): void {
        try {
            expect(actual).toEqual(expected)
            console.info(
                `Match found → Actual: "${actual}" | Expected: "${expected}"`
            )
        } catch (error) {
            console.error(
                `Mismatch → Actual: "${actual}" | Expected: "${expected}"`
            )
            throw error
        }
    }

    static assertContains(actual: string, expected: string): void {
        try {
            expect(actual).toContain(expected)
            console.info(
                `Actual string "${actual}" contains "${expected}"`
            )
        } catch (error) {
            console.error(
                `Actual string "${actual}" does NOT contain "${expected}"`
            )
            throw error
        }
    }

    static assertTrue(value: boolean): void {
        try {
            expect(value).toBe(true)
            console.info(`Assertion passed → value is TRUE`)
        } catch (error) {
            console.error(`Assertion failed → value is FALSE`)
            throw error
        }
    }

    /* ----------------------------------------------------
       ELEMENT ASSERTIONS (MOBILE + WEB)
    ---------------------------------------------------- */

    static async isElementClickable(
        selector: string,
        timeout = 10000
    ): Promise<void> {
        try {
            const element = await $(selector)
            await element.waitForDisplayed({ timeout })
            await element.waitForClickable({ timeout })

            console.info(`Element is clickable: ${selector}`)
        } catch (error) {
            console.error(`Element is NOT clickable: ${selector}`)
            throw error
        }
    }

    static async isElementDisplayed(
        selector: string,
        timeout = 10000
    ): Promise<void> {
        try {
            const element = await $(selector)
            await element.waitForDisplayed({ timeout })

            expect(await element.isDisplayed()).toBe(true)
            console.info(`Element is displayed: ${selector}`)
        } catch (error) {
            console.error(`Element is NOT displayed: ${selector}`)
            throw error
        }
    }
}
