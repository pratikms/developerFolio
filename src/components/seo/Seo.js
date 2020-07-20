/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import Helmet from "react-helmet"
import { useStaticQuery, graphql } from "gatsby"

import Facebook from "./Facebook"
import Twitter from "./Twitter"

const SEO = ({ title, desc, banner, pathname, article, node }) => {
  const { site } = useStaticQuery(query)

  const {
    buildTime,
    siteMetadata: {
      siteUrl,
      defaultTitle,
      defaultDescription,
      defaultBanner,
      headline,
      siteLanguage,
      ogLanguage,
      author,
      twitter,
      facebook,
    },
  } = site

  const seo = {
    title: title || defaultTitle,
    description: desc || defaultDescription,
    image: `${siteUrl}${banner || defaultBanner}`,
    url: `${siteUrl}${pathname || ''}`,
  }

  const schemaOrgWebPage = {
    '@context': 'http://schema.org',
    '@type': 'WebPage',
    url: siteUrl,
    headline,
    inLanguage: siteLanguage,
    mainEntityOfPage: siteUrl,
    description: defaultDescription,
    name: defaultTitle,
    author: {
      '@type': 'Person',
      name: author,
    },
    copyrightHolder: {
      '@type': 'Person',
      name: author,
    },
    copyrightYear: '2020',
    creator: {
      '@type': 'Person',
      name: author,
    },
    publisher: {
      '@type': 'Person',
      name: author,
    },
    datePublished: '2020-03-12T10:30:00+05:30',
    dateModified: buildTime,
    image: {
      '@type': 'ImageObject',
      url: `${siteUrl}${defaultBanner}`,
    },
  }

  const itemListElement = [
    {
      '@type': 'ListItem',
      item: {
        '@id': siteUrl + '/#blogs',
        name: 'Blogs',
      },
      position: 1,
    },
    {
      '@type': 'ListItem',
      item: {
        '@id': siteUrl + '/#work',
        name: 'Work',
      },
      position: 2,
    },
    {
      '@type': 'ListItem',
      item: {
        '@id': siteUrl + '/#experience',
        name: 'Experience',
      },
      position: 3,
    },
    {
      '@type': 'ListItem',
      item: {
        '@id': siteUrl + '/#contact',
        name: 'Contact',
      },
      position: 4,
    },
  ]

  let schemaArticle = null

  if (article) {
    schemaArticle = {
      '@context': 'http://schema.org',
      '@type': 'Article',
      author: {
        '@type': 'Person',
        name: author,
      },
      copyrightHolder: {
        '@type': 'Person',
        name: author,
      },
      copyrightYear: '2019',
      creator: {
        '@type': 'Person',
        name: author,
      },
      publisher: {
        '@type': 'Organization',
        name: author,
        logo: {
          '@type': 'ImageObject',
          url: `${siteUrl}${defaultBanner}`,
        },
      },
      datePublished: node.first_publication_date,
      dateModified: node.last_publication_date,
      description: seo.description,
      headline: seo.title,
      inLanguage: siteLanguage,
      url: seo.url,
      name: seo.title,
      image: {
        '@type': 'ImageObject',
        url: seo.image,
      },
      mainEntityOfPage: seo.url,
    }
    // Push current blogpost into breadcrumb list
    itemListElement.push([
      {
        '@type': 'ListItem',
        item: {
          '@id': siteUrl + '/#blogs',
          name: 'Blogs',
        },
        position: 1,
      },
      {
        '@type': 'ListItem',
        item: {
          '@id': siteUrl + '/#work',
          name: 'Work',
        },
        position: 2,
      },
      {
        '@type': 'ListItem',
        item: {
          '@id': siteUrl + '/#experience',
          name: 'Experience',
        },
        position: 3,
      },
      {
        '@type': 'ListItem',
        item: {
          '@id': siteUrl + '/#contact',
          name: 'Contact',
        },
        position: 4,
      },
    ])
  }

  const breadcrumb = {
    '@context': 'http://schema.org',
    '@type': 'BreadcrumbList',
    description: `I'm a Software Engineer who loves solving real world problems. I love what I do, and am constantly honing my craft. Check out to know more!`,
    name: 'Pratik Shivaraikar',
    itemListElement,
  }

  return (
    <>
      <Helmet title={seo.title}>
        <html lang={siteLanguage} />
        <meta name="description" content={seo.description} />
        <meta name="image" content={seo.image} />
        {/* Insert schema.org data conditionally (webpage/article) + everytime (breadcrumbs) */}
        {!article && <script type="application/ld+json">{JSON.stringify(schemaOrgWebPage)}</script>}
        {article && <script type="application/ld+json">{JSON.stringify(schemaArticle)}</script>}
        <script type="application/ld+json">{JSON.stringify(breadcrumb)}</script>
      </Helmet>
      <Facebook
        desc={seo.description}
        image={seo.image}
        title={seo.title}
        type={article ? 'article' : 'website'}
        url={seo.url}
        locale={ogLanguage}
        name={facebook}
      />
      <Twitter title={seo.title} image={seo.image} desc={seo.description} username={twitter} />
    </>
  )

}

SEO.defaultProps = {
  title: `Pratik Shivaraikar`,
  desc: `I'm a Software Engineer who loves solving real world problems. I love what I do, and am constantly honing my craft. Check out to know more!`,
  banner: `/src/images/favicon.webp`,
  pathname: null,
  article: false,
  node: null,
}

SEO.propTypes = {
  title: PropTypes.string,
  desc: PropTypes.string,
  banner: PropTypes.string,
  pathname: PropTypes.string,
  article: PropTypes.bool,
  node: PropTypes.object,
}

const query = graphql`
  query SEO {
    site {
      buildTime(formatString: "YYYY-MM-DD")
      siteMetadata {
        siteUrl
        defaultTitle: title
        defaultDescription: description
        defaultBanner: banner
        headline
        siteLanguage
        ogLanguage
        author
        twitter
        facebook
      }
    }
  }
`

export default SEO
