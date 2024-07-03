import { serve } from "@hono/node-server";
import donate from "./actions/donate/route";
import { cors } from "hono/cors";
import { OpenAPIHono } from "@hono/zod-openapi";
import { swaggerUI } from '@hono/swagger-ui';

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

app.get(
    '/swagger-ui',
    swaggerUI({
      url: '/doc',
    }),
  );

const port = 3000;
console.log(
  `Server is running on port ${port}
  Visit http://localhost:${port}/swagger-ui to explore existing actions

`
);

serve({
  fetch: app.fetch,
  port,
});
