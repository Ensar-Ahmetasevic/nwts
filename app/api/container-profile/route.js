import { NextResponse } from "next/server";

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Creating  data
export async function POST(req, res) {
  const formData = await req.json();

  const {
    quantity,
    locationOriginId,
    wasteProfileId,
    containerTypeId,
    shippingInformationId,
  } = formData;

  if (
    !quantity ||
    !locationOriginId ||
    !wasteProfileId ||
    !containerTypeId ||
    !shippingInformationId
  ) {
    return NextResponse.json(
      { message: "All fields are required" },
      { status: 400 },
    );
  }

  // Parse data from string to integer
  const parsedQuantity = parseInt(quantity);
  const parsedLocationOriginId = parseInt(locationOriginId);
  const parsedWasteProfileId = parseInt(wasteProfileId);
  const parsedContainerTypeId = parseInt(containerTypeId);
  const parsedShippingInformationId = parseInt(shippingInformationId);

  try {
    await prisma.containerProfile.create({
      data: {
        quantity: parsedQuantity,
        locationOriginId: parsedLocationOriginId,
        wasteProfileId: parsedWasteProfileId,
        containerTypeId: parsedContainerTypeId,
        shippingInformationId: parsedShippingInformationId,
      },
    });

    return NextResponse.json(
      {
        message: "New Container Profile added successfully.",
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error creating Container Profile:", error);
    return NextResponse.json(
      { message: "Failed to create Container Profile", error: error.message },
      { status: 500 },
    );
  }
}

// Fetch data
export async function GET() {
  try {
    const containerProfileData = await prisma.containerProfile.findMany({
      orderBy: { id: "desc" },
    });

    return NextResponse.json({ containerProfileData }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to to catch Container Profile Data." },
      { status: 500 },
      { error: error.message },
    );
  }
}

//  Delete data

export async function DELETE(req) {
  const { id } = await req.json();

  try {
    await prisma.containerProfile.delete({
      where: { id: parseInt(id) },
    });
    return NextResponse.json(
      { message: "Container Profile deleted successfully." },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: "Failed to delete Container Profile data.",
        error: error.message,
      },
      { status: 500 },
    );
  }
}
