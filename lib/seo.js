import graphqlRequest from "./graphqlRequest";

export async function getSeo(pageType = 'post', slug = '/') {
    const query = {
        query: `query getSeo {
            ${pageType}(id: "${slug}}", idType: SLUG) {
              seo {
                title
                metaDesc
                schema {
                  raw
                }
                opengraphTitle
                opengraphDescription
                opengraphUrl
                opengraphImage {
                  mediaItemUrl
                }
                opengraphType
                opengraphSiteName
              }
            }
          }`
    };

    const getSeo = await graphqlRequest(query);
    const seoData = getSeo.data[pageType].seo;

    return seoData;
}