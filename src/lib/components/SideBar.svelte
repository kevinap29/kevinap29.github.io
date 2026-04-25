<script lang="ts">
	import * as Avatar from "$lib/components/ui/avatar";
	import { m } from '$lib/paraglide/messages.js';
	import { i18n } from '$lib/i18n.svelte';
	import { page } from '$app/state';
	import { Mail, MessageCircle } from '@lucide/svelte';
	import { GitHub, LinkedIn } from '$lib/components/icons';

	const websiteName = $derived(page.data.websiteName);
	const jobTitle = $derived(page.data.jobTitle);
	const email = $derived(page.data.email);
	const phone = $derived(page.data.phone);
	const socials = $derived(page.data.socials);
	const imageLocation = $derived(page.data.imageLocation);
</script>

<div class="space-y-6 overflow-y-auto h-full p-4">
	<div class="flex flex-col items-center gap-4">
		<Avatar.Root class="size-32 border-2 border-primary shadow-lg transition-transform hover:scale-105 rounded-full overflow-hidden">
			<Avatar.Image src={imageLocation} alt={websiteName} class="rounded-full object-cover" />
			<Avatar.Fallback class="rounded-full">KA</Avatar.Fallback>
		</Avatar.Root>
		<div class="text-center space-y-1">
			<h2 class="text-2xl font-bold tracking-tight font-heading">{websiteName}</h2>
			<p class="text-sm font-medium uppercase tracking-wider text-primary">{jobTitle}</p>
			
			<div class="pt-2 flex flex-col gap-0.5">
				<p class="text-muted-foreground text-[10px] uppercase tracking-widest font-medium">
					Backend: .NET & Typescript
				</p>
				<p class="text-muted-foreground text-[10px] uppercase tracking-widest font-medium">
					Frontend: Blazor & Svelte
				</p>
			</div>
		</div>
	</div>

	<hr />

	<div class="space-y-4">
		<h3 class="text-lg font-semibold px-2 py-1 bg-primary text-primary-foreground rounded-none text-center font-heading">
			{m.sidebar_contact_social({}, { locale: i18n.current })}
		</h3>
		<ul class="space-y-2">
			<li>
				<a 
					href={socials?.github} 
					target="_blank" 
					class="flex items-center gap-3 p-3 rounded-none hover:bg-accent transition-colors"
				>
					<GitHub class="size-6" />
					<div>
						<p class="font-bold">Github</p>
						<p class="text-sm text-muted-foreground">@kevinap29</p>
					</div>
				</a>
			</li>
			<li>
				<a 
					href={socials?.linkedin} 
					target="_blank" 
					class="flex items-center gap-3 p-3 rounded-none hover:bg-accent transition-colors"
				>
					<LinkedIn class="size-6" />
					<div>
						<p class="font-bold">Linkedin</p>
						<p class="text-sm text-muted-foreground">Kevin Agustiansyah</p>
					</div>
				</a>
			</li>
			<li>
				<a 
					href={`mailto:${email}`} 
					target="_blank" 
					class="flex items-center gap-3 p-3 rounded-none hover:bg-accent transition-colors"
				>
					<Mail class="size-6" />
					<div>
						<p class="font-bold">Email</p>
						<p class="text-sm text-muted-foreground text-wrap break-all">{email}</p>
					</div>
				</a>
			</li>
			<li>
				<a 
					href={socials?.whatsapp} 
					target="_blank" 
					class="flex items-center gap-3 p-3 rounded-none hover:bg-accent transition-colors"
				>
					<MessageCircle class="size-6" />
					<div>
						<p class="font-bold">Whatsapp</p>
						<p class="text-sm text-muted-foreground">{phone}</p>
					</div>
				</a>
			</li>
		</ul>
	</div>
</div>
