export default function ArticleBody({html}:{html:string}) { return <div className="knowledge-prose" dangerouslySetInnerHTML={{__html:html}} />; }
