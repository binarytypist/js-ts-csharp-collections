// This launcher keeps backward compatibility while the content is split by topic.
const {
    runImportantAndFilteringExamples
} = require('./rxjs-filtering-operators.js');
const {
    runCombiningExamples
} = require('./rxjs-combining-operators.js');

async function run() {
    await runImportantAndFilteringExamples();
    await runCombiningExamples();
}

run();