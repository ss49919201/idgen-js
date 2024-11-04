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

async function run() {
  const questionManager = newQuestionManager();

  try {
    const answer = await questionManager.ask(`Select id type: 
${options.map((o) => `${o.id}: ${o.name}`).join("\n")}
(Enterキーで終了): `);

    const selectedOption = options.find((o) => o.id === answer);
    if (!selectedOption) {
      throw new Error("Invalid option");
    }

    console.log(selectedOption.fn());
  } finally {
    questionManager.close();
  }
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
