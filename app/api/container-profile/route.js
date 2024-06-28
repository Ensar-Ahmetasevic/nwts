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

    if (!containerProfileData) {
      return NextResponse.json(
        {
          containerProfileData: null,
          message: "No container information available",
        },
        { status: 200 },
      );
    }

    return NextResponse.json({ containerProfileData }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      {
        message: "Failed to fetch Shipping Information Data.",
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

// Update container profile

export async function PUT(req) {
  const { preparedData } = await req.json();

  const { id, quantity, locationOrigin, wasteProfile, containerType } =
    preparedData;

  if (!id || !quantity || !locationOrigin || !wasteProfile || !containerType) {
    return NextResponse.json(
      { message: "All fields are required" },
      { status: 400 },
    );
  }

  try {
    const updatedProfile = await prisma.containerProfile.update({
      where: { id: parseInt(id) },
      data: {
        quantity: parseInt(quantity),
        locationOriginId: parseInt(locationOrigin),
        wasteProfileId: parseInt(wasteProfile),
        containerTypeId: parseInt(containerType),
      },
    });

    return NextResponse.json(
      { message: "Container Profile updated successfully.", updatedProfile },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error updating Container Profile:", error);
    return NextResponse.json(
      { message: "Failed to update Container Profile", error: error.message },
      { status: 500 },
    );
  }
}
