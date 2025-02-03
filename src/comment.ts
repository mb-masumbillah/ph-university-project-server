/**
    moudler pattern => 
      1. student
        -> student.interface.ts
        -> student.model.ts
        -> student.service.ts
        -> student.controller.ts
        -> student.routes.ts

      2. admin
        -> admin.interface.ts
        -> admin.model.ts
        -> admin.service.ts
        -> admin.controller.ts
        -> admin.routes.ts


    => use Javascript => 
    
    Schema --> Model --> DB Query

    => uer Typescript =>

    Interface --> Schema --> Model --> DB Query
    
  
  
  <-------------  Error Types and Handling -------------->

    ==> Types Of Errors
      1.Operational Error
        - invalid user inputs
        - failed to run server
        - failed to connect database
        - invalid  auth token
      
      2.Programmatical Error
        - using undefined variables.
        - using properties that do not exist
        - passing number instead of string
        - using req.params instead of req.query
        
      3. Unhandled Rejection(Asynchronous Code)
      4. Uncaught Exception(Synchronous Code)


    => Operational Error - & - Programmatical Error -----> Express Application[ const app:Application = express() ]

    => Unhandled Rejection(Asynchronous Code) - & - Uncaught Exception(Synchronous) -----> inside / outside Express Application


    => Error common Pattern
      - success
      - message
      - errorSources:[
          path: "",
         message: ""
        ]
      - stack


    => type error pattern
      - zod Validation Error 
      - mongoose validation Error
      - mongoose cast Error
      - mongoose duplicate Error 
 */
