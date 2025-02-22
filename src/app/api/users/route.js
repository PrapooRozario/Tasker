import dbConnect from "@/lib/dbConnect";

export async function PUT(req) {
  const { username, email } = await req.json();
  const result = await dbConnect("Users").updateOne(
    { email: email },
    {
      $setOnInsert: {
        username: username,
        email: email,
      },
    },
    { upsert: true }
  );
  return Response.json({ success: true, result }, { status: 200 });
}

export async function GET(req) {
  const result = await dbConnect("Users").find().toArray();
  return Response.json(result);
}
