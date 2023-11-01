import { Hono } from "hono";
import { verify } from "hono/jwt";

const secret = "my-secret";

const app = new Hono();

app.get("/api/users", async (c) => {
  const authHeader = c.req.headers.get("Authorization");
  if (!authHeader) {
    return c.res.status(401).send("Unauthorized");
  }

  const token = authHeader.split(" ")[1];
  try {
    const decoded = await verify(token, secret);
    c.state.user = decoded;
  } catch (err) {
    return c.res.status(401).send("Unauthorized");
  }
});
