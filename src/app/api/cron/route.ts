import { revalidatePath } from "next/cache";

export async function GET() {
  revalidatePath("/archive");
  revalidatePath("/archive/[eventId]");
  revalidatePath("/", "layout");

  return Response.json({ info: "finished running revalidatePath" });
}
