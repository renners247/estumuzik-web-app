interface Publisher {
  id: number;
  first_name: string;
  last_name: string;
}

interface TopJollyPodcast {
  id: number;
  title: string;
  author: string;
  picture_url: string;
  publisher: Publisher;
}
