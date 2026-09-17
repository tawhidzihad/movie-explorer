import HeroBanner from "../components/home/HeroBanner";
import { useDocumentTitle } from "../hooks/useDocumentTitle";

export default function Home() {
    useDocumentTitle("Movie Explorer | Home")

    return (
        <>
            <HeroBanner />
        </>
    );
}