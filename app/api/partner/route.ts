import { NextResponse } from 'next/server'
import { z } from 'zod'
import { appendToGoogleSheet, SHEET_TABS } from '@/lib/google-sheets'

const partnerSchema = z.object({
  fullName: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(10),
  company: z.string().min(2),
  message: z.string().min(10),
})

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const parsed = partnerSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json(
        { success: false, errors: parsed.error.flatten().fieldErrors },
        { status: 400 },
      )
    }

    const sheetResult = await appendToGoogleSheet(SHEET_TABS.partner, {
      fullName: parsed.data.fullName,
      email: parsed.data.email,
      phone: parsed.data.phone,
      company: parsed.data.company,
      message: parsed.data.message,
    })

    if (!sheetResult.ok) {
      return NextResponse.json(
        { success: false, message: sheetResult.message },
        { status: 503 },
      )
    }

    return NextResponse.json({
      success: true,
      message: 'Thank you! Our partnerships team will contact you shortly.',
    })
  } catch {
    return NextResponse.json(
      { success: false, message: 'Something went wrong. Please try again.' },
      { status: 500 },
    )
  }
}
