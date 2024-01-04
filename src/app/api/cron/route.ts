import { revalidatePath } from "next/cache";

export async function GET() {
  try {
    revalidatePath("/archive");
  } catch (e) {
    return e;
  }
}
