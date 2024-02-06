import { NextResponse } from "next/server";

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Createing  data
export async function POST() {
  try {
    await prisma.shippingInformation.create({});

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
    const shippingData = await prisma.shippingInformation.findMany({
      orderBy: { id: "desc" },
    });

    return NextResponse.json({ shippingData }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to to catch Shipping Informations Data." },
      { status: 500 },
      { error: error.message },
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
