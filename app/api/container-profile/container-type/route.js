import { NextResponse } from "next/server";

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Createing  data
export async function POST(req, res) {
  const formData = await req.json();
  const {
    name,
    material,
    volume,
    carryingCapacity,
    radioactivityLevel,
    physicalProperties,
    footprint,
    description,
  } = formData;

  if (!formData) {
    return NextResponse.json(
      { message: "Backend: `Did not receive data from Container Type form`" },
      { status: 200 },
    );
  }

  try {
    // Parse volume to float
    const parsedVolume = parseFloat(volume);
    const parsedCarryingCapacity = parseFloat(carryingCapacity);
    const parsedFootprint = parseFloat(footprint);

    await prisma.containerType.create({
      data: {
        name,
        material,
        volume: parsedVolume,
        carryingCapacity: parsedCarryingCapacity,
        radioactivityLevel,
        physicalProperties,
        footprint: parsedFootprint,
        description,
      },
    });

    return NextResponse.json(
      { message: "New Container Type added successfully." },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to create Container Type" },
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

    return NextResponse.json({ containerTypeData }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to to catch Location Origin Data." },
      { status: 500 },
      { error: error.message },
    );
  }
}

//  Delete data

export async function DELETE(req) {
  const { id } = await req.json();

  try {
    await prisma.locationOrigin.delete({
      where: { id: id },
    });
    return NextResponse.json(
      { message: "Location Origin deleted successfully." },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to to catch Location Origin data." },
      { status: 500 },
      { error: error.message },
    );
  }
}
