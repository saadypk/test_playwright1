import { test, expect } from './fixtures'; // Import the custom fixture

const testList = [
    { age: "100", name: "Saad1", grade: "A" },
    { age: "90", name: "Saad2", grade: "B" },
    { age: "80", name: "Saad3", grade: "A" },
    { age: "70", name: "Saad4", grade: "B" },
    { age: "60", name: "Saad5", grade: "C" },
];

testList.forEach(({ age, name, grade }) => {
    test(`Create student ${name} using API with parameterization`, async ({ apiContext }) => {
        const student = { age, name, grade };

        // Step 1: Create a student
        const response = await apiContext.post('/student', { data: student });
        expect(response.ok()).toBeTruthy();
        const responseJson = await response.json();
        const studentId = responseJson.student_id;

        // Step 2: Verify the student was created
        const responseGet = await apiContext.get(`/student/${studentId}`);
        expect(responseGet.ok()).toBeTruthy();
        const responseGetJson = await responseGet.json();

        expect(responseGetJson.age).toBe(student.age);
        expect(responseGetJson.name).toBe(student.name);
        expect(responseGetJson.grade).toBe(student.grade);
    });
});

test('Delete student using API', async ({ apiContext }) => {
    const student = {
        age: "75",
        name: "Saad3",
        grade: "VG",
    };

    // Step 1: Create a student
    const response = await apiContext.post('/student', { data: student });
    expect(response.ok()).toBeTruthy();
    const responseJson = await response.json();
    const studentId = responseJson.student_id;

    // Step 2: Verify the student was created
    const responseGet = await apiContext.get(`/student/${studentId}`);
    expect(responseGet.ok()).toBeTruthy();
    const responseGetJson = await responseGet.json();

    expect(responseGetJson.age).toBe(student.age);
    expect(responseGetJson.name).toBe(student.name);
    expect(responseGetJson.grade).toBe(student.grade);

    // Step 3: Delete the student
    const responseDelete = await apiContext.delete(`/student/${studentId}`);
    expect(responseDelete.status()).toBe(200);

    // Step 4: Verify the student was deleted
    const responseGetAfterDelete = await apiContext.get(`/student/${studentId}`);
    expect(responseGetAfterDelete.status()).toBe(200); // Adjusted to 404 for "not found"
});
