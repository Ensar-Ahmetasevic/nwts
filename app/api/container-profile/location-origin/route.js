import { NextResponse } from "next/server";

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Createing  data
export async function POST(req, res) {
  const formData = await req.json();
  const { name, address, origin } = formData;

  if (!formData) {
    return NextResponse.json(
      { message: "Backend: `Did not recive data from Location Origin form`" },
      { status: 200 },
    );
  }

  try {
    await prisma.locationOrigin.create({ data: { name, address, origin } });

    return NextResponse.json(
      { message: "New Location Origin added successfully." },
      { status: 200 },
    );
  } catch (error) {
    console.error("Failed to create Location Origin: ", error);
    return NextResponse.json(
      { message: "Failed to create Location Origin" },
      { status: 500 },
      { error: `${error.message}` },
    );
  }
}

// Fetch data
export async function GET() {
  try {
    const locationOriginData = await prisma.locationOrigin.findMany({
      orderBy: { id: "desc" },
    });

    return NextResponse.json({ locationOriginData }, { status: 200 });
  } catch (error) {
    console.error("Failed to fetch Location Origin Data: ", error);
    return NextResponse.json(
      { message: "Failed to fetch Location Origin Data." },
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
    console.error("Failed to delete Location Origin Data: ", error);
    return NextResponse.json(
      { message: "Failed to delete Location Origin data." },
      { status: 500 },
      { error: error.message },
    );
  }
}
