import { getPostList } from "../lib/posts";
import { useState } from "react";

export default function LoadMore({posts, setPosts}) {

    const [buttonText, setButtonText] = useState('Load more posts');
    const [buttonDisabled, setButtonDisabled] = useState(false);

    const handleOnclick = async (event) => {

        setButtonText('Loading...');
        setButtonDisabled(true);

        const morePosts = await getPostList(posts.pageInfo.endCursor);

        let updatedPosts = {
            pageInfo: {

            },
            nodes: []
        }

        updatedPosts.pageInfo = morePosts.pageInfo;

        posts.nodes.map((node) => {
            updatedPosts.nodes.push(node);
        });

        morePosts.nodes.map((node) => {
            updatedPosts.nodes.push(node);
        });

        setPosts(updatedPosts);

        if(morePosts.pageInfo.hasNextPage) {
            setButtonText('Load more posts');
            setButtonDisabled(false);
        }
        else {
            setButtonText('No more posts to load');
            setButtonDisabled(true);
        }
    }
    return (
        <button 
        className="load-more font-bold bg-blue-400 text-slate-900 px-4 py-2 hover:bg-blue-500"
        onClick={handleOnclick}
        disabled={buttonDisabled}>
            {buttonText}
        </button>
    );
}