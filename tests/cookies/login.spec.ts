import { expect, test } from '@playwright/test'
import { StorePage } from '../../pages/storepage'

test('Test to login and buy', async ({page}) => {

    await page.goto('https://hoff.is/cookies/store')
    await page.waitForTimeout(200);
    await expect(new StorePage(page).usernameText).toHaveText("User: Saad", {timeout: 10000})

    

})