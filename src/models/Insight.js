import mongoose from "mongoose"

const InsightSchema = new mongoose.Schema({
  intensity: Number,
  likelihood: Number,
  relevance: Number,
  year: Number,
  country: String,
  topic: String,
  region: String,
  city: String,
  sector: String,
  pestle: String,
  source: String,
  swot: String,
})

export default mongoose.models.Insight ||
  mongoose.model("Insight", InsightSchema)
