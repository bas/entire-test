# Demo script

## Introduction

In this demo we are going to look at ways to customize chat as this is changing constantly. We will be using VS Code, but you can use the same approach in GitHub Copilot CLI and In Copilot Coding Agent.

We will look at:
- Custom instructions
- Agent Skills
- Custom Prompts
- Custom Agents
- Plan Mode and handoff

## Prerequisites

- Create a clone of this repo and open in VS Code
- In a browser open the following resources:
  - [Customize chat to your workflow](https://code.visualstudio.com/docs/copilot/customization/overview)
  - [About Agent Skills](https://docs.github.com/en/copilot/concepts/agents/about-agent-skills)
  - [Adding repository custom instructions for GitHub Copilot](https://docs.github.com/en/copilot/how-tos/configure-custom-instructions/add-repository-instructions)
  - [github/awesome-copilot](https://github.com/github/awesome-copilot/blob/main/docs/README.agents.md)
  - [Agent Skills](https://agentskills.io/home)
  - [anthropics/skills](https://github.com/anthropics/skills)
- Run `npm install && npm run dev`
- Show the application by opening `localhost:3000`

## Step 1: Chat Debug View

- In Agent mode type the following promt: "Hello world!"
- In the left hand side open the Chat Debug View
- Click User
- Show the request and response details  

## Step 2: Generate Chat Instructions

- Click Configure Chat (⚙️) and then Generate Chat Instructions
- Review the created `.github/copilot-instructions.md`
- Optionally suggest some edits like adding Playwright for UI tests
- Accept the changes
- Explain that we are going to use the instructions later

## Step 3: Path specific custom instruction

- Click Configure Chat (⚙️) and then Chat Instructions
- Create a new file `.github/instructions/test.instructions.md`
- Add `applyTo: '**/*.test.ts'` as front matter
- Ask Copilot to create a concise instruction for testing using Vitest

## Step 4: Add API route

- In agent mode, run the prompt: `Create a products api route.`
- The agent should use the `products.json`
- Run the prompt: `Add unit tests for the api route`
- Show how the repository and test instructions are loaded in context
- Show how agent mode interacts with the terminal

## Step 5: Agent skills

- Open a terminal window and run: `npx add-skill bas/agent-skills`
- Install `hello-world` for VS Code in the Project
- Show the skill is installed
- In Agent mode with Sonnet 4.5 type "hello world"
- Discuss [Agent Skills](https://agentskills.io/home) to give agents new capabilities and expertise
- Explain the `hello world` skill parts: `SKILL.md`, scripts and templates
- Share the docs page [About Agent Skills](https://docs.github.com/en/copilot/concepts/agents/about-agent-skills)
- Explain how they relate to [custom instructions](https://docs.github.com/en/copilot/how-tos/configure-custom-instructions/add-repository-instructions)

## Step 6: Add more skills

- Open a terminal window and run: `npx add-skill vercel-labs/agent-skills`
- Install all skills into the project
- Explain the purpose of the newly added skills
- Show the skills metadata in the Chat Debug View and discuss how they are invoked

## Step 7: Create the product page

- Explain reusable prompts and show `.github/prompts/products-page.prompt.md`
- In Agent mode with Sonnet Opus 4.5 run the prompt `/products-page`
- Show how the `.github/copilot-instructions.md` is automatically added to context
- Show that the skill `.github/skills/vercel-react-best-practices/SKILL.md` is read
- Share the result

## Step 8: Review the UI

- In Agent mode with Sonnet Opus 4.5 run the prompt: "Review the UI"
- Show how the `SKILL.md` is read
- Tell Copilot to fix any accessibility and performance issues

## Step 9: Create a PRD Skill

- In agent mode, run the prompt "Create an agent skill for PRDs. Make sure to add a TEMPLATE.md"
- Show how the agent can create a new skill
- In agent mode run the prompt "Create a PRD for basic cart functionality"
- Commit everything

## Step 10: Use Plan mode and handoff

- In Plan mode use the prompt: "Write an implementation plan for the prd"
- Once the plan is ready, explain the handover tasks
- Open the Start Implementation options and explain the options
- Select the option Continue in Background
- Delegate to background agent
- This creates a git worktree that can be merged back to hte main branch later
- Merging can be done using `git merge worktree-branch` from the terminal

## Step 11: Use custom agents

- Select the Code Simplifier agent
- Run the prompt Review the code
- Fix any reported issues

## Conclusion

We have looked at different ways to customize chat including working with Agent Skills. Agent Skills are a great way to give agents new capabilities and expertise. They can be just a `SKILL.md`, but you can also add scripts and templates. They are automatically discovered, but that means that you need to provide a good description. Skills are an open standard and they are a good replacement for path specific instructions. No need to use glob patterns. Together with repository instructions, custom prompts and custom agents you have a great set of tools to provide the right context and get better outcomes.

