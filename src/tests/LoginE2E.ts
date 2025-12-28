
import PageObjectManager from '../pageObjects/PageObjectManager'

const pages = new PageObjectManager();

it('Validate If User Can Login Successfully', async () => {
    pages.loginPage.clickOnLoginButtonInLoginPage()
    pages.loginPage.verifyStatisticsModuleTitleOnLoggingIn()
})