'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Loader2, Eye, EyeOff, Mail, Lock, User, UserPlus } from 'lucide-react'
import { useMutation } from '@tanstack/react-query'

const signupSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  username: z.string().min(3, 'Username must be at least 3 characters'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
})

type SignupFormData = z.infer<typeof signupSchema>

export default function SignupPage() {
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)
  const [showPassword, setShowPassword] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
  })

  const signupMutation = useMutation({
    mutationFn: async (data: SignupFormData) => {
      try {
        const response = await fetch('/api/auth/signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        })

        let result: any = null
        try {
          result = await response.json()
        } catch {}

        if (!response.ok) {
          let message = 'An error occurred. Please try again.'

          if (response.status === 409) {
            message = result?.error || 'User already exists'
          } else if (response.status === 400) {
            message = 'Please check your input and try again.'
          } else if (response.status === 500) {
            message = 'Server error. Please try again later.'
          }

          const err: ApiError = {
            status: response.status,
            message,
          }
          throw err
        }

        return result
      } catch (err) {
        if ((err as ApiError)?.status) throw err

        const networkError: ApiError = {
          status: 0,
          message: 'Network error. Please check your connection and try again.',
        }
        throw networkError
      }
    },
    onSuccess: () => {
      setError(null)
      router.push('/login?registered=true')
    },
    onError: (err: ApiError) => {
      setError(err.message)
    },
  })

  const onSubmit = (data: SignupFormData) => {
    setError(null)
    signupMutation.mutate(data)
  }

  const isLoading = signupMutation.isPending

  const handleRetry = () => {
    setError(null)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#f7d58a] via-[#f1c56e] to-[#e5af4f] relative overflow-hidden p-4">
      <div className="pointer-events-none absolute -top-24 -left-32 h-72 w-72 rounded-[40%] bg-[#d39b3b]/40 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 -right-40 h-[380px] w-[380px] rounded-[45%] bg-[#c88d2f]/40 blur-3xl" />

      <div className="relative w-full max-w-5xl">
        <div className="relative rounded-[32px] border border-white/20 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 shadow-[0_24px_80px_rgba(15,23,42,0.85)] overflow-hidden">
          <div className="pointer-events-none absolute -top-32 left-1/2 h-64 w-[420px] -translate-x-1/2 rounded-full bg-cyan-400/20 blur-3xl" />

          <div className="grid min-h-[560px] md:grid-cols-2">
            {/* LEFT: form */}
            <div className="flex items-center justify-center px-8 py-10 md:px-10 lg:px-14">
              <div className="w-full max-w-md rounded-[28px] border border-dashed border-white/20 bg-black/30 px-7 py-10 backdrop-blur-xl">
                <div className="flex flex-col items-center mb-8">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 shadow-[0_12px_30px_rgba(250,204,21,0.5)] mb-6">
                    <UserPlus className="h-8 w-8 text-white" />
                  </div>
                  <h1 className="text-[26px] font-bold text-white leading-tight text-center">
                    <span className="font-extrabold">Create</span>{' '}
                    <span className="font-normal text-white/80">
                      your Account
                    </span>
                  </h1>
                </div>

                {error && (
                  <Alert className="mb-5 bg-red-500/10 border-red-500/40">
                    <AlertDescription className="flex items-center justify-between text-red-100 text-xs">
                      <span>{error}</span>
                      {(error.includes('Network') ||
                        error.includes('Server')) && (
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={handleRetry}
                          className="ml-2 h-7 border-red-400/60 bg-transparent text-red-100 hover:bg-red-500/20"
                        >
                          Retry
                        </Button>
                      )}
                    </AlertDescription>
                  </Alert>
                )}

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  <div>
                    <div className="relative">
                      <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                        <User className="w-5 h-5" />
                      </span>
                      <Input
                        type="text"
                        placeholder="Enter Name"
                        {...register('name')}
                        disabled={isLoading}
                        className={`h-12 w-full rounded-full border bg-white/95 pl-11 pr-4 text-sm text-white shadow-inner placeholder:text-slate-400 focus-visible:ring-2 focus-visible:ring-offset-0
                        ${
                          errors.name
                            ? 'border-red-400 focus-visible:ring-red-400'
                            : 'border-white/15 focus-visible:ring-yellow-400/70'
                        }`}
                      />
                    </div>
                    {errors.name && (
                      <p className="mt-1 ml-3 text-xs text-red-300">
                        {errors.name.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <div className="relative">
                      <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                        <Mail className="w-5 h-5" />
                      </span>
                      <Input
                        type="email"
                        placeholder="Enter Email"
                        {...register('email')}
                        disabled={isLoading}
                        className={`h-12 w-full rounded-full border bg-white/95 pl-11 pr-4 text-sm text-white shadow-inner placeholder:text-slate-400 focus-visible:ring-2 focus-visible:ring-offset-0
                        ${
                          errors.email
                            ? 'border-red-400 focus-visible:ring-red-400'
                            : 'border-white/15 focus-visible:ring-yellow-400/70'
                        }`}
                      />
                    </div>
                    {errors.email && (
                      <p className="mt-1 ml-3 text-xs text-red-300">
                        {errors.email.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <div className="relative">
                      <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                        <User className="w-5 h-5" />
                      </span>
                      <Input
                        type="text"
                        placeholder="Choose Username"
                        {...register('username')}
                        disabled={isLoading}
                        className={`h-12 w-full rounded-full border bg-white/95 pl-11 pr-4 text-sm text-white shadow-inner placeholder:text-slate-400 focus-visible:ring-2 focus-visible:ring-offset-0
                        ${
                          errors.username
                            ? 'border-red-400 focus-visible:ring-red-400'
                            : 'border-white/15 focus-visible:ring-yellow-400/70'
                        }`}
                      />
                    </div>
                    {errors.username && (
                      <p className="mt-1 ml-3 text-xs text-red-300">
                        {errors.username.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <div className="relative">
                      <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                        <Lock className="w-5 h-5" />
                      </span>
                      <Input
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Create Password"
                        {...register('password')}
                        disabled={isLoading}
                        className={`h-12 w-full rounded-full border bg-white/95 pl-11 pr-11 text-sm text-white shadow-inner placeholder:text-slate-400 focus-visible:ring-2 focus-visible:ring-offset-0
                        ${
                          errors.password
                            ? 'border-red-400 focus-visible:ring-red-400'
                            : 'border-white/15 focus-visible:ring-yellow-400/70'
                        }`}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        disabled={isLoading}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-700"
                      >
                        {showPassword ? (
                          <EyeOff className="h-5 w-5" />
                        ) : (
                          <Eye className="h-5 w-5" />
                        )}
                      </button>
                    </div>
                    {errors.password && (
                      <p className="mt-1 ml-3 text-xs text-red-300">
                        {errors.password.message}
                      </p>
                    )}
                  </div>

                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="mt-2 h-12 w-full rounded-full text-[15px] font-semibold shadow-[0_16px_40px_rgba(250,204,21,0.6)] disabled:opacity-70"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Creating account...
                      </>
                    ) : (
                      'Sign Up'
                    )}
                  </Button>
                </form>

                <div className="mt-7 text-center text-xs text-white/70">
                  <span>Already have an account? </span>
                  <Link
                    href="/login"
                    className="font-semibold uppercase tracking-wide text-yellow-300 hover:text-yellow-200"
                  >
                    LOGIN
                  </Link>
                </div>
              </div>
            </div>

            <div
              className="relative hidden md:block bg-cover bg-center"
              style={{
                backgroundImage: 'url("/images/space-illustration.jpg")',
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-sky-500/40 via-transparent to-emerald-500/30 mix-blend-screen" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.6),_transparent_55%),_radial-gradient(circle_at_bottom,_rgba(251,191,36,0.4),_transparent_55%)] opacity-80" />
              <div className="relative flex h-full w-full items-center justify-center p-6" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
