const mongoose = require("mongoose");
const initData = require("./data.js");
const Product = require("../models/product.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/marcari";

main()
  .then(() => {
    console.log("DB connected");
  })
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect(MONGO_URL);
}

const initDB = async () => {
  await Product.deleteMany({});
  initData.data = initData.data.map((obj) => ({
    ...obj,
    owner: "68dbdec2f448c6d310ce0fbd",
  }));
  await Product.insertMany(initData.data);
  console.log("data initialized");
};

initDB();
