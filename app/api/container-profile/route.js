import { NextResponse } from "next/server";

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Createing  data
export async function POST(req, res) {
  const formData = await req.json();
  const { quantity } = formData;

  if (!formData) {
    return NextResponse.json(
      { message: "Backend: `Did not receive data from Waste Profile form`" },
      { status: 200 },
    );
  }

  try {
    // Parse quantity to float
    const parsedQuantity = parseInt(quantity);

    await prisma.containerProfile.create({
      data: {
        quantity: parsedQuantity,
      },
    });

    return NextResponse.json(
      { message: "New Container Profile added successfully." },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to create Container Profile" },
      { status: 500 },
      { error: `${error.message}` },
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
    await prisma.wasteProfile.delete({
      where: { id: id },
    });
    return NextResponse.json(
      { message: "Waste Profile deleted successfully." },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to to catch Waste Profile data." },
      { status: 500 },
      { error: error.message },
    );
  }
}
