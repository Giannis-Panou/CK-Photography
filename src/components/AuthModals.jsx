function AuthModal({ id, title, switchTo, switchLabel, children }) {
	return (
		<div className="modal fade" tabIndex="-1" id={id}>
			<div className="modal-dialog modal-dialog-centered visible">
				<div className="modal-content">
					<div className="modal-header">
						<h5 className="modal-title">{title}</h5>
						<button
							type="button"
							className="btn-close"
							data-bs-dismiss="modal"
							aria-label="Close"
						></button>
					</div>
					<div className="modal-body">
						{/* No backend yet: keep the form from reloading the page */}
						<form onSubmit={(e) => e.preventDefault()}>
							{children}
							<button type="submit" className="btn btn-accent w-100">
								{title}
							</button>
						</form>
					</div>
					<div className="modal-footer">
						<div data-bs-toggle="modal" data-bs-target={`#${switchTo}`}>
							<button className="btn btn-outline-accent">
								{switchLabel}
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

function Field({ id, label, type = 'text', autoComplete }) {
	return (
		<div className="mb-3">
			<label htmlFor={id} className="form-label">
				{label}
			</label>
			<input
				type={type}
				className="form-control"
				id={id}
				autoComplete={autoComplete}
			/>
		</div>
	);
}

export default function AuthModals() {
	return (
		<>
			<AuthModal
				id="loginModal"
				title="Login"
				switchTo="registerModal"
				switchLabel="Register"
			>
				<Field id="login-email" label="Email address" type="email" autoComplete="email" />
				<Field id="login-password" label="Password" type="password" autoComplete="current-password" />
			</AuthModal>

			<AuthModal
				id="registerModal"
				title="Register"
				switchTo="loginModal"
				switchLabel="Login"
			>
				<Field id="register-name" label="Full Name" autoComplete="name" />
				<Field id="register-email" label="Email address" type="email" autoComplete="email" />
				<Field id="register-password" label="Password" type="password" autoComplete="new-password" />
				<Field
					id="register-confirm"
					label="Confirm Password"
					type="password"
					autoComplete="new-password"
				/>
			</AuthModal>
		</>
	);
}
