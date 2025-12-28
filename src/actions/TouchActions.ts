import { $ , $$} from '@wdio/globals'
import BaseClass from '../utils/BaseClass'
import type { Browser } from 'webdriverio'
import Waits from '../waits/Waits'

declare const browser: Browser
declare let wait: Waits

export default class TouchActions extends BaseClass {
    /* ----------------------------------------------------
       LONG PRESS
    ---------------------------------------------------- */

    async longPressOnElement(selector: string, duration = 2000): Promise<void> {
        try {
            await wait.waitForElementUntilVisible(selector)
            const element = await $(selector)

            await browser.execute('mobile: longClickGesture', {
                elementId: await element.elementId,
                duration
            })

            console.info(`Long pressed on element: ${selector}`)
        } catch (error) {
            console.error(`Failed to long press on element: ${selector}`, error)
            throw error
        }
    }

    /* ----------------------------------------------------
       SCROLL ACTIONS
    ---------------------------------------------------- */

    async scrollTillEnd(): Promise<void> {
        try {
            let canScrollMore = true

            while (canScrollMore) {
                canScrollMore = await browser.execute(
                    'mobile: scrollGesture',
                    {
                        left: 100,
                        top: 100,
                        width: 200,
                        height: 200,
                        direction: 'down',
                        percent: 3.0
                    }
                )
            }

            console.info('Scrolled till end of the page')
        } catch (error) {
            console.error('Failed to scroll till end', error)
            throw error
        }
    }

    async scrollTillText(text: string): Promise<void> {
        try {
            await $(
                `android=new UiScrollable(new UiSelector())
                 .scrollIntoView(text("${text}"))`
            )
            console.info(`Scrolled till text found: ${text}`)
        } catch (error) {
            console.error(`Failed to scroll till text: ${text}`, error)
            throw error
        }
    }

    async scrollTillContainsText(textContains: string): Promise<void> {
        try {
            await $(
                `android=new UiScrollable(new UiSelector())
                 .scrollIntoView(new UiSelector().textContains("${textContains}"))`
            )
            console.info(`Scrolled till text containing: ${textContains}`)
        } catch (error) {
            console.error(`Failed to scroll till textContains: ${textContains}`, error)
            throw error
        }
    }

    async scrollTillSomeTextVisible(
        textContains: string,
        maxSwipes = 8
    ): Promise<void> {
        for (let i = 0; i < maxSwipes; i++) {
            const elements = await $$(
                `android=new UiSelector().textMatches("(?i).*${textContains}.*")`
            )

            if (await elements.length > 0 && (await elements[0].isDisplayed())) {
                console.info(`Found text: ${textContains}`)
                return
            }

            console.info(`Scrolling attempt ${i + 1} for text: ${textContains}`)
            await this.swipeUp()
            await browser.pause(1500)
        }

        throw new Error(`Text not found after scrolling: ${textContains}`)
    }

    /* ----------------------------------------------------
       SWIPE ACTIONS
    ---------------------------------------------------- */

    async swipeUp(): Promise<void> {
        const { height, width } = await browser.getWindowSize()

        const startX = Math.floor(width / 2)
        const startY = Math.floor(height * 0.8)
        const endY = Math.floor(height * 0.2)

        await browser.performActions([
            {
                type: 'pointer',
                id: 'finger',
                parameters: { pointerType: 'touch' },
                actions: [
                    { type: 'pointerMove', duration: 0, x: startX, y: startY },
                    { type: 'pointerDown', button: 0 },
                    { type: 'pointerMove', duration: 800, x: startX, y: endY },
                    { type: 'pointerUp', button: 0 }
                ]
            }
        ])

        await browser.releaseActions()
    }

    async swipeElement(
        selector: string,
        direction: 'up' | 'down' | 'left' | 'right'
    ): Promise<void> {
        try {
            await wait.waitForElementUntilVisible(selector)
            const element = await $(selector)
            

            await browser.execute('mobile: swipeGesture', {
                elementId: await element.elementId,
                direction,
                percent: 0.75
            })

            console.info(`Swiped ${direction} on element: ${selector}`)
        } catch (error) {
            console.error(`Failed to swipe ${direction} on ${selector}`, error)
            throw error
        }
    }

    /* ----------------------------------------------------
       DRAG & DROP
    ---------------------------------------------------- */

    async dragElementToCoordinates(
        selector: string,
        endX: number,
        endY: number
    ): Promise<void> {
        try {
            await wait.waitForElementUntilVisible(selector)
            const element = await $(selector)

            await browser.execute('mobile: dragGesture', {
                elementId: await element.elementId,
                endX,
                endY
            })

            console.info(
                `Dragged element ${selector} to coordinates (${endX}, ${endY})`
            )
        } catch (error) {
            console.error(
                `Failed to drag element ${selector} to (${endX}, ${endY})`,
                error
            )
            throw error
        }
    }
}
