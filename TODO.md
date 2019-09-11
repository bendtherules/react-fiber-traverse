# TODOs

1. Write docs and examples
2. Reduce testcase boilerplate code for similar tests
3. Publish to npm
4. Build some demo

5. Add `findAllNodes` helpers which searches all usages of the components - by name or class
6. Allow using all methods without explicit root node. Find automatically, if not provided.
7. SKip siblings for first entry
8. ** Rewrite `find*` methods using traverseGenerator **

6. Fix getRootFiberNodeFromDOM and related helpers -
   - .\_internalRoot is not present is 16.0.0 but present in 16.9.0
   - actual node is available 2 levels nested inside this root node
   - add testcase to run across all versions of React 16.0.0 (dev+prod) and above (because internals change)

7. Make it work with older React versions
8. Make it work with non React-DOM renderers

9. Add test - traverseGenerator - siblings were traversed earlier, not now. Check input config.
