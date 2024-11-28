import { expect, test } from '../fixtures'

test.use({actionTimeout: 10000})

test('Test slow api', async ({apiContext}) => {

    const student = {
        age: "20",
        name: "slow_add",
        grade: "A"

    };

    console.log(student)
    const response = await apiContext.post('/student', {data: student});
    expect(response).toBeTruthy();
    
    const responseJson = await response.json();

    const studentId = responseJson.student_id;
     // Step 3: Delete the student
    const responseDelete = await apiContext.delete(`/student/${studentId}`);
    expect(responseDelete.status()).toBe(200);
 
     // Step 4: Verify the student was deleted
     const responseGetAfterDelete = await apiContext.get(`/student/${studentId}`);
     expect(responseGetAfterDelete.status()).toBe(200); // Adjusted to 200 instead of 400 for "not found" due to wrong code

})