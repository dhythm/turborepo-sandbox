import { http, HttpResponse } from "msw";

export const handlers = [
  http.get("/api/user", async () => {
    return HttpResponse.json({ id: 1, name: "John Doe" });
  }),
];
