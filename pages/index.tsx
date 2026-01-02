// pages/index.tsx  

"use client"

import { useState, useEffect } from "react"
import { OpenAIKeyInput } from "../components/OpenAIKeyInput"
import { useOpenAIKey } from "../hooks/useOpenAIKey"
import { GeneratingOverlay } from "../components/GeneratingOverlay"

const STORIES = [
  { id: "yumeno_money_pistol", label: "夢野久作：お金とピストル (青空文庫)" },
  { id: "100_sutokuinn", label: "百人一首：崇徳院" },
  { id: "chuuya_yogorechimatta", label: "中原中也：汚れつちまつた悲しみに (青空文庫)" },
  { id: "heike_story", label: "平家物語・冒頭文" },
  { id: "bartleby", label: "メルヴィル：バートルビー (設計者再編)" },
  { id: "kosakai_fuboku", label: "小酒井不木：人工心臓 (設計者再編)" },
  { id: "nopperabou", label: "のっぺらぼう (設計者再編)" },
  { id: "greek_myth", label: "ギリシャ神話：シーシュポスの神話 (設計者再編)" },
  { id: "kumonoito", label: "芥川龍之介：蜘蛛の糸 (設計者再編)" },
  { id: "kafka_okite", label: "カフカ：掟の前で (設計者再編)" },
  { id: "kaguyahime", label: "竹取物語 (設計者再編)" },
  { id: "kitakaze_taiyou", label: "イソップ寓話：北風と太陽 (設計者再編)" },
  { id: "nagon_makuranosoushi", label: "清少納言：枕草子" },
  { id: "redhood", label: "グリム童話：赤ずきん (設計者再編)" },
  { id: "yamatanoorochi", label: "日本神話：八岐大蛇 (設計者再編)" },
  { id: "manjuukowai", label: "落語：まんじゅう怖い (設計者再編)" },
  { id: "ainu_ningenkisetsu", label: "アイヌ神話：人間の季節 (青空文庫)" },
  { id: "bashou_haiku", label: "俳句：松尾芭蕉" },
  { id: "tanaka_koutarou", label: "田中貢太郎：鬼火を追う武士 (青空文庫)" },
  { id: "norse_myth", label: "北欧神話：トールの女装 (設計者再編)" },
]

export default function Home() {
  const { apiKey, ready } = useOpenAIKey()

  const [storyId, setStoryId] = useState("yumeno_money_pistol")
  const [speed, setSpeed] = useState("Linear")
  const [level, setLevel] = useState<string>("0");

  const [originalText, setOriginalText] = useState("")
  const [generatedText, setGeneratedText] = useState("")
  const [selfEvaluation, setSelfEvaluation] = useState("")

  const [isGenerating, setIsGenerating] = useState(false)

  useEffect(() => {
    fetch(`/stories/${storyId}.txt`)
      .then(res => res.text())
      .then(setOriginalText)
      .catch(() => setOriginalText(""))
  }, [storyId])

  async function onGenerate() {
    const storedKey = localStorage.getItem("openai_api_key")

    if (!storedKey) {
      alert("OpenAI API key を設定してください")
      return
    }

    setIsGenerating(true)
    setGeneratedText("")
    setSelfEvaluation("")

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          apiKey: storedKey,         
          story_id: storyId,
          collapse_speed: speed,
          collapse_level: Number(level),
        }),
      })

      const data = await res.json()
      setGeneratedText(data.generated_text ?? "")
      setSelfEvaluation(data.self_evaluation ?? "")
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <>
      <GeneratingOverlay visible={isGenerating} />

      <div className="bg" />

      <div className="content">
        <main className="glass">
          <h1>1001: ショートショート崩壊観測所</h1>　

          {/* ===== 上段：設定 ===== */}
          <section className="setup-section">
            <div className="setup-grid">
              <div className="setup-box">
              <h3>OpenAI API 設定</h3>

              <div
              style={{
                marginTop: 4,
              }}>
              <div
                style={{
                  padding: 16,
                  borderRadius: 12,
                  color: "#6fc4b4ff",
                  background: "#111",
                }}>
                <div style={{ marginBottom: 12 }}>
                  <span
                    style={{
                      fontSize: 12,
                      fontWeight: 600,
                      letterSpacing: "0.02em",
                    }}
                  >
                    この装置の使用には「OpenAI API key」が必要です。
                  </span>
                </div>

                {ready && <OpenAIKeyInput />}

                <div
                  style={{
                    fontSize: 11,
                    lineHeight: 1.6,
                    marginTop: 12,
                    color: "#6fc4b4ff",
                  }}>
                  <p>• この装置はあなた自身の OpenAI API key を使用します。</p>
                  <p>• API key はこのブラウザ内にのみ保存され、本アプリのサーバーには保存されません。</p>
                  <p>
                    • API key の取得はこちら：
                    <a
                      href="https://platform.openai.com/api-keys"
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        color: "#49f9d9ff",
                        textDecoration: "underline",
                        fontWeight: 500,
                        marginLeft: 4,
                      }}
                    >
                      OpenAI API Keys
                    </a>
                   </p>
                  </div>
                 </div>
                </div>
               </div>

             <div className="setup-box">
              <h3>観測コントローラー</h3>
              <div className="control-block">
                <p>崩壊させる原文を選んでください。</p>  
                <select value={storyId} onChange={e => setStoryId(e.target.value)}>
                  {STORIES.map(s => (
                    <option key={s.id} value={s.id}>{s.label}</option>
                  ))}
                </select>
              </div>

              <div className="control-block">
                <p>崩壊がどの速度で進行するかを選んでください。</p>
                <select value={speed} onChange={e => setSpeed(e.target.value)}>
                  <option>Linear</option>
                  <option>Quadratic</option>
                  <option>Exponential</option>
                  <option>Logarithmic</option>
                  <option>Oscillatory</option>
                  <option>Piecewise</option>
                  <option>Fractal</option>
                </select>
              </div>

              <div className="control-block">
                <p>崩壊レベル観測地点＝原文からの崩壊距離を選んでください。</p>

                <div className="level-row">
                <span className="level-label">n = </span>
                <input
                  type="text"
                  value={level}
                  onChange={(e) => setLevel(e.target.value)}
                  placeholder="e.g. 4, 62, 1000000"
                  className="level-field"
                />
               </div>
              </div> 

              <button
                onClick={onGenerate}
                style={{
                  alignSelf: "center",
                  marginTop: 16,
                  padding: "14px 28px",
                  fontSize: 15,
                  fontFamily: "Georgia, serif, Times New Roman",
                  fontWeight: "bold",
                  letterSpacing: "0.1em",
                  background: "#bbcc39ff",
                  color: "#060606ff",
                  borderRadius: 999,
                  border: "1px solid #bbcc39ff",
                  cursor: "pointer",
                }}
              >
                崩壊スタート
              </button>

            </div>
            </div>
          </section>

          {/* ===== 下段：結果 ===== */}
          <section className="result-section">
            <div className="result-grid">
              <div className="text-box">
                <h3>Before (原文)</h3>
                <pre>{originalText}</pre>
              </div>

              <div className="text-box">
                <h3>After (改訂後)</h3>
                <pre>{generatedText}</pre>

                {selfEvaluation && (
                  <div className="evaluation-box">
                    <h4>[ AIの自己評価 ]</h4>
                    <pre>{selfEvaluation}</pre>
                  </div>
                )}
              </div>
            </div>
          </section>
        </main>
      </div>
    </>
  )
}
