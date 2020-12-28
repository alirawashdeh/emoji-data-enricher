const fetch = require('node-fetch');
const fs = require('fs');

async function start() {

  const emojiListResponse = await fetch('https://raw.githubusercontent.com/alirawashdeh/emoji-list-fetcher/master/emoji-list.json');
  const emojiListJson = await emojiListResponse.json();
  console.log(emojiListJson);

  const emojiDataResponse = await fetch('https://raw.githubusercontent.com/iamcal/emoji-data/master/emoji.json');
  const emojiDataJson = await emojiDataResponse.json();
  console.log(emojiDataJson);

  for(var i = 0; i < emojiDataJson.length; i++) {
    for (var j = 0; j < emojiListJson.length; j++) {
      if(emojiDataJson[i].unified == emojiListJson[j].unified)
      {
        emojiDataJson[i].keywords = emojiListJson[j].keywords.split("|");
        break;
      }
    }
  }

  var json = JSON.stringify(emojiDataJson, null, "\t");
  fs.writeFileSync('emoji-withkeywords.json', json);
}

start();
