const { convertFunctionToJsonSchema } = require("./tool");

class Agent {
    constructor({ name, instructions, model = 'deepseek-chat', tools = [] }) {
      this.name = name;
      this.instructions = instructions;
      this.model = model;
      this.tools = tools;
      this.jsonSchemaTools = this.convertToolsToJsonSchema();
    }

     convertToolsToJsonSchema() {
      return this.tools.map(tool => {
        if (typeof tool === 'function') {
          return convertFunctionToJsonSchema(tool);
        } else if (typeof tool === 'object' && tool.function) {
          // Assume the tool is already in the correct format
          return tool;
        } else {
          throw new Error(`Invalid tool format: ${tool}`);
        }
      });
    }

  }
  
  module.exports = Agent;