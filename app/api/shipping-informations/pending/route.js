import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// GET request to fetch pending ShippingInformation filtered by hall ID (preStorageID)
export async function GET() {
  try {
    // Get all ShippingInformation with status "pending" that have containers with matching wasteProfile
    const pendingShippingInformations =
      await prisma.shippingInformation.findMany({
        where: {
          status: "pending",
        },
        include: {
          containerProfiles: {
            include: {
              wasteProfile: true, // Uključuje informacije o wasteProfile
            },
          },
        },
      });

    return NextResponse.json({ pendingShippingInformations }, { status: 200 });
  } catch (error) {
    console.error("Error fetching Pending Shipping Informations:", error);
    return NextResponse.json(
      {
        message: "Failed to fetch Pending Shipping Informations",
        error: error.message,
      },
      { status: 500 },
    );
  }
}
