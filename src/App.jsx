import { useState, useEffect, useCallback } from "react";

// ─── Data ───────────────────────────────────────────────────────────────────

const HIRAGANA = [
  { kana:'あ',romaji:'a' },{ kana:'い',romaji:'i' },{ kana:'う',romaji:'u' },{ kana:'え',romaji:'e' },{ kana:'お',romaji:'o' },
  { kana:'か',romaji:'ka' },{ kana:'き',romaji:'ki' },{ kana:'く',romaji:'ku' },{ kana:'け',romaji:'ke' },{ kana:'こ',romaji:'ko' },
  { kana:'さ',romaji:'sa' },{ kana:'し',romaji:'shi' },{ kana:'す',romaji:'su' },{ kana:'せ',romaji:'se' },{ kana:'そ',romaji:'so' },
  { kana:'た',romaji:'ta' },{ kana:'ち',romaji:'chi' },{ kana:'つ',romaji:'tsu' },{ kana:'て',romaji:'te' },{ kana:'と',romaji:'to' },
  { kana:'な',romaji:'na' },{ kana:'に',romaji:'ni' },{ kana:'ぬ',romaji:'nu' },{ kana:'ね',romaji:'ne' },{ kana:'の',romaji:'no' },
  { kana:'は',romaji:'ha' },{ kana:'ひ',romaji:'hi' },{ kana:'ふ',romaji:'fu' },{ kana:'へ',romaji:'he' },{ kana:'ほ',romaji:'ho' },
  { kana:'ま',romaji:'ma' },{ kana:'み',romaji:'mi' },{ kana:'む',romaji:'mu' },{ kana:'め',romaji:'me' },{ kana:'も',romaji:'mo' },
  { kana:'や',romaji:'ya' },{ kana:'ゆ',romaji:'yu' },{ kana:'よ',romaji:'yo' },
  { kana:'ら',romaji:'ra' },{ kana:'り',romaji:'ri' },{ kana:'る',romaji:'ru' },{ kana:'れ',romaji:'re' },{ kana:'ろ',romaji:'ro' },
  { kana:'わ',romaji:'wa' },{ kana:'を',romaji:'wo' },{ kana:'ん',romaji:'n' },
];

const KATAKANA = [
  { kana:'ア',romaji:'a' },{ kana:'イ',romaji:'i' },{ kana:'ウ',romaji:'u' },{ kana:'エ',romaji:'e' },{ kana:'オ',romaji:'o' },
  { kana:'カ',romaji:'ka' },{ kana:'キ',romaji:'ki' },{ kana:'ク',romaji:'ku' },{ kana:'ケ',romaji:'ke' },{ kana:'コ',romaji:'ko' },
  { kana:'サ',romaji:'sa' },{ kana:'シ',romaji:'shi' },{ kana:'ス',romaji:'su' },{ kana:'セ',romaji:'se' },{ kana:'ソ',romaji:'so' },
  { kana:'タ',romaji:'ta' },{ kana:'チ',romaji:'chi' },{ kana:'ツ',romaji:'tsu' },{ kana:'テ',romaji:'te' },{ kana:'ト',romaji:'to' },
  { kana:'ナ',romaji:'na' },{ kana:'ニ',romaji:'ni' },{ kana:'ヌ',romaji:'nu' },{ kana:'ネ',romaji:'ne' },{ kana:'ノ',romaji:'no' },
  { kana:'ハ',romaji:'ha' },{ kana:'ヒ',romaji:'hi' },{ kana:'フ',romaji:'fu' },{ kana:'ヘ',romaji:'he' },{ kana:'ホ',romaji:'ho' },
  { kana:'マ',romaji:'ma' },{ kana:'ミ',romaji:'mi' },{ kana:'ム',romaji:'mu' },{ kana:'メ',romaji:'me' },{ kana:'モ',romaji:'mo' },
  { kana:'ヤ',romaji:'ya' },{ kana:'ユ',romaji:'yu' },{ kana:'ヨ',romaji:'yo' },
  { kana:'ラ',romaji:'ra' },{ kana:'リ',romaji:'ri' },{ kana:'ル',romaji:'ru' },{ kana:'レ',romaji:'re' },{ kana:'ロ',romaji:'ro' },
  { kana:'ワ',romaji:'wa' },{ kana:'ヲ',romaji:'wo' },{ kana:'ン',romaji:'n' },
];

const VOCABULARY = [
  { kanji:'日本語',kana:'にほんご',romaji:'nihongo',meaning:'Japanese language',level:'N5',category:'Language' },
  { kanji:'先生',kana:'せんせい',romaji:'sensei',meaning:'teacher',level:'N5',category:'People' },
  { kanji:'学生',kana:'がくせい',romaji:'gakusei',meaning:'student',level:'N5',category:'People' },
  { kanji:'友達',kana:'ともだち',romaji:'tomodachi',meaning:'friend',level:'N5',category:'People' },
  { kanji:'水',kana:'みず',romaji:'mizu',meaning:'water',level:'N5',category:'Nature' },
  { kanji:'食べる',kana:'たべる',romaji:'taberu',meaning:'to eat',level:'N5',category:'Verbs' },
  { kanji:'飲む',kana:'のむ',romaji:'nomu',meaning:'to drink',level:'N5',category:'Verbs' },
  { kanji:'行く',kana:'いく',romaji:'iku',meaning:'to go',level:'N5',category:'Verbs' },
  { kanji:'大きい',kana:'おおきい',romaji:'ookii',meaning:'big',level:'N5',category:'Adjectives' },
  { kanji:'小さい',kana:'ちいさい',romaji:'chiisai',meaning:'small',level:'N5',category:'Adjectives' },
  { kanji:'電車',kana:'でんしゃ',romaji:'densha',meaning:'train',level:'N4',category:'Transport' },
  { kanji:'図書館',kana:'としょかん',romaji:'toshokan',meaning:'library',level:'N4',category:'Places' },
  { kanji:'勉強',kana:'べんきょう',romaji:'benkyou',meaning:'study',level:'N4',category:'Education' },
  { kanji:'家族',kana:'かぞく',romaji:'kazoku',meaning:'family',level:'N4',category:'People' },
  { kanji:'桜',kana:'さくら',romaji:'sakura',meaning:'cherry blossom',level:'N3',category:'Nature' },
  { kanji:'夢',kana:'ゆめ',romaji:'yume',meaning:'dream',level:'N3',category:'Abstract' },
  { kanji:'経済',kana:'けいざい',romaji:'keizai',meaning:'economy',level:'N2',category:'Society' },
  { kanji:'政治',kana:'せいじ',romaji:'seiji',meaning:'politics',level:'N2',category:'Society' },
];

const GRAMMAR = [
  { level:'Beginner', lessons:[
    { title:'は (wa) — Topic Marker', explanation:'は marks the topic of a sentence. Despite being written as は (ha), it is always pronounced "wa" when used as a particle. It tells the listener what the sentence is about.', examples:[{ jp:'私は学生です。',romaji:'Watashi wa gakusei desu.',en:'I am a student.' },{ jp:'猫は可愛いです。',romaji:'Neko wa kawaii desu.',en:'Cats are cute.' }], tip:'は is pronounced "wa" as a particle, not "ha"!' },
    { title:'です (desu) — Polite Copula', explanation:'です is placed at the end of sentences to make them polite. It acts like "is / am / are" in English and is essential for formal speech.', examples:[{ jp:'これはペンです。',romaji:'Kore wa pen desu.',en:'This is a pen.' },{ jp:'田中さんは先生です。',romaji:'Tanaka-san wa sensei desu.',en:'Mr. Tanaka is a teacher.' }], tip:'The "u" in desu is often silent in natural speech — sounds like "dess".' },
    { title:'の (no) — Possessive', explanation:'の connects two nouns to show possession or relationship, similar to "\'s" in English.', examples:[{ jp:'私の本です。',romaji:'Watashi no hon desu.',en:'It is my book.' },{ jp:'日本の食べ物',romaji:'Nihon no tabemono',en:'Japanese food' }], tip:'の can also nominalize verbs and adjectives, turning them into noun phrases.' },
    { title:'を (wo) — Object Marker', explanation:'を marks the direct object of a verb — the thing that the action is done to.', examples:[{ jp:'水を飲みます。',romaji:'Mizu wo nomimasu.',en:'I drink water.' },{ jp:'本を読みます。',romaji:'Hon wo yomimasu.',en:'I read a book.' }], tip:'を is almost never used outside of this grammatical role — one of the easiest particles to remember!' },
  ]},
  { level:'Intermediate', lessons:[
    { title:'て-form — Connecting Actions', explanation:'The て-form connects multiple verbs in sequence. It is the foundation for many grammatical patterns in Japanese.', examples:[{ jp:'食べて、飲みます。',romaji:'Tabete, nomimasu.',en:'I eat and (then) drink.' },{ jp:'起きてから、シャワーを浴びます。',romaji:'Okite kara, shawaa wo abimasu.',en:'After waking up, I take a shower.' }], tip:'て-form is the gateway to patterns like てください, ている, てもいい, and many more.' },
    { title:'たい (tai) — Want to Do', explanation:'Attach たい to the verb stem to express a desire to do something. It conjugates like an i-adjective.', examples:[{ jp:'日本に行きたいです。',romaji:'Nihon ni ikitai desu.',en:'I want to go to Japan.' },{ jp:'寿司を食べたい。',romaji:'Sushi wo tabetai.',en:'I want to eat sushi.' }], tip:'たい conjugates like an i-adjective: たくない (don\'t want), たかった (wanted to).' },
    { title:'〜ている — Ongoing Action', explanation:'ている (te-iru) expresses an ongoing or continuous action, like the English "-ing" form. It can also describe a resulting state.', examples:[{ jp:'今、食べています。',romaji:'Ima, tabete imasu.',en:'I am eating right now.' },{ jp:'結婚しています。',romaji:'Kekkon shite imasu.',en:'I am married. (resulting state)' }], tip:'In casual speech, ている often shortens to てる — tabeteru instead of tabeteiru.' },
  ]},
  { level:'Advanced', lessons:[
    { title:'ば (ba) — Conditional', explanation:'The ば conditional expresses "if X, then Y." It is used for hypothetical or natural general conditions, where the result logically follows.', examples:[{ jp:'勉強すれば、合格できます。',romaji:'Benkyou sureba, goukaku dekimasu.',en:'If you study, you can pass.' },{ jp:'春になれば、桜が咲きます。',romaji:'Haru ni nareba, sakura ga sakimasu.',en:'When spring comes, cherry blossoms bloom.' }], tip:'ば is preferred when the result naturally follows; contrast with たら used for specific, one-time events.' },
    { title:'に対して — Toward / Regarding', explanation:'Expresses an attitude, action, or feeling directed toward a person, group, or topic. Common in formal and written Japanese.', examples:[{ jp:'環境問題に対して関心があります。',romaji:'Kankyou mondai ni taishite kanshin ga arimasu.',en:'I am interested in environmental issues.' },{ jp:'先生に対して敬語を使います。',romaji:'Sensei ni taishite keigo wo tsukaimasu.',en:'I use respectful language toward teachers.' }], tip:'に対して is often used to contrast two opposing attitudes or reactions.' },
    { title:'ものの — Although / Even Though', explanation:'ものの connects two clauses where the second contradicts the expectation set by the first. Similar to "although" or "even though" in formal English.', examples:[{ jp:'行くものの、楽しくない。',romaji:'Iku monono, tanoshikunai.',en:'Although I go, it\'s not fun.' },{ jp:'知っているものの、言えない。',romaji:'Shitte iru monono, ienai.',en:'Although I know, I cannot say it.' }], tip:'ものの is more formal and literary than けど or が — mostly found in writing.' },
  ]},
];

// ─── Utilities ──────────────────────────────────────────────────────────────

function speak(text) {
  if (!('speechSynthesis' in window)) return;
  window.speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.lang = 'ja-JP'; u.rate = 0.85;
  window.speechSynthesis.speak(u);
}

// ─── Styles ─────────────────────────────────────────────────────────────────

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@300;400;500;700&family=Syne:wght@400;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;1,9..40,400&display=swap');

*, *::before, *::after { margin:0; padding:0; box-sizing:border-box; -webkit-tap-highlight-color: transparent; }

:root {
  --bg: #07070f;
  --surf: #0d0d1a;
  --card: #111120;
  --card2: #16162a;
  --red: #d42b2b;
  --red-dim: rgba(212,43,43,0.12);
  --gold: #e8a020;
  --text: #e4e4f0;
  --muted: #585870;
  --border: #1c1c30;
  --green: #27ae60;
  --green-dim: rgba(39,174,96,0.1);
  --nav-h: 58px;
  --safe-bottom: env(safe-area-inset-bottom, 0px);
}

html { height: 100%; overscroll-behavior: none; }

body {
  background: var(--bg);
  color: var(--text);
  font-family: 'DM Sans', sans-serif;
  min-height: 100%;
  min-height: 100dvh;
  overscroll-behavior: none;
  -webkit-font-smoothing: antialiased;
}

/* ── Layout ── */
.app { display: flex; flex-direction: column; min-height: 100dvh; }

/* ── Top bar (desktop) ── */
.topbar {
  display: flex; align-items: center; justify-content: space-between;
  background: var(--surf); border-bottom: 1px solid var(--border);
  padding: 0 28px; height: var(--nav-h);
  position: sticky; top: 0; z-index: 200;
}
.logo { font-family: 'Syne', sans-serif; font-weight: 800; display: flex; align-items: center; gap: 10px; }
.logo-jp { color: var(--red); font-family: 'Noto Sans JP', sans-serif; font-size: 1.4rem; }
.logo-en { font-size: .9rem; letter-spacing: .12em; }
.desk-nav { display: flex; gap: 2px; }
.dn-btn {
  background: none; border: none; color: var(--muted);
  padding: 8px 15px; border-radius: 8px; cursor: pointer;
  font-family: 'DM Sans', sans-serif; font-size: .82rem; font-weight: 500;
  letter-spacing: .03em; transition: all .2s;
}
.dn-btn:hover { color: var(--text); background: var(--card); }
.dn-btn.on { color: var(--red); background: var(--red-dim); }
.romaji-toggle { display: flex; align-items: center; gap: 8px; cursor: pointer; user-select: none; font-size: .78rem; color: var(--muted); }
.sw { width: 34px; height: 19px; background: var(--border); border-radius: 10px; position: relative; transition: background .3s; flex-shrink: 0; }
.sw.on { background: var(--red); }
.sk { width: 13px; height: 13px; background: #fff; border-radius: 50%; position: absolute; top: 3px; left: 3px; transition: left .3s; }
.sw.on .sk { left: 18px; }

/* ── Scrollable content ── */
.content { flex: 1; overflow-y: auto; -webkit-overflow-scrolling: touch; padding: 24px 20px 24px; }
@media (min-width: 640px) { .content { padding: 30px 28px; max-width: 1080px; margin: 0 auto; width: 100%; } }

/* ── Bottom nav (mobile) ── */
.botnav {
  display: none;
  position: fixed; bottom: 0; left: 0; right: 0; z-index: 200;
  background: var(--surf); border-top: 1px solid var(--border);
  padding-bottom: var(--safe-bottom);
}
.botnav-inner { display: flex; }
.bn-btn {
  flex: 1; background: none; border: none; color: var(--muted);
  padding: 10px 6px 8px; cursor: pointer; font-family: 'DM Sans', sans-serif;
  font-size: .6rem; font-weight: 500; letter-spacing: .04em; transition: color .2s;
  display: flex; flex-direction: column; align-items: center; gap: 4px;
}
.bn-icon { font-size: 1.35rem; line-height: 1; }
.bn-btn.on { color: var(--red); }
.bn-btn:active { opacity: .7; }

/* Mobile: hide topbar nav, show botnav */
@media (max-width: 639px) {
  .desk-nav { display: none; }
  .botnav { display: block; }
  .content { padding-bottom: calc(70px + var(--safe-bottom)); }
}

/* ── Section title ── */
.stitle {
  font-family: 'Syne', sans-serif; font-weight: 800; font-size: 1.4rem;
  margin-bottom: 22px; display: flex; align-items: center; gap: 14px;
}
.stitle::after { content:''; flex:1; height:1px; background:var(--border); }

/* ── Dashboard stats ── */
.stats-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 12px; margin-bottom: 22px; }
@media (max-width: 400px) { .stats-grid { grid-template-columns: 1fr 1fr; } }
.stat-card {
  background: var(--card); border: 1px solid var(--border); border-radius: 14px;
  padding: 18px 16px; transition: border-color .25s;
}
.stat-card:hover { border-color: rgba(212,43,43,.4); }
.stat-label { font-size: .68rem; text-transform: uppercase; letter-spacing: .1em; color: var(--muted); margin-bottom: 6px; }
.stat-val { font-family: 'Syne', sans-serif; font-size: 1.8rem; font-weight: 800; line-height: 1; }
.stat-val span { font-size: .8rem; color: var(--muted); font-family: 'DM Sans', sans-serif; font-weight: 400; }
.stat-sub { font-size: .72rem; color: var(--muted); margin-top: 3px; }
.pbar { margin-top: 10px; height: 3px; background: var(--border); border-radius: 2px; overflow: hidden; }
.pbar-fill { height: 100%; background: linear-gradient(90deg, var(--red), var(--gold)); border-radius: 2px; transition: width .9s ease; }

/* Quick start */
.qs { background: var(--card); border: 1px solid var(--border); border-radius: 14px; padding: 20px; }
.qs-title { font-family: 'Syne', sans-serif; font-weight: 700; font-size: .95rem; margin-bottom: 14px; }
.qs-grid { display: grid; grid-template-columns: repeat(4,1fr); gap: 10px; }
@media (max-width: 400px) { .qs-grid { grid-template-columns: repeat(2,1fr); } }
.qs-btn {
  background: var(--card2); border: 1px solid var(--border); border-radius: 12px;
  padding: 16px 8px; cursor: pointer; text-align: center; transition: all .2s; color: var(--text);
}
.qs-btn:hover, .qs-btn:active { border-color: rgba(212,43,43,.5); transform: translateY(-2px); }
.qs-icon { font-size: 1.8rem; margin-bottom: 6px; font-family: 'Noto Sans JP', sans-serif; }
.qs-label { font-size: .72rem; color: var(--muted); }

/* ── Kana ── */
.kana-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 16px; flex-wrap: wrap; gap: 10px; }
.kana-hint { color: var(--muted); font-size: .78rem; margin-bottom: 16px; }
.seg { display: flex; gap: 4px; background: var(--card); border: 1px solid var(--border); border-radius: 20px; padding: 3px; }
.seg-btn {
  background: none; border: none; color: var(--muted); padding: 6px 16px; border-radius: 16px;
  cursor: pointer; font-family: 'DM Sans', sans-serif; font-size: .8rem; transition: all .2s;
}
.seg-btn.on { background: var(--red); color: #fff; }
.kana-grid { display: grid; grid-template-columns: repeat(5,1fr); gap: 8px; }
@media (min-width: 640px) { .kana-grid { gap: 10px; } }
.kana-card {
  background: var(--card); border: 1px solid var(--border); border-radius: 11px;
  padding: 12px 6px; text-align: center; cursor: pointer; transition: all .2s; position: relative;
  user-select: none;
}
.kana-card:active { transform: scale(.95); }
.kana-card.learned { border-color: var(--green); background: var(--green-dim); }
.kana-char { font-family: 'Noto Sans JP', sans-serif; font-size: 1.6rem; line-height: 1; margin-bottom: 5px; }
@media (min-width: 640px) { .kana-char { font-size: 1.9rem; } }
.kana-rom { font-size: .65rem; color: var(--muted); letter-spacing: .03em; }
.kana-sound {
  position: absolute; top: 4px; right: 4px;
  background: none; border: none; font-size: .7rem; cursor: pointer; color: var(--muted);
  padding: 3px; line-height: 1; transition: color .2s; z-index: 2;
}
.kana-sound:hover { color: var(--gold); }
.kana-sound.playing { color: var(--gold); }
.learned-dot { position: absolute; top: 5px; left: 5px; width: 6px; height: 6px; background: var(--green); border-radius: 50%; }

/* ── Vocab flashcard ── */
.vocab-filters { display: flex; gap: 6px; align-items: center; flex-wrap: wrap; margin-bottom: 20px; }
.vf-label { font-size: .75rem; color: var(--muted); }
.pill {
  padding: 6px 14px; border-radius: 16px; border: 1px solid var(--border);
  background: none; color: var(--muted); cursor: pointer; font-family: 'DM Sans', sans-serif;
  font-size: .78rem; transition: all .2s;
}
.pill.on { background: var(--red); border-color: var(--red); color: #fff; }
.fc-area { display: flex; flex-direction: column; align-items: center; }
.fc-count { color: var(--muted); font-size: .8rem; margin-bottom: 12px; }
.flashcard { width: 100%; max-width: 420px; height: 230px; perspective: 1000px; cursor: pointer; margin-bottom: 16px; }
@media (min-width: 640px) { .flashcard { height: 260px; } }
.fc-inner { width:100%; height:100%; transform-style:preserve-3d; transition:transform .5s ease; position:relative; }
.fc-inner.flipped { transform: rotateY(180deg); }
.fc-face {
  position:absolute; width:100%; height:100%; backface-visibility:hidden;
  background: var(--card); border: 1px solid var(--border); border-radius: 18px;
  display:flex; flex-direction:column; align-items:center; justify-content:center; padding:24px; gap:6px;
}
.fc-back { transform:rotateY(180deg); background: var(--card2); }
.fc-kanji { font-family:'Noto Sans JP',sans-serif; font-size:3rem; color:var(--text); line-height:1; }
.fc-kana { font-family:'Noto Sans JP',sans-serif; font-size:.95rem; color:var(--muted); }
.fc-romaji { font-size:.82rem; color:var(--gold); }
.fc-level { font-size:.68rem; padding:3px 10px; border-radius:8px; background:var(--red-dim); color:var(--red); border:1px solid rgba(212,43,43,.3); }
.fc-hint { font-size:.72rem; color:var(--muted); margin-top:8px; }
.fc-meaning { font-size:1.35rem; font-weight:500; color:var(--text); }
.fc-cat { font-size:.7rem; padding:3px 10px; border-radius:8px; background:var(--card); color:var(--muted); border:1px solid var(--border); }
.fc-controls { display:flex; align-items:center; gap:10px; flex-wrap:wrap; justify-content:center; }
.fc-arrow { background:var(--card); border:1px solid var(--border); color:var(--text); width:40px; height:40px; border-radius:50%; cursor:pointer; font-size:1rem; transition:all .2s; display:flex; align-items:center; justify-content:center; flex-shrink:0; }
.fc-arrow:hover { border-color:var(--red); }
.fc-arrow:active { transform: scale(.9); }
.speak-btn {
  background:none; border:1px solid var(--border); color:var(--muted);
  padding:8px 14px; border-radius:18px; cursor:pointer; font-size:.78rem;
  transition:all .2s; display:flex; align-items:center; gap:5px; font-family:'DM Sans',sans-serif;
}
.speak-btn:hover, .speak-btn.playing { border-color:var(--gold); color:var(--gold); }
.mark-btn {
  background:var(--card); border:1px solid var(--border); color:var(--muted);
  padding:8px 16px; border-radius:18px; cursor:pointer; font-size:.78rem;
  transition:all .2s; font-family:'DM Sans',sans-serif;
}
.mark-btn.marked { border-color:var(--green); color:var(--green); background:var(--green-dim); }
.mark-btn:hover { border-color:var(--green); color:var(--green); }

/* ── Grammar ── */
.gram-layout { display:flex; gap:20px; align-items:flex-start; }
.gram-sidebar { width:180px; flex-shrink:0; }
.gram-content { flex:1; min-width:0; }
@media (max-width:639px) { .gram-layout { flex-direction:column; } .gram-sidebar { width:100%; } }
.gram-group { margin-bottom:16px; }
.gram-group-title { font-size:.68rem; text-transform:uppercase; letter-spacing:.1em; color:var(--muted); margin-bottom:6px; padding-left:4px; }
.gram-lesson {
  width:100%; background:none; border:1px solid transparent; color:var(--muted);
  padding:8px 10px; border-radius:8px; cursor:pointer; text-align:left;
  font-size:.78rem; font-family:'DM Sans',sans-serif; transition:all .2s; display:block; margin-bottom:3px;
}
.gram-lesson:hover { color:var(--text); background:var(--card); }
.gram-lesson.on { color:var(--red); background:var(--red-dim); border-color:rgba(212,43,43,.25); }

/* Mobile: horizontal scroll for grammar sidebar */
@media (max-width:639px) {
  .gram-sidebar { overflow-x:auto; padding-bottom:4px; }
  .gram-group { display:inline-flex; align-items:center; gap:4px; flex-wrap:nowrap; margin-bottom:0; margin-right:12px; vertical-align:middle; }
  .gram-group-title { white-space:nowrap; margin-bottom:0; }
  .gram-lesson { white-space:nowrap; display:inline-block; width:auto; margin-bottom:0; }
  .gram-layout { flex-direction:column; }
}

.lesson-card { background:var(--card); border:1px solid var(--border); border-radius:14px; padding:22px; }
.lesson-title { font-family:'Syne',sans-serif; font-weight:700; font-size:1.15rem; margin-bottom:10px; }
.lesson-expl { color:var(--muted); line-height:1.8; margin-bottom:18px; font-size:.85rem; }
.examples-label { font-size:.68rem; text-transform:uppercase; letter-spacing:.1em; color:var(--muted); margin-bottom:9px; }
.example { background:var(--card2); border-radius:10px; padding:13px; margin-bottom:9px; }
.ex-row { display:flex; align-items:center; justify-content:space-between; gap:8px; margin-bottom:4px; }
.ex-jp { font-family:'Noto Sans JP',sans-serif; font-size:1.05rem; }
.ex-rm { font-size:.78rem; color:var(--gold); margin-bottom:3px; }
.ex-en { font-size:.8rem; color:var(--muted); }
.tip-box { background:rgba(232,160,32,.07); border:1px solid rgba(232,160,32,.2); border-radius:9px; padding:12px 14px; margin-top:14px; font-size:.81rem; color:var(--gold); line-height:1.7; }
.tip-box b { margin-right:4px; }

/* ── Animations ── */
@keyframes fadeIn { from{opacity:0;transform:translateY(8px)} to{opacity:1;transform:translateY(0)} }
.fade-in { animation: fadeIn .3s ease forwards; }
@keyframes pulse { 0%,100%{opacity:1} 50%{opacity:.4} }
.pulsing { animation: pulse .8s infinite; }

/* ── Install banner ── */
.install-banner {
  background:var(--card); border:1px solid rgba(232,160,32,.3); border-radius:12px;
  padding:14px 16px; margin-bottom:20px; display:flex; align-items:center; justify-content:space-between; gap:12px;
}
.install-text { font-size:.82rem; color:var(--text); }
.install-text b { color:var(--gold); }
.install-btns { display:flex; gap:8px; flex-shrink:0; }
.install-go { background:var(--gold); border:none; color:#000; padding:7px 14px; border-radius:8px; cursor:pointer; font-size:.78rem; font-weight:600; font-family:'DM Sans',sans-serif; transition:opacity .2s; }
.install-go:hover { opacity:.85; }
.install-close { background:none; border:1px solid var(--border); color:var(--muted); padding:7px 10px; border-radius:8px; cursor:pointer; font-size:.78rem; font-family:'DM Sans',sans-serif; }
`;

// ─── Main Component ──────────────────────────────────────────────────────────

const TABS = [
  { id:'dashboard', icon:'🏠', label:'Home' },
  { id:'kana',      icon:'あ', label:'Kana' },
  { id:'vocabulary',icon:'語', label:'Vocab' },
  { id:'grammar',   icon:'文', label:'Grammar' },
];

export default function App() {
  const [tab, setTab] = useState('dashboard');
  const [romaji, setRomaji] = useState(true);
  const [kanaType, setKanaType] = useState('hiragana');
  const [learnedKana, setLearnedKana] = useState(() => {
    try { return new Set(JSON.parse(localStorage.getItem('lk')||'[]')); } catch { return new Set(); }
  });
  const [learnedVocab, setLearnedVocab] = useState(() => {
    try { return new Set(JSON.parse(localStorage.getItem('lv')||'[]')); } catch { return new Set(); }
  });
  const [vIdx, setVIdx] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [vLevel, setVLevel] = useState('All');
  const [gLevel, setGLevel] = useState('Beginner');
  const [gLesson, setGLesson] = useState(0);
  const [playing, setPlaying] = useState(null);
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showInstall, setShowInstall] = useState(false);
  const [installDismissed, setInstallDismissed] = useState(false);

  // Save progress
  useEffect(() => { try { localStorage.setItem('lk', JSON.stringify([...learnedKana])); } catch {} }, [learnedKana]);
  useEffect(() => { try { localStorage.setItem('lv', JSON.stringify([...learnedVocab])); } catch {} }, [learnedVocab]);

  // PWA install prompt
  useEffect(() => {
    const handler = (e) => { e.preventDefault(); setDeferredPrompt(e); setShowInstall(true); };
    window.addEventListener('beforeinstallprompt', handler);
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const say = useCallback((text, id) => {
    setPlaying(id); speak(text);
    setTimeout(() => setPlaying(p => p===id ? null : p), 1800);
  }, []);

  const fv = vLevel === 'All' ? VOCABULARY : VOCABULARY.filter(v => v.level === vLevel);
  const word = fv[Math.min(vIdx, fv.length-1)];
  const gGroup = GRAMMAR.find(g => g.level === gLevel);
  const lesson = gGroup?.lessons[gLesson];

  const toggleKana = (k) => setLearnedKana(p => { const n=new Set(p); n.has(k)?n.delete(k):n.add(k); return n; });
  const toggleVocab = (k) => setLearnedVocab(p => { const n=new Set(p); n.has(k)?n.delete(k):n.add(k); return n; });
  const nextCard = () => { setFlipped(false); setTimeout(()=>setVIdx(i=>(i+1)%fv.length),150); };
  const prevCard = () => { setFlipped(false); setTimeout(()=>setVIdx(i=>(i-1+fv.length)%fv.length),150); };

  const hLearned = [...learnedKana].filter(k=>HIRAGANA.some(h=>h.kana===k)).length;
  const kLearned = [...learnedKana].filter(k=>KATAKANA.some(h=>h.kana===k)).length;
  const vocabPct = Math.round(learnedVocab.size/VOCABULARY.length*100);

  const handleInstall = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    await deferredPrompt.userChoice;
    setDeferredPrompt(null); setShowInstall(false);
  };

  return (
    <>
      <style>{CSS}</style>
      <div className="app">

        {/* Top bar */}
        <header className="topbar">
          <div className="logo">
            <span className="logo-jp">日本語</span>
            <span className="logo-en">NIHONGO</span>
          </div>
          <nav className="desk-nav">
            {TABS.map(t=>(
              <button key={t.id} className={`dn-btn ${tab===t.id?'on':''}`} onClick={()=>setTab(t.id)}>
                {t.label}
              </button>
            ))}
          </nav>
          <label className="romaji-toggle" onClick={()=>setRomaji(r=>!r)}>
            <div className={`sw ${romaji?'on':''}`}><div className="sk"/></div>
            Rōmaji
          </label>
        </header>

        {/* Content */}
        <div className="content">

          {/* Install banner */}
          {showInstall && !installDismissed && (
            <div className="install-banner">
              <div className="install-text">📲 <b>Install Nihongo</b> as an app on your device</div>
              <div className="install-btns">
                <button className="install-go" onClick={handleInstall}>Install</button>
                <button className="install-close" onClick={()=>setInstallDismissed(true)}>✕</button>
              </div>
            </div>
          )}

          {/* ── DASHBOARD ── */}
          {tab==='dashboard' && (
            <div className="fade-in">
              <div className="stitle">ようこそ — Welcome</div>
              <div className="stats-grid">
                <div className="stat-card">
                  <div className="stat-label">Hiragana</div>
                  <div className="stat-val">{hLearned}<span>/{HIRAGANA.length}</span></div>
                  <div className="stat-sub">learned</div>
                  <div className="pbar"><div className="pbar-fill" style={{width:`${Math.round(hLearned/HIRAGANA.length*100)}%`}}/></div>
                </div>
                <div className="stat-card">
                  <div className="stat-label">Katakana</div>
                  <div className="stat-val">{kLearned}<span>/{KATAKANA.length}</span></div>
                  <div className="stat-sub">learned</div>
                  <div className="pbar"><div className="pbar-fill" style={{width:`${Math.round(kLearned/KATAKANA.length*100)}%`}}/></div>
                </div>
                <div className="stat-card">
                  <div className="stat-label">Vocabulary</div>
                  <div className="stat-val">{learnedVocab.size}<span>/{VOCABULARY.length}</span></div>
                  <div className="stat-sub">{vocabPct}% done</div>
                  <div className="pbar"><div className="pbar-fill" style={{width:`${vocabPct}%`}}/></div>
                </div>
              </div>
              <div className="qs">
                <div className="qs-title">Quick Start</div>
                <div className="qs-grid">
                  {[['あ','Hiragana','kana','hiragana'],['ア','Katakana','kana','katakana'],['語','Vocabulary','vocabulary',null],['文','Grammar','grammar',null]].map(([icon,label,t,kt])=>(
                    <div key={label} className="qs-btn" onClick={()=>{setTab(t);if(kt)setKanaType(kt);}}>
                      <div className="qs-icon">{icon}</div>
                      <div className="qs-label">{label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ── KANA ── */}
          {tab==='kana' && (
            <div className="fade-in">
              <div className="kana-header">
                <div className="stitle" style={{marginBottom:0}}>Kana</div>
                <div className="seg">
                  <button className={`seg-btn ${kanaType==='hiragana'?'on':''}`} onClick={()=>setKanaType('hiragana')}>Hiragana</button>
                  <button className={`seg-btn ${kanaType==='katakana'?'on':''}`} onClick={()=>setKanaType('katakana')}>Katakana</button>
                </div>
              </div>
              <p className="kana-hint">Tap to mark as learned · 🔊 to hear pronunciation</p>
              <div className="kana-grid">
                {(kanaType==='hiragana'?HIRAGANA:KATAKANA).map(item=>(
                  <div key={item.kana} className={`kana-card ${learnedKana.has(item.kana)?'learned':''}`} onClick={()=>toggleKana(item.kana)}>
                    {learnedKana.has(item.kana) && <div className="learned-dot"/>}
                    <button className={`kana-sound ${playing===item.kana?'playing':''}`}
                      onClick={e=>{e.stopPropagation();say(item.kana,item.kana);}}>🔊</button>
                    <div className="kana-char">{item.kana}</div>
                    {romaji && <div className="kana-rom">{item.romaji}</div>}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── VOCABULARY ── */}
          {tab==='vocabulary' && word && (
            <div className="fade-in">
              <div className="stitle">Vocabulary</div>
              <div className="vocab-filters">
                <span className="vf-label">JLPT:</span>
                {['All','N5','N4','N3','N2'].map(l=>(
                  <button key={l} className={`pill ${vLevel===l?'on':''}`}
                    onClick={()=>{setVLevel(l);setVIdx(0);setFlipped(false);}}>
                    {l}
                  </button>
                ))}
              </div>
              <div className="fc-area">
                <div className="fc-count">{vIdx+1} / {fv.length} · {learnedVocab.size} learned</div>
                <div className="flashcard" onClick={()=>setFlipped(f=>!f)}>
                  <div className={`fc-inner ${flipped?'flipped':''}`}>
                    <div className="fc-face">
                      <div className="fc-kanji">{word.kanji}</div>
                      <div className="fc-kana">{word.kana}</div>
                      {romaji && <div className="fc-romaji">{word.romaji}</div>}
                      <span className="fc-level">{word.level}</span>
                      <div className="fc-hint">tap to reveal</div>
                    </div>
                    <div className="fc-face fc-back">
                      <div className="fc-meaning">{word.meaning}</div>
                      <div className="fc-kana">{word.kana}</div>
                      {romaji && <div className="fc-romaji">{word.romaji}</div>}
                      <span className="fc-cat">{word.category}</span>
                    </div>
                  </div>
                </div>
                <div className="fc-controls">
                  <button className="fc-arrow" onClick={prevCard}>←</button>
                  <button className={`speak-btn ${playing===word.kanji?'playing':''}`} onClick={()=>say(word.kana,word.kanji)}>
                    🔊 {word.kana}
                  </button>
                  <button className={`mark-btn ${learnedVocab.has(word.kanji)?'marked':''}`} onClick={()=>toggleVocab(word.kanji)}>
                    {learnedVocab.has(word.kanji)?'✓ Learned':'+ Mark'}
                  </button>
                  <button className="fc-arrow" onClick={nextCard}>→</button>
                </div>
              </div>
            </div>
          )}

          {/* ── GRAMMAR ── */}
          {tab==='grammar' && (
            <div className="fade-in">
              <div className="stitle">Grammar</div>
              <div className="gram-layout">
                <div className="gram-sidebar">
                  {GRAMMAR.map(group=>(
                    <div key={group.level} className="gram-group">
                      <div className="gram-group-title">{group.level}</div>
                      {group.lessons.map((ls,li)=>(
                        <button key={li} className={`gram-lesson ${gLevel===group.level&&gLesson===li?'on':''}`}
                          onClick={()=>{setGLevel(group.level);setGLesson(li);}}>
                          {ls.title}
                        </button>
                      ))}
                    </div>
                  ))}
                </div>
                <div className="gram-content">
                  {lesson && (
                    <div className="lesson-card">
                      <div className="lesson-title">{lesson.title}</div>
                      <div className="lesson-expl">{lesson.explanation}</div>
                      <div className="examples-label">Examples</div>
                      {lesson.examples.map((ex,i)=>(
                        <div key={i} className="example">
                          <div className="ex-row">
                            <div className="ex-jp">{ex.jp}</div>
                            <button className={`speak-btn ${playing===ex.jp?'playing':''}`} onClick={()=>say(ex.jp,ex.jp)}>🔊</button>
                          </div>
                          {romaji && <div className="ex-rm">{ex.romaji}</div>}
                          <div className="ex-en">{ex.en}</div>
                        </div>
                      ))}
                      <div className="tip-box"><b>💡 Tip:</b>{lesson.tip}</div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Bottom nav (mobile only) */}
        <nav className="botnav">
          <div className="botnav-inner">
            {TABS.map(t=>(
              <button key={t.id} className={`bn-btn ${tab===t.id?'on':''}`} onClick={()=>setTab(t.id)}>
                <span className="bn-icon">{t.icon}</span>
                {t.label}
              </button>
            ))}
          </div>
        </nav>

      </div>
    </>
  );
}
