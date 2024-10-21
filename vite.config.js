import path from "path";

/** @type {import('vite').UserConfig} */
export default {
   // ...
   root: path.join(process.cwd(), "src"),
   build: {
      outDir: path.join(process.cwd(), "dist"),
   },
   publicDir: path.join(process.cwd(), "public"),
   server: {
      host: true,
   },
};
