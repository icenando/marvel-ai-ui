import { revalidatePath } from "next/cache";

export async function GET() {
  revalidatePath("/", "page");
  revalidatePath("/archive", "page");
  revalidatePath("/archive/[eventId]", "page");
}
