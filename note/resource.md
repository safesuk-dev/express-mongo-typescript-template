resource
- https://eslint.org/docs/user-guide/getting-started

Path aliases with TypeScript in Node.js
- https://github.com/vercel/pkg/issues/249#issuecomment-643117032

Swagger
- https://brikev.github.io/express-jsdoc-swagger-docs/#/

# tsc vs swc for building

- tsc
in case of we enable flag `resolveJsonModule`, when transpile from `ts` to `js`
it will create `dist/src/js` instead of `dist/index.js`

- swc
 it will create `dist/index.js` 

therefore we need to check carefully which compiler that we are using.
 we need to change execution path in dockerfile
