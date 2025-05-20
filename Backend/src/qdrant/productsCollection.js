import qdrant from "./qdrant_db.js";

const collectionName = "ecommerce-products";

export async function ensureProductCollection() {
  try {
    const existingCollections = await qdrant.getCollections();

    const alreadyExists = existingCollections.collections.some(
      (col) => col.name === collectionName
    );

    if (!alreadyExists) {
      await qdrant.createCollection(collectionName, {
        vectors: {
          size: 384,
          distance: "Cosine",
        },
      });
      console.log(`✅ Collection '${collectionName}' created.`);
    } else {
      console.log(`ℹ️ Collection '${collectionName}' already exists.`);
    }
  } catch (err) {
    console.error(
      "❌ Error while checking or creating the collection:",
      err.message
    );
  }
}