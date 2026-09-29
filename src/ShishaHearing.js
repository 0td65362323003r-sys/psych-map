import { useState } from "react";
import "./ShishaHearing.css";

const TASTES = [
  { id: "sweet", label: "甘め", icon: "🍑", examples: "ピーチ・マンゴー・バニラ・チョコ・キャラメル" },
  { id: "fresh", label: "さっぱりめ", icon: "🍋", examples: "ミント・レモン・ライム・グレープフルーツ" },
  { id: "spice", label: "スパイス", icon: "🌶️", examples: "チャイ・シナモン・カルダモン・ジンジャー" },
  { id: "flower", label: "花", icon: "🌸", examples: "ローズ・ジャスミン・ラベンダー" },
  { id: "perfume", label: "香水", icon: "🫧", examples: "ムスク・ベルガモット・ホワイトティー" },
];

const SENSES = [
  { id: "taste", label: "味より", desc: "口に残るフレーバー感を重視" },
  { id: "aroma", label: "香りより", desc: "吐いた煙の香りを楽しみたい" },
  { id: "middle", label: "中間", desc: "味も香りもバランスよく" },
];

// 味の強さ。味の種類に関係なく、超さっぱり〜超甘いの1本のスケールで聞く
const LEVELS = [
  { n: 1, label: "超さっぱり" },
  { n: 2, label: "さっぱり" },
  { n: 3, label: "甘さっぱり" },
  { n: 4, label: "甘い" },
  { n: 5, label: "超甘い" },
];

function levelLabel(n) {
  return LEVELS.find((l) => l.n === n).label;
}

const STEPS = ["味", "感じ方", "強さ", "苦手"];

function ProgressBar({ step }) {
  return (
    <div className="sh-progress">
      {STEPS.map((name, i) => (
        <div key={name} className={`sh-progress-item ${i <= step ? "active" : ""}`}>
          <span className="sh-progress-bar" />
          <span className="sh-progress-label">{name}</span>
        </div>
      ))}
    </div>
  );
}

function ChoiceList({ options, value, onChange }) {
  return (
    <div className="sh-choices">
      {options.map((o) => (
        <button
          key={o.id}
          className={`sh-choice ${value === o.id ? "selected" : ""}`}
          onClick={() => onChange(o.id)}
        >
          {o.icon && <span className="sh-choice-icon">{o.icon}</span>}
          <span className="sh-choice-text">
            <span className="sh-choice-label">{o.label}</span>
            {(o.desc || o.examples) && <span className="sh-choice-desc">{o.desc || o.examples}</span>}
          </span>
        </button>
      ))}
    </div>
  );
}

function StrengthScale({ value, onChange }) {
  return (
    <div className="sh-levels">
      {LEVELS.map((l) => (
        <button
          key={l.n}
          className={`sh-level ${value === l.n ? "selected" : ""}`}
          onClick={() => onChange(l.n)}
        >
          <span className="sh-level-num">{l.n}</span>
          <span className="sh-level-label">{l.label}</span>
        </button>
      ))}
    </div>
  );
}

function buildSummary(answers) {
  const taste = TASTES.find((t) => t.id === answers.taste);
  const sense = SENSES.find((s) => s.id === answers.sense);
  return [
    `味：${taste.label}`,
    `感じ方：${sense.label}`,
    `味の強さ：${answers.strength}（${levelLabel(answers.strength)}）`,
    `苦手なフレーバー：${answers.dislike.trim() || "特になし"}`,
  ].join("\n");
}

function Result({ answers, onRestart }) {
  const [copied, setCopied] = useState(false);
  const taste = TASTES.find((t) => t.id === answers.taste);
  const sense = SENSES.find((s) => s.id === answers.sense);
  const summary = buildSummary(answers);

  async function copy() {
    try {
      await navigator.clipboard.writeText(summary);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div className="sh-result">
      <h2 className="sh-question">ヒアリング結果</h2>
      <dl className="sh-summary">
        <dt>味</dt>
        <dd>{taste.icon} {taste.label}<span className="sh-sub">{taste.examples}</span></dd>
        <dt>感じ方</dt>
        <dd>{sense.label}<span className="sh-sub">{sense.desc}</span></dd>
        <dt>味の強さ</dt>
        <dd>
          <span className="sh-meter">
            {[1, 2, 3, 4, 5].map((n) => (
              <span key={n} className={`sh-meter-dot ${n <= answers.strength ? "on" : ""}`} />
            ))}
          </span>
          {answers.strength}（{levelLabel(answers.strength)}）
          <span className="sh-sub">1：超さっぱり 〜 5：超甘い</span>
        </dd>
        <dt>苦手なフレーバー</dt>
        <dd className="sh-dislike">{answers.dislike.trim() || "特になし"}</dd>
      </dl>
      <div className="sh-actions">
        <button className="sh-btn primary" onClick={copy}>{copied ? "コピーしました" : "結果をコピー"}</button>
        <button className="sh-btn" onClick={onRestart}>次のお客さん</button>
      </div>
    </div>
  );
}

const EMPTY = { taste: null, sense: null, strength: null, dislike: "" };

export default function ShishaHearing({ onBack }) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState(EMPTY);

  function set(key, value) {
    setAnswers((a) => ({ ...a, [key]: value }));
  }

  // 選択式は選んだら次へ進む
  function choose(key, value) {
    set(key, value);
    setStep((s) => s + 1);
  }

  function restart() {
    setAnswers(EMPTY);
    setStep(0);
  }

  const done = step >= STEPS.length;

  return (
    <div className="app sh-page">
      <header className="app-header">
        <button className="back-btn" onClick={step > 0 && !done ? () => setStep(step - 1) : onBack}>
          ← {step > 0 && !done ? "前の質問へ" : "ホームへ"}
        </button>
        <h1>シーシャ ヒアリング</h1>
        <p>4つの質問で好みのフレーバーを整理</p>
      </header>

      {!done && <ProgressBar step={step} />}

      <div className="sh-card">
        {step === 0 && (
          <>
            <h2 className="sh-question"><span className="sh-num">Q1</span>どんな味が好き？</h2>
            <ChoiceList options={TASTES} value={answers.taste} onChange={(v) => choose("taste", v)} />
          </>
        )}

        {step === 1 && (
          <>
            <h2 className="sh-question"><span className="sh-num">Q2</span>どう楽しみたい？</h2>
            <ChoiceList options={SENSES} value={answers.sense} onChange={(v) => choose("sense", v)} />
          </>
        )}

        {step === 2 && (
          <>
            <h2 className="sh-question"><span className="sh-num">Q3</span>味の強さは？</h2>
            <p className="sh-hint">数字で選んでください</p>
            <StrengthScale value={answers.strength} onChange={(v) => choose("strength", v)} />
          </>
        )}

        {step === 3 && (
          <>
            <h2 className="sh-question"><span className="sh-num">Q4</span>苦手なフレーバーは？</h2>
            <p className="sh-hint">自由に書いてください（なければ空欄でOK）</p>
            <textarea
              className="sh-textarea"
              rows={4}
              placeholder="例：ミントの強いもの、ココナッツ"
              value={answers.dislike}
              onChange={(e) => set("dislike", e.target.value)}
            />
            <div className="sh-actions">
              <button className="sh-btn primary" onClick={() => setStep(STEPS.length)}>結果を見る</button>
            </div>
          </>
        )}

        {done && <Result answers={answers} onRestart={restart} />}
      </div>
    </div>
  );
}
