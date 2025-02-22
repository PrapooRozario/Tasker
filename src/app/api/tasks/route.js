import dbConnect from "@/lib/dbConnect";


export async function POST(req) {
  const { task } = await req.json();
  const data = await dbConnect("Tasks").insertOne(task);
  return Response.json(data);
}
