import dbConnect from "@/lib/dbConnect";

export async function GET(req) {
  const data = await dbConnect("Tasks").find().toArray();
  return Response.json(data);
}

export async function POST(req) {
  const {task} = await req.json();
  const data = await dbConnect("Tasks").insertOne(task);
  return Response.json(data);
}
