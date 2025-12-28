import { $, $$ } from '@wdio/globals'
import type { Browser } from 'webdriverio'
import BaseClass from '../utils/BaseClass'
import Waits from '../waits/Waits'

declare const browser: Browser

declare let wait:Waits

export default class GenericActions extends BaseClass {
    /* ----------------------------------------------------
       SAFE CLICK
    ---------------------------------------------------- */

    async safelyClickElement(selector: string): Promise<void> {
        let attempts = 2
        let lastError: unknown

        while (attempts > 0) {
            try {
                console.info(`Attempting to click: ${selector}`)

                await wait.waitForElementUntilClickable(selector)
                await wait.waitForElementUntilVisible(selector)
                const element = await $(selector)
                await element.click()

                console.info(`Successfully clicked: ${selector}`)
                return
            } catch (error) {
                lastError = error
                attempts--
                console.warn(
                    `Click failed. Attempts left: ${attempts}`
                )
            }
        }

        throw new Error(
            `Failed to click element after retries: ${selector}`,
            { cause: lastError as Error }
        )
    }

    /* ----------------------------------------------------
       TEXT & ELEMENT UTILITIES
    ---------------------------------------------------- */

    async getText(selector: string): Promise<string> {
        try{
            await wait.waitForElementUntilVisible(selector)
            const element = await $(selector)
            const text = await element.getText()
            console.info(`Text from ${selector}: ${text}`)
            return text
        }catch(error){
            throw error
        }
    }

    async getElement(selector: string) {
        try{
            await wait.waitForElementUntilVisible(selector)
            const element = await $(selector)
            return element
        }catch(error){
            throw error
        }

    }

    async getElements(selector: string) {
        await wait.waitForElementUntilVisible(selector)
        const elements = await $$(selector)
        if (await elements.length === 0) {
            throw new Error(`No elements found for selector: ${selector}`)
        }
        return elements
    }

    async isElementPresent(selector: string): Promise<boolean> {
        try{
            const element = await $(selector)
            const isDisplayed =await element.isDisplayed()
            return isDisplayed
        }catch(error){
            throw error
        }

    }

    async getAttributeValue(
        selector: string,
        attribute: string
    ): Promise<string> {
        try{
            const element = await $(selector)
            await wait.waitForElementUntilVisible(selector)
            const value = await element.getAttribute(attribute)
            return value
        }catch(error){
            throw error
        }
    }

    /* ----------------------------------------------------
       PAGE / BROWSER UTILITIES
    ---------------------------------------------------- */

    async getTitle(): Promise<string> {
        try{
            const title = await browser.getTitle()
            console.info(`Page title: ${title}`)
            const text = title
            return text
        }catch(error){
            throw error
        }
    }

    /* ----------------------------------------------------
       WEB ALERT HANDLING
    ---------------------------------------------------- */

    async isAlertPresent(timeout = 60000): Promise<boolean> {
        try {
            await browser.waitUntil(
                async () => await browser.isAlertOpen(),
                { timeout }
            )
            return true
        } catch {
            return false
        }
    }

    async getAlertText(): Promise<string> {
        if (!(await browser.isAlertOpen())) {
            throw new Error('No alert present')
        }
        return browser.getAlertText()
    }

    async acceptAlert(): Promise<void> {
        if (!(await browser.isAlertOpen())) {
            throw new Error('No alert present')
        }
        await browser.acceptAlert()
    }

    async dismissAlert(): Promise<void> {
        if (!(await browser.isAlertOpen())) {
            throw new Error('No alert present')
        }
        await browser.dismissAlert()
    }
}
