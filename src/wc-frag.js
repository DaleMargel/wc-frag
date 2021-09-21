let template = document.createElement('template');
template.innerHTML = `<div></div>`; 

class WcFrag extends HTMLElement {
	constructor() { super();
		const shadowRoot = this.attachShadow({mode: 'open'});
		shadowRoot.appendChild(template.content.cloneNode(true));
	}
	static get observedAttributes() { return ['href'] }

	async attributeChangedCallback(name, oldVal, newVal) {
		let body = '';
		if(newVal && newVal != ''){
			try {
				const rslt = await fetch(newVal);
				const text = await rslt.text();
				const frag = /<body>(?<BODY>.*)<\/body>/ms.exec(text);
				body = frag.groups.BODY;
			} catch {}
		}
		const div = this.shadowRoot.querySelector('div');
		div.innerHTML = body;
	}
}
try{ customElements.define("wc-frag",WcFrag) }
catch(NotSupportedError){/* duplicate */}
export { WcFrag }
