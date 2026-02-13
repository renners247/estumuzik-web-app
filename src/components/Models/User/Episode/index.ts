interface PodcastEpisode {
	id: number;
	podcast_id: number;
	content_url: string;
	title: string;
	season: number | null;
	number: number | null;
	picture_url: string;
	description: string;
	explicit: boolean;
	duration: number;
	created_at: string;
	updated_at: string;
	play_count: number;
	like_count: number;
	average_rating: number | null;
	published_at: string;
	podcast: {
		id: number;
		user_id: number;
		title: string;
		author: string;
		category_name: string;
		category_type: string;
		picture_url: string;
		cover_picture_url: string | null;
		description: string;
		embeddable_player_settings: any | null;
		created_at: string;
		updated_at: string;
		publisher: {
			id: number;
			first_name: string;
			last_name: string;
			company_name: string;
			email: string;
			profile_image_url: string | null;
			created_at: string;
			updated_at: string;
		};
	};
}
