function getRandomUsername() {
    const adjectives = ['happy', 'sleepy', 'silly', 'funny', 'crazy', 'cool', 'awesome'];
    const nouns = ['cat', 'dog', 'bird', 'elephant', 'monkey', 'tiger', 'lion', 'panda'];
  
    const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
    const noun = nouns[Math.floor(Math.random() * nouns.length)];
  
    return `${adjective}-${noun}-${Math.floor(Math.random() * 1000)}`;
  }
  
  function getRandomEmail() {
    const domains = ['gmail.com', 'yahoo.com', 'hotmail.com', 'example.com'];
    const randomDomain = domains[Math.floor(Math.random() * domains.length)];
  
    return `${getRandomUsername()}@${randomDomain}`;
  }
  
  function getRandomThought() {
    const thoughts = [
      'Just had a great day!',
      'Thinking about my next adventure...',
      'Feeling excited about the weekend!',
      'What a beautiful sunset!',
      'Reflecting on life and its wonders...',
    ];
  
    return thoughts[Math.floor(Math.random() * thoughts.length)];
  }

  const getRandomReaction = () => {
    const reactions = ['👍', '❤️', '😄', '😮', '🔥', '🎉', '😊', '👏', '💯', '🙌'];
    const randomIndex = Math.floor(Math.random() * reactions.length);
    return reactions[randomIndex];
  };
  
  module.exports = {
    getRandomUsername,
    getRandomEmail,
    getRandomThought,
    getRandomReaction,
  };