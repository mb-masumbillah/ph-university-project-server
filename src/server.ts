
import mongoose from 'mongoose';
import app from './app';
import config from './app/config';
import { Server } from 'http';


let server: Server;

async function main() {
  try {
    await mongoose.connect(config.database_url as string);

    server = app.listen(config.port, () => {
      console.log(`Example app listening on port ${config.port}`);
    });
  } catch (error) {
    console.log(error);
  }
}

main();

// ✅ **Synchronous Error (যেমন: console.log(x)) ধরার জন্য**
process.on('uncaughtException', () => {
  console.log('😡 uncaughtException is detected. shutting down ........');
  process.exit(1);
});

// ✅ **Asynchronous Error ধরার জন্য**
process.on('unhandledRejection', () => {
  console.log('😡 unhandledRejection is detected. shutting down ........');
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
});

// ✅ **ম্যানুয়ালি সার্ভার বন্ধ করতে (Ctrl + C এর মতো কাজ করবে)**

// process.on("SIGINT", () => {
//   console.log("😡 SIGINT received. Closing server gracefully...");
//   if (server) {
//     server.close(() => {
//       console.log("💀 Server closed!");
//       process.exit(0);
//     });
//   } else {
//     process.exit(0);
//   }
// });

process.on('SIGINT', () => {
  console.log('😡 SIGINT received. Closing server...');
  process.stdout.write('💀 Server closed!\n');
  process.exit(0);
});

//synchronous server off
// console.log(x)
