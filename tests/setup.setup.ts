import { request, test as setup } from '@playwright/test';
import { LoginPage } from '../pages/loginpage';

const authFile = 'auth/cookiesState.json';

setup('Clean up database and authenticate', async ({ page }) => {
    // Step 1: Set up API context for database cleanup
    const apiContext = await request.newContext({
        baseURL: 'https://test-379574553568.us-central1.run.app',
        extraHTTPHeaders: {
            'api_key': 'saad_test',
            'content-type': 'application/json',
        },
    });

    // Step 2: Cleanup all students in the database
    const deleteAllResponse = await apiContext.delete('/student_delete_all');
    if (!deleteAllResponse.ok()) {
        console.error(`Failed to clean up database. Status: ${deleteAllResponse.status()}`);
        throw new Error('Database cleanup failed');
    }
    console.log('Database cleaned up successfully.');

    // Dispose of API context
    await apiContext.dispose();

    // Step 3: Log in to the application and save cookies
    await page.goto('https://hoff.is/cookies/');
    const loginPage = new LoginPage(page);

    // Replace these credentials with valid ones
    await loginPage.login('Saad', 'sup3rs3cr3t', 'business');

    // Save storage state to reuse authentication in tests
    await page.context().storageState({ path: authFile });
    console.log('Authentication state saved to:', authFile);
});
