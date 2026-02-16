interface ApiSubCategory {
  name: string;
  image_url: string;
}

interface ApiCategory {
  name: string;
  categories: ApiSubCategory[];
  images: string[];
}
