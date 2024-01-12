import { revalidatePath } from "next/cache";

export async function GET() {
  revalidatePath("/archive/page");
  revalidatePath("/archive/[eventId]", "layout");
  revalidatePath("/page");

  return Response.json({ info: "finished running revalidatePath" });
}
