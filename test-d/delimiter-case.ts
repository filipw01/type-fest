import {expectType, expectAssignable} from 'tsd';
import type {DelimiterCase} from '../source/delimiter-case';

// DelimiterCase
const delimiterFromCamel: DelimiterCase<'fooBar', '#'> = 'foo#bar';
expectType<'foo#bar'>(delimiterFromCamel);

const delimiterFromComplexCamel: DelimiterCase<'fooBarAbc123', '#', {splitOnNumber: false}> = 'foo#bar#abc123';
expectType<'foo#bar#abc123'>(delimiterFromComplexCamel);

const delimiterFromComplexCamelSplitOnNumber: DelimiterCase<
'fooBarAbc123',
'#',
{splitOnNumber: true}
> = 'foo#bar#abc#123';
expectType<'foo#bar#abc#123'>(delimiterFromComplexCamelSplitOnNumber);

const delimiterFromComplexCamelSplitOnNumberDefault: DelimiterCase<'fooBarAbc123', '#'> = 'foo#bar#abc#123';
expectType<'foo#bar#abc#123'>(delimiterFromComplexCamelSplitOnNumberDefault);

const delimiterFromPascal: DelimiterCase<'FooBar', '#'> = 'foo#bar';
expectType<'foo#bar'>(delimiterFromPascal);

const delimiterFromKebab: DelimiterCase<'foo-bar', '#'> = 'foo#bar';
expectType<'foo#bar'>(delimiterFromKebab);

const delimiterFromComplexKebab: DelimiterCase<'foo-bar-abc-123', '#'> = 'foo#bar#abc#123';
expectType<'foo#bar#abc#123'>(delimiterFromComplexKebab);

const delimiterFromSpace: DelimiterCase<'foo bar', '#'> = 'foo#bar';
expectType<'foo#bar'>(delimiterFromSpace);

const delimiterFromTab: DelimiterCase<'foo\tbar', '#'> = 'foo#bar';
expectType<'foo#bar'>(delimiterFromTab);

const delimiterFromSnake: DelimiterCase<'foo_bar', '#'> = 'foo#bar';
expectType<'foo#bar'>(delimiterFromSnake);

const noDelimiterFromMono: DelimiterCase<'foobar', '#'> = 'foobar';
expectType<'foobar'>(noDelimiterFromMono);

const delimiterFromMixed: DelimiterCase<'foo-bar_abc xyzBarFoo', '#'> = 'foo#bar#abc#xyz#bar#foo';
expectType<'foo#bar#abc#xyz#bar#foo'>(delimiterFromMixed);

const delimiterFromVendorPrefixedCssProperty: DelimiterCase<'-webkit-animation', '#'> = 'webkit#animation';
expectType<'webkit#animation'>(delimiterFromVendorPrefixedCssProperty);

const delimiterFromDoublePrefixedKebab: DelimiterCase<'--very-prefixed', '#'> = 'very#prefixed';
expectType<'very#prefixed'>(delimiterFromDoublePrefixedKebab);

const delimiterFromRepeatedSeparators: DelimiterCase<'foo____bar', '#'> = 'foo#bar';
expectType<'foo#bar'>(delimiterFromRepeatedSeparators);

const delimiterFromString: DelimiterCase<string, '#'> = 'foobar';
expectType<string>(delimiterFromString);

const delimiterFromScreamingSnake: DelimiterCase<'FOO_BAR', '#'> = 'foo#bar';
expectType<'foo#bar'>(delimiterFromScreamingSnake);

// Verifying example
type OddCasedProperties<T> = {
	[K in keyof T as DelimiterCase<K, '#'>]: T[K]
};

type CliOptions = {
	dryRun: boolean;
	includeFile: string;
	foo: number;
};

expectAssignable<OddCasedProperties<CliOptions>>({
	'dry#run': true,
	'include#file': 'bar.js',
	foo: 123,
});
