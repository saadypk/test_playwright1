import { test as baseTest, request, expect, APIRequestContext } from '@playwright/test';

type APIFixtures = {
    apiContext: APIRequestContext;
    studentFixture: { studentId: string };
};

const test = baseTest.extend<APIFixtures>({
    // API context setup
    apiContext: async ({}, use) => {
        const apiContext = await request.newContext({
            baseURL: 'https://test-379574553568.us-central1.run.app',
            extraHTTPHeaders: {
                'api_key': 'saad_test',
                'content-type': 'application/json',
            },
        });

        await use(apiContext);
        await apiContext.dispose();
    },

    // Student fixture setup
    studentFixture: async ({ apiContext }, use) => {
        const studentData = { age: "25", name: "Test Student", grade: "A" };
        let createResponse;

        // Retry logic for creating a student
        for (let attempt = 1; attempt <= 3; attempt++) {
            createResponse = await apiContext.post('/student', { data: studentData });
            if (createResponse.ok()) {
                console.log(`Student creation succeeded on attempt ${attempt}`);
                break;
            } else {
                console.warn(`Student creation attempt ${attempt} failed. Retrying...`);
                if (attempt < 3) {
                    await new Promise((res) => setTimeout(res, 3000)); // Wait 3 seconds before retrying
                }
            }
        }

        if (!createResponse || !createResponse.ok()) {
            throw new Error('Failed to create student after 3 attempts.');
        }

        const responseJson = await createResponse.json();
        const studentId = responseJson.student_id;

        await use({ studentId });

        // Retry logic for cleanup
        for (let attempt = 1; attempt <= 3; attempt++) {
            const deleteResponse = await apiContext.delete(`/student/${studentId}`);
            if (deleteResponse.ok()) {
                console.log(`Student deletion succeeded on attempt ${attempt}`);
                break;
            } else {
                console.warn(`Student deletion attempt ${attempt} failed. Retrying...`);
                if (attempt < 3) {
                    await new Promise((res) => setTimeout(res, 3000)); // Wait 3 seconds before retrying
                }
            }

            if (attempt === 3) {
                throw new Error(`Failed to delete student after 3 attempts. ID: ${studentId}`);
            }
        }
    },
});

export { test, expect };


/*import { test as baseTest, request, expect, APIRequestContext } from '@playwright/test';

type APIFixtures = {
    apiContext: APIRequestContext;
    studentFixture: { studentId: string };
};

const test = baseTest.extend<APIFixtures>({
    // API context setup
    apiContext: async ({}, use) => {
        const apiContext = await request.newContext({
            baseURL: 'https://test-379574553568.us-central1.run.app',
            extraHTTPHeaders: {
                'api_key': 'saad_test',
                'content-type': 'application/json',
            },
        });

        await use(apiContext);
        await apiContext.dispose();
    },

    // Student fixture setup
    studentFixture: async ({ apiContext }, use) => {
        const studentData = { age: "25", name: "Test Student", grade: "A" };
        const createResponse = await apiContext.post('/student', { data: studentData });
        expect(createResponse.ok()).toBeTruthy();
        const responseJson = await createResponse.json();
        const studentId = responseJson.student_id;

        await use({ studentId });

        // Cleanup after the test
        const deleteResponse = await apiContext.delete(`/student/${studentId}`);
        expect(deleteResponse.status()).toBe(200);
    },
});

export { test, expect };
*/