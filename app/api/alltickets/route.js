import Ticket from "@/app/models/Ticket";
import { NextResponse } from "next/server";
import connect from "@/db";
export async function POST(request) {
  try {
    await connect();
    const body = await request.json();
    const ticketData = body.formData;
    await Ticket.create(ticketData);
    return NextResponse.json({ message: "Ticket Created" }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "ERROR", error }, { status: 500 });
  }
}

export async function GET() {
  try {
    await connect();
    const tickets = await Ticket.find();
    return NextResponse.json({ tickets }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "ERROR", error }, { status: 500 });
  }
}
