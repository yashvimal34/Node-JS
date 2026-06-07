import {EventEmitter} from "node:events"

const customerDetailes = {
    fullName: 'Jon Dave',
    email: "john34@gmail.com",
    phone: 1234567890
}

// create emitter
const emailRequestEmitter = new EventEmitter()

// define the listner function
function generateEmail(customer){
    console.log(`Email generated for ${customer.email}`)
}

// register the listener
emailRequestEmitter.on('emailRequest', generateEmail)

// You can also create multiple listeners
emailRequestEmitter.on('emailRequest', () => console.log("task Assigned"))
emailRequestEmitter.on('emailRequest', () => console.log("Completed"))

// emit the event
setTimeout(() => {
    emailRequestEmitter.emit('emailRequest', customerDetailes)
}, 2000)

/*

<------------------- Full execution flow -------------------->

Program starts
     │
     ├── Listeners registered (.on x3)
     │
     └── setTimeout starts a 2-second timer
                    │
              (2 seconds pass)
                    │
              .emit fires 'emailRequest'
                    │
          ┌─────────┼──────────┐
          ▼         ▼          ▼
   generateEmail  "task     "Completed"
   (prints email)  Assigned"

<------------------- Full execution flow -------------------->

*/