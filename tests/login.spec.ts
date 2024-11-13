import {expect, test } from '@playwright/test';
import { LoginPage } from '../pages/loginpage';
import { StorePage } from '../pages/storepage';

let password: string
test('Login with Markus', async ({ page }) => {
    const loginPage = new LoginPage(page)
    const storePage = new StorePage(page)
    
    if(process.env.PASSWORD !== undefined){
        password = process.env.PASSWORD
    }

    await page.goto("http://hoff.is/login")
    await loginPage.login("Markus", password, 'consumer');
    const header = await storePage.header.textContent()

    expect(header).toBe("Store")

})

test('fail login', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await page.goto("http://hoff.is/login")
    await loginPage.login("Markus", "sup3rs3cr3", 'consumer');
    const errorMessage = await loginPage.errorMessage.textContent()

    expect(errorMessage).toBe("Incorrect password")


})