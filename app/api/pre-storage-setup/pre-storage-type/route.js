import { NextResponse } from "next/server";

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Createing  data
export async function POST(req, res) {
  const formData = await req.json();

  const { name, surfaceArea, preStorageFor } = formData;

  // Ensure surfaceArea is a valid number
  const surfaceAreaNumber = parseFloat(surfaceArea).toFixed(2);
  // Store up to two decimal places but it returns a string so befor seding to the database we need to convert it to a number again

  if (
    !name ||
    !surfaceAreaNumber ||
    !preStorageFor ||
    isNaN(surfaceAreaNumber)
  ) {
    return NextResponse.json(
      {
        message:
          "Backend: All fields are required and surface area must be a valid number",
      },
      { status: 400 },
    );
  }

  try {
    await prisma.preStorageType.create({
      data: {
        name,
        surfaceArea: parseFloat(surfaceAreaNumber), // Store it as a float
        preStorageFor,
      },
    });

    return NextResponse.json(
      { message: "New Pre-Storage Type added successfully." },
      { status: 200 },
    );
  } catch (error) {
    console.error("Faild to create Pre-Storage Type: ", error);
    return NextResponse.json(
      { message: "Failed to create Pre-Storage Type" },
      { status: 500 },
      { error: `${error.message}` },
    );
  }
}

// Fetch data
export async function GET() {
  try {
    const preStorageTypeData = await prisma.preStorageType.findMany({
      orderBy: { id: "desc" },
    });

    if (!preStorageTypeData) {
      return NextResponse.json(
        {
          preStorageTypeData: null,
          message: "No Pre-Storage Type information available",
        },
        { status: 200 },
      );
    }

    return NextResponse.json({ preStorageTypeData }, { status: 200 });
  } catch (error) {
    console.error("Faild to fetch Pre-Storage Type: ", error);
    return NextResponse.json(
      {
        message: "Failed to fetch Pre-Storage Type.",
        error: error.message,
      },
      { status: 500 },
    );
  }
}

//  Delete data

export async function DELETE(req) {
  const { id } = await req.json();

  console.log("id", id);

  try {
    await prisma.preStorageType.delete({
      where: { id: id },
    });
    return NextResponse.json(
      { message: "Pre-Storage Type deleted successfully." },
      { status: 200 },
    );
  } catch (error) {
    console.error("Faild to delete Pre-Storage Type. ", error);
    return NextResponse.json(
      { message: "Faild to delete Pre-Storage Type. ", error: error.message },
      { status: 500 },
    );
  }
}

// Update container type

export async function PUT(req, res) {
  const { dataForUpdate } = await req.json();

  const { name, surfaceArea, preStorageFor, id } = dataForUpdate;

  // Ensure surfaceArea is a valid number
  const surfaceAreaNumber = parseFloat(parseFloat(surfaceArea).toFixed(2));
  // Store up to two decimal places but it returns a string so befor seding to the database we need to convert it to a number again

  if (
    !name ||
    !surfaceAreaNumber ||
    !preStorageFor ||
    isNaN(surfaceAreaNumber)
  ) {
    return NextResponse.json(
      {
        message:
          "Backend: All fields are required and surface area must be a valid number",
      },
      { status: 400 },
    );
  }

  try {
    const updatePreStorageType = await prisma.preStorageType.update({
      where: { id: parseInt(id) },
      data: {
        name,
        surfaceArea: surfaceAreaNumber,
        preStorageFor,
      },
    });

    return NextResponse.json(
      {
        message: "Pre-Storage Type updated successfully",
        updatePreStorageType,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Faild to update Pre-Storage Type.", error);
    return NextResponse.json(
      { message: "Faild to update Pre-Storage Type.", error: error.message },
      { status: 500 },
    );
  }
}
