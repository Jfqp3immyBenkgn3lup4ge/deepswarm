const Swarm = require("./swarm");
const Agent = require("./agent");

const deepseek = require("deepseek");

const client = new deepseek({
  apiKey: process.env.DS_API_KEY,
  baseurl: "https://api.deepseek.ai/v1",
});

function lookUpItem(searchQuery) {
  /**
   * @description Use to find item ID. Search query can be a description or keywords.
   * @param {string} searchQuery - Description or keywords to search for the item.
   * @returns {string} - The found item ID.
   */

    return console.log(`Searching for item: ${searchQuery}`);
}


function executeRefund(itemId, reason = "not provided") {

    /**
     * @description Executes a refund for the specified item ID with an optional reason.
     * @param {string} itemId - The ID of the item to refund.
     * @param {string}  reason - The reason for the refund.
     * @returns {string} - The result of the refund operation.
     */

    console.log(`Summary: ${itemId}, ${reason}`); // Lazy summary
    return "success";
}


function executeTool(toolCall, toolsMap) {
    const name = toolCall.function.name;
    const args = JSON.parse(toolCall.function.arguments);

    console.log(`Assistant: ${name}(${JSON.stringify(args)})`);

    // Call corresponding function with provided arguments
    return toolsMap[name](...Object.values(args));
}


let agent_a = new Agent({
    name: "agent_a",
    instructions: "You are a helpful agent",
    tools: [lookUpItem, executeRefund],
});

console.log(agent_a.jsonSchemaTools);


async function run_agent(agent, message) {

    current_agent = agent
    num_init_messages = len(message)
    let messages = [...message]


    while (true) {

        tools = agent.tools;
        toolsMap = Object.fromEntries(tools.map(tool => [tool.name, tool]));

        completion = await client.chat.completions.create({
            model: agent.model || "deepseek-chat",
            messages: [
                { role: "system", content: agent.instructions },
                { role: "user", content: "procceed refund for item 1234567890 as it is not good" },
            ],
            tools: agent.jsonSchemaTools,
            tool_choice: "auto",
        });

        if (completion.choices[0].message.content) {
            console.log(completion.choices[0].message.content);
        }

        if (completion.choices[0].message.tool_calls) {
            for (const toolCall of completion.choices[0].message.tool_calls) {
                const result = executeTool(toolCall, toolsMap);
                console.log(result);
            }
        }
    }
}

run_agent(agent_a);

