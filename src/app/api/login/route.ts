import { NextResponse } from "next/server"
import fs from "fs"
import path from "path"

const loginsFile = path.join(process.cwd(), "backend/login.json")

export async function GET() {
  try {
    const logs = JSON.parse(fs.readFileSync(loginsFile, "utf8"))
    return NextResponse.json(logs)
  } catch (error) {
    return NextResponse.json({ error: "無法讀取 logins.json" }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const logs = JSON.parse(fs.readFileSync(loginsFile, "utf8"))
    logs.push(body)
    fs.writeFileSync(loginsFile, JSON.stringify(logs, null, 2))
    return NextResponse.json({ status: "ok" })
  } catch (error) {
    return NextResponse.json({ error: "無法寫入 logins.json" }, { status: 500 })
  }
}
