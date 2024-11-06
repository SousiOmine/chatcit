import { fileURLToPath } from "url";
import path from "path";
import { getLlama, LlamaChatSession } from "node-llama-cpp";



const ModelName = "gemma-2-2B-jpn-it-IQ4_XS.gguf";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export class Llama {
    llama;
    model;
    session;
    constructor()
    {
        
    }

    async LoadModel(Model_name)
    {
        this.llama = await getLlama();
        this.model = await this.llama.loadModel({
            modelPath: path.join(__dirname, "models", Model_name),
        });
    }

    async CreateSession(system_prompt)
    {
        let context = await this.model.createContext();
        this.session = new LlamaChatSession({
            contextSequence: context.getSequence(),
        });
        await this.session.prompt(system_prompt);
    }

    async Chat(message)
    {
        let result = await this.session.prompt(message);
        return result;
    }
}

export async function genllama() {
  const llama = await getLlama();
  const model = await llama.loadModel({
    modelPath: path.join(__dirname, "models", ModelName),
  });

  const context = await model.createContext();
  const session = new LlamaChatSession({
    contextSequence: context.getSequence(),
  });

  const q1 = "Hi there, how are you?";
  console.log("User: " + q1);

  const a1 = await session.prompt(q1);
  console.log("AI: " + a1);

  const q2 = "Summarize what you said";
  console.log("User: " + q2);

  const a2 = await session.prompt(q2);
  console.log("AI: " + a2);
}
