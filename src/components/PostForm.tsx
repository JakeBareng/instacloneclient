import { useEffect, useState } from "react";
import useServices from "../hooks/useServices";
const PostForm = () => {
    const [file, setFile] = useState<File | null>(null);
    const [caption, setCaption] = useState<string>('');
    const [error, setError] = useState<string>('');


    const services = useServices();



    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!file) {
            setError("Please select a file");
            return;
        }

        services.createPost(file, caption).then(res => {
            if (res.success) {
                setError("");
                setFile(null);
                setCaption("");
            }
            else {
                setError(res.message);
            }
        })

    }


    return (
        <form onSubmit={handleSubmit}>
            <input type="file" name="file" id="file" onChange={e => {
                const files = e.target.files;
                if (files && files.length > 0) {
                    setFile(files[0]);
                }
            }}/>
            <input type="text" name="caption" id="caption" onChange={e => setCaption(e.target.value)} value={caption}/>
            <input type="submit" value="Create Post" />
            <span>{error}</span>
        </form>
    );
}


export default PostForm;