import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom/server'
import { Shell } from './App'

export function render(url) {
  return renderToString(
    <StaticRouter location={url}>
      <Shell />
    </StaticRouter>,
  )
}
export { getSeo, headTags } from './seo'
export { PAGES, SITE } from './data/site'
