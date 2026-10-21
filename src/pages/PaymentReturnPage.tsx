import { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { supabase } from '../lib/supabase'

export default function PaymentReturnPage() {
  const [params] = useSearchParams()
  const [message, setMessage] = useState('Verifying your payment securely…')
  const [success, setSuccess] = useState(false)
  const [courseSlug, setCourseSlug] = useState('')

  useEffect(() => {
    let cancelled = false

    async function verify() {
      if (!supabase) {
        setMessage('Authentication service is unavailable. Please try again.')
        return
      }

      const transactionReference = params.get('tx_ref')
      const transactionId = params.get('transaction_id')

      if (!transactionReference || !transactionId) {
        setMessage('Payment details are incomplete. Check your payment status before trying again.')
        return
      }

      const { data: { user }, error: authError } = await supabase.auth.getUser()

      if (authError || !user) {
        setMessage('Sign in with the account used for this purchase, then revisit this payment return page.')
        return
      }

      const { data, error } = await supabase.functions.invoke(
        'verify-course-payment',
        { body: { transactionReference, transactionId } }
      )

      if (cancelled) return

      if (error || data?.verified !== true || typeof data?.courseSlug !== 'string') {
        setMessage(data?.error || error?.message || 'Payment is not yet verified. Check its status before paying again.')
        return
      }

      setCourseSlug(data.courseSlug)
      setSuccess(true)
      setMessage('Payment verified. Your course access is active.')
    }

    void verify().catch((error: unknown) => {
      if (!cancelled) setMessage(error instanceof Error ? error.message : 'Payment verification failed.')
    })

    return () => { cancelled = true }
  }, [params])

  return (
    <main className="sa9-page">
      <section className="sa9-section">
        <h1>{success ? 'You’re in!' : 'Confirming your payment'}</h1>
        <p role="status">{message}</p>
        {success && courseSlug && (
          <p><Link to={`/learning/courses/${encodeURIComponent(courseSlug)}`}>Open your course</Link></p>
        )}
        {!success && <p><Link to="/learning">Return to learning</Link></p>}
      </section>
    </main>
  )
}
