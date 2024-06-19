import { NextResponse } from "next/server";

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Creating  data
export async function POST(req, res) {
  const formData = await req.json();

  const { companyName, driverName, registrationPlates } = formData;

  if (!formData) {
    return NextResponse.json(
      {
        message:
          "Backend: `Did not receive data from Shipping Informations form`",
      },
      { status: 200 },
    );
  }

  try {
    await prisma.shippingInformation.create({
      data: { companyName, driverName, registrationPlates },
    });

    return NextResponse.json(
      { message: "New Shipping Information added successfully." },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to create Shipping Information." },
      { status: 500 },
      { error: `${error.message}` },
    );
  }
}

// Fetch data

export async function GET() {
  try {
    const shippingData = await prisma.shippingInformation.findFirst({
      orderBy: {
        createdAt: "desc",
      },
      include: {
        containerProfiles: {
          include: {
            locationOrigin: true,
            wasteProfile: true,
            containerType: true,
          },
        },
      },
    });

    if (!shippingData) {
      return NextResponse.json(
        { shippingData: null, message: "No shipping information available" },
        { status: 200 },
      );
    }

    return NextResponse.json({ shippingData }, { status: 200 });
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
    await prisma.shippingInformation.delete({
      where: { id: id },
    });
    return NextResponse.json(
      { message: "Shipping Information deleted successfully." },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to to catch Shipping Informations data." },
      { status: 500 },
      { error: error.message },
    );
  }
}
