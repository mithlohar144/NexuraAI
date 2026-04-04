import React, { useEffect } from 'react'
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from 'lucide-react'

const Toast = ({ message, type = 'info', onClose, duration = 5000 }) => {
	useEffect(() => {
		if (duration && onClose) {
			const timer = setTimeout(() => {
				onClose()
			}, duration)

			return () => clearTimeout(timer)
		}
	}, [duration, onClose])

	const typeStyles = {
		success: {
			bg: 'bg-emerald-900/90 border-emerald-700',
			icon: <CheckCircle className="h-5 w-5 text-emerald-400" />,
			text: 'text-emerald-100',
		},
		error: {
			bg: 'bg-red-900/90 border-red-700',
			icon: <AlertCircle className="h-5 w-5 text-red-400" />,
			text: 'text-red-100',
		},
		warning: {
			bg: 'bg-amber-900/90 border-amber-700',
			icon: <AlertTriangle className="h-5 w-5 text-amber-400" />,
			text: 'text-amber-100',
		},
		info: {
			bg: 'bg-blue-900/90 border-blue-700',
			icon: <Info className="h-5 w-5 text-blue-400" />,
			text: 'text-blue-100',
		},
	}

	const currentStyle = typeStyles[type] || typeStyles.info

	return (
		<div
			className={`fixed right-4 top-4 z-50 flex min-w-[320px] max-w-md items-start gap-3 rounded-lg border ${currentStyle.bg} p-4 shadow-2xl backdrop-blur-sm animate-in slide-in-from-top-5 fade-in duration-300`}
		>
			<div className="flex-shrink-0 pt-0.5">{currentStyle.icon}</div>
			<p className={`flex-1 text-sm font-medium ${currentStyle.text}`}>{message}</p>
			{onClose && (
				<button
					onClick={onClose}
					className={`flex-shrink-0 rounded p-1 transition hover:bg-white/10 ${currentStyle.text}`}
					aria-label="Close notification"
				>
					<X className="h-4 w-4" />
				</button>
			)}
		</div>
	)
}

export default Toast