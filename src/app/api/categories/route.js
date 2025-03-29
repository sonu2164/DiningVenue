import { isAdmin } from "@/app/api/auth/[...nextauth]/route";
import { Category } from "@/models/Category";
import mongoose from "mongoose";

export async function POST(req) {
  try {


    mongoose.connect(process.env.MONGO_URL);
    const { name } = await req.json();
    if (await isAdmin()) {
      const categoryDoc = await Category.create({ name });
      return Response.json(categoryDoc);
    } else {
      return Response.json({});
    }
  } catch (error) {
    console.log(error);
  }
}

export async function PUT(req) {
  try {



    mongoose.connect(process.env.MONGO_URL);
    const { _id, name } = await req.json();
    if (await isAdmin()) {
      await Category.updateOne({ _id }, { name });
    }
    return Response.json(true);
  }
  catch (error) {
    console.log(error);


  }
}

export async function GET() {
  try {


    mongoose.connect(process.env.MONGO_URL);

    return Response.json(
      await Category.find()
    );
  } catch (error) {
    console.log(error);


  }
}

export async function DELETE(req) {
  try {


    mongoose.connect(process.env.MONGO_URL);

    const url = new URL(req.url);
    const _id = url.searchParams.get('_id');
    if (await isAdmin()) {
      await Category.deleteOne({ _id });
    }
    return Response.json(true);
  } catch (error) {
    console.log(error);

  }
}