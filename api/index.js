import app from "../server/src/app.js";
import { connectDatabase } from "../server/src/config/db.js";

export default async function handler(req, res) {
  if (!["/api/health", "/health"].includes(req.url)) await connectDatabase();
  return app(req, res);
}
