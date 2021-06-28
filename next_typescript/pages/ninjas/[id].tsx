export const getStaticPaths = async () => {
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    const data: any = await response.json();

    const paths = data.map((ninja: any) => {
        return {
            params: { id: ninja.id.toString() }
        }
    })
    
    return {
        paths,
        fallback: false
    }
}

export const getStaticProps = async (context: any) => {

    const { id } = context.params;
    const response: Response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
    const data: any = await response.json();

    return {
        props: { ninja: data }
    }
}

export default function Details( props: any ) {
    return (
        <div>
            <h1>{props.ninja.name}</h1>
            <p>{props.ninja.email}</p>
            <p>{props.ninja.website}</p>
            <p>{props.ninja.address.city}</p>
        </div>
    )
}