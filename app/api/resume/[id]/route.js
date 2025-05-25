import { NextResponse } from 'next/server';
import dbConnect from "../../../../lib/dbConnect";
import Resume from "../../../../models/Resume";

export async function PUT(req, { params }) {
    try {
        await dbConnect();
        const {id}  = params;
        const body = await req.json();
       
        const updatedResume = await Resume.findByIdAndUpdate(
            id,
            body,
            { new: true }
        );

        if (!updatedResume) {
            return NextResponse.json({ error: "Resume not found" }, { status: 404 });
        }

        return NextResponse.json(updatedResume, { status: 200 });
    } catch (error) {
        console.error("Error updating resume:", error);
        return NextResponse.json({ error: "Failed to update resume" }, { status: 500 });
    }
}
export async function GET(req, { params }) {
    try {
        await dbConnect();
        const { id } = params
       
        const resume=await Resume.findById(id)

        if (!resume) {
            return NextResponse.json({ error: "Resume not found" }, { status: 404 });
        }

        return NextResponse.json(resume, { status: 200 });
    } catch (error) {
        console.error("Error updating resume:", error);
        return NextResponse.json({ error: "Failed to update resume" }, { status: 500 });
    }
}

export async function DELETE(req, { params }) {
    try {
        await dbConnect();
        const { id } = params
       
        const resume=await Resume.findByIdAndDelete(id) 
        if (!resume) {
            return NextResponse.json({ error: "Resume not found" }, { status: 404 });
        }
        return NextResponse.json({ message: "Resume deleted successfully" }, { status: 200 });
    } catch (error) {
        console.error("Error deleting resume:", error);
        return NextResponse.json({ error: "Failed to delete resume" }, { status: 500 });
    }
}



