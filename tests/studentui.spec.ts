import { expect, test } from '@playwright/test';
import { StudentPage } from '../pages/studentpage';
 
test.skip('Student page interactions', async ({ page }) => {
    const studentPage = new StudentPage(page);
 
    // Navigate to the page and set API key
    await studentPage.navigateToPageAndSetApiKey('saad_test');
 
    // Add a new student
    await studentPage.addStudent('saad_student_name', '18', 'A+');
 
    // Edit the student
    await studentPage.editStudent('4', 'saad_student_name_new', '19', 'A-');

    await page.waitForTimeout(5000);

    await expect(page.getByTestId('student_4_name')).toHaveText('saad_student_name_new')
 
    // Delete the student
    await studentPage.deleteStudent('4');
});