<p align="center">
  <img src="robot.png" width="420" alt="App Screenshot" />
</p>

# 1001: Short Story Collapse Observatory

This tool originates from an earlier project titled [“1001: Short Story Distorting Generator.”](https://1001generator.5labs.org/)

前プロジェクト・[1001短編歪曲生成装置](https://1001generator.5labs.org/)から派生した、AI暴走観測ツールになります。よくありがちな暴走して止まらなくなるAIを、好きなだけ暴走させて、その崩壊していく過程を、超短いテキスト；和歌や神話・寓話、近代文学の再編版などを通して、心ゆくまで観察できます。ぜひクローム・Fire Foxブラウザからこちらの[1001崩壊観測所](https://1001observatory.5labs.org/)でお楽しみください。日本語での詳細はこのページの最後にあります。

In the Generator project, the system was designed as an experimental narrative generator in which short story templates were distorted through a sequence of strictly constrained transformations. Highly structured prompts were constructed with Python Faker in advance, and the LLM's role was ristricted as a renderer without agency or decision-making authority.

In contrast, this tool minimizes control constraints on the LLM, providing only an original text, a small set of user parameters, and a single instruction: iteratively improve the text. The LLM functions as an improver rather than an author, generating self-justified updates according to its own internal criteria. Because the process lacks a stopping rule or a human-aligned objective, optimization can continue indefinitely. Behaviors that are internally coherent may therefore diverge from human expectations, appearing as structural loss or collapse. This divergence is not treated as an error to be corrected. It reflects a broader misalignment between AI-internal optimization and human evaluation, similar to phenomena such as overfitting or out-of-distribution behavior. The tool exists to observe this gap as it unfolds.

---

## Overview

- The original text (left) and the AI-collapsed generated text (right) are displayed side by side
- Collapse progresses according to **Speed** and **Observation Level**
- After each generation, the AI performs a **self-evaluation** (Score + Comment)
- Even under identical conditions, results differ every time

There is no goal state for collapse.  
The user selects only *which cross-section to observe*.

---

## Basic Usage

https://1001observatory.5labs.org/

This application is optimized for the latest versions of Chrome and Firefox.
Some features or layouts may not work correctly in Safari.


### 1. Enter your OpenAI API Key

This tool uses **your own OpenAI API Key**.

- The API key is stored only within user's browser
- It is never saved or shared on external servers

---

### 2. Select an Original Text

Choose the short text that serves as the origin point of collapse.  

All source texts used in this project are in the public domain.

Sources:
- Aozora Bunko (https://www.aozora.gr.jp)
- Reconstructed / reorganized by the project author
- Original authors unknown

---

### 3. Collapse Speed

Select the *nature* of collapse.

- Linear  
- Quadratic  
- Exponential  
- Logarithmic  
- Oscillatory  
- Piecewise  
- Fractal  

These are not treated as strict mathematical functions.  
They are passed to the AI as **metaphorical tendencies of divergence**.

---

### 4. Observation Level

Specify how far from the origin (the original text) the observation point lies.

- The numeric value does not directly represent intensity or stages
- Internally, the AI treats this roughly as Distance ≈ log(n)
- Larger values correspond to greater divergence from the origin in meaning and structure

---

### 5. Generate

When generation is executed:

- The fully collapsed text appears on the right
- Below it, the AI’s own self-evaluation is displayed

---

## About Self-Evaluation

After each generation, the AI always outputs:

- **Score (0–100)**
- **A short one-sentence comment**

This evaluation does not guarantee correctness or quality.  
It is merely a trace of the AI’s **internal judgment** regarding whether the update was perceived as an improvement.

High or low scores are displayed without modification.

---

## License

This project is released under a **Custom Non-Commercial License**.

### ✅ Allowed
- Learning and studying the code
- Personal or educational use
- Non-commercial experimentation
- Creating derivative works with attribution

### ❌ Not Allowed
- Commercial use
- Selling or redistributing this project as a product
- Using this project in paid services or monetized platforms
- Repackaging this project for resale

If you wish to use this project commercially or beyond the scope of this
license, please contact the author for permission.

## In Japanese
このツールは、前回のプロジェクト”Generator”から発想を得た、AI特有の暴走を生暖かく観測して楽しむ装置である。イメージ的にはスーパーカミオカンデ。

Generatorでは、LLMには厳密に制限された複雑な構造のプロンプトを渡し、意志や決定権は与えずに物語を歪曲生成させる過程を分析・構造化・歪曲することをゴールにしていたが、ここでは、逆にLLMに伝える制約を極限まで削ぎ落とし、AIの暴走とそれに伴う"崩壊"観測を目的とした。このプロジェクトにおけるLLMの役割は、改善家・添削家である。原文とごく少ない制限（ユーザーのチョイス）をLLMに与え、「原文をより良くせよ」とのみ伝えることで、反復的に、そして事実上無限ループで、AI自身が自己内部ロジックと基準に基づいた"改善"と正当化できる更新(人間視点では"改悪")を適用し続ける。敢えてここでは、リミットを設けず、終わりのないAIの継続的な自己正当化による最適化(人間的結果では"元の構造の漸進的破壊")を、ユーザーが思う存分観測できるようにした。

原文をそのまま使用しているテキストはすべて青空文庫出典。作者不明のものは注訳なし。それ以外は設計者の再編によるもの。出力されるテキストは、日本語環境で使用される範囲のもの全てとなる。

このツールを使用するには、前回同様OpenAI API key必須。ユーザーはテンプレの原文の中から１つ、崩壊スピードを複数の発散ダイナミクスの中から１つをそれぞれ選び、選んだダイナミクスのレベルの整数"n"(原文からの距離 ≈ log(n))を設定することで、興味がある観測地点での崩壊を何度でも見ることができる。崩壊は常に起き続けているので、ユーザーが見ることができるのは＋方向の崩壊地点となる。なお、同条件で観測してもその都度違う崩壊が起こる。

本プロジェクトでは特に、最適化対象の乖離(Objective Misalignment)や全体的 vs 局部的な捉え方(Local Consistency vs Global Coherence)のズレの他に、MLモデルが内部パターンに過剰適合し、高い確信を保ったまま世界を誤解する **Overfitting(過学習)** と、モデルの内部世界モデルが人間の期待と乖離した応答を示す **OOD・Out-of-Distribution(分布外入力)** を修正すべきエラーとして扱わず、AIと人間の評価軸の乖離を文章を通して可視化したものである。

基本的にAIは、前回より良くできた！と常に自分を信じて"改善"を適応し続けるため、自己評価が高くなりがちなところと、原文へのダメ出しコメントも見どころである。







