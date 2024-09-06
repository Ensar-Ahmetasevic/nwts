import { NextResponse } from "next/server";

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Createing  data
export async function POST(req, res) {
  const formData = await req.json();

  const { name, surfaceArea, preStorageFor } = formData;

  // Ensure surfaceArea is a valid number
  const surfaceAreaNumber = parseFloat(surfaceArea).toFixed(2); // Store up to two decimal places
  console.log("surfaceAreaNumber", surfaceAreaNumber);

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
        surfaceArea: parseFloat(surfaceArea), // Store it as a float
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
    const containerTypeData = await prisma.containerType.findMany({
      orderBy: { id: "desc" },
    });

    if (!containerTypeData) {
      return NextResponse.json(
        {
          containerProfileData: null,
          message: "No Container Type information available",
        },
        { status: 200 },
      );
    }

    return NextResponse.json({ containerTypeData }, { status: 200 });
  } catch (error) {
    console.error("Faild to fetch Container Type: ", error);
    return NextResponse.json(
      {
        message: "Failed to fetch Container Type Data.",
        error: error.message,
      },
      { status: 500 },
    );
  }
}

//  Delete data

export async function DELETE(req) {
  const { id } = await req.json();

  try {
    await prisma.containerType.delete({
      where: { id: id },
    });
    return NextResponse.json(
      { message: "Container Type deleted successfully." },
      { status: 200 },
    );
  } catch (error) {
    console.error("Faild to delete Container Type: ", error);
    return NextResponse.json(
      { message: "Faild to delete Container Type: ", error: error.message },
      { status: 500 },
    );
  }
}

// Update container type

export async function PUT(req, res) {
  const { preparedData } = await req.json();

  const {
    name,
    material,
    volume,
    carryingCapacity,
    radioactivityLevel,
    physicalProperties,
    footprint,
    description,
    id,
  } = preparedData;

  if (
    (!name,
    !material,
    !volume,
    !carryingCapacity,
    !radioactivityLevel,
    !physicalProperties,
    !footprint,
    !description,
    !id)
  ) {
    return NextResponse.json(
      { message: "All fields are required" },
      { status: 400 },
    );
  }

  try {
    const updateContainerType = await prisma.containerType.update({
      where: { id: parseInt(id) },
      data: {
        name: name,
        material: material,
        volume: parseInt(volume),
        carryingCapacity: parseInt(carryingCapacity),
        radioactivityLevel: radioactivityLevel,
        physicalProperties: physicalProperties,
        footprint: parseInt(footprint),
        description: description,
      },
    });

    return NextResponse.json(
      { message: "Container Type updated successfully", updateContainerType },
      { status: 200 },
    );
  } catch (error) {
    console.error("Faild to update Container Type: ", error);
    return NextResponse.json(
      { message: "Faild to update Container Type: ", error: error.message },
      { status: 500 },
    );
  }
}
