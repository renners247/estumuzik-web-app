interface ProfileFeesType {
	crc: number;
	sms: number;
	tin: number;
	email: number;
	bvn_basic: number;
	cac_basic: number;
	bvn_premium: number;
	cac_premium: number;
	voters_card: number;
	direct_debit: number;
	nin_with_nin: number;
	first_central: number;
	bvn_face_match: number;
	liveness_check: number;
	nin_face_match: number;
	credit_registry: number;
	drivers_license: number;
	image_face_match: number;
	physical_address: number;
	nigerian_passport: number;
	digital_address_4d: number;
	pep_sanction_check: string | number;
	direct_debit_capped: number;
	passport_face_match: number;
	transfers_above_50000: number;
	transfers_5000_and_below: number;
	transfers_5001_and_50000: number;
	dedicated_virtual_accounts: number;
	drivers_license_face_match: number;
	business_address_verification: number;
}

interface CamouflageType {
	id: number;
	user_id: number;
	warning_amount: number | null;
	critical_amount?: number | null; // Optional based on previous interface
	enable_otp: boolean;
	enable_2fa: boolean;
	dispute_emails: string[] | null;
	emails_to_notify: string[] | null;
	transaction_email: string | null;
	support_email: string | null;
	created_at: string;
	updated_at: string;
}

interface BusinessInformationType {
	id: number;
	user_id: number;
	trading_name: string | null;
	legal_business_name: string | null;
	business_industry: string;
	category: string | null;
	registration_number: string | null;
	tax_id_number: string | null;
	business_type: string | null;
	ownership_structure: string | null;
	business_description: string | null;
	business_email: string | null;
	support_email: string | null;
	phone_number: string | null;
	business_website: string | null;
	office_business_address: string | null;
	country: string | null;
	state_or_region: string | null;
	city: string | null;
	principal_first_name: string | null;
	principal_last_name: string | null;
	principal_date_of_birth: string | null;
	principal_email_address: string | null;
	principal_role_in_company: string | null;
	bank_name: string | null;
	business_bank_account_number: string | null;
	account_name: string | null;
	accept_business_agreement: boolean;
	status: "PENDING_APPROVAL" | string;
	documents: BusinessDocumentsType;
	created_at: string;
	updated_at: string;
}

interface BusinessDocumentsType {
	business_logo: string;
	business_logo_thumb: string;
	address_utility_document: string;
	form_cac_1_1: string;
	memorandum_and_articles: string;
	certificate_of_incorporation: string;
}

interface ProfileType {
	id: number;
	business_id: string;
	first_name: string;
	last_name: string;
	email: string;
	phone_number: string;
	created_at: string;
	updated_at: string;
	bvn: string | null;
	fees: ProfileFeesType;
	app_mode: "test" | "live" | string;
	test_key: string;
	secret_key: string;
	webhook_secret: string | null;
	webhook_url: string | null;
	test_webhook_url: string | null;
	sender_id: string | null;
	sender_id_status: string | null;
	email_from: string | null;
	email_webhook: string | null;
	sms_webhook: string | null;
	business_information: BusinessInformationType | null;
	camouflage: CamouflageType | null;
	// Optional fields from previous interfaces
	state?: string | null;
	city?: string | null;
	region?: string | null;
	loc?: string | null;
	age?: number | null;
	email_verified_at?: string | null;
	phone_number_verified_at?: string | null;
	profile_image?: string | null;
	bvn_is_verified?: boolean | null;
	nin_is_verified?: boolean | null;
	passed_liveness_check?: boolean | null;
	next_eligibility_check_at?: string | null;
	has_added_account?: boolean | null;
}

interface ProfileResponseType {
	profile: ProfileType;
}

// If this is part of a larger user data response
interface UserProfileResponseType {
	message?: string;
	data?: {
		user?: UserType; // From your existing UserType interface
		token?: string;
		profile?: ProfileType;
	};
	profile?: ProfileType; // Direct profile response
}

// You might also want to update your existing UserType to include profile reference
interface UserType {
	id: number;
	first_name: string;
	last_name: string;
	email: string;
	phone_number: string;
	marital_status: "single" | "married" | "divorced" | "widowed";
	employment_status: "employed" | "unemployed" | "self-employed" | "student";
	address: string;
	gender: "MALE" | "FEMALE" | "OTHER";
	date_of_birth: string;
	state: string | null;
	city: string | null;
	region: string | null;
	loc: string | null;
	age: number | null;
	email_verified_at: string | null;
	phone_number_verified_at: string | null;
	profile_image: string | null;
	bvn_is_verified: boolean | null;
	nin_is_verified: boolean | null;
	passed_liveness_check: boolean | null;
	next_eligibility_check_at: string | null;
	has_added_account: boolean | null;
	// Optional profile reference
	profile?: ProfileType;
}

// For API responses that return profile data
interface ProfileApiResponse {
	success: boolean;
	message?: string;
	data: {
		profile: ProfileType;
	};
	timestamp?: string;
}

// For fee-specific operations
interface UpdateFeesRequest {
	fees: Partial<ProfileFeesType>;
}

// For business information updates
interface UpdateBusinessInfoRequest {
	business_information: Partial<BusinessInformationType>;
}

// For camouflage settings updates
interface UpdateCamouflageRequest {
	camouflage: Partial<CamouflageType>;
}

// For profile updates
interface UpdateProfileRequest {
	first_name?: string;
	last_name?: string;
	email?: string;
	phone_number?: string;
	bvn?: string;
	// Add other updatable fields
}

// For webhook configuration
interface WebhookConfigType {
	webhook_url: string | null;
	test_webhook_url: string | null;
	webhook_secret: string | null;
	email_webhook: string | null;
	sms_webhook: string | null;
}

// For API keys management
interface ApiKeysType {
	test_key: string;
	secret_key: string;
	app_mode: "test" | "live" | string;
}

// For sender ID configuration
interface SenderIdConfigType {
	sender_id: string | null;
	sender_id_status: string | null;
	email_from: string | null;
}
