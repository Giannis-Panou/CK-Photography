import { useState } from 'react';
import { Page } from '../components/Layout';
import CartItemList from '../components/CartItemList';
import { useCart } from '../context/CartContext';
import { TransitionLink } from '../context/PageTransition';
import { formatPrice } from '../utils/format';

function Field({ col, id, label, error, hint, required = true, ...input }) {
	return (
		<div className={col}>
			<label htmlFor={id} className="form-label">
				{label}
				{!required && <span className="text-body-secondary"> (optional)</span>}
			</label>
			<input
				type="text"
				className="form-control"
				id={id}
				name={id}
				required={required}
				aria-describedby={hint ? `${id}-hint` : undefined}
				{...input}
			/>
			{hint && (
				<small id={`${id}-hint`} className="text-body-secondary">
					{hint}
				</small>
			)}
			<div className="invalid-feedback">{error}</div>
		</div>
	);
}

function SelectField({ col, id, label, options, error, autoComplete }) {
	return (
		<div className={col}>
			<label htmlFor={id} className="form-label">
				{label}
			</label>
			<select
				className="form-select"
				id={id}
				name={id}
				autoComplete={autoComplete}
				required
			>
				<option value="">Choose...</option>
				{options.map((o) => (
					<option key={o}>{o}</option>
				))}
			</select>
			<div className="invalid-feedback">{error}</div>
		</div>
	);
}

function Check({ id, label, type = 'checkbox', defaultChecked }) {
	return (
		<div className="form-check py-1">
			<input
				id={id}
				name={type === 'radio' ? 'paymentMethod' : id}
				type={type}
				className={`form-check-input${type === 'checkbox' ? ' rounded-0' : ''}`}
				defaultChecked={defaultChecked}
				required={type === 'radio'}
			/>
			<label className="form-check-label" htmlFor={id}>
				{label}
			</label>
		</div>
	);
}

function OrderSummary() {
	const { cart, total, itemCount } = useCart();

	return (
		<>
			<h4 className="d-flex justify-content-between align-items-center mb-3">
				<span>Your cart</span>
				<span className="badge bg-accent rounded-pill" id="cartItemCount2">
					{itemCount}
				</span>
			</h4>

			{cart.length ? (
				<CartItemList className="checkout-items border mb-3" />
			) : (
				<div className="border p-4 mb-3 text-center">
					<p>Your cart is empty.</p>
					<TransitionLink to="/prints" className="btn btn-accent">
						Browse Prints
					</TransitionLink>
				</div>
			)}

			<form className="card p-2 rounded-0 bg-transparent" onSubmit={(e) => e.preventDefault()}>
				<div className="input-group">
					<label htmlFor="promo" className="visually-hidden">
						Promo code
					</label>
					<input
						type="text"
						id="promo"
						className="form-control"
						placeholder="Promo code"
						autoComplete="off"
					/>
					<button type="submit" className="btn btn-outline-accent">
						Redeem
					</button>
				</div>
			</form>

			<div className="my-4 fs-4 d-flex justify-content-between">
				<span>Total</span>
				<span id="checkoutTotal">{formatPrice(total)}</span>
			</div>
		</>
	);
}

export default function Checkout() {
	const { cart } = useCart();
	const [validated, setValidated] = useState(false);

	const handleSubmit = (e) => {
		e.preventDefault();
		const form = e.currentTarget;
		setValidated(true);
		if (!form.checkValidity()) {
			// Take the user straight to the first field that needs attention
			form.querySelector(':invalid')?.focus();
			return;
		}
		alert('Thank you for your purchase!');
	};

	return (
		<Page title="Checkout" footerClass="mt-5">
			<div className="container mt-4 mt-md-5">
				<header className="mb-4 mb-md-5">
					<span className="eyebrow">Secure checkout</span>
					<h2 className="section-title">Checkout</h2>
				</header>
				<div className="row g-4 g-lg-5">
					<div className="col-md-5 col-lg-4 order-md-last">
						<div className="checkout-summary">
							<OrderSummary />
						</div>
					</div>
					<div className="col-md-7 col-lg-8">
						<h4 className="mb-3">Billing address</h4>
						<form
							className={`needs-validation${validated ? ' was-validated' : ''}`}
							noValidate
							onSubmit={handleSubmit}
						>
							<div className="row g-3">
								<Field col="col-sm-6" id="firstName" label="First name" autoComplete="given-name" error="Valid first name is required." />
								<Field col="col-sm-6" id="lastName" label="Last name" autoComplete="family-name" error="Valid last name is required." />
								<Field
									col="col-12"
									id="email"
									label="Email"
									type="email"
									inputMode="email"
									autoComplete="email"
									placeholder="you@example.com"
									required={false}
									error="Please enter a valid email address for shipping updates."
								/>
								<Field
									col="col-12"
									id="address"
									label="Address"
									autoComplete="street-address"
									placeholder="1234 Main St"
									error="Please enter your shipping address."
								/>
								<SelectField
									col="col-md-5"
									id="country"
									label="Country"
									autoComplete="country-name"
									options={['United States']}
									error="Please select a valid country."
								/>
								<SelectField
									col="col-sm-6 col-md-4"
									id="state"
									label="State"
									autoComplete="address-level1"
									options={['California']}
									error="Please provide a valid state."
								/>
								<Field
									col="col-sm-6 col-md-3"
									id="zip"
									label="Zip"
									inputMode="numeric"
									autoComplete="postal-code"
									error="Zip code required."
								/>
							</div>

							<hr className="my-4" />

							<Check id="same-address" label="Shipping address is the same as my billing address" />
							<Check id="save-info" label="Save this information for next time" />

							<hr className="my-4" />

							<h4 className="mb-3">Payment</h4>

							<fieldset className="my-3">
								<legend className="visually-hidden">Payment method</legend>
								<Check id="credit" type="radio" label="Credit card" defaultChecked />
								<Check id="debit" type="radio" label="Debit card" />
								<Check id="paypal" type="radio" label="PayPal" />
							</fieldset>

							<div className="row gy-3">
								<Field
									col="col-md-6"
									id="cc-name"
									label="Name on card"
									autoComplete="cc-name"
									hint="Full name as displayed on card"
									error="Name on card is required"
								/>
								<Field
									col="col-md-6"
									id="cc-number"
									label="Credit card number"
									inputMode="numeric"
									autoComplete="cc-number"
									placeholder="1234 5678 9012 3456"
									error="Credit card number is required"
								/>
								<Field
									col="col-6 col-md-3"
									id="cc-expiration"
									label="Expiration"
									inputMode="numeric"
									autoComplete="cc-exp"
									placeholder="MM/YY"
									error="Expiration date required"
								/>
								<Field
									col="col-6 col-md-3"
									id="cc-cvv"
									label="CVV"
									inputMode="numeric"
									autoComplete="cc-csc"
									placeholder="123"
									error="Security code required"
								/>
							</div>

							<hr className="my-4" />

							<button
								className="w-100 btn btn-accent btn-lg"
								type="submit"
								disabled={cart.length === 0}
							>
								{cart.length ? 'Continue to checkout' : 'Your cart is empty'}
							</button>
						</form>
					</div>
				</div>
			</div>
		</Page>
	);
}
