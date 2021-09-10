import { styled } from "@stitches/react"
import { useAtom } from "jotai"
import React from "react"
import { useQuery } from "react-query"
import { Loader } from "rsuite"
import { ApiClientAtom } from "../../Api/client"
import { PostOverview } from "../../models/Posts"
import { BottomPadding, Flexbox } from "../../utils/helpers"

export function Posts() {
  const [apiClient] = useAtom(ApiClientAtom)
  const { data, isLoading, isError } = useQuery<Array<PostOverview>>(
    "posts",
    async () => {
      return (await apiClient?.instance.get("/")!).data.data.posts
    }
  )

  if (isLoading) {
    return (
      <Flexbox>
        <Loader />
      </Flexbox>
    )
  }

  if (isError) {
    return <span>Error ocurred...</span>
  }

  return (
    <>
      <BottomPadding>
        <h1>Posts</h1>
      </BottomPadding>
      <div style={{
        display: 'flex'
      }}>
        {data?.map((value, index) => (
          <PostCard post={value} key={index}></PostCard>
        ))}
      </div>
    </>
  )
}

function PostCard({ post }: { post: PostOverview }) {
  return (
    <>
      <PostContainer>
        <img
          src="https://images.unsplash.com/photo-1518811829466-1372392d4544?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2130&q=80"
          alt=""
          style={{
            width: '100%',
            maxHeight: 150,
            borderRadius: 12,
            transition: "all 0.25s ease",
          }}
        />
        <div style={{
          margin: 10
        }}>{post.title}</div>
      </PostContainer>
    </>
  )
}

const PostContainer = styled('div', {
  backgroundColor: "white",
  transition: "all 0.25s ease",
  borderRadius: 12,
  width: 200,
  height: 200,
  margin: 10,
  boxShadow: "0 0 25px 0px rgba(0,0,0,0.10)",
  overflow: 'hidden',
  cursor: 'pointer',

  "&:hover": {
    boxShadow: "0 0 25px 0px rgba(0,0,0,0.05)",

    "& img": {
      transform: 'Scale(1.05)'
    }
  }
})
