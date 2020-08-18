// Tag
/**
 * @swagger
 * tags:
 *   name: Question
 *   description: Question API
 */
// User Schema
/**
 * @swagger
 *  components:
 *    schemas:
 *      Question:
 *        type: object
 *        required:
 *          - questionTitle
 *          - problemCode
 *          - description
 *          - author
 *          - tags
 *          - dateAdded
 *          - timeLimit
 *          - sourceLimit
 *          - difficulty
 *        properties:
 *          questionTitle:
 *            type: string
 *            description: The title of the question
 *          problemCode:
 *            type: string
 *            description: A unique question code
 *          description:
 *            type: string
 *            description: Full question description
 *          author:
 *            type: string
 *            description: Author of the question
 *          tags:
 *            type: array of strings
 *            description: tags of the question
 *          dateAdded:
 *            type: string
 *            description: date question added
 *          timeLimit:
 *            type: number
 *            description: timelimit for execution
 *          sourceLimit:
 *            type: number
 *            description: Size of the source file
 *          difficulty:
 *            type: number
 *            description: difficulty level of the question
 *
 *        example:
 *           tags: Array
 *           sourceLimit: 50000
 *           timeLimit: 1
 *           questionTitle: "Life, the Universe, and Everything"
 *           problemCode: "test"
 *           description: "Your program is to use the brute-force approach in order to find the A..."
 *           author: "admin"
 *           dateAdded: "23-02-2009"
 *           difficulty: 3
 */

// User components used in the responses
/**
 * @swagger
 *  components:
 *    schemas:
 *      putQuestion:
 *        type: object
 *        properties:
 *          message:
 *            type: object
 *            description: A question to be posted
 *        example:
 *           message: {
 *           tags:['graph'],
 *           timeLimit:1,
 *           source_limit:50000,
 *           question_title:"Life, the Universe, and Everything",
 *           problem_code:"test",
 *           description:"Your program is to use the brute-force approach in order to find the A...",
 *           author:"admin",
 *           date_added:"23-02-2009",
 *           difficulty:3
 *                    }
 *      getQuestion:
 *        type: object
 *        properties:
 *          message:
 *            type: array
 *            description: To get a question
 *        example:
 *           message: [{
 *           tags:['graph'],
 *           time_limit:1,
 *           source_limit:50000,
 *           question_title:"Life, the Universe, and Everything",
 *           problem_code:"test",
 *           description:"Your program is to use the brute-force approach in order to find the A...",
 *           author:"admin",
 *           date_added:"23-02-2009",
 *           difficulty:3
 *                    }]
 *      getQuestionById:
 *        type: object
 *        properties:
 *          message:
 *            type: array
 *            description: To get questions from their respective questionsIds
 *        example:
 *           message: [{
 *           tags:['graph'],
 *           time_limit:1,
 *           source_limit:50000,
 *           question_title:"Life, the Universe, and Everything",
 *           problem_code:"test",
 *           description:"Your program is to use the brute-force approach in order to find the A...",
 *           author:"admin",
 *           date_added:"23-02-2009",
 *           difficulty:3
 *                    }]
 *      deleteQuestion:
 *        type: object
 *        properties:
 *          message:
 *            type: array
 *            description: A questionto be deleted
 *      deleteQuestionById:
 *        type: object
 *        properties:
 *          message:
 *            type: array
 *            description: A question to be deleted by ID
 *      patchQuestionById:
 *        type: object
 *        properties:
 *          message:
 *            type: array
 *            description: Update a question by ID
 *      getRandom:
 *        type: object
 *        properties:
 *          message:
 *            type: array
 *            description: To get n random question IDs
 *        example:
 *           message: [
 *           "5f32a127c5e5b2da2163957c",
 *           "5f3374e499b995216f0aece4",
 *           "5f3374dc99b995216f0aece3"
 *                     ]
 *      Error:
 *        type: object
 *        properties:
 *          message:
 *            type: string
 *            description: Error client made a mistake
 *        example:
 *           message: Error message
 */

//  paths with their method and responses
/**
 * @swagger
 * path:
 *  /question/:
 *    post:
 *      summary: Create a new question
 *      tags: [Question]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Question'
 *      responses:
 *        "201":
 *          description: Create a new question
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/putQuestion'
 *    get:
 *      summary: Get one question
 *      tags: [Question]
 *      responses:
 *        "200":
 *          description: get a question
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/getQuestion'
 *        "401":
 *          description: Client mistake
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Error'
 *  /question/getQById/:
 *    post:
 *      summary: Get questions by Id
 *      tags: [Question]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/getQuestionById'
 *      responses:
 *        "200":
 *          description: Return the questions of the questionIds
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/getQuestionById'
 *        "401":
 *          description: Client mistake
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Error'
 *  /question/:questionId:
 *    delete:
 *      summary: Delete a question by ID
 *      tags: [Question]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Question'
 *      responses:
 *        "201":
 *          description: delete a question by ID
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/deleteQuestionById'
 *        "401":
 *          description: Client mistake
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Error'
 *    patch:
 *      summary: Update a question by ID
 *      tags: [Question]
 *      responses:
 *        "201":
 *          description: update a question by ID
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/patchQuestionById'
 *        "401":
 *          description: Client mistake
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Error'
 *  /question/random/:
 *    get:
 *      summary: Get n random question Ids
 *      tags: [Question]
 *      responses:
 *        "200":
 *          description: get n random questionIds
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/getRandom'
 *        "401":
 *          description: Client mistake
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Error'
 */
