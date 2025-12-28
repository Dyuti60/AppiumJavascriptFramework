import LoginPage from './LoginPage';

export default class PageObjectManager{
    public loginPage:LoginPage

    constructor(){
        this.loginPage=new LoginPage()
    }
}