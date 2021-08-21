import { useStaticQuery, graphql } from "gatsby";

function useSite() {
  const data = useStaticQuery(graphql`
    {
      site {
        siteMetadata {
          title
          shortName
          description
          imageUrl
          fbAppId
          logoUrl
          siteUrl
        }
        pathPrefix
      }
    }
  `);
  return data.site;
}

export default useSite;
