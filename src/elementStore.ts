type AnyHTMLElement<T extends keyof HTMLElementTagNameMap = keyof HTMLElementTagNameMap> = HTMLElementTagNameMap[T];
export type GlobalElement = AnyHTMLElement | AnyHTMLElement[];

interface ElementId {
	[key: string]: string;
}

interface ElementIds {
	input?: ElementId,
	output?: ElementId,
}

export interface GlobalElements {
	input?: { [key: string]: GlobalElement },
	output?: { [key: string]: GlobalElement },
}

const elementIds: ElementIds = {
	input: {
		themeswitcher: 'themeswitcher',
		portalglyphsInput: 'portalglyphsInput',
		delButton: 'delButton',
		submitBtnGen: 'submitBtnGen',
		resetBtnGen: 'resetBtnGen',
		tagInput: 'tagInput',
		submitBtnDec: 'submitBtnDec',
		resetBtnDec: 'resetBtnDec',
	},
	output: {
		toc: 'toc',
		glyphDisplay: 'glyphDisplay',
	}
}

const globalElements: GlobalElements = {};
updateGlobalElements(elementIds);

function updateGlobalElements(object: ElementIds): void {
	for (const entries of Object.entries(object)) {
		const section = entries[0] as keyof ElementIds;
		const obj = entries[1] as ElementId;
		for (const [key, dest] of Object.entries(obj)) {
			const element = getElement(dest);
			if (element == null) continue;
			globalElements[section] ??= {};
			globalElements[section]![key] = element;
		}
	}
}

function getElement(dest: string): GlobalElement | null {
	const destElements = Array.from(document.getElementsByName(dest));
	if (destElements.length) return destElements;
	const destElement = document.getElementById(dest);
	return destElement;
}

export { globalElements, updateGlobalElements, getElement };