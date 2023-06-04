import { connection, insert } from "../../helpers/db-utils";

async function handler(req, res) {
  if (req.method === "POST") {
    const userEmail = req.body.email;
    if (!userEmail || !userEmail.includes("@")) {
      res.status(422).json({ message: "Invalid Email Address" });
      return;
    }
    let client;
    try {
      client = await connection();
    } catch (err) {
      res.status(500).json({ message: "Connecting Database failed!" });
      return;
    }
    try {
      await insert(client, "newsletter", { email: userEmail });
      client.close();
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Insert Problem" });
      return;
    }

    res.status(201).json({ message: "Signed up" });
  }
}
export default handler;
