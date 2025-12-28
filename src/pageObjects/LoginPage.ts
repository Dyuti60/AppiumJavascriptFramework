import { LoginPageLocators } from "../pageLocators/LoginPageLocators"
import ActionManager from "../actions/ActionManager"
import Assertion from "../assertions/Assertion"

export default class LoginPage{

    private actions = new ActionManager()

    async clickOnLoginButtonInLoginPage():Promise<void>{
        //await browser.pause(3000)
        await this.actions.generic.safelyClickElement(LoginPageLocators.loginButtonXpath)
    }

    async verifyStatisticsModuleTitleOnLoggingIn():Promise<void>{
        await Assertion.isElementDisplayed(LoginPageLocators.statisticsUITitleXpath)
    }

    async clickOnHamburgerMenuToExpand():Promise<void>{
        await browser.pause(3000)
        await this.actions.generic.safelyClickElement(LoginPageLocators.expandedMenuSectionLocate)
    }

    async tapByCoordicateOnHamburgerMenuToExpand(){
        await browser.pause(3000)
        await this.actions.touch.tapByCoordinatesOnElement(78, 210)
    }

    async clickOnUpdateModuleFromExpandedMenu():Promise<void>{
        await browser.pause(3000)
        const menu  = await this.actions.generic.getBrowserElement(LoginPageLocators.expandedMenuSectionLocate)
        await this.actions.touch.scrollMenuAndClick(menu, 'Update')
        await browser.pause(3000)
    }

}