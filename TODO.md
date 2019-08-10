# TODOs

1. Write docs and examples
2. Reduce testcase boilerplate code for similar tests
3. Publish to npm
4. Build some demo

5. Fix getRootFiberNodeFromDOM and related helpers -
   - .\_internalRoot is not present is 16.0.0 but present in 16.9.0
   - actual node is available 2 levels nested inside this root node
   - add testcase to run across all versions of React 16.0.0 (dev+prod) and above (because internals change)
