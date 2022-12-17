import Link from "next/link"
import { personUrl, movieCredisUrl, IMAGE_BASE_URL, POSTER_SIZE } from "../../config"
// Basic fetch
import { basicFetch } from "../../api/fetchFunction"
// Components
import Header from "../../components/Header/Header"
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb"
import PersonInfo from "../../components/PersonInfo/PersonInfo"
import Grid from "../../components/Grid/Grid"
import Card from "../../components/Card/Card"
// Types
import type { GetStaticPaths, GetStaticProps, NextPage } from "next"
import type { Person, MovieCredits, Cast } from "../../api/types"

type Props = {
    person: Person;
    cast: Cast[];
}

const Person: NextPage<Props> = ({ person, cast }) => (
    <main className="bg-zinc-700">
        <Header />
        <Breadcrumb title={person.name} />
        <PersonInfo
            imgUrl={person.profile_path ? IMAGE_BASE_URL + POSTER_SIZE + person.profile_path : "/no_image.jpg"}
            name={person.name}
            biography={person.biography}
            popularity={person.popularity}
            birthday={person.birthday}
        />
        <Grid className="p-4 max-width-7xl m-auto" title="Movies">
            {cast.map(movie => (
                <Link key={movie.id} href={`/movie/${movie.id}`}>
                    <div className="cursor-pointer hover:opacity-80 duration-300">
                        <Card
                            key={movie.credit_id}
                            imgUrl={movie.poster_path ? IMAGE_BASE_URL + POSTER_SIZE + movie.poster_path : "/no_image.jpg"}
                            title={movie.title}
                            subtitle={movie.character}
                        />
                    </div>
                </Link>
            ))}
        </Grid>
    </main>
)


export default Person

export const getStaticProps: GetStaticProps = async context => {
    const id = context.params?.id as string

    const personEndpoint: string = personUrl(id)
    const movieCreditsEndpoint: string = movieCredisUrl(id)

    const person = await basicFetch<Person>(personEndpoint)
    const movieCredits = await basicFetch<MovieCredits>(movieCreditsEndpoint)

    return {
        props: {
            person,
            cast: movieCredits.cast
        },
        revalidate: 60 * 60 * 24 // Re-build the page every 24 hours
    }
}

export const getStaticPaths: GetStaticPaths = async () => {
    return {
        paths: [],
        fallback: "blocking"
    }
}