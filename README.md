# test-call-osca

A TypeScript proof-of-concept that calls the **OSCA context API** (LightRAG-powered knowledge graph), extracts the `context_text` from the response, and passes it to Claude as grounded context to answer a question.

## How it works

1. Fetches context from the OSCA engine (`/protected/project/context`) for a given question
2. Extracts `context_text` from the JSON response
3. Sends the context + question to Claude (`claude-sonnet-4-5`) with the Osca system prompt
4. Prints the response

## Setup

### 1. Install dependencies

```bash
bun install
```

### 2. Configure environment variables

Copy `.env.locale` to `.env` and fill in your values:

```bash
cp .env.locale .env
```

Then edit `.env`:

```env
OSCA_API_KEY=<your OSCA bearer token>
OSCA_BASE_URL=<OSCA engine base URL, e.g. https://engine.onepointltd.ai>
ANTHROPIC_API_KEY=<your Anthropic API key>
PROJECT_NAME=<OSCA project name, e.g. onepoint_v3>
```

> **Note:** `.env.locale` is the template file committed to the repo — it contains only placeholder values.  
> `.env` holds your real credentials and must **not** be committed (it is listed in `.gitignore`).

## Run

```bash
bun run index.ts
```

## Project structure

```
index.ts          # Main entry point
system_message.ts # Osca system prompt (exported as SYSTEM_MESSAGE)
.env.locale       # Environment variable template (commit this)
.env              # Your local credentials (do NOT commit)
```
