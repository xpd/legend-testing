import { ObjectView } from 'react-object-view';

// todo: buggy library, only works with objects

const options = {
	previewOpacity: 0.5,
	previewStringMaxLength: 50,
	previewElementsMaxCount: 15,
	expandLevel: 1,
}
const palette = {
	base00: 'transparent',
	// base01: '#343d46',
	// base02: '#4f5b66',
	// base03: '#65737e',
	// base04: '#a7adba',
	// base05: '#c0c5ce',
	// base06: '#dfe1e8',
	// base07: '#eff1f5',
	// base08: '#bf616a',
	// base09: '#d08770',
	// base0A: '#ebcb8b',
	// base0B: '#a3be8c',
	// base0C: '#96b5b4',
	// base0D: '#8fa1b3',
	// base0E: '#b48ead',
	// base0F: '#ab7967',
}

const styles = {
	fontSize: "inherit",
	lineHeight: "inherit",
	fontFamily: "inherit",
}

export default function Json({ value }: { value: typeof ObjectView['data'] }) {
	const clonedValue = typeof value === 'object' ? JSON.parse(JSON.stringify(value)) : { type: typeof value, value };

  return (
		<>
		{value && (
			<div className="font-mono ![&>main>ol]:ml-0 opacity-90 ![&_ol>li>div]:mt-2 ![&_ol_ol]:pl-7 !-[&_ol_ol]:ml-2.5 [&_ol_ol]:border-l [&_ol_ol]:border-l-white/5 [&_#preview-container]:whitespace-nowrap">
				<ObjectView
					data={clonedValue}
					options={options}
					styles={styles}
					palette={palette}
				/>
			</div>
		)}
	</>
	)
}
