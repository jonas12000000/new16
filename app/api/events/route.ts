import Event from "@/database/event.model";
import connectDB from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";
import {v2 as cloudinary } from "cloudinary"

export async function POST(req: NextRequest){
    try {
        await connectDB();
        console.log("db connected")

        const formData = await req.formData();
        console.log("getting the data from the form")

        let event;

        try {
            event = Object.fromEntries(formData.entries());
        } catch (e) {
            return NextResponse.json({message: "Invalid form data"}, {status: 400})
        }

        const file = formData.get("image") as File;

        if (!file) return NextResponse.json({message: "Can't get image file"}, {status: 400})

        let tags = JSON.parse(formData.get('tags') as string)
        const agenda = JSON.parse(formData.get('agenda') as string)

        const bufferArray = await file.arrayBuffer();

        const buffer = Buffer.from(bufferArray)

        const uploadResult = await new Promise((resolve, reject) => {
            cloudinary.uploader.upload_stream({resource_type: "image", folder: "events"}, (error, results) => {
                if(error) return reject(error)

                resolve(results)
            }).end(buffer);
        })

        event.image = (uploadResult as { secure_url: string }).secure_url;

        const createdEvent = Event.create({
            ...event,
            tags: tags,
            agenda: agenda
        })

        return NextResponse.json({message: "Event successfully created", event: createdEvent}, {status: 400})
    } catch (error) {
        console.log(error)
        return NextResponse.json({message: "Internal Server Error", error: error instanceof Error ? error.message : 'Unknown'}, {status: 500})
    }
}


export async function GET() {
    try {
        await connectDB();

        const events = await Event.find().sort({createdAt: -1})

        return NextResponse.json({message: "data fetch successfully"}, {status: 200})
    } catch (e) {
        return NextResponse.json({message: "Error connecting to database", error: e}, {status: 500})
    }
}