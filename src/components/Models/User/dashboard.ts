interface DateRange {
	startDate: Date;
	endDate: Date;
	key: string;
}

interface Range {
	startDate?: Date | undefined;
	endDate?: Date | undefined;
	color?: string | undefined;
	key?: string | undefined;
	autoFocus?: boolean | undefined;
	disabled?: boolean | undefined;
	showDateDisplay?: boolean | undefined;
}

interface RangeKeyDict {
	[key: string]: Range;
}

interface SenderIdType {
	id: number;
	user_id: number;
	sender_id: string;
	message_content: string;
	route: null | string;
	status: string;
	created_at: string;
	updated_at: string;
}
