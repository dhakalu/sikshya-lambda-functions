/* eslint-env jest */

const {
  createNewAssignment,
  getAllAssignmentsForAClassLevelOfASchool,
  getAllAssignmentOfASubjectOfAclassLevelOfASchool
} = require('../../js/service/AssignmentsService')

const assignmentRequest = {
  schoolId: 'a805ea60-6e67-4473-9d84-24b1590580ac',
  classId: '10:49',
  classLevel: '3',
  assignmentName: 'Final Report',
  createdBy: 'Ramesh Khanal',
  createdAt: '05/03/2020 10:00 AM',
  dueOn: '05/11/2020 12:00 PM',
  totalMarks: '100'
}

describe('Test different actions related to assignment', () => {
  jest.setTimeout(30000)
  test('Add new assignment to a class', async () => {
    const data = await createNewAssignment(assignmentRequest)
    const assignmentId = data.assignmentId
    expect(assignmentId).not.toBe(null)
    expect(data).toEqual({ assignmentId, ...assignmentRequest })
  })

  test('Get All the assignments that belong to one class of a school', async () => {
    const data = await getAllAssignmentsForAClassLevelOfASchool(assignmentRequest.schoolId, assignmentRequest.classLevel)
    expect(data.Count).toBeGreaterThan(0)
    expect(data.Count).toBe(2)
  })

  test('Get all assignment of a particular subject of a particular class of a school', async () => {
    const data = await getAllAssignmentOfASubjectOfAclassLevelOfASchool(assignmentRequest.schoolId, assignmentRequest.classLevel, assignmentRequest.classId)
    expect(data.Count).toBeGreaterThan(0)
    expect(data.Count).toBe(1)
  })

})
