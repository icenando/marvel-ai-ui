import { revalidatePath } from "next/cache";

export async function GET() {
  revalidatePath("/", "layout");
  revalidatePath("/archive", "page");
  revalidatePath("/archive/[eventId]", "page");

}
