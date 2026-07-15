import gemini from "./lib/gemini.js";

async function test() {
  const response = await gemini.models.generateContent({
    model: "gemini-2.5-flash",
    contents: "Say hello in one sentence.",
  });

  console.log(response.text);
}

test();