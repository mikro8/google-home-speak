# google-home-speak
Cast google translate voice to google home device

# Functions
## 1.init
**initializes connection to your google home device**  
has only one argument which is **ip: string**, this should be ip address of your google home  
returns promise resolving as connected media reciver object (castv2-client lib)
## 2.speak
**sends string to google translate gets the audio mime and sends it to initialized google home device**  
arguments are **text: string**, this is the sentence to say and **lang: string**, this is language in which is the text (default en)  
returns promise resolving to object with info about played media
    
# Installation (I might add it to npm/yarn later)
npm install github:mikro8/google-home-speak

# Example
```js
const googleHomeSpeak = require("google-home-speak");

(async () => {
  const sc = new googleHomeSpeak();
  await sc.init("192.168.1.207");

  // console.log(dd);

  const speak = [
    "Hello my name is bixby",
    "Actually i was lying",
    "HA HA HA",
    "Ich spreche Deutsch|de",
    "Ja mówię po polsku|pl",
    "я говорю по-русски|ru",
    "Vorbesc romaneste|ro",
    "chuj chuj chuj|pl",
  ];

  for (let i = 0; i < speak.length; i++) {
    const txt = speak[i].split("|")[0];
    const lang = speak[i].split("|")[1] || "en";
    await sc.speak(txt, lang);
  }

  process.exit();
})();
```
