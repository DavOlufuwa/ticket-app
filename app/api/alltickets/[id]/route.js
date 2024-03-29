import Ticket from "@/app/models/Ticket";
import { NextResponse } from "next/server";
import connect from "@/db";

export async function GET(request, { params }) {
  try {
    await connect();
    const { id } = params;
    const ticket = await Ticket.findById(id);
    return NextResponse.json({ ticket }, { status: 200 });
  }
  catch (error) {
    return NextResponse.json({ message: "ERROR", error }, { status: 500 });
  }
}


export async function DELETE(request, { params }) {
  try {
    await connect();
    const { id } = params;
    await Ticket.findByIdAndDelete(id);
    return NextResponse.json({ message: "Ticket Deleted" }, { status: 200 });
  }
  catch (error) {
    return NextResponse.json({ message: "ERROR", error }, { status: 500 });
  }
}

export async function PUT(request, { params }) {
  try {
    const { id } = params;
    const body = await request.json();
    const ticketData = body.formData;

    const updateTicketData = await Ticket.findByIdAndUpdate(id, { ...ticketData }, { new: true });

    return NextResponse.json({ message: "Ticket Updated" }, { status: 200 });
  }
  catch (error) {
    return NextResponse.json({ message: "ERROR", error }, { status: 500 });
  }
}