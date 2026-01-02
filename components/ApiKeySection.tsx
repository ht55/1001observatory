type Props = {
  apiKey: string
  setApiKey: (v: string) => void
}

export function ApiKeySection({ apiKey, setApiKey }: Props) {
  return (
    <section style={{ marginBottom: 30 }}>
      <h2>OpenAI API 設定</h2>

      <div style={{ display: "grid", gap: 24, marginTop: 16 }}>
        <div
          style={{
            padding: 16,
            borderRadius: 12,
            color: "#ffc355ff",
            background: "#111",
          }}
        >
          <div style={{ marginBottom: 12 }}>
            <span style={{ fontSize: 12, fontWeight: 600 }}>
              この装置の使用には "OpenAI API key" が必要です。
            </span>
          </div>

          <input
            type="password"
            placeholder="sk-..."
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            style={{
              width: "100%",
              padding: "8px 10px",
              borderRadius: 6,
              border: "1px solid #444",
              background: "#000",
              color: "#ffc355ff",
              fontFamily: "monospace",
            }}
          />

          <div style={{ fontSize: 11, lineHeight: 1.6, marginTop: 12 }}>
            <p>• API key はこのブラウザ内にのみ保存されます。</p>
            <p>
              • 取得先：
              <a
                href="https://platform.openai.com/api-keys"
                target="_blank"
                style={{ color: "#ffd27d", marginLeft: 4 }}
              >
                OpenAI API Keys
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
