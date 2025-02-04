// src/app/api/passwordless-login/route.ts
import { NextRequest, NextResponse } from "next/server";
import admin from "../../lib/firebaseadmin"; // lowercase 'admin'

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    // Look up the user by email
    const userRecord = await admin.auth().getUserByEmail(email);
    // Create a custom token for the user
    const token = await admin.auth().createCustomToken(userRecord.uid);

    console.log("Generated token for", email, ":", token); // DEBUG line

    return NextResponse.json({ token });
  } catch (error: any) {
    console.error("Error creating custom token:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
