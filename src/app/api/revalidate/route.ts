import { revalidatePath } from "next/cache";

export async function GET() {
  revalidatePath("/archive");
  revalidatePath("/");

  return Response.json({ info: "finished running revalidatePath" });
}
