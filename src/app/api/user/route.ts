import fs from "fs"
import path from "path"

export async function GET() {
  const filePath = path.join(process.cwd(), "backend/user.json")
  
  try {
    const jsonData = fs.readFileSync(filePath, "utf8")
    const users = JSON.parse(jsonData)
    return new Response(JSON.stringify(users), { status: 200 })
  } catch (error) {
    console.error(error)
    return new Response(JSON.stringify({ error: "無法讀取 users.json" }), { status: 500 })
  }
}
