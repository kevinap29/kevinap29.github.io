export interface HttpResult<T> {
	status: number;
	message: string;
	value: T;
}
