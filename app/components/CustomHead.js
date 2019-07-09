import Head from 'next/head'

export function CustomHead({
  site_name = 'Example',
  description = '',
  url = '',
  type = 'WebSite',
  title = 'White Label React App',
  keywords = '',
  image
}) {
  function fixUrl(url) {
    if (!url) return

    if (!url.substring(0, 5).includes('http')) {
      if (!url.substring(0, 2).includes('//')) return `https://${url}`
      return `https:${url}`
    }

    return url
  }

  let ldjson = {
    '@context': 'https://schema.org',
    '@type': type,

    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': 'https://example.com/'
    }
  }

  if (url) ldjson.url = url

  if (image)
    ldjson.image = {
      '@type': 'ImageObject',
      url: fixUrl(image.url),
      width: image.width,
      height: image.height
    }

  return (
    <Head>
      <title key="title">{title}</title>
      <meta name="description" content={description} />
      <meta name="apple-mobile-web-app-title" content={site_name} />

      <meta property="og:site_name" content={site_name} />
      <meta property="og:type" content={type.toLowerCase()} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      {url && (
        <>
          <meta property="og:url" content={url} />
          <link rel="canonical" href={url} />
        </>
      )}

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:url" content={url} />
      {image && <meta name="twitter:image" content={fixUrl(image.url)} />}

      {image && (
        <>
          <meta property="og:image:width" content={image.width} />
          <meta property="og:image:height" content={image.height} />
          <meta property="og:image" content={fixUrl(image.url)} />
        </>
      )}

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ldjson) }}
      />
    </Head>
  )
}
