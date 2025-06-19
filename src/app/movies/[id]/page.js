import MovieDetailClient from "./MovieDetailClient";

export default function MovieDetailPage({ params }) {
  return <MovieDetailClient id={params.id} />;
}
