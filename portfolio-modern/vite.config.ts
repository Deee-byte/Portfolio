import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig(({ mode }) => {
  const repoName = process.env.GITHUB_REPOSITORY?.split('/')[1]
  const basePath = mode === 'production' && repoName ? `/${repoName}/` : '/'

  return {
    base: basePath,
    plugins: [tailwindcss()],
  }
})
