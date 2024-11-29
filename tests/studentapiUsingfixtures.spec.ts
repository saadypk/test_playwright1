import { test, expect } from './fixtures'; // Import the custom fixture

// Parameterized test data for creating students
const testList = [
    { age: "100", name: "Saad1", grade: "A" },
    { age: "90", name: "Saad2", grade: "B" },
    { age: "80", name: "Saad3", grade: "A" },
    { age: "70", name: "Saad4", grade: "B" },
    { age: "60", name: "Saad5", grade: "C" },
];

// Run tests sequentially
test.describe.configure({ mode: 'serial' }); // Ensures tests in this file run one after another

// Function to introduce delay
const delay = async (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// Test for creating and verifying students
testList.forEach(({ age, name, grade }) => {
    test(`Create and verify student ${name} using API and fixtures`, async ({ apiContext }) => {
        test.setTimeout(60000); // Extend timeout for this test

        // Step 1: Create the student
        const student = { age, name, grade };
        const response = await apiContext.post('/student', { data: student });
        expect(response.ok()).toBeTruthy();
        const responseJson = await response.json();
        const studentId = responseJson.student_id;

        // Step 2: Add delay to ensure student creation is stable
        await delay(3000); // Wait for 3 seconds

        // Step 3: Verify the student was created
        const responseGet = await apiContext.get(`/student/${studentId}`);
        expect(responseGet.ok()).toBeTruthy();
        const responseGetJson = await responseGet.json();

        expect(responseGetJson.age).toBe(student.age);
        expect(responseGetJson.name).toBe(student.name);
        expect(responseGetJson.grade).toBe(student.grade);

        // Step 4: Cleanup (delete the student)
        const responseDelete = await apiContext.delete(`/student/${studentId}`);
        expect(responseDelete.status()).toBe(200);
    });
});

// Test for creating and deleting a student using `studentFixture`
test('Create and delete a student using fixture', async ({ apiContext, studentFixture }) => {
    test.setTimeout(60000); // Extend timeout for this test
    const { studentId } = studentFixture;

    // Step 1: Add delay to ensure student creation is stable
    await delay(3000); // Wait for 3 seconds

    // Step 2: Verify the student exists
    const responseGet = await apiContext.get(`/student/${studentId}`);
    expect(responseGet.ok()).toBeTruthy();
    const student = await responseGet.json();

    expect(student.age).toBe("25");
    expect(student.name).toBe("Test Student");
    expect(student.grade).toBe("A");

    // Step 3: Student deletion is handled by the fixture teardown logic
});
