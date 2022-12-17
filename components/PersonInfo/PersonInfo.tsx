import Image from "next/image"
// Helpers
import { formatDate } from "../../helpers"
// Components
import Thumb from "../Thumb/Thumb"
import Pill from "../Pill/Pill"

type Props = {
    imgUrl: string;
    name: string;
    biography: string;
    popularity: number;
    birthday: string;
}

const PersonInfo = ({ imgUrl, name, biography, popularity, birthday }: Props) => (
    <div className="relative w-full h-auto p-4">
        <div className="relative h-full min-h-128 flex flex-col md:flex-row max-w-7xl p-4 m-auto z-10 rounded-xl bg-zinc-800 bg-opacity-90">
            <div className="relative w-full h-96 md:h-auto md:w-1/3">
                <Thumb imgUrl={imgUrl} />
                <div className="absolute top-4 left-4 rounded-full bg-white w-10 h-10 flex justify-center items-center text-black text-sm font-bold">
                    {popularity}
                </div>
            </div>
            <div className="text-white px-0 py-4 w-full text-center md:py-0 md:text-left md:px-8 md:w-2/3">
                <h2 className="text-2xl md:text-4xl font-bold pb-4">
                    {name}
                </h2>
                <h3 className="text-lg font-bold">Biography</h3>
                <p className="mb-8 text-sm md:text-lg">{biography}</p>
                <div>
                    <div className="mt-8">
                        <h3 className="text-lg font-bold">Person info</h3>
                        <Pill className="ml-0" text={`Birthday: ${formatDate(birthday, "fr-FR")}`} />
                    </div>
                </div>
            </div>
        </div>
        <Image
            priority
            placeholder="blur"
            blurDataURL="/placeholder.jpg"
            style={{ objectFit: "cover", objectPosition: "center" }}
            fill
            src={imgUrl}
            alt="thumb"
        />
    </div>
)

export default PersonInfo