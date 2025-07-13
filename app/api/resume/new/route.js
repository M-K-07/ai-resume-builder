import { NextResponse } from 'next/server';
import dbConnect from "../../../../lib/dbConnect";
import Resume from "../../../../models/Resume";

export async function POST(request) {
    try {
        await dbConnect();

        const body = await request.json();

        if (!body.userId) {
            return NextResponse.json({ error: "User ID is required" }, { status: 400 });
        }

        const newResume = await Resume.create({
            userId: body.userId,
            resume_name: body.resume_name,
            summary: body.summary || "",
            personalDetails: body.personalDetails || {
                firstName: "",
                lastName: "",
                email: "",
                phone: "",
                linkedIn: "",
                github: "",
                leetCode: "",
            },
            workExperience: body.workExperience || [],
            education: body.education || [],
            skills: body.skills || [],
            technologiesKnown: body.technologiesKnown,
            jobTitle: body.jobTitle,
            yearsOfExperience: body.yearsOfExperience,
            jobDescription: body.jobDescription
        });

        return NextResponse.json(newResume, { status: 201 });

    } catch (err) {
        console.error(" Error creating resume:", err);
        return NextResponse.json({ error: "Failed to create resume" }, { status: 500 });
    }
}



