import { NextResponse } from "next/server";

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Createing  data
export async function POST(req, res) {
  const formData = await req.json();

  const {
    name,
    typeOfWaste,
    wasteDescription,
    risksAndHazards,
    processingMethods,
    physicalProperties,
    chemicalProperties,
    biologicalProperties,
    collectionProcedures,
    recommendationsForTransport,
  } = formData;

  if (!formData) {
    return NextResponse.json(
      { message: "Backend: `Did not receive data from Waste Profile form`" },
      { status: 200 },
    );
  }

  try {
    await prisma.wasteProfile.create({
      data: {
        name,
        typeOfWaste,
        wasteDescription,
        risksAndHazards,
        processingMethods,
        physicalProperties,
        chemicalProperties,
        biologicalProperties,
        collectionProcedures,
        recommendationsForTransport,
      },
    });

    return NextResponse.json(
      { message: "New Waste Profile added successfully." },
      { status: 200 },
    );
  } catch (error) {
    console.error("Failed to create Waste Profile: ", error);
    return NextResponse.json(
      { message: "Failed to create Waste Profile" },
      { status: 500 },
      { error: `${error.message}` },
    );
  }
}

// Fetch data
export async function GET() {
  try {
    const wasteProfileData = await prisma.wasteProfile.findMany({
      orderBy: { id: "desc" },
    });

    return NextResponse.json({ wasteProfileData }, { status: 200 });
  } catch (error) {
    console.error("Failed to catch Waste Profile Data: ", error);
    return NextResponse.json(
      { message: "Failed to catch Waste Profile Data." },
      { status: 500 },
      { error: error.message },
    );
  }
}

//  Delete data

export async function DELETE(req) {
  const { id } = await req.json();

  try {
    await prisma.wasteProfile.delete({
      where: { id: id },
    });
    return NextResponse.json(
      { message: "Waste Profile deleted successfully." },
      { status: 200 },
    );
  } catch (error) {
    console.error("Failed to delete Waste Profile: ", error);
    return NextResponse.json(
      { message: "Failed to delete Waste Profile data." },
      { status: 500 },
      { error: error.message },
    );
  }
}
