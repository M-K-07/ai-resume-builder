import { NextResponse } from 'next/server';
import dbConnect from "../../../lib/dbConnect";
import Resume from "../../../models/Resume";

export async function GET(request) {
    try {
        await dbConnect();
        const { searchParams } = new URL(request.url);
        const userId = searchParams.get("userId");

        if (!userId) {
            return NextResponse.json({ error: "Not authorized" }, { status: 400 });
        }
        const resume = await Resume.find({ userId }).sort({ createdAt: -1 });
        return NextResponse.json(resume, { status: 200 });
    } catch (error) {
        console.log("Error fetching resumes:", error)
        return NextResponse.json({ error: "Failed to fetch resumes" }, { status: 500 });
    }
}