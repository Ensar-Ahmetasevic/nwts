import { NextResponse } from "next/server";
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

// Creating data

export async function POST(req, res) {
  const formData = await req.json();

  const { quantity, preStorageLocationId, responsibleEmployeePreStorageId } =
    formData;

  if (!quantity || !preStorageLocationId || !responsibleEmployeePreStorageId) {
    return NextResponse.json(
      {
        message: "Backend: All fields are required",
      },
      { status: 400 },
    );
  }

  try {
    await prisma.preStorageOfWaste.create({
      data: {
        quantity,
        preStorageLocationId,
        responsibleEmployeePreStorageId,
      },
    });

    return NextResponse.json(
      { message: "New Pre-Storage Waste add successfully." },
      { status: 200 },
    );
  } catch (error) {
    console.error("Faild to creat Pre-Storage Type:", error);
    return NextResponse.json(
      { message: "Faild to add Pre-Storage Waste" },
      { status: 500 },
      { error: `${error.message}` },
    );
  }
}
