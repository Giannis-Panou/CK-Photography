import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';
import { useLang } from '../i18n/LanguageContext';
import Icon from '../components/Icon';

const ToastContext = createContext(null);
const DURATION = 3500;

function Toast({ toast, onDismiss }) {
	const dismissLabel = useLang().t('viewer.dismiss');
	useEffect(() => {
		const t = setTimeout(() => onDismiss(toast.id), DURATION);
		return () => clearTimeout(t);
	}, [toast.id, onDismiss]);

	return (
		<div className="ck-toast" role="status">
			{toast.image && <img src={toast.image} alt="" className="ck-toast-thumb" />}
			<div className="ck-toast-body">
				<strong>{toast.title}</strong>
				{toast.message && <span>{toast.message}</span>}
			</div>
			{toast.action && (
				<button
					type="button"
					className="ck-toast-action"
					onClick={() => {
						toast.action.onClick();
						onDismiss(toast.id);
					}}
				>
					{toast.action.label}
				</button>
			)}
			<button
				type="button"
				className="ck-toast-close"
				onClick={() => onDismiss(toast.id)}
				aria-label={dismissLabel}
			>
				<Icon name="close" size={16} />
			</button>
		</div>
	);
}

export function ToastProvider({ children }) {
	const [toasts, setToasts] = useState([]);
	const nextId = useRef(0);

	const dismiss = useCallback(
		(id) => setToasts((list) => list.filter((t) => t.id !== id)),
		[]
	);

	const notify = useCallback((toast) => {
		const id = ++nextId.current;
		// Keep at most 3 on screen; newest last
		setToasts((list) => [...list.slice(-2), { ...toast, id }]);
	}, []);

	return (
		<ToastContext.Provider value={notify}>
			{children}
			<div className="ck-toast-stack" aria-live="polite">
				{toasts.map((t) => (
					<Toast key={t.id} toast={t} onDismiss={dismiss} />
				))}
			</div>
		</ToastContext.Provider>
	);
}

export function useToast() {
	return useContext(ToastContext);
}
