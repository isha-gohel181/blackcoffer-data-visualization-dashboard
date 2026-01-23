import { connectDB } from "@/lib/mongodb"
import Insight from "@/models/Insight"

export async function GET(req) {
  try {
    await connectDB()

    const { searchParams } = new URL(req.url)
    const query = {}

    const filters = [
      "year",
      "topic",
      "country",
      "region",
      "sector",
      "pestle",
      "source",
      "swot",
      "city",
    ]

    filters.forEach((key) => {
      const value = searchParams.get(key)
      if (value) {
        query[key] = key === "year" ? Number(value) : value
      }
    })

    const data = await Insight.find(query).limit(1000)

    return Response.json({
      success: true,
      count: data.length,
      data,
    })
  } catch (error) {
    return Response.json(
      { success: false, message: error.message },
      { status: 500 }
    )
  }
}
