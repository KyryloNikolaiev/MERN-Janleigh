import { RepoIcon, StarFillIcon } from "@primer/octicons-react";
import { useEffect, useState } from "react";

const getRepository = (repository: string): any => {
    const [response, setResponse] = useState({});
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        fetch(`https://api.github.com/repos/TheRealKizu/${repository}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        })
            .then(async (response) => {
                setResponse(await response.json());
                setLoading(false);
            })
            .catch(() => {
                setError(true);
                setLoading(false);
            });
    }, [repository]);

    return [ response, error, loading ];
};

const getLanguageIcon = (language: string): string => {
    switch (language.toLowerCase()) {
        case "shell":
            language = "bash";
            break;
    }

    return `devicon-${language.toLowerCase()}-plain`;
}

export const ProjectCard = ({
    repository
}: {
    repository: string;
}) => {
    const [data, _hasError, loading] = getRepository(repository);

    if (loading) 
        return (
            <div className="card" style={{ width: "420px !important", margin: "12px" }}>
                <div className="card-content">
                    <div className="c-content">
                        <p>Loading...</p>
                    </div>
                </div>
            </div>
        )

    const icon = getLanguageIcon(data.language);

    return (
        <div className="card" style={{ width: "420px !important", margin: "12px" }}>
            <div className="card-content">
                <div className="media-content">
                    <a href={data.html_url} target="_blank">
                        <RepoIcon size={16} /> {data.name}
                    </a>
                </div>
                <div className="c-content">
                    <p>{data.description}</p>
                    <br/>
                    <p><i className={icon}></i>  {data.language} | <StarFillIcon size={16}/> {data.stargazers_count}</p>
                </div>
            </div>
        </div>
    )
}

export default ProjectCard;