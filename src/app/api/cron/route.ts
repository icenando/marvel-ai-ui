import { revalidatePath } from "next/cache";

export async function GET() {
  revalidatePath("/");
  revalidatePath("/(mainSection)/[mainSection]");
  revalidatePath("/archive");
  revalidatePath("/archive/[eventId]");
}
