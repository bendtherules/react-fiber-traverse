1. Write docs and examples
2. Reduce testcase boilerplate code for similar tests
3. Publish to npm
4. Build some demo

5. Pack separate files

Affected parts
---------------
a. Rollup config (input and output) X
b. package.json entrypoints X
c. root index.js for dynamic prod or dev redirection X
d. change unpkg links in readme
e. separate folder for types ?? (change tsconfig)

f. Enable umd build from one index file