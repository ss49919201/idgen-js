import { newQuestionManager } from "./question";
import { generateRandomId } from "./randomId";
import { generateUuid } from "./uuid";

const options = [
  { id: "1", name: "UUID", fn: generateUuid },
  {
    id: "2",
    name: "Random string",
    fn: () => generateRandomId(new Uint8Array(16)).join(""),
  },
] as const;

const question = `Select id type:
${options.map(({ id, name }) => `${id}: ${name}`).join("\n")}
(Enterキーで終了): `;

async function run() {
  const questionManager = newQuestionManager();

  await questionManager
    .ask(question)
    .then((answer) => {
      const selectedOption = options.find((o) => o.id === answer);

      if (!selectedOption) {
        return Promise.reject(new Error("Invalid option"));
      }

      console.log(selectedOption.fn());
    })
    .finally(() => {
      questionManager.close();
    });
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
