export interface MP3TagsIDv2_2 {
  artist: string;
  genre: string;
  composer: string;
  publisher: string;
  disc: string;
  track: string | number;
  encoder: string;
  copyright: string;
  encoded_by: string;
  language: string;
  album_artist: string;

  album: string;
  title: string;
  tracks: {
    current: number;
    total: number;
  };
  label: string;
  date: string;
}
