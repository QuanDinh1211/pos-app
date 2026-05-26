import { NextResponse } from "next/server";

import fs from "fs";

import path from "path";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json(
        {
          message: "No file",
        },
        {
          status: 400,
        },
      );
    }

    // convert file
    const bytes = await file.arrayBuffer();

    const buffer = Buffer.from(bytes);

    // unique filename
    const fileName = `${Date.now()}-${file.name}`;

    // path
    const uploadDir = path.join(process.cwd(), "public/uploads/products");

    // create folder if not exists
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, {
        recursive: true,
      });
    }

    // save file
    const filePath = path.join(uploadDir, fileName);

    fs.writeFileSync(filePath, buffer);

    return NextResponse.json({
      url: `/uploads/products/${fileName}`,
    });
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        message: "Upload failed",
      },
      {
        status: 500,
      },
    );
  }
}
