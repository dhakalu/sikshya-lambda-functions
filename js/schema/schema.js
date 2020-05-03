const { gql } = require('apollo-server-lambda')

const typeDefs = gql`
    type User {
        username: String!
        firstName: String
        lastName: String
        middleName: String
        name: String
        email: String!
        password: String
        groupName: String
    }

    input UserSignUpRequest {
        username: String!
        firstName: String!
        lastName: String!
        middleName: String
        email: String!
    }

    input UserGroupAssignRequest {
        username: String!
        groupName: String!
    }

    input UserLoginRequest {
        username: String!
        password: String!
        newPassword: String
    }

    type UserLoginResponse {
        accessToken: String!
        expiresIn: String!
        tokenType: String!,
        idToken: String!
    }

    type UserGroupAssignResponse {
        username: String!
        groupName: String!
    }

    input ForgetPasswordRequest {
        username: String!
    }


    """This defines the possible types of institutions that 
    can be rigisterd into our system"""
    enum InstitutionTypes {
        PRE_SCHOOL
        LOWER_SECONDAY_SCHOOL
        SECONDARY_SCHOOL
        HIGHER_SECONDARY_SCHOOL
        A_LEVELS
        PLUS_TWO
        UNDERGRADUATE
        GRADUATE
        PHD
        OTHERS
    }

    """
        This is an address type.
    """
    type Address {
        """This should include street name"""
        address1: String!
        """This will include additional details like building #
            Room #, etc
        """
        address2: String!
        district: String!
        state: String!
        postalCode: String
    }

    input Address {
        """This should include street name"""
        address1: String!
        """This should include additional details like building #
            Room #, etc
        """
        address2: String
        district: String!
        state: String!
        postalCode: String
    }


    """
    This request can be used to register a new  eductaional 
    institution into the system
    """
    input CreateNewInstitutionRequest {
        """The full name of institution. E.g. Xavier International School/College"""
        name: String!
        """The type to which this institution belongs to"""
        schoolType: InstitutionTypes
        address: Address
    }

    # Scheduling 
    input ClassScheduleRequest {
        schoolId: String!,
        classId: String!,
        period: String!
        subjectId: String!
        teachers: [String]!
    }

    type Query {
        # Fetches the information about a user given his/her username
        #
        # Arguments 
        # username: User object for given username
        getUserInfo(username: String!): User!
    }



    type Mutation {
        createNewUser(user: UserSignUpRequest): User!
        assignUserToGroup(request: UserGroupAssignRequest): UserGroupAssignResponse!
        login(request: UserLoginRequest): UserLoginResponse!,
        forgotPassword(request: ForgetPasswordRequest): String!,
        saveSchedule(request: ClassScheduleRequest): String!
    }
`

module.exports = { typeDefs }
