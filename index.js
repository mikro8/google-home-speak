const mime = require("mime-types");
const DefaultMediaReceiver = require("castv2-client").DefaultMediaReceiver;
const googleTTS = require("google-tts-api");
const Client = require("castv2-client").Client;

function googleHomeSpeak() {
  this._client = new Client();
  this._player = null;
}

googleHomeSpeak.prototype.init = function (ip) {
  return new Promise((resolve, reject) => {
    this._client.connect(ip, () => {
      this._client.launch(DefaultMediaReceiver, (err, player) => {
        if (err) return reject(err);
        this._player = player;
        resolve(this._player);
      });
    });
  });
};

googleHomeSpeak.prototype.speak = function (text, lang) {
  const url = googleTTS.getAudioUrl(text, {
    lang: lang,
    slow: false,
    host: "https://translate.google.com",
  });
  const params = {
    contentId: url,
    contentType: mime.lookup(url) || "audio/mp3",
    streamType: "BUFFERED",
  };

  return new Promise((resolve, reject) => {
    this._player.load(params, { autoplay: true }, (err, status) => {
      if (err) return reject(err);
      setTimeout(() => resolve(status), status.media.duration * 1000 + 200);
    });
  });
};

module.exports = googleHomeSpeak;
