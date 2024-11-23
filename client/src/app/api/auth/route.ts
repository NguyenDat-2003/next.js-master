export async function POST(request: Request) {
  const res = await request.json()
  const sessionToken = await res.data?.token
  if (!sessionToken) {
    return Response.json(
      { message: 'Không tồn tại sessionToken' },
      {
        status: 400
      }
    )
  }
  return Response.json(
    { res },
    {
      status: 200,
      headers: { 'Set-Cookie': `sessionToken=${sessionToken}; Path=/; HttpOnly` }
    }
  )
}
