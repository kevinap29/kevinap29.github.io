<script lang="ts">
	import '../app.css';

	// Highlight JS
	import hljs from 'highlight.js/lib/core';
	import 'highlight.js/styles/github-dark.css';
	import xml from 'highlight.js/lib/languages/xml'; // for HTML
	import css from 'highlight.js/lib/languages/css';
	import javascript from 'highlight.js/lib/languages/javascript';
	import typescript from 'highlight.js/lib/languages/typescript';

	hljs.registerLanguage('xml', xml); // for HTML
	hljs.registerLanguage('css', css);
	hljs.registerLanguage('javascript', javascript);
	hljs.registerLanguage('typescript', typescript);

	let { children } = $props();

	$effect(() => {
		const getLocalTranslate = localStorage.getItem('translate');

		if (!getLocalTranslate) {
			localStorage.setItem('translate', 'id');
		}
	});
</script>

{@render children()}
