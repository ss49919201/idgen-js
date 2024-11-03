import { createInterface } from "node:readline/promises";
import { ReadLineOptions } from "readline";

export interface QuestionManager {
  ask(question: string): Promise<string>;
  close(): void;
}

export interface QuestionManagerOptions {
  input?: ReadLineOptions["input"];
  output: ReadLineOptions["output"];
}

export const newQuestionManager: (
  opt?: QuestionManagerOptions
) => QuestionManager = (opt) => {
  const readlineIf = createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return {
    ask: async (question: string) => await readlineIf.question(question),
    close: () => readlineIf.close(),
  };
};
