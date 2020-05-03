/* eslint-env jest */

const {
  addNewClass,
  getAllClassesOfASchool,
  getAllClassesOfASchoolForAClassType
} = require('../../js/service/ClassesService')

const classRequest = {
  schoolId: 'a805ea60-6e67-4473-9d84-24b1590580ac',
  startTime: '10:45',
  endTime: '11:30',
  classType: '3',
  days: ['S', 'M', 'T', 'W', 'TH', 'F'],
  subject: 'Social Studies',
  teachers: ['Ramesh Khanal'],
  totalCapacity: '100',
  currentlyEnrolled: '1',
  period: 'I'
}

describe('Test different actions that can be perfornmed in a class', () => {
  jest.setTimeout(30000)
  test('Add new class to the school', async () => {
    const data = await addNewClass(classRequest)
    expect(data).toEqual(classRequest)
  })

  test('Query all the classes for a given school id', async () => {
    jest.setTimeout(3000)
    const data = await getAllClassesOfASchool({ schoolId: classRequest.schoolId })
    expect(data.Count).toBeGreaterThan(0)
    expect(data.Count).toBe(3)
  })

  test('Query all the classes for given class level and school id', async () => {
    jest.setTimeout(30000)
    const data = await getAllClassesOfASchoolForAClassType({ schoolId: classRequest.schoolId, classType: classRequest.classType })
    expect(data.Count).toBeGreaterThan(0)
    expect(data.Count).toBe(1)
  })
})
