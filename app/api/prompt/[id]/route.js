import { connectToDb } from "@utils/database";
import Prompt from "@models/prompt";

export const GET = async (request, { params }) => {
  try {
    await connectToDb();

    const prompt = await Prompt.findById(params.id).populate("creator");
    if (!prompt) {
      return new Response(JSON.stringify("Prompt not found", { status: 404 }));
    }
    return new Response(JSON.stringify(prompt, { status: 200 }));
  } catch (error) {
    return new Response(
      JSON.stringify("Failed to fetch all prompts", { status: 500 })
    );
  }
};

export const PATCH = async (request, { params }) => {
  const { prompt, tag } = await request.json();

  try {
    await connectToDb();

    const existingPrompt = await Prompt.findById(params.id);

    if (!existingPrompt) {
      return new Response(JSON.stringify("Prompt not found", { status: 404 }));
    }

    existingPrompt.prompt = prompt;
    existingPrompt.tag = tag;

    await existingPrompt.save();

    return new Response(JSON.stringify(existingPrompt, { status: 200 }));
  } catch (error) {
    return new Response(
      JSON.stringify("Failed to update prompt", { status: 500 })
    );
  }
};

export const DELETE = async (request, { params }) => {
  console.log("requested delete");
  try {
    await connectToDb();

    console.log(params.id);
    await Prompt.findByIdAndDelete(params.id);

    console.log("deleted");
    return new Response(JSON.stringify("Prompt deleted", { status: 200 }));
  } catch (error) {
    return new Response(
      JSON.stringify("Failed to delete prompt", { status: 500 })
    );
  }
};
