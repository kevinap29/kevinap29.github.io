<script lang="ts">
	import { m } from '$lib/paraglide/messages';
	import { i18n } from '$lib/i18n.svelte';
	import { fade } from 'svelte/transition';
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import { Textarea } from '$lib/components/ui/textarea';
	import * as Card from '$lib/components/ui/card';
	import { Mail, Phone, MapPin, Send, CheckCircle2, AlertCircle } from '@lucide/svelte';
	import Reveal from '$lib/components/Reveal.svelte';
	import PageHero from '$lib/components/PageHero.svelte';
	import { PUBLIC_WEB3FORMS_ACCESS_KEY } from '$env/static/public';

	let { data } = $props();
	const { email, phone, websiteName } = $derived(data);

	// Form State
	let formState = $state({
		name: '',
		email: '',
		message: '',
		botcheck: false
	});

	let formRenderedAt = $state(Date.now());
	let lastSubmittedAt = $state(0);
	let validationErrorKey = $state<'spam' | 'too_fast' | 'rate_limit' | 'max_length' | null>(null);

	const validationError = $derived.by(() => {
		switch (validationErrorKey) {
			case 'spam':
				return m.contact_err_spam({}, { locale: i18n.current });
			case 'too_fast':
				return m.contact_err_too_fast({}, { locale: i18n.current });
			case 'rate_limit':
				return m.contact_err_rate_limit({}, { locale: i18n.current });
			case 'max_length':
				return m.contact_err_max_length({}, { locale: i18n.current });
			default:
				return null;
		}
	});

	let status = $state<'idle' | 'sending' | 'success' | 'error'>('idle');

	async function handleSubmit(e: SubmitEvent) {
		e.preventDefault();
		validationErrorKey = null;

		// Anti-bot check 1: Filled honeypot
		if (formState.botcheck) {
			status = 'error';
			validationErrorKey = 'spam';
			return;
		}

		// Anti-bot check 2: Submitted too quickly (< 2 seconds after page load)
		if (Date.now() - formRenderedAt < 2000) {
			status = 'error';
			validationErrorKey = 'too_fast';
			return;
		}

		// Anti-abuse check 3: Rate limit (1 submission per 30 seconds)
		if (Date.now() - lastSubmittedAt < 30000) {
			status = 'error';
			validationErrorKey = 'rate_limit';
			return;
		}

		// Anti-abuse check 4: Payload length caps
		if (formState.name.trim().length > 100 || formState.message.trim().length > 2000) {
			status = 'error';
			validationErrorKey = 'max_length';
			return;
		}

		status = 'sending';

		try {
			const response = await fetch('https://api.web3forms.com/submit', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json'
				},
				body: JSON.stringify({
					access_key: PUBLIC_WEB3FORMS_ACCESS_KEY,
					name: formState.name,
					email: formState.email,
					message: formState.message,
					botcheck: formState.botcheck,
					subject: `New Contact Form Message from ${formState.name}`,
					from_name: 'Portfolio Contact Form'
				})
			});

			const result = await response.json();
			if (result.success) {
				lastSubmittedAt = Date.now();
				status = 'success';
				formState = { name: '', email: '', message: '', botcheck: false };
			} else {
				status = 'error';
			}
		} catch {
			status = 'error';
		}
	}
</script>

<svelte:head>
	<title>{m.nav_contact({}, { locale: i18n.current })} | {websiteName}</title>
	<meta name="description" content={m.contact_subtitle({}, { locale: i18n.current })} />
</svelte:head>

<div class="max-w-5xl mx-auto px-4 py-12 space-y-16">
	<PageHero
		title={m.nav_contact({}, { locale: i18n.current })}
		description={m.contact_subtitle({}, { locale: i18n.current })}
	/>

	<div class="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
		<!-- Contact Info Cards -->
		<div class="lg:col-span-2 space-y-6">
			<Reveal delay={200} x={-20}>
				<Card.Root
					class="rounded-none border-primary/5 bg-muted/20 hover:bg-muted/30 transition-colors"
				>
					<Card.Header class="flex flex-row items-center gap-4 space-y-0">
						<div
							class="size-12 rounded-none bg-background border border-primary/10 flex items-center justify-center text-primary"
						>
							<Mail class="size-6" />
						</div>
						<div>
							<Card.Title class="text-xs font-black uppercase tracking-widest text-muted-foreground"
								>{m.contact_info_email({}, { locale: i18n.current })}</Card.Title
							>
							<Card.Description class="text-lg font-bold text-foreground break-all"
								>{email}</Card.Description
							>
						</div>
					</Card.Header>
				</Card.Root>
			</Reveal>

			<Reveal delay={300} x={-20}>
				<Card.Root
					class="rounded-none border-primary/5 bg-muted/20 hover:bg-muted/30 transition-colors"
				>
					<Card.Header class="flex flex-row items-center gap-4 space-y-0">
						<div
							class="size-12 rounded-none bg-background border border-primary/10 flex items-center justify-center text-primary"
						>
							<Phone class="size-6" />
						</div>
						<div>
							<Card.Title class="text-xs font-black uppercase tracking-widest text-muted-foreground"
								>{m.contact_info_phone({}, { locale: i18n.current })}</Card.Title
							>
							<Card.Description class="text-lg font-bold text-foreground">{phone}</Card.Description>
						</div>
					</Card.Header>
				</Card.Root>
			</Reveal>

			<Reveal delay={400} x={-20}>
				<Card.Root
					class="rounded-none border-primary/5 bg-muted/20 hover:bg-muted/30 transition-colors"
				>
					<Card.Header class="flex flex-row items-center gap-4 space-y-0">
						<div
							class="size-12 rounded-none bg-background border border-primary/10 flex items-center justify-center text-primary"
						>
							<MapPin class="size-6" />
						</div>
						<div>
							<Card.Title class="text-xs font-black uppercase tracking-widest text-muted-foreground"
								>{m.contact_info_location({}, { locale: i18n.current })}</Card.Title
							>
							<Card.Description class="text-lg font-bold text-foreground"
								>Jakarta/Palembang, Indonesia</Card.Description
							>
						</div>
					</Card.Header>
				</Card.Root>
			</Reveal>
		</div>

		<!-- Contact Form -->
		<div class="lg:col-span-3">
			<Reveal delay={200} x={20}>
				<Card.Root
					class="rounded-none border-primary/10 shadow-2xl shadow-primary/5 overflow-hidden"
				>
					<Card.Content class="p-8">
						{#if status === 'success'}
							<div class="py-12 flex flex-col items-center text-center space-y-4" in:fade>
								<div
									class="size-20 rounded-none bg-green-500/10 flex items-center justify-center text-green-500"
								>
									<CheckCircle2 class="size-12" />
								</div>
								<h2 class="text-2xl font-black uppercase tracking-tight">
									{m.form_success({}, { locale: i18n.current })}
								</h2>
								<Button
									variant="outline"
									onclick={() => (status = 'idle')}
									class="rounded-none font-bold uppercase tracking-widest text-xs"
								>
									{m.form_reset({}, { locale: i18n.current })}
								</Button>
							</div>
						{:else}
							<form onsubmit={handleSubmit} class="space-y-6">
								<input
									type="checkbox"
									name="botcheck"
									bind:checked={formState.botcheck}
									style="display: none;"
								/>
								<div class="space-y-2">
									<Label for="name" class="text-xs font-black uppercase tracking-widest"
										>{m.form_name({}, { locale: i18n.current })}</Label
									>
									<Input
										id="name"
										bind:value={formState.name}
										placeholder={m.form_name_placeholder({}, { locale: i18n.current })}
										required
										class="rounded-none border-muted-foreground/20 focus-visible:ring-primary"
									/>
								</div>

								<div class="space-y-2">
									<Label for="email" class="text-xs font-black uppercase tracking-widest"
										>{m.form_email({}, { locale: i18n.current })}</Label
									>
									<Input
										id="email"
										type="email"
										bind:value={formState.email}
										placeholder={m.form_email_placeholder({}, { locale: i18n.current })}
										required
										class="rounded-none border-muted-foreground/20 focus-visible:ring-primary"
									/>
								</div>

								<div class="space-y-2">
									<Label for="message" class="text-xs font-black uppercase tracking-widest"
										>{m.form_message({}, { locale: i18n.current })}</Label
									>
									<Textarea
										id="message"
										bind:value={formState.message}
										placeholder={m.form_message_placeholder({}, { locale: i18n.current })}
										required
										rows={5}
										class="rounded-none border-muted-foreground/20 focus-visible:ring-primary resize-none"
									/>
								</div>

								{#if status === 'error'}
									<div class="flex items-center gap-2 text-destructive text-sm font-bold" in:fade>
										<AlertCircle class="size-4" />
										{validationError || m.form_error({}, { locale: i18n.current })}
									</div>
								{/if}

								<Button
									type="submit"
									disabled={status === 'sending'}
									class="w-full rounded-none h-12 font-black uppercase tracking-widest text-xs shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all"
								>
									{#if status === 'sending'}
										<div class="animate-spin mr-2">
											<Send class="size-4" />
										</div>
										{m.form_sending({}, { locale: i18n.current })}
									{:else}
										<Send class="mr-2 size-4" />
										{m.form_send({}, { locale: i18n.current })}
									{/if}
								</Button>
							</form>
						{/if}
					</Card.Content>
				</Card.Root>
			</Reveal>
		</div>
	</div>
</div>

<style>
	:global(.animate-spin) {
		animation: spin 1s linear infinite;
	}
	@keyframes spin {
		from {
			transform: rotate(0deg);
		}
		to {
			transform: rotate(360deg);
		}
	}
</style>
