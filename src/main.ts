import { newQuestionManager } from "./question";

const options = [
  { id: "1", name: "UUID" },
  { id: "2", name: "Random string" },
];

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

    // TODO
    console.log(`Selected: ${selectedOption.name}`);
  } finally {
    questionManager.close();
  }
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
