export const toPascalCase = str =>
  str
    .match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
    .map(x => x.slice(0, 1).toUpperCase() + x.slice(1).toLowerCase())
    .join('');

// toPascalCase('some_database_field_name'); // 'SomeDatabaseFieldName'
// toPascalCase('Some label that needs to be pascalized');
// // 'SomeLabelThatNeedsToBePascalized'
// toPascalCase('some-javascript-property'); // 'SomeJavascriptProperty'
// toPascalCase('some-mixed_string with spaces_underscores-and-hyphens');
// // 'SomeMixedStringWithSpacesUnderscoresAndHyphens'

export const toKebabCase = str =>
  str &&
  str
    .match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
    .map(x => x.toLowerCase())
    .join('-');

// toKebabCase('camelCase'); // 'camel-case'
// toKebabCase('some text'); // 'some-text'
// toKebabCase('some-mixed_string With spaces_underscores-and-hyphens');
// // 'some-mixed-string-with-spaces-underscores-and-hyphens'
// toKebabCase('AllThe-small Things'); // 'all-the-small-things'
// toKebabCase('IAmEditingSomeXMLAndHTML');
// // 'i-am-editing-some-xml-and-html'

export const toTitleCase = str =>
  str
    .match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
    .map(x => x.slice(0, 1).toUpperCase() + x.slice(1))
    .join(' ');

// toTitleCase('some_database_field_name'); // 'Some Database Field Name'
// toTitleCase('Some label that needs to be title-cased');
// // 'Some Label That Needs To Be Title Cased'
// toTitleCase('some-package-name'); // 'Some Package Name'
// toTitleCase('some-mixed_string with spaces_underscores-and-hyphens');
// // 'Some Mixed String With Spaces Underscores And Hyphens'
