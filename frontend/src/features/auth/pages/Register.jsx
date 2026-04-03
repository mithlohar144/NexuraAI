import React, { useState } from 'react'

const Register = () => {
	const [username, setUsername] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

	const handleSubmit = (event) => {
		event.preventDefault()

		const payload = {
			username,
			email,
			password,
		}

		console.log('Register form submitted:', payload)
	}

	return (
		<section className="min-h-screen bg-linear-to-br from-zinc-950 via-neutral-900 to-red-950 px-4 py-10 text-zinc-100">
			<div className="mx-auto flex min-h-[calc(100vh-5rem)] w-full max-w-md items-center justify-center">
				<div className="w-full rounded-2xl border border-red-900/60 bg-zinc-900/80 p-6 shadow-[0_0_50px_rgba(127,29,29,0.25)] backdrop-blur">
					<h1 className="mb-2 text-3xl font-bold tracking-tight text-red-300">Create Account</h1>
					<p className="mb-6 text-sm text-zinc-400">Register to start chatting with AI.</p>

					<form onSubmit={handleSubmit} className="space-y-4">
						<div>
							<label htmlFor="username" className="mb-1 block text-sm font-medium text-zinc-300">
								Username
							</label>
							<input
								id="username"
								type="text"
								value={username}
								onChange={(event) => setUsername(event.target.value)}
								placeholder="Your username"
								className="w-full rounded-lg border border-zinc-700 bg-zinc-950/70 px-3 py-2.5 text-zinc-100 outline-none transition focus:border-red-500 focus:ring-2 focus:ring-red-500/30"
								required
							/>
						</div>

						<div>
							<label htmlFor="email" className="mb-1 block text-sm font-medium text-zinc-300">
								Email
							</label>
							<input
								id="email"
								type="email"
								value={email}
								onChange={(event) => setEmail(event.target.value)}
								placeholder="you@example.com"
								className="w-full rounded-lg border border-zinc-700 bg-zinc-950/70 px-3 py-2.5 text-zinc-100 outline-none transition focus:border-red-500 focus:ring-2 focus:ring-red-500/30"
								required
							/>
						</div>

						<div>
							<label htmlFor="password" className="mb-1 block text-sm font-medium text-zinc-300">
								Password
							</label>
							<input
								id="password"
								type="password"
								value={password}
								onChange={(event) => setPassword(event.target.value)}
								placeholder="Create a password"
								className="w-full rounded-lg border border-zinc-700 bg-zinc-950/70 px-3 py-2.5 text-zinc-100 outline-none transition focus:border-red-500 focus:ring-2 focus:ring-red-500/30"
								required
							/>
						</div>

						<button
							type="submit"
							  className="mt-2 w-full rounded-lg bg-linear-to-r from-red-600 via-red-500 to-rose-500 px-4 py-2.5 font-semibold text-white shadow-lg shadow-red-900/40 transition hover:from-red-500 hover:via-red-400 hover:to-rose-400"
						>
							Register
						</button>
					</form>
                    <p className="mt-4 text-center text-sm text-zinc-400">
                        Already have an account?{' '}
                        <a href="/login" className="text-red-400 hover:text-red-300">
                            Login
                        </a>
                    </p>
				</div>
			</div>
		</section>
	)
}

export default Register
