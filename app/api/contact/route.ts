import { NextResponse } from 'next/server'
import { z } from 'zod'
import { appendToGoogleSheet, SHEET_TABS } from '@/lib/google-sheets'

const contactSchema = z.object({
  fullName: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email'),
  phone: z.string().min(10, 'Please enter a valid phone number'),
  subject: z.string().min(3, 'Subject must be at least 3 characters'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
})

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const parsed = contactSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json(
        { success: false, errors: parsed.error.flatten().fieldErrors },
        { status: 400 },
      )
    }

    const sheetResult = await appendToGoogleSheet(SHEET_TABS.contact, {
      fullName: parsed.data.fullName,
      email: parsed.data.email,
      phone: parsed.data.phone,
      subject: parsed.data.subject,
      message: parsed.data.message,
    })

    if (!sheetResult.ok) {
      return NextResponse.json(
        { success: false, message: sheetResult.message },
        { status: 503 },
      )
    }

    return NextResponse.json({ success: true, message: 'Thank you! We will get back to you soon.' })
  } catch {
    return NextResponse.json(
      { success: false, message: 'Something went wrong. Please try again.' },
      { status: 500 },
    )
  }
}
