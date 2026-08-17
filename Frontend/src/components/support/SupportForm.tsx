import { useState } from 'react'
import type { FormEvent } from 'react'
import './SupportForm.scss'

export default function SupportForm() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [sent, setSent] = useState(false)

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSent(true)
  }

  if (sent) {
    return (
      <p className="support-form__success" role="status">
        Thanks for reaching out! We will get back to you soon.
      </p>
    )
  }

  return (
    <form className="support-form" onSubmit={handleSubmit}>
      <label htmlFor="support-name">Name</label>
      <input
        id="support-name"
        name="name"
        type="text"
        autoComplete="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />

      <label htmlFor="support-email">Email</label>
      <input
        id="support-email"
        name="email"
        type="email"
        autoComplete="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <label htmlFor="support-message">Message</label>
      <textarea
        id="support-message"
        name="message"
        rows={5}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        required
      />

      <button type="submit">Send message</button>
    </form>
  )
}
