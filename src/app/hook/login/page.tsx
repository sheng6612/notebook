"use client"
import * as React from "react"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function Login() {
  const [role, setRole] = React.useState("user")
  const [username, setUsername] = React.useState("")
  const [password, setPassword] = React.useState("")
  const [usersData, setUsersData] = React.useState<any[]>([])
  const [error, setError] = React.useState("")
  const router = useRouter()

  // 載入 JSON 資料
  React.useEffect(() => {
    fetch("/api/user")
      .then(res => res.json())
      .then(data => setUsersData(data))
      .catch(err => console.error("載入 users.json 失敗", err))
  }, [])

  const handleLogin = async () => {
    const foundUser = usersData.find(
      (u) => u.username === username && u.password === password
    )

    // 嘗試次數計算（從 API 讀取現有 logins.json）
    let attemptCount = 1
    try {
      const logsRes = await fetch("/api/login")
      const logs = await logsRes.json()
      attemptCount =
        logs.filter((log: any) => log.username === username).length + 1
    } catch (err) {
      console.error("讀取 login.json 失敗", err)
    }

    // 新的登入紀錄
    const loginRecord = {
      role,
      time: new Date().toISOString(),
      username,
      attempt: attemptCount,
      success: !!foundUser,
    }

    // 寫入 logins.json
    fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(loginRecord),
    })

    if (foundUser) {
      router.push("/")
    } else {
      setError("帳號或密碼錯誤")
    }
  }

  return (
    <div className="h-screen w-full bg-gradient-to-b from-slate-200 to-slate-500 flex justify-center items-center">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-bold">
            Notebook
          </CardTitle>
          <CardDescription>Login</CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={(e) => e.preventDefault()}>
            <div className="grid w-full items-center gap-4">
              {/* 角色選擇 */}
              <div className="flex flex-col space-y-1.5">
                <label htmlFor="role">Role</label>
                <Select value={role} onValueChange={setRole}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="admin">Admin</SelectItem>
                    <SelectItem value="user">User</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* 使用者名稱 */}
              <div className="flex flex-col space-y-1.5">
                <label htmlFor="User_name">UserName</label>
                <Input
                  id="User_name"
                  placeholder="Your name"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>

              {/* 密碼 */}
              <div>
                <label htmlFor="Password">Password</label>
                <Input
                  id="Password"
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              {/* 錯誤訊息 */}
              {error && <p className="text-red-500 text-sm">{error}</p>}
            </div>
          </form>
        </CardContent>

        <CardFooter className="flex justify-between">
          <Link href="/">
            <Button variant="outline">Return</Button>
          </Link>
          <Button onClick={handleLogin}>Login</Button>
        </CardFooter>
      </Card>
    </div>
  )
}
