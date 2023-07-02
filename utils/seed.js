const connection = require('../config/connection');
const { User, Thought } = require('../models');
const { getRandomUsername, getRandomEmail, getRandomThought } = require('./data');

connection.on('error', (err) => err);

connection.once('open', async () => {
  console.log('Connected to database');

  // Delete the collections if they exist
  await Promise.all([
    User.deleteMany(),
    Thought.deleteMany(),
  ]);

  // Create empty arrays to hold users and thoughts
  const users = [];
  const thoughts = [];

  // Loop to create users
  for (let i = 0; i < 10; i++) {
    const username = getRandomUsername();
    const email = getRandomEmail();

    // Create thoughts for each user
    const userThoughts = [];
    for (let j = 0; j < 3; j++) {
      const thoughtText = getRandomThought();
      const thought = new Thought({
        thoughtText,
        username,
      });
      thoughts.push(thought);
      userThoughts.push(thought);
    }

    // Create the user object
    const user = new User({
      username,
      email,
      thoughts: userThoughts,
    });
    users.push(user);
  }

  // Save all the data to the database
  await Promise.all([
    User.insertMany(users),
    Thought.insertMany(thoughts),
  ]);

  console.log('Users:');
  console.table(users.map((user) => user.toObject()));
  
  console.log('Thoughts:');
  console.table(thoughts.map((thought) => thought.toObject()));
  console.info('Seeding complete! 🌱');
  process.exit(0);
});