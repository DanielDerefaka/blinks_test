import { serve } from "@hono/node-server";
import donate from "./actions/donate/route";
import { cors } from "hono/cors";
import { OpenAPIHono } from "@hono/zod-openapi";

const app = new OpenAPIHono();
app.use("/*", cors());

// <--Actions-->
app.route("/api/donate", donate);

// </--Actions-->

app.doc("/doc", {
  info: {
    title: "An API",
    version: "v1",
  },
  openapi: "3.1.0",
});

app.get("/donate");

const port = 3000;
console.log(
  `Server is running on port ${port}

`
);

serve({
  fetch: app.fetch,
  port,
});
