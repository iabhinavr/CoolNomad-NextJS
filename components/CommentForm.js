import {useState} from "react";

export default function CommentForm({postId}) {

    const [author, setAuthor] = useState('');
    const [authorEmail, setAuthorEmail] = useState('');
    const [content, setContent] = useState('');
    const [id, setId] = useState(postId);

    const [submitStatus, setSubmitStatus] = useState(false);
    const [responseMessage, setResponseMessage] = useState('');
    const [alertColor, setAlertColor] = useState('');

    const handleSubmit = async function(event) {
        event.preventDefault();

        setSubmitStatus(true);
        setResponseMessage('Your comment is being submitted...');
        setAlertColor('bg-yellow-500');

        let data = {
            author: author,
            authorEmail: authorEmail,
            content: content.replace(/\n/g, "\\n"), // later, perform more sanitization
            postId: id,
        };

        const response = await fetch('/api/comment', {
            method: 'POST',
            body: JSON.stringify(data),
        });

        const result = await response.json();

        console.log(result);

        setResponseMessage(result.message);

        if(response.ok) {
            setAlertColor('bg-green-500');
            setAuthor('');
            setAuthorEmail('');
            setContent('');
        }
        else {
            setAlertColor('bg-red-500');
        }
    }

    return (
        <>
        <h3 className="text-2xl pb-4 mb-4 border-b">Add your thoughts:</h3>

        <form className="comment-form" onSubmit={handleSubmit}>
            <label htmlFor="author">First Name:</label>
            <input type="text" id="author" name="author" value={author} onChange={(event) => setAuthor(event.target.value)} required />

            <label htmlFor="authorEmail">Email:</label>
            <input type="email" id="authorEmail" name="authorEmail" value={authorEmail} onChange={(event) => setAuthorEmail(event.target.value)} required />

            <label htmlFor="content">Message:</label>
            <textarea name="content" id="content" value={content} onChange={(event) => setContent(event.target.value)} required></textarea>

            <button type="submit">Submit</button>
        </form>

        {
            submitStatus && 
            <div className={`${alertColor} py-2 px-4 mt-4 text-slate-100 rounded-md`}>
                {responseMessage}
            </div>
        }
        </>
    )
}