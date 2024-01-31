import { NextResponse } from "next/server";

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Createing Shipping Informations data
export async function POST(req, res) {
  const { name } = await req.json();

  if (!name) {
    return NextResponse.json(
      { message: "Please enter your shipping information name." },
      { status: 422 },
    );
  }

  try {
    await prisma.shippingInformation.create({ data: { name } });

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

// Createing Shipping Informations data
export async function GET(req, res) {
  try {
    const allShippingData = await prisma.todoList.findMany({
      orderBy: { id: "desc" },
    });
    res.status(200).json({ allShippingData });
  } catch (error) {
    res.status(500).json({
      message: "Failed to to catch Shipping Informations Data.",
      error: error.message,
    });
  }
  return;
}
