interface Publisher {
  id: number;
  first_name: string;
  last_name: string;
  company_name: string;
  email: string;
  profile_image_url: string | null;
  created_at: string;
  updated_at: string;
}

interface TopJollyPodcast {
  id: number;
  title: string;
  author: string;
  picture_url: string;
  publisher: Publisher;
  user_id: number;
  description: string;
}

interface PodcastType {
  id: number;
  user_id: number;
  title: string;
  author: string;
  category_name: string;
  category_type: string;
  picture_url: string;
  cover_picture_url: string;
  description: string;
  embeddable_player_settings: null | any; // Can be extended if settings structure is known
  created_at: string;
  updated_at: string;
  subscriber_count: number;
  publisher: Publisher;
}
