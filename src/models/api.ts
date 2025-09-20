export interface LoadingStates {
  loading: boolean;
  adding: boolean;
  editing: boolean;
  deleting: boolean;
}

export interface ApiError {
  message: string;
  code?: string;
  status?: number;
  operation: 'loading' | 'adding' | 'editing' | 'deleting';
}
