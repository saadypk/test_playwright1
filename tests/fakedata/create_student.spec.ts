import { request } from '@playwright/test';
import { expect, test } from '../fixtures'
import { faker } from '@faker-js/faker'
import { getPersonnummer } from '../../utils/personnummer';

//test.use({actionTimeout: 10000})

test('Test slow fake data', async ({apiContext}) => {

    const student = {
        age: faker.number.float(),
        name: faker.person.fullName(),
        grade: await getPersonnummer()

    };

    console.log(student)
    const response = await apiContext.post('/student', {data: student});
    expect(response).toBeTruthy();


})
