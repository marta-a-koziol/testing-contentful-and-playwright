import {getAllPostsWithSlug, getPostAndMorePosts} from "../../../lib/api";

export default function Index({ test }) {

    return (
        <h2>{`This is H2 in Authors ${test}`}</h2>
    )
}


export async function getStaticProps(context) {

    return {
        props: {
            test: context.params.name,
        },
    }
}

export async function getStaticPaths() {
    return {
        paths: [{params: {name: 'name'}}],
        fallback: true,
    }
}