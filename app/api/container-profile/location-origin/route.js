import { NextResponse } from "next/server";

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Createing  data
export async function POST(req, res) {
  const formData = await req.json();
  const { name, address, origin } = formData;

  if (!formData) {
    return NextResponse.json(
      { message: "Backend: `Please enter your new Todo List.`" },
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
    return NextResponse.json(
      { message: "Failed to createLocation Origin" },
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
