// pages/api/generate.ts

export const config = {
  runtime: "nodejs",
};

import type { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import path from "path";

type SuccessResponse = {
  story_id: string;
  collapse_speed: string;
  collapse_level: number;
  generated_text: string;
  self_evaluation: string;
  timestamp: string;
};

type ErrorResponse = {
  error: string;
};

function collapseInstruction(speed: string, level: number): string {
  switch (speed) {
    case "Linear":
      return `
Interpret collapse as roughly proportional to the observation level.
At level ${level}, deviation may remain gradual or partially coherent.
`;

    case "Quadratic":
      return `
Interpret collapse as intensifying faster than Linear.
Even at relatively small levels such as ${level},
significant deviation may already emerge.
`;

    case "Exponential":
      return `
Interpret collapse as escalating explosively compared to Linear.
At level ${level}, structure may already be unstable or severely fragmented.
`;

    case "Logarithmic":
      return `
Interpret collapse as progressing slowly at first.
Even at level ${level}, apparent structure or narrative may persist.
`;

    case "Oscillatory":
      return `
Interpret collapse as non-monotonic.
At level ${level}, coherence and breakdown may alternate or interfere.
`;

    case "Piecewise":
      return `
Interpret collapse as changing behavior abruptly at arbitrary points.
Level ${level} does not imply smooth or continuous progression.
`;

    case "Fractal":
      return `
Interpret collapse as recursive or self-similar across scales.
At level ${level}, local patterns may repeat while global structure degrades.
`;

    default:
      return "";
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<SuccessResponse | ErrorResponse>
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "POST only" });
  }

  try {
    const {
      story_id,
      collapse_speed,
      collapse_level,
    } = req.body as {
      story_id?: string;
      collapse_speed?: string;
      collapse_level?: number;
    };

    const authHeader = req.headers.authorization;
    const userApiKey = authHeader?.replace("Bearer ", "").trim();

    if (!userApiKey) {
      return res.status(401).json({ error: "OpenAI API key required" });
    }

    if (
      story_id == null ||
      collapse_speed == null ||
      collapse_level == null
    ) {
      return res.status(400).json({
        error: "story_id, collapse_speed, collapse_level are required",
      });
    }

    const storyPath = path.join(
      process.cwd(),
      "public",
      "stories",
      `${story_id}.txt`
    );

    const storyText = fs.readFileSync(storyPath, "utf-8");

    const instruction = collapseInstruction(
      collapse_speed,
      collapse_level
    );

    const prompt = `
Regenerate the following story in full under the given collapse conditions.

There are no constraints on form, content, or outcome.
Each generation may differ.

Output text must be written exclusively in Japanese.
Write using Japanese grammar and vocabulary.

Allowed scripts:
- kanji
- hiragana
- katakana

Do not use any other scripts or writing systems.

${instruction}

After generating the text, output strictly in the following format. Do not include original text:

[GENERATED_TEXT]
<full regenerated story>

[SELF_EVALUATION]
Score: <0-100 representing how successful the model itself considers this transformation>
Comment: <One short sentence. Stop after this line.>

[Original Story]
${storyText}

[Collapse Speed]
${collapse_speed}

[Observation Level]
${collapse_level}
`;

    const response = await fetch(
      "https://api.openai.com/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userApiKey}`,
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          temperature: 1.3,
          messages: [
            {
              role: "system",
              content: `
        You must output text exclusively in Japanese.
        Use only kanji, hiragana, and katakana.
        Do not use any other scripts or languages.
        These rules are absolute.
              `.trim(),
            },
            {
              role: "user",
              content: prompt,
            },
          ],
        }),
      }
    );

    const data: any = await response.json();
    const raw: string =
      data?.choices?.[0]?.message?.content ?? "";

    const generatedMatch = raw.match(
      /\[GENERATED_TEXT\]([\s\S]*?)\[SELF_EVALUATION\]/
    );
    const evalMatch = raw.match(
      /\[SELF_EVALUATION\]([\s\S]*)$/
    );

    const generatedText =
      generatedMatch?.[1]?.trim() ?? raw;
    const selfEvaluation =
      evalMatch?.[1]?.trim() ?? "";

    return res.status(200).json({
      story_id,
      collapse_speed,
      collapse_level,
      generated_text: generatedText,
      self_evaluation: selfEvaluation,
      timestamp: new Date().toISOString(),
    });
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Internal Server Error";
    return res.status(500).json({ error: message });
  }
}
