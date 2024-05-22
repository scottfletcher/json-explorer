import './App.css';
import JsonExplorer from './JsonExplorer';

const testObject = {
	date: new Date(),
	hasError: false,
	fields: [
		{
			id: 'some-id',
			prop: 'iban',
			value: 'some-iban',
			hasError: false,
			nestedArray: ['hello', 'there'],
			nestedNestedNestedArray: [
				[
					[
						'hi',
						'from',
						'down',
						'here',
						{ isAnonymousObject: true, number: 1000 },
					],
				],
			],
		},
	],
};

function App() {
	return <JsonExplorer json={JSON.stringify(testObject)} />;
}

export default App;
