# DeepSwarm.js (Node.js Framework for Multi-Agent Systems using DeepSeek)

**DeepSwarm.js** is a lightweight Node.js framework for orchestrating multi-agent systems using DeepSeek’s API. It offers developers an intuitive way to manage and coordinate agent-based workflows, enabling scalable applications for real-world scenarios.

> **Important Note**  
> **DeepSwarm.js** is an experimental framework designed for educational and prototyping purposes. It is not intended for production environments and lacks official support. This framework adapts the Swarms framework to Node.js, leveraging DeepSeek’s capabilities.

## Installation

Install DeepSwarm.js via npm:

```bash
npm install deepseek-swarm-node
```

## What is DeepSwarm.js?

**DeepSwarm.js** enables the creation and management of multi-agent systems, focusing on task delegation, handoffs, and execution. Inspired by the Swarms framework, this Node.js adaptation provides a powerful and user-friendly interface to build customizable and scalable agent workflows.

The framework leverages DeepSeek’s API for defining agents and their interactions, making it an ideal choice for projects requiring distributed coordination.

> **Note**  
> DeepSwarm.js agents are stateless between API calls, ensuring simplicity and modularity. This design aligns with DeepSeek’s principles for agent-based systems.

## Usage

With DeepSwarm.js, defining agents and orchestrating tasks between them is simple. Below is an example showcasing how to set up and manage two agents.

```javascript
const { DeepSwarm, Agent } = require('deepseek-swarm-node');

// Define two agents
const agentA = new Agent({
    name: "Agent A",
    instructions: "You are a helpful agent.",
    tools: [
        {
            name: 'transferToAgentB',
            fn: () => agentB,
        },
    ],
});

const agentB = new Agent({
    name: "Agent B",
    instructions: "Only speak in Haikus.",
});

const swarm = new DeepSwarm(process.env.DEEPSEEK_API_KEY);

// Run conversation with agentA
(async () => {
    const response = await swarm.run({
        agent: agentA,
        messages: [{ role: "user", content: "I want to talk to agent B." }]
    });

    console.log(response.messages.pop().content);
})();
```

```
Hope glimmers brightly,  
New paths converge gracefully,  
What can I assist?  
```

## Table of Contents

- [Overview](#overview)
- [Examples](#examples)
- [Documentation](#documentation)
  - [Running DeepSwarm](#running-deepswarm)
  - [Agents](#agents)
  - [Functions](#functions)
  - [Streaming](#streaming)
- [Evaluations](#evaluations)
- [Utils](#utils)

## Overview

DeepSwarm.js provides a Node.js-based implementation of the DeepSeek swarm framework, allowing developers to create lightweight, multi-agent systems with ease. By facilitating task delegation and inter-agent communication, it simplifies the process of building complex workflows.

### Why DeepSwarm.js?

DeepSwarm.js is an excellent choice for:

- Developers exploring multi-agent systems in a Node.js environment.
- Prototyping workflows involving distributed tasks and coordination.
- Educational purposes and small-scale experiments.

## Examples

Check out the `/examples` folder for practical demonstrations. Each example includes a README explaining its implementation.

- [`basic`](examples/basic): Learn agent setup, task delegation, and handoffs.
- [`triage_agent`](examples/triage_agent): Implement a triage system that delegates tasks to the appropriate agent.
- [`airline`](examples/airline): Handle customer service workflows in the airline industry.
- [`support_bot`](examples/support_bot): Build a networked customer service bot.

## Documentation

### Running DeepSwarm.js

Start by creating a DeepSwarm client to interact with DeepSeek’s API.

```javascript
const { DeepSwarm } = require('deepseek-swarm-node');

const client = new DeepSwarm(process.env.DEEPSEEK_API_KEY);
```

### `client.run()`

The `run()` method orchestrates conversations between agents, enabling features like function execution, handoffs, and multi-turn dialogues.

#### Arguments

| Argument              | Type     | Description                                                                                                                                            | Default    |
|-----------------------|----------|--------------------------------------------------------------------------------------------------------------------------------------------------------|------------|
| **agent**             | `Agent`  | The initial agent handling the conversation.                                                                                                          | Required   |
| **messages**          | `Array`  | A list of messages (similar to DeepSeek's API message format).                                                  | Required   |
| **contextVariables**  | `Object` | Additional context variables accessible to agents.                                                                                                     | `{}`       |
| **maxTurns**          | `Number` | Maximum conversational turns before returning a result.                                                                                               | `Infinity` |
| **debug**             | `Boolean`| Enable debug logging.                                                                                                                                 | `false`    |

### Agents

Agents define instructions and functions (tools) to drive conversations and task execution.

```javascript
const agentA = new Agent({
  name: "Agent A",
  instructions: "You are a helpful agent.",
});
```

## Streaming

DeepSwarm.js supports real-time streaming of agent responses.

```javascript
const stream = client.run({ agent, messages, stream: true });
for await (const chunk of stream) {
    console.log(chunk);
}
```

## Evaluations

You can test and validate your multi-agent systems using built-in evaluation tools. Check the `/examples` directory for more details.

## Utils

Use the `run_demo_loop` utility to interactively test agents in a REPL environment.

```javascript
const { run_demo_loop } = require('deepseek-swarm-node/utils');

run_demo_loop(agent);
```

---

### Core Contributors

- Pulkit Garg (Node.js adaptation)
- Swarms Framework (original design adapted for DeepSeek)