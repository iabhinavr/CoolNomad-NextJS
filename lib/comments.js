import graphqlRequest from "./graphqlRequest";


export async function createComment(body) {
    const mutation = {
        query: `mutation createComment(
            $author: String = "${body.author}", 
            $authorEmail: String = "${body.authorEmail}", 
            $clientMutationId: String = "uniqueId", 
            $commentOn: Int = ${parseInt(body.postId)}, 
            $content: String = "${body.content}") {
            createComment(
              input: {
                author: $author, 
                authorEmail: $authorEmail, 
                clientMutationId: $clientMutationId, 
                content: $content, 
                commentOn: $commentOn}
            ) {
              success
            }
          }`,
    };

    const resJson = await graphqlRequest(mutation);

    return resJson;
}

export async function getComments(slug) {
    const query = {
        query: `query getComments {
            post(id: "${slug}", idType: SLUG) {
              commentCount
              comments(where: {parentIn: "null"}) {
                nodes {
                  content
                  author {
                    node {
                      name
                      avatar {
                        url
                        width
                        height
                      }
                    }
                  }
                  date
                  parentId
                  id
                }
              }
            }
          }`
    };

    const resJson = await graphqlRequest(query);
    const comments = resJson.data.post.comments;
    const commentCount = resJson.data.post.commentCount;

    console.log(resJson);

    return {
        comments,
        commentCount,
    };
}