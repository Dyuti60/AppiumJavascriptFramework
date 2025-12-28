
import PageObjectManager from '../pageObjects/PageObjectManager'

const pages = new PageObjectManager();

it('Validate If User Can Login Successfully', async () => {
    await pages.loginPage.clickOnLoginButtonInLoginPage()
    await pages.loginPage.verifyStatisticsModuleTitleOnLoggingIn()
    await pages.loginPage.clickOnHamburgerMenuToExpand()
    //await pages.loginPage.clickOnUpdateModuleFromExpandedMenu()
    await pages.loginPage.tapByCoordicateOnHamburgerMenuToExpand()
})