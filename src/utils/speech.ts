type Lang = 'en' | 'zh';

interface SpeechItem {
  text: string;
  lang: Lang;
}

// Voice priority lists
const EN_VOICE_NAMES = [
  'Samantha',
  'Daniel',
  'Karen',
  'Moira',
  'Tessa',
  'Fiona',
  'Alex',
  'Google US English',
  'Microsoft Aria',
  'Microsoft Jenny',
];

const EN_LANGS = ['en-US', 'en-GB', 'en-AU'];

const ZH_VOICE_NAMES = [
  'Ting-Ting',
  'Sin-ji',
  'Meijia',
  'Li-mu',
  'Yu-shu',
  'Google 普通话',
  'Microsoft Xiaoxiao',
  'Microsoft Yunxi',
];

const ZH_LANGS = ['zh-CN', 'zh-Hans', 'zh-TW', 'zh-HK'];

// Voice cache
let voicesCache: SpeechSynthesisVoice[] | null = null;
let voicesLoaded = false;

function isSpeechSupported(): boolean {
  return typeof window !== 'undefined' && 'speechSynthesis' in window;
}

function loadVoices(): Promise<SpeechSynthesisVoice[]> {
  if (!isSpeechSupported()) return Promise.resolve([]);
  if (voicesLoaded && voicesCache) return Promise.resolve(voicesCache);

  return new Promise((resolve) => {
    const voices = speechSynthesis.getVoices();
    if (voices.length > 0) {
      voicesCache = voices;
      voicesLoaded = true;
      resolve(voices);
    } else {
      const onVoicesChanged = () => {
        voicesCache = speechSynthesis.getVoices();
        voicesLoaded = true;
        speechSynthesis.removeEventListener('voiceschanged', onVoicesChanged);
        resolve(voicesCache!);
      };
      speechSynthesis.addEventListener('voiceschanged', onVoicesChanged);
      // Timeout fallback — some browsers never fire voiceschanged
      setTimeout(() => {
        if (!voicesLoaded) {
          voicesCache = speechSynthesis.getVoices();
          voicesLoaded = true;
          speechSynthesis.removeEventListener('voiceschanged', onVoicesChanged);
          resolve(voicesCache!);
        }
      }, 1000);
    }
  });
}

function getBestVoice(lang: Lang, voices: SpeechSynthesisVoice[]): SpeechSynthesisVoice | null {
  const voiceNames = lang === 'en' ? EN_VOICE_NAMES : ZH_VOICE_NAMES;
  const langPrefixes = lang === 'en' ? EN_LANGS : ZH_LANGS;

  // Match by voice name (ordered priority)
  for (const name of voiceNames) {
    const match = voices.find((v) => v.name === name);
    if (match) return match;
  }

  // Match by lang prefix (ordered priority)
  for (const prefix of langPrefixes) {
    const match = voices.find((v) => v.lang.startsWith(prefix));
    if (match) return match;
  }

  // Fallback: any voice with matching lang
  const fallback = voices.find((v) => v.lang.startsWith(lang === 'en' ? 'en' : 'zh'));
  return fallback || null;
}

// Queue state
let queue: SpeechItem[] = [];
let speaking = false;

function getParams(lang: Lang): { rate: number; pitch: number; volume: number } {
  if (lang === 'en') return { rate: 0.82, pitch: 1.0, volume: 1 };
  return { rate: 0.9, pitch: 1.0, volume: 1 };
}

async function speakItem(item: SpeechItem, voice: SpeechSynthesisVoice | null): Promise<void> {
  return new Promise((resolve) => {
    if (!isSpeechSupported()) {
      resolve();
      return;
    }
    const u = new SpeechSynthesisUtterance(item.text);
    u.lang = item.lang === 'en' ? 'en-US' : 'zh-CN';
    const params = getParams(item.lang);
    u.rate = params.rate;
    u.pitch = params.pitch;
    u.volume = params.volume;
    if (voice) u.voice = voice;
    u.onend = () => resolve();
    u.onerror = () => resolve();
    speechSynthesis.speak(u);
  });
}

async function processQueue(): Promise<void> {
  if (speaking || queue.length === 0) return;
  if (!isSpeechSupported()) {
    queue = [];
    return;
  }

  speaking = true;
  const voices = await loadVoices();

  while (queue.length > 0) {
    const item = queue[0];
    const voice = getBestVoice(item.lang, voices);
    await speakItem(item, voice);
    queue.shift();
  }

  speaking = false;
}

function cancelAndClear(): void {
  if (!isSpeechSupported()) return;
  speechSynthesis.cancel();
  queue = [];
  speaking = false;
}

export function speak(text: string, lang: Lang = 'en'): void {
  cancelAndClear();
  queue.push({ text, lang });
  processQueue();
}

export function speakSequence(items: { text: string; lang?: Lang }[]): void {
  cancelAndClear();
  for (const item of items) {
    queue.push({ text: item.text, lang: item.lang || 'en' });
  }
  processQueue();
}

export function cancelSpeech(): void {
  cancelAndClear();
}
