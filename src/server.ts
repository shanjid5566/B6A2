import app from "./app";
import config from "./config";
import initDB from "./config/db";

const port = Number(config.port) || 3000;

initDB()
  .then(() => {
    app.listen(port, () => {
      console.log(`Second Assignment is running : ${port}`);
    });
  })
  .catch((err) => {
    console.error("Failed to initialize DB:", err);
    process.exit(1);
  });
