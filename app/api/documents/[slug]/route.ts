import { readFile } from "fs/promises";
import path from "path";
import { NextResponse } from "next/server";
import { GATED_DOCUMENTS } from "@/lib/documents";
import { hasMaterialsAccess } from "@/lib/materials-access";

type RouteContext = {
  params: Promise<{ slug: string }>;
};

export async function GET(_request: Request, context: RouteContext) {
  const { slug } = await context.params;
  const document = GATED_DOCUMENTS.find((item) => item.slug === slug);

  if (!document || !document.available) {
    return NextResponse.json({ error: "Document not found." }, { status: 404 });
  }

  if (!(await hasMaterialsAccess())) {
    return NextResponse.json({ error: "Materials access required." }, { status: 401 });
  }

  try {
    const filePath = path.join(process.cwd(), "private", "documents", document.filename);
    const file = await readFile(filePath);

    return new NextResponse(file, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `inline; filename="${document.filename}"`,
        "Cache-Control": "private, no-store",
      },
    });
  } catch {
    return NextResponse.json({ error: "Document unavailable." }, { status: 404 });
  }
}
