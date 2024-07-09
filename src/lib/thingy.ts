export interface ElementParams {
	innerText?: string;
	name?: string;
	children?: any[];
	classNames?: string[];
	attributes?: Attribute[];
}

export interface Attribute {
	[key: string]: string;
}

export function element(params: ElementParams) {
	let element: HTMLElement;
	let textNode: Text;

	if (typeof params.name === 'undefined') {
		element = document.createElement('div');
	} else {
		element = document.createElement(params.name);
	}

	if (params.innerText) {
		textNode = document.createTextNode(params.innerText);
		element.appendChild(textNode);
	}

	if (params.classNames) {
		element.className = params.classNames.join(' ');
	}

	if (params.children && params.children.length > 0) {
		params.children.forEach(child => {
			element.appendChild(child());
		});
	}

	if (params.attributes && params.attributes.length > 0) {
		params.attributes.forEach(attribute => {
			element.setAttribute(Object.keys(attribute)[0], Object.values(attribute)[0]);
		});
	}

	function changeClass(newClassNames: string[]): void {
		element.className = newClassNames.join(' ');
	}

	function changeInnerText(newInnerText: string): void {
		if (typeof textNode !== 'undefined') {
			textNode.nodeValue = newInnerText;
		} else {
			textNode = document.createTextNode(newInnerText);
			element.appendChild(textNode);
		}
	}

	function changeAttributes(newAttributes: Attribute[]): void {
		if (!newAttributes) return;

		newAttributes.forEach(attribute => {
			const attributeName = Object.keys(attribute)[0];
			const attributeValue = Object.values(attribute)[0];

			element.setAttribute(attributeName, attributeValue);
		});
	}

	function sausage(): HTMLElement {
		return element;
	}

	sausage.changeClass = changeClass;
	sausage.changeInnerText = changeInnerText;
	sausage.changeAttributes = changeAttributes;

	return sausage;
}

export const div = (params: ElementParams) => element(params);
export const img = (params: ElementParams) => element({ name: 'img', ...params });