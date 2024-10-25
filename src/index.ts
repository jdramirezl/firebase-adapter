import { EachMessagePayload } from "kafkajs"
import { createUser } from "./controllers/firebase-auth.controller"
import consumer from "./config/kafka"

const run = async () => {
  await consumer.connect();
  await consumer.subscribe({ topic: 'users' });
  await consumer.run({
      eachMessage: async (message: EachMessagePayload) => {
          const userMessage = JSON.parse(message.message.value.toString())
          if(userMessage.action=="create"){
            createUser(userMessage.user.email, userMessage.user.password, userMessage.user.first_name, userMessage.user.is_ambassador);
          }
      }
  })
}
run().then(console.error);
