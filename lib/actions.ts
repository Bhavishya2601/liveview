"use server"

import mongoose from "mongoose";
import { CodeModel } from "./mongodb";
import { revalidatePath } from "next/cache";

if (!process.env.MONGODB_URI) {
    throw new Error("mongoDB URI not found");
}
const URI = process.env.MONGODB_URI;

const connectToDatabase = async () => {
    if (mongoose.connection.readyState === 0) {
        await mongoose.connect(URI)
    }
}

interface NewProject {
    projectName: string;
    projectSlug: string;
    htmlCode?: string;
    cssCode?: string;
    jsCode?: string;
    userId: string;
    createdAt: Date;
    updatedAt: Date;
}

export async function createNewProject(data: NewProject) {
    await connectToDatabase();

    const code = new CodeModel({
        ...data,
        createdAt: new Date(),
        updatedAt: new Date(),
    });

    await code.save();
    revalidatePath('/');
}