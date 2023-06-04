import { connection, insert, getAllDocuments } from "../../../helpers/db-utils";
async function handler(req, res) {
  const eventId = req.query.eventId;
  let client;
  try {
    client = await connection();
  } catch (err) {
    res.status(500).json({ message: "Connecting to the database failed" });
  }

  if (req.method === "POST") {
    const { email, name, text } = req.body;

    if (
      !email.includes("@") ||
      !name ||
      name.trim() === "" ||
      !text ||
      text.trim() === ""
    ) {
      res.status(422).json({ message: "Invalid Input!" });
      client.close();
      return;
    }

    const newComment = {
      email,
      name,
      text,
      eventId,
    };

    try {
      const result = await insert(client, "comments", newComment);
      newComment._id = result.insertedId;
      res.status(201).json({ message: "Added comment. " });
    } catch (err) {
      res.status(500).json({ message: "Insert comment failed" });
      client.close();
      return;
    }
  }

  if (req.method === "GET") {
    try {
      const documents = await getAllDocuments(client, "comments", { _id: -1 });
      res.status(200).json({ comments: documents });
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Getting comments failed!" });
      return;
    }
  }

  client.close();
}

export default handler;
