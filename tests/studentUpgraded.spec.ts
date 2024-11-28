import { test, request, APIRequestContext, expect } from '@playwright/test';
import { StudentPage } from '../pages/studentpage';

let apiContext: APIRequestContext;
const api_key = "saad_test"

test.beforeAll('Setup API context', async () => {
    apiContext = await request.newContext({
        baseURL: 'https://test-379574553568.us-central1.run.app',
        extraHTTPHeaders: {
            'api_key': api_key,
            'content-type': 'application/json',
        },
    });
    await apiContext.delete("/student_delete_all")
});

test('Student page interactions', async ({ page }) => {
    const studentPage = new StudentPage(page);
 
    // Navigate to the page and set API key
    await studentPage.navigateToPageAndSetApiKey(api_key);
 
    // Add a new student
    await studentPage.addStudent('markus_student_name', '18', 'A+');
    const responseGetAll = await apiContext.get(`/student/`)
    const responseGetAllJson = await responseGetAll.json();
    const getLatestStudent = responseGetAllJson[responseGetAllJson.length-1]
    
    // Edit the student
    await studentPage.editStudent(getLatestStudent.id, 'markus_student_name_new', '19', 'A-');
    
    await page.waitForTimeout(1000);
 
    const responseGet = await apiContext.get(`/student/${getLatestStudent.id}`)
    const responseGetJson = await responseGet.json();
 
    //Verify student that is created has the expected age
    expect(responseGetJson.age).toBe('19')
    expect(responseGetJson.name).toBe('markus_student_name_new')
    expect(responseGetJson.grade).toBe('A-')
    await apiContext.delete(`/student/${getLatestStudent.id}`)
});