import { revalidateTag } from "next/cache";
import { NextResponse, type NextRequest } from "next/server";
import { parseBody } from "next-sanity/webhook";

export async function POST(req: NextRequest) {
  const secret = process.env.SANITY_REVALIDATE_SECRET;
  if (!secret) return new NextResponse("Not configured", { status: 500 });
  const { isValidSignature } = await parseBody(req, secret);
  if (!isValidSignature) return new NextResponse("Invalid signature", { status: 401 });
  revalidateTag("sanity", "max");
  return NextResponse.json({ revalidated: true });
}
