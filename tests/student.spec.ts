import {test} from '@playwright/test';

test('Get students from API' , async () => {
    const response = await fetch('https://test-379574553568.us-central1.run.app/student',
    {
        headers: {'api_key': 'saad_test'}
    })
    const responsejson = await response.json()
    console.log(responsejson)
})


test('Add new students with API' , async () => {
    const student = {
        age: '10',
        grade: 'A',
        name: 'Saad'
    };

    
    const responsePost = await fetch('https://test-379574553568.us-central1.run.app/student',
        {
            method: 'POST',
            body: JSON.stringify(student),
            headers: {
                'api_key': 'saad_test',
                'Content-type': 'application/json'
            }
        })
    const responsePostJson = await responsePost.json()


    const response = await fetch(`https://test-379574553568.us-central1.run.app/student/${responsePostJson.student_id}`,
        {
           
            headers: {'api_key': 'saad_test'}
        })

    const responsejson = await response.json()

    console.log(responsejson)

})

    
test('Update current student with API' , async () => {
    const student = {
            age: '50',
            grade: 'A',
            name: 'Saad1'
        };

        
    const responsePost = await fetch('https://test-379574553568.us-central1.run.app/student',
        {
            method: 'POST',
            body: JSON.stringify(student),
            headers: {
                'api_key': 'saad_test',
                'Content-type': 'application/json'
            }
        })
        const responsePostJson = await responsePost.json()
        const studentId = responsePostJson.student_id;

        student.name = "Saad2"
        const responsePut = await fetch(`https://test-379574553568.us-central1.run.app/student/${responsePostJson.student_id}`,
            {
                method: 'PUT',
                body: JSON.stringify(student),
                headers: {
                    'api_key': 'saad_test',
                    'Content-type': 'application/json'
                }
            })
        
        const responsePutJson = await responsePut.json()
        console.log(responsePutJson)

})