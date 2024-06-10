export interface HttpResult<T> {
	status: number;
	message: string;
	value: T;
}

export interface SkeletonTheme {
	id: number;
	value: string;
	name: string;
	icon: string;
}
