import 'dotenv/config';
const fs = require('fs')


export async function DiscordRequest(endpoint, options) {
  // append endpoint to root API URL
  const url = 'https://discord.com/api/v10/' + endpoint;
  // Stringify payloads
  if (options.body) options.body = JSON.stringify(options.body);
  // Use fetch to make requests
  const res = await fetch(url, {
    headers: {
      Authorization: `Bot ${process.env.DISCORD_TOKEN}`,
      'Content-Type': 'application/json; charset=UTF-8',
      'User-Agent': 'DiscordBot-Jarvis, 1.0.0',
    },
    ...options
  });
  // throw API errors
  if (!res.ok) {
    const data = await res.json();
    console.log(res.status);
    throw new Error(JSON.stringify(data));
  }
  // return original response
  return res;
}

export async function InstallGlobalCommands(appId, commands) {
  // API endpoint to overwrite global commands
  const endpoint = `applications/${appId}/commands`;

  try {
    // This is calling the bulk overwrite endpoint: https://discord.com/developers/docs/interactions/application-commands#bulk-overwrite-global-application-commands
    await DiscordRequest(endpoint, { method: 'PUT', body: commands });
  } catch (err) {
    console.error(err);
  }
}

// Simple method that returns a random emoji from list
export function getRandomEmoji() {
  const emojiList = ['😭','😄','😌','🤓','😎','😤','🤖','😶‍🌫️','🌏','📸','💿','👋','🌊','✨'];
  return emojiList[Math.floor(Math.random() * emojiList.length)];
}

export function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function getRandomJarvisMeme() {
  const pathToMemes = './assets/jarvis-memes';
  const files = fs.readdirSync(pathToMemes);
  const randomMeme = Math.floor(files.length * Math.random()) + '.jpg';

  return fs.createReadStream(`${pathToMemes}/${randomMeme}`);
}

export function getRandomPokemon() {
  const pathToPokemon = './pokemon';
  const files = fs.readdirSync(pathToPokemon);
  const randomPokemon = files[Math.floor(files.length * Math.random())];

  return fs.createReadStream(`${pathToPokemon}/${randomPokemon}`);
}

export function startSpawningPokemonInInterval(minTime, maxTime) {
  const randomDelay = Math.floor(Math.random() * (maxTime - minTime + 1)) + minTime;

  setTimeout(() => {
      doSomething(); // TODO: spawn pokemon
      startRandomTimer(minTime, maxTime);
  }, randomDelay);
}

