import { LoginPageLocators } from "../pageLocators/LoginPageLocators"
import ActionManager from "../actions/ActionManager"
import Assertion from "../assertions/Assertion"

export default class LoginPage{

    private actions = new ActionManager()

    async clickOnLoginButtonInLoginPage():Promise<void>{
        await this.actions.generic.safelyClickElement(LoginPageLocators.loginButtonXpath)
    }

    async verifyStatisticsModuleTitleOnLoggingIn():Promise<void>{
        await Assertion.isElementDisplayed(LoginPageLocators.statisticsUITitleXpath)
    }

}