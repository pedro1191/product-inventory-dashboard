export interface LoadingStates {
  loading: boolean;
  adding: boolean;
  updating: boolean;
  deleting: boolean;
}

export interface ApiError {
  message: string;
  code?: string;
  status?: number;
  operation: 'loading' | 'adding' | 'updating' | 'deleting';
}
