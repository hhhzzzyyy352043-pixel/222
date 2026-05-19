'use client'

import { useState } from 'react'

export default function Home() {

  const [message, setMessage] = useState('')
  const [result, setResult] = useState('')

  async function send() {

    const res = await fetch('http://localhost:8000/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        message
      })
    })

    const data = await res.json()
    setResult(data.response)
  }

  return (
    <div className="p-10">

      <h1 className="text-3xl font-bold mb-4">
        Multi-Agent MVP
      </h1>

      <textarea
        className="border p-2 w-full"
        rows={5}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />

      <button
        className="bg-black text-white px-4 py-2 mt-4"
        onClick={send}
      >
        Send
      </button>

      <div className="mt-10 whitespace-pre-wrap">
        {result}
      </div>

    </div>
  )
}
