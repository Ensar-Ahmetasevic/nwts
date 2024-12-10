import { NextResponse } from "next/server";
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

// Creating new request to pre-storage

export async function POST(req, res) {
  const formData = await req.json();

  const {
    quantity,
    finalStorageLocationId,
    responsibleFinalStorageEmployeeId,
  } = formData;

  if (
    !quantity ||
    !finalStorageLocationId ||
    !responsibleFinalStorageEmployeeId
  ) {
    return NextResponse.json(
      {
        message: "Backend: All fields are required",
      },
      { status: 400 },
    );
  }

  try {
    await prisma.storageTransferRequest.create({
      data: {
        quantity,
        finalStorageLocationId,
        responsibleFinalStorageEmployeeId,
      },
    });

    return NextResponse.json(
      { message: "New request to pre-storage created successfully." },
      { status: 200 },
    );
  } catch (error) {
    console.error("Faild to send request to pre-storage:", error);
    return NextResponse.json(
      { message: "Faild to send request to pre-storage" },
      { status: 500 },
      { error: `${error.message}` },
    );
  }
}

// Fetch data

export async function GET() {
  try {
    const finalStorageOfCapacityData =
      await prisma.storageTransferRequest.findMany({
        orderBy: {
          id: "desc",
        },
      });

    if (finalStorageOfWasteData.length === 0) {
      return NextResponse.json(
        {
          finalStorageOfWasteData: null,
          message: "No request to pre-storage data available.",
        },
        { status: 204 }, // No Content
      );
    }

    return NextResponse.json(
      { finalStorageOfCapacityData, message: "Data fetched successfully" },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: "Failed to fetch FinalStorage Of Waste Data.",
        error: error.message,
      },
      { status: 500 },
    );
  }
}
