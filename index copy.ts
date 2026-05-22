// call the context api
import { Anthropic } from "@anthropic-ai/sdk";
import { SYSTEM_MESSAGE } from "./system_message";

const client = new Anthropic({
	apiKey: process.env["ANTHROPIC_API_KEY"] 
  });
  

async function main() {
  const res = await fetch(
    `${process.env.OSCA_BASE_URL}/protected/project/context?project=${process.env.PROJECT_NAME}&engine=lightrag&question=who%20is%20the%20onepoint%20founder%3F&search=all&keywords=true&format=json_string_with_json`,
    {
      headers: {
        Authorization: `Bearer ${process.env.OSCA_API_KEY}`,
      },
    },
  );

  const data = await res.json();
  return data;
}



const USER_QUESTION = "who is the onepoint founder?";

function extractContextText(data: Record<string, unknown>): string {
  return data.context_text as string;
}

async function getContext(): Promise<string> {
  const data = await main();
  return extractContextText(data as Record<string, unknown>);
}

async function generateFinalResponse(context: string): Promise<string> {
  const response = await client.messages.create({
    max_tokens: 4096,
	  system: SYSTEM_MESSAGE,
	  messages: [{
		  role: "user",
		  content: `Context:\n${context}\n\nQuestion: ${USER_QUESTION}`
	  }],
    model: "claude-sonnet-4-5",
	cache_control: {
		type: "ephemeral"
	},
  });
  return (response.content[0] as { text: string }).text;
}

async function mainFnc() {
  const context = await getContext();
  const response = await generateFinalResponse(context);
  console.log(response);
}

mainFnc();