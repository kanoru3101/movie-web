import { LANGUAGES, MOVIE_LANGUAGE, MOVIE_VIDEO_TYPE } from '../../constants'

export type Movie = {
  id: number
  imdb_id: string
  adult: boolean
  backdrop_path: string
  belongs_to_collection?: {
    id: number
    name: string
    poster_path: string
    backdrop_path: string
  } | null
  budget: number
  genres: Array<{
    id: number
    name: string
  }>
  homepage: string
  original_language: string
  original_title: string
  overview: string
  popularity: number
  poster_path: string
  production_companies: Array<{
    id: number
    logo_path: string
    name: string
    origin_country: string
  }>
  production_countries: Array<{
    iso_3166_1: string
    name: string
  }>
  release_date: string // "2015-05-13",
  revenue: number
  runtime: number
  spoken_languages: Array<{
    english_name: string
    iso_639_1: string
    name: string
  }>
  status: string
  tagline: string
  title: string
  video: boolean
  vote_average: number
  vote_count: number
  videos: Array<Video>
  cast: Array<Cast>
}

export type APIPagination = {
  page: number
  total_results: number
  total_pages: number
}

export type Video = {
  id: number
  movie_db_id: string
  language: MOVIE_LANGUAGE
  name: string
  site: string
  key: string
  type: MOVIE_VIDEO_TYPE
  size: number
  official: boolean
  published_at: string
  created_at: Date
  updated_at: Date
}

export type User = {
  id: number
  slug: string
  email: string
  name?: string
  logo?: string
  language: LANGUAGES
}

export type Cast = {
  id: number
  credit_id: string
  person_id: number
  movie_id: number
  character: string
  gender: number | null
  order: number
  adult: boolean
  known_for_department: string
  cast_id: number
  created_at: Date
  updated_at: Date
  movie: Movie
  person: Person
}

export type Person = {
  id: number
  language: MOVIE_LANGUAGE
  tmdb_id: number
  imdb_id: string
  name: string
  biography: string
  gender: number
  popularity: number
  deathday: string | null
  birthday: string | null
  known_for_department: string
  place_of_birth: string | null
  profile_path: string | null
  adult: boolean
  homepage: string | null
  also_known_as: string[]
  created_at: Date
  updated_at: Date
  cast: Array<Cast>
}
