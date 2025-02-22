import dbConnect from "@/lib/dbConnect";
import { ObjectId } from "mongodb";


export async function GET(req, { params }) {
  const { _id } = await params;
  console.log(_id)
  const data = await dbConnect("Tasks").find({ email: _id }).toArray();
  return Response.json(data);
}

export async function PUT(req, { params }) {
  const { _id } = await params;
  const { category } = await req.json();
  const result = await dbConnect("Tasks").updateOne(
    { _id: new ObjectId(_id) },
    {
      $set: {
        category: category,
      },
    }
  );
  return Response.json(result);
}

export async function PATCH(req, { params }) {
  const { _id } = await params;
  const editedTask = await req.json();
  const result = await dbConnect("Tasks").updateOne(
    { _id: new ObjectId(_id) },
    {
      $set: {
        title: editedTask?.title,
        description: editedTask?.description,
      },
    }
  );
  return Response.json(result);
}

export async function DELETE(req, { params }) {
  const { _id } = await params;
  const result = await dbConnect("Tasks").deleteOne({ _id: new ObjectId(_id) });
  return Response.json(result);
}
