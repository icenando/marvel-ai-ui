import { revalidatePath } from "next/cache";

export async function GET() {
  revalidatePath("/archive/page");
  revalidatePath("/archive/[eventId]/page");
  revalidatePath("/page");

  return Response.json({ info: "finished running revalidatePath" });
}
