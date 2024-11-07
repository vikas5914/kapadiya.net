import { gql, GraphQLClient } from "graphql-request";
import type { AllPostsData, PostData } from "./schema";

export const getClient = () => {
  return new GraphQLClient("https://gql.hashnode.com")
}

const myHashnodeURL = "kapadiya.hashnode.dev";

export const getAllPosts = async () => {
  const client = getClient();

  const allPosts = await client.request<AllPostsData>(
    gql`
      query allPosts {
        publication(host: "${myHashnodeURL}") {
          title
          posts(first: 10) {
            pageInfo{
              hasNextPage
              endCursor
            }
            edges {
              node {
                author{
                  name
                  profilePicture
                }
                title
                subtitle
                brief
                slug
                coverImage {
                  url
                }
                tags {
                  name
                  slug
                }
                publishedAt
                readTimeInMinutes
              }
            }
          }
        }
      }
    `
  );

  return allPosts;
};


export const getPost = async (slug: string) => {
  const client = getClient();

  const data = await client.request<PostData>(
    gql`
      query postDetails($slug: String!) {
        publication(host: "${myHashnodeURL}") {
          post(slug: $slug) {
            id
            author{
              name
              profilePicture
            }
            publishedAt
            title
            brief
            subtitle
            readTimeInMinutes
            content{
              html
              markdown
            }
            tags {
              name
              slug
            }
            coverImage {
              url
            }
          }
        }
      }
    `,
    { slug: slug }
  );

  return data.publication.post;
};